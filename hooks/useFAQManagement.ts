// hooks/useFAQManagement.ts
import { useState, useCallback } from "react";

const initialFAQs: FAQItem[] = [
  {
    id: "1",
    question: "How does the Islamic Marriage Platform work?",
    answer: "<p>Our platform follows Islamic guidelines...</p>",
    order: 1,
  },
  {
    id: "2",
    question: "question test 2",
    answer: "<p>Our platform follows Islamic guidelines...</p>",
    order: 2,
  },
  {
    id: "3",
    question: "question test 3",
    answer: "<p>Our platform follows Islamic guidelines...</p>",
    order: 3,
  },
];

export const useFAQManagement = (initialFaqs = initialFAQs) => {
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [faqs, setFaqs] = useState<FAQItem[]>(initialFaqs);

  const addNewFAQ = useCallback(() => {
    const newFAQ: FAQItem = {
      id: Date.now().toString(),
      question: "New Question",
      answer: "<p>Answer here...</p>",
      order: faqs.length + 1,
    };
    setFaqs((prev) => [...prev, newFAQ]);
  }, [faqs.length]);

  const removeFAQ = useCallback((id: string) => {
    setFaqs((prev) => prev.filter((faq) => faq.id !== id));
  }, []);

  const updateFAQ = useCallback(
    (id: string, field: keyof FAQItem, value: unknown) => {
      setFaqs((prev) =>
        prev.map((faq) => (faq.id === id ? { ...faq, [field]: value } : faq))
      );
    },
    []
  );

  const moveFAQ = useCallback(
    (fromIndex: number, toIndex: number) => {
      if (toIndex < 0 || toIndex >= faqs.length) return;

      setFaqs((prev) => {
        const newFaqs = [...prev];
        const [movedItem] = newFaqs.splice(fromIndex, 1);
        newFaqs.splice(toIndex, 0, movedItem);

        // Update orders
        return newFaqs.map((faq, index) => ({
          ...faq,
          order: index + 1,
        }));
      });
    },
    [faqs.length]
  );

  const moveFAQUp = useCallback(
    (index: number) => {
      moveFAQ(index, index - 1);
    },
    [moveFAQ]
  );

  const moveFAQDown = useCallback(
    (index: number) => {
      moveFAQ(index, index + 1);
    },
    [moveFAQ]
  );

  const saveFAQs = async () => {
    setSaving(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setSaving(false);
    setIsEditing(false);
    console.log("Saving FAQs:", faqs);
  };

  const cancelEditing = () => {
    setIsEditing(false);
  };

  const sortedFaqs = [...faqs].sort((a, b) => a.order - b.order);

  return {
    isEditing,
    saving,
    faqs: sortedFaqs,
    actions: {
      setIsEditing,
      addNewFAQ,
      removeFAQ,
      updateFAQ,
      moveFAQUp,
      moveFAQDown,
      saveFAQs,
      cancelEditing,
    },
  };
};
