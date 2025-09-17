import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { ProofGenerationRequest } from "@/types/proof";
import { Shield, Zap, Code, Settings, Upload } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ProofGeneratorProps {
  onGenerate?: (request: ProofGenerationRequest) => void;
  isGenerating?: boolean;
}

const ProofGenerator = ({ onGenerate, isGenerating = false }: ProofGeneratorProps) => {
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    circuit: 'quiz_completion',
    publicInputs: '{}',
    privateInputs: '{}'
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const circuits = [
    { value: 'quiz_completion', label: 'Quiz Completion', description: 'Prove quiz completion without revealing answers' },
    { value: 'achievement_unlock', label: 'Achievement Unlock', description: 'Prove achievement criteria met' },
    { value: 'score_verification', label: 'Score Verification', description: 'Verify minimum score threshold' },
    { value: 'custom', label: 'Custom Circuit', description: 'Upload your own circuit definition' }
  ];

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }

    try {
      JSON.parse(formData.publicInputs);
    } catch {
      newErrors.publicInputs = 'Invalid JSON format';
    }

    try {
      JSON.parse(formData.privateInputs);
    } catch {
      newErrors.privateInputs = 'Invalid JSON format';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast({
        title: "Validation Error",
        description: "Please fix the errors in the form.",
        variant: "destructive"
      });
      return;
    }

    const request: ProofGenerationRequest = {
      title: formData.title,
      description: formData.description,
      circuit: formData.circuit,
      publicInputs: JSON.parse(formData.publicInputs),
      privateInputs: JSON.parse(formData.privateInputs)
    };

    onGenerate?.(request);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const selectedCircuit = circuits.find(c => c.value === formData.circuit);

  return (
    <Card className="glass border-white/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="h-5 w-5 text-primary" />
          Generate New Proof
        </CardTitle>
      </CardHeader>
      
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <div className="space-y-4">
            <div>
              <Label htmlFor="title">Proof Title</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                placeholder="Enter a descriptive title for your proof"
                className={errors.title ? 'border-red-500' : ''}
              />
              {errors.title && (
                <p className="text-sm text-red-400 mt-1">{errors.title}</p>
              )}
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                placeholder="Describe what this proof demonstrates"
                className={errors.description ? 'border-red-500' : ''}
              />
              {errors.description && (
                <p className="text-sm text-red-400 mt-1">{errors.description}</p>
              )}
            </div>
          </div>

          {/* Circuit Selection */}
          <div>
            <Label>Circuit Type</Label>
            <Select value={formData.circuit} onValueChange={(value) => handleInputChange('circuit', value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {circuits.map((circuit) => (
                  <SelectItem key={circuit.value} value={circuit.value}>
                    <div className="flex flex-col">
                      <span>{circuit.label}</span>
                      <span className="text-xs text-muted-foreground">{circuit.description}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            {selectedCircuit && (
              <div className="mt-2 p-3 rounded-lg bg-muted/30 border border-white/10">
                <div className="flex items-center gap-2 mb-2">
                  <Code className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium">{selectedCircuit.label}</span>
                </div>
                <p className="text-xs text-muted-foreground">{selectedCircuit.description}</p>
              </div>
            )}
          </div>

          {/* Input Configuration */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="publicInputs">Public Inputs (JSON)</Label>
              <Textarea
                id="publicInputs"
                value={formData.publicInputs}
                onChange={(e) => handleInputChange('publicInputs', e.target.value)}
                placeholder='{"example": "value"}'
                className={`font-mono text-sm ${errors.publicInputs ? 'border-red-500' : ''}`}
                rows={4}
              />
              {errors.publicInputs && (
                <p className="text-sm text-red-400 mt-1">{errors.publicInputs}</p>
              )}
              <p className="text-xs text-muted-foreground mt-1">
                Data that will be publicly verifiable
              </p>
            </div>

            <div>
              <Label htmlFor="privateInputs">Private Inputs (JSON)</Label>
              <Textarea
                id="privateInputs"
                value={formData.privateInputs}
                onChange={(e) => handleInputChange('privateInputs', e.target.value)}
                placeholder='{"secret": "data"}'
                className={`font-mono text-sm ${errors.privateInputs ? 'border-red-500' : ''}`}
                rows={4}
              />
              {errors.privateInputs && (
                <p className="text-sm text-red-400 mt-1">{errors.privateInputs}</p>
              )}
              <p className="text-xs text-muted-foreground mt-1">
                Private data used in proof generation
              </p>
            </div>
          </div>

          {/* Generation Options */}
          <div className="p-4 rounded-lg bg-blue-500/10 border border-blue-500/20">
            <div className="flex items-center gap-2 mb-2">
              <Settings className="h-4 w-4 text-blue-400" />
              <span className="text-sm font-medium text-blue-400">Generation Settings</span>
            </div>
            <div className="grid grid-cols-2 gap-4 text-xs">
              <div>
                <span className="text-muted-foreground">Proving System:</span>
                <Badge className="ml-2 bg-primary/20 text-primary">SP1</Badge>
              </div>
              <div>
                <span className="text-muted-foreground">Target Chain:</span>
                <Badge className="ml-2 bg-secondary/20 text-secondary">Sui Network</Badge>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-primary to-secondary"
            disabled={isGenerating}
          >
            {isGenerating ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                Generating Proof...
              </>
            ) : (
              <>
                <Zap className="h-4 w-4 mr-2" />
                Generate Proof
              </>
            )}
          </Button>

          {/* Info Banner */}
          <div className="p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
            <p className="text-xs text-yellow-400">
              <strong>Note:</strong> Proof generation may take several minutes depending on circuit complexity. 
              You'll receive a notification when the proof is ready.
            </p>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default ProofGenerator;