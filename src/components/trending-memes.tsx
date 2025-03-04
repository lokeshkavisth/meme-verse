"use client";

import { useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { useMemeContext } from "@/context/meme-context";
import { Skeleton } from "@/components/ui/skeleton";
import { Heart } from "lucide-react";
import Link from "next/link";
import { motion } from "motion/react";
import Image from "next/image";

export function TrendingMemes() {
  const { memes, fetchMemes, loading } = useMemeContext();

  useEffect(() => {
    fetchMemes();
  }, []);

  // Get top 6 trending memes
  const trendingMemes = memes.sort((a, b) => b.likes - a.likes).slice(0, 6);

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, index) => (
          <Card key={index}>
            <CardContent className="p-0">
              <Skeleton className="aspect-square rounded-t-lg" />
              <div className="p-4">
                <Skeleton className="h-5 w-3/4 mb-2" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {trendingMemes.map((meme, index) => (
        <motion.div
          key={meme.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <Link href={`/meme/${meme.id}`}>
            <Card className="overflow-hidden hover:shadow-md transition-shadow p-0">
              <CardContent className="p-0">
                <div className="aspect-square bg-muted relative">
                  <Image
                    src={meme.imageUrl || "/placeholder.svg"}
                    alt={meme.title}
                    width={500}
                    height={500}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold truncate">{meme.title}</h3>
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <span>by {meme.user.name}</span>
                    </div>
                    <div className="flex items-center gap-1 text-sm">
                      <Heart className="h-4 w-4 text-red-500" />
                      <span>{meme.likes}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        </motion.div>
      ))}
    </div>
  );
}
