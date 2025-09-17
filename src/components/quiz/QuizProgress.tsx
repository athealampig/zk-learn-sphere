import { Progress } from "@/components/ui/progress";
import { Card, CardContent } from "@/components/ui/card";
import { Clock, CheckCircle } from "lucide-react";

interface QuizProgressProps {
  currentQuestion: number;
  totalQuestions: number;
  timeRemaining?: number;
  answeredQuestions: number;
}

const QuizProgress = ({
  currentQuestion,
  totalQuestions,
  timeRemaining,
  answeredQuestions
}: QuizProgressProps) => {
  const progressPercentage = ((currentQuestion) / totalQuestions) * 100;
  
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <Card className="glass border-white/20 mb-6">
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-primary" />
            <span className="text-sm font-medium">
              Progress: {currentQuestion} of {totalQuestions}
            </span>
          </div>
          {timeRemaining !== undefined && (
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span className={`text-sm font-mono ${
                timeRemaining < 300 ? 'text-red-400' : 'text-muted-foreground'
              }`}>
                {formatTime(timeRemaining)}
              </span>
            </div>
          )}
        </div>
        
        <div className="space-y-2">
          <Progress value={progressPercentage} className="h-2" />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>{answeredQuestions} answered</span>
            <span>{totalQuestions - answeredQuestions} remaining</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default QuizProgress;