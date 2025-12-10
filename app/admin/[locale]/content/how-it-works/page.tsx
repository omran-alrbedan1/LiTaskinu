"use client";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Edit, Plus } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { howItWorks } from "@/constants/admin";
import CustomHeader from "@/components/shared/CustomHeader";
import EmptyState from "@/components/shared/EmptyState";

const HowItWorksPreviewPage = () => {
  // Check if there are steps
  const hasSteps = howItWorks && howItWorks.length > 0;

  return (
    <div className="container mx-auto p-4 md:p-6 max-h-screen overflow-auto sidebar-scrollbar pb-44">
      <CustomHeader
        title="How It Works"
        description="Preview how users will see the steps section"
        action={[
          {
            label: "Edit steps",
            href: "./how-it-works/edit",
            icon: Edit,
          },
        ]}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 pb-32 gap-8">
        {/* Main Preview */}
        <div className="lg:col-span-2">
          <Card>
            <CardContent>
              {hasSteps ? (
                <div className="space-y-12">
                  {howItWorks.map((step, index) => (
                    <motion.div
                      key={step.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="flex gap-6"
                    >
                      {/* Step Number */}
                      <div className="flex-shrink-0">
                        <div className="w-14 h-14 rounded-full bg-primary text-white flex items-center justify-center text-xl font-bold shadow-lg">
                          {step.order}
                        </div>
                      </div>

                      {/* Content */}
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <h3 className="text-xl font-bold text-gray-800 dark:text-gray-300">
                            {step.title}
                          </h3>
                        </div>
                        <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                          {step.description}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <EmptyState
                  title="No Steps Added Yet"
                  description="Get started by adding the first step to guide users through your platform"
                  icon={
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
                      <Plus className="h-8 w-8 text-gray-400" />
                    </div>
                  }
                  action={
                    <Link href="./how-it-works/edit">
                      <Button>
                        <Plus className="mr-2 h-4 w-4" />
                        Add Your First Step
                      </Button>
                    </Link>
                  }
                />
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default HowItWorksPreviewPage;
