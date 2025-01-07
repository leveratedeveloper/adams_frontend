"use client";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const keywords = [
  { id: 1, keyword: "mobile bank indonesia", volume: "26,720", rank: 4 },
  { id: 2, keyword: "digital bank", volume: "32,155", rank: 6 },
  { id: 3, keyword: "bank app indonesia", volume: "17,863", rank: 7 },
  { id: 4, keyword: "best online banking", volume: "14,500", rank: 10 },
  { id: 5, keyword: "banking application", volume: "12,230", rank: 12 },
  { id: 6, keyword: "secure banking app", volume: "9,810", rank: 15 },
];

export default function KeywordTable() {
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
        {keywords.map((item) => (
          <TableRow key={item.id} className={item.id >= 4 ? "blur-sm" : ""}>
            <TableCell>{item.id}</TableCell>
            <TableCell>{item.keyword}</TableCell>
            <TableCell>{item.volume}</TableCell>
            <TableCell>{item.rank}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
