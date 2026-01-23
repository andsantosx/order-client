import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { Button } from "./ui/button";
import { useState } from "react";

export function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: "http://localhost:5173/order-confirmation",
      },
    });

    if (error.type === "card_error" || error.type === "validation_error") {
      console.error(error.message);
    } else {
      console.error("An unexpected error occurred.");
    }

    setIsLoading(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement />
      <Button disabled={isLoading || !stripe || !elements} className="w-full mt-8">
        {isLoading ? "Processando..." : "Pagar agora"}
      </Button>
    </form>
  );
}
