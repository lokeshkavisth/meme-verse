import { Button } from "@/components/ui/button";
import Link from "next/link";
import { motion } from "motion/react";
import { Compass } from "lucide-react";

export function HeroSection() {
  return (
    <section className="py-12 md:py-24">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_500px]">
          <motion.div
            className="flex flex-col justify-center space-y-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                Welcome to MemeVerse
              </h1>
              <p className="max-w-[600px] text-muted-foreground md:text-xl">
                Explore, upload, and interact with the best memes on the
                internet. Join our community of meme enthusiasts!
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Button asChild size="lg">
                <Link href="/explore">
                  <Compass className="mr-2 h-5 w-5" />
                  Start Exploring
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/upload">Upload Your Meme</Link>
              </Button>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mx-auto aspect-video overflow-hidden rounded-xl object-cover lg:aspect-square"
          >
            <div className="grid grid-cols-2 grid-rows-2 gap-2 h-full">
              {[1, 2, 3, 4].map((index) => (
                <div
                  key={index}
                  className="bg-muted rounded-md overflow-hidden relative"
                >
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-4xl font-bold text-muted-foreground opacity-50">
                      {index}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
