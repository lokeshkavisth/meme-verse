"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { MemeGrid } from "@/components/meme-grid";
import { useMemeContext } from "@/context/meme-context";
import { Edit, Loader2, Upload } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { useUser } from "@clerk/nextjs";
import { Meme } from "../types/meme";

export default function ProfilePage() {
  const { user } = useUser();

  const [name, setName] = useState<string>("Current User");
  const [bio, setBio] = useState<string>("Meme enthusiast and creator");
  const [avatar, setAvatar] = useState<string>(
    "/placeholder.svg?height=100&width=100"
  );
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { memes } = useMemeContext();

  const [uploadedMemes, setUploadedMemes] = useState<Meme[]>([]);
  const [savedMemes, setSavedMemes] = useState<Meme[]>([]);

  // Load user data and memes
  useEffect(() => {
    // Get saved memes from local storage
    const savedMemeIds = JSON.parse(localStorage.getItem("savedMemes") || "[]");
    const savedMemesList = memes.filter((meme) =>
      savedMemeIds.includes(meme.id)
    );
    setSavedMemes(savedMemesList);

    // Get uploaded memes (filter by current user)
    const userMemes = memes.filter((meme) => meme.user.id === "current-user");
    setUploadedMemes(userMemes);
  }, [memes]);

  // Handle profile update
  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault();

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setIsEditing(false);

      toast("Profile updated", {
        description: "Your profile information has been updated",
      });
    }, 1500);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="mb-8">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
            <div className="relative">
              <Avatar className="h-24 w-24 border-2 border-primary">
                <AvatarImage
                  src={user?.imageUrl || avatar}
                  alt={user?.fullName || name}
                />
                <AvatarFallback>
                  {user?.fullName?.charAt(0) || name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              {!isEditing && (
                <Button
                  size="icon"
                  className="absolute bottom-0 right-0 h-8 w-8 rounded-full"
                  onClick={() => setIsEditing(true)}
                >
                  <Edit className="h-4 w-4" />
                </Button>
              )}
            </div>

            {isEditing ? (
              <form onSubmit={handleProfileUpdate} className="flex-1 space-y-4">
                <div>
                  <Label htmlFor="name">Display Name</Label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="max-w-md"
                  />
                </div>

                <div>
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    className="max-w-md"
                  />
                </div>

                <div>
                  <Label htmlFor="avatar">Profile Picture URL</Label>
                  <Input
                    id="avatar"
                    value={avatar}
                    onChange={(e) => setAvatar(e.target.value)}
                    className="max-w-md"
                  />
                </div>

                <div className="flex gap-2">
                  <Button type="submit" disabled={isLoading}>
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      "Save Profile"
                    )}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsEditing(false)}
                    disabled={isLoading}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            ) : (
              <div className="flex-1 text-center md:text-left">
                <h1 className="text-2xl font-bold mb-2">
                  {user?.fullName || name}
                </h1>
                <p className="text-muted-foreground mb-4">{bio}</p>
                <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                  <div>
                    <p className="font-bold">{uploadedMemes.length}</p>
                    <p className="text-sm text-muted-foreground">Uploads</p>
                  </div>
                  <div>
                    <p className="font-bold">{savedMemes.length}</p>
                    <p className="text-sm text-muted-foreground">Saved</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="uploads" className="mb-8">
        <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto">
          <TabsTrigger value="uploads">My Uploads</TabsTrigger>
          <TabsTrigger value="saved">Saved Memes</TabsTrigger>
        </TabsList>
        <TabsContent value="uploads" className="mt-6">
          {uploadedMemes.length > 0 ? (
            <MemeGrid memes={uploadedMemes} />
          ) : (
            <div className="text-center py-12">
              <h3 className="text-xl font-semibold mb-4">No uploads yet</h3>
              <p className="text-muted-foreground mb-6">
                You haven&rsquo;t uploaded any memes yet. Start sharing your
                humor with the world!
              </p>
              <Button asChild>
                <Link href="/upload">
                  <Upload className="mr-2 h-4 w-4" />
                  Upload Your First Meme
                </Link>
              </Button>
            </div>
          )}
        </TabsContent>
        <TabsContent value="saved" className="mt-6">
          {savedMemes.length > 0 ? (
            <MemeGrid memes={savedMemes} />
          ) : (
            <div className="text-center py-12">
              <h3 className="text-xl font-semibold mb-4">No saved memes</h3>
              <p className="text-muted-foreground mb-6">
                You haven&rsquo;t saved any memes yet. Browse and save memes to
                view them later!
              </p>
              <Button asChild>
                <Link href="/explore">Explore Memes</Link>
              </Button>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
