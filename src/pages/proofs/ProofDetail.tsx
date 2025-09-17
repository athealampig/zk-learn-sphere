import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Proof } from "@/types/proof";
import api from "@/services/api";
import { 
  ArrowLeft, 
  Download, 
  Share2, 
  Copy, 
  ExternalLink,
  Shield,
  Clock,
  CheckCircle,
  AlertCircle,
  XCircle
} from "lucide-react";
import { format } from "date-fns";
import { toast } from "@/hooks/use-toast";

const ProofDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data: proof, isLoading } = useQuery<Proof>({
    queryKey: ['proof', id],
    queryFn: async () => {
      const response = await api.get(`/proofs/${id}`);
      return response.data;
    },
    enabled: !!id,
  });

  const getStatusIcon = (status: Proof['status']) => {
    switch (status) {
      case 'Verified':
        return <CheckCircle className="h-5 w-5 text-green-400" />;
      case 'Generating':
        return <Clock className="h-5 w-5 text-yellow-400" />;
      case 'Pending':
        return <AlertCircle className="h-5 w-5 text-blue-400" />;
      case 'Failed':
        return <XCircle className="h-5 w-5 text-red-400" />;
      default:
        return <Shield className="h-5 w-5" />;
    }
  };

  const getStatusColor = (status: Proof['status']) => {
    switch (status) {
      case 'Verified':
        return 'bg-green-500/20 text-green-400 border-green-500/50';
      case 'Generating':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/50';
      case 'Pending':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/50';
      case 'Failed':
        return 'bg-red-500/20 text-red-400 border-red-500/50';
      default:
        return 'bg-muted/20 text-muted-foreground border-muted/50';
    }
  };

  const handleDownload = () => {
    if (proof?.proofFile) {
      window.open(proof.proofFile, '_blank');
    } else {
      toast({
        title: "Download unavailable",
        description: "Proof file is not ready for download yet.",
        variant: "destructive",
      });
    }
  };

  const handleCopyHash = () => {
    if (proof?.blockchainHash) {
      navigator.clipboard.writeText(proof.blockchainHash);
      toast({
        title: "Copied to clipboard",
        description: "Blockchain hash has been copied to your clipboard.",
      });
    }
  };

  const handleCopyVerificationKey = () => {
    if (proof?.verificationKey) {
      navigator.clipboard.writeText(proof.verificationKey);
      toast({
        title: "Copied to clipboard",
        description: "Verification key has been copied to your clipboard.",
      });
    }
  };

  const handleShare = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url);
    toast({
      title: "Link copied",
      description: "Proof link has been copied to your clipboard.",
    });
  };

  const handleViewOnBlockchain = () => {
    if (proof?.suiTransaction) {
      window.open(`https://suiscan.xyz/mainnet/tx/${proof.suiTransaction}`, '_blank');
    }
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-muted rounded w-1/4"></div>
            <div className="h-96 bg-muted rounded"></div>
          </div>
        </div>
      </Layout>
    );
  }

  if (!proof) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Proof not found</h1>
            <Button onClick={() => navigate('/proofs')}>
              Back to Proofs
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-4 mb-8">
            <Button
              variant="ghost"
              onClick={() => navigate('/proofs')}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Proofs
            </Button>
          </div>

          <div className="space-y-6">
            {/* Proof Header */}
            <Card className="glass border-white/20">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-2xl mb-2">{proof.title}</CardTitle>
                    <p className="text-muted-foreground">{proof.description}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    {getStatusIcon(proof.status)}
                    <Badge
                      variant="outline"
                      className={getStatusColor(proof.status)}
                    >
                      {proof.status}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <div>
                      <span className="text-sm text-muted-foreground">Created</span>
                      <p className="font-medium">
                        {format(new Date(proof.createdAt), 'MMM dd, yyyy HH:mm')}
                      </p>
                    </div>
                    
                    {proof.verifiedAt && (
                      <div>
                        <span className="text-sm text-muted-foreground">Verified</span>
                        <p className="font-medium">
                          {format(new Date(proof.verifiedAt), 'MMM dd, yyyy HH:mm')}
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="space-y-3">
                    <div>
                      <span className="text-sm text-muted-foreground">Circuit</span>
                      <p className="font-medium">{proof.metadata.circuit}</p>
                    </div>
                    
                    <div>
                      <span className="text-sm text-muted-foreground">Constraints</span>
                      <p className="font-medium">{proof.metadata.constraints.toLocaleString()}</p>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3">
                  {proof.proofFile && (
                    <Button onClick={handleDownload} className="flex items-center gap-2">
                      <Download className="h-4 w-4" />
                      Download Proof
                    </Button>
                  )}
                  
                  <Button
                    variant="outline"
                    onClick={handleShare}
                    className="flex items-center gap-2"
                  >
                    <Share2 className="h-4 w-4" />
                    Share
                  </Button>
                  
                  {proof.suiTransaction && (
                    <Button
                      variant="outline"
                      onClick={handleViewOnBlockchain}
                      className="flex items-center gap-2"
                    >
                      <ExternalLink className="h-4 w-4" />
                      View on Sui
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Verification Details */}
            <Card className="glass border-white/20">
              <CardHeader>
                <CardTitle>Verification Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {proof.blockchainHash && (
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-muted-foreground">Blockchain Hash</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleCopyHash}
                        className="flex items-center gap-1"
                      >
                        <Copy className="h-3 w-3" />
                        Copy
                      </Button>
                    </div>
                    <p className="font-mono text-sm bg-muted/50 p-2 rounded border">
                      {proof.blockchainHash}
                    </p>
                  </div>
                )}

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-muted-foreground">Verification Key</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleCopyVerificationKey}
                      className="flex items-center gap-1"
                    >
                      <Copy className="h-3 w-3" />
                      Copy
                    </Button>
                  </div>
                  <p className="font-mono text-sm bg-muted/50 p-2 rounded border">
                    {proof.verificationKey}
                  </p>
                </div>

                {proof.suiTransaction && (
                  <div>
                    <span className="text-sm text-muted-foreground">Sui Transaction</span>
                    <p className="font-mono text-sm bg-muted/50 p-2 rounded border">
                      {proof.suiTransaction}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Public Inputs */}
            {proof.metadata.publicInputs && Object.keys(proof.metadata.publicInputs).length > 0 && (
              <Card className="glass border-white/20">
                <CardHeader>
                  <CardTitle>Public Inputs</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {Object.entries(proof.metadata.publicInputs).map(([key, value]) => (
                      <div key={key}>
                        <span className="text-sm text-muted-foreground">{key}</span>
                        <p className="font-mono text-sm bg-muted/50 p-2 rounded border">
                          {JSON.stringify(value, null, 2)}
                        </p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProofDetail;