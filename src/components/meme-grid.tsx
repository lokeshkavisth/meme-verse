import { Card, CardContent } from "@/components/ui/card";
import { Heart, MessageSquare } from "lucide-react";
import Link from "next/link";
import { motion } from "motion/react";
import { Meme } from "@/app/types/meme";
import Image from "next/image";

export function MemeGrid({ memes }: { memes: Meme[] }) {
  if (memes.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No memes found.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {memes.map((meme, index) => (
        <motion.div
          key={meme.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05 }}
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
                    <div className="flex items-center gap-2 text-sm">
                      <div className="flex items-center gap-1">
                        <Heart className="h-4 w-4 text-red-500" />
                        <span>{meme.likes}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MessageSquare className="h-4 w-4" />
                        <span>{meme.comments.length}</span>
                      </div>
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
