"use client";

import type React from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

import { useMemeContext } from "@/context/meme-context";
import {
  ArrowLeft,
  Bookmark,
  Heart,
  MessageSquare,
  Send,
  Share2,
} from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";
import { toast } from "sonner";
import { Comment, Meme } from "@/app/types/meme";

export default function MemeDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const { memes, likeMeme, addComment } = useMemeContext();
  const [meme, setMeme] = useState<Meme | null>(null);
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [isSaved, setIsSaved] = useState<boolean>(false);
  const [comment, setComment] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Find meme by ID
  useEffect(() => {
    const foundMeme = memes.find((m) => m.id === id);
    if (foundMeme) {
      setMeme(foundMeme);
    }

    // Check if meme is liked or saved in local storage
    const likedMemes = JSON.parse(localStorage.getItem("likedMemes") || "[]");
    const savedMemes = JSON.parse(localStorage.getItem("savedMemes") || "[]");

    setIsLiked(likedMemes.includes(id));
    setIsSaved(savedMemes.includes(id));
  }, [id, memes]);

  // Handle like button click
  const handleLike = () => {
    if (!meme) return;

    // Toggle like state
    const newLikedState = !isLiked;
    setIsLiked(newLikedState);

    // Update local storage
    const likedMemes = JSON.parse(localStorage.getItem("likedMemes") || "[]");
    if (newLikedState) {
      localStorage.setItem("likedMemes", JSON.stringify([...likedMemes, id]));
      likeMeme(id, 1);
    } else {
      localStorage.setItem(
        "likedMemes",
        JSON.stringify(likedMemes.filter((memeId: string) => memeId !== id))
      );
      likeMeme(id, -1);
    }
  };

  // Handle save button click
  const handleSave = () => {
    if (!meme) return;

    // Toggle saved state
    const newSavedState = !isSaved;
    setIsSaved(newSavedState);

    // Update local storage
    const savedMemes = JSON.parse(localStorage.getItem("savedMemes") || "[]");
    if (newSavedState) {
      localStorage.setItem("savedMemes", JSON.stringify([...savedMemes, id]));
      toast("Meme saved", {
        description: "This meme has been saved to your profile",
      });
    } else {
      localStorage.setItem(
        "savedMemes",
        JSON.stringify(savedMemes.filter((memeId: string) => memeId !== id))
      );
      toast("Meme removed", {
        description: "This meme has been removed from your saved items",
      });
    }
  };

  // Handle share button click
  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: meme?.title,
          text: meme?.caption,
          url: window.location.href,
        })
        .catch(() => {
          // Fallback if share fails
          navigator.clipboard.writeText(window.location.href);
          toast("Link copied", {
            description: "Meme link copied to clipboard",
          });
        });
    } else {
      // Fallback for browsers that don't support share API
      navigator.clipboard.writeText(window.location.href);
      toast("Link copied", {
        description: "Meme link copied to clipboard",
      });
    }
  };

  // Handle comment submission
  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!comment.trim()) return;

    setIsSubmitting(true);

    // Create new comment
    const newComment = {
      id: Date.now().toString(),
      text: comment,
      created: new Date().toISOString(),
      user: {
        id: "current-user",
        name: "Current User",
        avatar: "/placeholder.svg?height=40&width=40",
      },
    };

    // Add comment to meme
    addComment(id, newComment);

    // Reset form
    setComment("");
    setIsSubmitting(false);

    toast("Comment added", {
      description: "Your comment has been added to the meme",
    });
  };

  // If meme not found
  if (!meme) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-4xl font-bold mb-4">Meme not found</h1>
        <p className="text-muted-foreground mb-8">
          The meme you&lsquo;re looking for doesn&lsquo;t exist or has been
          removed.
        </p>
        <Button asChild>
          <Link href="/explore">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Explore
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <Button variant="ghost" asChild className="mb-6">
        <Link href="/explore">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Explore
        </Link>
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center mb-4">
                <Avatar className="h-10 w-10 mr-3">
                  <AvatarImage src={meme.user.avatar} alt={meme.user.name} />
                  <AvatarFallback>{meme.user.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{meme.user.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {new Date(meme.created).toLocaleDateString()}
                  </p>
                </div>
              </div>

              <h1 className="text-2xl font-bold mb-4">{meme.title}</h1>

              <div className="aspect-square bg-muted rounded-md overflow-hidden relative mb-4">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={meme.imageUrl || "/placeholder.svg"}
                  alt={meme.title}
                  className="object-contain w-full h-full"
                />
              </div>

              {meme.caption && <p className="text-lg mb-4">{meme.caption}</p>}

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleLike}
                    className="flex items-center gap-1"
                  >
                    <motion.div
                      whileTap={{ scale: 1.5 }}
                      animate={isLiked ? { scale: [1, 1.5, 1] } : {}}
                      transition={{ duration: 0.5 }}
                    >
                      <Heart
                        className={`h-5 w-5 ${
                          isLiked ? "fill-red-500 text-red-500" : ""
                        }`}
                      />
                    </motion.div>
                    <span>{meme.likes + (isLiked ? 1 : 0)}</span>
                  </Button>

                  <Button
                    variant="ghost"
                    size="sm"
                    className="flex items-center gap-1"
                  >
                    <MessageSquare className="h-5 w-5" />
                    <span>{meme.comments?.length || 0}</span>
                  </Button>

                  <Button variant="ghost" size="sm" onClick={handleShare}>
                    <Share2 className="h-5 w-5" />
                  </Button>
                </div>

                <Button variant="ghost" size="sm" onClick={handleSave}>
                  <Bookmark
                    className={`h-5 w-5 ${isSaved ? "fill-current" : ""}`}
                  />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-1">
          <Card>
            <CardContent className="p-6">
              <h2 className="font-semibold mb-4">Comments</h2>

              <form onSubmit={handleCommentSubmit} className="mb-6">
                <div className="flex gap-2">
                  <Textarea
                    placeholder="Add a comment..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="min-h-[80px]"
                  />
                </div>
                <div className="flex justify-end mt-2">
                  <Button
                    type="submit"
                    size="sm"
                    disabled={!comment.trim() || isSubmitting}
                  >
                    <Send className="h-4 w-4 mr-2" />
                    Post
                  </Button>
                </div>
              </form>

              <Separator className="my-4" />

              <div className="space-y-4 max-h-[500px] overflow-y-auto">
                {(meme.comments ?? []).length > 0 ? (
                  (meme.comments ?? []).map((comment: Comment) => (
                    <div key={comment.id} className="flex gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage
                          src={comment.user.avatar}
                          alt={comment.user.name}
                        />
                        <AvatarFallback>
                          {comment.user.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="font-medium text-sm">
                            {comment.user.name}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {new Date(comment.created).toLocaleDateString()}
                          </p>
                        </div>
                        <p className="text-sm mt-1">{comment.text}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-center text-muted-foreground py-4">
                    No comments yet. Be the first to comment!
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
