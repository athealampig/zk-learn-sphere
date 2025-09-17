export interface Quiz {
  id: string;
  title: string;
  description: string;
  category: 'ZK' | 'SP1' | 'Soundness Layer' | 'Blockchain';
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  totalQuestions: number;
  duration: number; // in minutes
  xpReward: number;
  completed: boolean;
  score?: number;
  completedAt?: string;
}

export interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  category: string;
}

export interface QuizAttempt {
  id: string;
  quizId: string;
  userId: string;
  answers: number[];
  score: number;
  completedAt: string;
  duration: number; // in seconds
  xpEarned: number;
  achievementsUnlocked: string[];
}

export interface QuizSession {
  quizId: string;
  currentQuestionIndex: number;
  answers: (number | null)[];
  startTime: string;
  timeRemaining?: number;
}