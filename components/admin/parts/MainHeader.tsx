// src/components/admin/parts/Header.tsx
"use client";

import { usePathname } from "next/navigation";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Notifications, UserMenu, SearchBar } from ".";
import { getBreadcrumbs } from "@/utils/breadcrumbs";

const MainHeader = () => {
  const pathname = usePathname();
  const breadcrumbs = getBreadcrumbs(pathname);

  return (
    <header className="flex h-16 shrink-0 items-center justify-between gap-4 px-8 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12 border-b">
      <div className="flex items-center gap-2">
        <SidebarTrigger />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <Breadcrumb>
          <BreadcrumbList>
            {breadcrumbs.map((breadcrumb, index) => {
              const isLast = index === breadcrumbs.length - 1;

              return (
                <div key={breadcrumb.label} className="flex items-center">
                  {index > 0 && <BreadcrumbSeparator className="mx-2" />}
                  <BreadcrumbItem className="hidden md:block text-primary-color1">
                    {isLast ? (
                      <BreadcrumbPage className="text-primary font-semibold">
                        {breadcrumb.label}
                      </BreadcrumbPage>
                    ) : (
                      <BreadcrumbLink
                        href={breadcrumb.href || "#"}
                        className="hover:text-primary transition-colors"
                      >
                        {breadcrumb.label}
                      </BreadcrumbLink>
                    )}
                  </BreadcrumbItem>
                </div>
              );
            })}
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      {/* Right side - Search, notifications, and user menu */}
      <div className="flex items-center gap-4">
        <SearchBar />
        <Notifications />
        <UserMenu />
      </div>
    </header>
  );
};

export default MainHeader;
