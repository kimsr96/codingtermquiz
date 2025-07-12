import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { type Question } from "@shared/schema";
import WelcomeScreen from "@/components/welcome-screen";
import QuizScreen from "@/components/quiz-screen";
import ResultsScreen from "@/components/results-screen";
import ReviewScreen from "@/components/review-screen";

type Screen = "welcome" | "quiz" | "results" | "review";

export interface UserAnswer {
  questionId: number;
  selectedAnswer: number;
  isCorrect: boolean;
}

export default function Quiz() {
  const [currentScreen, setCurrentScreen] = useState<Screen>("welcome");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<UserAnswer[]>([]);
  const [score, setScore] = useState(0);
  const [sessionId, setSessionId] = useState<number | null>(null);

  const { data: questions, isLoading } = useQuery<Question[]>({
    queryKey: ["/api/questions"],
  });

  const startQuiz = async () => {
    setCurrentScreen("quiz");
    setCurrentQuestionIndex(0);
    setUserAnswers([]);
    setScore(0);
    
    try {
      const response = await fetch("/api/quiz/start", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
      const session = await response.json();
      setSessionId(session.id);
    } catch (error) {
      console.error("Failed to start quiz session:", error);
    }
  };

  const submitAnswer = (selectedAnswer: number) => {
    if (!questions) return;
    
    const currentQuestion = questions[currentQuestionIndex];
    const isCorrect = selectedAnswer === currentQuestion.correctAnswer;
    
    const answer: UserAnswer = {
      questionId: currentQuestion.id,
      selectedAnswer,
      isCorrect,
    };
    
    setUserAnswers(prev => [...prev, answer]);
    
    if (isCorrect) {
      setScore(prev => prev + 1);
    }
  };

  const nextQuestion = () => {
    if (currentQuestionIndex < (questions?.length || 0) - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      finishQuiz();
    }
  };

  const finishQuiz = async () => {
    setCurrentScreen("results");
    
    if (sessionId) {
      try {
        await fetch(`/api/quiz/${sessionId}/submit`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            score,
            userAnswers,
          }),
        });
      } catch (error) {
        console.error("Failed to submit quiz results:", error);
      }
    }
  };

  const showReview = () => {
    setCurrentScreen("review");
  };

  const backToResults = () => {
    setCurrentScreen("results");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-blue mx-auto mb-4"></div>
          <p className="text-gray-600">문제를 불러오는 중...</p>
        </div>
      </div>
    );
  }

  if (!questions || questions.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">문제를 불러올 수 없습니다.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        {currentScreen === "welcome" && <WelcomeScreen onStart={startQuiz} />}
        {currentScreen === "quiz" && (
          <QuizScreen
            questions={questions}
            currentQuestionIndex={currentQuestionIndex}
            onSubmitAnswer={submitAnswer}
            onNextQuestion={nextQuestion}
            userAnswers={userAnswers}
          />
        )}
        {currentScreen === "results" && (
          <ResultsScreen
            score={score}
            totalQuestions={questions.length}
            onRestart={startQuiz}
            onShowReview={showReview}
          />
        )}
        {currentScreen === "review" && (
          <ReviewScreen
            questions={questions}
            userAnswers={userAnswers}
            onBackToResults={backToResults}
          />
        )}
      </div>
    </div>
  );
}
