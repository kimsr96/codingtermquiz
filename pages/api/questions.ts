import type { NextApiRequest, NextApiResponse } from 'next';

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

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  res.status(200).json(questions);
} 