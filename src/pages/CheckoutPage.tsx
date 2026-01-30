import { create as createOrder } from "@/services/order/create";
import { process as processPayment } from "@/services/payment/process";
import { useCartStore } from "@/store/cartStore";
import { useAuthStore } from "@/store/authStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Lock } from "lucide-react";

declare global {
  interface Window {
    MercadoPago: any;
  }
}

export function CheckoutPage() {
  const { items, getTotal, clearCart } = useCartStore();
  const { user } = useAuthStore();
  const navigate = useNavigate();

  const [step, setStep] = useState<"shipping" | "payment" | "pix">("shipping");
  const [guestEmail, setGuestEmail] = useState(user?.email || "");
  const [shippingAddress, setShippingAddress] = useState({
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "Brasil",
  });
  const [mp, setMp] = useState<any>(null);
  const [pixData, setPixData] = useState<{
    qrCodeBase64: string;
    qrCode: string;
    expiration: string;
    orderId: string;
  } | null>(null);

  // Load saved address
  useEffect(() => {
    const saved = localStorage.getItem("last_shipping_address");
    if (saved) {
      setShippingAddress(JSON.parse(saved));
    }
  }, []);

  // Sync user email
  useEffect(() => {
    if (user?.email) setGuestEmail(user.email);
  }, [user]);

  // Init Mercado Pago
  useEffect(() => {
    if (window.MercadoPago) {
      setMp(new window.MercadoPago(import.meta.env.VITE_MERCADOPAGO_PUBLIC_KEY, {
        locale: "pt-BR",
      }));
    }
  }, []);

  // Render Brick
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
            visual: {
              style: {
                theme: 'light', // 'default' | 'dark' | 'bootstrap' | 'flat'
              }
            }
          },
          callbacks: {
            onReady: () => { },
            onSubmit: async (paymentFormData: any) => {
              try {
                // Save address
                localStorage.setItem("last_shipping_address", JSON.stringify(shippingAddress));

                const order = await createOrder({
                  items: items.map(i => ({ productId: i.id, quantity: i.quantity })),
                  guestEmail: user ? undefined : guestEmail,
                  shippingAddress: shippingAddress
                });

                const paymentData = {
                  ...paymentFormData,
                  orderId: order.id,
                  description: `Order ${order.id}`,
                  payer: { ...paymentFormData.payer, email: guestEmail }
                };

                console.log("=== PAYMENT DEBUG ===");
                console.log("paymentFormData from Brick:", paymentFormData);
                console.log("Final paymentData to API:", paymentData);
                console.log("payment_method_id:", paymentData.payment_method_id || paymentFormData.payment_method_id);
                console.log("=====================");

                const paymentResponse = await processPayment(paymentData);

                if (paymentResponse.status === 'approved') {
                  toast.success("Pagamento realizado com sucesso!");
                  clearCart();
                  navigate("/order-confirmation", { state: { orderId: order.id } });
                } else if (paymentResponse.status === 'pending' && paymentResponse.status_detail === 'pending_waiting_transfer') {
                  // PIX payment - show QR code
                  const qrCodeBase64 = paymentResponse.point_of_interaction?.transaction_data?.qr_code_base64;
                  const qrCode = paymentResponse.point_of_interaction?.transaction_data?.qr_code;

                  if (qrCodeBase64 && qrCode) {
                    setPixData({
                      qrCodeBase64,
                      qrCode,
                      expiration: paymentResponse.date_of_expiration || '',
                      orderId: order.id
                    });
                    setStep("pix");
                    toast.success("QR Code PIX gerado! Escaneie para pagar.");
                  } else {
                    toast.error("Erro ao gerar QR Code PIX. Tente novamente.");
                  }
                } else {
                  toast.error(`Pagamento não aprovado: ${paymentResponse.status_detail || paymentResponse.status}`);
                }
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
      <div className="min-h-screen bg-background pt-32 pb-16 flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold mb-4 font-[var(--font-display)]">Seu carrinho está vazio</h1>
        <Button onClick={() => navigate("/loja")} className="rounded-full px-8">Voltar para a Loja</Button>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background pt-32 pb-20">
      <div className="mx-auto max-w-[1200px] px-6 lg:px-10">
        <h1 className="text-3xl md:text-4xl font-bold font-[var(--font-display)] mb-10 text-foreground">Checkout</h1>

        <div className="grid lg:grid-cols-[1fr_400px] gap-12 lg:gap-20">
          {/* Left Column: Form Steps */}
          <div className="space-y-10">

            {/* Step 1: Identification & Shipping */}
            <div className={`space-y-6 ${step === 'payment' ? 'hidden lg:block lg:opacity-50 pointer-events-none' : ''}`}>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">1</div>
                <h2 className="text-xl font-bold">Entrega</h2>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-semibold">Email de Contato</label>
                  <Input
                    value={guestEmail}
                    onChange={(e) => setGuestEmail(e.target.value)}
                    placeholder="seu@email.com"
                    type="email"
                    disabled={!!user}
                    className="bg-card border-border"
                  />
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2 sm:col-span-2">
                    <label className="text-sm font-semibold">Endereço (Rua e Número)</label>
                    <Input
                      value={shippingAddress.street}
                      onChange={(e) => setShippingAddress({ ...shippingAddress, street: e.target.value })}
                      placeholder="Ex: Av. Paulista, 1000"
                      className="bg-card border-border"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold">Cidade</label>
                    <Input
                      value={shippingAddress.city}
                      onChange={(e) => setShippingAddress({ ...shippingAddress, city: e.target.value })}
                      placeholder="Cidade"
                      className="bg-card border-border"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold">Estado</label>
                    <Input
                      value={shippingAddress.state}
                      onChange={(e) => setShippingAddress({ ...shippingAddress, state: e.target.value })}
                      placeholder="UF"
                      maxLength={2}
                      className="bg-card border-border uppercase"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold">CEP</label>
                    <Input
                      value={shippingAddress.zipCode}
                      onChange={(e) => setShippingAddress({ ...shippingAddress, zipCode: e.target.value })}
                      placeholder="00000-000"
                      className="bg-card border-border"
                    />
                  </div>
                </div>
              </div>

              {step === 'shipping' && (
                <Button
                  size="lg"
                  className="w-full h-12 rounded-full font-bold mt-6"
                  onClick={() => {
                    if (!guestEmail || !shippingAddress.street || !shippingAddress.zipCode) {
                      toast.error("Preencha os dados de entrega.");
                      return;
                    }
                    setStep("payment");
                    window.scrollTo(0, 0); // Scroll top for mobile payment view
                  }}
                >
                  Continuar para Pagamento
                </Button>
              )}
            </div>

            {/* Step 2: Payment */}
            {step === 'payment' && (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">2</div>
                  <h2 className="text-xl font-bold">Pagamento</h2>
                </div>

                <div className="bg-card p-6 rounded-2xl border border-border">
                  <div id="paymentBrick_container"></div>
                </div>

                <Button variant="outline" onClick={() => setStep("shipping")} className="w-full rounded-full">
                  Voltar / Alterar Endereço
                </Button>
              </div>
            )}

            {/* Step 3: PIX QR Code */}
            {step === 'pix' && pixData && (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-8 rounded-full bg-green-600 text-white flex items-center justify-center font-bold">✓</div>
                  <h2 className="text-xl font-bold">Pague com PIX</h2>
                </div>

                <div className="bg-card p-8 rounded-2xl border border-border text-center space-y-6">
                  <div className="bg-white p-4 rounded-xl inline-block mx-auto">
                    <img
                      src={`data:image/png;base64,${pixData.qrCodeBase64}`}
                      alt="QR Code PIX"
                      className="w-64 h-64 mx-auto"
                    />
                  </div>

                  <div className="space-y-2">
                    <p className="text-muted-foreground text-sm">Escaneie o QR Code com o app do seu banco</p>
                    <p className="text-xs text-muted-foreground">
                      Válido até: {pixData.expiration ? new Date(pixData.expiration).toLocaleString() : 'N/A'}
                    </p>
                  </div>

                  <div className="border-t border-border pt-4">
                    <p className="text-sm text-muted-foreground mb-2">Ou copie o código PIX:</p>
                    <div className="flex gap-2">
                      <input
                        readOnly
                        value={pixData.qrCode}
                        className="flex-1 bg-secondary/50 px-3 py-2 rounded text-xs font-mono truncate"
                      />
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          navigator.clipboard.writeText(pixData.qrCode);
                          toast.success("Código PIX copiado!");
                        }}
                      >
                        Copiar
                      </Button>
                    </div>
                  </div>

                  <div className="pt-4">
                    <Button
                      className="w-full rounded-full"
                      onClick={() => {
                        clearCart();
                        navigate("/order-confirmation", { state: { orderId: pixData.orderId } });
                      }}
                    >
                      Já fiz o pagamento
                    </Button>
                    <p className="text-xs text-muted-foreground mt-2">
                      O status será atualizado automaticamente após a confirmação.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Summary (Sticky) */}
          <div className="h-fit lg:sticky lg:top-32">
            <div className="bg-secondary/30 p-8 rounded-3xl space-y-6">
              <h3 className="font-bold text-xl mb-4">Resumo do Pedido</h3>

              <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-4 items-start">
                    <div className="w-16 h-16 bg-white rounded-lg flex items-center justify-center shrink-0 overflow-hidden">
                      {/* Placeholder image if no image URL yet */}
                      <img src={item.imageUrl || "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=100"} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-sm line-clamp-2">{item.name}</p>
                      <p className="text-xs text-muted-foreground mt-1">Qtde: {item.quantity}</p>
                    </div>
                    <p className="font-semibold text-sm">
                      {new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(item.price * item.quantity)}
                    </p>
                  </div>
                ))}
              </div>

              <div className="border-t border-primary/10 pt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>{new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(getTotal())}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Frete</span>
                  <span className="text-green-600 font-medium">Grátis</span>
                </div>
              </div>

              <div className="border-t border-primary/10 pt-4 flex justify-between items-center">
                <span className="font-bold text-lg">Total</span>
                <span className="font-bold text-2xl text-primary">
                  {new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(getTotal())}
                </span>
              </div>

              <div className="flex items-center gap-2 text-xs text-muted-foreground justify-center pt-2">
                <Lock className="w-3 h-3" />
                Checkout Seguro e Criptografado
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
