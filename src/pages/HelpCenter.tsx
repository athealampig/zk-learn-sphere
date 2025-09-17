import { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  MessageCircle, 
  BookOpen, 
  Shield, 
  CreditCard,
  HelpCircle,
  ExternalLink
} from "lucide-react";

const HelpCenter = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const categories = [
    {
      id: "getting-started",
      title: "Getting Started",
      description: "Learn the basics of ConnectSphere",
      icon: BookOpen,
      color: "bg-blue-500/20 text-blue-400 border-blue-500/50"
    },
    {
      id: "quizzes",
      title: "Quizzes & Learning",
      description: "How to take quizzes and track progress",
      icon: HelpCircle,
      color: "bg-green-500/20 text-green-400 border-green-500/50"
    },
    {
      id: "proofs",
      title: "Zero-Knowledge Proofs",
      description: "Understanding proof generation",
      icon: Shield,
      color: "bg-purple-500/20 text-purple-400 border-purple-500/50"
    },
    {
      id: "billing",
      title: "Billing & Payments",
      description: "Subscription and payment help",
      icon: CreditCard,
      color: "bg-yellow-500/20 text-yellow-400 border-yellow-500/50"
    }
  ];

  const faqs = [
    {
      category: "getting-started",
      question: "How do I create an account?",
      answer: "Click the 'Register' button in the top right corner, fill in your details, and verify your email address. You can also sign up using your Google or GitHub account for faster registration."
    },
    {
      category: "getting-started",
      question: "What is ConnectSphere?",
      answer: "ConnectSphere is a Web3 learning platform that combines interactive quizzes with zero-knowledge proof generation. Learn about blockchain, cryptography, and Web3 technologies while earning achievements and generating verifiable proofs of your knowledge."
    },
    {
      category: "quizzes",
      question: "How do I take a quiz?",
      answer: "Navigate to the Quizzes page, select a quiz that matches your skill level, and click 'Start Quiz'. You'll have a set amount of time to complete the questions. Your progress is automatically saved."
    },
    {
      category: "quizzes",
      question: "Can I retake a quiz?",
      answer: "Yes! You can retake any quiz to improve your score. Your best score will be recorded, and you'll earn additional XP for improvements."
    },
    {
      category: "quizzes",
      question: "What are XP points and achievements?",
      answer: "XP (Experience Points) are earned by completing quizzes and generating proofs. Achievements are special rewards for reaching milestones, maintaining streaks, or demonstrating expertise in specific topics."
    },
    {
      category: "proofs",
      question: "What are zero-knowledge proofs?",
      answer: "Zero-knowledge proofs allow you to prove you know something without revealing the actual information. In ConnectSphere, you can generate proofs of your quiz completions and achievements without exposing your personal data."
    },
    {
      category: "proofs",
      question: "How do I generate a proof?",
      answer: "Go to the Proofs section and click 'Generate New Proof'. Select what you want to prove (quiz completion, achievement, etc.), and our system will create a cryptographic proof that can be verified on the blockchain."
    },
    {
      category: "proofs",
      question: "What is SP1-SUI integration?",
      answer: "SP1-SUI is our zero-knowledge proof system built on the Sui blockchain. It ensures your proofs are verifiable, immutable, and can be shared publicly while maintaining your privacy."
    },
    {
      category: "billing",
      question: "What's included in the free plan?",
      answer: "The free plan includes access to basic quizzes, limited proof generation (3 per month), and basic achievements. You can upgrade to Premium for unlimited access and advanced features."
    },
    {
      category: "billing",
      question: "How do I upgrade to Premium?",
      answer: "Visit the Subscription page in your account settings, choose a plan that fits your needs, and complete the payment process. Premium features are activated immediately."
    },
    {
      category: "billing",
      question: "Can I cancel my subscription anytime?",
      answer: "Yes, you can cancel your subscription at any time. Your premium features will remain active until the end of your current billing cycle."
    }
  ];

  const filteredFaqs = faqs.filter(faq =>
    faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Help Center</h1>
            <p className="text-xl text-muted-foreground mb-8">
              Find answers to common questions and get help with ConnectSphere
            </p>
            
            {/* Search */}
            <div className="relative max-w-md mx-auto mb-8">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search for help..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Categories */}
          {!searchTerm && (
            <div className="grid md:grid-cols-2 gap-6 mb-12">
              {categories.map((category) => (
                <Card key={category.id} className="glass border-white/20 hover:border-white/30 transition-colors cursor-pointer">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <div className={`p-3 rounded-lg ${category.color}`}>
                        <category.icon className="h-6 w-6" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">{category.title}</h3>
                        <p className="text-muted-foreground">{category.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {/* FAQ Section */}
          <Card className="glass border-white/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <HelpCircle className="h-5 w-5" />
                Frequently Asked Questions
                {searchTerm && (
                  <Badge variant="secondary">
                    {filteredFaqs.length} results
                  </Badge>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {filteredFaqs.length === 0 ? (
                <div className="text-center py-8">
                  <Search className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="text-lg font-semibold mb-2">No results found</h3>
                  <p className="text-muted-foreground">
                    Try adjusting your search terms or browse by category
                  </p>
                </div>
              ) : (
                <Accordion type="single" collapsible className="space-y-2">
                  {filteredFaqs.map((faq, index) => (
                    <AccordionItem key={index} value={`faq-${index}`} className="border border-white/10 rounded-lg px-4">
                      <AccordionTrigger className="text-left hover:no-underline">
                        <div className="flex items-center gap-3">
                          {!searchTerm && (
                            <Badge variant="outline" className="text-xs">
                              {categories.find(c => c.id === faq.category)?.title}
                            </Badge>
                          )}
                          <span>{faq.question}</span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              )}
            </CardContent>
          </Card>

          {/* Contact Support */}
          <Card className="glass border-white/20 mt-8">
            <CardContent className="p-8 text-center">
              <MessageCircle className="h-16 w-16 mx-auto mb-4 text-primary" />
              <h3 className="text-xl font-semibold mb-2">Still need help?</h3>
              <p className="text-muted-foreground mb-6">
                Can't find what you're looking for? Our support team is here to help.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="flex items-center gap-2">
                  <MessageCircle className="h-4 w-4" />
                  Contact Support
                </Button>
                <Button variant="outline" className="flex items-center gap-2">
                  <ExternalLink className="h-4 w-4" />
                  Community Forum
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default HelpCenter;