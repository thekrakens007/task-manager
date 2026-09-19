export const roles = [
  {
    name: "Owner",
    description:
      "Workspace ownership, billing, and all administrative controls.",
    members: 1,
    permissions: [
      "View analytics",
      "Manage users",
      "Manage administrators",
      "Manage roles",
      "Review audit history",
      "Manage workspace settings",
    ],
  },
  {
    name: "Administrator",
    description: "Daily account management and operational oversight.",
    members: 2,
    permissions: [
      "View analytics",
      "Manage users",
      "Review operations",
      "Review audit history",
    ],
  },
  {
    name: "Analyst",
    description:
      "Read reports and export data without changing account access.",
    members: 1,
    permissions: ["View analytics", "Export reports", "View user directory"],
  },
]

export interface Administrator {
  id: string
  name: string
  email: string
  role: string
  status: "Active" | "Invited"
  lastActive: string
}
export const administrators: Administrator[] = [
  {
    id: "admin-1",
    name: "Alex Morgan",
    email: "alex.morgan@northwind.dev",
    role: "Owner",
    status: "Active",
    lastActive: "Now",
  },
  {
    id: "admin-2",
    name: "Olivia Rhye",
    email: "olivia@northwind.dev",
    role: "Administrator",
    status: "Active",
    lastActive: "12 min ago",
  },
  {
    id: "admin-3",
    name: "Phoenix Baker",
    email: "phoenix@northwind.dev",
    role: "Administrator",
    status: "Active",
    lastActive: "38 min ago",
  },
  {
    id: "admin-4",
    name: "Lana Steiner",
    email: "lana@northwind.dev",
    role: "Analyst",
    status: "Invited",
    lastActive: "Not yet signed in",
  },
]

export interface LedgerEntry {
  id: string
  title: string
  actor: string
  category: string
  time: string
  status: string
  detail: string
}
export const auditEntries: LedgerEntry[] = [
  {
    id: "evt-2084",
    title: "Workspace profile updated",
    actor: "Alex Morgan",
    category: "Settings",
    time: "08 Sep 2026, 09:42",
    status: "Succeeded",
    detail:
      "The workspace display name and description were updated. Account permissions were unchanged.",
  },
  {
    id: "evt-2083",
    title: "Administrator invited",
    actor: "Olivia Rhye",
    category: "Access",
    time: "08 Sep 2026, 09:30",
    status: "Succeeded",
    detail: "An Analyst invitation was prepared for Lana Steiner.",
  },
  {
    id: "evt-2082",
    title: "User export created",
    actor: "Alex Morgan",
    category: "Export",
    time: "08 Sep 2026, 09:18",
    status: "Succeeded",
    detail: "The current user directory was exported as CSV.",
  },
  {
    id: "evt-2081",
    title: "Sign-in attempt rejected",
    actor: "Unknown account",
    category: "Authentication",
    time: "08 Sep 2026, 08:55",
    status: "Denied",
    detail: "The sign-in attempt did not complete. No session was created.",
  },
  {
    id: "evt-2080",
    title: "User access suspended",
    actor: "Phoenix Baker",
    category: "Access",
    time: "07 Sep 2026, 16:24",
    status: "Succeeded",
    detail:
      "Drew Cano's account was suspended following a workspace access review.",
  },
]
export const deletionEntries: LedgerEntry[] = [
  {
    id: "del-0312",
    title: "Account usr-2048",
    actor: "Account owner",
    category: "Account closure",
    time: "08 Sep 2026, 08:20",
    status: "Pending review",
    detail:
      "The account owner requested closure. Review the request and retention requirements before any deletion.",
  },
  {
    id: "del-0311",
    title: "Export exp-1180",
    actor: "Retention policy",
    category: "Expired export",
    time: "07 Sep 2026, 23:00",
    status: "Completed",
    detail:
      "A generated export reached the end of its retention period. The audit reference was retained.",
  },
  {
    id: "del-0310",
    title: "Account usr-1982",
    actor: "Account owner",
    category: "Account closure",
    time: "06 Sep 2026, 14:18",
    status: "Cancelled",
    detail:
      "The account owner withdrew the closure request before processing began.",
  },
  {
    id: "del-0309",
    title: "Attachment att-8421",
    actor: "Olivia Rhye",
    category: "Duplicate upload",
    time: "05 Sep 2026, 11:42",
    status: "Completed",
    detail:
      "A duplicate attachment was removed. The original attachment remains available.",
  },
]
