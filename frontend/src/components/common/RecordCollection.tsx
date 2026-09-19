import type { ReactNode } from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

interface Column<T> {
  label: string
  render: (record: T) => ReactNode
}
export function RecordCollection<T extends { id: string }>({
  records,
  columns,
  title,
  actions,
  empty = "No records match your search.",
}: {
  records: readonly T[]
  columns: readonly Column<T>[]
  title: (record: T) => ReactNode
  actions?: (record: T) => ReactNode
  empty?: string
}) {
  if (!records.length)
    return (
      <p
        role="status"
        className="py-12 text-center text-sm text-muted-foreground"
      >
        {empty}
      </p>
    )
  return (
    <>
      <div className="hidden xl:block">
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map((column) => (
                <TableHead key={column.label}>{column.label}</TableHead>
              ))}
              {actions && (
                <TableHead>
                  <span className="sr-only">Actions</span>
                </TableHead>
              )}
            </TableRow>
          </TableHeader>
          <TableBody>
            {records.map((record) => (
              <TableRow key={record.id}>
                {columns.map((column) => (
                  <TableCell key={column.label}>
                    {column.render(record)}
                  </TableCell>
                ))}
                {actions && (
                  <TableCell className="text-right">
                    {actions(record)}
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="flex flex-col divide-y xl:hidden">
        {records.map((record) => (
          <article
            key={record.id}
            className="flex flex-col gap-4 py-5 first:pt-0 last:pb-0"
          >
            <h3 className="text-sm font-medium">{title(record)}</h3>
            <dl className="grid grid-cols-2 gap-x-4 gap-y-3">
              {columns.slice(1).map((column) => (
                <div key={column.label} className="min-w-0">
                  <dt className="mb-1 text-xs text-muted-foreground">
                    {column.label}
                  </dt>
                  <dd className="text-sm break-words">
                    {column.render(record)}
                  </dd>
                </div>
              ))}
            </dl>
            {actions && (
              <div className="flex justify-end">{actions(record)}</div>
            )}
          </article>
        ))}
      </div>
    </>
  )
}
