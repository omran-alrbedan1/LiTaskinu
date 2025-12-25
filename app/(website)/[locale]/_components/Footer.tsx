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

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-[#8B9475] to-[#6B7355] text-white p-4 pt-16 pb-24 md:pb-8 relative overflow-hidden">
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
                  <h3 className="text-2xl font-bold">Litaskunu</h3>
                  <p className="text-white/70 text-sm">
                    Islamic Marriage Platform
                  </p>
                </div>
              </div>

              <p className="text-white/90 leading-relaxed mb-6 text-lg text-center lg:text-left">
                Making halal marriages accessible worldwide through modern
                technology while honoring Islamic traditions.
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
                Contact Us
              </h4>
              <div className="space-y-4">
                {[
                  {
                    icon: FaEnvelope,
                    title: "Email",
                    text: "om.alrbedan100@gmail.com",
                  },
                  {
                    icon: FaPhone,
                    title: "Phone",
                    text: "009929929992",
                  },
                  {
                    icon: FaGlobe,
                    title: "Global",
                    text: "Available Worldwide",
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
                Legal
              </h4>
              <div className="space-y-4">
                {[
                  {
                    icon: FaFileContract,
                    title: "Terms & Conditions",
                  },
                  {
                    icon: FaShieldAlt,
                    title: "Privacy Policy",
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
                    </div>
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
                  It is also an incredibly affordable platform for those seeking
                  meaningful relationships through traditional values, respect,
                  and honesty. With cultural authenticity at its core, Litaskunu
                  connects millions of users worldwide who are ready for serious
                  commitments.
                </p>
                <div className="flex items-center gap-2 text-white/60 text-sm">
                  <TiHeartFullOutline className="text-red-500" />
                  <span>
                    Building meaningful Islamic relationships since 2025
                  </span>
                </div>
              </div>

              <div className="text-center lg:text-right">
                <p className="text-white/70 text-md">
                  © {new Date().getFullYear()} Litaskunu. All rights reserved.
                </p>
                <p className="text-white/50 text-sm mt-1 flex items-center justify-center lg:justify-end gap-2">
                  Made with
                  <TiHeartFullOutline className="text-red-600" />
                  for the Muslim Ummah
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

    </footer>
  );
}