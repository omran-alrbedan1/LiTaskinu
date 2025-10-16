"use client";

import * as React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Flag,
  AlertTriangle,
  CheckCircle,
  Clock,
  BarChart3,
} from "lucide-react";

const reportedData = {
  pending: [
    {
      id: 1,
      type: "chat",
      reporter: "user_123",
      reported: "user_456",
      reason: "محتوى غير لائق",
      severity: "high",
      reportedAt: "2024-01-20 14:30",
      status: "pending",
    },
    {
      id: 2,
      type: "profile",
      reporter: "user_789",
      reported: "user_012",
      reason: "صورة غير مناسبة",
      severity: "medium",
      reportedAt: "2024-01-20 13:15",
      status: "pending",
    },
  ],
  resolved: [
    {
      id: 3,
      type: "chat",
      reporter: "user_345",
      reported: "user_678",
      reason: "تحرش لفظي",
      severity: "critical",
      reportedAt: "2024-01-19 16:20",
      resolvedAt: "2024-01-20 09:30",
      status: "resolved",
      action: "تم حظر المستخدم",
    },
  ],
};

export default function ReportedContentPage() {
  const getSeverityBadge = (severity: string) => {
    const variants = {
      low: "bg-green-100 text-green-800",
      medium: "bg-yellow-100 text-yellow-800",
      high: "bg-orange-100 text-orange-800",
      critical: "bg-red-100 text-red-800",
    };
    return (
      <Badge className={variants[severity as keyof typeof variants]}>
        {severity}
      </Badge>
    );
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      pending: "bg-yellow-100 text-yellow-800",
      under_review: "bg-blue-100 text-blue-800",
      resolved: "bg-green-100 text-green-800",
    };
    return (
      <Badge className={variants[status as keyof typeof variants]}>
        {status}
      </Badge>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            المحتوى المبلغ عنه
          </h1>
          <p className="text-muted-foreground">
            إدارة البلاغات والمراجعة للمحتوى غير المناسب
          </p>
        </div>
        <Button variant="outline">
          <BarChart3 className="w-4 h-4 mr-2" />
          تقرير البلاغات
        </Button>
      </div>

      {/* إحصائيات */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">بلاغات جديدة</CardTitle>
            <Flag className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">15</div>
            <p className="text-xs text-muted-foreground">+3 من اليوم الماضي</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">قيد المراجعة</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">بحاجة لمراجعة</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">حرجة</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">تحتاج تدخل فوري</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">تم الحل</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">42</div>
            <p className="text-xs text-muted-foreground">هذا الأسبوع</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="pending" className="space-y-4">
        <TabsList>
          <TabsTrigger value="pending">قيد الانتظار</TabsTrigger>
          <TabsTrigger value="review">قيد المراجعة</TabsTrigger>
          <TabsTrigger value="resolved">تم الحل</TabsTrigger>
          <TabsTrigger value="all">جميع البلاغات</TabsTrigger>
        </TabsList>

        <TabsContent value="pending">
          <Card>
            <CardHeader>
              <CardTitle>بلاغات في انتظار المراجعة</CardTitle>
              <CardDescription>
                البلاغات الجديدة التي تحتاج إلى مراجعة من المسؤول
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>رقم البلاغ</TableHead>
                    <TableHead>النوع</TableHead>
                    <TableHead>المبلغ</TableHead>
                    <TableHead>المبلغ عنه</TableHead>
                    <TableHead>السبب</TableHead>
                    <TableHead>الشدة</TableHead>
                    <TableHead>تاريخ البلاغ</TableHead>
                    <TableHead>الحالة</TableHead>
                    <TableHead>الإجراءات</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {reportedData.pending.map((report) => (
                    <TableRow key={report.id}>
                      <TableCell className="font-medium">
                        #{report.id}
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">
                          {report.type === "chat" ? "محادثة" : "ملف شخصي"}
                        </Badge>
                      </TableCell>
                      <TableCell>{report.reporter}</TableCell>
                      <TableCell>{report.reported}</TableCell>
                      <TableCell className="max-w-[150px] truncate">
                        {report.reason}
                      </TableCell>
                      <TableCell>{getSeverityBadge(report.severity)}</TableCell>
                      <TableCell>{report.reportedAt}</TableCell>
                      <TableCell>{getStatusBadge(report.status)}</TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">
                            مراجعة
                          </Button>
                          <Button variant="destructive" size="sm">
                            حظر
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="resolved">
          <Card>
            <CardHeader>
              <CardTitle>البلاغات التي تم حلها</CardTitle>
              <CardDescription>
                البلاغات التي تمت مراجعتها واتخاذ الإجراء المناسب
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>رقم البلاغ</TableHead>
                    <TableHead>النوع</TableHead>
                    <TableHead>السبب</TableHead>
                    <TableHead>الشدة</TableHead>
                    <TableHead>تاريخ البلاغ</TableHead>
                    <TableHead>تاريخ الحل</TableHead>
                    <TableHead>الإجراء المتخذ</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {reportedData.resolved.map((report) => (
                    <TableRow key={report.id}>
                      <TableCell className="font-medium">
                        #{report.id}
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">
                          {report.type === "chat" ? "محادثة" : "ملف شخصي"}
                        </Badge>
                      </TableCell>
                      <TableCell>{report.reason}</TableCell>
                      <TableCell>{getSeverityBadge(report.severity)}</TableCell>
                      <TableCell>{report.reportedAt}</TableCell>
                      <TableCell>{report.resolvedAt}</TableCell>
                      <TableCell>
                        <Badge variant="secondary">{report.action}</Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
