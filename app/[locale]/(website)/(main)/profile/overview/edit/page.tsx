  "use client";

  import { Save } from "lucide-react";
  import { Form } from "@/components/ui/form";
  import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion";
  import { Button } from "@/components/ui/button";
  import { Card } from "@/components/ui/card";

  // Hooks
  import { useProfileForm } from "@/hooks/useProfileForm";

  // Components
  import SubmitButton from "@/components/Buttons/SubmitButton";
  import CustomHeader from "@/components/shared/CustomHeader";
  import { PROFILE_SECTIONS } from "../constants/profile-sections";
import { SectionContent } from "../_components/SectionContent";


  const EditPersonalDataPage = () => {
    const { form, isLoading, error, handleSubmit } = useProfileForm();

    return (
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <Card className="p-6 shadow-lg dark:bg-gray-900 dark:border-gray-800">
          {/* Header using CustomHeader component */}
          <CustomHeader
            title="Edit Personal Information"
            description="Update your personal details and information"
            backLink="../overview"
            showBackButton={true}
          />

          <Form {...form}>
            <form onSubmit={handleSubmit} className="space-y-8">
              <Accordion 
                type="multiple" 
                defaultValue={["basicInfo"]}
                className="space-y-4"
              >
                {PROFILE_SECTIONS.map((section) => (
                  <AccordionItem
                    key={section.id}
                    value={section.id}
                    className="border rounded-lg overflow-hidden bg-white dark:bg-gray-900 shadow-sm hover:shadow-md transition-shadow dark:border-gray-800"
                  >
                    <AccordionTrigger className="px-6 py-5 hover:no-underline hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors data-[state=open]:bg-gray-50 dark:data-[state=open]:bg-gray-800">
                      <div className="flex items-center gap-4 text-left w-full">
                        <div className="p-2 bg-primary-color1/10 rounded-lg dark:bg-primary-color1/20">
                          <section.icon className="w-5 h-5 text-primary-color1 dark:text-primary-color1/80" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                            {section.title}
                          </h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                            {section.description}
                          </p>
                        </div>
                      </div>
                    </AccordionTrigger>

                    <AccordionContent className="px-6 pb-6 pt-4 bg-gray-50/50 dark:bg-gray-800/50">
                      <SectionContent
                        section={section}
                        control={form.control}
                      />
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row justify-end gap-3 pt-8 border-t border-gray-200 dark:border-gray-700">
                <Button
                  asChild
                  variant="outline"
                  className="w-full sm:w-auto dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-gray-100"
                >
                  <a href="../overview">
                    Cancel
                  </a>
                </Button>
                
                <SubmitButton
                  isLoading={isLoading}
                  loadingText="Saving changes..."
                  type="submit"
                  icon={Save}
                  className="w-full sm:w-auto bg-primary-color1 hover:bg-primary-color1/90 dark:bg-primary-color1 dark:hover:bg-primary-color1/80"
                  size="lg"
                >
                  Save Changes
                </SubmitButton>
              </div>
            </form>
          </Form>
        </Card>
      </div>
    );
  };

  export default EditPersonalDataPage;