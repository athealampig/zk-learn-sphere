import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Clock, AlertTriangle } from "lucide-react";

interface QuizTimerProps {
  duration: number; // in seconds
  onTimeUp: () => void;
  isPaused?: boolean;
}

const QuizTimer = ({ duration, onTimeUp, isPaused = false }: QuizTimerProps) => {
  const [timeRemaining, setTimeRemaining] = useState(duration);

  useEffect(() => {
    if (isPaused || timeRemaining <= 0) return;

    const interval = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          onTimeUp();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [timeRemaining, isPaused, onTimeUp]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const progressPercentage = (timeRemaining / duration) * 100;
  const isWarning = timeRemaining < 300; // 5 minutes
  const isCritical = timeRemaining < 60; // 1 minute

  return (
    <Card className={`glass border-white/20 ${
      isCritical ? 'border-red-500/50 bg-red-500/5' : 
      isWarning ? 'border-yellow-500/50 bg-yellow-500/5' : ''
    }`}>
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {isCritical ? (
              <AlertTriangle className="h-5 w-5 text-red-400" />
            ) : (
              <Clock className="h-5 w-5 text-muted-foreground" />
            )}
            <span className="text-sm font-medium">Time Remaining</span>
          </div>
          <div className={`text-xl font-mono font-bold ${
            isCritical ? 'text-red-400' :
            isWarning ? 'text-yellow-400' : 'text-foreground'
          }`}>
            {formatTime(timeRemaining)}
          </div>
        </div>
        
        <div className="mt-3">
          <div className="w-full bg-muted/30 rounded-full h-2">
            <div
              className={`h-2 rounded-full transition-all duration-1000 ${
                isCritical ? 'bg-red-500' :
                isWarning ? 'bg-yellow-500' : 'bg-primary'
              }`}
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>
        
        {isCritical && (
          <p className="mt-2 text-xs text-red-400 text-center animate-pulse">
            Time running out!
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export default QuizTimer;