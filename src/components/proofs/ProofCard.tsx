import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Proof } from "@/types/proof";
import { 
  Shield, 
  CheckCircle, 
  Clock, 
  AlertCircle, 
  Download, 
  Share2, 
  ExternalLink,
  Copy
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ProofCardProps {
  proof: Proof;
  onViewDetails?: (proofId: string) => void;
  showActions?: boolean;
}

const ProofCard = ({ proof, onViewDetails, showActions = true }: ProofCardProps) => {
  const { toast } = useToast();

  const getStatusIcon = (status: Proof['status']) => {
    switch (status) {
      case 'Verified':
        return <CheckCircle className="h-5 w-5 text-green-400" />;
      case 'Generating':
        return <Clock className="h-5 w-5 text-yellow-400 animate-spin" />;
      case 'Pending':
        return <Clock className="h-5 w-5 text-blue-400" />;
      case 'Failed':
        return <AlertCircle className="h-5 w-5 text-red-400" />;
      default:
        return <Shield className="h-5 w-5 text-muted-foreground" />;
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

  const handleCopyHash = () => {
    if (proof.blockchainHash) {
      navigator.clipboard.writeText(proof.blockchainHash);
      toast({
        title: "Copied!",
        description: "Blockchain hash copied to clipboard.",
      });
    }
  };

  const handleShare = () => {
    const shareText = `Check out my verified proof: ${proof.title}`;
    if (navigator.share) {
      navigator.share({
        title: proof.title,
        text: shareText,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(shareText);
      toast({
        title: "Copied!",
        description: "Proof details copied to clipboard.",
      });
    }
  };

  const handleDownload = () => {
    // Mock download functionality
    toast({
      title: "Download Started",
      description: "Proof file is being downloaded...",
    });
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <Card className="glass border-white/20 hover:border-white/30 transition-all duration-300 hover-lift">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg mb-2">{proof.title}</CardTitle>
            <p className="text-sm text-muted-foreground mb-3">
              {proof.description}
            </p>
            <div className="flex items-center gap-2">
              <Badge className={getStatusColor(proof.status)}>
                {getStatusIcon(proof.status)}
                <span className="ml-1">{proof.status}</span>
              </Badge>
              <Badge variant="outline" className="text-xs">
                {proof.metadata.circuit}
              </Badge>
            </div>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Metadata */}
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-muted-foreground">Created</p>
            <p className="font-medium">{formatDate(proof.createdAt)}</p>
          </div>
          {proof.verifiedAt && (
            <div>
              <p className="text-muted-foreground">Verified</p>
              <p className="font-medium">{formatDate(proof.verifiedAt)}</p>
            </div>
          )}
          <div>
            <p className="text-muted-foreground">Constraints</p>
            <p className="font-medium">{proof.metadata.constraints.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Verification Key</p>
            <p className="font-mono text-xs truncate">{proof.verificationKey}</p>
          </div>
        </div>

        {/* Blockchain Info */}
        {proof.blockchainHash && (
          <div className="p-3 rounded-lg bg-muted/30 border border-white/10">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="text-xs text-muted-foreground mb-1">Blockchain Hash</p>
                <p className="font-mono text-sm truncate">{proof.blockchainHash}</p>
              </div>
              <Button
                size="sm"
                variant="ghost"
                onClick={handleCopyHash}
                className="ml-2"
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>
            {proof.suiTransaction && (
              <div className="mt-2">
                <p className="text-xs text-muted-foreground mb-1">Sui Transaction</p>
                <p className="font-mono text-sm truncate">{proof.suiTransaction}</p>
              </div>
            )}
          </div>
        )}

        {/* Actions */}
        {showActions && (
          <div className="flex gap-2 pt-2">
            {onViewDetails && (
              <Button
                size="sm"
                variant="outline"
                onClick={() => onViewDetails(proof.id)}
                className="flex items-center gap-2"
              >
                <ExternalLink className="h-4 w-4" />
                View Details
              </Button>
            )}
            
            {proof.status === 'Verified' && (
              <>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={handleDownload}
                  className="flex items-center gap-2"
                >
                  <Download className="h-4 w-4" />
                  Download
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={handleShare}
                  className="flex items-center gap-2"
                >
                  <Share2 className="h-4 w-4" />
                  Share
                </Button>
              </>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ProofCard;