import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { type Question } from "@shared/schema";
import { type UserAnswer } from "@/pages/quiz";
import { CheckCircle, XCircle } from "lucide-react";

interface QuizScreenProps {
  questions: Question[];
  currentQuestionIndex: number;
  onSubmitAnswer: (selectedAnswer: number) => void;
  onNextQuestion: () => void;
  userAnswers: UserAnswer[];
}

export default function QuizScreen({
  questions,
  currentQuestionIndex,
  onSubmitAnswer,
  onNextQuestion,
  userAnswers,
}: QuizScreenProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  
  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
  const isLastQuestion = currentQuestionIndex === questions.length - 1;
  
  const handleAnswerSelect = (answerIndex: number) => {
    if (showFeedback) return;
    
    setSelectedAnswer(answerIndex);
    onSubmitAnswer(answerIndex);
    setShowFeedback(true);
  };

  const handleNextQuestion = () => {
    setSelectedAnswer(null);
    setShowFeedback(false);
    onNextQuestion();
  };

  const isCorrect = selectedAnswer === currentQuestion.correctAnswer;
  const labels = ['A', 'B', 'C'];

  return (
    <div>
      {/* Progress Bar */}
      <Card className="bg-white rounded-2xl shadow-lg p-6 mb-6">
        <CardContent className="pt-0">
          <div className="flex justify-between items-center mb-3">
            <span className="text-sm font-medium text-gray-600">진행상황</span>
            <span className="text-sm font-medium text-brand-blue">
              {currentQuestionIndex + 1}/10
            </span>
          </div>
          <Progress value={progress} className="h-2" />
        </CardContent>
      </Card>

      {/* Question Card */}
      <Card className="bg-white rounded-2xl shadow-xl p-8 mb-6">
        <CardContent className="pt-0">
          <div className="mb-6">
            <span className="inline-block bg-brand-blue text-white text-sm font-medium px-3 py-1 rounded-full mb-4">
              Question {currentQuestionIndex + 1}
            </span>
            <h2 className="text-xl font-semibold text-gray-800 leading-relaxed mb-6">
              {currentQuestion.text}
            </h2>
          </div>

          {/* Answer Options */}
          <div className="space-y-4">
            {currentQuestion.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerSelect(index)}
                disabled={showFeedback}
                className={`w-full text-left p-4 rounded-lg border-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-brand-blue focus:ring-opacity-50 ${
                  showFeedback
                    ? index === currentQuestion.correctAnswer
                      ? 'border-brand-green bg-green-50'
                      : index === selectedAnswer && selectedAnswer !== currentQuestion.correctAnswer
                      ? 'border-brand-red bg-red-50'
                      : 'border-gray-200 bg-gray-50'
                    : 'border-transparent bg-gray-50 hover:bg-gray-100 hover:border-brand-blue'
                }`}
              >
                <div className="flex items-center">
                  <span className={`flex-shrink-0 w-8 h-8 border-2 rounded-full flex items-center justify-center font-medium mr-4 ${
                    showFeedback
                      ? index === currentQuestion.correctAnswer
                        ? 'bg-brand-green border-brand-green text-white'
                        : index === selectedAnswer && selectedAnswer !== currentQuestion.correctAnswer
                        ? 'bg-brand-red border-brand-red text-white'
                        : 'bg-white border-gray-300 text-gray-600'
                      : 'bg-white border-gray-300 text-gray-600'
                  }`}>
                    {labels[index]}
                  </span>
                  <span className="text-gray-700">{option}</span>
                </div>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Feedback Section */}
      {showFeedback && (
        <Card className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <CardContent className="pt-0">
            <div className="mb-4">
              {isCorrect ? (
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-brand-green rounded-full flex items-center justify-center mr-3">
                    <CheckCircle className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-brand-green">정답입니다! 🎉</h3>
                    <p className="text-gray-700 text-base">잘 알고 계시네요.</p>
                  </div>
                </div>
              ) : (
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-brand-red rounded-full flex items-center justify-center mr-3">
                    <XCircle className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-brand-red">틀렸습니다</h3>
                    <p className="text-gray-700 text-base">
                      정답: <span className="font-semibold text-brand-green">
                        {labels[currentQuestion.correctAnswer]}. {currentQuestion.options[currentQuestion.correctAnswer]}
                      </span>
                    </p>
                  </div>
                </div>
              )}
            </div>

            <div className="bg-blue-50 rounded-lg p-4 mb-4">
              <h4 className="font-semibold text-gray-700 mb-2">💡 설명</h4>
              <p className="text-gray-600 text-sm leading-relaxed">
                {currentQuestion.explanation}
              </p>
            </div>

            <Button 
              onClick={handleNextQuestion}
              className="w-full bg-brand-blue hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg"
            >
              {isLastQuestion ? "결과 보기" : "다음 문제"}
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
