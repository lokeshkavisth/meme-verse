"use client";

import type React from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { useMemeContext } from "@/context/meme-context";
import { useUser } from "@clerk/nextjs";
import { ImageIcon, Loader2, Sparkles, Upload } from "lucide-react";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { toast } from "sonner";
import generateAiCaption from "@/actions/ai-action";
import { Category, Meme } from "../types/meme";

export default function UploadPage() {
  const [title, setTitle] = useState<string>("");
  const [caption, setCaption] = useState<string>("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { addMeme } = useMemeContext();
  const { user } = useUser();
  const router = useRouter();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check if file is an image or gif
    if (!file.type.match("image/(jpeg|png|gif|jpg)")) {
      toast.error("Invalid file type", {
        description: "Please upload an image (JPEG, PNG, GIF)",
      });
      return;
    }

    setImageFile(file);

    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  // Trigger file input click
  const handleSelectFile = () => {
    fileInputRef.current?.click();
  };

  // Generate AI caption
  const generateCaption = async () => {
    if (!imagePreview) {
      toast.error("No image selected", {
        description: "Please upload an image first",
      });
      return;
    }

    if (!title) {
      toast.error("No title", {
        description: "Please provide a title for your meme",
      });
      return;
    }
    try {
      setIsGenerating(true);
      const caption = await generateAiCaption(imagePreview, title);

      setCaption(caption);

      toast("Caption generated!", {
        description: "AI has created a caption for your meme",
      });
    } catch (error) {
      toast.error("Caption generation failed", {
        description: "There was an error generating a caption for your meme",
      });
      console.error("Caption generation failed:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!imageFile || !title) {
      toast.error("Missing information", {
        description: "Please provide a title and upload an image",
      });
      return;
    }

    setIsUploading(true);

    try {
      // Simulate upload to ImgBB API
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Create new meme object
      const newMeme: Meme = {
        id: Date.now().toString(),
        title,
        caption,
        category: Category.Random,
        imageUrl: "",
        likes: 0,
        comments: [],
        created: new Date().toISOString(),
        user: {
          id: user?.id ?? "",
          name: user?.fullName ?? "",
          avatar: user?.imageUrl ?? "",
        },
      };

      // Add meme to context
      addMeme(newMeme);

      toast("Meme uploaded successfully!", {
        description: "Your meme has been added to MemeVerse",
      });

      // Redirect to meme details page
      router.push(`/meme/${newMeme.id}`);
    } catch (error) {
      toast.error("Upload failed", {
        description: "There was an error uploading your meme",
      });
      console.error("Upload failed:", error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-4xl font-bold mb-8">Upload a Meme</h1>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <div className="mb-6">
              <Label htmlFor="title" className="mb-2 block">
                Meme Title
              </Label>
              <Input
                id="title"
                placeholder="Enter a catchy title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            <Tabs defaultValue="text" className="mb-6">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="text">Text Caption</TabsTrigger>
                <TabsTrigger value="ai">AI Caption</TabsTrigger>
              </TabsList>
              <TabsContent value="text">
                <Textarea
                  placeholder="Add a funny caption for your meme"
                  className="min-h-[120px]"
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                />
              </TabsContent>
              <TabsContent value="ai">
                <div className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    Let AI generate a funny caption for your meme based on the
                    image.
                  </p>
                  <Button
                    type="button"
                    onClick={generateCaption}
                    disabled={isGenerating || !imagePreview}
                    className="w-full"
                  >
                    {isGenerating ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Generating...
                      </>
                    ) : (
                      <>
                        <Sparkles className="mr-2 h-4 w-4" />
                        Generate AI Caption
                      </>
                    )}
                  </Button>
                  {caption && (
                    <div className="bg-muted p-3 rounded-md">
                      <p className="font-medium">{caption}</p>
                    </div>
                  )}
                </div>
              </TabsContent>
            </Tabs>

            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
              accept="image/jpeg,image/png,image/gif,image/jpg"
            />

            <Button
              type="button"
              variant="outline"
              onClick={handleSelectFile}
              className="w-full mb-6"
            >
              <ImageIcon className="mr-2 h-4 w-4" />
              Select Image
            </Button>

            <Button
              type="submit"
              className="w-full"
              disabled={isUploading || !imageFile}
            >
              {isUploading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Uploading...
                </>
              ) : (
                <>
                  <Upload className="mr-2 h-4 w-4" />
                  Upload Meme
                </>
              )}
            </Button>
          </div>

          <Card>
            <CardContent className="p-6">
              <h3 className="font-semibold mb-4">Preview</h3>
              {imagePreview ? (
                <div className="space-y-4">
                  <div className="aspect-square bg-muted rounded-md overflow-hidden relative">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={imagePreview || "/placeholder.svg"}
                      alt="Meme preview"
                      className="object-contain w-full h-full"
                    />
                  </div>
                  <div>
                    <h4 className="font-medium">{title || "Untitled Meme"}</h4>
                    {caption && <p className="text-sm mt-1">{caption}</p>}
                  </div>
                </div>
              ) : (
                <div className="aspect-square bg-muted rounded-md flex items-center justify-center">
                  <div className="text-center p-6">
                    <ImageIcon className="h-12 w-12 mx-auto text-muted-foreground mb-2" />
                    <p className="text-muted-foreground">
                      Select an image to preview your meme
                    </p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </form>
    </div>
  );
}
