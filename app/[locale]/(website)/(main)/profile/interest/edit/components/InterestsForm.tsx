"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Form, FormField, FormItem, FormLabel } from "@/components/ui/form";
import {
  foodPreferences,
  interests,
  musicPreferences,
  sportsPreferences,
} from "../constants";
import SubmitButton from "@/components/Buttons/SubmitButton";
import { Save } from "lucide-react";
import EditCard from "./EditCard";

// Validation schema
const interestsSchema = z.object({
  interests: z.array(z.string()).optional(),
  food: z.array(z.string()).optional(),
  music: z.array(z.string()).optional(),
  sports: z.array(z.string()).optional(),
});

type InterestsFormData = z.infer<typeof interestsSchema>;

const InterestsForm = () => {
  const form = useForm<InterestsFormData>({
    resolver: zodResolver(interestsSchema),
    defaultValues: {
      interests: [],
      food: [],
      music: [],
      sports: [],
    },
  });

  const onSubmit = (data: InterestsFormData) => {
    console.log("Form submitted:", data);
    // Handle form submission logic here
  };

  const renderCheckboxGrid = (
    data: string[][],
    fieldName: keyof InterestsFormData
  ) => (
    <FormField
      control={form.control}
      name={fieldName}
      render={() => (
        <FormItem>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {data.map((row, rowIndex) => (
              <div key={rowIndex} className="space-y-3">
                {row.map((item, colIndex) => (
                  <FormField
                    key={`${fieldName}-${rowIndex}-${colIndex}`}
                    control={form.control}
                    name={fieldName}
                    render={({ field }) => (
                      <FormItem className="flex items-center space-x-2 space-y-0">
                        <Checkbox
                          id={`${fieldName}-${rowIndex}-${colIndex}`}
                          checked={field.value?.includes(item)}
                          onCheckedChange={(checked) => {
                            const updatedValue = checked
                              ? [...(field.value || []), item]
                              : field.value?.filter((value) => value !== item);
                            field.onChange(updatedValue);
                          }}
                        />
                        <FormLabel
                          htmlFor={`${fieldName}-${rowIndex}-${colIndex}`}
                          className="text-sm font-normal cursor-pointer"
                        >
                          {item}
                        </FormLabel>
                      </FormItem>
                    )}
                  />
                ))}
              </div>
            ))}
          </div>
        </FormItem>
      )}
    />
  );

  const isLoading = form.formState.isSubmitting;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 mt-8">
        {/* Hobbies & Interests Section */}
        <EditCard question="What do you do for fun / entertainment?">
          {renderCheckboxGrid(interests, "interests")}
        </EditCard>

        {/* Music Preferences Section */}
        <EditCard question="What sort of music are you into?">
          {renderCheckboxGrid(musicPreferences, "music")}
        </EditCard>

        {/* Food Preferences Section */}
        <EditCard question="What sort of food do you like?">
          {renderCheckboxGrid(foodPreferences, "food")}
        </EditCard>

        {/* Sports Preferences Section */}
        <EditCard question="What sports do you play or like to watch?">
          {renderCheckboxGrid(sportsPreferences, "sports")}
        </EditCard>

        {/* Action Buttons */}
        <div className="flex justify-end w-fit ml-auto space-x-4 pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => form.reset()}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <SubmitButton
            isLoading={isLoading}
            loadingText="Saving..."
            type="submit"
            icon={Save}
          >
            Save Changes
          </SubmitButton>
        </div>
      </form>
    </Form>
  );
};

export default InterestsForm;
