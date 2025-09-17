import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const TermsOfService = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4">Terms of Service</h1>
            <p className="text-muted-foreground">Last updated: January 2024</p>
          </div>

          <Card className="glass border-white/10">
            <CardContent className="p-8 space-y-6">
              <section>
                <h2 className="text-2xl font-semibold mb-4">1. Acceptance of Terms</h2>
                <p className="text-muted-foreground leading-relaxed">
                  By accessing and using ConnectSphere, you accept and agree to be bound by the terms 
                  and provision of this agreement. If you do not agree to abide by the above, please 
                  do not use this service.
                </p>
              </section>

              <Separator />

              <section>
                <h2 className="text-2xl font-semibold mb-4">2. Use License</h2>
                <div className="text-muted-foreground leading-relaxed space-y-2">
                  <p>Permission is granted to temporarily access ConnectSphere for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:</p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>modify or copy the materials</li>
                    <li>use the materials for any commercial purpose or for any public display</li>
                    <li>attempt to reverse engineer any software contained on the platform</li>
                    <li>remove any copyright or other proprietary notations from the materials</li>
                  </ul>
                </div>
              </section>

              <Separator />

              <section>
                <h2 className="text-2xl font-semibold mb-4">3. Zero-Knowledge Proofs</h2>
                <p className="text-muted-foreground leading-relaxed">
                  ConnectSphere provides zero-knowledge proof generation services. Users retain ownership 
                  of their data and proofs. We do not store or have access to your private inputs used 
                  in proof generation. All proofs are generated client-side when possible.
                </p>
              </section>

              <Separator />

              <section>
                <h2 className="text-2xl font-semibold mb-4">4. User Accounts</h2>
                <p className="text-muted-foreground leading-relaxed">
                  You are responsible for maintaining the confidentiality of your account and password. 
                  You agree to accept responsibility for all activities that occur under your account.
                </p>
              </section>

              <Separator />

              <section>
                <h2 className="text-2xl font-semibold mb-4">5. Privacy Policy</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Your privacy is important to us. Please review our Privacy Policy, which also governs 
                  your use of the Service, to understand our practices.
                </p>
              </section>

              <Separator />

              <section>
                <h2 className="text-2xl font-semibold mb-4">6. Contact Information</h2>
                <p className="text-muted-foreground leading-relaxed">
                  If you have any questions about these Terms of Service, please contact us at legal@connectsphere.io
                </p>
              </section>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default TermsOfService;