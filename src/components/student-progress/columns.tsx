"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Student } from "@/lib/types"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowUpDown } from "lucide-react"

export const columns: ColumnDef<Student>[] = [
  {
    accessorKey: "name",
    header: "Student",
    cell: ({ row }) => {
      const student = row.original
      const initials = student.name.split(' ').map(n => n[0]).join('');
      return (
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarImage src={`https://placehold.co/40x40.png?text=${initials}`} alt={student.name} data-ai-hint="avatar person" />
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
          <span className="font-medium">{student.name}</span>
        </div>
      )
    },
  },
  {
    accessorKey: "grade",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Grade
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => <div className="text-center">{row.getValue("grade")}%</div>,
  },
  {
    accessorKey: "engagement",
    header: "Engagement",
    cell: ({ row }) => {
        const engagement = row.getValue("engagement") as string
        const variant = {
            High: 'default',
            Medium: 'secondary',
            Low: 'destructive',
        }[engagement] as "default" | "secondary" | "destructive" | "outline" | null | undefined
      return <Badge variant={variant}>{engagement}</Badge>
    },
  },
  {
    accessorKey: "lastActivity",
    header: "Last Activity",
  },
]
