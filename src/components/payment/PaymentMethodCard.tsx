import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PaymentMethod } from "@/types/payment";
import { CreditCard, Trash2, Star } from "lucide-react";

interface PaymentMethodCardProps {
  paymentMethod: PaymentMethod;
  onDelete: (id: string) => void;
  onSetDefault: (id: string) => void;
}

const PaymentMethodCard = ({ paymentMethod, onDelete, onSetDefault }: PaymentMethodCardProps) => {
  const getCardIcon = (brand: string) => {
    switch (brand.toLowerCase()) {
      case 'visa':
        return '💳';
      case 'mastercard':
        return '💳';
      case 'amex':
        return '💳';
      default:
        return '💳';
    }
  };

  return (
    <Card className="glass border-white/20">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            <CreditCard className="h-5 w-5" />
            {paymentMethod.brand.toUpperCase()} •••• {paymentMethod.last4}
          </CardTitle>
          {paymentMethod.isDefault && (
            <Badge variant="secondary" className="bg-primary/10 text-primary">
              <Star className="h-3 w-3 mr-1" />
              Default
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-sm text-muted-foreground">
          <p>Expires: {paymentMethod.expiryMonth.toString().padStart(2, '0')}/{paymentMethod.expiryYear}</p>
          <p className="mt-1">
            {paymentMethod.billingAddress.line1}, {paymentMethod.billingAddress.city}
          </p>
        </div>
        
        <div className="flex gap-2">
          {!paymentMethod.isDefault && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => onSetDefault(paymentMethod.id)}
              className="flex-1"
            >
              Set as Default
            </Button>
          )}
          <Button
            variant="destructive"
            size="sm"
            onClick={() => onDelete(paymentMethod.id)}
            className="flex items-center gap-1"
          >
            <Trash2 className="h-4 w-4" />
            Remove
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default PaymentMethodCard;