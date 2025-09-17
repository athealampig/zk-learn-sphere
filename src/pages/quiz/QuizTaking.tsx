import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import QuestionCard from "@/components/quiz/QuestionCard";
import QuizProgress from "@/components/quiz/QuizProgress";
import QuizTimer from "@/components/quiz/QuizTimer";
import QuizNavigation from "@/components/quiz/QuizNavigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { mockQuizzes, mockQuestions } from "@/lib/mockData";
import { QuizSession } from "@/types/quiz";
import { ArrowLeft, Save } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const QuizTaking = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();

  // Mock quiz data - in real app this would come from API
  const quiz = mockQuizzes.find(q => q.id === id);
  const questions = mockQuestions; // In real app, fetch questions for this quiz

  const [session, setSession] = useState<QuizSession>({
    quizId: id || '',
    currentQuestionIndex: 0,
    answers: Array(questions.length).fill(null),
    startTime: new Date().toISOString(),
    timeRemaining: quiz?.duration ? quiz.duration * 60 : undefined
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Auto-save progress every 30 seconds
    const interval = setInterval(() => {
      saveProgress();
    }, 30000);

    return () => clearInterval(interval);
  }, [session]);

  if (!quiz) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <Card className="glass border-white/20 max-w-md mx-auto text-center">
            <CardContent className="p-8">
              <h2 className="text-xl font-semibold mb-4">Quiz Not Found</h2>
              <p className="text-muted-foreground mb-6">
                The quiz you're looking for doesn't exist or has been removed.
              </p>
              <Button onClick={() => navigate('/quizzes')}>
                Back to Quizzes
              </Button>
            </CardContent>
          </Card>
        </div>
      </Layout>
    );
  }

  const currentQuestion = questions[session.currentQuestionIndex];
  const answeredCount = session.answers.filter(answer => answer !== null).length;

  const handleAnswerSelect = (answerIndex: number) => {
    setSession(prev => ({
      ...prev,
      answers: prev.answers.map((answer, index) => 
        index === prev.currentQuestionIndex ? answerIndex : answer
      )
    }));
  };

  const handleQuestionSelect = (questionIndex: number) => {
    setSession(prev => ({ ...prev, currentQuestionIndex: questionIndex }));
  };

  const handlePrevious = () => {
    if (session.currentQuestionIndex > 0) {
      setSession(prev => ({ ...prev, currentQuestionIndex: prev.currentQuestionIndex - 1 }));
    }
  };

  const handleNext = () => {
    if (session.currentQuestionIndex < questions.length - 1) {
      setSession(prev => ({ ...prev, currentQuestionIndex: prev.currentQuestionIndex + 1 }));
    }
  };

  const saveProgress = () => {
    // Mock save progress - in real app this would call an API
    toast({
      title: "Progress Saved",
      description: "Your quiz progress has been automatically saved.",
    });
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    // Mock submission - in real app this would call an API
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Calculate score
    let correctAnswers = 0;
    session.answers.forEach((answer, index) => {
      if (answer === questions[index]?.correctAnswer) {
        correctAnswers++;
      }
    });
    
    const score = Math.round((correctAnswers / questions.length) * 100);
    
    // Navigate to results with score data
    navigate(`/quiz/${id}/results?score=${score}&correct=${correctAnswers}`);
  };

  const handleTimeUp = () => {
    toast({
      title: "Time's Up!",
      description: "The quiz time has expired. Your answers will be submitted automatically.",
      variant: "destructive"
    });
    handleSubmit();
  };

  const canGoNext = session.currentQuestionIndex < questions.length - 1;
  const canGoPrevious = session.currentQuestionIndex > 0;
  const showSubmit = session.currentQuestionIndex === questions.length - 1;

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/quizzes')}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Quizzes
            </Button>
            <div>
              <h1 className="text-2xl font-bold gradient-text">{quiz.title}</h1>
              <div className="flex items-center gap-2 mt-1">
                <Badge variant="outline" className="text-xs">
                  {quiz.category}
                </Badge>
                <Badge variant="secondary" className="text-xs">
                  {quiz.difficulty}
                </Badge>
              </div>
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={saveProgress}
            className="flex items-center gap-2"
          >
            <Save className="h-4 w-4" />
            Save Progress
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Progress and Timer */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <QuizProgress
                currentQuestion={session.currentQuestionIndex + 1}
                totalQuestions={questions.length}
                answeredQuestions={answeredCount}
              />
              {session.timeRemaining !== undefined && (
                <QuizTimer
                  duration={quiz.duration * 60}
                  onTimeUp={handleTimeUp}
                />
              )}
            </div>

            {/* Question */}
            <QuestionCard
              question={currentQuestion}
              questionNumber={session.currentQuestionIndex + 1}
              totalQuestions={questions.length}
              selectedAnswer={session.answers[session.currentQuestionIndex]}
              onAnswerSelect={handleAnswerSelect}
            />
          </div>

          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <QuizNavigation
              currentQuestion={session.currentQuestionIndex}
              totalQuestions={questions.length}
              answers={session.answers}
              onQuestionSelect={handleQuestionSelect}
              onPrevious={handlePrevious}
              onNext={handleNext}
              onSubmit={handleSubmit}
              canGoNext={canGoNext}
              canGoPrevious={canGoPrevious}
              showSubmit={showSubmit}
            />
          </div>
        </div>

        {/* Submit Loading Overlay */}
        {isSubmitting && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
            <Card className="glass border-white/20 max-w-sm w-full mx-4">
              <CardContent className="p-6 text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Submitting Quiz...</h3>
                <p className="text-muted-foreground text-sm">
                  Please wait while we process your answers.
                </p>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default QuizTaking;