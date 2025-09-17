import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import Layout from "@/components/layout/Layout";
import { 
  BookOpen, 
  Award, 
  Shield, 
  TrendingUp,
  Calendar,
  Clock,
  Target,
  Users,
  Zap,
  CheckCircle,
  ArrowRight,
  Star,
  Trophy,
  Play
} from "lucide-react";

const Dashboard = () => {
  const [user] = useState({
    name: "Alex Chen",
    level: 7,
    xp: 2450,
    nextLevelXp: 3000,
    streak: 12,
    joinDate: "January 2024"
  });

  const stats = [
    {
      title: "Total Quizzes",
      value: "24",
      change: "+3 this week",
      icon: BookOpen,
      color: "from-primary to-primary-glow"
    },
    {
      title: "Proofs Generated", 
      value: "18",
      change: "+2 this week",
      icon: Shield,
      color: "from-secondary to-secondary-glow"
    },
    {
      title: "Achievements",
      value: "12",
      change: "+1 this week",
      icon: Award,
      color: "from-accent to-accent-glow"
    },
    {
      title: "XP Points",
      value: "2,450",
      change: "+180 this week",
      icon: Zap,
      color: "from-primary to-accent"
    }
  ];

  const recentActivity = [
    {
      type: "quiz",
      title: "Zero-Knowledge Proofs Fundamentals",
      description: "Completed with 95% score",
      time: "2 hours ago",
      icon: BookOpen,
      points: "+50 XP"
    },
    {
      type: "achievement",
      title: "ZK Mastery Badge",
      description: "Unlocked for completing 5 ZK quizzes",
      time: "1 day ago",
      icon: Award,
      points: "+100 XP"
    },
    {
      type: "proof",
      title: "Learning Proof Generated",
      description: "Proof of DeFi knowledge completion",
      time: "2 days ago",
      icon: Shield,
      points: "+75 XP"
    },
    {
      type: "streak",
      title: "12-Day Learning Streak",
      description: "Maintained daily learning activity",
      time: "Today",
      icon: TrendingUp,
      points: "+30 XP"
    }
  ];

  const quickActions = [
    {
      title: "Take a Quiz",
      description: "Test your Web3 knowledge",
      href: "/quizzes",
      icon: Play,
      variant: "hero" as const
    },
    {
      title: "Generate Proof",
      description: "Create ZK proof of achievement",
      href: "/proofs",
      icon: Shield,
      variant: "cosmic" as const
    },
    {
      title: "View Achievements",
      description: "See your badges and progress",
      href: "/achievements",
      icon: Trophy,
      variant: "accent" as const
    }
  ];

  const upcomingQuizzes = [
    {
      title: "Smart Contract Security",
      difficulty: "Advanced",
      estimatedTime: "15 min",
      category: "Security"
    },
    {
      title: "DeFi Protocols Deep Dive", 
      difficulty: "Expert",
      estimatedTime: "20 min",
      category: "DeFi"
    },
    {
      title: "Layer 2 Scaling Solutions",
      difficulty: "Intermediate",
      estimatedTime: "12 min", 
      category: "Blockchain"
    }
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner": return "bg-accent/20 text-accent";
      case "Intermediate": return "bg-primary/20 text-primary";
      case "Advanced": return "bg-secondary/20 text-secondary";
      case "Expert": return "bg-destructive/20 text-destructive";
      default: return "bg-muted/20 text-muted-foreground";
    }
  };

  const progressPercentage = (user.xp / user.nextLevelXp) * 100;

  return (
    <Layout>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold mb-2">
                Welcome back, <span className="gradient-text">{user.name}</span>!
              </h1>
              <p className="text-muted-foreground">
                Ready to continue your Web3 learning journey?
              </p>
            </div>
            <div className="mt-4 sm:mt-0">
              <Button variant="hero" asChild>
                <Link to="/quizzes">
                  Start Learning
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>

          {/* Level Progress */}
          <Card className="glass border-white/10">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold">Level {user.level}</h3>
                  <p className="text-sm text-muted-foreground">
                    {user.xp} / {user.nextLevelXp} XP
                  </p>
                </div>
                <div className="text-right">
                  <div className="flex items-center space-x-2 text-accent">
                    <TrendingUp className="h-4 w-4" />
                    <span className="font-semibold">{user.streak} day streak</span>
                  </div>
                </div>
              </div>
              <Progress value={progressPercentage} className="h-3" />
              <p className="text-xs text-muted-foreground mt-2">
                {user.nextLevelXp - user.xp} XP to next level
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index} className="glass border-white/10 hover-lift">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-3 rounded-xl bg-gradient-to-r ${stat.color} glow-primary`}>
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-foreground mb-1">{stat.value}</p>
                    <p className="text-sm text-muted-foreground mb-2">{stat.title}</p>
                    <p className="text-xs text-accent">{stat.change}</p>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Quick Actions */}
          <div className="lg:col-span-1">
            <Card className="glass border-white/10 mb-6">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Zap className="h-5 w-5 text-primary" />
                  <span>Quick Actions</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {quickActions.map((action, index) => {
                  const Icon = action.icon;
                  return (
                    <Button
                      key={index}
                      variant={action.variant}
                      asChild
                      className="w-full justify-start h-auto py-4"
                    >
                      <Link to={action.href}>
                        <div className="flex items-center space-x-3">
                          <Icon className="h-5 w-5" />
                          <div className="text-left">
                            <div className="font-medium">{action.title}</div>
                            <div className="text-xs opacity-90">{action.description}</div>
                          </div>
                        </div>
                      </Link>
                    </Button>
                  );
                })}
              </CardContent>
            </Card>
          </div>

          {/* Recent Activity */}
          <div className="lg:col-span-2">
            <Card className="glass border-white/10">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Clock className="h-5 w-5 text-primary" />
                  <span>Recent Activity</span>
                </CardTitle>
                <CardDescription>Your latest learning achievements</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((activity, index) => {
                    const Icon = activity.icon;
                    return (
                      <div key={index} className="flex items-start space-x-4 p-4 rounded-lg hover:bg-white/5 transition-colors">
                        <div className="flex-shrink-0">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center">
                            <Icon className="h-5 w-5 text-white" />
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <h4 className="text-sm font-medium text-foreground truncate">
                              {activity.title}
                            </h4>
                            <Badge variant="secondary" className="ml-2 text-xs">
                              {activity.points}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">
                            {activity.description}
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">
                            {activity.time}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Recommended Quizzes */}
        <div className="mt-8">
          <Card className="glass border-white/10">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Target className="h-5 w-5 text-primary" />
                <span>Recommended for You</span>
              </CardTitle>
              <CardDescription>Continue your learning path with these quizzes</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {upcomingQuizzes.map((quiz, index) => (
                  <div key={index} className="p-4 rounded-lg border border-white/10 hover:bg-white/5 transition-colors">
                    <div className="flex items-start justify-between mb-3">
                      <Badge className={getDifficultyColor(quiz.difficulty)}>
                        {quiz.difficulty}
                      </Badge>
                      <span className="text-xs text-muted-foreground">{quiz.category}</span>
                    </div>
                    <h4 className="font-medium text-foreground mb-2">{quiz.title}</h4>
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-3">
                      <Clock className="h-4 w-4" />
                      <span>{quiz.estimatedTime}</span>
                    </div>
                    <Button variant="outline" size="sm" className="w-full">
                      Start Quiz
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;