import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, ArrowRight, Flag } from "lucide-react";

interface QuizNavigationProps {
  currentQuestion: number;
  totalQuestions: number;
  answers: (number | null)[];
  onQuestionSelect: (questionIndex: number) => void;
  onPrevious: () => void;
  onNext: () => void;
  onSubmit: () => void;
  canGoNext: boolean;
  canGoPrevious: boolean;
  showSubmit: boolean;
}

const QuizNavigation = ({
  currentQuestion,
  totalQuestions,
  answers,
  onQuestionSelect,
  onPrevious,
  onNext,
  onSubmit,
  canGoNext,
  canGoPrevious,
  showSubmit
}: QuizNavigationProps) => {
  const answeredCount = answers.filter(answer => answer !== null).length;
  const allAnswered = answeredCount === totalQuestions;

  return (
    <div className="space-y-4">
      {/* Question Grid */}
      <Card className="glass border-white/20">
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold">Question Navigation</h3>
            <Badge variant="outline" className="text-xs">
              {answeredCount}/{totalQuestions} answered
            </Badge>
          </div>
          <div className="grid grid-cols-5 gap-2">
            {Array.from({ length: totalQuestions }, (_, index) => {
              const isAnswered = answers[index] !== null;
              const isCurrent = index === currentQuestion;
              
              return (
                <Button
                  key={index}
                  variant={isCurrent ? "default" : isAnswered ? "secondary" : "outline"}
                  size="sm"
                  className={`h-8 w-8 p-0 text-xs ${
                    isCurrent ? 'bg-primary text-white' :
                    isAnswered ? 'bg-green-500/20 text-green-400 border-green-500/50' :
                    'border-white/20'
                  }`}
                  onClick={() => onQuestionSelect(index)}
                >
                  {index + 1}
                </Button>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Navigation Buttons */}
      <div className="flex justify-between items-center gap-4">
        <Button
          variant="outline"
          onClick={onPrevious}
          disabled={!canGoPrevious}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Previous
        </Button>

        <div className="text-sm text-muted-foreground text-center">
          Question {currentQuestion + 1} of {totalQuestions}
        </div>

        {showSubmit ? (
          <Button
            onClick={onSubmit}
            className="flex items-center gap-2 bg-gradient-to-r from-primary to-secondary"
            disabled={!allAnswered}
          >
            <Flag className="h-4 w-4" />
            Submit Quiz
          </Button>
        ) : (
          <Button
            onClick={onNext}
            disabled={!canGoNext}
            className="flex items-center gap-2"
          >
            Next
            <ArrowRight className="h-4 w-4" />
          </Button>
        )}
      </div>
      
      {!allAnswered && showSubmit && (
        <p className="text-xs text-yellow-400 text-center">
          Please answer all questions before submitting
        </p>
      )}
    </div>
  );
};

export default QuizNavigation;