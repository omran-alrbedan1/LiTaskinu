"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { Card } from "@/components/ui/card";

interface SearchFiltersProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
}

export const SearchFilters: React.FC<SearchFiltersProps> = ({
  searchTerm,
  setSearchTerm,
}) => (
  <Card className="p-4 w-full">
    <div className="flex items-center gap-2 w-full">
      <div className="flex-1 flex gap-2">
        <Input
          placeholder="Search by username or chat ID..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1"
        />
        <Button variant="outline" size="sm">
          <Search className="w-4 h-4 mr-2" />
          Search
        </Button>
      </div>
    </div>
  </Card>
);
