import React from "react";
import dynamic from "next/dynamic";

const App = dynamic(() => import("../client/src/App"), { ssr: false });

export default function Home() {
  return <App />;
} 