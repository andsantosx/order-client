import { orderService } from "@/services/order.service";
import { paymentService } from "@/services/payment.service";
import { useCartStore } from "@/store/cartStore";
import { Button } from "@/components/ui/button";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { CheckoutForm } from "@/components/CheckoutForm";
import { useState } from "react";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

export function CheckoutPage() {
  const { items, getTotal } = useCartStore();
  const [clientSecret, setClientSecret] = useState<string | null>(null);

  const handleCheckout = async () => {
    try {
      const order = await orderService.create(
        items.map((item) => ({
          productId: item.id,
          quantity: item.quantity,
        }))
      );

      const { clientSecret } = await paymentService.createIntent(order.id);
      setClientSecret(clientSecret);
    } catch (error) {
      console.error("Checkout failed:", error);
    }
  };

  return (
    <div className="min-h-screen bg-background pt-24 pb-16">
      <div className="mx-auto max-w-[800px] px-6 lg:px-10">
        <h1 className="text-4xl font-bold text-foreground mb-8">Checkout</h1>
        {clientSecret ? (
          <Elements options={{ clientSecret }} stripe={stripePromise}>
            <CheckoutForm />
          </Elements>
        ) : (
          <div>
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.id} className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold">{item.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {item.quantity} x R$ {item.price.toLocaleString("pt-BR")}
                    </p>
                  </div>
                  <p className="font-semibold">
                    R$ {(item.price * item.quantity).toLocaleString("pt-BR")}
                  </p>
                </div>
              ))}
            </div>
            <div className="mt-8 pt-4 border-t border-border">
              <div className="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>R$ {getTotal().toLocaleString("pt-BR")}</span>
              </div>
            </div>
            <Button onClick={handleCheckout} className="w-full mt-8">
              Finalizar Compra
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
