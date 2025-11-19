import {
  FaShieldAlt,
  FaUserShield,
  FaComments,
  FaSearch,
  FaHeart,
  FaQuran,
  FaGlobe,
  FaCrown,
} from "react-icons/fa";

export const aboutFeatures = [
  {
    icon: <FaShieldAlt className="w-6 h-6" />,
    title: "Verification",
    description: "Full identity verification before interaction.",
  },
  {
    icon: <FaUserShield className="w-6 h-6" />,
    title: "Guardian system",
    description: "Guardian system to monitor and approve communication.",
  },
  {
    icon: <FaComments className="w-6 h-6" />,
    title: "Chatting",
    description: "Safe and monitored chat with smart notifications.",
  },
  {
    icon: <FaSearch className="w-6 h-6" />,
    title: "Advanced search",
    description:
      "Advanced search and filtering by age, city, religious commitment, education, and more.",
  },
  {
    icon: <FaHeart className="w-6 h-6" />,
    title: "Smart compatibility",
    description:
      "Smart compatibility system that suggests the most suitable partner based on your traits.",
  },
  {
    icon: <FaQuran className="w-6 h-6" />,
    title: "Islamic guidelines",
    description: "Privacy and Islamic guidelines respected at every step.",
  },
  {
    icon: <FaGlobe className="w-6 h-6" />,
    title: "Languages",
    description: "Multilingual support (Arabic – English).",
  },
  {
    icon: <FaCrown className="w-6 h-6" />,
    title: "Subscription",
    description:
      "Various subscription plans for everyone (Free, Gold, Premium).",
  },
];

export const steps = [
  {
    number: "01",
    title: "Create Account",
    description: "Create your account and add your basic information.",
  },
  {
    number: "02",
    title: "Identity Verification",
    description: "Activate your profile through identity verification.",
  },
  {
    number: "03",
    title: "Monitor Requests",
    description:
      "A guardian account is created to monitor requests and approvals.",
  },
  {
    number: "04",
    title: "Search",
    description: "Search and explore compatible profiles.",
  },
  {
    number: "05",
    title: "Send Request",
    description:
      "Send a communication request — reviewed by the guardians of both parties.",
  },
  {
    number: "06",
    title: "Get Married",
    description: "Start a safe, Sharia-compliant chat after mutual approval.",
  },
];

export const faqItems = [
  {
    question: "How is identity verified?",
    answer:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    question: "Are conversations monitored?",
    answer:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    question: "Can I register without a parent or guardian?",
    answer:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    question: "Is the platform completely free?",
    answer:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
];

export const animationVariants = {
  container: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  },
  item: {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  },
  staggerStep: {
    hidden: { opacity: 0, x: -20 },
    visible: (custom: number) => ({
      opacity: 1,
      x: 0,
      transition: { delay: custom * 0.2, duration: 0.6, ease: "easeOut" },
    }),
  },
  image: {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { delay: 0.3, duration: 0.8, ease: "easeOut" },
    },
  },
};
