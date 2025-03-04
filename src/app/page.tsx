"use client";

import { Button } from "@/components/ui/button";
import { TrendingMemes } from "@/components/trending-memes";
import Link from "next/link";
import { ArrowRight, Upload } from "lucide-react";
import { HeroSection } from "@/components/hero";
import { useEffect, useState } from "react";
import { useMemeContext } from "@/context/meme-context";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Meme } from "./types/meme";

export default function Home() {
  const { memes } = useMemeContext();
  const [topMemes, setTopMemes] = useState<Meme[]>([]);

  useEffect(() => {
    // Sort memes by likes
    const sortedMemes = memes.sort((a, b) => b.likes - a.likes);
    setTopMemes(sortedMemes);
  }, [memes]);

  return (
    <div className="container mx-auto px-4 py-8">
      <HeroSection />

      <section className="my-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold">Trending Memes</h2>
          <Link href="/explore">
            <Button variant="outline" className="group">
              View All
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>
        <TrendingMemes />
      </section>

      <section className="my-16 bg-muted rounded-xl p-8 text-center">
        <h2 className="text-3xl font-bold mb-4">Got a Funny Meme?</h2>
        <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
          Share your humor with the world! Upload your memes and let the
          community enjoy your creativity.
        </p>
        <Link href="/upload">
          <Button size="lg" className="gap-2">
            <Upload className="h-5 w-5" />
            Upload Your Meme
          </Button>
        </Link>
      </section>

      <section className="my-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold">Leaderboard</h2>
          <Link href="/leaderboard">
            <Button variant="outline" className="group">
              View Full Leaderboard
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Top 3 memes preview */}
          {topMemes.slice(0, 3).map((meme, index) => (
            <Card
              key={meme.id}
              className="bg-card rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow p-0"
            >
              <CardContent className="p-0">
                <div className="aspect-square bg-muted relative">
                  <div className="absolute top-2 left-2 bg-primary z-1 text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center font-bold">
                    #{index + 1}
                  </div>
                  <Image src={meme.imageUrl} alt={meme.title} fill={true} />
                </div>

                <div className="p-4">
                  <h3 className="font-semibold truncate">{meme.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {meme.likes} likes
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
