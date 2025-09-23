import Switcher from "@/components/parts/Switcher";
import { useTranslations } from "next-intl";

export default function HomePage() {
  const t = useTranslations("Home");
  const t1 = useTranslations("Step1");
  return (
    <div>
      <Switcher />
      <h1>{t("title")}</h1>
      <h1>{t1("title")}</h1>
    </div>
  );
}
