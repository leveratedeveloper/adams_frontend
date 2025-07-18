"use client"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import React from "react";

export default function KeywordTable({ data }: { data: any }) {
  if (!data?.result?.data) {
    if (typeof window !== 'undefined') {
      (window as any).dataLayer = (window as any).dataLayer || [];

      (window as any).dataLayer.push({
        event: "button_check_now",
        input_name: "invalid_url",
        input_class: "invalid_url",
      });
    }
    return (
      <div className="flex flex-col justify-center items-center h-40">
        <p className="mb-4">Oops! No data found at the moment.</p>
      </div>
    );
  }else{
    (window as any).dataLayer.push({
      event: "button_check_now",
      input_name: "valid_url",
      input_class: "valid_url",
    });
  }
  
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
        {data.result.data.slice(0, 3).map((item: any, index: number) => (
          <React.Fragment key={item.position + "-" + index}> {/* Ensure uniqueness */}
            <TableRow className={index == 3 ? "blur-sm" : ""}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{item.keyword}</TableCell>
              <TableCell>{item.region_queries_count.toLocaleString("id-ID")}</TableCell>
              <TableCell>{item.position}</TableCell>
            </TableRow>
            {index >= 2 && (
              <>
                {[...Array(3)].map((_, i) => (
                  <TableRow key={`blurred-${index}-${i}`}> {/* Unique key for each row */}
                    {[...Array(4)].map((_, j) => (
                      <TableCell key={`blurred-cell-${index}-${i}-${j}`} className="blur-sm">
                        <img src="img/blur_background.png" alt="Placeholder" className="w-50 h-5 w-full mx-auto pointer-events-none select-none" />
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </>
            )}
          </React.Fragment>
        ))}
      </TableBody>

    </Table>

  );
}
