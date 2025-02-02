"use client"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import React from "react";

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
          <React.Fragment key={item.position}>
            <TableRow className={index == 3 ? "blur-sm" : ""}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{item.keyword}</TableCell>
              <TableCell>{item.region_queries_count}</TableCell>
              <TableCell>{item.position}</TableCell>
            </TableRow>
            {index >= 2 && (
              <><TableRow>
                <TableCell className="blur-sm">
                  <img src="img/blur_background.png" alt="Placeholder" className="w-20 h-5 mx-auto pointer-events-none select-none" />
                </TableCell>
                <TableCell className="blur-sm"> <img src="img/blur_background.png" alt="Placeholder" className="w-50 h-5 w-full mx-auto pointer-events-none select-none" /></TableCell>
                <TableCell className="blur-sm"> <img src="img/blur_background.png" alt="Placeholder" className="w-50 h-5 w-full mx-auto pointer-events-none select-none"/></TableCell>
                <TableCell className="blur-sm"> <img src="img/blur_background.png" alt="Placeholder"  className="w-50 h-5 w-full mx-auto pointer-events-none select-none" /></TableCell>
              </TableRow><TableRow>
                  <TableCell className="blur-sm">
                    <img src="img/blur_background.png" alt="Placeholder" className="w-20 h-5 mx-auto pointer-events-none select-none" />
                  </TableCell>
                  <TableCell className="blur-sm"> <img src="img/blur_background.png" alt="Placeholder"  className="w-50 h-5 w-full mx-auto pointer-events-none select-none" /></TableCell>
                  <TableCell className="blur-sm"> <img src="img/blur_background.png" alt="Placeholder"  className="w-50 h-5 w-full mx-auto pointer-events-none select-none" /></TableCell>
                  <TableCell className="blur-sm"> <img src="img/blur_background.png" alt="Placeholder"  className="w-50 h-5 w-full mx-auto pointer-events-none select-none" /></TableCell>
                </TableRow><TableRow>
                  <TableCell className="blur-sm">
                    <img src="img/blur_background.png" alt="Placeholder" className="w-20 h-5 mx-auto pointer-events-none select-none" />
                  </TableCell>
                  <TableCell className="blur-sm"> <img src="img/blur_background.png" alt="Placeholder"  className="w-50 h-5 w-full mx-auto pointer-events-none select-none" /></TableCell>
                  <TableCell className="blur-sm"> <img src="img/blur_background.png" alt="Placeholder"  className="w-50 h-5 w-full mx-auto pointer-events-none select-none" /></TableCell>
                  <TableCell className="blur-sm"> <img src="img/blur_background.png" alt="Placeholder"  className="w-50 h-5 w-full mx-auto pointer-events-none select-none" /></TableCell>
                </TableRow></>
            )}
          </React.Fragment>
        ))}
      </TableBody>
    </Table>

  );
}
