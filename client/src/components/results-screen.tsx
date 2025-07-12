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
        bgColor: "bg-brand-green bg-opacity-20",
        textColor: "text-brand-green",
        borderColor: "border-brand-green",
      };
    } else if (percentage >= 70) {
      return {
        title: "훌륭합니다! 🎉",
        message: "기초 코딩 용어를 잘 알고 계시네요!",
        bgColor: "bg-brand-green bg-opacity-20",
        textColor: "text-brand-green",
        borderColor: "border-brand-green",
      };
    } else if (percentage >= 50) {
      return {
        title: "좋습니다! 📚",
        message: "조금 더 학습하면 더 좋은 결과를 얻을 수 있을 것 같아요!",
        bgColor: "bg-brand-amber bg-opacity-20",
        textColor: "text-brand-amber",
        borderColor: "border-brand-amber",
      };
    } else {
      return {
        title: "다시 도전해보세요! 💪",
        message: "기초 개념을 더 학습한 후 다시 도전해보세요!",
        bgColor: "bg-brand-red bg-opacity-20",
        textColor: "text-brand-red",
        borderColor: "border-brand-red",
      };
    }
  };

  const scoreMessage = getScoreMessage();

  return (
    <Card className="bg-white rounded-2xl shadow-xl p-8 text-center">
      <CardContent className="pt-0">
        <div className="mb-8">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-brand-green rounded-full mb-6">
            <CheckCircle2 className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-3">테스트 완료!</h1>
          <p className="text-gray-600 text-xl">수고하셨습니다</p>
        </div>

        <div className="bg-gradient-to-r from-brand-blue to-blue-600 rounded-2xl p-8 mb-8 text-white shadow-lg">
          <h2 className="text-2xl font-bold mb-4">최종 점수</h2>
          <div className="text-6xl font-bold mb-3">
            <span>{score}</span>
            <span className="text-4xl">/{totalQuestions}</span>
          </div>
          <div className="text-blue-100 text-xl font-semibold">
            {percentage}% 정답
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-brand-green bg-opacity-20 rounded-xl p-6 border-2 border-brand-green">
            <div className="text-3xl font-bold text-brand-green mb-2">{score}</div>
            <div className="text-base font-semibold text-gray-700">정답</div>
          </div>
          <div className="bg-brand-red bg-opacity-20 rounded-xl p-6 border-2 border-brand-red">
            <div className="text-3xl font-bold text-brand-red mb-2">{incorrectCount}</div>
            <div className="text-base font-semibold text-gray-700">오답</div>
          </div>
        </div>

        <div className={`mb-8 p-8 rounded-xl border-2 ${scoreMessage.bgColor} ${scoreMessage.borderColor}`}>
          <div className={scoreMessage.textColor}>
            <h3 className="text-2xl font-bold mb-3">{scoreMessage.title}</h3>
            <p className="text-lg font-medium">{scoreMessage.message}</p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <Button 
            onClick={onRestart}
            className="flex-1 bg-brand-blue hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-lg text-lg h-auto"
          >
            다시 도전하기
          </Button>
          <Button 
            onClick={onShowReview}
            variant="outline"
            className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold py-4 px-8 rounded-lg border-2 border-gray-300 text-lg h-auto"
          >
            답안 리뷰
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
