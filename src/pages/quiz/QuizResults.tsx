import { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import QuestionCard from "@/components/quiz/QuestionCard";
import { mockQuizzes, mockQuestions } from "@/lib/mockData";
import { Trophy, Star, ArrowLeft, RotateCcw, Share2, Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const QuizResults = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { toast } = useToast();

  const score = parseInt(searchParams.get('score') || '0');
  const correctAnswers = parseInt(searchParams.get('correct') || '0');

  // Mock data - in real app this would come from API
  const quiz = mockQuizzes.find(q => q.id === id);
  const questions = mockQuestions;
  const userAnswers = [1, 0, 1, 0]; // Mock user answers
  
  const [showReview, setShowReview] = useState(false);
  const [currentReviewIndex, setCurrentReviewIndex] = useState(0);

  // Mock achievements unlocked
  const achievementsUnlocked = score >= 80 ? [
    { id: '1', name: 'Quiz Master', description: 'Score 80% or higher on a quiz', xp: 50 },
    { id: '2', name: 'ZK Explorer', description: 'Complete your first ZK quiz', xp: 25 }
  ] : [];

  const xpEarned = Math.floor(score * 2) + achievementsUnlocked.reduce((sum, ach) => sum + ach.xp, 0);

  useEffect(() => {
    // Mock: Update user stats and unlock achievements
    if (achievementsUnlocked.length > 0) {
      toast({
        title: "🎉 Achievements Unlocked!",
        description: `You unlocked ${achievementsUnlocked.length} new achievement${achievementsUnlocked.length > 1 ? 's' : ''}!`,
      });
    }
  }, []);

  if (!quiz) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <Card className="glass border-white/20 max-w-md mx-auto text-center">
            <CardContent className="p-8">
              <h2 className="text-xl font-semibold mb-4">Quiz Not Found</h2>
              <Button onClick={() => navigate('/quizzes')}>
                Back to Quizzes
              </Button>
            </CardContent>
          </Card>
        </div>
      </Layout>
    );
  }

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-400';
    if (score >= 70) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getScoreMessage = (score: number) => {
    if (score >= 90) return 'Outstanding! 🎉';
    if (score >= 80) return 'Great job! 👏';
    if (score >= 70) return 'Good work! 👍';
    if (score >= 60) return 'Not bad, keep learning! 📚';
    return 'Keep practicing! 💪';
  };

  const handleShare = () => {
    const text = `I just scored ${score}% on the "${quiz.title}" quiz on ConnectSphere! 🎯`;
    if (navigator.share) {
      navigator.share({ title: 'Quiz Results', text });
    } else {
      navigator.clipboard.writeText(text);
      toast({
        title: "Copied to clipboard!",
        description: "Your quiz results have been copied to clipboard.",
      });
    }
  };

  const handleDownload = () => {
    // Mock download functionality
    toast({
      title: "Certificate Generated",
      description: "Your completion certificate has been downloaded.",
    });
  };

  if (showReview) {
    const currentQuestion = questions[currentReviewIndex];
    const userAnswer = userAnswers[currentReviewIndex];
    const isCorrect = userAnswer === currentQuestion.correctAnswer;

    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-6">
              <Button
                variant="ghost"
                className="flex items-center gap-2"
                onClick={() => setShowReview(false)}
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Results
              </Button>
              <Badge variant="outline">
                Review {currentReviewIndex + 1} of {questions.length}
              </Badge>
            </div>

            <QuestionCard
              question={currentQuestion}
              questionNumber={currentReviewIndex + 1}
              totalQuestions={questions.length}
              selectedAnswer={userAnswer}
              onAnswerSelect={() => {}}
              showResult={true}
              isCorrect={isCorrect}
            />

            <div className="flex justify-between mt-6">
              <Button
                variant="outline"
                onClick={() => setCurrentReviewIndex(Math.max(0, currentReviewIndex - 1))}
                disabled={currentReviewIndex === 0}
              >
                Previous Question
              </Button>
              <Button
                onClick={() => setCurrentReviewIndex(Math.min(questions.length - 1, currentReviewIndex + 1))}
                disabled={currentReviewIndex === questions.length - 1}
              >
                Next Question
              </Button>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="w-20 h-20 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center">
                <Trophy className="h-10 w-10 text-white" />
              </div>
            </div>
            <h1 className="text-3xl font-bold gradient-text mb-2">Quiz Complete!</h1>
            <p className="text-muted-foreground">{quiz.title}</p>
          </div>

          {/* Score Card */}
          <Card className="glass border-white/20 mb-8">
            <CardContent className="p-8 text-center">
              <div className="text-6xl font-bold mb-4">
                <span className={getScoreColor(score)}>{score}%</span>
              </div>
              <p className="text-xl mb-4">{getScoreMessage(score)}</p>
              <p className="text-muted-foreground mb-6">
                You answered {correctAnswers} out of {questions.length} questions correctly
              </p>
              <Progress value={score} className="max-w-md mx-auto mb-6" />
              
              <div className="flex justify-center gap-4">
                <Button onClick={handleShare} variant="outline" className="flex items-center gap-2">
                  <Share2 className="h-4 w-4" />
                  Share Results
                </Button>
                {score >= 70 && (
                  <Button onClick={handleDownload} variant="outline" className="flex items-center gap-2">
                    <Download className="h-4 w-4" />
                    Download Certificate
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* XP Earned */}
            <Card className="glass border-white/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className="h-5 w-5 text-yellow-400" />
                  XP Earned
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-yellow-400 mb-2">+{xpEarned} XP</div>
                <p className="text-sm text-muted-foreground">
                  Base: {Math.floor(score * 2)} XP + Achievements: {achievementsUnlocked.reduce((sum, ach) => sum + ach.xp, 0)} XP
                </p>
              </CardContent>
            </Card>

            {/* Quiz Stats */}
            <Card className="glass border-white/20">
              <CardHeader>
                <CardTitle>Quiz Statistics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Correct Answers:</span>
                  <span className="font-semibold">{correctAnswers}/{questions.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Accuracy:</span>
                  <span className="font-semibold">{score}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Category:</span>
                  <Badge variant="secondary">{quiz.category}</Badge>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Achievements */}
          {achievementsUnlocked.length > 0 && (
            <Card className="glass border-white/20 mb-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="h-5 w-5 text-yellow-400" />
                  Achievements Unlocked
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {achievementsUnlocked.map((achievement) => (
                    <div key={achievement.id} className="flex items-center gap-3 p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
                      <div className="w-10 h-10 rounded-full bg-yellow-500/20 flex items-center justify-center">
                        <Trophy className="h-5 w-5 text-yellow-400" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold">{achievement.name}</h4>
                        <p className="text-sm text-muted-foreground">{achievement.description}</p>
                      </div>
                      <Badge variant="outline" className="text-yellow-400 border-yellow-400/30">
                        +{achievement.xp} XP
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={() => setShowReview(true)}
              variant="outline"
              className="flex items-center gap-2"
            >
              Review Answers
            </Button>
            <Button
              onClick={() => navigate(`/quiz/${id}`)}
              variant="outline"
              className="flex items-center gap-2"
            >
              <RotateCcw className="h-4 w-4" />
              Retake Quiz
            </Button>
            <Button
              onClick={() => navigate('/quizzes')}
              className="bg-gradient-to-r from-primary to-secondary"
            >
              Explore More Quizzes
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default QuizResults;