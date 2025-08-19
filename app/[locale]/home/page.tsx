import Switcher from "@/components/parts/Switcher";
import { useTranslations } from "next-intl";
import {
  Heart,
  Shield,
  Users,
  CheckCircle,
  Download,
  Star,
  ArrowRight,
  Play,
} from "lucide-react";

export default function HomePage() {
  const t = useTranslations("Home");
  const t1 = useTranslations("Step1");

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-emerald-100">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-600 to-teal-600 rounded-lg flex items-center justify-center">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-emerald-800">لتسكنوا</h1>
            </div>

            <nav className="hidden md:flex items-center space-x-8">
              <a
                href="#features"
                className="text-gray-700 hover:text-emerald-600 transition-colors"
              >
                {t("features") || "الميزات"}
              </a>
              <a
                href="#how-it-works"
                className="text-gray-700 hover:text-emerald-600 transition-colors"
              >
                {t("how_it_works") || "كيف يعمل"}
              </a>
              <a
                href="#success-stories"
                className="text-gray-700 hover:text-emerald-600 transition-colors"
              >
                {t("success_stories") || "قصص النجاح"}
              </a>
              <a
                href="#download"
                className="text-gray-700 hover:text-emerald-600 transition-colors"
              >
                {t("download") || "تحميل"}
              </a>
            </nav>

            <div className="flex items-center space-x-4">
              <Switcher />
              <button className="hidden md:block px-4 py-2 text-emerald-600 hover:text-emerald-700 transition-colors">
                {t("login") || "تسجيل الدخول"}
              </button>
              <button className="px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors">
                {t("register") || "التسجيل"}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 lg:py-32">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-right">
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                {t("hero_title") || (
                  <>
                    <span className="text-emerald-600">وجعل بينكم</span>
                    <br />
                    مودة ورحمة
                  </>
                )}
              </h1>

              <p className="text-xl text-gray-600 mb-8 max-w-2xl">
                {t("hero_description") ||
                  "ابدأ رحلة البحث عن شريك الحياة وفقاً للقيم الإسلامية الأصيلة. منصة آمنة ومحترمة للتعارف الجاد"}
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <button className="group px-8 py-4 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl">
                  <span>{t("start_now") || "ابدأ الآن"}</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>

                <button className="group px-8 py-4 border-2 border-emerald-600 text-emerald-600 rounded-xl hover:bg-emerald-50 transition-all duration-300 flex items-center justify-center space-x-2">
                  <Play className="w-5 h-5" />
                  <span>{t("watch_video") || "شاهد الفيديو"}</span>
                </button>
              </div>

              <div className="flex items-center justify-center lg:justify-start space-x-8 mt-8 text-sm text-gray-500">
                <div className="flex items-center space-x-1">
                  <CheckCircle className="w-4 h-4 text-emerald-500" />
                  <span>{t("verified_profiles") || "ملفات موثقة"}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Shield className="w-4 h-4 text-emerald-500" />
                  <span>{t("safe_secure") || "آمن ومحمي"}</span>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="relative z-10 bg-white rounded-2xl shadow-2xl p-8 max-w-md mx-auto">
                <div className="text-center mb-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-emerald-600 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Heart className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">لتسكنوا</h3>
                  <p className="text-gray-600 mt-2">
                    {t("app_tagline") || "التطبيق الإسلامي للزواج"}
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center space-x-3 p-3 bg-emerald-50 rounded-lg">
                    <Users className="w-5 h-5 text-emerald-600" />
                    <span className="text-gray-700">
                      {t("active_users") || "+10,000 عضو نشط"}
                    </span>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-emerald-50 rounded-lg">
                    <Star className="w-5 h-5 text-emerald-600" />
                    <span className="text-gray-700">
                      {t("success_rate") || "معدل نجاح 85%"}
                    </span>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-emerald-50 rounded-lg">
                    <Shield className="w-5 h-5 text-emerald-600" />
                    <span className="text-gray-700">
                      {t("privacy_first") || "الخصوصية أولاً"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Background decoration */}
              <div className="absolute -top-4 -right-4 w-72 h-72 bg-emerald-100 rounded-full opacity-20 animate-pulse"></div>
              <div className="absolute -bottom-8 -left-8 w-96 h-96 bg-teal-100 rounded-full opacity-20 animate-pulse delay-1000"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              {t("features_title") || "لماذا تختار لتسكنوا؟"}
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {t("features_description") ||
                "نوفر لك منصة آمنة ومحترمة للبحث عن شريك الحياة وفقاً للقيم الإسلامية"}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="group p-8 bg-gradient-to-br from-emerald-50 to-white rounded-2xl hover:shadow-xl transition-all duration-300 border border-emerald-100">
              <div className="w-12 h-12 bg-emerald-600 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                {t("privacy_security") || "الخصوصية والأمان"}
              </h3>
              <p className="text-gray-600">
                {t("privacy_desc") ||
                  "حماية كاملة لبياناتك الشخصية مع التحقق من الهوية"}
              </p>
            </div>

            <div className="group p-8 bg-gradient-to-br from-teal-50 to-white rounded-2xl hover:shadow-xl transition-all duration-300 border border-teal-100">
              <div className="w-12 h-12 bg-teal-600 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                {t("islamic_values") || "القيم الإسلامية"}
              </h3>
              <p className="text-gray-600">
                {t("islamic_desc") ||
                  "التزام كامل بالآداب الإسلامية في التعارف والزواج"}
              </p>
            </div>

            <div className="group p-8 bg-gradient-to-br from-blue-50 to-white rounded-2xl hover:shadow-xl transition-all duration-300 border border-blue-100">
              <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Users className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                {t("verified_profiles") || "ملفات شخصية موثقة"}
              </h3>
              <p className="text-gray-600">
                {t("verified_desc") || "جميع الأعضاء يخضعون لعملية تحقق دقيقة"}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Islamic Quote Section */}
      <section className="py-20 bg-gradient-to-r from-emerald-600 to-teal-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <p className="text-2xl lg:text-3xl font-bold mb-6 leading-relaxed">
              "ومن آياته أن خلق لكم من أنفسكم أزواجاً لتسكنوا إليها وجعل بينكم
              مودة ورحمة"
            </p>
            <p className="text-lg opacity-90">سورة الروم - آية 21</p>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              {t("how_it_works") || "كيف يعمل التطبيق؟"}
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map((step, index) => (
              <div key={step} className="text-center">
                <div className="w-16 h-16 bg-emerald-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                  {step}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  {t(`step_${step}_title`) || `الخطوة ${step}`}
                </h3>
                <p className="text-gray-600">
                  {t(`step_${step}_desc`) || "وصف الخطوة"}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Download Section */}
      <section id="download" className="py-20 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-8">
            {t("download_title") || "حمل التطبيق الآن"}
          </h2>
          <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
            {t("download_desc") || "ابدأ رحلتك للعثور على شريك الحياة المناسب"}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="flex items-center justify-center space-x-3 px-8 py-4 bg-black text-white rounded-xl hover:bg-gray-800 transition-colors">
              <Download className="w-6 h-6" />
              <div className="text-right">
                <div className="text-xs">Download on the</div>
                <div className="font-semibold">App Store</div>
              </div>
            </button>

            <button className="flex items-center justify-center space-x-3 px-8 py-4 bg-black text-white rounded-xl hover:bg-gray-800 transition-colors">
              <Download className="w-6 h-6" />
              <div className="text-right">
                <div className="text-xs">Get it on</div>
                <div className="font-semibold">Google Play</div>
              </div>
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-gray-900 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-600 to-teal-600 rounded-lg flex items-center justify-center">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold">لتسكنوا</h3>
            </div>

            <p className="text-gray-400 mb-6">
              {t("footer_desc") ||
                "التطبيق الإسلامي الأول للزواج في العالم العربي"}
            </p>

            <div className="flex justify-center space-x-6 text-sm text-gray-400">
              <a href="#" className="hover:text-white transition-colors">
                {t("privacy_policy") || "سياسة الخصوصية"}
              </a>
              <a href="#" className="hover:text-white transition-colors">
                {t("terms") || "شروط الاستخدام"}
              </a>
              <a href="#" className="hover:text-white transition-colors">
                {t("contact") || "تواصل معنا"}
              </a>
            </div>

            <div className="mt-6 pt-6 border-t border-gray-800 text-sm text-gray-400">
              © 2024 لتسكنوا. {t("rights_reserved") || "جميع الحقوق محفوظة"}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
