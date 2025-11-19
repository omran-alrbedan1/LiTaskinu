"use client";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/admin/shared";
import { Save, Edit3 } from "lucide-react";
import { useFAQManagement } from "@/hooks/useFAQManagement";
import FAQList from "./_components/FAQList";

const FAQPage = () => {
  const {
    isEditing,
    saving,
    faqs,
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
  } = useFAQManagement();

  return (
    <div className="mx-auto pb-32 p-6 max-h-[90vh] sidebar-scrollbar overflow-auto">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <Header
          title="Manage Frequently Asked Questions"
          description="Add and manage FAQ questions and answers for your website"
        />
        <div className="flex items-center gap-2">
          {isEditing ? (
            <>
              <Button
                variant="outline"
                onClick={cancelEditing}
                disabled={saving}
              >
                Cancel
              </Button>
              <Button
                onClick={saveFAQs}
                disabled={saving}
                className="flex items-center gap-2 bg-primary-color1 text-white"
              >
                <Save className="w-4 h-4" />
                {saving ? "Saving..." : "Save Changes"}
              </Button>
            </>
          ) : (
            <Button
              onClick={() => setIsEditing(true)}
              className="flex items-center gap-2 bg-primary-color1 text-white"
            >
              <Edit3 className="w-4 h-4" />
              Edit FAQs
            </Button>
          )}
        </div>
      </div>

      {/* FAQ List */}
      <FAQList
        faqs={faqs}
        isEditing={isEditing}
        onAddFAQ={addNewFAQ}
        onUpdateFAQ={updateFAQ}
        onRemoveFAQ={removeFAQ}
        onMoveFAQUp={moveFAQUp}
        onMoveFAQDown={moveFAQDown}
      />
    </div>
  );
};

export default FAQPage;
