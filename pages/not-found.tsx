import dynamic from "next/dynamic";
import React from "react";

const NotFound = dynamic(() => import("../client/src/pages/not-found"), { ssr: false });

export default function NotFoundPage() {
  return <NotFound />;
} 