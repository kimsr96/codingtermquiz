import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { type Question } from "@shared/schema";
import { type UserAnswer } from "@/pages/quiz";
import { CheckCircle, XCircle, ArrowLeft } from "lucide-react";

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
    <div className="space-y-6">
      {/* Header */}
      <Card className="bg-white rounded-2xl shadow-lg p-6">
        <CardContent className="pt-0">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">답안 리뷰</h1>
              <p className="text-gray-600 mt-1">모든 문제와 정답을 확인해보세요</p>
            </div>
            <Button
              onClick={onBackToResults}
              variant="outline"
              className="border-brand-blue text-brand-blue hover:bg-brand-blue hover:text-white"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              결과로 돌아가기
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Questions */}
      <div className="space-y-4">
        {questions.map((question, index) => {
          const userAnswer = userAnswers[index];
          const isCorrect = userAnswer?.isCorrect || false;
          
          return (
            <Card key={question.id} className="bg-white rounded-2xl shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  {/* Question Number and Status */}
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 rounded-full bg-brand-blue text-white flex items-center justify-center font-bold text-sm">
                      {index + 1}
                    </div>
                  </div>
                  
                  {/* Question Content */}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-4">
                      <h3 className="text-lg font-semibold text-gray-800">{question.text}</h3>
                      {isCorrect ? (
                        <Badge className="bg-brand-green text-white">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          정답
                        </Badge>
                      ) : (
                        <Badge className="bg-brand-red text-white">
                          <XCircle className="w-3 h-3 mr-1" />
                          오답
                        </Badge>
                      )}
                    </div>

                    {/* Answer Options */}
                    <div className="space-y-2 mb-4">
                      {question.options.map((option, optionIndex) => (
                        <div
                          key={optionIndex}
                          className={`p-3 rounded-lg border-2 flex items-center ${
                            optionIndex === question.correctAnswer
                              ? 'border-brand-green bg-green-50'
                              : userAnswer && optionIndex === userAnswer.selectedAnswer && !isCorrect
                              ? 'border-brand-red bg-red-50'
                              : 'border-gray-200 bg-gray-50'
                          }`}
                        >
                          <span className={`w-6 h-6 rounded-full flex items-center justify-center text-sm font-medium mr-3 ${
                            optionIndex === question.correctAnswer
                              ? 'bg-brand-green text-white'
                              : userAnswer && optionIndex === userAnswer.selectedAnswer && !isCorrect
                              ? 'bg-brand-red text-white'
                              : 'bg-gray-300 text-gray-600'
                          }`}>
                            {labels[optionIndex]}
                          </span>
                          <span className="text-gray-800">{option}</span>
                          {optionIndex === question.correctAnswer && (
                            <CheckCircle className="w-4 h-4 text-brand-green ml-auto" />
                          )}
                          {userAnswer && optionIndex === userAnswer.selectedAnswer && !isCorrect && (
                            <XCircle className="w-4 h-4 text-brand-red ml-auto" />
                          )}
                        </div>
                      ))}
                    </div>

                    {/* Explanation */}
                    <div className="bg-blue-50 rounded-lg p-4 border-l-4 border-brand-blue">
                      <h4 className="font-semibold text-gray-700 mb-2 flex items-center">
                        💡 설명
                      </h4>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        {question.explanation}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
