"use client";

import { MemeFilters } from "@/components/meme-filters";
import { MemeGrid } from "@/components/meme-grid";
import { MemeSearch } from "@/components/meme-search";
import { useMemeContext } from "@/context/meme-context";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { Category } from "../types/meme";

export default function ExplorePage() {
  const { memes, fetchMemes, loading, hasMore } = useMemeContext();
  const [category, setCategory] = useState<Category>(Category.Trending);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sortBy, setSortBy] = useState<string>("likes");

  const { ref, inView } = useInView({
    threshold: 0.1,
  });

  // Handle infinite scroll only if no search and category is trending
  useEffect(() => {
    if (
      inView &&
      hasMore &&
      !loading &&
      searchQuery === "" &&
      category === "trending"
    ) {
      fetchMemes();
    }
  }, [inView, hasMore, loading, fetchMemes, searchQuery, category]);

  // Handle category change (only filters, no fetch)
  const handleCategoryChange = (newCategory: Category) => {
    setSearchQuery("");
    setCategory(newCategory);
  };

  // Handle search (only filters, no fetch)
  const handleSearch = (query: string) => {
    console.log(query);
    setSearchQuery(query);
  };

  // Handle sort change (only filters, no fetch)
  const handleSortChange = (sort: string) => {
    setSortBy(sort);
  };

  // Filter and sort memes
  const filteredMemes = memes
    .filter(
      (meme) =>
        (category === "trending" || meme.category === category) && // Filter by category
        (searchQuery === "" ||
          meme.title.toLowerCase().includes(searchQuery.toLowerCase())) // Filter by search query
    )
    .sort((a, b) => {
      if (sortBy === "likes") return b.likes - a.likes;
      if (sortBy === "date")
        return new Date(b.created).getTime() - new Date(a.created).getTime();
      if (sortBy === "comments")
        return (b.comments?.length ?? 0) - (a.comments?.length ?? 0);
      return 0;
    });

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Explore Memes</h1>

      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <MemeSearch onSearch={handleSearch} />
        <MemeFilters
          category={category}
          onCategoryChange={handleCategoryChange}
          sortBy={sortBy}
          onSortChange={handleSortChange}
        />
      </div>

      <MemeGrid memes={filteredMemes} />

      {loading && (
        <div className="flex justify-center my-8">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      )}

      {/* Intersection observer target for infinite scroll */}
      {hasMore && searchQuery === "" && category === "trending" && (
        <div ref={ref} className="h-10" />
      )}

      {!hasMore && !loading && (
        <p className="text-center text-muted-foreground my-8">
          You&apos;ve reached the end of the memes!
        </p>
      )}
    </div>
  );
}
