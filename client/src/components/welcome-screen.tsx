import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Lightbulb } from "lucide-react";

interface WelcomeScreenProps {
  onStart: () => void;
}

export default function WelcomeScreen({ onStart }: WelcomeScreenProps) {
  return (
    <Card className="bg-white rounded-2xl shadow-xl p-8 text-center">
      <CardContent className="pt-0">
        <div className="mb-6">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-brand-blue rounded-full mb-4">
            <Lightbulb className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">기초 코딩 용어 테스트</h1>
          <p className="text-gray-600 text-lg">HTML, CSS, JavaScript 기본 개념을 확인해보세요</p>
        </div>
        
        <div className="bg-gray-50 rounded-lg p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">테스트 정보</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="flex items-center justify-center">
              <span className="text-brand-blue font-medium">📝 총 10문제</span>
            </div>
            <div className="flex items-center justify-center">
              <span className="text-brand-green font-medium">⚡ 3지선다</span>
            </div>
            <div className="flex items-center justify-center">
              <span className="text-brand-amber font-medium">🏆 즉시 채점</span>
            </div>
          </div>
        </div>
        
        <Button 
          onClick={onStart}
          className="w-full bg-brand-blue hover:bg-blue-700 text-white font-semibold py-4 px-8 rounded-lg text-lg h-auto"
        >
          테스트 시작하기
        </Button>
      </CardContent>
    </Card>
  );
}
