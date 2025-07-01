import { timetable } from "@/data/mock-data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { cn } from "@/lib/utils";

export function TimetableDisplay() {

  const getCellClass = (subject: string) => {
    if (subject.toLowerCase() === 'lunch') {
        return "bg-accent/30 text-accent-foreground font-semibold";
    }
    if (subject.toLowerCase() === 'free') {
        return "text-muted-foreground";
    }
    return "";
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Class Timetable: Grade 10</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[150px]">Time</TableHead>
              <TableHead>Monday</TableHead>
              <TableHead>Tuesday</TableHead>
              <TableHead>Wednesday</TableHead>
              <TableHead>Thursday</TableHead>
              <TableHead>Friday</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {timetable.map((row) => (
              <TableRow key={row.time}>
                <TableCell className="font-medium">{row.time}</TableCell>
                <TableCell className={cn(getCellClass(row.monday))}>{row.monday}</TableCell>
                <TableCell className={cn(getCellClass(row.tuesday))}>{row.tuesday}</TableCell>
                <TableCell className={cn(getCellClass(row.wednesday))}>{row.wednesday}</TableCell>
                <TableCell className={cn(getCellClass(row.thursday))}>{row.thursday}</TableCell>
                <TableCell className={cn(getCellClass(row.friday))}>{row.friday}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
