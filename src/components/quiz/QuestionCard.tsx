import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Question } from "@/types/quiz";
import { CheckCircle, Circle } from "lucide-react";

interface QuestionCardProps {
  question: Question;
  questionNumber: number;
  totalQuestions: number;
  selectedAnswer: number | null;
  onAnswerSelect: (answerIndex: number) => void;
  showResult?: boolean;
  isCorrect?: boolean;
}

const QuestionCard = ({
  question,
  questionNumber,
  totalQuestions,
  selectedAnswer,
  onAnswerSelect,
  showResult = false,
  isCorrect
}: QuestionCardProps) => {
  return (
    <Card className="glass border-white/20">
      <CardHeader>
        <div className="flex items-center justify-between">
          <Badge variant="outline" className="text-primary border-primary/30">
            Question {questionNumber} of {totalQuestions}
          </Badge>
          <Badge variant="secondary" className="bg-primary/10 text-primary">
            {question.category}
          </Badge>
        </div>
        <CardTitle className="text-xl leading-relaxed">
          {question.question}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {question.options.map((option, index) => {
          const isSelected = selectedAnswer === index;
          const isCorrectAnswer = index === question.correctAnswer;
          
          let buttonVariant: "outline" | "default" | "destructive" | "secondary" = "outline";
          let className = "";
          
          if (showResult) {
            if (isCorrectAnswer) {
              buttonVariant = "default";
              className = "bg-green-500/20 border-green-500/50 text-green-400 hover:bg-green-500/30";
            } else if (isSelected && !isCorrectAnswer) {
              buttonVariant = "destructive";
              className = "bg-red-500/20 border-red-500/50 text-red-400 hover:bg-red-500/30";
            }
          } else if (isSelected) {
            buttonVariant = "default";
            className = "bg-primary/20 border-primary text-primary";
          }

          return (
            <Button
              key={index}
              variant={buttonVariant}
              className={`w-full justify-start text-left h-auto p-4 whitespace-normal ${className}`}
              onClick={() => !showResult && onAnswerSelect(index)}
              disabled={showResult}
            >
              <div className="flex items-start gap-3 w-full">
                <div className="flex-shrink-0 mt-0.5">
                  {showResult ? (
                    isCorrectAnswer ? (
                      <CheckCircle className="h-5 w-5 text-green-400" />
                    ) : isSelected ? (
                      <Circle className="h-5 w-5 text-red-400" />
                    ) : (
                      <Circle className="h-5 w-5 text-muted-foreground" />
                    )
                  ) : (
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      isSelected ? 'border-primary bg-primary' : 'border-muted-foreground'
                    }`}>
                      {isSelected && <div className="w-2 h-2 bg-white rounded-full" />}
                    </div>
                  )}
                </div>
                <span className="flex-1">{option}</span>
              </div>
            </Button>
          );
        })}
        
        {showResult && question.explanation && (
          <div className="mt-6 p-4 rounded-lg bg-muted/50 border border-white/10">
            <h4 className="font-semibold text-primary mb-2">Explanation:</h4>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {question.explanation}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default QuestionCard;