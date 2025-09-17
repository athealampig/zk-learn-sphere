import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Layout from "@/components/layout/Layout";
import { 
  Trophy, 
  Shield, 
  BookOpen, 
  Target, 
  Star, 
  Lock,
  Calendar,
  Award,
  Zap,
  Crown,
  Flame,
  Share,
  Download
} from "lucide-react";

const Achievements = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const achievementCategories = [
    { id: "all", label: "All Achievements", icon: Trophy },
    { id: "learning", label: "Learning", icon: BookOpen },
    { id: "mastery", label: "Mastery", icon: Crown },
    { id: "community", label: "Community", icon: Target },
    { id: "special", label: "Special", icon: Star }
  ];

  const achievements = [
    {
      id: 1,
      title: "First Steps",
      description: "Complete your first quiz on ConnectSphere",
      category: "learning",
      tier: "bronze",
      unlocked: true,
      unlockedDate: "2024-01-15",
      progress: 100,
      maxProgress: 1,
      xpReward: 50,
      rarity: "common",
      holders: 8520
    },
    {
      id: 2,
      title: "Blockchain Scholar",
      description: "Complete 10 blockchain-related quizzes",
      category: "learning", 
      tier: "silver",
      unlocked: true,
      unlockedDate: "2024-02-03",
      progress: 10,
      maxProgress: 10,
      xpReward: 150,
      rarity: "uncommon",
      holders: 3420
    },
    {
      id: 3,
      title: "ZK Master",
      description: "Achieve 95%+ average score on zero-knowledge proof quizzes",
      category: "mastery",
      tier: "gold",
      unlocked: true,
      unlockedDate: "2024-02-28",
      progress: 95,
      maxProgress: 95,
      xpReward: 300,
      rarity: "rare",
      holders: 892
    },
    {
      id: 4,
      title: "DeFi Expert",
      description: "Master all advanced DeFi protocol quizzes",
      category: "mastery",
      tier: "gold",
      unlocked: false,
      progress: 3,
      maxProgress: 5,
      xpReward: 400,
      rarity: "rare",
      holders: 456
    },
    {
      id: 5,
      title: "Learning Streak",
      description: "Maintain a 30-day learning streak",
      category: "learning",
      tier: "silver",
      unlocked: false,
      progress: 12,
      maxProgress: 30,
      xpReward: 200,
      rarity: "uncommon",
      holders: 1250
    },
    {
      id: 6,
      title: "Proof Pioneer",
      description: "Generate 100 zero-knowledge proofs",
      category: "mastery",
      tier: "platinum",
      unlocked: false,
      progress: 18,
      maxProgress: 100,
      xpReward: 500,
      rarity: "epic",
      holders: 123
    },
    {
      id: 7,
      title: "Community Helper",
      description: "Help 50 fellow learners in the community",
      category: "community",
      tier: "gold",
      unlocked: false,
      progress: 12,
      maxProgress: 50,
      xpReward: 350,
      rarity: "rare",
      holders: 234
    },
    {
      id: 8,
      title: "Beta Tester",
      description: "Participated in the ConnectSphere beta program",
      category: "special",
      tier: "legendary",
      unlocked: true,
      unlockedDate: "2024-01-01",
      progress: 1,
      maxProgress: 1,
      xpReward: 1000,
      rarity: "legendary",
      holders: 50
    }
  ];

  const getTierColor = (tier: string) => {
    switch (tier) {
      case "bronze": return "from-amber-600 to-amber-400";
      case "silver": return "from-gray-400 to-gray-300";
      case "gold": return "from-yellow-400 to-yellow-200";
      case "platinum": return "from-cyan-400 to-cyan-200";
      case "legendary": return "from-purple-500 to-pink-400";
      default: return "from-gray-400 to-gray-300";
    }
  };

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case "common": return "text-gray-400";
      case "uncommon": return "text-green-400";
      case "rare": return "text-blue-400";
      case "epic": return "text-purple-400";
      case "legendary": return "text-yellow-400";
      default: return "text-gray-400";
    }
  };

  const getTierIcon = (tier: string) => {
    switch (tier) {
      case "bronze": return Award;
      case "silver": return Trophy;
      case "gold": return Crown;
      case "platinum": return Star;
      case "legendary": return Flame;
      default: return Award;
    }
  };

  const filteredAchievements = selectedCategory === "all" 
    ? achievements 
    : achievements.filter(achievement => achievement.category === selectedCategory);

  const unlockedCount = achievements.filter(a => a.unlocked).length;
  const totalXP = achievements.filter(a => a.unlocked).reduce((sum, a) => sum + a.xpReward, 0);
  const rareUnlocked = achievements.filter(a => a.unlocked && (a.rarity === "rare" || a.rarity === "epic" || a.rarity === "legendary")).length;

  return (
    <Layout>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            Your <span className="gradient-text">Achievements</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Track your progress, unlock badges, and showcase your Web3 learning journey 
            with verifiable zero-knowledge proofs.
          </p>
          
          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-2xl mx-auto">
            <Card className="glass border-white/10">
              <CardContent className="p-6 text-center">
                <Trophy className="h-8 w-8 text-primary mx-auto mb-2" />
                <div className="text-2xl font-bold text-foreground">{unlockedCount}/{achievements.length}</div>
                <div className="text-sm text-muted-foreground">Unlocked</div>
              </CardContent>
            </Card>
            
            <Card className="glass border-white/10">
              <CardContent className="p-6 text-center">
                <Zap className="h-8 w-8 text-accent mx-auto mb-2" />
                <div className="text-2xl font-bold text-foreground">{totalXP.toLocaleString()}</div>
                <div className="text-sm text-muted-foreground">Total XP</div>
              </CardContent>
            </Card>
            
            <Card className="glass border-white/10">
              <CardContent className="p-6 text-center">
                <Star className="h-8 w-8 text-secondary mx-auto mb-2" />
                <div className="text-2xl font-bold text-foreground">{rareUnlocked}</div>
                <div className="text-sm text-muted-foreground">Rare Badges</div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Category Tabs */}
        <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="mb-8">
          <TabsList className="grid w-full grid-cols-5 lg:w-max lg:mx-auto glass border-white/10">
            {achievementCategories.map((category) => {
              const Icon = category.icon;
              return (
                <TabsTrigger 
                  key={category.id} 
                  value={category.id}
                  className="flex items-center space-x-2 data-[state=active]:bg-primary/20"
                >
                  <Icon className="h-4 w-4" />
                  <span className="hidden sm:inline">{category.label}</span>
                </TabsTrigger>
              );
            })}
          </TabsList>
        </Tabs>

        {/* Achievements Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {filteredAchievements.map((achievement) => {
            const TierIcon = getTierIcon(achievement.tier);
            const isLocked = !achievement.unlocked;
            
            return (
              <Card 
                key={achievement.id} 
                className={`glass border-white/10 hover-lift relative overflow-hidden ${
                  isLocked ? "opacity-75" : ""
                }`}
              >
                {/* Rarity Indicator */}
                <div className="absolute top-4 right-4">
                  <Badge className={`${getRarityColor(achievement.rarity)} border-current bg-transparent`}>
                    {achievement.rarity}
                  </Badge>
                </div>

                <CardHeader className="text-center">
                  <div className="relative mx-auto mb-4">
                    <div className={`w-20 h-20 rounded-full bg-gradient-to-br ${getTierColor(achievement.tier)} flex items-center justify-center ${
                      achievement.unlocked ? "glow-primary" : "grayscale"
                    }`}>
                      {isLocked ? (
                        <Lock className="h-8 w-8 text-white" />
                      ) : (
                        <TierIcon className="h-8 w-8 text-white" />
                      )}
                    </div>
                    {achievement.unlocked && (
                      <div className="absolute -top-1 -right-1 w-6 h-6 bg-accent rounded-full flex items-center justify-center">
                        <Shield className="h-3 w-3 text-white" />
                      </div>
                    )}
                  </div>
                  
                  <CardTitle className={`text-lg ${isLocked ? "text-muted-foreground" : ""}`}>
                    {achievement.title}
                  </CardTitle>
                  
                  <CardDescription className="leading-relaxed">
                    {achievement.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-4">
                  {/* Progress */}
                  {!achievement.unlocked && achievement.maxProgress > 1 && (
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-muted-foreground">Progress</span>
                        <span className="text-primary font-medium">
                          {achievement.progress}/{achievement.maxProgress}
                        </span>
                      </div>
                      <Progress 
                        value={(achievement.progress / achievement.maxProgress) * 100} 
                        className="h-2"
                      />
                    </div>
                  )}

                  {/* Details */}
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-2">
                      <Zap className="h-4 w-4 text-accent" />
                      <span className="text-muted-foreground">+{achievement.xpReward} XP</span>
                    </div>
                    <div className="text-muted-foreground">
                      {achievement.holders.toLocaleString()} holders
                    </div>
                  </div>

                  {/* Unlock Date */}
                  {achievement.unlocked && achievement.unlockedDate && (
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      <span>Unlocked {new Date(achievement.unlockedDate).toLocaleDateString()}</span>
                    </div>
                  )}

                  {/* Actions */}
                  {achievement.unlocked && (
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" className="flex-1">
                        <Share className="mr-2 h-3 w-3" />
                        Share
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1">
                        <Download className="mr-2 h-3 w-3" />
                        Proof
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <Card className="glass border-white/10 max-w-2xl mx-auto">
            <CardContent className="p-8">
              <Shield className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-4">
                Generate <span className="gradient-text">Verifiable Proofs</span>
              </h3>
              <p className="text-muted-foreground mb-6">
                Create zero-knowledge proofs of your achievements that can be verified 
                without revealing your personal learning data.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="hero" asChild>
                  <Link to="/proofs">
                    Generate Proofs
                    <Shield className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button variant="glass" asChild>
                  <Link to="/quizzes">
                    Earn More Badges
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

export default Achievements;