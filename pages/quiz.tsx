import dynamic from "next/dynamic";
import React from "react";

const Quiz = dynamic(() => import("../client/src/pages/quiz"), { ssr: false });

export default function QuizPage() {
  return <Quiz />;
} 