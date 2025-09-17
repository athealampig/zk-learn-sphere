export interface Proof {
  id: string;
  title: string;
  description: string;
  status: 'Pending' | 'Generating' | 'Verified' | 'Failed';
  createdAt: string;
  verifiedAt?: string;
  blockchainHash?: string;
  proofFile?: string;
  verificationKey: string;
  suiTransaction?: string;
  metadata: {
    circuit: string;
    publicInputs: Record<string, any>;
    constraints: number;
  };
}

export interface ProofGenerationRequest {
  circuit: string;
  publicInputs: Record<string, any>;
  privateInputs: Record<string, any>;
  title: string;
  description: string;
}

export interface ProofStats {
  totalProofs: number;
  verifiedProofs: number;
  pendingProofs: number;
  failedProofs: number;
}