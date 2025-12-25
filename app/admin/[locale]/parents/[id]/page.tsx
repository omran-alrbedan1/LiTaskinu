// app/admin/parents/[id]/page.tsx
"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button, Tag, Divider, message, Tabs, Badge } from "antd";
import {
    ArrowLeftOutlined, MessageOutlined,
    PhoneOutlined,
    MailOutlined,
    HomeOutlined,
    CalendarOutlined,
    TeamOutlined,
    UserOutlined,
    IdcardOutlined,
    EnvironmentOutlined
} from "@ant-design/icons";
import { MOCK_PARENTS } from "@/constants/temporary";
import { images } from "@/constants/images";
import Image from "next/image";
import { format } from "date-fns";
import Loader from "@/components/shared/Loader";
import { Header } from "@/components/admin/shared";
import CustomHeader from "@/components/shared/CustomHeader";

    interface ParentType {
  key: string;
  parent: {
    name: string;
    email: string;
    phone: string;
    relationship: string;
    avatar?: string;
    city?: string;
    occupation?: string;
    education?: string;
    maritalStatus?: string;
    registrationDate?: string;
  };
  member: {
    name: string;
    age: number;
    maritalStatus: string;
    education: string;
    avatar?: string;
  };
  contact?: {
    city: string;
    address?: string;
    country?: string;
  };
  registrationDate?: string;
  status?: "active" | "inactive" | "pending";
}

