export interface WorkspaceUser {
  id: string
  name: string
  email: string
  role: "Member" | "Administrator"
  plan: "Free" | "Starter" | "Pro" | "Business"
  status: "Active" | "Invited" | "Suspended"
  joined: string
  lastActive: string
}
export const users: WorkspaceUser[] = [
  {
    id: "USR-1001",
    name: "Olivia Rhye",
    email: "olivia@northwind.dev",
    role: "Administrator",
    plan: "Pro",
    status: "Active",
    joined: "12 Mar 2026",
    lastActive: "12 min ago",
  },
  {
    id: "USR-1002",
    name: "Phoenix Baker",
    email: "phoenix@acme.co",
    role: "Member",
    plan: "Starter",
    status: "Active",
    joined: "18 Apr 2026",
    lastActive: "38 min ago",
  },
  {
    id: "USR-1003",
    name: "Lana Steiner",
    email: "lana@layers.design",
    role: "Member",
    plan: "Free",
    status: "Invited",
    joined: "8 Sep 2026",
    lastActive: "Not yet signed in",
  },
  {
    id: "USR-1004",
    name: "Demi Wilkinson",
    email: "demi@summit.co",
    role: "Member",
    plan: "Business",
    status: "Active",
    joined: "2 May 2026",
    lastActive: "2 hours ago",
  },
  {
    id: "USR-1005",
    name: "Drew Cano",
    email: "drew@catalog.studio",
    role: "Member",
    plan: "Pro",
    status: "Suspended",
    joined: "15 Jun 2026",
    lastActive: "3 days ago",
  },
  {
    id: "USR-1006",
    name: "Natali Craig",
    email: "natali@mercury.co",
    role: "Member",
    plan: "Starter",
    status: "Active",
    joined: "24 Jul 2026",
    lastActive: "Yesterday",
  },
]
