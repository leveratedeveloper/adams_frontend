"use client"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default function KeywordTable({ data }: { data: any }) {
  if (!data?.result?.data) {
    return <p className="text-center">Loading...</p>;
  }

  console.log("ini data table", data.result.data);

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">No.</TableHead>
          <TableHead>Keyword</TableHead>
          <TableHead>Monthly search volume</TableHead>
          <TableHead>Current rank</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.result.data.slice(0, 6).map((item: any, index: number) => (
          <TableRow key={item.position} className={index >= 3 ? "blur-sm" : ""}>
            <TableCell>{index + 1}</TableCell>
            <TableCell>{item.keyword}</TableCell>
            <TableCell>{item.region_queries_count}</TableCell>
            <TableCell>{item.position}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
