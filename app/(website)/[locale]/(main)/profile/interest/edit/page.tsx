import CustomHeader from "@/components/shared/CustomHeader";
import InterestsForm from "./components/InterestsForm";

const InterestsEditPage = () => {
  return (
    <div className="max-w-5xl mx-auto p-4">
      <CustomHeader
        title="Edit Hobbies & Interests"
        description="Let others know what your interests are and help us connect you with other users that may have similar interests. Answer all questions below to complete this step."
        backLink="../interest"
      />
      <InterestsForm />
    </div>
  );
};

export default InterestsEditPage;
