import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
} from "react-icons/fa";

export const socialMediaLinks = [
  {
    name: "Facebook",
    icon: FaFacebookF,
    url: "https://facebook.com",
    color: "hover:bg-blue-600",
  },
  {
    name: "Twitter",
    icon: FaTwitter,
    url: "https://twitter.com",
    color: "hover:bg-blue-400",
  },
  {
    name: "Instagram",
    icon: FaInstagram,
    url: "https://instagram.com",
    color: "hover:bg-pink-600",
  },
  {
    name: "LinkedIn",
    icon: FaLinkedinIn,
    url: "https://linkedin.com",
    color: "hover:bg-blue-700",
  },
  {
    name: "YouTube",
    icon: FaYoutube,
    url: "https://youtube.com",
    color: "hover:bg-red-600",
  },
];
// Types
export interface Profile {
  id: number;
  name: string;
  gender: "male" | "female";
  age: number;
  location: string;
  seeking: string;
  time: string;
  occupation: string;
  interests: string[];
  image: string;
}

export interface FilterState {
  seeking: string;
  ageFrom: string;
  ageTo: string;
  country: string;
  city: string;
}

// Constants
export const FILTER_OPTIONS = {
  seeking: ["Male", "Female"],
  countries: ["Jordan", "USA", "UK", "Canada", "UAE"],
  cities: {
    Jordan: ["Amman", "Irbid", "Zarqa", "Aqaba", "Madaba"],
    USA: ["New York", "Los Angeles", "Chicago", "Miami", "Seattle"],
    UK: ["London", "Manchester", "Birmingham", "Edinburgh", "Liverpool"],
    Canada: ["Toronto", "Vancouver", "Montreal", "Calgary", "Ottawa"],
    UAE: ["Dubai", "Abu Dhabi", "Sharjah", "Ajman", "Ras Al Khaimah"],
  },
} as const;

export const AGE_RANGE = {
  min: 18,
  max: 80,
} as const;

// Realistic sample data with images included
export const SAMPLE_PROFILES: Profile[] = [
  // Male Profiles
  {
    id: 1,
    name: "Ahmed Hassan",
    gender: "Male",
    age: 28,
    location: "Amman, Jordan",
    seeking: "Female 24 - 32",
    time: "2 hours ago",
    occupation: "Software Engineer",
    interests: ["Hiking", "Photography", "Coffee", "Technology"],
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
  },
  {
    id: 2,
    name: "Omar Khalid",
    gender: "Male",
    age: 32,
    location: "Dubai, UAE",
    seeking: "Female 25 - 35",
    time: "Online now",
    occupation: "Business Consultant",
    interests: ["Travel", "Fine Dining", "Yachting", "Business"],
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop",
  },
  {
    id: 3,
    name: "Mark Johnson",
    gender: "Male",
    age: 26,
    location: "New York, USA",
    seeking: "Female 22 - 30",
    time: "1 day ago",
    occupation: "Graphic Designer",
    interests: ["Art", "Music", "Gaming", "Fitness"],
    image:
      "https://images.unsplash.com/photo-1513956589380-bad6acb9b9d4?w=400&h=400&fit=crop",
  },
  {
    id: 4,
    name: "David Smith",
    gender: "Male",
    age: 35,
    location: "London, UK",
    seeking: "Female 28 - 38",
    time: "3 hours ago",
    occupation: "Architect",
    interests: ["Architecture", "Museums", "Wine Tasting", "Cycling"],
    image:
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop",
  },
  {
    id: 5,
    name: "James Wilson",
    gender: "Male",
    age: 24,
    location: "Toronto, Canada",
    seeking: "Female 21 - 28",
    time: "Online now",
    occupation: "Medical Student",
    interests: ["Medicine", "Running", "Reading", "Volunteering"],
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
  },

  // Female Profiles
  {
    id: 6,
    name: "Sarah Johnson",
    gender: "Female",
    age: 25,
    location: "Amman, Jordan",
    seeking: "Male 26 - 34",
    time: "Online now",
    occupation: "Marketing Manager",
    interests: ["Yoga", "Reading", "Travel", "Foodie"],
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
  },
  {
    id: 7,
    name: "Layla Ahmed",
    gender: "Female",
    age: 29,
    location: "Dubai, UAE",
    seeking: "Male 30 - 40",
    time: "4 hours ago",
    occupation: "Fashion Designer",
    interests: ["Fashion", "Art", "Shopping", "Beach"],
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop",
  },
  {
    id: 8,
    name: "Emma Davis",
    gender: "Female",
    age: 27,
    location: "New York, USA",
    seeking: "Male 25 - 35",
    time: "Online now",
    occupation: "Journalist",
    interests: ["Writing", "Politics", "Running", "Theater"],
    image:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop",
  },
  {
    id: 9,
    name: "Sophie Brown",
    gender: "Female",
    age: 31,
    location: "London, UK",
    seeking: "Male 30 - 40",
    time: "2 days ago",
    occupation: "University Professor",
    interests: ["Literature", "Classical Music", "Museums", "Tea"],
    image:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop",
  },
  {
    id: 10,
    name: "Chloe Taylor",
    gender: "Female",
    age: 23,
    location: "Vancouver, Canada",
    seeking: "Male 24 - 30",
    time: "6 hours ago",
    occupation: "Environmental Scientist",
    interests: ["Nature", "Hiking", "Sustainability", "Photography"],
    image:
      "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&h=400&fit=crop",
  },
  {
    id: 11,
    name: "Nour Ali",
    gender: "Female",
    age: 26,
    location: "Amman, Jordan",
    seeking: "Male 26 - 32",
    time: "Online now",
    occupation: "Doctor",
    interests: ["Medicine", "Swimming", "Cooking", "Movies"],
    image:
      "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=400&h=400&fit=crop",
  },
  {
    id: 12,
    name: "Michael Chen",
    gender: "Male",
    age: 30,
    location: "Seattle, USA",
    seeking: "Female 25 - 35",
    time: "1 hour ago",
    occupation: "Data Scientist",
    interests: ["AI", "Basketball", "Cooking", "Travel"],
    image:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop",
  },
];
