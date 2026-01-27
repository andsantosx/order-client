import { create as createOrder } from "@/services/order/create";
import { process as processPayment } from "@/services/payment/process";
import { useCartStore } from "@/store/cartStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

declare global {
  interface Window {
    MercadoPago: any;
  }
}

export function CheckoutPage() {
  const { items, getTotal, clearCart } = useCartStore();
  const navigate = useNavigate();
  const [guestEmail, setGuestEmail] = useState("");
  const [shippingAddress, setShippingAddress] = useState({
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "Brasil",
  });
  const [step, setStep] = useState<"review" | "address" | "payment">("review");
  const [mp, setMp] = useState<any>(null);

  useEffect(() => {
    if (window.MercadoPago) {
      setMp(new window.MercadoPago(import.meta.env.VITE_MERCADOPAGO_PUBLIC_KEY, {
        locale: "pt-BR",
      }));
    }
  }, []);

  useEffect(() => {
    if (mp && step === "payment") {
      const renderPaymentBrick = async () => {
        const bricksBuilder = mp.bricks();
        await bricksBuilder.create("payment", "paymentBrick_container", {
          initialization: {
            amount: getTotal(),
            payer: {
              email: guestEmail,
            },
          },
          customization: {
            paymentMethods: {
              ticket: "all",
              bankTransfer: "all",
              creditCard: "all",
              debitCard: "all",
              maxInstallments: 12
            },
          },
          callbacks: {
            onReady: () => {
              // Brick ready
            },
            onSubmit: async (paymentFormData: any) => {
              try {
                // 1. Create Order first
                const order = await createOrder({
                  items: items.map(i => ({ productId: i.id, quantity: i.quantity })),
                  guestEmail: guestEmail,
                  shippingAddress: shippingAddress
                });

                // 2. Process Payment
                // paymentFormData contains token, issuer_id, payment_method_id, etc.
                const paymentData = {
                  ...paymentFormData,
                  orderId: order.id,
                  description: `Order ${order.id}`,
                  payer: {
                    ...paymentFormData.payer,
                    email: guestEmail
                  }
                };

                await processPayment(paymentData);

                toast.success("Pagamento realizado com sucesso!");
                clearCart();
                navigate("/order-confirmation", { state: { orderId: order.id } });

              } catch (error) {
                console.error("Payment error:", error);
                toast.error("Erro ao processar pagamento.");
              }
            },
            onError: (error: any) => {
              console.error(error);
              toast.error("Erro no Mercado Pago.");
            },
          },
        });
      };
      renderPaymentBrick();
    }
  }, [mp, step, getTotal, guestEmail, items, shippingAddress, navigate, clearCart]);

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background pt-24 pb-16 flex flex-col items-center">
        <h1 className="text-2xl font-bold mb-4">Seu carrinho está vazio</h1>
        <Button onClick={() => navigate("/loja")}>Voltar para a Loja</Button>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background pt-24 pb-16">
      <div className="mx-auto max-w-[800px] px-6 lg:px-10">
        <h1 className="text-4xl font-bold text-foreground mb-8">Checkout</h1>

        {/* Step 1: Review */}
        {step === "review" && (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold">Revisar Carrinho</h2>
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.id} className="flex items-center justify-between border-b pb-4">
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
            <div className="flex justify-between font-bold text-lg pt-4">
              <span>Total</span>
              <span>R$ {getTotal().toLocaleString("pt-BR")}</span>
            </div>
            <Button className="w-full" onClick={() => setStep("address")}>
              Continuar para Endereço
            </Button>
          </div>
        )}

        {/* Step 2: Address & Email */}
        {step === "address" && (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold">Dados de Entrega</h2>

            <div className="space-y-2">
              <label className="text-sm font-medium">Email</label>
              <Input
                value={guestEmail}
                onChange={(e) => setGuestEmail(e.target.value)}
                placeholder="seu@email.com"
                type="email"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2 col-span-2">
                <label className="text-sm font-medium">Rua</label>
                <Input
                  value={shippingAddress.street}
                  onChange={(e) => setShippingAddress({ ...shippingAddress, street: e.target.value })}
                  placeholder="Rua Exemplo, 123"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Cidade</label>
                <Input
                  value={shippingAddress.city}
                  onChange={(e) => setShippingAddress({ ...shippingAddress, city: e.target.value })}
                  placeholder="Cidade"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Estado</label>
                <Input
                  value={shippingAddress.state}
                  onChange={(e) => setShippingAddress({ ...shippingAddress, state: e.target.value })}
                  placeholder="UF"
                  maxLength={2}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">CEP</label>
                <Input
                  value={shippingAddress.zipCode}
                  onChange={(e) => setShippingAddress({ ...shippingAddress, zipCode: e.target.value })}
                  placeholder="00000-000"
                />
              </div>
            </div>

            <div className="flex gap-4">
              <Button variant="outline" className="flex-1" onClick={() => setStep("review")}>Voltar</Button>
              <Button
                className="flex-1"
                onClick={() => {
                  if (!guestEmail || !shippingAddress.street) {
                    toast.error("Preencha todos os campos");
                    return;
                  }
                  setStep("payment");
                }}
              >
                Ir para Pagamento
              </Button>
            </div>
          </div>
        )}

        {/* Step 3: Payment */}
        {step === "payment" && (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold">Pagamento</h2>
            <div id="paymentBrick_container"></div>
            <Button variant="outline" onClick={() => setStep("address")}>Voltar</Button>
          </div>
        )}

      </div>
    </div>
  );
}
