import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import ProofCard from "@/components/proofs/ProofCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { mockProofs } from "@/lib/mockData";
import { Proof } from "@/types/proof";
import { Search, Filter, Download, Shield, Calendar, TrendingUp } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ProofHistory = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [circuitFilter, setCircuitFilter] = useState("all");
  const [sortBy, setSortBy] = useState("date");

  // Extended mock data for demonstration
  const extendedProofs: Proof[] = [
    ...mockProofs,
    {
      id: '3',
      title: 'Achievement Verification',
      description: 'Proof of earning Expert Badge',
      status: 'Failed',
      createdAt: '2024-01-12T08:15:00Z',
      verificationKey: 'vk_3456789012',
      metadata: {
        circuit: 'achievement_unlock',
        publicInputs: { achievementId: 'expert_badge', level: 5 },
        constraints: 256
      }
    },
    {
      id: '4',
      title: 'Score Threshold Proof',
      description: 'Proof of achieving minimum score requirements',
      status: 'Pending',
      createdAt: '2024-01-08T16:30:00Z',
      verificationKey: 'vk_4567890123',
      metadata: {
        circuit: 'score_verification',
        publicInputs: { threshold: 90, category: 'ZK' },
        constraints: 2048
      }
    }
  ];

  const filteredProofs = extendedProofs
    .filter(proof => {
      const matchesSearch = proof.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           proof.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === 'all' || proof.status === statusFilter;
      const matchesCircuit = circuitFilter === 'all' || proof.metadata.circuit === circuitFilter;
      return matchesSearch && matchesStatus && matchesCircuit;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'title':
          return a.title.localeCompare(b.title);
        case 'status':
          return a.status.localeCompare(b.status);
        case 'circuit':
          return a.metadata.circuit.localeCompare(b.metadata.circuit);
        default:
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
    });

  const statusCounts = {
    all: extendedProofs.length,
    Verified: extendedProofs.filter(p => p.status === 'Verified').length,
    Pending: extendedProofs.filter(p => p.status === 'Pending').length,
    Generating: extendedProofs.filter(p => p.status === 'Generating').length,
    Failed: extendedProofs.filter(p => p.status === 'Failed').length
  };

  const circuitTypes = [...new Set(extendedProofs.map(p => p.metadata.circuit))];

  const handleViewDetails = (proofId: string) => {
    navigate(`/proofs/${proofId}`);
  };

  const handleExport = () => {
    toast({
      title: "Export Started",
      description: "Your proof history is being exported...",
    });
    
    setTimeout(() => {
      toast({
        title: "Export Complete",
        description: "Proof history exported successfully.",
      });
    }, 2000);
  };

  const clearFilters = () => {
    setSearchTerm("");
    setStatusFilter("all");
    setCircuitFilter("all");
    setSortBy("date");
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold gradient-text mb-2">Proof History</h1>
              <p className="text-muted-foreground">Manage and track all your zero-knowledge proofs</p>
            </div>
            <div className="flex gap-2 mt-4 sm:mt-0">
              <Button
                onClick={() => navigate('/proofs')}
                variant="outline"
                className="flex items-center gap-2"
              >
                <Shield className="h-4 w-4" />
                Dashboard
              </Button>
              <Button onClick={handleExport} className="flex items-center gap-2">
                <Download className="h-4 w-4" />
                Export
              </Button>
            </div>
          </div>

          {/* Status Overview */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
            {Object.entries(statusCounts).map(([status, count]) => (
              <Card 
                key={status} 
                className={`glass border-white/20 cursor-pointer transition-all duration-300 hover:border-white/30 ${
                  statusFilter === status ? 'ring-2 ring-primary' : ''
                }`}
                onClick={() => setStatusFilter(status)}
              >
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold mb-1">{count}</div>
                  <div className="text-sm text-muted-foreground capitalize">
                    {status === 'all' ? 'Total' : status}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Filters */}
          <Card className="glass border-white/20 mb-6">
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search proofs..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-9"
                    />
                  </div>
                </div>
                
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-full lg:w-48">
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="Verified">Verified</SelectItem>
                    <SelectItem value="Pending">Pending</SelectItem>
                    <SelectItem value="Generating">Generating</SelectItem>
                    <SelectItem value="Failed">Failed</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={circuitFilter} onValueChange={setCircuitFilter}>
                  <SelectTrigger className="w-full lg:w-48">
                    <SelectValue placeholder="Circuit Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Circuits</SelectItem>
                    {circuitTypes.map((circuit) => (
                      <SelectItem key={circuit} value={circuit}>
                        {circuit.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-full lg:w-48">
                    <Calendar className="h-4 w-4 mr-2" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="date">Sort by Date</SelectItem>
                    <SelectItem value="title">Sort by Title</SelectItem>
                    <SelectItem value="status">Sort by Status</SelectItem>
                    <SelectItem value="circuit">Sort by Circuit</SelectItem>
                  </SelectContent>
                </Select>

                {(searchTerm || statusFilter !== 'all' || circuitFilter !== 'all' || sortBy !== 'date') && (
                  <Button variant="outline" onClick={clearFilters}>
                    Clear Filters
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Results */}
          <Card className="glass border-white/20">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>
                  Proofs ({filteredProofs.length})
                </CardTitle>
                {filteredProofs.length > 0 && (
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">
                      {Math.round((statusCounts.Verified / statusCounts.all) * 100)}% success rate
                    </span>
                  </div>
                )}
              </div>
            </CardHeader>
            <CardContent>
              {filteredProofs.length > 0 ? (
                <div className="grid gap-6">
                  {filteredProofs.map((proof) => (
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
                  <h3 className="text-lg font-semibold mb-2">No Proofs Found</h3>
                  <p className="text-muted-foreground mb-6">
                    {searchTerm || statusFilter !== 'all' || circuitFilter !== 'all'
                      ? 'Try adjusting your search criteria or filters'
                      : 'You haven\'t generated any proofs yet'
                    }
                  </p>
                  <div className="flex justify-center gap-4">
                    {(searchTerm || statusFilter !== 'all' || circuitFilter !== 'all') && (
                      <Button variant="outline" onClick={clearFilters}>
                        Clear Filters
                      </Button>
                    )}
                    <Button onClick={() => navigate('/proofs')}>
                      {extendedProofs.length === 0 ? 'Generate First Proof' : 'Back to Dashboard'}
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default ProofHistory;