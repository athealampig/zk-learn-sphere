import { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FileUpload } from "@/components/proofs/FileUpload";
import { Shield, Zap, CheckCircle, ArrowLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useNotifications } from "@/hooks/useNotifications";

const ProofGenerate = () => {
  const navigate = useNavigate();
  const { showSuccess, showError } = useNotifications();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    circuit: '',
    publicInputs: '',
    privateInputs: ''
  });
  const [uploadedFiles, setUploadedFiles] = useState<any[]>([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Simulate proof generation
      await new Promise(resolve => setTimeout(resolve, 2000));
      showSuccess('Proof Generation Started', 'Your proof is being generated. You will be notified when it\'s ready.');
      navigate('/proofs');
    } catch (error) {
      showError('Generation Failed', 'Failed to start proof generation. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center space-x-4 mb-8">
            <Button variant="ghost" asChild>
              <Link to="/proofs">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Proofs
              </Link>
            </Button>
          </div>

          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center glow-primary">
                <Shield className="h-8 w-8 text-white" />
              </div>
            </div>
            <h1 className="text-4xl font-bold mb-4">Generate Zero-Knowledge Proof</h1>
            <p className="text-xl text-muted-foreground">
              Create privacy-preserving proofs of your achievements and knowledge
            </p>
          </div>

          <Card className="glass border-white/10">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Zap className="h-5 w-5 text-primary" />
                <span>Proof Configuration</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Proof Title</label>
                      <Input
                        placeholder="Enter proof title"
                        value={formData.title}
                        onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Circuit Type</label>
                      <Select value={formData.circuit} onValueChange={(value) => setFormData(prev => ({ ...prev, circuit: value }))}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select circuit type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="knowledge">Knowledge Proof</SelectItem>
                          <SelectItem value="achievement">Achievement Proof</SelectItem>
                          <SelectItem value="identity">Identity Proof</SelectItem>
                          <SelectItem value="custom">Custom Circuit</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Public Inputs</label>
                      <Textarea
                        placeholder="Enter public inputs as JSON..."
                        rows={4}
                        value={formData.publicInputs}
                        onChange={(e) => setFormData(prev => ({ ...prev, publicInputs: e.target.value }))}
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Description</label>
                      <Textarea
                        placeholder="Describe your proof..."
                        rows={3}
                        value={formData.description}
                        onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Private Inputs</label>
                      <Textarea
                        placeholder="Enter private inputs as JSON..."
                        rows={4}
                        value={formData.privateInputs}
                        onChange={(e) => setFormData(prev => ({ ...prev, privateInputs: e.target.value }))}
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Supporting Files</label>
                  <FileUpload
                    onUploadComplete={setUploadedFiles}
                    maxFiles={3}
                    acceptedTypes={['application/json', 'text/plain', 'application/pdf']}
                  />
                </div>

                <div className="bg-primary/10 border border-primary/20 rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <h4 className="font-medium text-primary mb-1">Privacy Guaranteed</h4>
                      <p className="text-sm text-muted-foreground">
                        Your private inputs will never leave your device. All proof generation 
                        happens client-side to ensure maximum privacy and security.
                      </p>
                    </div>
                  </div>
                </div>

                <Button type="submit" disabled={loading} className="w-full" size="lg">
                  {loading ? (
                    'Generating Proof...'
                  ) : (
                    <>
                      <Shield className="mr-2 h-5 w-5" />
                      Generate Proof
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default ProofGenerate;