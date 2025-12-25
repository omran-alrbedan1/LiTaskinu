"use client";
import { useState, useCallback, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/admin/shared";
import { Save, Eye, Edit3, Upload, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const AboutUsPage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState("header");
  
  // Initial content state matching your current page
  const [content, setContent] = useState({
    // Header Section
    headerBadge: "Halal Matchmaking Platform",
    headerTitle: "About LITASKUNU",
    headerDescription: "We help Muslims find their life partners through a halal, dignified, and modern approach to matchmaking. For years, NikahConnect has been bringing together compatible individuals seeking meaningful Islamic marriages.",
    
    // Mission Section
    missionBadge: "Our Purpose",
    missionTitle: "Our Mission",
    missionDescription: "To facilitate meaningful connections between Muslims seeking marriage, while upholding Islamic values and principles. We believe that finding a righteous spouse is half of one's faith, and we're honored to help you complete your deen.",
    missionImage: "https://images.unsplash.com/photo-1511895426328-dc8714191300?w=800&h=600&fit=crop",
    
    // Mission Checkpoints
    checkpoints: [
      "Strict adherence to Islamic principles.",
      "Privacy and dignity maintained throughout.",
      "Family involvement encouraged and supported."
    ],
    
    // Services Section
    servicesBadge: "What We Offer",
    servicesTitle: "Our Services",
    servicesDescription: "Comprehensive support on your journey to finding a righteous spouse, guided by Islamic principles.",
    
    // Services
    services: [
      {
        icon: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z",
        title: "Unique user experience",
        description: "A platform designed with authenticity and sincerity. We maintain strict standards to protect our community."
      },
      {
        icon: "M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z",
        title: "Data integrity",
        description: "Your personal information is protected with the highest security standards, and we'll guardian implementation is facilitated."
      },
      {
        icon: "M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z",
        title: "Islamic vibes",
        description: "Respectful and ethical approach to help navigate the marriage process according to Shariah."
      }
    ],
    
    // Trusted Section
    trustedBadge: "Our Impact",
    trustedTitle: "Trusted by the Community",
    trustedDescription: "Our platform is built on trust, dedication, and commitment to helping Muslims find their compatible life partners.",
    trustedImage: "https://images.unsplash.com/photo-1606800052052-a08af7148866?w=800&h=600&fit=crop",
    
    // Success Stories
    successTitle: "Success Stories",
    successDescription: "Alhamdulillah, we've helped thousands of Muslims find their life partners through our halal and dignified matchmaking platform.",
    
    // Stats
    stats: [
      { value: "5,000+", label: "Successful Matches" },
      { value: "50+", label: "Countries Served" },
      { value: "95%", label: "Success Rate" },
      { value: "24/7", label: "Support Available" }
    ],
    
    // CTA Section
    ctaTitle: "Ready to Begin Your Journey?",
    ctaDescription: "Take the first step towards completing half your deen. Join our trusted Islamic matchmaking platform today.",
    ctaPrimaryButton: "Create your profile",
    ctaSecondaryButton: "Learn More"
  });

  // Fetch initial content from API (simulated)
  useEffect(() => {
    // In real app: fetch content from API
    // const fetchContent = async () => {
    //   const data = await getAboutUsContent();
    //   setContent(data);
    // };
    // fetchContent();
  }, []);

  // Handler functions
  const handleSave = async () => {
    setSaving(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setSaving(false);
    setIsEditing(false);
    console.log("Saving content:", content);
    // In real app: await saveAboutUsContent(content);
  };

  const handleCancel = () => {
    setIsEditing(false);
    // Fetch original content from API
  };

  const handleInputChange = useCallback((section: string, field: string, value: any) => {
    setContent(prev => ({
      ...prev,
      [field]: value
    }));
  }, []);

  const handleArrayChange = useCallback((section: string, index: number, field: string, value: string) => {
    setContent(prev => ({
      ...prev,
      [section]: prev[section].map((item: any, i: number) => 
        i === index ? { ...item, [field]: value } : item
      )
    }));
  }, []);

  const addCheckpoint = useCallback(() => {
    setContent(prev => ({
      ...prev,
      checkpoints: [...prev.checkpoints, ""]
    }));
  }, []);

  const removeCheckpoint = useCallback((index: number) => {
    setContent(prev => ({
      ...prev,
      checkpoints: prev.checkpoints.filter((_: any, i: number) => i !== index)
    }));
  }, []);

  const addService = useCallback(() => {
    setContent(prev => ({
      ...prev,
      services: [...prev.services, {
        icon: "",
        title: "",
        description: ""
      }]
    }));
  }, []);

  const removeService = useCallback((index: number) => {
    setContent(prev => ({
      ...prev,
      services: prev.services.filter((_: any, i: number) => i !== index)
    }));
  }, []);

  const addStat = useCallback(() => {
    setContent(prev => ({
      ...prev,
      stats: [...prev.stats, { value: "", label: "" }]
    }));
  }, []);

  const removeStat = useCallback((index: number) => {
    setContent(prev => ({
      ...prev,
      stats: prev.stats.filter((_: any, i: number) => i !== index)
    }));
  }, []);

  return (
    <div className="mx-auto pb-32 p-6 max-h-[90vh] sidebar-scrollbar overflow-auto">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <Header
          title="Manage About Us Page"
          description="Edit the content of the About Us page that appears to users on the website"
        />
        <div className="flex items-center gap-2">
          {isEditing ? (
            <>
              <Button
                variant="outline"
                onClick={handleCancel}
                disabled={saving}
              >
                Cancel
              </Button>
              <Button
                onClick={handleSave}
                disabled={saving}
                className="flex items-center gap-2 bg-primary-color1 text-white"
              >
                <Save className="w-4 h-4" />
                {saving ? "Saving..." : "Save Changes"}
              </Button>
            </>
          ) : (
            <Button
              onClick={() => setIsEditing(true)}
              className="flex items-center gap-2 bg-primary-color1 text-white"
            >
              <Edit3 className="w-4 h-4" />
              Edit Content
            </Button>
          )}
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid grid-cols-5 w-full">
          <TabsTrigger value="header">Header</TabsTrigger>
          <TabsTrigger value="mission">Mission</TabsTrigger>
          <TabsTrigger value="services">Services</TabsTrigger>
          <TabsTrigger value="trusted">Trusted</TabsTrigger>
          <TabsTrigger value="cta">Call to Action</TabsTrigger>
        </TabsList>

        {/* Header Section */}
        <TabsContent value="header" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Header Section</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="headerBadge">Badge Text</Label>
                <Input
                  id="headerBadge"
                  value={content.headerBadge}
                  onChange={(e) => handleInputChange("header", "headerBadge", e.target.value)}
                  disabled={!isEditing}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="headerTitle">Main Title</Label>
                <Input
                  id="headerTitle"
                  value={content.headerTitle}
                  onChange={(e) => handleInputChange("header", "headerTitle", e.target.value)}
                  disabled={!isEditing}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="headerDescription">Description</Label>
                <Textarea
                  id="headerDescription"
                  value={content.headerDescription}
                  onChange={(e) => handleInputChange("header", "headerDescription", e.target.value)}
                  disabled={!isEditing}
                  rows={4}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Mission Section */}
        <TabsContent value="mission" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Mission Section</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="missionBadge">Badge Text</Label>
                  <Input
                    id="missionBadge"
                    value={content.missionBadge}
                    onChange={(e) => handleInputChange("mission", "missionBadge", e.target.value)}
                    disabled={!isEditing}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="missionTitle">Title</Label>
                  <Input
                    id="missionTitle"
                    value={content.missionTitle}
                    onChange={(e) => handleInputChange("mission", "missionTitle", e.target.value)}
                    disabled={!isEditing}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="missionDescription">Description</Label>
                <Textarea
                  id="missionDescription"
                  value={content.missionDescription}
                  onChange={(e) => handleInputChange("mission", "missionDescription", e.target.value)}
                  disabled={!isEditing}
                  rows={4}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="missionImage">Image URL</Label>
                <div className="flex gap-2">
                  <Input
                    id="missionImage"
                    value={content.missionImage}
                    onChange={(e) => handleInputChange("mission", "missionImage", e.target.value)}
                    disabled={!isEditing}
                  />
                  {isEditing && (
                    <Button variant="outline" size="icon">
                      <Upload className="w-4 h-4" />
                    </Button>
                  )}
                </div>
                {content.missionImage && (
                  <div className="mt-2">
                    <img 
                      src={content.missionImage} 
                      alt="Mission" 
                      className="w-32 h-32 object-cover rounded-md"
                    />
                  </div>
                )}
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label>Checkpoints</Label>
                  {isEditing && (
                    <Button size="sm" onClick={addCheckpoint}>
                      Add Checkpoint
                    </Button>
                  )}
                </div>
                <div className="space-y-2">
                  {content.checkpoints.map((checkpoint, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <Input
                        value={checkpoint}
                        onChange={(e) => {
                          const newCheckpoints = [...content.checkpoints];
                          newCheckpoints[index] = e.target.value;
                          setContent(prev => ({ ...prev, checkpoints: newCheckpoints }));
                        }}
                        disabled={!isEditing}
                      />
                      {isEditing && content.checkpoints.length > 1 && (
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeCheckpoint(index)}
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Services Section */}
        <TabsContent value="services" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Services Section</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="servicesBadge">Badge Text</Label>
                  <Input
                    id="servicesBadge"
                    value={content.servicesBadge}
                    onChange={(e) => handleInputChange("services", "servicesBadge", e.target.value)}
                    disabled={!isEditing}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="servicesTitle">Title</Label>
                  <Input
                    id="servicesTitle"
                    value={content.servicesTitle}
                    onChange={(e) => handleInputChange("services", "servicesTitle", e.target.value)}
                    disabled={!isEditing}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="servicesDescription">Description</Label>
                <Textarea
                  id="servicesDescription"
                  value={content.servicesDescription}
                  onChange={(e) => handleInputChange("services", "servicesDescription", e.target.value)}
                  disabled={!isEditing}
                  rows={3}
                />
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label>Services</Label>
                  {isEditing && (
                    <Button size="sm" onClick={addService}>
                      Add Service
                    </Button>
                  )}
                </div>
                
                <div className="space-y-4">
                  {content.services.map((service, index) => (
                    <Card key={index} className="p-4">
                      <div className="flex justify-between items-start mb-4">
                        <h4 className="font-medium">Service {index + 1}</h4>
                        {isEditing && content.services.length > 1 && (
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => removeService(index)}
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        )}
                      </div>
                      
                      <div className="space-y-3">
                        <div className="space-y-2">
                          <Label>SVG Path (Icon)</Label>
                          <Input
                            value={service.icon}
                            onChange={(e) => handleArrayChange("services", index, "icon", e.target.value)}
                            disabled={!isEditing}
                            placeholder="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label>Title</Label>
                          <Input
                            value={service.title}
                            onChange={(e) => handleArrayChange("services", index, "title", e.target.value)}
                            disabled={!isEditing}
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label>Description</Label>
                          <Textarea
                            value={service.description}
                            onChange={(e) => handleArrayChange("services", index, "description", e.target.value)}
                            disabled={!isEditing}
                            rows={3}
                          />
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Trusted Section */}
        <TabsContent value="trusted" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Trusted Section</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="trustedBadge">Badge Text</Label>
                  <Input
                    id="trustedBadge"
                    value={content.trustedBadge}
                    onChange={(e) => handleInputChange("trusted", "trustedBadge", e.target.value)}
                    disabled={!isEditing}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="trustedTitle">Title</Label>
                  <Input
                    id="trustedTitle"
                    value={content.trustedTitle}
                    onChange={(e) => handleInputChange("trusted", "trustedTitle", e.target.value)}
                    disabled={!isEditing}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="trustedDescription">Description</Label>
                <Textarea
                  id="trustedDescription"
                  value={content.trustedDescription}
                  onChange={(e) => handleInputChange("trusted", "trustedDescription", e.target.value)}
                  disabled={!isEditing}
                  rows={3}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="trustedImage">Image URL</Label>
                <div className="flex gap-2">
                  <Input
                    id="trustedImage"
                    value={content.trustedImage}
                    onChange={(e) => handleInputChange("trusted", "trustedImage", e.target.value)}
                    disabled={!isEditing}
                  />
                  {isEditing && (
                    <Button variant="outline" size="icon">
                      <Upload className="w-4 h-4" />
                    </Button>
                  )}
                </div>
                {content.trustedImage && (
                  <div className="mt-2">
                    <img 
                      src={content.trustedImage} 
                      alt="Trusted" 
                      className="w-32 h-32 object-cover rounded-md"
                    />
                  </div>
                )}
              </div>
              
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="successTitle">Success Stories Title</Label>
                    <Input
                      id="successTitle"
                      value={content.successTitle}
                      onChange={(e) => handleInputChange("trusted", "successTitle", e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="successDescription">Success Stories Description</Label>
                    <Textarea
                      id="successDescription"
                      value={content.successDescription}
                      onChange={(e) => handleInputChange("trusted", "successDescription", e.target.value)}
                      disabled={!isEditing}
                      rows={3}
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label>Statistics</Label>
                    {isEditing && (
                      <Button size="sm" onClick={addStat}>
                        Add Statistic
                      </Button>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    {content.stats.map((stat, index) => (
                      <Card key={index} className="p-4">
                        <div className="flex justify-between items-start mb-4">
                          <h4 className="font-medium">Stat {index + 1}</h4>
                          {isEditing && content.stats.length > 1 && (
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => removeStat(index)}
                            >
                              <X className="w-4 h-4" />
                            </Button>
                          )}
                        </div>
                        
                        <div className="space-y-3">
                          <div className="space-y-2">
                            <Label>Value</Label>
                            <Input
                              value={stat.value}
                              onChange={(e) => {
                                const newStats = [...content.stats];
                                newStats[index].value = e.target.value;
                                setContent(prev => ({ ...prev, stats: newStats }));
                              }}
                              disabled={!isEditing}
                            />
                          </div>
                          
                          <div className="space-y-2">
                            <Label>Label</Label>
                            <Input
                              value={stat.label}
                              onChange={(e) => {
                                const newStats = [...content.stats];
                                newStats[index].label = e.target.value;
                                setContent(prev => ({ ...prev, stats: newStats }));
                              }}
                              disabled={!isEditing}
                            />
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* CTA Section */}
        <TabsContent value="cta" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Call to Action Section</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="ctaTitle">Title</Label>
                <Input
                  id="ctaTitle"
                  value={content.ctaTitle}
                  onChange={(e) => handleInputChange("cta", "ctaTitle", e.target.value)}
                  disabled={!isEditing}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="ctaDescription">Description</Label>
                <Textarea
                  id="ctaDescription"
                  value={content.ctaDescription}
                  onChange={(e) => handleInputChange("cta", "ctaDescription", e.target.value)}
                  disabled={!isEditing}
                  rows={3}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="ctaPrimaryButton">Primary Button Text</Label>
                  <Input
                    id="ctaPrimaryButton"
                    value={content.ctaPrimaryButton}
                    onChange={(e) => handleInputChange("cta", "ctaPrimaryButton", e.target.value)}
                    disabled={!isEditing}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="ctaSecondaryButton">Secondary Button Text</Label>
                  <Input
                    id="ctaSecondaryButton"
                    value={content.ctaSecondaryButton}
                    onChange={(e) => handleInputChange("cta", "ctaSecondaryButton", e.target.value)}
                    disabled={!isEditing}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Preview Section */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Eye className="w-5 h-5" />
            Preview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="border rounded-lg p-4 bg-gray-50 max-h-96 overflow-auto">
            {/* Header Preview */}
            <div className="text-center mb-8">
              <div className="inline-block mb-4">
                <span className="px-4 py-2 bg-white rounded-full text-sm text-gray-600 shadow-sm border border-gray-200">
                  {content.headerBadge}
                </span>
              </div>
              
              <h1 className="text-3xl font-bold text-gray-800 mb-4">
                {content.headerTitle}
              </h1>
              
              <p className="text-gray-600 max-w-3xl mx-auto leading-relaxed">
                {content.headerDescription}
              </p>
            </div>

            {/* Mission Preview */}
            <div className="bg-gray-50 rounded-2xl p-6 mb-8">
              <div className="flex flex-col lg:grid lg:grid-cols-2 gap-8">
                <div>
                  <div className="inline-block mb-4">
                    <span className="px-4 py-2 bg-white rounded-full text-sm text-gray-600 border border-gray-200">
                      {content.missionBadge}
                    </span>
                  </div>
                  
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    {content.missionTitle}
                  </h2>
                  
                  <p className="text-gray-600 mb-4">
                    {content.missionDescription}
                  </p>
                  
                  <div className="space-y-2">
                    {content.checkpoints.map((checkpoint, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <div className="mt-1 flex-shrink-0">
                          <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center">
                            <div className="w-3 h-3 rounded-full bg-green-600"></div>
                          </div>
                        </div>
                        <p className="text-gray-700 text-sm">{checkpoint}</p>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="relative">
                  <div className="rounded-2xl overflow-hidden shadow-lg">
                    <img
                      src={content.missionImage}
                      alt="Mission"
                      className="w-full h-48 object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Services Preview */}
            <div className="mb-8">
              <div className="text-center mb-6">
                <div className="inline-block mb-4">
                  <span className="px-4 py-2 bg-white rounded-full text-sm text-gray-600 shadow-sm border border-gray-200">
                    {content.servicesBadge}
                  </span>
                </div>
                
                <h2 className="text-2xl font-bold text-gray-900 mb-3">
                  {content.servicesTitle}
                </h2>
                
                <p className="text-gray-600 max-w-2xl mx-auto">
                  {content.servicesDescription}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {content.services.slice(0, 3).map((service, index) => (
                  <div key={index} className="bg-white rounded-xl p-4 text-center shadow-sm">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={service.icon} />
                      </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{service.title}</h3>
                    <p className="text-gray-600 text-xs">{service.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA Preview */}
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-3">
                {content.ctaTitle}
              </h2>
              
              <p className="text-gray-600 max-w-2xl mx-auto mb-4">
                {content.ctaDescription}
              </p>

              <div className="flex gap-3 justify-center">
                <button className="px-4 py-2 bg-green-600 text-white font-medium rounded-full">
                  {content.ctaPrimaryButton}
                </button>
                <button className="px-4 py-2 bg-white text-gray-700 font-medium rounded-full border border-gray-300">
                  {content.ctaSecondaryButton}
                </button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AboutUsPage;