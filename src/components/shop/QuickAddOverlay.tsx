import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface QuickAddOverlayProps {
  sizes: { id: string; name: string }[];
  onSelect: (sizeName: string) => void;
  onClose: () => void;
}

export function QuickAddOverlay({ sizes, onSelect, onClose }: QuickAddOverlayProps) {
  return (
    <div className="absolute inset-0 bg-background/80 backdrop-blur-sm z-30 flex flex-col items-center justify-center p-4 animate-in fade-in duration-300">
      <button 
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
        className="absolute top-2 right-2 text-muted-foreground hover:text-foreground transition-colors"
      >
        <X className="w-4 h-4" />
      </button>

      <p className="text-[10px] font-black uppercase tracking-[0.2em] mb-4 text-foreground">
        Selecione o Tamanho
      </p>

      <div className="flex flex-wrap justify-center gap-2 max-w-[200px]">
        {sizes.length > 0 ? (
          sizes.map((size) => (
            <Button
              key={size.id}
              onClick={(e) => {
                e.stopPropagation();
                onSelect(size.name);
              }}
              variant="outline"
              className="min-w-[42px] h-8 text-[11px] font-bold uppercase rounded-none border-foreground/20 hover:border-foreground hover:bg-foreground hover:text-background transition-all"
            >
              {size.name}
            </Button>
          ))
        ) : (
          <p className="text-[9px] text-muted-foreground uppercase">Tamanho Único</p>
        )}
      </div>

      {sizes.length === 0 && (
        <Button
          onClick={(e) => {
            e.stopPropagation();
            onSelect("N/A");
          }}
          className="mt-4 bg-foreground text-background font-black uppercase tracking-[0.2em] text-[10px] rounded-none h-10 w-full"
        >
          Confirmar
        </Button>
      )}
    </div>
  );
}
