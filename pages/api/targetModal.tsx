"use client";
import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

const TargetPage = () => {
  const searchParams = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const isOpenParam = searchParams?.get("isOpen");
    setIsOpen(isOpenParam === "true"); // Convert string to boolean
  }, [searchParams]);

  return <div>{isOpen ? "Open" : "Closed"}</div>;
};

export default TargetPage;