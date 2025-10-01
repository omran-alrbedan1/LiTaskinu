interface UserProfile {
  firstName: string;
  lastName: string;
  username: string;
  gender: string;
  dateOfBirth: string;
  country: string;
  email: string;
  phone: string;
  religion: string;
  jobTitle: string;
  occupation: string;
  place: string;
  weight: string;
  height: string;
  introduction: string;
}

interface Notification {
  id: string;
  type: "success" | "warning" | "info" | "error" | "system";
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  actionUrl?: string;
}
interface Person {
  id: number;
  age:number; 
  name: string;
  age: string;
  city: string;
  occupation:string;
  image: string;
  status: string;
  education:string; 
}
