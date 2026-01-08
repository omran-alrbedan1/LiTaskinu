
import {
    Lock, Scale, GraduationCap,
    Brain, Video, Clock, Shield, Heart
} from 'lucide-react';
import { useTranslations } from 'next-intl';

export const useNavLinks = () => {
  const t = useTranslations("header");
  return [
    { title: t("home"), path: "home" },
    { title: t("chats"), path: "chats" },
    { title: t("about"), path: "about-us" },
    { title: t("contact"), path: "contact-us" },
    { title: t("sheikhs"), path: "sheikhs" },  
    { title: t("mental_health"), path: "mental-health" }
  ];
}

export const FEATURES = [
  {
    icon: Scale,
    title: "Authentic Sharia Rulings",
    description: "Guidance based on Quran, Sunnah, and scholarly consensus with proper understanding of contemporary issues.",
  
  },
  {
    icon: Lock,
    title: "Complete Confidentiality",
    description: "Your privacy is sacred. All consultations are encrypted and handled with the utmost discretion.",
  },
  {
    icon: GraduationCap,
    title: "Renowned Scholarship",
    description: "Access to esteemed scholars with decades of experience in Islamic jurisprudence and counseling.",

  }
];


export const MENTAL_HEALTH_FEATURES = [
  {
    icon: Lock,
    title: "100% Confidential",
    description: "All sessions are completely private and confidential. Your information is protected with the highest security standards."
  },
  {
    icon: Brain,
    title: "Evidence-Based Therapy",
    description: "Our therapists use scientifically proven methods including CBT, DBT, and other effective therapeutic approaches."
  },
  {
    icon: Video,
    title: "Online & In-Person",
    description: "Choose between secure video sessions or in-person appointments, whichever makes you most comfortable."
  },
  {
    icon: Clock,
    title: "Flexible Scheduling",
    description: "Book sessions at your convenience with therapists available during evenings and weekends."
  },
  {
    icon: Shield,
    title: "Licensed Professionals",
    description: "All our therapists are fully licensed, certified, and regularly supervised to ensure quality care."
  },
  {
    icon: Heart,
    title: "Holistic Approach",
    description: "We address mental health from multiple angles including emotional, psychological, and lifestyle factors."
  }
];