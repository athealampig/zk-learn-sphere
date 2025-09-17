import { useQuery } from "@tanstack/react-query";
import Layout from "@/components/layout/Layout";
import AdminSidebar from "@/components/admin/AdminSidebar";
import StatsCard from "@/components/admin/StatsCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SystemStats } from "@/types/admin";
import api from "@/services/api";
import { 
  Users, 
  BookOpen, 
  Shield, 
  DollarSign,
  TrendingUp,
  Activity
} from "lucide-react";

const AdminDashboard = () => {
  const { data: stats, isLoading } = useQuery<SystemStats>({
    queryKey: ['adminStats'],
    queryFn: async () => {
      const response = await api.get('/admin/stats');
      return response.data;
    },
  });

  if (isLoading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-muted rounded w-1/4"></div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-32 bg-muted rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-6">
          <AdminSidebar />
          
          <div className="flex-1">
            <div className="mb-8">
              <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
              <p className="text-muted-foreground">
                System overview and key metrics
              </p>
            </div>

            {stats && (
              <div className="space-y-6">
                {/* Key Metrics */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <StatsCard
                    title="Total Users"
                    value={stats.totalUsers.toLocaleString()}
                    change={`${stats.activeUsers} active`}
                    changeType="positive"
                    icon={Users}
                    description="Registered users on platform"
                  />
                  
                  <StatsCard
                    title="Total Quizzes"
                    value={stats.totalQuizzes.toLocaleString()}
                    icon={BookOpen}
                    description="Available quizzes"
                  />
                  
                  <StatsCard
                    title="Total Proofs"
                    value={stats.totalProofs.toLocaleString()}
                    icon={Shield}
                    description="Generated proofs"
                  />
                  
                  <StatsCard
                    title="Revenue"
                    value={`$${stats.revenue.toLocaleString()}`}
                    icon={DollarSign}
                    description="Total revenue"
                  />
                </div>

                {/* Subscription Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <StatsCard
                    title="Active Subscriptions"
                    value={stats.subscriptions.active.toLocaleString()}
                    changeType="positive"
                    icon={TrendingUp}
                  />
                  
                  <StatsCard
                    title="Cancelled Subscriptions"
                    value={stats.subscriptions.canceled.toLocaleString()}
                    changeType="negative"
                    icon={Activity}
                  />
                  
                  <StatsCard
                    title="Churned Users"
                    value={stats.subscriptions.churned.toLocaleString()}
                    changeType="negative"
                    icon={Users}
                  />
                </div>

                {/* Quick Actions */}
                <Card className="glass border-white/20">
                  <CardHeader>
                    <CardTitle>Quick Actions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <Card className="border-white/10">
                        <CardContent className="p-4 text-center">
                          <Users className="h-8 w-8 mx-auto mb-2 text-primary" />
                          <h3 className="font-semibold mb-1">User Management</h3>
                          <p className="text-sm text-muted-foreground">
                            Manage user accounts and permissions
                          </p>
                        </CardContent>
                      </Card>
                      
                      <Card className="border-white/10">
                        <CardContent className="p-4 text-center">
                          <BookOpen className="h-8 w-8 mx-auto mb-2 text-primary" />
                          <h3 className="font-semibold mb-1">Quiz Management</h3>
                          <p className="text-sm text-muted-foreground">
                            Create and manage quiz content
                          </p>
                        </CardContent>
                      </Card>
                      
                      <Card className="border-white/10">
                        <CardContent className="p-4 text-center">
                          <Shield className="h-8 w-8 mx-auto mb-2 text-primary" />
                          <h3 className="font-semibold mb-1">Proof Management</h3>
                          <p className="text-sm text-muted-foreground">
                            Monitor proof generation and verification
                          </p>
                        </CardContent>
                      </Card>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;