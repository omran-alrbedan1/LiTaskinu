"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from "@/components/ui/form";
import { ICONS } from "@/constants/icons";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import { useGenderOptions } from "@/constants/options";
import usePostData from "@/hooks/usePostData";
import { useRegisterFormValidation } from "@/validation";
import CustomFormField, {
  FormFieldType,
} from "@/components/shared/CustomInput";
import SubmitButton from "@/components/Buttons/SubmitButton";
import useGetData from "@/hooks/useGetData";
import { useEffect } from "react";
import { useRouter } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

const RegisterForm = () => {
  const router = useRouter();

  const t = useTranslations("auth");
  const ft = useTranslations("fields");

  const RegisterFormValidation = useRegisterFormValidation();

  const genderOptions = useGenderOptions();

  // Force dark mode on mount
  useEffect(() => {
    document.documentElement.classList.add("dark");
    document.body.classList.add("dark");

    return () => {
      document.documentElement.classList.remove("dark");
      document.body.classList.remove("dark");
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
    successMessage: t("register_success"),
    errorMessage: t("register_failed"),
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

  const handleGoogleSuccess = async (credentialResponse: CredentialResponse) => {
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
    <div className="w-full py-44 sm:py-16 lg:py-20 mt-56 sm:mt-48 lg:mt-56 px-4 sm:px-6 lg:px-8 rounded-lg shadow-sm bg-transparent dark">
      <div className="text-center mt-14 mb-6 sm:mb-8">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white">
          {t("register_create_account")}
        </h2>
        <p className="mt-2 text-xs sm:text-sm text-gray-400">
          {t("register_subtitle")}
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
              label={ft("first_name")}
              placeholder={ft("first_name_placeholder")}
              iconSrc={ICONS.userInput}
              iconAlt="first name"
            />

            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name="last_name"
              label={ft("last_name")}
              placeholder={ft("last_name_placeholder")}
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
              label={ft("gender")}
              placeholder={ft("gender_placeholder")}
              options={genderOptions}
            />

            <CustomFormField
              fieldType={FormFieldType.SELECT}
              control={form.control}
              name="country_id"
              label={ft("country")}
              placeholder={ft("country_placeholder")}
              options={countriesData}
            />
          </div>

          {/* City and Date of Birth Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
            <CustomFormField
              fieldType={FormFieldType.SELECT}
              control={form.control}
              name="city_id"
              label={ft("city")}
              placeholder={ft("city_placeholder")}
              options={citiesData}
            />

            <CustomFormField
              fieldType={FormFieldType.DATE_PICKER}
              control={form.control}
              name="birath_day"
              label={ft("date_of_birth")}
              placeholder={ft("date_of_birth_placeholder")}
            />
          </div>

          {/* Email Field */}
          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="email"
            label={ft("email_address")}
            placeholder={ft("email_placeholder")}
            iconSrc={ICONS.email}
            iconAlt="email"
          />

          {/* Phone Field */}
          <div className="dark">
            <CustomFormField
              fieldType={FormFieldType.PHONE_INPUT}
              control={form.control}
              name="phone"
              label={ft("phone_number")}
              placeholder={ft("phone_placeholder")}
            />
          </div>

          {/* Password Fields */}
          <div className="grid grid-cols-1 md:grid-cols-1 gap-3 sm:gap-4">
            <CustomFormField
              control={form.control}
              fieldType={FormFieldType.PASSWORD}
              name="password"
              label={ft("password")}
              placeholder={ft("password_placeholder")}
              iconSrc={ICONS.lock}
              iconAlt="password"
            />

            <CustomFormField
              control={form.control}
              fieldType={FormFieldType.PASSWORD}
              name="password_confirmation"
              label={ft("confirm_password")}
              placeholder={ft("confirm_password_again_placeholder")}
              iconSrc={ICONS.lock}
              iconAlt="password"
            />
          </div>

          <SubmitButton
            loadingText={t("creating_account")}
            isLoading={isLoading}
            className="w-full text-sm sm:text-base"
          >
            {t("register_create_account")}
          </SubmitButton>
        </form>
      </Form>

      {/* Divider */}
      <div className="relative my-4 sm:my-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-400" />
        </div>
        <div className="relative flex justify-center text-xs sm:text-sm">
          <span className="px-2 bg-black text-gray-300">{t("or_continue_with")}</span>
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
          {t("already_have_account")}{" "}
          <button
            onClick={() => router.push("./sign-in")}
            className="font-medium text-white hover:text-gray-300 transition-colors"
          >
            {t("sign_in")}
          </button>
        </p>
      </div>
    </div>
  );
};

export default RegisterForm;
