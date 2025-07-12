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
      <Card className="bg-white rounded-2xl shadow-lg p-8">
        <CardContent className="pt-0">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">답안 리뷰</h1>
              <p className="text-gray-600 mt-2 text-lg">모든 문제와 정답을 확인해보세요</p>
            </div>
            <Button
              onClick={onBackToResults}
              variant="outline"
              className="border-2 border-brand-blue text-brand-blue hover:bg-brand-blue hover:text-white font-bold py-3 px-6 rounded-lg text-lg"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
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
                    <div className="w-12 h-12 rounded-full bg-brand-blue text-white flex items-center justify-center font-bold text-base">
                      {index + 1}
                    </div>
                  </div>
                  
                  {/* Question Content */}
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-6">
                      <h3 className="text-xl font-bold text-gray-800">{question.text}</h3>
                      {isCorrect ? (
                        <Badge className="bg-brand-green text-white px-4 py-2 text-base font-bold">
                          <CheckCircle className="w-5 h-5 mr-2" />
                          정답
                        </Badge>
                      ) : (
                        <Badge className="bg-brand-red text-white px-4 py-2 text-base font-bold">
                          <XCircle className="w-5 h-5 mr-2" />
                          오답
                        </Badge>
                      )}
                    </div>

                    {/* Answer Options */}
                    <div className="space-y-3 mb-6">
                      {question.options.map((option, optionIndex) => (
                        <div
                          key={optionIndex}
                          className={`p-4 rounded-lg border-2 flex items-center ${
                            optionIndex === question.correctAnswer
                              ? 'border-brand-green bg-green-50'
                              : userAnswer && optionIndex === userAnswer.selectedAnswer && !isCorrect
                              ? 'border-brand-red bg-red-50'
                              : 'border-gray-200 bg-gray-50'
                          }`}
                        >
                          <span className={`w-8 h-8 rounded-full flex items-center justify-center text-base font-bold mr-4 ${
                            optionIndex === question.correctAnswer
                              ? 'bg-brand-green text-white'
                              : userAnswer && optionIndex === userAnswer.selectedAnswer && !isCorrect
                              ? 'bg-brand-red text-white'
                              : 'bg-gray-300 text-gray-600'
                          }`}>
                            {labels[optionIndex]}
                          </span>
                          <span className="text-gray-800 text-base font-medium">{option}</span>
                          {optionIndex === question.correctAnswer && (
                            <CheckCircle className="w-5 h-5 text-brand-green ml-auto" />
                          )}
                          {userAnswer && optionIndex === userAnswer.selectedAnswer && !isCorrect && (
                            <XCircle className="w-5 h-5 text-brand-red ml-auto" />
                          )}
                        </div>
                      ))}
                    </div>

                    {/* Explanation */}
                    <div className="bg-blue-50 rounded-lg p-6 border-l-4 border-brand-blue">
                      <h4 className="font-bold text-gray-700 mb-3 flex items-center text-lg">
                        💡 설명
                      </h4>
                      <p className="text-gray-600 text-base leading-relaxed">
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
