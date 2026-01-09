
import {
    Lock, Scale, GraduationCap,
    Brain, Video, Clock, Shield, Heart
} from 'lucide-react';

export const NAV_LINKS = [
  { title: "Home", path: "home" },
  { title: "Chats", path: "chats" },
  { title: "About Us", path: "about-us" },
  { title: "Contact Us", path: "contact-us" },
  { title: "Our Sheikhs", path: "sheikhs" },  
  { title: "Mental Health", path: "mental-health" }
] ;

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