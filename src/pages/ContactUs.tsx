import { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Mail, MapPin, Phone, Send } from "lucide-react";
import { useNotifications } from "@/hooks/useNotifications";

const ContactUs = () => {
  const { showSuccess, showError } = useNotifications();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    category: '',
    message: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      showSuccess('Message Sent', 'Thank you for contacting us. We\'ll get back to you soon!');
      setFormData({ name: '', email: '', subject: '', category: '', message: '' });
    } catch (error) {
      showError('Failed to Send', 'Please try again later');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Get in Touch</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Have questions about ConnectSphere? We're here to help you on your Web3 learning journey.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Contact Information */}
            <div className="space-y-6">
              <Card className="glass border-white/10">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <Mail className="h-5 w-5 text-primary" />
                    <h3 className="font-semibold">Email Us</h3>
                  </div>
                  <p className="text-muted-foreground">support@connectsphere.io</p>
                </CardContent>
              </Card>

              <Card className="glass border-white/10">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <Phone className="h-5 w-5 text-primary" />
                    <h3 className="font-semibold">Call Us</h3>
                  </div>
                  <p className="text-muted-foreground">+1 (555) 123-4567</p>
                </CardContent>
              </Card>

              <Card className="glass border-white/10">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <MapPin className="h-5 w-5 text-primary" />
                    <h3 className="font-semibold">Visit Us</h3>
                  </div>
                  <p className="text-muted-foreground">
                    123 Web3 Street<br />
                    Crypto Valley, CV 12345
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <Card className="glass border-white/10">
                <CardHeader>
                  <CardTitle>Send us a Message</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Input
                          placeholder="Your Name"
                          value={formData.name}
                          onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                          required
                        />
                      </div>
                      <div>
                        <Input
                          type="email"
                          placeholder="Your Email"
                          value={formData.email}
                          onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                          required
                        />
                      </div>
                    </div>
                    
                    <div>
                      <Input
                        placeholder="Subject"
                        value={formData.subject}
                        onChange={(e) => setFormData(prev => ({ ...prev, subject: e.target.value }))}
                        required
                      />
                    </div>

                    <div>
                      <Select value={formData.category} onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="general">General Inquiry</SelectItem>
                          <SelectItem value="technical">Technical Support</SelectItem>
                          <SelectItem value="billing">Billing Question</SelectItem>
                          <SelectItem value="feedback">Feedback</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Textarea
                        placeholder="Your message..."
                        rows={6}
                        value={formData.message}
                        onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                        required
                      />
                    </div>

                    <Button type="submit" disabled={loading} className="w-full">
                      {loading ? (
                        'Sending...'
                      ) : (
                        <>
                          <Send className="mr-2 h-4 w-4" />
                          Send Message
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ContactUs;