"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import SubmitButton from "@/components/Buttons/SubmitButton";
import { Save } from "lucide-react";

const personalitySchema = z.object({
  favoriteMovie: z.string().min(1, "Please share your favorite movie"),
  favoriteBook: z.string().min(1, "Please share your favorite book"),
  favoriteFood: z.string().min(1, "Please share your food preferences"),
  hobbiesInterests: z
    .string()
    .min(1, "Please describe your hobbies and interests"),
  dressSense: z
    .string()
    .min(1, "Please describe your dress sense and appearance"),
  senseOfHumor: z.string().min(1, "Please describe your sense of humor"),
  personalityDescription: z.string().min(1, "Please describe your personality"),
  travelPreferences: z
    .string()
    .min(1, "Please share your travel experiences or dreams"),
  culturalAdaptability: z
    .string()
    .min(1, "Please describe your cultural adaptability"),
  romanticWeekend: z
    .string()
    .min(1, "Please describe your perfect romantic weekend"),
  perfectMatch: z.string().min(1, "Please describe your perfect match"),
});

type PersonalityFormData = z.infer<typeof personalitySchema>;

const EditPersonalityForm = () => {
  const form = useForm<PersonalityFormData>({
    resolver: zodResolver(personalitySchema),
    defaultValues: {
      favoriteMovie: "",
      favoriteBook: "",
      favoriteFood: "",
      hobbiesInterests: "",
      dressSense: "",
      senseOfHumor: "",
      personalityDescription: "",
      travelPreferences: "",
      culturalAdaptability: "",
      romanticWeekend: "",
      perfectMatch: "",
    },
  });

  const { watch } = form;
  const formValues = watch();

  // Calculate progress
  const answeredQuestions = Object.values(formValues).filter(
    (value) => value.trim().length > 0
  ).length;
  const totalQuestions = Object.keys(formValues).length;
  const progress = (answeredQuestions / totalQuestions) * 100;

  const onSubmit = (data: PersonalityFormData) => {
    console.log("Personality form submitted:", data);
    // Handle form submission logic here
  };

  const isLoading = form.formState.isSubmitting;

  const questions = [
    {
      name: "personalityDescription" as const,
      label: "How would you describe your personality?",
      placeholder:
        "Describe your personality traits, characteristics, and what makes you unique...",
    },
    {
      name: "travelPreferences" as const,
      label: "Where have you traveled or would like to travel to?",
      placeholder:
        "Share your travel experiences, favorite destinations, or dream places you'd like to visit...",
    },
    {
      name: "culturalAdaptability" as const,
      label:
        "How adaptive are you to having a partner from a different culture to your own?",
      placeholder:
        "Describe your openness to cultural differences, experiences with diverse cultures, and adaptability...",
    },
    {
      name: "romanticWeekend" as const,
      label: "How would you spend a perfect romantic weekend?",
      placeholder:
        "Describe your ideal romantic weekend - activities, atmosphere, and what makes it special for you...",
    },
    {
      name: "perfectMatch" as const,
      label: "What sort of person would be your perfect match?",
      placeholder:
        "Describe the qualities, values, and characteristics you're looking for in a partner...",
    },
    {
      name: "favoriteMovie" as const,
      label: "What is your favorite movie?",
      placeholder: "Tell us about your favorite movie and why you love it...",
    },
    {
      name: "favoriteBook" as const,
      label: "What is your favorite book?",
      placeholder:
        "Share your favorite book and what makes it special to you...",
    },
    {
      name: "favoriteFood" as const,
      label: "What sort of food do you like?",
      placeholder:
        "Describe your favorite cuisines, dishes, or food experiences...",
    },
    {
      name: "hobbiesInterests" as const,
      label: "What are your hobbies and interests?",
      placeholder:
        "What do you enjoy doing in your free time? What are you passionate about?",
    },
    {
      name: "dressSense" as const,
      label: "How would you describe your dress sense and physical appearance?",
      placeholder:
        "Describe your personal style, how you like to dress, and your physical features...",
    },
    {
      name: "senseOfHumor" as const,
      label: "How would you describe your sense of humor?",
      placeholder: "What kind of humor do you enjoy? What makes you laugh?",
    },
  ];

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 mt-6">
        {/* Progress Section */}

        {/* Questions Grid */}
        <div className="grid gap-6">
          {questions.map((question) => (
            <Card key={question.name}>
              <CardHeader>
                <CardTitle className="text-lg font-semibold">
                  {question.label}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <FormField
                  control={form.control}
                  name={question.name}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Textarea
                          placeholder={question.placeholder}
                          className="min-h-[120px] resize-y"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end w-fit ml-auto space-x-4 pt-6 border-t">
          <Button
            type="button"
            variant="outline"
            onClick={() => form.reset()}
            disabled={isLoading}
          >
            Reset
          </Button>
          <SubmitButton
            isLoading={isLoading}
            loadingText="Saving..."
            type="submit"
            icon={Save}
          >
            Save Personality Profile
          </SubmitButton>
        </div>
      </form>
    </Form>
  );
};

export default EditPersonalityForm;
