"use client";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Form } from "@/components/ui/form";
import SubmitButton from "@/components/Buttons/SubmitButton";
import { Save } from "lucide-react";
import EditCard from "./EditCard";
import useGetData from "@/hooks/useGetData";
import usePostData from "@/hooks/usePostData";
import { InterestsFormData, interestsSchema } from "@/validation/profile-schema";
import Loader from "@/components/shared/Loader";



const InterestsForm = () => {
  const form = useForm<InterestsFormData>({
    resolver: zodResolver(interestsSchema),
    defaultValues: {
      interests: [],
    },
  });

  const { data: apiData, loading: dataLoading, refetch } = useGetData<any>({
    url: "/api/website/profile/interests/get",
  });

  const { postData, loading: submitLoading } = usePostData("/api/website/profile/interests", {
    showNotifications: true,
    successMessage: "Interests updated successfully!",
    onSuccess: refetch,
  });

  // Initialize form
  useEffect(() => {
    if (apiData?.data?.selected_interests) {
      form.reset({
        interests: apiData.data.selected_interests,
      });
    }
  }, [apiData, form]);

  const onSubmit = async (data: InterestsFormData) => {
    const formData = new FormData();
    data.interests.forEach(id => {
      formData.append('interests[]', id.toString());
    });

    await postData(formData);
  };

  const renderCategory = (categoryName: string, items: Record<string, string>, question: string) => {
    const selectedIds = form.watch("interests") || [];

    return (
      <EditCard key={categoryName} question={question}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {Object.entries(items).map(([id, label]) => {
            const numericId = parseInt(id);
            return (
              <div key={id} className="flex items-center space-x-2">
                <Checkbox
                  id={`interest-${id}`}
                  checked={selectedIds.includes(numericId)}
                  onCheckedChange={(checked) => {
                    const current = form.getValues("interests") || [];
                    const updated = checked
                      ? [...current, numericId]
                      : current.filter(item => item !== numericId);
                    form.setValue("interests", updated);
                  }}
                />
                <label
                  htmlFor={`interest-${id}`}
                  className="text-sm font-normal cursor-pointer hover:text-primary transition-colors"
                >
                  {label}
                </label>
              </div>
            );
          })}
        </div>
      </EditCard>
    );
  };

  if(dataLoading){
    return <Loader/>
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 mt-8">
        {/* Entertainment */}
        {apiData?.data?.interests?.Entertainment && 
          renderCategory(
            "Entertainment", 
            apiData.data.interests.Entertainment, 
            "What do you do for fun / entertainment?"
          )
        }

        {/* Music */}
        {apiData?.data?.interests?.Music && 
          renderCategory(
            "Music", 
            apiData.data.interests.Music, 
            "What sort of music are you into?"
          )
        }

        {/* Food */}
        {apiData?.data?.interests?.Food && 
          renderCategory(
            "Food", 
            apiData.data.interests.Food, 
            "What sort of food do you like?"
          )
        }

        {/* Sports */}
        {apiData?.data?.interests?.Sports && 
          renderCategory(
            "Sports", 
            apiData.data.interests.Sports, 
            "What sports do you play or like to watch?"
          )
        }

        {/* Action Buttons */}
        <div className="flex justify-end w-fit ml-auto space-x-4 pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => {
              const defaultValues = apiData?.data?.selected_interests || [];
              form.reset({ interests: defaultValues });
            }}
            disabled={submitLoading}
          >
            Reset
          </Button>
          <SubmitButton
            isLoading={submitLoading}
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