"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Heart, 
  MapPin, 
  Star, 
  Calendar, 
  MoreVertical, 
  Edit3, 
  Trash2, 
  HeartIcon
} from "lucide-react";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { AiFillHeart } from "react-icons/ai";
interface SuccessStoryCardProps {
  story: {
    id: number;
    name_male: string;
    name_female: string;
    description: string;
    testimonial: string;
    rating: string;
    country_id: string;
    city_id: string;
    created_at: string;
    updated_at: string;
    country?: {
      id: number;
      name: string;
    };
    city?: {
      id: number;
      name: string;
    };
  };
  onEdit: () => void;
  onDelete: () => void;
  className?: string;
}

export const SuccessStoryCard = ({ 
  story, 
  onEdit, 
  onDelete,
  className 
}: SuccessStoryCardProps) => {

  // Star rating display
  const renderStars = () => {
    const rating = parseInt(story.rating) || 0;
    return (
      <div className="flex items-center">
        {[...Array(5)].map((_, index) => (
          <Star
            key={index}
            className={`w-4 h-4 ${index < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
          />
        ))}
        <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">
          ({rating}/5)
        </span>
      </div>
    );
  };

  return (
    <Card className={cn(
      "overflow-hidden hover:shadow-lg transition-shadow duration-300 border border-gray-200 dark:border-gray-700",
      className
    )}>
      <CardContent className="p-6">
        {/* Header with couple names, rating, and dropdown menu */}
        <div className="flex items-start justify-between mb-4">
          <div className="space-y-2 flex-1">
            <div className="flex items-center gap-2">
              <AiFillHeart className="w-5 h-5 text-red-500" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {story.name_male} & {story.name_female}
              </h3>
            </div>
            <div className="mt-1">
              {renderStars()}
            </div>
          </div>
          
          <div className="flex items-center gap-2">
          
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="h-8 w-8 p-0"
                >
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem 
                  onClick={onEdit} 
                  className="cursor-pointer"
                >
                  <Edit3 className="w-4 h-4 mr-2 text-blue-600" />
                  <span>Edit Story</span>
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={onDelete} 
                  className="cursor-pointer text-red-600 focus:text-red-600"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete Story
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Location and Date */}
        <div className="space-y-3 mb-4">
          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
            <MapPin className="w-4 h-4" />
            <span>{story.city?.name || 'Unknown City'}, {story.country?.name || 'Unknown Country'}</span>
          </div>

          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
            <Calendar className="w-4 h-4" />
            <span>Added: {new Date(story.created_at).toLocaleDateString()}</span>
          </div>
        </div>

        {/* Story Preview */}
        <div className="mb-6">
          <div 
            className="prose prose-sm dark:prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: story.description }}
          />
        </div>

        {/* Footer with additional info if needed */}
        {story.updated_at && story.created_at !== story.updated_at && (
          <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
              <Calendar className="w-3 h-3" />
              <span>Last updated: {new Date(story.updated_at).toLocaleDateString()}</span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};