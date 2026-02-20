import { X, ShoppingBag, Minus, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetClose,
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
      <SheetContent className="flex w-full flex-col p-6 sm:max-w-lg premium-sidebar animate-smooth-slide-in">
        <SheetHeader className="p-0 mb-6">
          <div className="flex items-center justify-between">
            <SheetTitle className="text-xl font-bold">
              Meu Carrinho ({items.length})
            </SheetTitle>
            <SheetClose className="opacity-70 transition-opacity hover:opacity-100 focus:outline-none">
              <X className="h-5 w-5" strokeWidth={1.5} />
              <span className="sr-only">Fechar</span>
            </SheetClose>
          </div>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center space-y-4 animate-in fade-in zoom-in duration-500">
            <div className="relative mb-4">
              <div className="absolute -inset-4 rounded-full bg-primary/5 blur-xl" />
              <ShoppingBag className="relative h-12 w-12 text-muted-foreground/50" />
            </div>
            <p className="text-lg font-bold uppercase tracking-tight">Seu carrinho está vazio</p>
            <p className="text-[11px] text-muted-foreground uppercase tracking-widest text-center px-4">
              Navegue pela nossa curadoria e encontre sua próxima peça.
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
                    {/* Product Image */}
                    <div className="h-20 w-16 shrink-0 overflow-hidden bg-secondary">
                      {item.imageUrl ? (
                        <img
                          src={item.imageUrl}
                          alt={item.name}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center text-[10px] text-muted-foreground uppercase">
                          ORDER
                        </div>
                      )}
                    </div>
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
                              updateQuantity(item.id, Math.max(1, item.quantity - 1))
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

            <div className="space-y-6 border-t bg-background p-6 pr-6 shadow-[0_-4px_16px_rgba(0,0,0,0.05)]">
              {/* Shipping Info */}
              <div className="space-y-3 pb-2">
                <div className="flex items-center gap-2 text-[10px] text-foreground font-black uppercase tracking-widest">
                  <div className="w-1 h-1 bg-foreground rounded-full" />
                  Frete Grátis para todo o Brasil
                </div>
                <p className="text-[10px] text-muted-foreground leading-relaxed italic">
                  "Excelência em cada detalhe, da curadoria à sua porta."
                </p>
              </div>

              <div className="space-y-4 pt-4 border-t border-border">
                <div className="flex justify-between items-center">
                  <span className="text-xs uppercase font-medium text-muted-foreground">Subtotal</span>
                  <span className="text-sm font-bold">
                    {new Intl.NumberFormat("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    }).format(getTotal())}
                  </span>
                </div>
                <Button
                  className="w-full h-12 bg-foreground text-background hover:bg-foreground/90 font-black uppercase tracking-[0.2em] text-[11px] rounded-none transition-all"
                  onClick={() => {
                    closeCart();
                    navigate("/checkout");
                  }}
                >
                  Iniciar Compra
                </Button>
              </div>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
