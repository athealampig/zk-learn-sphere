import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Transaction } from "@/types/payment";
import api from "@/services/api";
import { Download, Receipt, Calendar } from "lucide-react";
import { format } from "date-fns";

const BillingHistory = () => {
  const { data: transactions, isLoading } = useQuery<Transaction[]>({
    queryKey: ['billingHistory'],
    queryFn: async () => {
      const response = await api.get('/payment/billing');
      return response.data;
    },
  });

  const getStatusColor = (status: Transaction['status']) => {
    switch (status) {
      case 'succeeded':
        return 'bg-green-500/20 text-green-400 border-green-500/50';
      case 'pending':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/50';
      case 'failed':
        return 'bg-red-500/20 text-red-400 border-red-500/50';
      case 'refunded':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/50';
      default:
        return 'bg-muted/20 text-muted-foreground border-muted/50';
    }
  };

  const handleDownloadInvoice = (transaction: Transaction) => {
    if (transaction.invoiceUrl) {
      window.open(transaction.invoiceUrl, '_blank');
    }
  };

  if (isLoading) {
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
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold mb-2">Billing History</h1>
              <p className="text-muted-foreground">
                View and download your transaction history and invoices
              </p>
            </div>
          </div>

          {!transactions || transactions.length === 0 ? (
            <Card className="glass border-white/20">
              <CardContent className="p-12 text-center">
                <Receipt className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-xl font-semibold mb-2">No transactions</h3>
                <p className="text-muted-foreground">
                  Your billing history will appear here once you make your first payment
                </p>
              </CardContent>
            </Card>
          ) : (
            <Card className="glass border-white/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Transaction History
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Payment Method</TableHead>
                        <TableHead>Invoice</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {transactions.map((transaction) => (
                        <TableRow key={transaction.id}>
                          <TableCell>
                            {format(new Date(transaction.createdAt), 'MMM dd, yyyy')}
                          </TableCell>
                          <TableCell className="font-medium">
                            {transaction.description}
                          </TableCell>
                          <TableCell>
                            ${(transaction.amount / 100).toFixed(2)} {transaction.currency.toUpperCase()}
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant="outline"
                              className={getStatusColor(transaction.status)}
                            >
                              {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-muted-foreground">
                            {transaction.paymentMethod}
                          </TableCell>
                          <TableCell>
                            {transaction.invoiceUrl ? (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleDownloadInvoice(transaction)}
                                className="flex items-center gap-1"
                              >
                                <Download className="h-4 w-4" />
                                Download
                              </Button>
                            ) : (
                              <span className="text-muted-foreground text-sm">N/A</span>
                            )}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default BillingHistory;