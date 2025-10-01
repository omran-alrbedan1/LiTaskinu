import { images } from "./images";

export const userData = {
  name: "Lora Ahmad",
  email: "wedadjoulaq@gmail.com",
  phone: "(+963) 987356113",
  photo: images.avatar,
  introduction:
    "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloremque nostrum earum libero accusamus, cum quaerat possimus fugit quia error. Ipsa vel quam enim iusto pariatur perferendis maxime laborum, ex libero.",
  details: {
    weight: "35 kg",
    place: "Jordan",
    religion: "muslim",
    education: "it engineering",
    maritalStatus: "single",
    height: "170 cm",
    occupation: "designer",
    age: "24",
    jobTitle: "UI - UX designer",
  },
};

export const mockPhotos: Photo[] = [
  {
    id: "1",
    url: "/images/userTest.jpg",
  },
  {
    id: "2",
    url: "/images/userTest.jpg",
  },
  {
    id: "3",
    url: "/images/userTest.jpg",
  },
  {
    id: "4",
    url: "/images/userTest.jpg",
  },
  {
    id: "5",
    url: "/images/userTest.jpg",
  },
  {
    id: "6",
    url: "/images/userTest.jpg",
  },
  {
    id: "7",
    url: "/images/userTest.jpg",
  },
  {
    id: "8",
    url: "/images/userTest.jpg",
  },
];

export const mockNotifications = [
  {
    id: "1",
    type: "success",
    title: "Payment Received",
    message: "Your payment of $250 has been successfully processed.",
    timestamp: new Date("2024-01-15T10:30:00"),
    read: false,
  },
  {
    id: "2",
    type: "warning",
    title: "Subscription Expiring",
    message: "Your premium subscription expires in 3 days.",
    timestamp: new Date("2024-01-15T09:15:00"),
    read: false,
  },
  {
    id: "3",
    type: "info",
    title: "New Feature Available",
    message: "Check out the new dashboard analytics feature.",
    timestamp: new Date("2024-01-14T16:45:00"),
    read: true,
  },
  {
    id: "4",
    type: "error",
    title: "Login Attempt Failed",
    message: "There was an unsuccessful login attempt from a new device.",
    timestamp: new Date("2024-01-14T14:20:00"),
    read: true,
  },
  {
    id: "5",
    type: "system",
    title: "System Maintenance",
    message: "Scheduled maintenance this Sunday from 2-4 AM.",
    timestamp: new Date("2024-01-13T11:00:00"),
    read: true,
  },
  {
    id: "6",
    type: "success",
    title: "Profile Updated",
    message: "Your profile information has been successfully updated.",
    timestamp: new Date("2024-01-13T10:30:00"),
    read: true,
  },
];

export const people: Person[] = [
  {
    id: 1,
    name: "John Doe",
    age: 28,
    city: "New York",
    status: "Single",
    occupation: "Software Engineer",
    education: "Bachelor's",
    image: "/images/userTest.jpg",
  },
  {
    id: 2,
    name: "Jane Smith",
    age: 32,
    city: "Los Angeles",
    status: "Married",
    occupation: "Product Manager",
    education: "Master's",
    image: "/images/userTest.jpg",
  },
  {
    id: 3,
    name: "Mike Johnson",
    age: 25,
    city: "Chicago",
    status: "Single",
    occupation: "Data Scientist",
    education: "PhD",
    image: "/images/userTest.jpg",
  },
];

