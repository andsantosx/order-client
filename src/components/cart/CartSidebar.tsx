import { ShoppingBag, Minus, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useCartStore } from "@/store/cartStore";
import { useNavigate } from "react-router-dom";

export function CartSidebar() {
  const {
    items,
    removeItem,
    updateQuantity,
    getTotal,
    isCartOpen,
    toggleCart,
    closeCart,
  } = useCartStore();
  const navigate = useNavigate();

  return (
    <Sheet open={isCartOpen} onOpenChange={toggleCart}>
      <SheetContent className="flex w-full flex-col pr-0 sm:max-w-lg">
        <SheetHeader className="pr-6">
          <SheetTitle className="flex items-center justify-between">
            <span className="text-xl font-bold">Meu Carrinho ({items.length})</span>
          </SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex h-full flex-col items-center justify-center space-y-4 pr-6">
            <div className="relative mb-4">
              <div className="absolute -inset-4 rounded-full bg-primary/5 blur-xl" />
              <ShoppingBag className="relative h-16 w-16 text-muted-foreground" />
            </div>
            <p className="text-xl font-medium">Seu carrinho está vazio</p>
            <p className="text-muted-foreground">
              Que tal dar uma olhada em nossos produtos?
            </p>
            <Button
              onClick={closeCart}
              className="mt-4 rounded-full px-8"
            >
              Começar a comprar
            </Button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto pr-6">
              <ul className="space-y-4 py-4">
                {items.map((item) => (
                  <li
                    key={`${item.id}`}
                    className="flex gap-4 rounded-xl border bg-card p-4 shadow-sm transition-all hover:shadow-md"
                  >
                    <div className="flex flex-1 flex-col justify-between">
                      <div className="space-y-1">
                        <div className="flex justify-between items-start gap-2">
                          <h3 className="font-semibold leading-tight line-clamp-2">
                            {item.name}
                            {item.size && (
                              <span className="ml-2 text-sm font-normal text-muted-foreground">
                                ({item.size})
                              </span>
                            )}
                          </h3>
                          <button
                            onClick={() => removeItem(item.id)}
                            className="text-muted-foreground transition-colors hover:text-destructive shrink-0"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>

                      <div className="mt-4 flex items-center justify-between">
                        <div className="flex items-center gap-1 rounded-lg border bg-background p-1 shadow-sm">
                          <button
                            onClick={() =>
                              updateQuantity(item.id, Math.max(0, item.quantity - 1))
                            }
                            className="flex h-7 w-7 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                          >
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="w-8 text-center text-sm font-medium tabular-nums">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity + 1)
                            }
                            className="flex h-7 w-7 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                          >
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>
                        <p className="text-sm font-semibold">
                          {new Intl.NumberFormat("pt-BR", {
                            style: "currency",
                            currency: "BRL",
                          }).format(item.price * item.quantity)}
                        </p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-4 border-t bg-background p-6 pr-6 shadow-[0_-4px_16px_rgba(0,0,0,0.05)]">
              <div className="space-y-2 text-sm">
                <div className="flex justify-between border-t py-4 text-base font-bold">
                  <span>Total</span>
                  <span>
                    {new Intl.NumberFormat("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    }).format(getTotal())}
                  </span>
                </div>
              </div>
              <Button
                className="w-full h-12 rounded-full text-base font-bold shadow-lg transition-transform hover:scale-[1.02] active:scale-[0.98]"
                onClick={() => {
                  closeCart();
                  navigate("/checkout");
                }}
              >
                Finalizar Compra
              </Button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
