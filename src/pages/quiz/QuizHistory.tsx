import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { mockQuizzes } from "@/lib/mockData";
import { Search, Filter, Download, BarChart3, Calendar, Trophy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const QuizHistory = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [sortBy, setSortBy] = useState("date");

  // Mock quiz history data
  const quizHistory = [
    {
      id: '1',
      quiz: mockQuizzes[0],
      completedAt: '2024-01-15T10:30:00Z',
      score: 85,
      duration: 780, // seconds
      xpEarned: 170,
      rank: 'A'
    },
    {
      id: '2',
      quiz: { ...mockQuizzes[1], title: 'Advanced ZK Circuits' },
      completedAt: '2024-01-10T14:20:00Z',
      score: 92,
      duration: 1200,
      xpEarned: 220,
      rank: 'A+'
    },
    {
      id: '3',
      quiz: { ...mockQuizzes[0], title: 'Blockchain Basics', category: 'Blockchain' as const },
      completedAt: '2024-01-05T09:15:00Z',
      score: 78,
      duration: 900,
      xpEarned: 156,
      rank: 'B+'
    },
    {
      id: '4',
      quiz: { ...mockQuizzes[1], title: 'SP1 Implementation' },
      completedAt: '2023-12-28T16:45:00Z',
      score: 88,
      duration: 1050,
      xpEarned: 188,
      rank: 'A'
    }
  ];

  const filteredHistory = quizHistory
    .filter(item => {
      const matchesSearch = item.quiz.title.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = categoryFilter === 'all' || item.quiz.category === categoryFilter;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'score':
          return b.score - a.score;
        case 'title':
          return a.quiz.title.localeCompare(b.quiz.title);
        default:
          return new Date(b.completedAt).getTime() - new Date(a.completedAt).getTime();
      }
    });

  const totalQuizzes = quizHistory.length;
  const averageScore = Math.round(quizHistory.reduce((sum, item) => sum + item.score, 0) / totalQuizzes);
  const totalXP = quizHistory.reduce((sum, item) => sum + item.xpEarned, 0);
  const bestScore = Math.max(...quizHistory.map(item => item.score));

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-400';
    if (score >= 80) return 'text-blue-400';
    if (score >= 70) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getRankColor = (rank: string) => {
    if (rank.includes('A')) return 'bg-green-500/20 text-green-400 border-green-500/50';
    if (rank.includes('B')) return 'bg-blue-500/20 text-blue-400 border-blue-500/50';
    if (rank.includes('C')) return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/50';
    return 'bg-red-500/20 text-red-400 border-red-500/50';
  };

  const handleExport = () => {
    // Mock export functionality
    toast({
      title: "Export Started",
      description: "Your quiz history is being exported to PDF...",
    });
    
    setTimeout(() => {
      toast({
        title: "Export Complete",
        description: "Your quiz history has been downloaded.",
      });
    }, 2000);
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold gradient-text mb-2">Quiz History</h1>
              <p className="text-muted-foreground">Track your learning progress and achievements</p>
            </div>
            <Button onClick={handleExport} className="flex items-center gap-2 mt-4 sm:mt-0">
              <Download className="h-4 w-4" />
              Export Results
            </Button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <Card className="glass border-white/20">
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                    <Trophy className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Total Quizzes</p>
                    <p className="text-2xl font-bold">{totalQuizzes}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="glass border-white/20">
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center">
                    <BarChart3 className="h-5 w-5 text-green-400" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Average Score</p>
                    <p className="text-2xl font-bold text-green-400">{averageScore}%</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="glass border-white/20">
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-yellow-500/20 flex items-center justify-center">
                    <Trophy className="h-5 w-5 text-yellow-400" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Best Score</p>
                    <p className="text-2xl font-bold text-yellow-400">{bestScore}%</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="glass border-white/20">
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
                    <Trophy className="h-5 w-5 text-blue-400" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Total XP</p>
                    <p className="text-2xl font-bold text-blue-400">{totalXP.toLocaleString()}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Filters */}
          <Card className="glass border-white/20 mb-6">
            <CardContent className="p-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search quizzes..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-9"
                    />
                  </div>
                </div>
                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger className="w-full sm:w-48">
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="ZK">Zero Knowledge</SelectItem>
                    <SelectItem value="SP1">SP1</SelectItem>
                    <SelectItem value="Blockchain">Blockchain</SelectItem>
                    <SelectItem value="Soundness Layer">Soundness Layer</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-full sm:w-48">
                    <Calendar className="h-4 w-4 mr-2" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="date">Sort by Date</SelectItem>
                    <SelectItem value="score">Sort by Score</SelectItem>
                    <SelectItem value="title">Sort by Title</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Quiz History Table */}
          <Card className="glass border-white/20">
            <CardHeader>
              <CardTitle>Quiz Attempts ({filteredHistory.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Quiz</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Score</TableHead>
                      <TableHead>Rank</TableHead>
                      <TableHead>Duration</TableHead>
                      <TableHead>XP Earned</TableHead>
                      <TableHead>Completed</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredHistory.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell>
                          <div>
                            <p className="font-medium">{item.quiz.title}</p>
                            <p className="text-sm text-muted-foreground">
                              {item.quiz.difficulty}
                            </p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className="text-xs">
                            {item.quiz.category}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <span className={`font-bold ${getScoreColor(item.score)}`}>
                            {item.score}%
                          </span>
                        </TableCell>
                        <TableCell>
                          <Badge className={getRankColor(item.rank)}>
                            {item.rank}
                          </Badge>
                        </TableCell>
                        <TableCell className="font-mono text-sm">
                          {formatDuration(item.duration)}
                        </TableCell>
                        <TableCell>
                          <span className="text-yellow-400 font-semibold">
                            +{item.xpEarned}
                          </span>
                        </TableCell>
                        <TableCell className="text-sm text-muted-foreground">
                          {formatDate(item.completedAt)}
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => navigate(`/quiz/${item.quiz.id}/results?score=${item.score}&correct=${Math.floor(item.quiz.totalQuestions * item.score / 100)}`)}
                            >
                              View Results
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => navigate(`/quiz/${item.quiz.id}`)}
                            >
                              Retake
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              
              {filteredHistory.length === 0 && (
                <div className="text-center py-12">
                  <Trophy className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No Quiz History Found</h3>
                  <p className="text-muted-foreground mb-4">
                    {searchTerm || categoryFilter !== 'all' 
                      ? 'Try adjusting your search or filters'
                      : 'Start taking quizzes to see your history here'
                    }
                  </p>
                  <Button onClick={() => navigate('/quizzes')}>
                    Explore Quizzes
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default QuizHistory;