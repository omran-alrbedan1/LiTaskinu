"use client";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/admin/shared";
import { Save, Edit3, Plus, HelpCircle } from "lucide-react";
import { useFAQManagement } from "@/hooks/useFAQManagement";
import { FAQItem } from "./FAQItem";


const FAQList: React.FC<FAQListProps> = ({
  faqs,
  isEditing,
  onAddFAQ,
  onUpdateFAQ,
  onRemoveFAQ,
  onMoveFAQUp,
  onMoveFAQDown,
}) => (
  <div className="space-y-6">
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-primary-color1" />
          Frequently Asked Questions
          <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
            ({faqs.length} questions)
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {faqs.map((faq, index) => (
          <FAQItem
            key={faq.id}
            faq={faq}
            index={index}
            isEditing={isEditing}
            totalFaqs={faqs.length}
            onUpdate={onUpdateFAQ}
            onRemove={onRemoveFAQ}
            onMoveUp={onMoveFAQUp}
            onMoveDown={onMoveFAQDown}
          />
        ))}

        {isEditing && (
          <div className="flex justify-center pt-4">
            <Button
              onClick={onAddFAQ}
              className="flex items-center gap-2"
              variant="outline"
            >
              <Plus className="w-4 h-4" />
              Add New FAQ (Question #{faqs.length + 1})
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  </div>
);

export default FAQList;
