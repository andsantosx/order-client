import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useCartStore } from "@/store/cartStore";

export function OrderConfirmationPage() {
  const location = useLocation();
  const { clearCart } = useCartStore();
  const [status, setStatus] = useState<string | null>(null);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const paymentIntentClientSecret = searchParams.get(
      "payment_intent_client_secret"
    );

    if (paymentIntentClientSecret) {
      // Here you would typically verify the payment status with your backend
      // For this example, we'll just assume it's successful
      setStatus("success");
      clearCart();
    } else {
      setStatus("error");
    }
  }, [location, clearCart]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center pt-24">
      <div className="text-center">
        {status === "success" && (
          <>
            <h1 className="text-4xl font-bold text-foreground mb-4">
              Obrigado pelo seu pedido!
            </h1>
            <p className="text-lg text-muted-foreground">
              Seu pagamento foi processado com sucesso.
            </p>
          </>
        )}
        {status === "error" && (
          <>
            <h1 className="text-4xl font-bold text-destructive mb-4">
              Ocorreu um erro
            </h1>
            <p className="text-lg text-muted-foreground">
              Não foi possível processar seu pagamento.
            </p>
          </>
        )}
      </div>
    </div>
  );
}
