import { createBrowserRouter, Navigate } from "react-router-dom"

import { AuthLayout } from "@/layouts/auth-layout"
import { AppLayoutSkeleton } from "@/layouts/app-layout-skeleton"

import LoginPage from "@/pages/auth/login-page"
import ErrorPage from "@/pages/error-page"

export const router = createBrowserRouter([
  {
  path: "/login",
  element: <AuthLayout />,
  errorElement: <ErrorPage />,
  children: [
    {
      index: true,
      element: <LoginPage />,
    },
  ],
},

{
  path: "/register",
  element: <AuthLayout />,
  errorElement: <ErrorPage />,
  children: [
    {
      index: true,
      lazy: async () => ({
        Component: (
          await import(
            "@/pages/auth/register-page"
          )
        ).default,
      }),
    },
  ],
},



  {
    path: "/",
    HydrateFallback: AppLayoutSkeleton,

    lazy: async () => ({
      Component: (
        await import("@/layouts/app-layout")
      ).AppLayout,
    }),

    errorElement: <ErrorPage />,

    children: [
      {
        index: true,

        lazy: async () => ({
          Component: (
            await import(
              "@/pages/dashboard/DashboardPage"
            )
          ).default,
        }),
      },

      {
        path: "tasks",

        lazy: async () => ({
          Component: (
            await import(
              "@/pages/tasks/TasksPage"
            )
          ).default,
        }),
      },

      {
        path: "users",

        lazy: async () => ({
          Component: (
            await import(
              "@/pages/users/UsersPage"
            )
          ).default,
        }),
      },

      {
        path: "settings",

        lazy: async () => ({
          Component: (
            await import(
              "@/pages/settings/SettingsPage"
            )
          ).default,
        }),
      },

      {
        path: "products",

        element: (
          <Navigate
            to="/tasks"
            replace
          />
        ),
      },

      {
        path: "analytics/:kind",

        lazy: async () => ({
          Component: (
            await import(
              "@/pages/analytics/AnalyticsPage"
            )
          ).default,
        }),
      },

      {
        path: "operations",

        lazy: async () => ({
          Component: (
            await import(
              "@/pages/operations/OperationsPage"
            )
          ).default,
        }),
      },

      {
        path: "administrators",

        lazy: async () => ({
          Component: (
            await import(
              "@/pages/governance/AdministratorsPage"
            )
          ).default,
        }),
      },

      {
        path: "roles",

        lazy: async () => ({
          Component: (
            await import(
              "@/pages/governance/RolesPage"
            )
          ).default,
        }),
      },

      {
        path: "audit",

        lazy: async () => ({
          Component: (
            await import(
              "@/pages/governance/AuditPage"
            )
          ).default,
        }),
      },

      {
        path: "deletions",

        lazy: async () => ({
          Component: (
            await import(
              "@/pages/governance/DeletionsPage"
            )
          ).default,
        }),
      },

      {
        path: "account/security",

        lazy: async () => ({
          Component: (
            await import(
              "@/pages/account/SecurityPage"
            )
          ).default,
        }),
      },

      {
        path: "*",

        lazy: async () => ({
          Component: (
            await import(
              "@/pages/not-found-page"
            )
          ).default,
        }),
      },
    ],
  },
])

