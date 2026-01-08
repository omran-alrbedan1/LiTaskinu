"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from "@/components/ui/form";
import { useRouter } from "next/navigation";
import { ICONS } from "@/constants/icons";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import { genderOptions } from "@/constants/options";
import Image from "next/image";
import { images } from "@/constants/images";
import usePostData from "@/hooks/usePostData";
import { RegisterFormValidation } from "@/validation";
import CustomFormField, {
  FormFieldType,
} from "@/components/shared/CustomInput";
import SubmitButton from "@/components/Buttons/SubmitButton";
import useGetData from "@/hooks/useGetData";
import { useEffect } from "react";

const RegisterForm = () => {
  const router = useRouter();

  // Force dark mode on mount
  useEffect(() => {
    document.documentElement.classList.add('dark');
    document.body.classList.add('dark');
    
    return () => {
      document.documentElement.classList.remove('dark');
      document.body.classList.remove('dark');
    };
  }, []);

  const {
    data: countries,
    loading: isFetchingCountries,
    error: fetchError,
    refetch: refetchCountries,
  } = useGetData<Country[]>({
    url: "/api/public/countries",
    enabled: true,
  });
  const countriesData = countries?.map((country:Country) => ({
    value: country.id.toString(),
    label: `${country.name}`,
    code: country.code,
  }));

  const {
    data: cities,
    loading: isFetchingCities,
    error: fetchCitiesError,
    refetch: refetchCities,
  } = useGetData<City[]>({
    url: "/api/public/cities",
    enabled: true,
  });

  const citiesData = cities?.map((city:City) => ({
    value: city.id.toString(),
    label: `${city.name}`,
  }));

  const {
    postData,
    loading: isLoading,
    error,
    success,
  } = usePostData("/api/website/signup", {
    showNotifications: true,
    successMessage: "Registration successful! Please verify your email.",
    errorMessage: "Registration failed. Please try again.",
    onSuccess: (data) => {
      router.push(
        `./otp-verification?email=${encodeURIComponent(
          form.getValues("email")
        )}`
      );
    },
  });

  const form = useForm<z.infer<typeof RegisterFormValidation>>({
    resolver: zodResolver(RegisterFormValidation),
    defaultValues: {
      first_name: "",
      last_name: "",
      gender: "",
      birath_day: "",
      country_id: "",
      city_id: "",
      email: "",
      phone: "",
      password: "",
      password_confirmation: "",
      role: "children",
    },
  });

  async function onSubmit(values: z.infer<typeof RegisterFormValidation>) {
    const formattedValues = {
      ...values,
      country_id: Number(values.country_id),
      city_id: Number(values.city_id),
      birath_day:
        values.birath_day instanceof Date
          ? values.birath_day.toISOString().split("T")[0]
          : values.birath_day,
    };

    await postData(formattedValues);
  }

  const handleGoogleSuccess = async (
    credentialResponse: CredentialResponse
  ) => {
    const credential = credentialResponse.credential;

    if (credential) {
      try {
        await postData({
          googleCredential: credential,
          loginType: "google",
        });
      } catch (error) {
        console.error("Google registration error:", error);
      }
    }
  };

  return (
    <div className="w-full  py-44   sm:py-16 lg:py-20 mt-56 sm:mt-48 lg:mt-56 px-4 sm:px-6 lg:px-8 rounded-lg shadow-sm bg-transparent dark">
      <div className="text-center mt-14 mb-6 sm:mb-8">
    
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white">
          Create Account
        </h2>
        <p className="mt-2 text-xs sm:text-sm text-gray-400">
          Sign up for a new account  
        </p>
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 sm:space-y-6 text-white"
        >
          {/* Name Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name="first_name"
              label="First Name"
              placeholder="John"
              iconSrc={ICONS.userInput}
              iconAlt="first name"
            />

            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name="last_name"
              label="Last Name"
              placeholder="Doe"
              iconSrc={ICONS.userInput}
              iconAlt="last name"
            />
          </div>

          {/* Gender and Country Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
            <CustomFormField
              fieldType={FormFieldType.SELECT}
              control={form.control}
              name="gender"
              label="Gender"
              placeholder="Select gender"
              options={genderOptions}
            />

            <CustomFormField
              fieldType={FormFieldType.SELECT}
              control={form.control}
              name="country_id"
              label="Country"
              placeholder="Select your country"
              options={countriesData}
            />
          </div>

          {/* City and Date of Birth Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
            <CustomFormField
              fieldType={FormFieldType.SELECT}
              control={form.control}
              name="city_id"
              label="City"
              placeholder="Select your city"
              options={citiesData}
            />

            <CustomFormField
              fieldType={FormFieldType.DATE_PICKER}
              control={form.control}
              name="birath_day"
              label="Date of Birth"
              placeholder="Select your birth date"
            />
          </div>

          {/* Email Field */}
          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="email"
            label="Email Address"
            placeholder="john@gmail.com"
            iconSrc={ICONS.email}
            iconAlt="email"
          />

          {/* Phone Field - Fixed */}
          <div className="dark">
            <CustomFormField
              fieldType={FormFieldType.PHONE_INPUT}
              control={form.control}
              name="phone"
              label="Phone Number"
              placeholder="Enter your phone number"
            />
          </div>

          {/* Password Fields */}
          <div className="grid grid-cols-1 md:grid-cols-1 gap-3 sm:gap-4">
            <CustomFormField
              control={form.control}
              fieldType={FormFieldType.PASSWORD}
              name="password"
              label="Password"
              placeholder="Enter your password"
              iconSrc={ICONS.lock}
              iconAlt="password"
            />

            <CustomFormField
              control={form.control}
              fieldType={FormFieldType.PASSWORD}
              name="password_confirmation"
              label="Confirm Password"
              placeholder="Enter your password again"
              iconSrc={ICONS.lock}
              iconAlt="password"
            />
          </div>

          <SubmitButton
            loadingText="Creating Account..."
            isLoading={isLoading}
            className="w-full text-sm sm:text-base"
          >
            Create Account
          </SubmitButton>
        </form>
      </Form>

      {/* Divider */}
      <div className="relative my-4 sm:my-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-400" />
        </div>
        <div className="relative flex justify-center text-xs sm:text-sm">
          <span className="px-2 bg-black text-gray-300">Or continue with</span>
        </div>
      </div>

      {/* Google Registration */}
      <div className="bg-white rounded-lg overflow-hidden">
        <GoogleLogin
          onSuccess={handleGoogleSuccess}
          useOneTap
          text="signup_with"
          shape="rectangular"
          size="large"
          width={"100%"}
        />
      </div>

      {/* Sign In Link */}
      <div className="mt-4 sm:mt-6 text-center">
        <p className="text-xs sm:text-sm text-gray-300">
          Already have an account?{" "}
          <button
            onClick={() => router.push("./sign-in")}
            className="font-medium text-white hover:text-gray-300 transition-colors"
          >
            Sign in
          </button>
        </p>
      </div>
    </div>
  );
};

export default RegisterForm;