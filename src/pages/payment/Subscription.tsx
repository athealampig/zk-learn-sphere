import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/hooks/use-toast";
import { Subscription as SubscriptionType, Plan } from "@/types/payment";
import api from "@/services/api";
import { Crown, Calendar, CreditCard, AlertTriangle, CheckCircle } from "lucide-react";
import { format } from "date-fns";

const Subscription = () => {
  const queryClient = useQueryClient();

  const { data: subscription, isLoading: subscriptionLoading } = useQuery<SubscriptionType>({
    queryKey: ['subscription'],
    queryFn: async () => {
      const response = await api.get('/payment/subscription');
      return response.data;
    },
  });

  const { data: plans, isLoading: plansLoading } = useQuery<Plan[]>({
    queryKey: ['plans'],
    queryFn: async () => {
      const response = await api.get('/payment/plans');
      return response.data;
    },
  });

  const cancelMutation = useMutation({
    mutationFn: async () => {
      await api.post('/payment/subscription/cancel');
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['subscription'] });
      toast({
        title: "Subscription cancelled",
        description: "Your subscription will remain active until the end of the current billing cycle.",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to cancel subscription. Please try again.",
        variant: "destructive",
      });
    },
  });

  const reactivateMutation = useMutation({
    mutationFn: async () => {
      await api.post('/payment/subscription/reactivate');
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['subscription'] });
      toast({
        title: "Subscription reactivated",
        description: "Your subscription has been successfully reactivated.",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to reactivate subscription. Please try again.",
        variant: "destructive",
      });
    },
  });

  const getStatusColor = (status: SubscriptionType['status']) => {
    switch (status) {
      case 'active':
        return 'bg-green-500/20 text-green-400 border-green-500/50';
      case 'canceled':
        return 'bg-red-500/20 text-red-400 border-red-500/50';
      case 'past_due':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/50';
      case 'unpaid':
        return 'bg-red-500/20 text-red-400 border-red-500/50';
      default:
        return 'bg-muted/20 text-muted-foreground border-muted/50';
    }
  };

  const handleCancelSubscription = () => {
    if (confirm('Are you sure you want to cancel your subscription?')) {
      cancelMutation.mutate();
    }
  };

  const handleReactivateSubscription = () => {
    reactivateMutation.mutate();
  };

  if (subscriptionLoading || plansLoading) {
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

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Subscription Management</h1>
            <p className="text-muted-foreground">
              Manage your subscription and billing preferences
            </p>
          </div>

          {subscription ? (
            <div className="space-y-6">
              {/* Current Subscription */}
              <Card className="glass border-white/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Crown className="h-5 w-5" />
                    Current Subscription
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-xl font-semibold">{subscription.planName}</h3>
                      <p className="text-muted-foreground">
                        ${subscription.pricePerMonth}/month
                      </p>
                    </div>
                    <Badge
                      variant="outline"
                      className={getStatusColor(subscription.status)}
                    >
                      {subscription.status.charAt(0).toUpperCase() + subscription.status.slice(1)}
                    </Badge>
                  </div>

                  <Separator />

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-sm">
                        <Calendar className="h-4 w-4" />
                        <span>Next billing date:</span>
                        <span className="font-medium">
                          {format(new Date(subscription.nextBillingDate), 'MMM dd, yyyy')}
                        </span>
                      </div>
                      
                      <div className="flex items-center gap-2 text-sm">
                        <CreditCard className="h-4 w-4" />
                        <span>Billing period:</span>
                        <span className="font-medium">
                          {format(new Date(subscription.currentPeriodStart), 'MMM dd')} - {format(new Date(subscription.currentPeriodEnd), 'MMM dd, yyyy')}
                        </span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h4 className="font-medium">Features included:</h4>
                      <ul className="space-y-1">
                        {subscription.features.map((feature, index) => (
                          <li key={index} className="flex items-center gap-2 text-sm">
                            <CheckCircle className="h-3 w-3 text-green-400" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {subscription.cancelAtPeriodEnd && (
                    <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4">
                      <div className="flex items-center gap-2 text-yellow-400">
                        <AlertTriangle className="h-4 w-4" />
                        <span className="font-medium">Subscription Cancelled</span>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        Your subscription will end on {format(new Date(subscription.currentPeriodEnd), 'MMM dd, yyyy')}
                      </p>
                    </div>
                  )}

                  <div className="flex gap-3">
                    {subscription.cancelAtPeriodEnd ? (
                      <Button
                        onClick={handleReactivateSubscription}
                        disabled={reactivateMutation.isPending}
                      >
                        Reactivate Subscription
                      </Button>
                    ) : (
                      <Button
                        variant="destructive"
                        onClick={handleCancelSubscription}
                        disabled={cancelMutation.isPending}
                      >
                        Cancel Subscription
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Available Plans */}
              {plans && plans.length > 0 && (
                <Card className="glass border-white/20">
                  <CardHeader>
                    <CardTitle>Available Plans</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-4">
                      {plans.map((plan) => (
                        <Card
                          key={plan.id}
                          className={`border ${
                            plan.id === subscription.planId
                              ? 'border-primary'
                              : 'border-white/20'
                          }`}
                        >
                          <CardContent className="p-4">
                            <div className="flex items-center justify-between mb-3">
                              <h3 className="font-semibold">{plan.name}</h3>
                              {plan.popular && (
                                <Badge variant="secondary">Popular</Badge>
                              )}
                            </div>
                            <p className="text-2xl font-bold mb-2">
                              ${plan.price}
                              <span className="text-sm font-normal text-muted-foreground">
                                /{plan.billingPeriod === 'monthly' ? 'month' : 'year'}
                              </span>
                            </p>
                            <p className="text-sm text-muted-foreground mb-4">
                              {plan.description}
                            </p>
                            <ul className="space-y-1 mb-4">
                              {plan.features.map((feature, index) => (
                                <li key={index} className="flex items-center gap-2 text-sm">
                                  <CheckCircle className="h-3 w-3 text-green-400" />
                                  {feature}
                                </li>
                              ))}
                            </ul>
                            {plan.id !== subscription.planId && (
                              <Button variant="outline" className="w-full">
                                Change to {plan.name}
                              </Button>
                            )}
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          ) : (
            <Card className="glass border-white/20">
              <CardContent className="p-12 text-center">
                <Crown className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-xl font-semibold mb-2">No active subscription</h3>
                <p className="text-muted-foreground mb-4">
                  Upgrade to premium to access all features and generate unlimited proofs
                </p>
                <Button>Explore Premium Plans</Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Subscription;