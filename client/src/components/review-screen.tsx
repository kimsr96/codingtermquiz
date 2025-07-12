import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { type Question } from "@shared/schema";
import { type UserAnswer } from "@/pages/quiz";
import { Check, X } from "lucide-react";

interface ReviewScreenProps {
  questions: Question[];
  userAnswers: UserAnswer[];
  onBackToResults: () => void;
}

export default function ReviewScreen({
  questions,
  userAnswers,
  onBackToResults,
}: ReviewScreenProps) {
  const labels = ['A', 'B', 'C'];

  return (
    <Card className="bg-white rounded-2xl shadow-xl p-8">
      <CardContent className="pt-0">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-800">답안 리뷰</h1>
          <Button
            onClick={onBackToResults}
            variant="ghost"
            className="text-brand-blue hover:text-blue-700 font-medium"
          >
            ← 결과로 돌아가기
          </Button>
        </div>

        <div className="space-y-6">
          {questions.map((question, index) => {
            const userAnswer = userAnswers[index];
            const isCorrect = userAnswer?.isCorrect || false;
            
            return (
              <div key={question.id} className="border-l-4 border-brand-blue pl-4 py-2">
                <div className="flex items-center mb-2">
                  <span className="text-sm font-medium text-gray-500 mr-2">
                    Q{index + 1}.
                  </span>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-800">{question.text}</h3>
                  </div>
                  {isCorrect ? (
                    <Check className="w-5 h-5 text-brand-green" />
                  ) : (
                    <X className="w-5 h-5 text-brand-red" />
                  )}
                </div>
                <div className="ml-8 text-sm text-gray-600">
                  <p>
                    <strong>정답:</strong> {labels[question.correctAnswer]}. {question.options[question.correctAnswer]}
                  </p>
                  {userAnswer && (
                    <p>
                      <strong>선택:</strong> {labels[userAnswer.selectedAnswer]}. {question.options[userAnswer.selectedAnswer]}
                    </p>
                  )}
                  <p className="mt-2 text-xs text-gray-500">
                    <strong>설명:</strong> {question.explanation}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
