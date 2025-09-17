import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Layout from "@/components/layout/Layout";
import { 
  Search, 
  Filter, 
  BookOpen, 
  Clock, 
  Trophy, 
  Shield, 
  Zap,
  ChevronRight,
  Star,
  Users,
  Target
} from "lucide-react";

const Quizzes = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedDifficulty, setSelectedDifficulty] = useState("all");

  const categories = [
    { value: "all", label: "All Categories" },
    { value: "blockchain", label: "Blockchain Basics" },
    { value: "defi", label: "DeFi Protocols" },
    { value: "zk", label: "Zero-Knowledge Proofs" },
    { value: "smart-contracts", label: "Smart Contracts" },
    { value: "security", label: "Security & Auditing" },
    { value: "scaling", label: "Layer 2 & Scaling" }
  ];

  const difficulties = [
    { value: "all", label: "All Levels" },
    { value: "beginner", label: "Beginner" },
    { value: "intermediate", label: "Intermediate" },
    { value: "advanced", label: "Advanced" },
    { value: "expert", label: "Expert" }
  ];

  const quizzes = [
    {
      id: 1,
      title: "Blockchain Fundamentals",
      description: "Master the core concepts of blockchain technology, consensus mechanisms, and distributed systems.",
      category: "blockchain",
      difficulty: "beginner",
      duration: "15 min",
      questions: 20,
      participants: 1542,
      rating: 4.8,
      completed: false,
      progress: 0,
      xpReward: 100,
      badges: ["Blockchain Basics"]
    },
    {
      id: 2,
      title: "Zero-Knowledge Proofs Deep Dive",
      description: "Explore advanced cryptographic concepts including zk-SNARKs, zk-STARKs, and practical applications.",
      category: "zk", 
      difficulty: "advanced",
      duration: "25 min",
      questions: 15,
      participants: 423,
      rating: 4.9,
      completed: true,
      progress: 100,
      xpReward: 200,
      badges: ["ZK Master", "Cryptography Expert"]
    },
    {
      id: 3,
      title: "DeFi Protocol Analysis",
      description: "Understand decentralized finance protocols, yield farming, liquidity pools, and risk assessment.",
      category: "defi",
      difficulty: "intermediate", 
      duration: "20 min",
      questions: 25,
      participants: 890,
      rating: 4.7,
      completed: false,
      progress: 60,
      xpReward: 150,
      badges: ["DeFi Specialist"]
    },
    {
      id: 4,
      title: "Smart Contract Security",
      description: "Learn about common vulnerabilities, security best practices, and auditing techniques for smart contracts.",
      category: "security",
      difficulty: "advanced",
      duration: "30 min", 
      questions: 18,
      participants: 567,
      rating: 4.9,
      completed: false,
      progress: 0,
      xpReward: 250,
      badges: ["Security Expert", "Smart Contract Auditor"]
    },
    {
      id: 5,
      title: "Layer 2 Scaling Solutions",
      description: "Explore Ethereum scaling solutions including optimistic rollups, zk-rollups, and state channels.",
      category: "scaling",
      difficulty: "intermediate",
      duration: "18 min",
      questions: 22,
      participants: 334,
      rating: 4.6,
      completed: false,
      progress: 25,
      xpReward: 175,
      badges: ["Scaling Specialist"]
    },
    {
      id: 6,
      title: "Solidity Programming Basics",
      description: "Start your journey in smart contract development with Solidity programming fundamentals.",
      category: "smart-contracts",
      difficulty: "beginner",
      duration: "22 min",
      questions: 28,
      participants: 1123,
      rating: 4.5,
      completed: false,
      progress: 0,
      xpReward: 120,
      badges: ["Smart Contract Developer"]
    }
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "beginner": return "bg-accent/20 text-accent border-accent/30";
      case "intermediate": return "bg-primary/20 text-primary border-primary/30";
      case "advanced": return "bg-secondary/20 text-secondary border-secondary/30";
      case "expert": return "bg-destructive/20 text-destructive border-destructive/30";
      default: return "bg-muted/20 text-muted-foreground border-muted/30";
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "blockchain": return BookOpen;
      case "zk": return Shield;
      case "defi": return Trophy;
      case "smart-contracts": return Zap;
      case "security": return Shield;
      case "scaling": return Target;
      default: return BookOpen;
    }
  };

  const filteredQuizzes = quizzes.filter(quiz => {
    const matchesSearch = quiz.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         quiz.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || quiz.category === selectedCategory;
    const matchesDifficulty = selectedDifficulty === "all" || quiz.difficulty === selectedDifficulty;
    
    return matchesSearch && matchesCategory && matchesDifficulty;
  });

  const stats = [
    { label: "Total Quizzes", value: "120+", icon: BookOpen },
    { label: "Active Learners", value: "5,000+", icon: Users },
    { label: "Completion Rate", value: "94%", icon: Target },
    { label: "Avg. Rating", value: "4.8/5", icon: Star }
  ];

  return (
    <Layout>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            Web3 <span className="gradient-text">Quiz Library</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Test your knowledge across blockchain, DeFi, zero-knowledge proofs, and more. 
            Earn XP and unlock achievements as you learn.
          </p>
          
          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="glass rounded-lg p-4 border-white/10">
                  <Icon className="h-6 w-6 text-primary mx-auto mb-2" />
                  <div className="text-lg font-bold text-foreground">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Filters */}
        <Card className="glass border-white/10 mb-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Filter className="h-5 w-5 text-primary" />
              <span>Find Your Perfect Quiz</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search quizzes..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 glass border-white/20"
                />
              </div>
              
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="glass border-white/20">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.value} value={category.value}>
                      {category.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
                <SelectTrigger className="glass border-white/20">
                  <SelectValue placeholder="Select difficulty" />
                </SelectTrigger>
                <SelectContent>
                  {difficulties.map((difficulty) => (
                    <SelectItem key={difficulty.value} value={difficulty.value}>
                      {difficulty.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Quiz Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredQuizzes.map((quiz) => {
            const CategoryIcon = getCategoryIcon(quiz.category);
            
            return (
              <Card key={quiz.id} className="glass border-white/10 hover-lift group">
                <CardHeader>
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      <div className="p-2 rounded-lg bg-gradient-to-r from-primary to-secondary">
                        <CategoryIcon className="h-4 w-4 text-white" />
                      </div>
                      <Badge className={getDifficultyColor(quiz.difficulty)}>
                        {quiz.difficulty}
                      </Badge>
                    </div>
                    <div className="flex items-center space-x-1 text-accent">
                      <Star className="h-4 w-4 fill-current" />
                      <span className="text-sm font-medium">{quiz.rating}</span>
                    </div>
                  </div>
                  
                  <CardTitle className="text-lg group-hover:text-primary transition-colors">
                    {quiz.title}
                  </CardTitle>
                  <CardDescription className="leading-relaxed">
                    {quiz.description}
                  </CardDescription>
                </CardHeader>

                <CardContent>
                  <div className="space-y-4">
                    {/* Quiz Stats */}
                    <div className="grid grid-cols-3 gap-2 text-sm text-muted-foreground">
                      <div className="flex items-center space-x-1">
                        <Clock className="h-3 w-3" />
                        <span>{quiz.duration}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <BookOpen className="h-3 w-3" />
                        <span>{quiz.questions}q</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Users className="h-3 w-3" />
                        <span>{quiz.participants}</span>
                      </div>
                    </div>

                    {/* Progress Bar (if started) */}
                    {quiz.progress > 0 && (
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-muted-foreground">Progress</span>
                          <span className="text-primary font-medium">{quiz.progress}%</span>
                        </div>
                        <div className="w-full bg-muted/20 rounded-full h-2">
                          <div 
                            className="bg-gradient-to-r from-primary to-secondary h-2 rounded-full transition-all duration-300"
                            style={{ width: `${quiz.progress}%` }}
                          />
                        </div>
                      </div>
                    )}

                    {/* Rewards */}
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center space-x-2">
                        <Zap className="h-4 w-4 text-accent" />
                        <span className="text-muted-foreground">+{quiz.xpReward} XP</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Trophy className="h-4 w-4 text-secondary" />
                        <span className="text-muted-foreground">{quiz.badges.length} badge{quiz.badges.length > 1 ? 's' : ''}</span>
                      </div>
                    </div>

                    {/* Action Button */}
                    <Button 
                      asChild 
                      variant={quiz.completed ? "outline" : quiz.progress > 0 ? "secondary" : "hero"}
                      className="w-full"
                    >
                      <Link to={`/quiz/${quiz.id}`}>
                        {quiz.completed ? (
                          <>
                            <Trophy className="mr-2 h-4 w-4" />
                            Completed
                          </>
                        ) : quiz.progress > 0 ? (
                          <>
                            Continue Quiz
                            <ChevronRight className="ml-2 h-4 w-4" />
                          </>
                        ) : (
                          <>
                            Start Quiz
                            <ChevronRight className="ml-2 h-4 w-4" />
                          </>
                        )}
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* No Results */}
        {filteredQuizzes.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-2">No quizzes found</h3>
            <p className="text-muted-foreground mb-6">
              Try adjusting your search terms or filters to find more quizzes.
            </p>
            <Button 
              onClick={() => {
                setSearchTerm("");
                setSelectedCategory("all");
                setSelectedDifficulty("all");
              }}
              variant="outline"
            >
              Clear Filters
            </Button>
          </div>
        )}

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <Card className="glass border-white/10 max-w-2xl mx-auto">
            <CardContent className="p-8">
              <Shield className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-4">
                Ready to prove your <span className="gradient-text">Web3 expertise</span>?
              </h3>
              <p className="text-muted-foreground mb-6">
                Complete quizzes to generate zero-knowledge proofs of your achievements 
                and build your verifiable learning portfolio.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="hero" asChild>
                  <Link to="/proofs">
                    Generate Proofs
                    <Shield className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button variant="glass" asChild>
                  <Link to="/achievements">
                    View Achievements
                    <Trophy className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Quizzes;