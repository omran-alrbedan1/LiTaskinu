import {
  User, Eye,
  Smile,
  Coffee,
  BookOpen,
  MapPin, Ruler,
  Scale,
  Users,
  GraduationCap,
  Languages,
  Star,
  Cigarette,
  Baby, Briefcase,
  Home
} from "lucide-react";
import { GiDiamondRing } from "react-icons/gi";

export const profileSectionsConfig:ProfileSectionConfig[] = [
  {
    title: "Basic Information",
    icon: <User className="w-5 h-5 text-primary-color1" />,
    fields: [
      {
        key: "religion",
        label: "Religion",
        icon: <BookOpen className="w-4 h-4" />,
      },
      {
        key: "marital_status",
        label: "Marital Status",
        icon: <GiDiamondRing className="w-4 h-4" />,
      },
      {
        key: "willing_to_relocate",
        label: "Willing to Relocate",
        icon: <MapPin className="w-4 h-4" />,
      },
      {
        key: "religion",
        label: "Preferred Religion",
        icon: <BookOpen className="w-4 h-4" />,
        section: "seeking",
      },
      {
        key: "marital_status",
        label: "Preferred Marital Status",
        icon: <GiDiamondRing className="w-4 h-4" />,
        section: "seeking",
      },
      {
        key: "willing_to_relocate",
        label: "Partner Should Relocate",
        icon: <MapPin className="w-4 h-4" />,
        section: "seeking",
      },
    ],
  },  
  {
    title: "Appearance",
    icon: <Eye className="w-5 h-5 text-primary-color1" />,
    fields: [
      {
        key: "hair_color",
        label: "Hair Color",
        icon: <Smile className="w-4 h-4" />,
      },
      {
        key: "eye_color",
        label: "Eye Color",
        icon: <Eye className="w-4 h-4" />,
      },
      {
        key: "height",
        label: "Height",
        icon: <Ruler className="w-4 h-4" />,
      },
      {
        key: "weight",
        label: "Weight",
        icon: <Scale className="w-4 h-4" />,
      },
      {
        key: "body_style",
        label: "Body Style",
        icon: <User className="w-4 h-4" />,
      },
      {
        key: "hair_color",
        label: "Preferred Hair Color",
        icon: <Smile className="w-4 h-4" />,
        section: "seeking",
      },
      {
        key: "eye_color",
        label: "Preferred Eye Color",
        icon: <Eye className="w-4 h-4" />,
        section: "seeking",
      },
      {
        key: "height",
        label: "Preferred Height",
        icon: <Ruler className="w-4 h-4" />,
        section: "seeking",
      },
      {
        key: "weight",
        label: "Preferred Weight",
        icon: <Scale className="w-4 h-4" />,
        section: "seeking",
      },
      {
        key: "body_style",
        label: "Preferred Body Style",
        icon: <User className="w-4 h-4" />,
        section: "seeking",
      },
    ],
  },
  {
    title: "Lifestyle",
    icon: <Coffee className="w-5 h-5 text-primary-color1" />,
    fields: [
      {
        key: "job",
        label: "Occupation",
        icon: <Briefcase className="w-4 h-4" />,
      },
      {
        key: "is_smoker",
        label: "Smoking",
        icon: <Cigarette className="w-4 h-4" />,
      },
      {
        key: "children_count",
        label: "Children Count",
        icon: <Baby className="w-4 h-4" />,
      },
      {
        key: "want_more_children",
        label: "Want More Children",
        icon: <Baby className="w-4 h-4" />,
      },
      {
        key: "employment_status",
        label: "Employment Status",
        icon: <Briefcase className="w-4 h-4" />,
      },
      {
        key: "living_situation",
        label: "Living Situation",
        icon: <Home className="w-4 h-4" />,
      },
      {
        key: "has_house",
        label: "Has House",
        icon: <Home className="w-4 h-4" />,
      },
      {
        key: "house_type",
        label: "House Type",
        icon: <Home className="w-4 h-4" />,
      },
      {
        key: "has_vehicle",
        label: "Has Vehicle",
        icon: <Star className="w-4 h-4" />,
      },
      {
        key: "is_sporty",
        label: "Sporty",
        icon: <User className="w-4 h-4" />,
      },
      {
        key: "job",
        label: "Preferred Occupation",
        icon: <Briefcase className="w-4 h-4" />,
        section: "seeking",
      },
      {
        key: "is_smoker",
        label: "Accept Smoker",
        icon: <Cigarette className="w-4 h-4" />,
        section: "seeking",
      },
      {
        key: "children_count",
        label: "Accept Children",
        icon: <Baby className="w-4 h-4" />,
        section: "seeking",
      },
      {
        key: "want_more_children",
        label: "Should Want More Children",
        icon: <Baby className="w-4 h-4" />,
        section: "seeking",
      },
      {
        key: "employment_status",
        label: "Preferred Employment Status",
        icon: <Briefcase className="w-4 h-4" />,
        section: "seeking",
      },
      {
        key: "living_situation",
        label: "Preferred Living Situation",
        icon: <Home className="w-4 h-4" />,
        section: "seeking",
      },
      {
        key: "has_house",
        label: "Should Have House",
        icon: <Home className="w-4 h-4" />,
        section: "seeking",
      },
      {
        key: "has_vehicle",
        label: "Should Have Vehicle",
        icon: <Star className="w-4 h-4" />,
        section: "seeking",
      },
      {
        key: "is_sporty",
        label: "Preferred Sporty",
        icon: <User className="w-4 h-4" />,
        section: "seeking",
      },
    ],
  },
  {
    title: "Education & Language",
    icon: <GraduationCap className="w-5 h-5 text-primary-color1" />,
    fields: [
      {
        key: "education",
        label: "Education Level",
        icon: <GraduationCap className="w-4 h-4" />,
      },
      {
        key: "language",
        label: "Language",
        icon: <Languages className="w-4 h-4" />,
      },
      {
        key: "languages_spoken",
        label: "Languages Spoken",
        icon: <Languages className="w-4 h-4" />,
      },
      {
        key: "education",
        label: "Preferred Education Level",
        icon: <GraduationCap className="w-4 h-4" />,
        section: "seeking",
      },
      {
        key: "language",
        label: "Preferred Language",
        icon: <Languages className="w-4 h-4" />,
        section: "seeking",
      },
    ],
  },
  {
    title: "Religious & Cultural Background",
    icon: <BookOpen className="w-5 h-5 text-primary-color1" />,
    fields: [
      {
        key: "religious_commitment",
        label: "Religious Commitment",
        icon: <BookOpen className="w-4 h-4" />,
      },
      {
        key: "born_reverted",
        label: "Born/Reverted",
        icon: <User className="w-4 h-4" />,
      },
      {
        key: "wear_hijab",
        label: "Wears Hijab",
        icon: <User className="w-4 h-4" />,
      },
      {
        key: "polygamy",
        label: "Polygamy",
        icon: <Users className="w-4 h-4" />,
      },
      {
        key: "profile_creator",
        label: "Profile Creator",
        icon: <User className="w-4 h-4" />,
      },
      {
        key: "bio",
        label: "Bio",
        icon: <User className="w-4 h-4" />,
      },
      {
        key: "religious_commitment",
        label: "Preferred Religious Commitment",
        icon: <BookOpen className="w-4 h-4" />,
        section: "seeking",
      },
      {
        key: "born_reverted",
        label: "Preferred Born/Reverted",
        icon: <User className="w-4 h-4" />,
        section: "seeking",
      },
      {
        key: "wear_hijab",
        label: "Should Wear Hijab",
        icon: <User className="w-4 h-4" />,
        section: "seeking",
      },
      {
        key: "polygamy",
        label: "Polygamy Preference",
        icon: <Users className="w-4 h-4" />,
        section: "seeking",
      },
      {
        key: "partner_description",
        label: "Partner Description",
        icon: <User className="w-4 h-4" />,
        section: "seeking",
      },
    ],
  },
];