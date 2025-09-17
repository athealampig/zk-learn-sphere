import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import PaymentMethodCard from "@/components/payment/PaymentMethodCard";
import { PaymentMethod } from "@/types/payment";
import api from "@/services/api";
import { Plus, CreditCard } from "lucide-react";

const PaymentMethods = () => {
  const queryClient = useQueryClient();

  const { data: paymentMethods, isLoading } = useQuery<PaymentMethod[]>({
    queryKey: ['paymentMethods'],
    queryFn: async () => {
      const response = await api.get('/payment/methods');
      return response.data;
    },
  });

  const deleteMethodMutation = useMutation({
    mutationFn: async (methodId: string) => {
      await api.delete(`/payment/methods/${methodId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['paymentMethods'] });
      toast({
        title: "Payment method removed",
        description: "Your payment method has been successfully removed.",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to remove payment method. Please try again.",
        variant: "destructive",
      });
    },
  });

  const setDefaultMutation = useMutation({
    mutationFn: async (methodId: string) => {
      await api.put(`/payment/methods/${methodId}/default`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['paymentMethods'] });
      toast({
        title: "Default payment method updated",
        description: "Your default payment method has been updated.",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to update default payment method. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleDeleteMethod = (methodId: string) => {
    deleteMethodMutation.mutate(methodId);
  };

  const handleSetDefault = (methodId: string) => {
    setDefaultMutation.mutate(methodId);
  };

  const handleAddPaymentMethod = () => {
    // In a real app, this would open a payment method form or Stripe checkout
    toast({
      title: "Add Payment Method",
      description: "This would open the payment method form.",
    });
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-muted rounded w-1/4"></div>
            <div className="h-64 bg-muted rounded"></div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold mb-2">Payment Methods</h1>
              <p className="text-muted-foreground">
                Manage your payment methods and billing information
              </p>
            </div>
            <Button onClick={handleAddPaymentMethod} className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Add Payment Method
            </Button>
          </div>

          {!paymentMethods || paymentMethods.length === 0 ? (
            <Card className="glass border-white/20">
              <CardContent className="p-12 text-center">
                <CreditCard className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-xl font-semibold mb-2">No payment methods</h3>
                <p className="text-muted-foreground mb-4">
                  Add a payment method to get started with premium features
                </p>
                <Button onClick={handleAddPaymentMethod}>
                  Add Your First Payment Method
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-6">
              {paymentMethods.map((method) => (
                <PaymentMethodCard
                  key={method.id}
                  paymentMethod={method}
                  onDelete={handleDeleteMethod}
                  onSetDefault={handleSetDefault}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default PaymentMethods;