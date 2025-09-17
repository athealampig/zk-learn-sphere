import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Shield, Eye, Database, Lock } from "lucide-react";

const PrivacyPolicy = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Privacy Policy</h1>
            <p className="text-xl text-muted-foreground">
              Your privacy is important to us. Learn how we collect, use, and protect your data.
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              Last updated: January 2024
            </p>
          </div>

          <div className="space-y-8">
            {/* Overview */}
            <Card className="glass border-white/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Overview
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>
                  ConnectSphere ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our Web3 learning platform and zero-knowledge proof services.
                </p>
                <p>
                  By using ConnectSphere, you agree to the collection and use of information in accordance with this policy. We will not use or share your information with anyone except as described in this Privacy Policy.
                </p>
              </CardContent>
            </Card>

            {/* Information We Collect */}
            <Card className="glass border-white/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="h-5 w-5" />
                  Information We Collect
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="font-semibold mb-3">Personal Information</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Email address and full name when you create an account</li>
                    <li>• Profile information you choose to provide</li>
                    <li>• Payment information for premium subscriptions (processed securely by Stripe)</li>
                    <li>• Communication preferences and support interactions</li>
                  </ul>
                </div>

                <Separator />

                <div>
                  <h3 className="font-semibold mb-3">Usage Information</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Quiz responses, scores, and completion data</li>
                    <li>• Learning progress and achievement data</li>
                    <li>• Zero-knowledge proof generation requests and metadata</li>
                    <li>• Platform usage analytics and interaction data</li>
                  </ul>
                </div>

                <Separator />

                <div>
                  <h3 className="font-semibold mb-3">Technical Information</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• IP address, browser type, and device information</li>
                    <li>• Cookies and similar tracking technologies</li>
                    <li>• Log files and error reports</li>
                    <li>• Blockchain transaction hashes (publicly visible on Sui network)</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* How We Use Your Information */}
            <Card className="glass border-white/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Eye className="h-5 w-5" />
                  How We Use Your Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>We use the collected information for the following purposes:</p>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-2">Platform Services</h4>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li>• Provide access to quizzes and learning content</li>
                      <li>• Generate and verify zero-knowledge proofs</li>
                      <li>• Track learning progress and achievements</li>
                      <li>• Process payments for premium features</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Communication & Support</h4>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li>• Send important account and service updates</li>
                      <li>• Provide customer support and assistance</li>
                      <li>• Send educational content and platform news</li>
                      <li>• Respond to your inquiries and feedback</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Zero-Knowledge Proofs & Privacy */}
            <Card className="glass border-white/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lock className="h-5 w-5" />
                  Zero-Knowledge Proofs & Privacy
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>
                  Our zero-knowledge proof system is designed to maximize your privacy:
                </p>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• <strong>Privacy-Preserving:</strong> Proofs verify your achievements without revealing personal information</li>
                  <li>• <strong>Blockchain Transparency:</strong> Only proof hashes and verification keys are stored on-chain</li>
                  <li>• <strong>Data Minimization:</strong> We only include necessary data in proof generation</li>
                  <li>• <strong>User Control:</strong> You choose what to prove and when to share proofs</li>
                  <li>• <strong>Cryptographic Security:</strong> All proofs use state-of-the-art cryptographic techniques</li>
                </ul>
              </CardContent>
            </Card>

            {/* Information Sharing */}
            <Card className="glass border-white/20">
              <CardHeader>
                <CardTitle>Information Sharing and Disclosure</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>We do not sell, trade, or rent your personal information to third parties. We may share your information only in the following circumstances:</p>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• <strong>Service Providers:</strong> With trusted third-party services (Stripe for payments, hosting providers)</li>
                  <li>• <strong>Legal Requirements:</strong> When required by law or to protect our rights and users</li>
                  <li>• <strong>Business Transfers:</strong> In case of merger, acquisition, or asset sale (with user notification)</li>
                  <li>• <strong>Consent:</strong> When you explicitly consent to sharing specific information</li>
                </ul>
              </CardContent>
            </Card>

            {/* Data Security */}
            <Card className="glass border-white/20">
              <CardHeader>
                <CardTitle>Data Security</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>We implement robust security measures to protect your information:</p>
                <div className="grid md:grid-cols-2 gap-6">
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• End-to-end encryption for sensitive data</li>
                    <li>• Secure data transmission using HTTPS</li>
                    <li>• Regular security audits and updates</li>
                    <li>• Limited access controls for our team</li>
                  </ul>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Password hashing and secure authentication</li>
                    <li>• Regular backups with encryption</li>
                    <li>• Monitoring for unauthorized access</li>
                    <li>• Compliance with industry standards</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Your Rights */}
            <Card className="glass border-white/20">
              <CardHeader>
                <CardTitle>Your Rights and Choices</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>You have the following rights regarding your personal information:</p>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• <strong>Access:</strong> Request a copy of your personal data</li>
                  <li>• <strong>Correction:</strong> Update or correct inaccurate information</li>
                  <li>• <strong>Deletion:</strong> Request deletion of your account and data</li>
                  <li>• <strong>Portability:</strong> Export your data in a common format</li>
                  <li>• <strong>Opt-out:</strong> Unsubscribe from marketing communications</li>
                  <li>• <strong>Restrict Processing:</strong> Limit how we use your information</li>
                </ul>
                <p className="text-sm">
                  To exercise these rights, contact us at privacy@connectsphere.com
                </p>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <Card className="glass border-white/20">
              <CardHeader>
                <CardTitle>Contact Us</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>If you have questions about this Privacy Policy or our data practices, please contact us:</p>
                <div className="space-y-2 text-muted-foreground">
                  <p>Email: privacy@connectsphere.com</p>
                  <p>Address: ConnectSphere Privacy Team</p>
                  <p>Response time: We aim to respond within 48 hours</p>
                </div>
                <p className="text-sm text-muted-foreground mt-4">
                  This Privacy Policy may be updated periodically. We will notify users of significant changes via email or platform notifications.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PrivacyPolicy;