import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import ProofCard from "@/components/proofs/ProofCard";
import ProofGenerator from "@/components/proofs/ProofGenerator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { mockProofs } from "@/lib/mockData";
import { ProofGenerationRequest, ProofStats } from "@/types/proof";
import { Shield, Plus, TrendingUp, CheckCircle, Clock, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ProofDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [isGenerating, setIsGenerating] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");

  // Mock stats - in real app this would come from API
  const proofStats: ProofStats = {
    totalProofs: mockProofs.length,
    verifiedProofs: mockProofs.filter(p => p.status === 'Verified').length,
    pendingProofs: mockProofs.filter(p => p.status === 'Pending' || p.status === 'Generating').length,
    failedProofs: mockProofs.filter(p => p.status === 'Failed').length
  };

  const recentProofs = mockProofs.slice(0, 3);

  const handleGenerateProof = async (request: ProofGenerationRequest) => {
    setIsGenerating(true);
    
    // Mock proof generation
    toast({
      title: "Proof Generation Started",
      description: "Your proof is being generated. This may take a few minutes.",
    });
    
    // Simulate generation time
    setTimeout(() => {
      setIsGenerating(false);
      toast({
        title: "Proof Generated Successfully!",
        description: "Your proof has been created and is being verified.",
      });
      // In real app, this would refresh the proofs list
    }, 3000);
  };

  const handleViewDetails = (proofId: string) => {
    navigate(`/proofs/${proofId}`);
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold gradient-text mb-2">Proof Dashboard</h1>
              <p className="text-muted-foreground">Generate and manage your zero-knowledge proofs</p>
            </div>
            <Button
              onClick={() => setActiveTab("generate")}
              className="flex items-center gap-2 bg-gradient-to-r from-primary to-secondary mt-4 sm:mt-0"
            >
              <Plus className="h-4 w-4" />
              Generate New Proof
            </Button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <Card className="glass border-white/20">
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                    <Shield className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Total Proofs</p>
                    <p className="text-2xl font-bold">{proofStats.totalProofs}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="glass border-white/20">
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center">
                    <CheckCircle className="h-5 w-5 text-green-400" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Verified</p>
                    <p className="text-2xl font-bold text-green-400">{proofStats.verifiedProofs}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="glass border-white/20">
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-yellow-500/20 flex items-center justify-center">
                    <Clock className="h-5 w-5 text-yellow-400" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Pending</p>
                    <p className="text-2xl font-bold text-yellow-400">{proofStats.pendingProofs}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="glass border-white/20">
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-red-500/20 flex items-center justify-center">
                    <AlertCircle className="h-5 w-5 text-red-400" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Failed</p>
                    <p className="text-2xl font-bold text-red-400">{proofStats.failedProofs}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="generate">Generate Proof</TabsTrigger>
              <TabsTrigger value="history">All Proofs</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              {/* Recent Proofs */}
              <Card className="glass border-white/20">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Recent Proofs</CardTitle>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => navigate('/proofs/history')}
                    >
                      View All
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  {recentProofs.length > 0 ? (
                    <div className="grid gap-4">
                      {recentProofs.map((proof) => (
                        <ProofCard
                          key={proof.id}
                          proof={proof}
                          onViewDetails={handleViewDetails}
                        />
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <Shield className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-lg font-semibold mb-2">No Proofs Yet</h3>
                      <p className="text-muted-foreground mb-4">
                        Generate your first zero-knowledge proof to get started.
                      </p>
                      <Button onClick={() => setActiveTab("generate")}>
                        <Plus className="h-4 w-4 mr-2" />
                        Generate Proof
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="glass border-white/20">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="h-5 w-5 text-primary" />
                      Proof Analytics
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Success Rate:</span>
                        <span className="font-semibold text-green-400">
                          {proofStats.totalProofs > 0 
                            ? Math.round((proofStats.verifiedProofs / proofStats.totalProofs) * 100)
                            : 0
                          }%
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Most Used Circuit:</span>
                        <Badge variant="outline">quiz_completion</Badge>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Avg. Generation Time:</span>
                        <span className="font-semibold">2.3 minutes</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="glass border-white/20">
                  <CardHeader>
                    <CardTitle>Integration Status</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">SP1 Prover:</span>
                        <Badge className="bg-green-500/20 text-green-400 border-green-500/50">
                          Connected
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Sui Network:</span>
                        <Badge className="bg-green-500/20 text-green-400 border-green-500/50">
                          Active
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">IPFS Storage:</span>
                        <Badge className="bg-green-500/20 text-green-400 border-green-500/50">
                          Available
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="generate">
              <ProofGenerator
                onGenerate={handleGenerateProof}
                isGenerating={isGenerating}
              />
            </TabsContent>

            <TabsContent value="history">
              <Card className="glass border-white/20">
                <CardHeader>
                  <CardTitle>All Proofs</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4">
                    {mockProofs.map((proof) => (
                      <ProofCard
                        key={proof.id}
                        proof={proof}
                        onViewDetails={handleViewDetails}
                      />
                    ))}
                  </div>
                  
                  <div className="text-center mt-8">
                    <Button
                      variant="outline"
                      onClick={() => navigate('/proofs/history')}
                    >
                      View Complete History
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
};

export default ProofDashboard;