"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { motion } from "framer-motion";
import { Home } from "lucide-react";
import Image from "next/image";

export default function NotFound() {
  // Random meme-related 404 messages
  const messages = [
    "Looks like this meme has been deleted by the internet gods.",
    "404: Meme not found. It probably went viral somewhere else.",
    "This page has disappeared faster than a trending meme.",
    "Oops! This meme has ascended to internet heaven.",
    "Even our best meme detectives couldn't find this page.",
  ];

  // Get a random message
  const randomMessage = messages[Math.floor(Math.random() * messages.length)];

  return (
    <div className="container mx-auto flex flex-col items-center justify-center min-h-[80vh] px-4 text-center">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-9xl font-extrabold tracking-tighter mb-4">404</h1>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <h2 className="text-2xl font-bold mb-4">Page Not Found</h2>
        <p className="text-muted-foreground mb-8 max-w-md mx-auto">
          {randomMessage}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg">
            <Link href="/">
              <Home className="mr-2 h-5 w-5" />
              Back to Homepage
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/explore">Explore Memes</Link>
          </Button>
        </div>
      </motion.div>

      <motion.div
        className="mt-12 max-w-sm"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.6, duration: 0.5 }}
      >
        <div className="aspect-square bg-muted rounded-lg overflow-hidden relative">
          <Image
            src="/image.png"
            alt="404 Meme"
            width={400}
            height={400}
            className="object-cover w-full h-full"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-background/80 backdrop-blur-sm p-4 rounded-lg text-center">
              <h3 className="text-xl font-bold">404 MEME NOT FOUND</h3>
              <p className="text-sm">But we found this placeholder instead!</p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
