"use client";

import * as React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Eye, Plus, Search, Filter, Download } from "lucide-react";
import { Input } from "@/components/ui/input";

// Mock data - replace with actual API calls
const adsData = {
  active: [
    {
      id: 1,
      title: "Premium Matchmaking Service",
      advertiser: "Nikah Connect",
      impressions: 12500,
      clicks: 342,
      status: "active",
      startDate: "2024-01-15",
      endDate: "2024-02-15",
      budget: 5000,
      spent: 3200,
    },
    {
      id: 2,
      title: "Islamic Marriage Workshop",
      advertiser: "Muslim Events",
      impressions: 8900,
      clicks: 567,
      status: "active",
      startDate: "2024-01-20",
      endDate: "2024-02-20",
      budget: 3000,
      spent: 1800,
    },
  ],
  pending: [
    {
      id: 3,
      title: "Dating App Promotion",
      advertiser: "New Startup",
      impressions: 0,
      clicks: 0,
      status: "pending",
      submittedDate: "2024-01-25",
      budget: 2000,
    },
  ],
};

export default function AdsManagementPage() {
  const [searchTerm, setSearchTerm] = React.useState("");

  return (
    <div className="space-y-6 p-8 max-h-[90vh] overflow-auto sideebar-scrollbar">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Ad Management</h1>
          <p className="text-muted-foreground">
            Manage advertisements and promotional content
          </p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Create New Ad
        </Button>
      </div>

      {/* Stats Overview */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Ads</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">45</div>
            <p className="text-xs text-muted-foreground">
              +12% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Ads</CardTitle>
            <Badge variant="secondary">Live</Badge>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">23</div>
            <p className="text-xs text-muted-foreground">Currently running</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Pending Approval
            </CardTitle>
            <Badge variant="outline">Review</Badge>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">7</div>
            <p className="text-xs text-muted-foreground">Awaiting approval</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <span className="text-sm font-medium">$</span>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$12,430</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="active">Active Ads</TabsTrigger>
          <TabsTrigger value="pending">Pending Approval</TabsTrigger>
          <TabsTrigger value="archived">Archived</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="flex items-center space-x-2">
            <div className="flex-1">
              <Input
                placeholder="Search ads..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="max-w-sm"
              />
            </div>
            <Button variant="outline" size="sm">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>

          <div className="grid gap-4">
            {adsData.active.map((ad) => (
              <Card key={ad.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-lg">{ad.title}</CardTitle>
                      <CardDescription>{ad.advertiser}</CardDescription>
                    </div>
                    <Badge variant="secondary">Active</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Impressions</p>
                      <p className="font-medium">
                        {ad.impressions.toLocaleString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Clicks</p>
                      <p className="font-medium">{ad.clicks}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">CTR</p>
                      <p className="font-medium">
                        {((ad.clicks / ad.impressions) * 100).toFixed(2)}%
                      </p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Budget Spent</p>
                      <p className="font-medium">
                        ${ad.spent} / ${ad.budget}
                      </p>
                    </div>
                  </div>
                  <div className="flex justify-end space-x-2 mt-4">
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                    <Button variant="outline" size="sm">
                      Pause
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="active">{/* Active ads content */}</TabsContent>

        <TabsContent value="pending">
          {/* Pending approval content */}
        </TabsContent>
      </Tabs>
    </div>
  );
}
