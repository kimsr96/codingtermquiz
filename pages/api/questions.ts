export const runtime = 'edge';

const questions = [
  {
    id: 1,
    question: "HTML의 역할은?",
    options: ["구조", "스타일", "동작"],
    correctAnswer: 0,
  },
  {
    id: 2,
    question: "CSS의 역할은?",
    options: ["구조", "스타일", "동작"],
    correctAnswer: 1,
  },
  {
    id: 3,
    question: "JavaScript의 역할은?",
    options: ["구조", "스타일", "동작"],
    correctAnswer: 2,
  },
];

export default function handler(req: Request) {
  return new Response(JSON.stringify(questions), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
} 