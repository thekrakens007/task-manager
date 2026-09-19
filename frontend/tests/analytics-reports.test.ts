import { test, expect } from "vitest"

import {
  getReportRows,
  isReportKind,
} from "../src/features/analytics/data/reports"


test("unknown or inherited route names cannot resolve to analytics reports", () => {
  for (const key of [
    undefined,
    "missing",
    "constructor",
    "__proto__",
  ]) {
    expect(isReportKind(key)).toBe(false)
  }

  expect(isReportKind("onboarding")).toBe(true)
})


test("shortening a report period preserves the latest month and does not mutate the full series", () => {
  const full = getReportRows("users", 6)
  const recent = getReportRows("users", 3)

  expect(recent[0]?.month).toBe("Jun")
  expect(recent.at(-1)).toEqual(full.at(-1))
  expect(full.length).toBe(6)
  expect(getReportRows("users", 6)).toEqual(full)
})