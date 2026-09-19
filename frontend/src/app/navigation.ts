import {
  LayoutDashboard,
  ListTodo,
  Settings,
} from "lucide-react"

export const navigationGroups = [
  {
    label: "Workspace",
    icon: LayoutDashboard,
    items: [
      {
        label: "Tableau de bord",
        href: "/",
        icon: LayoutDashboard,
      },
      {
        label: "Mes tâches",
        href: "/tasks",
        icon: ListTodo,
      },
    ],
  },
  {
    label: "Compte",
    icon: Settings,
    items: [
      {
        label: "Paramètres",
        href: "/settings",
        icon: Settings,
      },
    ],
  },
]

/**
 * Retourne le titre correspondant à la route actuelle.
 */
export function getNavigationTitle(
    pathname: string,
): string {
  // Tableau de bord
  if (pathname === "/") {
    return "Tableau de bord"
  }

  // Mes tâches
  if (pathname === "/tasks") {
    return "Mes tâches"
  }

  // Paramètres
  if (pathname === "/settings") {
    return "Paramètres"
  }

  // Sécurité du compte
  if (pathname === "/account/security") {
    return "Sécurité"
  }

  // Anciennes routes conservées pour éviter
  // les problèmes avec le routeur/template.
  if (pathname.startsWith("/analytics")) {
    return "Analytics"
  }

  if (pathname === "/operations") {
    return "Operations"
  }

  if (pathname === "/administrators") {
    return "Administrators"
  }

  if (pathname === "/roles") {
    return "Roles"
  }

  if (pathname === "/audit") {
    return "Audit"
  }

  if (pathname === "/deletions") {
    return "Deletions"
  }

  return "Task Manager"
}