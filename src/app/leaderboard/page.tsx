"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useMemeContext } from "@/context/meme-context";
import { Trophy, Medal, Award } from "lucide-react";
import Link from "next/link";
import { motion } from "motion/react";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";
import { Meme } from "../types/meme";
import { TopUser } from "../types/user";

export default function LeaderboardPage() {
  const { memes, fetchMemes, loading } = useMemeContext();
  const [topMemes, setTopMemes] = useState<Meme[]>([]);
  const [topUsers, setTopUsers] = useState<TopUser[]>([]);

  useEffect(() => {
    fetchMemes();
  }, []);

  // Calculate leaderboards
  useEffect(() => {
    // Sort memes by likes
    const sortedMemes = memes.sort((a, b) => b.likes - a.likes).slice(0, 10);
    setTopMemes(sortedMemes);

    // Calculate top users based on engagement (likes + comments)
    const userMap = new Map();

    memes.forEach((meme) => {
      const userId = meme.user.id;
      const userName = meme.user.name;
      const userAvatar = meme.user.avatar;

      if (!userMap.has(userId)) {
        userMap.set(userId, {
          id: userId,
          name: userName,
          avatar: userAvatar,
          score: 0,
          memeCount: 0,
        });
      }

      const user = userMap.get(userId);
      user.score += meme.likes + meme.comments.length;
      user.memeCount += 1;
      userMap.set(userId, user);
    });

    // Convert map to array and sort by score
    const sortedUsers = Array.from(userMap.values())
      .sort((a, b) => b.score - a.score)
      .slice(0, 10);

    setTopUsers(sortedUsers);
  }, [memes]);

  // Get trophy icon based on rank
  const getTrophyIcon = (rank: number) => {
    switch (rank) {
      case 0:
        return <Trophy className="h-6 w-6 text-yellow-500" />;
      case 1:
        return <Medal className="h-6 w-6 text-gray-400" />;
      case 2:
        return <Award className="h-6 w-6 text-amber-700" />;
      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center">Leaderboard</h1>

      <Tabs defaultValue="memes" className="mb-8">
        <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto">
          <TabsTrigger value="memes">Top Memes</TabsTrigger>
          <TabsTrigger value="users">Top Users</TabsTrigger>
        </TabsList>

        {loading ? (
          <div className="container mx-auto px-4 py-8 space-y-4">
            {[...Array(5)].map((_, index) => (
              <Card key={index}>
                <CardContent>
                  <div className="flex items-center space-x-4">
                    <Skeleton className="size-12 rounded-lg" />
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-[250px]" />
                      <Skeleton className="h-4 w-[200px]" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <TabsContent value="memes" className="mt-6">
            <div className="grid gap-4">
              {topMemes.map((meme, index) => (
                <motion.div
                  key={meme.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="overflow-hidden">
                    <CardContent className="p-0">
                      <Link href={`/meme/${meme.id}`}>
                        <div className="flex items-center p-4">
                          <div className="flex items-center justify-center h-10 w-10 rounded-full bg-muted mr-4 font-bold">
                            {index + 1}
                          </div>

                          <div className="h-16 w-16 bg-muted rounded-md overflow-hidden mr-4">
                            <Image
                              src={meme.imageUrl || "/placeholder.svg"}
                              alt={meme.title}
                              width={100}
                              height={100}
                              className="object-cover w-full h-full"
                            />
                          </div>

                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold truncate">
                              {meme.title}
                            </h3>
                            <div className="flex items-center text-sm text-muted-foreground">
                              <span>by {meme.user.name}</span>
                              <span className="mx-2">•</span>
                              <span>{meme.likes} likes</span>
                            </div>
                          </div>

                          {index < 3 && (
                            <div className="ml-4">{getTrophyIcon(index)}</div>
                          )}
                        </div>
                      </Link>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}

              {topMemes.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">
                    No memes available for the leaderboard yet.
                  </p>
                </div>
              )}
            </div>
          </TabsContent>
        )}

        {loading ? (
          <div className="container mx-auto px-4 py-8 space-y-4">
            {[...Array(5)].map((_, index) => (
              <Card key={index}>
                <CardContent>
                  <div className="flex items-center space-x-4">
                    <Skeleton className="size-12 rounded-full" />
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-[250px]" />
                      <Skeleton className="h-4 w-[200px]" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <TabsContent value="users" className="mt-6">
            <div className="grid gap-4">
              {topUsers.map((user, index) => (
                <motion.div
                  key={user.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center">
                        <div className="flex items-center justify-center h-10 w-10 rounded-full bg-muted mr-4 font-bold">
                          {index + 1}
                        </div>

                        <Avatar className="h-12 w-12 mr-4">
                          <AvatarImage src={user.avatar} alt={user.name} />
                          <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                        </Avatar>

                        <div className="flex-1">
                          <h3 className="font-semibold">{user.name}</h3>
                          <div className="flex items-center text-sm text-muted-foreground">
                            <span>{user.score} points</span>
                            <span className="mx-2">•</span>
                            <span>{user.memeCount} memes</span>
                          </div>
                        </div>

                        {index < 3 && (
                          <div className="ml-4">{getTrophyIcon(index)}</div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}

              {topUsers.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">
                    No users available for the leaderboard yet.
                  </p>
                </div>
              )}
            </div>
          </TabsContent>
        )}
      </Tabs>
    </div>
  );
}
