import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Truck, RotateCcw, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/cartStore";
import toast from "react-hot-toast";
import type { Product } from "@/services/product/getById";
import { getById as getProductById } from "@/services/product/getById";

export function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const { addItem } = useCartStore();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        if (!id) return;
        const data = await getProductById(id);
        setProduct(data);
        // Pre-select first size if available
        if (data.sizes?.length > 0) {
          setSelectedSize(data.sizes[0].id);
        }
      } catch (error) {
        console.error("Failed to fetch product:", error);
        toast.error("Unable to load product");
      }
    };

    fetchProduct();
  }, [id]);

  if (!product) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center pt-24">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-4 w-32 bg-secondary mb-4 rounded" />
          <p className="text-sm uppercase tracking-widest text-muted-foreground">Loading Product...</p>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    if (!selectedSize && product.sizes.length > 0) {
      toast.error("Please select a size");
      return;
    }

    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      imageUrl: product.images[0]?.url,
      // You might want to add size to the cart item in the future
    });
    toast.success("Added to Bag");
  };

  return (
    <div className="min-h-screen bg-background pt-24 pb-16">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <div className="grid lg:grid-cols-[1.5fr_1fr] gap-12 lg:gap-24">

          {/* Left Column: Image Gallery */}
          <div className="space-y-4">
            {product.images.length > 0 ? (
              <div className="grid grid-cols-1 gap-4">
                {product.images.map((img, idx) => (
                  <div key={img.id || idx} className="aspect-[3/4] bg-secondary w-full relative overflow-hidden group">
                    <img
                      src={img.url}
                      alt={`${product.name} ${idx + 1}`}
                      className="object-cover w-full h-full"
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className="aspect-[3/4] bg-secondary w-full flex items-center justify-center text-muted-foreground">
                No Images Available
              </div>
            )}
          </div>

          {/* Right Column: Product Details (Sticky) */}
          <div className="lg:sticky lg:top-32 h-fit space-y-10">
            {/* Header */}
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tighter text-foreground leading-[0.9]">
                {product.name}
              </h1>
              <p className="text-xl md:text-2xl font-medium text-muted-foreground">
                {new Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }).format(product.price)}
              </p>
            </div>

            {/* Description */}
            <div className="prose prose-sm text-muted-foreground">
              <p>{product.description}</p>
            </div>

            {/* Size Selector */}
            {product.sizes.length > 0 && (
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-bold uppercase tracking-wider">Select Size</span>
                  <button className="text-xs underline text-muted-foreground uppercase tracking-wide">Size Guide</button>
                </div>
                <div className="grid grid-cols-4 gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size.id}
                      onClick={() => setSelectedSize(size.id)}
                      className={`
                                    h-12 flex items-center justify-center border text-sm font-bold transition-all
                                    ${selectedSize === size.id
                          ? 'bg-primary text-primary-foreground border-primary'
                          : 'bg-transparent text-foreground border-input hover:border-foreground'}
                                `}
                    >
                      {size.name}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="space-y-4 pt-4 border-t border-border">
              <Button
                onClick={handleAddToCart}
                size="lg"
                className="w-full h-14 text-base font-bold uppercase tracking-wider rounded-none"
                disabled={product.sizes.length > 0 && !selectedSize}
              >
                Add to Bag
              </Button>

              <div className="flex items-center justify-center gap-2 text-xs uppercase tracking-widest text-muted-foreground">
                <Shield className="w-4 h-4" />
                <span>Secure Checkout</span>
              </div>
            </div>

            {/* Key Features Accordion-ish */}
            <div className="space-y-6 pt-8">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-secondary rounded-full">
                  <Truck className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-bold uppercase text-xs tracking-wide">Free Shipping</p>
                  <p className="text-xs text-muted-foreground">On orders over R$ 500</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="p-3 bg-secondary rounded-full">
                  <RotateCcw className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-bold uppercase text-xs tracking-wide">Free Returns</p>
                  <p className="text-xs text-muted-foreground">Within 30 days</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
