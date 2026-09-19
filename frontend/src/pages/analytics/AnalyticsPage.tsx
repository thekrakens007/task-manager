import { useParams } from "react-router-dom"
import { AnalyticsReport } from "@/features/analytics/components/AnalyticsReport"
import { isReportKind } from "@/features/analytics/data/reports"
import NotFoundPage from "@/pages/not-found-page"

export default function AnalyticsPage() {
  const { kind } = useParams()
  return isReportKind(kind) ? (
    <AnalyticsReport key={kind} kind={kind} />
  ) : (
    <NotFoundPage />
  )
}
