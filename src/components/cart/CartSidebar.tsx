import { useCartStore } from "@/store/cartStore";
import { ShoppingBag, Trash2, Plus, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export function CartSidebar() {
  const {
    items,
    removeItem,
    updateQuantity,
    getTotal,
    clearCart,
    isCartOpen,
    closeCart,
  } = useCartStore();

  return (
    <>
      {/* Sidebar Overlay */}
      {isCartOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          onClick={closeCart}
        />
      )}

      {/* Cart Sidebar */}
      <div
        className={`fixed right-0 top-0 h-screen w-full max-w-md bg-background border-l border-border shadow-xl transform transition-transform duration-300 z-50 ${
          isCartOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-border">
            <h2 className="text-2xl font-bold text-foreground">Sacola</h2>
            <button
              onClick={closeCart}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              ✕
            </button>
          </div>

          {/* Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {items.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <ShoppingBag className="h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-muted-foreground">Sua sacola está vazia</p>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 p-4 rounded-lg bg-card border border-border hover:border-primary/50 transition-all"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <h4 className="font-medium text-foreground text-sm">
                      {item.name}
                    </h4>
                    {item.selectedColor && (
                      <p className="text-xs text-muted-foreground">
                        Cor:{" "}
                        <span
                          className="inline-block w-3 h-3 rounded-full border"
                          style={{ backgroundColor: item.selectedColor }}
                        />
                      </p>
                    )}
                    {item.selectedSize && (
                      <p className="text-xs text-muted-foreground">
                        Tamanho: {item.selectedSize}
                      </p>
                    )}
                    <p className="font-semibold text-primary mt-1">
                      R${" "}
                      {(item.price * item.quantity).toLocaleString("pt-BR", {
                        minimumFractionDigits: 2,
                      })}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() =>
                          updateQuantity(item.id, Math.max(1, item.quantity - 1))
                        }
                        className="p-1 hover:bg-secondary rounded transition-colors"
                      >
                        <Minus className="h-3 w-3" />
                      </button>
                      <span className="text-xs font-medium w-6 text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                        className="p-1 hover:bg-secondary rounded transition-colors"
                      >
                        <Plus className="h-3 w-3" />
                      </button>
                    </div>
                  </div>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-muted-foreground hover:text-destructive transition-colors"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          {items.length > 0 && (
            <div className="border-t border-border p-6 space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-medium">
                    R${" "}
                    {getTotal().toLocaleString("pt-BR", {
                      minimumFractionDigits: 2,
                    })}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Frete</span>
                  <span className="font-medium text-primary">Grátis</span>
                </div>
              </div>
              <div className="flex justify-between text-lg font-bold border-t border-border pt-4">
                <span>Total</span>
                <span className="text-primary">
                  R${" "}
                  {getTotal().toLocaleString("pt-BR", {
                    minimumFractionDigits: 2,
                  })}
                </span>
              </div>
              <Button asChild className="w-full h-12 bg-primary text-primary-foreground hover:bg-primary/90">
                <Link to="/checkout" onClick={closeCart}>
                  Ir para Checkout
                </Link>
              </Button>
              <button
                onClick={() => {
                  clearCart();
                  closeCart();
                }}
                className="w-full py-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Limpar Sacola
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
