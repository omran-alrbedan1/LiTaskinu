"use client";

import { ChevronRight, type LucideIcon } from "lucide-react";
import { usePathname } from "next/navigation";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";

export function NavMain({
  items,
  title,
}: {
  items: {
    title: string;
    url: string;
    icon?: LucideIcon;
    isActive?: boolean;
    items?: {
      title: string;
      url: string;
    }[];
  }[];
  title?: string;
}) {
  const pathname = usePathname();

  const isActiveLink = (url: string) => {
    if (pathname === url) return true;
    const currentPathWithoutQuery = pathname.split("?")[0];
    const urlWithoutQuery = url.split("?")[0];
    return currentPathWithoutQuery === urlWithoutQuery;
  };

  return (
    <SidebarGroup>
      {title && (
        <SidebarGroupLabel className="text-primary-color1 font-bold">
          {title}
        </SidebarGroupLabel>
      )}
      <SidebarMenu>
        {items.map((item) => {
          const isActive = isActiveLink(item.url);

          return (
            <SidebarMenuItem key={item.title}>
              {item.items && item.items.length > 0 ? (
                <Collapsible
                  asChild
                  defaultOpen={item.isActive}
                  className=" p-1"
                >
                  <div>
                    <CollapsibleTrigger asChild>
                      <SidebarMenuButton
                        tooltip={item.title}
                        className={
                          isActive
                            ? "hover:bg-primary-color1  bg-primary-color1 text-white"
                            : ""
                        }
                      >
                        {item.icon && (
                          <item.icon
                            className={
                              isActive ? "text-white" : "text-primary-color1"
                            }
                          />
                        )}
                        <span>{item.title}</span>
                        <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                      </SidebarMenuButton>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <SidebarMenuSub>
                        {item.items.map((subItem) => {
                          const isSubItemActive = isActiveLink(subItem.url);

                          return (
                            <SidebarMenuSubItem key={subItem.title}>
                              <SidebarMenuSubButton
                                asChild
                                className={
                                  isSubItemActive
                                    ? "bg-primary-color1 text-white"
                                    : ""
                                }
                              >
                                <a href={subItem.url}>
                                  <span>{subItem.title}</span>
                                </a>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          );
                        })}
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  </div>
                </Collapsible>
              ) : (
                <SidebarMenuButton
                  asChild
                  tooltip={item.title}
                  className={cn(
                    isActive
                      ? "hover:bg-primary-color1 hover:text-white  bg-primary-color1 text-white"
                      : ""
                  )}
                >
                  <a href={item.url}>
                    {item.icon && (
                      <item.icon
                        className={
                          isActive ? "text-white" : "text-primary-color1"
                        }
                      />
                    )}
                    <span>{item.title}</span>
                  </a>
                </SidebarMenuButton>
              )}
            </SidebarMenuItem>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}
