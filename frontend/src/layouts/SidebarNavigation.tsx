import { useState } from "react"

import {
  useLocation,
  useNavigate,
} from "react-router-dom"

import {
  navigationGroups as groups,
} from "@/app/navigation"

import {
  AnimatedSidebarGroup,
  AnimatedSidebarGroupContent,
  AnimatedSidebarMenu,
  AnimatedSidebarMenuButton,
  AnimatedSidebarMenuItem,
  AnimatedSidebarMenuSub,
  AnimatedSidebarMenuSubButton,
  AnimatedSidebarMenuSubItem,
} from "@/components/motion/animated-sidebar"

export function SidebarNavigation() {
  const { pathname } = useLocation()
  const navigate = useNavigate()

  const [openGroups, setOpenGroups] =
      useState<Record<string, boolean>>(() =>
          Object.fromEntries(
              groups.map((group) => [
                group.label,
                group.label === "Workspace" ||
                group.items.some(
                    (item) =>
                        item.href === pathname,
                ),
              ]),
          ),
      )

  return (
      <nav aria-label="Navigation principale">
        <AnimatedSidebarGroup>
          <AnimatedSidebarGroupContent>
            <AnimatedSidebarMenu>
              {groups.map((group) => (
                  <AnimatedSidebarMenuItem
                      key={group.label}
                  >
                    <AnimatedSidebarMenuButton
                        ariaExpanded={
                          openGroups[group.label]
                        }
                        closeOnSelect={false}
                        icon={
                          <group.icon className="size-5" />
                        }
                        isActive={group.items.some(
                            (item) =>
                                item.href === pathname,
                        )}
                        onSelect={() =>
                            setOpenGroups(
                                (current) => ({
                                  ...current,
                                  [group.label]:
                                      !current[
                                          group.label
                                          ],
                                }),
                            )
                        }
                    >
                      {group.label}
                    </AnimatedSidebarMenuButton>

                    <AnimatedSidebarMenuSub
                        open={
                          openGroups[group.label]
                        }
                    >
                      {group.items.map((item) => (
                          <AnimatedSidebarMenuSubItem
                              key={item.href}
                          >
                            <AnimatedSidebarMenuSubButton
                                href={item.href}
                                onSelect={() =>
                                    navigate(
                                        item.href,
                                    )
                                }
                                isActive={
                                    pathname ===
                                    item.href
                                }
                                icon={
                                  <item.icon className="size-4" />
                                }
                            >
                              {item.label}
                            </AnimatedSidebarMenuSubButton>
                          </AnimatedSidebarMenuSubItem>
                      ))}
                    </AnimatedSidebarMenuSub>
                  </AnimatedSidebarMenuItem>
              ))}
            </AnimatedSidebarMenu>
          </AnimatedSidebarGroupContent>
        </AnimatedSidebarGroup>
      </nav>
  )
}