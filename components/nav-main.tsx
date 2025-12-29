"use client";

import { ChevronRight, type LucideIcon } from "lucide-react";
import { usePathname, useSearchParams } from "next/navigation";
import Link from "next/link";

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
  const searchParams = useSearchParams();

  const isActiveLink = (url: string) => {
    const [path, query] = url.split("?");
    const currentPath = pathname;

    if (currentPath !== path) return false;

    if (!query) {
      return !searchParams.get("status");
    }

    const targetParams = new URLSearchParams(query);
    let isMatch = true;

    targetParams.forEach((value, key) => {
      if (searchParams.get(key) !== value) {
        isMatch = false;
      }
    });

    return isMatch;
  };

  const hasActiveChild = (parentItem: { items?: { url: string }[] }) => {
    if (!parentItem.items) return false;
    return parentItem.items.some((child) => isActiveLink(child.url));
  };

  // Helper function to extract path from URL for Link component
  const getLinkProps = (url: string) => {
    const [path, query] = url.split("?");
    return {
      href: query ? `${path}?${query}` : path,
    };
  };

  return (
    <SidebarGroup>
      {title && (
        <SidebarGroupLabel className="text-primary-color1 font-bold">
          {title}
        </SidebarGroupLabel>
      )}
      <SidebarMenu>
        {items?.map((item) => {
          const isActive = isActiveLink(item.url);
          const childActive = hasActiveChild(item);
          const linkProps = getLinkProps(item.url);

          return (
            <SidebarMenuItem key={item.title}>
              {item.items && item.items.length > 0 ? (
                <Collapsible
                  asChild
                  defaultOpen={isActive || childActive}
                  className="p-1"
                >
                  <div>
                    <CollapsibleTrigger asChild>
                      <SidebarMenuButton
                        tooltip={item.title}
                        className={cn(
                          "transition-colors duration-200",
                          isActive || childActive
                            ? "hover:bg-primary-color1 bg-primary-color1 text-white"
                            : "hover:bg-muted"
                        )}
                      >
                        {item.icon && (
                          <item.icon
                            className={
                              isActive || childActive
                                ? "text-white"
                                : "text-primary-color1"
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
                          const subLinkProps = getLinkProps(subItem.url);

                          return (
                            <SidebarMenuSubItem key={subItem.title}>
                              <SidebarMenuSubButton
                                asChild
                                className={cn(
                                  "transition-colors duration-200",
                                  isSubItemActive
                                    ? "bg-primary-color1 text-white"
                                    : "hover:bg-muted"
                                )}
                              >
                                <Link {...subLinkProps} >
                                  <span>{subItem.title}</span>
                                </Link>
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
                    "transition-colors duration-200",
                    isActive
                      ? "hover:bg-primary-color1 bg-primary-color1 text-white"
                      : "hover:bg-muted"
                  )}
                >
                  <Link {...linkProps} >
                    {item.icon && (
                      <item.icon
                        className={
                          isActive ? "text-white" : "text-primary-color1"
                        }
                      />
                    )}
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              )}
            </SidebarMenuItem>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}