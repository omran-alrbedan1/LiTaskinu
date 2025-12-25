"use client";

import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import StatusBadge from "@/components/shared/StatusBadge";
import { Calendar, MessageSquare, FileText, MoreVertical, Edit3, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

interface FAQCardProps {
  faq: {
    id: number;
    question: string;
    answer: string;
    is_active: boolean;
    created_at?: string;
    updated_at?: string;
  };
  onEdit: (faq: FAQCardProps['faq']) => void;
  onDelete: (id: number) => void;
  className?: string;
}

export function FAQCard({ faq, onEdit, onDelete, className }: FAQCardProps) {
  const formatDate = (dateString?: string) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const truncateText = (text: string, maxLength: number = 100) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  return (
    <Card className={cn("hover:shadow-lg transition-all duration-200 border-l-4", 
      faq.is_active 
        ? "border-l-green-500 hover:border-l-green-600" 
        : "border-l-gray-300 hover:border-l-gray-400",
      "overflow-hidden group",
      className
    )}>
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div className="space-y-2 flex-1">
            <div className="flex items-center gap-3">
              <StatusBadge
                status={faq.is_active ? "Active" : "Inactive"}
                variant={faq.is_active ? "active" : "inactive"}
                showIcon={true}
                size="sm"
                rounded="full"
                className="border-0"
              />
              <span className="text-xs text-muted-foreground font-medium bg-gray-100 px-2 py-1 rounded">
                ID: {faq.id}
              </span>
            </div>
            
            <CardTitle className="text-lg font-semibold leading-tight line-clamp-2">
              <MessageSquare className="w-4 h-4 inline mr-2 text-primary" />
              {faq.question}
            </CardTitle>
          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <MoreVertical className="h-4 w-4" />
                <span className="sr-only">Open menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => onEdit(faq)} className="cursor-pointer">
                <Edit3 className="w-4 h-4 mr-2 text-blue-600" />
                <span className="text-blue-600">Edit FAQ</span>
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={() => onDelete(faq.id)} 
                className="cursor-pointer text-red-600 focus:text-red-600"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Delete FAQ
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      
      <CardContent className="pb-3">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 mt-1">
            <div className="w-8 h-8 bg-blue-50 rounded-full flex items-center justify-center">
              <FileText className="w-4 h-4 text-blue-600" />
            </div>
          </div>
          <div className="space-y-2 flex-1">
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              {truncateText(faq.answer, 150)}
            </p>
            
            {faq.answer.length > 150 && (
              <p className="text-sm text-blue-600 font-medium">
                View full answer
              </p>
            )}
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="pt-3 border-t bg-gray-50/50 dark:bg-gray-900/30">
        <div className="flex items-center justify-between w-full text-sm text-muted-foreground">
          <div className="flex items-center gap-4">
            {faq.created_at && (
              <div className="flex items-center gap-2">
                <Calendar className="w-3 h-3" />
                <span>Created: {formatDate(faq.created_at)}</span>
              </div>
            )}
            
            {faq.updated_at && faq.created_at !== faq.updated_at && (
              <div className="flex items-center gap-2">
                <Calendar className="w-3 h-3" />
                <span>Updated: {formatDate(faq.updated_at)}</span>
              </div>
            )}
          </div>
          
          <div className="flex items-center gap-2">
            <div className={cn(
              "w-2 h-2 rounded-full animate-pulse",
              faq.is_active ? "bg-green-500" : "bg-gray-400"
            )} />
            <span className="text-xs font-medium">
              {faq.is_active ? "Live" : "Draft"}
            </span>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}

// Also create a compact version for tighter layouts
export function FAQCardCompact({ faq, onEdit, onDelete }: FAQCardProps) {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="flex justify-between items-start gap-4">
          <div className="space-y-2 flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <StatusBadge
                status={faq.is_active ? "Active" : "Inactive"}
                variant={faq.is_active ? "active" : "inactive"}
                showIcon={false}
                size="sm"
                rounded="full"
                className="border-0"
              />
              <span className="text-xs text-gray-500 truncate">
                ID: {faq.id}
              </span>
            </div>
            
            <h4 className="font-medium text-gray-900 truncate">
              {faq.question}
            </h4>
            
            <p className="text-sm text-gray-600 line-clamp-2">
              {faq.answer}
            </p>
          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => onEdit(faq)} className="cursor-pointer">
                <Edit3 className="w-4 h-4 mr-2" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={() => onDelete(faq.id)} 
                className="cursor-pointer text-red-600"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardContent>
    </Card>
  );
}