"use client";

import { Category } from "@/app/types/meme";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Flame, Clock, Star, Shuffle } from "lucide-react";

interface MemeFiltersProps {
  category: Category;
  onCategoryChange: (category: Category) => void;
  sortBy: string;
  onSortChange: (sort: string) => void;
}

export function MemeFilters({
  category,
  onCategoryChange,
  sortBy,
  onSortChange,
}: MemeFiltersProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-4">
      <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0">
        <Button
          variant={category === "trending" ? "default" : "outline"}
          size="sm"
          onClick={() => onCategoryChange(Category.Trending)}
          className="flex gap-1"
        >
          <Flame className="h-4 w-4" />
          Trending
        </Button>
        <Button
          variant={category === "new" ? "default" : "outline"}
          size="sm"
          onClick={() => onCategoryChange(Category.New)}
          className="flex gap-1"
        >
          <Clock className="h-4 w-4" />
          New
        </Button>
        <Button
          variant={category === "classic" ? "default" : "outline"}
          size="sm"
          onClick={() => onCategoryChange(Category.Classic)}
          className="flex gap-1"
        >
          <Star className="h-4 w-4" />
          Classic
        </Button>
        <Button
          variant={category === "random" ? "default" : "outline"}
          size="sm"
          onClick={() => onCategoryChange(Category.Random)}
          className="flex gap-1"
        >
          <Shuffle className="h-4 w-4" />
          Random
        </Button>
      </div>

      <div className="flex-1 sm:flex-none sm:ml-auto">
        <Select value={sortBy} onValueChange={onSortChange}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="likes">Most Liked</SelectItem>
            <SelectItem value="date">Newest</SelectItem>
            <SelectItem value="comments">Most Comments</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