export default function ParentProfilePage() {
  const params = useParams();
  const router = useRouter();
  const [parent, setParent] = useState<ParentType | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("info");

  useEffect(() => {
    // Simulate API call to fetch parent data
    const fetchParent = async () => {
      try {
        setLoading(true);
        await new Promise(resolve => setTimeout(resolve, 500));
        
        const foundParent = MOCK_PARENTS.find(p => p.key === params.id);
        
        if (foundParent) {
          // Enhance with additional mock data
          const enhancedParent: ParentType = {
            ...foundParent,
            parent: {
              ...foundParent.parent,
              occupation: "Business Owner",
              education: "Bachelor's Degree",
              maritalStatus: "Married",
              registrationDate: "2023-10-15",
              city: foundParent.contact?.city || "Unknown City"
            },
            contact: {
              city: foundParent.contact?.city || "Unknown City",
              address: "123 Main Street, Downtown",
              country: "USA"
            },
            status: "active"
          };
          setParent(enhancedParent);
        } else {
          message.error("Parent not found");
          router.push("/admin/parents");
        }
      } catch (error) {
        message.error("Error fetching parent details");
      } finally {
        setLoading(false);
      }
    };

    fetchParent();
  }, [params.id, router]);

  const children = [
    {
      id: 1,
      name: "Ahmad Al-Masri",
      age: 25,
      gender: "Male",
      maritalStatus: "Single",
      education: "Master's in Computer Science",
      occupation: "Software Engineer",
      status: "active",
      avatar: images.Unknown,
      registrationDate: "2023-11-20"
    },
    {
      id: 2,
      name: "Fatima Al-Masri",
      age: 22,
      gender: "Female",
      maritalStatus: "Engaged",
      education: "Medical Student",
      occupation: "Student",
      status: "active",
      avatar: images.Unknown,
      registrationDate: "2023-12-05"
    },
    {
      id: 3,
      name: "Yusuf Al-Masri",
      age: 18,
      gender: "Male",
      maritalStatus: "Single",
      education: "High School",
      occupation: "Student",
      status: "inactive",
      avatar: images.Unknown,
      registrationDate: "2024-01-10"
    }
  ];

  if (loading) {return <Loader/>}

  if (!parent) {
    return (
      <div className="p-6">
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold text-gray-600">Parent not found</h2>
          <p className="text-gray-500 mt-2">The parent you're looking for doesn't exist.</p>
          <Button 
            type="primary" 
            className="mt-4"
            onClick={() => router.push("/admin/parents")}
            icon={<ArrowLeftOutlined />}
          >
            Back to Parents List
          </Button>
        </div>
      </div>
    );
  }

  const tabItems = [
    {
      key: "info",
      label: (
        <span className="flex items-center gap-2">
          <UserOutlined />
          Personal Information
        </span>
      ),
      children: (
        <div className="space-y-6">
          {/* Personal Details Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <IdcardOutlined />
                Personal Details
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <DetailItem 
                    label="Full Name" 
                    value={parent.parent.name}
                    icon={<UserOutlined />}
                  />
                  <DetailItem 
                    label="Relationship" 
                    value={parent.parent.relationship}
                    icon={<TeamOutlined />}
                  />
             
                </div>
                <div className="space-y-4">
            
                  
             
                       <DetailItem 
                    label="Email" 
                    value={parent.parent.email}
                    icon={<MailOutlined />}
                    isEmail
                  />
             
                   <DetailItem 
                    label="Phone" 
                    value={parent.parent.phone}
                    icon={<PhoneOutlined />}
                    isPhone
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contact Information Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <EnvironmentOutlined />
                Contact Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <DetailItem 
                    label="City" 
                    value={parent.contact?.city || "Not specified"}
                    icon={<EnvironmentOutlined />}
                  />
                  <DetailItem 
                    label="Address" 
                    value={parent.contact?.address || "Not specified"}
                    icon={<HomeOutlined />}
                  />
                </div>
                <div className="space-y-4">
                  <DetailItem 
                    label="Country" 
                    value={parent.contact?.country || "Not specified"}
                    icon={<EnvironmentOutlined />}
                  />
                  <div className="mt-4">
                    <Tag color={parent.status === "active" ? "green" : "red"}>
                      {parent.status?.toUpperCase()}
                    </Tag>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      ),
    },
    {
      key: "children",
      label: (
        <span className="flex items-center gap-2">
          <TeamOutlined />
          Children ({children.length})
        </span>
      ),
      children: (
        <Card>
          <CardHeader>
            <CardTitle>Children Information</CardTitle>
            <CardDescription>
              List of children registered under {parent.parent.name}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {children.map((child) => (
                <ChildCard key={child.id} child={child} />
              ))}
            </div>
          </CardContent>
        </Card>
      ),
    },
   
  ];

  return (
    <div className="p-6 space-y-6 max-h-screen overflow-auto sidebar-scrollbar pb-32">
    
          <CustomHeader
            title={`Parent Profile: ${parent.parent.name}`}
            description={`View and manage ${parent.parent.name}'s information and children`}
            backLink="/admin/parents"
          />
        

      {/* Parent Profile Summary Card */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            <div className="relative">
              <Image
                src={parent.parent.avatar || images.Unknown}
                height={120}
                width={120}
                className="rounded-full border-4 border-white shadow-lg"
                alt={parent.parent.name}
              />
              <Badge 
                status={parent.status === "active" ? "success" : "error"}
                className="absolute bottom-2 right-2"
              />
            </div>
            <div className="flex-1">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h1 className="text-3xl font-bold">{parent.parent.name}</h1>
                  <div className="flex items-center gap-3 mt-2">
                    <Tag color="blue" className="text-sm">
                      {parent.parent.relationship}
                    </Tag>
                    <span className="text-gray-500">
                      <MailOutlined className="mr-1" />
                      {parent.parent.email}
                    </span>
                    <span className="text-gray-500">
                      <PhoneOutlined className="mr-1" />
                      {parent.parent.phone}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-gray-500">Registration Date</p>
                  <p className="font-semibold">
                    {parent.registrationDate 
                      ? format(new Date(parent.registrationDate), "PPP")
                      : "Unknown"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabs for Detailed Information */}
      <Tabs
        activeKey={activeTab}
        onChange={setActiveTab}
        items={tabItems}
        className="parent-profile-tabs"
      />
    </div>
  );
}

// Helper Components
const DetailItem = ({ 
  label, 
  value, 
  icon, 
  isEmail = false, 
  isPhone = false,
  compact = false 
}: { 
  label: string; 
  value: string; 
  icon?: React.ReactNode;
  isEmail?: boolean;
  isPhone?: boolean;
  compact?: boolean;
}) => (
  <div className={compact ? "flex items-center gap-2" : ""}>
    {icon && <span className="text-gray-400 mr-2">{icon}</span>}
    <span className={compact ? "text-gray-600" : "font-medium text-gray-700"}>
      {label}:
    </span>
    {isEmail ? (
      <a href={`mailto:${value}`} className="text-blue-500 hover:underline ml-2">
        {value}
      </a>
    ) : isPhone ? (
      <a href={`tel:${value}`} className="text-blue-500 hover:underline ml-2">
        {value}
      </a>
    ) : (
      <span className={compact ? "text-gray-800 ml-2" : "text-gray-600 ml-2"}>
        {value}
      </span>
    )}
  </div>
);

const ChildCard = ({ child }: { child: any }) => (
  <Card className="hover:shadow-md transition-shadow duration-300">
    <CardContent className="p-4">
      <div className="flex items-center gap-4">
        <Image
          src={child.avatar}
          height={60}
          width={60}
          className="rounded-full"
          alt={child.name}
        />
        <div className="flex-1">
          <div className="flex justify-between items-start">
            <div>
              <h4 className="font-bold text-lg">{child.name}</h4>
              <div className="flex flex-wrap gap-3 mt-2">
                <Tag color="blue">{child.gender}</Tag>
                <Tag color={child.maritalStatus === "Single" ? "green" : "orange"}>
                  {child.maritalStatus}
                </Tag>
                <span className="text-gray-500">{child.age} years</span>
                <span className="text-gray-500">{child.occupation}</span>
              </div>
            </div>
            <div className="text-right">
              <Tag color={child.status === "active" ? "green" : "red"}>
                {child.status.toUpperCase()}
              </Tag>
              <p className="text-sm text-gray-500 mt-1">
                Registered: {format(new Date(child.registrationDate), "MMM d, yyyy")}
              </p>
            </div>
          </div>
          <Divider className="my-3" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <p className="text-sm text-gray-500">Education</p>
              <p className="font-medium">{child.education}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Age</p>
              <p className="font-medium">{child.age} years</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Status</p>
              <p className="font-medium">{child.maritalStatus}</p>
            </div>
            <div className="text-right md:text-left">
              <Button type="link" size="small">
                View Profile →
              </Button>
            </div>
          </div>
        </div>
      </div>
    </CardContent>
  </Card>
);