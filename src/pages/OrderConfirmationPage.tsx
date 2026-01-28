import { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { useCartStore } from "@/store/cartStore";
import { getById as getOrderById, type OrderResponse } from "@/services/order/getById";
import { CheckCircle2, Package, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function OrderConfirmationPage() {
  const location = useLocation();
  const { clearCart } = useCartStore();
  const [status, setStatus] = useState<string | null>(null);
  const [order, setOrder] = useState<OrderResponse | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const initPage = async () => {
      // Check for Mercado Pago params or internal state
      const searchParams = new URLSearchParams(location.search);
      const paymentId = searchParams.get("payment_id"); // Mercado Pago adds this
      const statusParam = searchParams.get("status"); // Mercado Pago adds this
      const orderIdState = location.state?.orderId;

      // If we have an order ID from state, fetch it
      if (orderIdState) {
        setLoading(true);
        try {
          const orderData = await getOrderById(orderIdState);
          setOrder(orderData);
          setStatus("success");
          // Ensure cart is cleared if we reached here successfully
          clearCart();
        } catch (error) {
          console.error("Error fetching order:", error);
          // If fetch fails but we're here, we can still show success message but maybe without details?
          // Or show error. keeping simple for now.
        } finally {
          setLoading(false);
        }
      } else if (paymentId && statusParam === 'approved') {
        // Fallback for redirect flow if needed (though we might miss orderId here)
        setStatus("success");
        clearCart();
      } else if (!orderIdState && !paymentId) {
        // Direct access without state or params
        setStatus("error");
      }
    };

    initPage();
  }, [location, clearCart]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center gap-4">
          <div className="h-12 w-12 bg-secondary rounded-full"></div>
          <div className="h-4 w-48 bg-secondary rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pt-32 pb-20">
      <div className="mx-auto max-w-[800px] px-6 lg:px-10">

        <div className="text-center mb-12">
          {status === "success" ? (
            <div className="flex flex-col items-center gap-4">
              <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-2">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h1 className="text-4xl font-black uppercase tracking-tighter text-foreground">
                Pedido Confirmado!
              </h1>
              <p className="text-lg text-muted-foreground max-w-md mx-auto">
                Obrigado pela sua compra. Enviamos um email com os detalhes do seu pedido.
              </p>
              {order && (
                <p className="text-sm font-bold bg-secondary px-4 py-2 rounded-full mt-2">
                  Pedido #{order.id.slice(0, 8)}
                </p>
              )}
            </div>
          ) : (
            <div className="text-center">
              <h1 className="text-4xl font-bold text-destructive mb-4">
                Ocorreu um erro
              </h1>
              <p className="text-lg text-muted-foreground">
                Não foi possível carregar os detalhes do pedido.
              </p>
              <Button onClick={() => window.location.href = "/loja"} className="mt-6">
                Voltar para a Loja
              </Button>
            </div>
          )}
        </div>

        {/* Order Summary */}
        {order && (
          <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm">
            <div className="bg-secondary/30 p-6 border-b border-border flex items-center gap-3">
              <Package className="w-5 h-5 text-primary" />
              <h2 className="font-bold text-lg">Resumo do Pedido</h2>
            </div>

            <div className="p-6 space-y-6">
              <div className="space-y-4">
                {order.items.map((item) => (
                  <div key={item.id} className="flex gap-4 items-center">
                    <div className="w-16 h-16 bg-white rounded-lg border border-border flex items-center justify-center shrink-0 overflow-hidden">
                      {/* Using optional chaining for safety, assuming backend structure matches */}
                      {item.product.images?.[0]?.url ? (
                        <img
                          src={item.product.images[0].url}
                          alt={item.product.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="text-xs text-muted-foreground text-center p-1">No Image</div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-sm truncate">{item.product.name}</p>
                      <p className="text-xs text-muted-foreground">Qtde: {item.quantity}</p>
                    </div>
                    <p className="font-bold text-sm">
                      {new Intl.NumberFormat("pt-BR", { style: "currency", currency: order.currency }).format(parseFloat(item.total_price))}
                    </p>
                  </div>
                ))}
              </div>

              <div className="border-t border-dashed border-border pt-6 space-y-2">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-muted-foreground">Data do Pedido</span>
                  <span className="font-medium">
                    {new Date(order.created_at).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-muted-foreground">Método de Pagamento</span>
                  <span className="font-medium capitalize">Mercado Pago</span>
                </div>
              </div>

              <div className="border-t border-border pt-4 flex justify-between items-center">
                <span className="font-bold text-lg">Total Pago</span>
                <span className="font-bold text-2xl text-primary">
                  {new Intl.NumberFormat("pt-BR", { style: "currency", currency: order.currency }).format(order.total_amount)}
                </span>
              </div>
            </div>
          </div>
        )}

        <div className="flex justify-center mt-12 gap-4">
          <Link to="/loja">
            <Button variant="outline" size="lg" className="rounded-full px-8 font-bold">
              Continuar Comprando
            </Button>
          </Link>
          <Link to="/profile">
            <Button size="lg" className="rounded-full px-8 font-bold gap-2">
              Ver Meus Pedidos
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>

      </div>
    </div>
  );
}
