import { X, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";

interface AddedToCartToastProps {
  t: any;
  product: {
    name: string;
    price: number;
    imageUrl?: string;
    size?: string;
  };
  cartSummary: {
    totalItems: number;
    totalAmount: number;
  };
  onViewCart: () => void;
}

export function AddedToCartToast({ t, product, cartSummary, onViewCart }: AddedToCartToastProps) {
  return (
    <div
      className={`${
        t.visible ? "animate-in fade-in slide-in-from-top-full lg:slide-in-from-right-full" : "animate-out fade-out slide-out-to-right-full"
      } max-w-sm w-full bg-background border border-border pointer-events-auto flex flex-col shadow-2xl overflow-hidden rounded-none`}
    >
      <div className="p-4 flex items-start gap-4">
        {/* Product Image */}
        <div className="w-16 h-20 bg-secondary flex-shrink-0 overflow-hidden">
          {product.imageUrl ? (
            <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-[10px] text-muted-foreground uppercase">ORDER</div>
          )}
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-1">
            <span className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-[0.15em] text-foreground">
              <CheckCircle2 className="w-3 h-3" /> Adicionado!
            </span>
            <button
              onClick={() => toast.dismiss(t.id)}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <h3 className="text-[11px] font-bold uppercase truncate leading-tight mb-0.5">
            {product.name} {product.size && `(${product.size})`}
          </h3>
          <p className="text-[10px] text-muted-foreground">
            {new Intl.NumberFormat("pt-BR", {
              style: "currency",
              currency: "BRL",
            }).format(product.price)}
          </p>
        </div>
      </div>

      <div className="bg-secondary/50 p-4 border-t border-border">
        <div className="flex justify-between items-center mb-4">
          <span className="text-[10px] uppercase font-medium text-muted-foreground">Total ({cartSummary.totalItems} {cartSummary.totalItems === 1 ? 'item' : 'items'})</span>
          <span className="text-[11px] font-black tracking-tight">
            {new Intl.NumberFormat("pt-BR", {
              style: "currency",
              currency: "BRL",
            }).format(cartSummary.totalAmount)}
          </span>
        </div>
        <Button
          onClick={() => {
            toast.remove(t.id); // Remove instantly without exit animation
            onViewCart();
          }}
          className="w-full h-10 bg-foreground text-background hover:bg-foreground/90 font-black uppercase tracking-[0.2em] text-[10px] rounded-none transition-all"
        >
          Ver Carrinho
        </Button>
      </div>
    </div>
  );
}
