import Image from "next/image";
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
import Link from "next/link";
import { getTranslations } from "next-intl/server";

export default async function Footer() {
  const t = await getTranslations("footer");

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
                  <h3 className="text-2xl font-bold">{t('brand.title')}</h3>
                  <p className="text-white/70 text-sm">{t('brand.subtitle')}</p>
                </div>
              </div>

              <p className="text-white/90 leading-relaxed mb-6 text-lg text-center lg:text-left">
                {t('brand.description')}
              </p>

              {/* Social Media */}
              <div className="flex gap-4 w-fit mx-auto md:w-full">
                {[
                  {
                    icon: FaInstagram,
                    href: "#",
                    color: "hover:text-pink-400",
                  },
                  { icon: FaTwitter, href: "#", color: "hover:text-blue-400" },
                  {
                    icon: FaFacebookF,
                    href: "#",
                    color: "hover:text-blue-600",
                  },
                ].map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-white/70 hover:bg-white/20 transition-all duration-300"
                  >
                    <social.icon className={`text-sm ${social.color}`} />
                  </a>
                ))}
              </div>
            </div>

            {/* Contact Section */}
            <div>
              <h4 className="text-xl font-semibold mb-6 flex items-center gap-2">
                <FaEnvelope className="text-white" />
                {t('contact.title')}
              </h4>
              <div className="space-y-4">
                {[
                  {
                    icon: FaEnvelope,
                    title: t('contact.email'),
                    text: "om.alrbedan100@gmail.com",
                  },
                  {
                    icon: FaPhone,
                    title: t('contact.phone'),
                    text: "009929929992",
                  },
                  {
                    icon: FaGlobe,
                    title: t('contact.global'),
                    text: t('contact.global_desc'),
                  },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 group"
                  >
                    <div className="w-10 h-10 bg-[#A1AA8A] rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <item.icon className="text-white text-sm" />
                    </div>
                    <div>
                      <p className="text-white/90 font-medium">{item.title}</p>
                      <p className="text-white/70 text-sm">{item.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Legal Section */}
            <div>
              <h4 className="text-xl font-semibold mb-6 flex items-center gap-2">
                <FaShieldAlt className="text-white" />
                {t('legal.title')}
              </h4>
              <div className="space-y-4">
                {[
                  {
                    icon: FaFileContract,
                    title: t('legal.terms'),
                    link: "#",
                  },
                  {
                    icon: FaShieldAlt,
                    title: t('legal.privacy'),
                    link: "./privacy-policy",
                  },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 group"
                  >
                    <div className="w-10 h-10 bg-[#A1AA8A] rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <item.icon className="text-white text-sm" />
                    </div>
                    <Link
                      href={item.link}
                      className="hover:cursor-pointer"
                    >
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
                  {t('mission.statement')}
                </p>
                <div className="flex items-center gap-2 text-white/60 text-sm">
                  <TiHeartFullOutline className="text-red-500" />
                  <span>{t('mission.established')}</span>
                </div>
              </div>

              <div className="text-center lg:text-right">
                <p className="text-white/70 text-md">
                  © {new Date().getFullYear()} {t('brand.title')}. {t('copyright.rights')}
                </p>
                <p className="text-white/50 text-sm mt-1 flex items-center justify-center lg:justify-end gap-2">
                  {t('copyright.made_with')}
                  <TiHeartFullOutline className="text-red-600" />
                  {t('copyright.made_for')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}