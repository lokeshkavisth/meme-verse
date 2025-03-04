"use client";

import { Comment, Meme } from "@/app/types/meme";
import { getRandomDateISO } from "@/utils/get-random-date-iso";
import {
  createContext,
  useCallback,
  useContext,
  useState,
  type ReactNode,
} from "react";

// Define the context type
interface MemeContextType {
  memes: Meme[];
  loading: boolean;
  hasMore: boolean;
  setPage: (page: number) => void;
  setMemes: (memes: Meme[]) => void;
  fetchMemes: () => void;
  addMeme: (meme: Meme) => void;
  likeMeme: (id: string, value: number) => void;
  addComment: (memeId: string, comment: Comment) => void;
}

interface MemeResult {
  id: string;
  name: string;
  url: string;
  captions: number;
  box_count: number;
  height: number;
  width: number;
}
// Create the context
const MemeContext = createContext<MemeContextType | undefined>(undefined);

// Provider component
export function MemeProvider({ children }: { children: ReactNode }) {
  const [memes, setMemes] = useState<Meme[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);

  // Fetch memes based on category
  const fetchMemes = useCallback(async () => {
    if (loading) return; // Prevent multiple calls if already loading

    setLoading(true);
    try {
      const response = await fetch("https://api.imgflip.com/get_memes");
      const data = await response.json();

      const categories = ["trending", "new", "classic", "random"];
      const resultPerPage = 10;

      if (data.success) {
        console.log(data.data.memes);
        const newMemes = data.data.memes
          .slice(memes.length, memes.length + resultPerPage)
          .map((meme: MemeResult) => ({
            id: meme.id,
            title: meme.name,
            imageUrl: meme.url,
            category: categories[Math.floor(Math.random() * categories.length)],
            caption: meme.captions,
            likes: Math.floor(Math.random() * 1000),
            comments: [],
            created: getRandomDateISO(),
            user: {
              id: `user-${Math.floor(Math.random() * 10)}`,
              name: `User ${Math.floor(Math.random() * 100)}`,
              avatar: "/placeholder.svg?height=40&width=40",
            },
          }));

        setMemes((prevMemes) =>
          page === 1 ? newMemes : [...prevMemes, ...newMemes]
        );
        setPage((prevPage) => prevPage + 1);
        setHasMore(newMemes.length > 0);
      }
    } catch (error) {
      console.error("Failed to fetch memes:", error);
    } finally {
      setLoading(false);
    }
  }, [page]);

  // Add a new meme

  const addMeme = useCallback(async (meme: Meme) => {
    try {
      const url = `https://memegen.link/custom/${encodeURIComponent(
        meme.title
      )}/${encodeURIComponent(meme.caption)}.jpg`;
      // console.log(url);

      setMemes((prevMemes) => [{ ...meme, imageUrl: url }, ...prevMemes]);
    } catch (error) {
      console.error("Failed to create meme:", error);
    }
  }, []);

  // Like/unlike a meme
  const likeMeme = useCallback((id: string, value: number) => {
    setMemes((prevMemes) =>
      prevMemes.map((meme) =>
        meme.id === id ? { ...meme, likes: meme.likes + value } : meme
      )
    );
  }, []);

  // Add a comment to a meme
  const addComment = useCallback((memeId: string, comment: Comment) => {
    setMemes((prevMemes) =>
      prevMemes.map((meme) =>
        meme.id === memeId
          ? { ...meme, comments: [comment, ...meme.comments] }
          : meme
      )
    );
  }, []);

  return (
    <MemeContext.Provider
      value={{
        memes,
        loading,
        hasMore,
        setPage,
        setMemes,
        fetchMemes,
        addMeme,
        likeMeme,
        addComment,
      }}
    >
      {children}
    </MemeContext.Provider>
  );
}

// Custom hook to use the meme context
export function useMemeContext() {
  const context = useContext(MemeContext);
  if (context === undefined) {
    throw new Error("useMemeContext must be used within a MemeProvider");
  }
  return context;
}
