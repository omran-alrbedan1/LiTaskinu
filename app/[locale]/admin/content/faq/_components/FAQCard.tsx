"use client";

import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import StatusBadge from "@/components/shared/StatusBadge";
import { Calendar, MessageSquare, FileText, MoreVertical, Edit3, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

interface FAQCardProps {
  faq: FAQ;
  onEdit: (faq: FAQCardProps['faq']) => void;
  onDelete: (id: number) => void;
  className?: string;
}

export function FAQCard({ faq, onEdit, onDelete, className }: FAQCardProps) {


  return (
    <Card className={cn("border shadow-sm  ",
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
                className="h-8 w-8 p-0  "
              >
                <MoreVertical className="h-4 w-4 " />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => onEdit(faq)} className="cursor-pointer">
                <Edit3 className="w-4 h-4 mr-2 text-blue-600" />
                <span className="">Edit FAQ</span>
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={() => onDelete(faq.id!)} 
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
              {faq.answer}
            </p>
        
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="pt-3 border-t bg-gray-50/50 dark:bg-gray-900/30">
        <div className="flex items-center justify-between w-full text-sm text-muted-foreground">
          <div className="flex items-center gap-4">
            {faq.created_at && (
              <div className="flex items-center gap-2">
                <Calendar className="w-3 h-3 text-primary-color1" />
                <span>Created: {new Date(faq.created_at).toLocaleDateString()}</span>
              </div>
            )}
            
            {faq.updated_at && faq.created_at !== faq.updated_at && (
              <div className="flex items-center gap-2">
                <Calendar className="w-3 h-3" />
                <span>Updated: {new Date(faq.updated_at).toLocaleDateString()}</span>
              </div>
            )}
          </div>
    
        </div>
      </CardFooter>
    </Card>
  );
}

