import Image from "next/image";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { images } from "@/constants/images";
import {
  FaEnvelope,
  FaPhone,
  FaFileContract,
  FaShieldAlt,
  FaGlobe,
  FaInstagram,
  FaTwitter,
  FaFacebookF,
} from "react-icons/fa";
import { TiHeartFullOutline } from "react-icons/ti";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";

export default async function Footer() {
  const t = await getTranslations("footer");

  const socialLinks: { icon: IconType; href: string; label: string; hover: string }[] =
    [
      { icon: FaInstagram, href: "#", label: "Instagram", hover: "hover:text-pink-400" },
      { icon: FaTwitter, href: "#", label: "Twitter", hover: "hover:text-blue-400" },
      { icon: FaFacebookF, href: "#", label: "Facebook", hover: "hover:text-blue-600" },
    ];

  const contactItems: { icon: IconType; title: string; text: string }[] = [
    { icon: FaEnvelope, title: t("contact.email"), text: "om.alrbedan100@gmail.com" },
    { icon: FaPhone, title: t("contact.phone"), text: "009929929992" },
    { icon: FaGlobe, title: t("contact.global"), text: t("contact.global_desc") },
  ];

  const legalItems: { icon: IconType; title: string; href: string }[] = [
    { icon: FaFileContract, title: t("legal.terms"), href: "#" },
    { icon: FaShieldAlt, title: t("legal.privacy"), href: "/privacy-policy" },
  ];

  const pillIconWrap =
    "w-10 h-10 bg-[#A1AA8A] rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300";
  const sectionTitle = "text-xl font-semibold mb-6 flex items-center gap-2";

  return (
    <footer className="bg-gradient text-white p-4 pt-16 pb-24 md:pb-8 relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Main Footer Content */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-12">
            {/* Brand Section */}
            <div className="lg:col-span-2">
              <div className="flex items-center mb-6">
                <Image
                  src={images.logo2}
                  priority
                  alt="litaskunu logo light"
                  className="h-16 w-20 mr-4"
                />
                <div>
                  <h3 className="text-2xl font-bold">{t("brand.title")}</h3>
                  <p className="text-white/70 text-sm">{t("brand.subtitle")}</p>
                </div>
              </div>

              <p className="text-white/90 leading-relaxed mb-6 text-lg text-center lg:text-left">
                {t("brand.description")}
              </p>

              {/* Social Media */}
              <div className="flex gap-4 w-fit mx-auto md:w-full">
                {socialLinks.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    aria-label={s.label}
                    target={s.href.startsWith("http") ? "_blank" : undefined}
                    rel={s.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-white/70 hover:bg-white/20 sees transition-all duration-300"
                  >
                    <s.icon className={`text-sm ${s.hover}`} />
                  </a>
                ))}
              </div>
            </div>

            {/* Contact Section */}
            <div>
              <h4 className={sectionTitle}>
                <FaEnvelope className="text-white" />
                {t("contact.title")}
              </h4>

              <div className="space-y-4">
                {contactItems.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3 group">
                    <div className={pillIconWrap}>
                      <item.icon className="text-white text-sm" />
                    </div>
                    <div>
                      <p className="text-white/90 font-medium">{item.title}</p>
                      <p className="text-white/70 text-sm break-words">{item.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Legal Section */}
            <div>
              <h4 className={sectionTitle}>
                <FaShieldAlt className="text-white" />
                {t("legal.title")}
              </h4>

              <div className="space-y-4">
                {legalItems.map((item) => (
                  <div key={item.title} className="flex items-center gap-3 group">
                    <div className={pillIconWrap}>
                      <item.icon className="text-white text-sm" />
                    </div>
                    <Link href={item.href} className="hover:cursor-pointer" aria-label={item.title}>
                      <p className="text-white/90 font-medium">{item.title}</p>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Mission Statement & Copyright */}
          <div className="pt-8 border-t border-white/20">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <p className="text-white/80 text-sm leading-relaxed mb-4">
                  {t("mission.statement")}
                </p>
                <div className="flex items-center gap-2 text-white/60 text-sm">
                  <TiHeartFullOutline className="text-red-500" />
                  <span>{t("mission.established")}</span>
                </div>
              </div>

              <div className="text-center lg:text-right">
                <p className="text-white/70 text-md">
                  © {new Date().getFullYear()} {t("brand.title")}. {t("copyright.rights")}
                </p>
                <p className="text-white/50 text-sm mt-1 flex items-center justify-center lg:justify-end gap-2">
                  {t("copyright.made_with")}
                  <TiHeartFullOutline className="text-red-600" />
                  {t("copyright.made_for")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
