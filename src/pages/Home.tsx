import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Layout from "@/components/layout/Layout";
import { 
  BookOpen, 
  Award, 
  Shield, 
  Zap, 
  Users, 
  Target, 
  TrendingUp,
  Star,
  ArrowRight,
  CheckCircle,
  Sparkles
} from "lucide-react";
import heroImage from "@/assets/hero-web3.jpg";
import featuresImage from "@/assets/features-bg.jpg";

const Home = () => {
  const features = [
    {
      icon: BookOpen,
      title: "Interactive Quizzes",
      description: "Master Web3 concepts through engaging, adaptive quizzes tailored to your learning pace.",
      color: "from-primary to-primary-glow"
    },
    {
      icon: Award,
      title: "Achievement System", 
      description: "Unlock badges and certificates as you progress through your Web3 learning journey.",
      color: "from-secondary to-secondary-glow"
    },
    {
      icon: Shield,
      title: "Proof Generation",
      description: "Generate zero-knowledge proofs of your achievements without revealing personal data.",
      color: "from-accent to-accent-glow"
    },
    {
      icon: Zap,
      title: "Web3 Integration",
      description: "Connect your wallet and earn on-chain rewards for your learning achievements.",
      color: "from-primary to-accent"
    }
  ];

  const howItWorks = [
    {
      step: "01",
      title: "Connect Wallet",
      description: "Link your Web3 wallet to start your decentralized learning journey."
    },
    {
      step: "02", 
      title: "Take Quizzes",
      description: "Complete interactive quizzes on blockchain, DeFi, and zero-knowledge proofs."
    },
    {
      step: "03",
      title: "Generate Proofs",
      description: "Create cryptographic proofs of your knowledge without revealing sensitive data."
    },
    {
      step: "04",
      title: "Earn Rewards",
      description: "Receive on-chain certificates and tokens for your verified achievements."
    }
  ];

  const testimonials = [
    {
      name: "Alex Chen",
      role: "DeFi Developer",
      content: "ConnectSphere helped me master zero-knowledge proofs. The interactive approach made complex concepts accessible.",
      avatar: "/api/placeholder/64/64",
      rating: 5
    },
    {
      name: "Sarah Martinez", 
      role: "Blockchain Engineer",
      content: "The achievement system kept me motivated. Now I have verifiable proof of my Web3 expertise!",
      avatar: "/api/placeholder/64/64", 
      rating: 5
    },
    {
      name: "David Kim",
      role: "Smart Contract Auditor",
      content: "Privacy-preserving proof generation is brilliant. I can verify my skills without exposing sensitive information.",
      avatar: "/api/placeholder/64/64",
      rating: 5
    }
  ];

  const stats = [
    { label: "Active Learners", value: "10,000+", icon: Users },
    { label: "Quizzes Completed", value: "50,000+", icon: Target },
    { label: "Proofs Generated", value: "25,000+", icon: Shield },
    { label: "Success Rate", value: "94%", icon: TrendingUp }
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background/80 to-transparent" />
        
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-center mb-6">
              <div className="px-4 py-2 rounded-full bg-primary/10 border border-primary/20 glass">
                <span className="text-primary font-medium text-sm">🚀 Next-Gen Web3 Learning</span>
              </div>
            </div>
            
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              Master <span className="gradient-text">Web3</span> with{" "}
              <span className="gradient-text">Zero-Knowledge</span> Proofs
            </h1>
            
            <p className="text-xl sm:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
              Learn blockchain technology through interactive quizzes, earn verifiable achievements, 
              and generate privacy-preserving proofs of your expertise.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Button variant="hero" size="xl" asChild className="w-full sm:w-auto">
                <Link to="/register">
                  Start Learning Free
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button variant="glass" size="xl" asChild className="w-full sm:w-auto">
                <Link to="/about">
                  How It Works
                  <Sparkles className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div key={index} className="glass rounded-xl p-6 hover-lift">
                    <div className="flex items-center justify-center mb-2">
                      <Icon className="h-8 w-8 text-primary" />
                    </div>
                    <div className="text-2xl font-bold text-foreground mb-1">{stat.value}</div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 relative">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-10"
          style={{ backgroundImage: `url(${featuresImage})` }}
        />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
              Powerful <span className="gradient-text">Features</span> for Modern Learning
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Experience the future of education with our cutting-edge Web3 learning platform
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="glass border-white/10 hover-lift group">
                  <CardHeader className="text-center">
                    <div className={`w-16 h-16 mx-auto mb-4 rounded-xl bg-gradient-to-r ${feature.color} flex items-center justify-center glow-primary group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="h-8 w-8 text-white" />
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-center leading-relaxed">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-24 bg-muted/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
              How <span className="gradient-text">ConnectSphere</span> Works
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Your journey to Web3 mastery in four simple steps
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {howItWorks.map((step, index) => (
              <div key={index} className="relative">
                <Card className="glass border-white/10 hover-lift text-center h-full">
                  <CardHeader>
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center glow-primary">
                      <span className="text-2xl font-bold text-white">{step.step}</span>
                    </div>
                    <CardTitle className="text-xl">{step.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="leading-relaxed">
                      {step.description}
                    </CardDescription>
                  </CardContent>
                </Card>
                {index < howItWorks.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                    <ArrowRight className="h-8 w-8 text-primary" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
              What Our <span className="gradient-text">Learners</span> Say
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Join thousands of developers mastering Web3 technologies
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="glass border-white/10 hover-lift">
                <CardHeader>
                  <div className="flex items-center space-x-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-accent text-accent" />
                    ))}
                  </div>
                  <CardDescription className="text-base leading-relaxed">
                    "{testimonial.content}"
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center">
                      <span className="text-white font-semibold">
                        {testimonial.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div>
                      <div className="font-semibold">{testimonial.name}</div>
                      <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-primary/10 to-secondary/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            Ready to Start Your <span className="gradient-text">Web3 Journey</span>?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of learners mastering blockchain technology with privacy-preserving proofs
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button variant="hero" size="xl" asChild>
              <Link to="/register">
                <CheckCircle className="mr-2 h-5 w-5" />
                Start Learning Now
              </Link>
            </Button>
            <Button variant="glass" size="xl" asChild>
              <Link to="/about">
                Learn More
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Home;