import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Layout from "@/components/layout/Layout";
import { 
  Users, 
  Target, 
  Shield, 
  BookOpen,
  Award,
  TrendingUp,
  Globe,
  Lock,
  ArrowRight
} from "lucide-react";

const About = () => {
  const teamMembers = [
    {
      name: "Dr. Sarah Chen",
      role: "Founder & CEO",
      expertise: "Cryptography & Zero-Knowledge Proofs",
      description: "Former MIT researcher specializing in cryptographic protocols and privacy-preserving technologies.",
    },
    {
      name: "Marcus Rodriguez",
      role: "CTO",
      expertise: "Blockchain Development",
      description: "10+ years building scalable blockchain infrastructure and smart contract platforms.",
    },
    {
      name: "Dr. Aisha Patel",
      role: "Head of Education",
      expertise: "Learning Science & Web3",
      description: "Educational technologist focused on innovative learning methodologies for complex technical subjects.",
    },
    {
      name: "David Kim",
      role: "Lead Developer",
      expertise: "Full-Stack & Smart Contracts",
      description: "Expert in building user-friendly interfaces for complex blockchain applications.",
    }
  ];

  const values = [
    {
      icon: Globe,
      title: "Decentralization",
      description: "We believe in the power of decentralized systems to democratize access to knowledge and opportunities."
    },
    {
      icon: Lock,
      title: "Privacy First",
      description: "Your learning data and achievements are protected with cutting-edge zero-knowledge cryptography."
    },
    {
      icon: BookOpen,
      title: "Quality Education",
      description: "We're committed to delivering the highest quality Web3 education through interactive and engaging content."
    },
    {
      icon: Users,
      title: "Community Driven",
      description: "Our platform thrives through community contributions, feedback, and collaborative learning."
    }
  ];

  const stats = [
    { label: "Students Educated", value: "15,000+", icon: Users },
    { label: "Completion Rate", value: "94%", icon: Target },
    { label: "ZK Proofs Generated", value: "50,000+", icon: Shield },
    { label: "Countries Reached", value: "85+", icon: Globe }
  ];

  const achievements = [
    "Winner of ETHGlobal Education Track 2023",
    "Featured in CoinDesk's Top EdTech Innovations",
    "Partnership with leading Web3 companies",
    "Recognized by MIT Technology Review",
    "Community Choice Award at DevCon 2023"
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-24 bg-gradient-to-br from-primary/10 to-secondary/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
              About <span className="gradient-text">ConnectSphere</span>
            </h1>
            <p className="text-xl sm:text-2xl text-muted-foreground mb-8 leading-relaxed">
              We're pioneering the future of Web3 education through privacy-preserving learning 
              experiences and verifiable knowledge credentials.
            </p>
            <Button variant="hero" size="xl" asChild>
              <Link to="/register">
                Join Our Mission
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Mission & Story Section */}
      <section className="py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold mb-6">
                Our <span className="gradient-text">Mission</span>
              </h2>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                ConnectSphere was born from a simple observation: the Web3 space is growing rapidly, 
                but quality education remains fragmented and inaccessible to many. We set out to change that.
              </p>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                Our platform combines cutting-edge zero-knowledge cryptography with interactive learning 
                methodologies to create a new paradigm for skill verification and knowledge sharing.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                We believe that everyone should have access to high-quality Web3 education while 
                maintaining complete privacy over their learning journey and achievements.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-6">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <Card key={index} className="glass border-white/10 text-center hover-lift">
                    <CardHeader className="pb-2">
                      <Icon className="h-8 w-8 text-primary mx-auto" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-foreground mb-1">{stat.value}</div>
                      <div className="text-sm text-muted-foreground">{stat.label}</div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24 bg-muted/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
              Meet Our <span className="gradient-text">Expert Team</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Led by world-class researchers and engineers passionate about Web3 education
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <Card key={index} className="glass border-white/10 hover-lift text-center">
                <CardHeader>
                  <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center">
                    <span className="text-2xl font-bold text-white">
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <CardTitle className="text-lg">{member.name}</CardTitle>
                  <CardDescription className="text-primary font-medium">
                    {member.role}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-sm font-medium text-accent mb-2">{member.expertise}</div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {member.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
              Our Core <span className="gradient-text">Values</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              The principles that guide everything we do at ConnectSphere
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <Card key={index} className="glass border-white/10 hover-lift text-center">
                  <CardHeader>
                    <div className="w-16 h-16 mx-auto mb-4 rounded-xl bg-gradient-to-r from-primary to-secondary flex items-center justify-center glow-primary">
                      <Icon className="h-8 w-8 text-white" />
                    </div>
                    <CardTitle className="text-xl">{value.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="leading-relaxed">
                      {value.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section className="py-24 bg-gradient-to-r from-primary/5 to-secondary/5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
                Recognition & <span className="gradient-text">Achievements</span>
              </h2>
              <p className="text-xl text-muted-foreground">
                Our commitment to excellence has been recognized by the Web3 community
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {achievements.map((achievement, index) => (
                <div key={index} className="flex items-center space-x-3 p-4 rounded-lg glass border-white/10">
                  <div className="flex-shrink-0">
                    <Award className="h-6 w-6 text-accent" />
                  </div>
                  <span className="text-foreground font-medium">{achievement}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
              Get in <span className="gradient-text">Touch</span>
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Have questions about our platform or want to collaborate? We'd love to hear from you.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <Card className="glass border-white/10 hover-lift">
                <CardHeader className="text-center">
                  <Users className="h-8 w-8 text-primary mx-auto mb-2" />
                  <CardTitle>Community</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-muted-foreground mb-4">Join our Discord community</p>
                  <Button variant="outline" size="sm">
                    Join Discord
                  </Button>
                </CardContent>
              </Card>

              <Card className="glass border-white/10 hover-lift">
                <CardHeader className="text-center">
                  <BookOpen className="h-8 w-8 text-primary mx-auto mb-2" />
                  <CardTitle>Support</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-muted-foreground mb-4">Get help and documentation</p>
                  <Button variant="outline" size="sm">
                    Help Center
                  </Button>
                </CardContent>
              </Card>

              <Card className="glass border-white/10 hover-lift">
                <CardHeader className="text-center">
                  <TrendingUp className="h-8 w-8 text-primary mx-auto mb-2" />
                  <CardTitle>Business</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-muted-foreground mb-4">Partnership opportunities</p>
                  <Button variant="outline" size="sm">
                    Contact Sales
                  </Button>
                </CardContent>
              </Card>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="hero" size="xl" asChild>
                <Link to="/register">
                  Start Learning Today
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button variant="glass" size="xl" asChild>
                <Link to="/">
                  Back to Home
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About;