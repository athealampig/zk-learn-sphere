import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Layout from "@/components/layout/Layout";
import AdminSidebar from "@/components/admin/AdminSidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { User } from "@/types/admin";
import api from "@/services/api";
import { Search, UserCheck, UserX, Crown, Shield } from "lucide-react";
import { format } from "date-fns";

const UserManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const queryClient = useQueryClient();

  const { data: users, isLoading } = useQuery<User[]>({
    queryKey: ['adminUsers', searchTerm, statusFilter],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (searchTerm) params.append('search', searchTerm);
      if (statusFilter !== 'all') params.append('status', statusFilter);
      
      const response = await api.get(`/admin/users?${params.toString()}`);
      return response.data;
    },
  });

  const updateUserMutation = useMutation({
    mutationFn: async ({ userId, updates }: { userId: string; updates: Partial<User> }) => {
      await api.put(`/admin/users/${userId}`, updates);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['adminUsers'] });
      toast({
        title: "User updated",
        description: "User has been successfully updated.",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to update user. Please try again.",
        variant: "destructive",
      });
    },
  });

  const deleteUserMutation = useMutation({
    mutationFn: async (userId: string) => {
      await api.delete(`/admin/users/${userId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['adminUsers'] });
      toast({
        title: "User deleted",
        description: "User has been successfully deleted.",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to delete user. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleStatusChange = (userId: string, status: User['status']) => {
    updateUserMutation.mutate({ userId, updates: { status } });
  };

  const handleRoleChange = (userId: string, role: User['role']) => {
    updateUserMutation.mutate({ userId, updates: { role } });
  };

  const handleDeleteUser = (userId: string, userName: string) => {
    if (confirm(`Are you sure you want to delete user "${userName}"? This action cannot be undone.`)) {
      deleteUserMutation.mutate(userId);
    }
  };

  const getStatusColor = (status: User['status']) => {
    switch (status) {
      case 'active':
        return 'bg-green-500/20 text-green-400 border-green-500/50';
      case 'inactive':
        return 'bg-gray-500/20 text-gray-400 border-gray-500/50';
      case 'suspended':
        return 'bg-red-500/20 text-red-400 border-red-500/50';
      default:
        return 'bg-muted/20 text-muted-foreground border-muted/50';
    }
  };

  const getRoleIcon = (role: User['role']) => {
    switch (role) {
      case 'admin':
        return <Shield className="h-4 w-4" />;
      case 'moderator':
        return <UserCheck className="h-4 w-4" />;
      default:
        return <Crown className="h-4 w-4" />;
    }
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <div className="flex gap-6">
            <AdminSidebar />
            <div className="flex-1 animate-pulse space-y-4">
              <div className="h-8 bg-muted rounded w-1/4"></div>
              <div className="h-96 bg-muted rounded"></div>
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
              <h1 className="text-3xl font-bold mb-2">User Management</h1>
              <p className="text-muted-foreground">
                Manage user accounts, roles, and permissions
              </p>
            </div>

            {/* Filters */}
            <Card className="glass border-white/20 mb-6">
              <CardContent className="p-4">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search users by name or email..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-full md:w-48">
                      <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                      <SelectItem value="suspended">Suspended</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Users Table */}
            <Card className="glass border-white/20">
              <CardHeader>
                <CardTitle>Users ({users?.length || 0})</CardTitle>
              </CardHeader>
              <CardContent>
                {!users || users.length === 0 ? (
                  <div className="text-center py-8">
                    <UserX className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                    <h3 className="text-lg font-semibold mb-2">No users found</h3>
                    <p className="text-muted-foreground">
                      {searchTerm || statusFilter !== 'all' 
                        ? "Try adjusting your search or filter criteria"
                        : "No users are registered yet"
                      }
                    </p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>User</TableHead>
                          <TableHead>Role</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Subscription</TableHead>
                          <TableHead>Stats</TableHead>
                          <TableHead>Last Login</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {users.map((user) => (
                          <TableRow key={user.id}>
                            <TableCell>
                              <div>
                                <div className="font-medium">{user.fullName}</div>
                                <div className="text-sm text-muted-foreground">{user.email}</div>
                              </div>
                            </TableCell>
                            
                            <TableCell>
                              <div className="flex items-center gap-2">
                                {getRoleIcon(user.role)}
                                <Select
                                  value={user.role}
                                  onValueChange={(role: User['role']) => handleRoleChange(user.id, role)}
                                >
                                  <SelectTrigger className="w-32">
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="user">User</SelectItem>
                                    <SelectItem value="moderator">Moderator</SelectItem>
                                    <SelectItem value="admin">Admin</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                            </TableCell>
                            
                            <TableCell>
                              <Select
                                value={user.status}
                                onValueChange={(status: User['status']) => handleStatusChange(user.id, status)}
                              >
                                <SelectTrigger className="w-32">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="active">Active</SelectItem>
                                  <SelectItem value="inactive">Inactive</SelectItem>
                                  <SelectItem value="suspended">Suspended</SelectItem>
                                </SelectContent>
                              </Select>
                            </TableCell>
                            
                            <TableCell>
                              {user.subscription ? (
                                <div>
                                  <Badge variant="secondary" className="mb-1">
                                    {user.subscription.planName}
                                  </Badge>
                                  <div className="text-xs text-muted-foreground">
                                    {user.subscription.status}
                                  </div>
                                </div>
                              ) : (
                                <span className="text-muted-foreground text-sm">Free</span>
                              )}
                            </TableCell>
                            
                            <TableCell>
                              <div className="text-sm space-y-1">
                                <div>{user.stats.quizzesCompleted} quizzes</div>
                                <div>{user.stats.proofsGenerated} proofs</div>
                                <div>{user.stats.totalXP} XP</div>
                              </div>
                            </TableCell>
                            
                            <TableCell className="text-sm text-muted-foreground">
                              {user.lastLoginAt 
                                ? format(new Date(user.lastLoginAt), 'MMM dd, yyyy')
                                : 'Never'
                              }
                            </TableCell>
                            
                            <TableCell>
                              <Button
                                variant="destructive"
                                size="sm"
                                onClick={() => handleDeleteUser(user.id, user.fullName)}
                              >
                                Delete
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UserManagement;