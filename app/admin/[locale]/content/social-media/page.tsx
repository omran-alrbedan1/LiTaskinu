"use client";
import React, { useState, useEffect } from "react";
import { Card, Input, Button, Space, Typography, message, Spin } from "antd";
import {
  EditOutlined,
  SaveOutlined,
  CloseOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import { Header } from "@/components/admin/shared";
import { ICONS } from "@/constants/icons";
import Image from "next/image";

const { Text } = Typography;

// Types
interface SocialLinks {
  facebook: string;
  twitter: string;
  linkedin: string;
  youtube: string;
  instagram: string;
}

interface SocialMediaPlatform {
  id: keyof SocialLinks;
  name: string;
  icon: string;
  placeholder: string;
  color?: string;
}

// API Service Function
const socialMediaApi = {
  async getSocialLinks(): Promise<SocialLinks> {
    const response = await fetch("/api/admin/social-media");
    if (!response.ok) {
      throw new Error("Failed to fetch social links");
    }
    return response.json();
  },

  async updateSocialLinks(links: SocialLinks): Promise<SocialLinks> {
    const response = await fetch("/api/admin/social-media", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(links),
    });

    if (!response.ok) {
      throw new Error("Failed to update social links");
    }
    return response.json();
  },
};

const SocialMediaPage: React.FC = () => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [socialLinks, setSocialLinks] = useState<SocialLinks>({
    facebook: "",
    twitter: "",
    linkedin: "",
    youtube: "",
    instagram: "",
  });
  const [tempLinks, setTempLinks] = useState<SocialLinks>({ ...socialLinks });

  // Fetch social links on component mount
  useEffect(() => {
    fetchSocialLinks();
  }, []);

  const fetchSocialLinks = async (): Promise<void> => {
    try {
      setIsLoading(true);
      const links = await socialMediaApi.getSocialLinks();
      setSocialLinks(links);
      setTempLinks(links);
    } catch (error) {
      console.error("Error fetching social links:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (): void => {
    setTempLinks({ ...socialLinks });
    setIsEditing(true);
  };

  const handleSave = async (): Promise<void> => {
    try {
      setIsSaving(true);

      // Basic URL validation
      const invalidLinks = Object.entries(tempLinks).filter(([_, url]) => {
        return url && !isValidUrl(url);
      });

      if (invalidLinks.length > 0) {
        message.error("Please enter valid URLs for all social media platforms");
        return;
      }

      const updatedLinks = await socialMediaApi.updateSocialLinks(tempLinks);
      setSocialLinks(updatedLinks);
      setIsEditing(false);
      message.success("Social media links updated successfully!");
    } catch (error) {
      console.error("Error updating social links:", error);
      message.error("Failed to update social media links");
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = (): void => {
    setTempLinks({ ...socialLinks });
    setIsEditing(false);
  };

  const handleInputChange = (
    platform: keyof SocialLinks,
    value: string
  ): void => {
    setTempLinks((prev) => ({
      ...prev,
      [platform]: value,
    }));
  };

  const isValidUrl = (url: string): boolean => {
    if (!url) return true; // Empty URLs are valid (optional fields)
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const socialMediaData: SocialMediaPlatform[] = [
    {
      id: "facebook",
      name: "Facebook",
      icon: ICONS.facebook,
      placeholder: "https://facebook.com/yourpage",
    },
    {
      id: "twitter",
      name: "X (Twitter)",
      icon: ICONS.twitter,
      placeholder: "https://twitter.com/yourprofile",
    },
    {
      id: "linkedin",
      name: "LinkedIn",
      icon: ICONS.linkedin,
      placeholder: "https://linkedin.com/in/yourprofile",
    },
    {
      id: "youtube",
      name: "YouTube",
      icon: ICONS.youtube,
      placeholder: "https://youtube.com/yourchannel",
    },
    {
      id: "instagram",
      name: "Instagram",
      icon: ICONS.instagram,
      placeholder: "https://instagram.com/yourprofile",
    },
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spin indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} />
      </div>
    );
  }

  return (
    <div className="max-h-screen overflow-auto sidebar-scrollbar p-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 gap-6">
          <div className="lg:col-span-3">
            {/* Header Section */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
              <Header
                title="Social Media Links"
                description="Manage your social media profiles and links"
              />

              {!isEditing ? (
                <Button
                  type="primary"
                  icon={<EditOutlined />}
                  onClick={handleEdit}
                  size="large"
                >
                  Edit Links
                </Button>
              ) : (
                <Space>
                  <Button
                    type="primary"
                    icon={<SaveOutlined />}
                    onClick={handleSave}
                    loading={isSaving}
                    size="large"
                  >
                    Save Changes
                  </Button>
                  <Button
                    icon={<CloseOutlined />}
                    onClick={handleCancel}
                    disabled={isSaving}
                    size="large"
                  >
                    Cancel
                  </Button>
                </Space>
              )}
            </div>

            {/* Social Links Card */}
            <Card>
              <div className="space-y-4">
                {socialMediaData.map((platform) => (
                  <div
                    key={platform.id}
                    className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-primary-color1 transition-colors"
                  >
                    {/* Platform Info */}
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <div className="flex-shrink-0">
                        <Image
                          src={platform.icon}
                          height={44}
                          width={44}
                          alt={platform.name}
                          className="rounded-lg"
                        />
                      </div>
                      <Text strong className="min-w-24 flex-shrink-0">
                        {platform.name}
                      </Text>
                    </div>

                    {/* Link Input/Display */}
                    <div className="flex-1 w-full min-w-0">
                      {isEditing ? (
                        <Input
                          value={tempLinks[platform.id]}
                          onChange={(e) =>
                            handleInputChange(platform.id, e.target.value)
                          }
                          placeholder={platform.placeholder}
                          size="large"
                          status={
                            tempLinks[platform.id] &&
                            !isValidUrl(tempLinks[platform.id])
                              ? "error"
                              : ""
                          }
                        />
                      ) : (
                        <div className="min-h-8 flex items-center">
                          {socialLinks[platform.id] ? (
                            <a
                              href={socialLinks[platform.id]}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:text-blue-800 hover:underline break-all"
                            >
                              {socialLinks[platform.id]}
                            </a>
                          ) : (
                            <Text type="secondary" className="italic">
                              Not set
                            </Text>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SocialMediaPage;
