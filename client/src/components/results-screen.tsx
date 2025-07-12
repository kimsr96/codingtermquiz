import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";

interface ResultsScreenProps {
  score: number;
  totalQuestions: number;
  onRestart: () => void;
  onShowReview: () => void;
}

export default function ResultsScreen({
  score,
  totalQuestions,
  onRestart,
  onShowReview,
}: ResultsScreenProps) {
  const percentage = Math.round((score / totalQuestions) * 100);
  const incorrectCount = totalQuestions - score;

  const getScoreMessage = () => {
    if (percentage >= 90) {
      return {
        title: "완벽합니다! 🏆",
        message: "기초 코딩 용어를 완벽하게 알고 계시네요!",
        bgColor: "bg-brand-green bg-opacity-10",
        textColor: "text-brand-green",
      };
    } else if (percentage >= 70) {
      return {
        title: "훌륭합니다! 🎉",
        message: "기초 코딩 용어를 잘 알고 계시네요!",
        bgColor: "bg-brand-green bg-opacity-10",
        textColor: "text-brand-green",
      };
    } else if (percentage >= 50) {
      return {
        title: "좋습니다! 📚",
        message: "조금 더 학습하면 더 좋은 결과를 얻을 수 있을 것 같아요!",
        bgColor: "bg-brand-amber bg-opacity-10",
        textColor: "text-brand-amber",
      };
    } else {
      return {
        title: "다시 도전해보세요! 💪",
        message: "기초 개념을 더 학습한 후 다시 도전해보세요!",
        bgColor: "bg-brand-red bg-opacity-10",
        textColor: "text-brand-red",
      };
    }
  };

  const scoreMessage = getScoreMessage();

  return (
    <Card className="bg-white rounded-2xl shadow-xl p-8 text-center">
      <CardContent className="pt-0">
        <div className="mb-6">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-brand-green rounded-full mb-4">
            <CheckCircle2 className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">테스트 완료!</h1>
          <p className="text-gray-600 text-lg">수고하셨습니다</p>
        </div>

        <div className="bg-gradient-to-r from-brand-blue to-blue-600 rounded-2xl p-6 mb-6 text-white">
          <h2 className="text-xl font-semibold mb-2">최종 점수</h2>
          <div className="text-5xl font-bold mb-2">
            <span>{score}</span>
            <span className="text-3xl">/{totalQuestions}</span>
          </div>
          <div className="text-blue-100">
            {percentage}% 정답
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="bg-brand-green bg-opacity-10 rounded-lg p-4">
            <div className="text-2xl font-bold text-brand-green mb-1">{score}</div>
            <div className="text-sm text-gray-600">정답</div>
          </div>
          <div className="bg-brand-red bg-opacity-10 rounded-lg p-4">
            <div className="text-2xl font-bold text-brand-red mb-1">{incorrectCount}</div>
            <div className="text-sm text-gray-600">오답</div>
          </div>
        </div>

        <div className={`mb-6 p-6 rounded-lg ${scoreMessage.bgColor}`}>
          <div className={scoreMessage.textColor}>
            <h3 className="text-xl font-bold mb-2">{scoreMessage.title}</h3>
            <p className="text-base">{scoreMessage.message}</p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <Button 
            onClick={onRestart}
            className="flex-1 bg-brand-blue hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg"
          >
            다시 도전하기
          </Button>
          <Button 
            onClick={onShowReview}
            variant="outline"
            className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 px-6 rounded-lg border-gray-300"
          >
            답안 리뷰
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
