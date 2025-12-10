interface HeroButton {
  id: string;
  text: string;
  link: string;
  variant: "default" | "secondary" | "outline" | "ghost" | "link";
  order?: number;
}

interface HeroContent {
  id?: string;
  title: string;
  subtitle: string;
  backgroundImage: string;
  overlayOpacity: number;
  textColor: string;
  buttons: HeroButton[];
}

interface Step {
  id: string;
  title: string;
  description: string;
  order: number;
}
