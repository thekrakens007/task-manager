export const reports = {
  users: {
    title: "User analytics",
    description:
      "Track the size of your community and how it changes each month.",
    metric: "Registered users",
    unit: "",
    values: [7300, 8100, 8800, 9700, 11103, 12480],
  },
  onboarding: {
    title: "Onboarding",
    description:
      "Follow the share of new accounts that complete their first steps.",
    metric: "Completion rate",
    unit: "%",
    values: [61, 64, 68, 72, 76, 81],
  },
  subscriptions: {
    title: "Subscriptions",
    description: "Review paid membership growth across the workspace.",
    metric: "Active subscriptions",
    unit: "",
    values: [1140, 1280, 1390, 1490, 1660, 1842],
  },
  processing: {
    title: "Processing",
    description: "Monitor completed work and monthly processing volume.",
    metric: "Completed jobs",
    unit: "",
    values: [9400, 10180, 12450, 14200, 16840, 19420],
  },
  engagement: {
    title: "Engagement",
    description: "See how many people return to the workspace each month.",
    metric: "Monthly active users",
    unit: "",
    values: [3100, 3460, 3820, 4340, 4810, 5340],
  },
} satisfies Record<
  string,
  {
    title: string
    description: string
    metric: string
    unit: string
    values: number[]
  }
>

export type ReportKind = keyof typeof reports
export function isReportKind(value: string | undefined): value is ReportKind {
  return value !== undefined && Object.hasOwn(reports, value)
}

export function getReportRows(kind: ReportKind, months: 3 | 6) {
  const names = ["Mar", "Apr", "May", "Jun", "Jul", "Aug"]
  return reports[kind].values
    .map((value, index) => ({
      id: String(index),
      month: names[index] ?? "",
      value,
    }))
    .slice(-months)
}
