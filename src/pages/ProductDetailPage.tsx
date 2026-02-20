import { useParams, Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { Truck, CreditCard, ChevronDown, Ruler, Heart, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useCartStore } from "@/store/cartStore";
import { useWishlistStore } from "@/store/wishlistStore";
import { useAuthStore } from "@/store/authStore";
import { add as addToWishlist } from "@/services/wishlist/add";
import { remove as removeFromWishlist } from "@/services/wishlist/remove";
import toast from "react-hot-toast";
import type { Product } from "@/services/product/getById";
import { getById as getProductById } from "@/services/product/getById";
import { AddedToCartToast } from "@/components/cart/AddedToCartToast";

export function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { addItem } = useCartStore();
  const { isInWishlist, addItem: addLocalWishlist, removeItem: removeLocalWishlist, items: wishlistItems } = useWishlistStore();
  const { user } = useAuthStore();

  const [openSections, setOpenSections] = useState({
    payment: false,
    shipping: false
  });

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        if (!id) return;
        window.scrollTo(0, 0); // Scroll to top when product changes
        const data = await getProductById(id);
        setProduct(data);
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

  const scrollRef = useRef<HTMLDivElement>(null);
  const isProgrammaticScroll = useRef(false);

  // Sync scroll with currentImageIndex
  useEffect(() => {
    if (scrollRef.current) {
      const width = scrollRef.current.clientWidth;
      const targetLeft = currentImageIndex * width;

      // If fairly close to target, assume manual scroll (swipe) and don't enforce scroll/lock
      if (Math.abs(scrollRef.current.scrollLeft - targetLeft) < 20) {
        return;
      }

      isProgrammaticScroll.current = true;
      scrollRef.current.scrollTo({
        left: targetLeft,
        behavior: "smooth"
      });

      // Unlock after animation
      const timer = setTimeout(() => {
        isProgrammaticScroll.current = false;
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [currentImageIndex]);

  const handleScroll = () => {
    if (scrollRef.current && !isProgrammaticScroll.current) {
      const width = scrollRef.current.clientWidth;
      const index = Math.round(scrollRef.current.scrollLeft / width);
      // Only update if significantly changed to avoid jitter, though strict equality is fine with round
      if (index !== currentImageIndex && index >= 0 && index < (product?.images?.length || 0)) {
        setCurrentImageIndex(index);
      }
    }
  };

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (product && currentImageIndex < product.images.length - 1) {
      setCurrentImageIndex(prev => prev + 1);
    }
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (currentImageIndex > 0) {
      setCurrentImageIndex(prev => prev - 1);
    }
  };

  if (!product) {
    return (
      <div className="min-h-screen bg-background pt-32 pb-16">
        <div className="mx-auto max-w-[1600px] px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-[100px_auto_400px] gap-8 xl:gap-16 justify-center">

            {/* Thumbnails Skeleton */}
            <div className="hidden lg:flex flex-col gap-4">
              {[1, 2, 3, 4].map((i) => (
                <Skeleton key={i} className="w-full aspect-[3/4] rounded-sm" />
              ))}
            </div>

            {/* Main Image Skeleton */}
            <div className="relative w-full max-w-[500px] aspect-[3/4] mx-auto">
              <Skeleton className="w-full h-full rounded-md" />
            </div>

            {/* Details Skeleton */}
            <div className="space-y-8 lg:mt-0 mt-8">
              {/* Breadcrumbs */}
              <Skeleton className="h-4 w-48" />

              {/* Title & Price */}
              <div className="space-y-4">
                <Skeleton className="h-10 w-3/4" />
                <Skeleton className="h-8 w-32" />
              </div>

              {/* Sizes */}
              <div className="space-y-3">
                <Skeleton className="h-4 w-20" />
                <div className="flex gap-2">
                  {[1, 2, 3, 4].map((i) => (
                    <Skeleton key={i} className="h-6 w-10" />
                  ))}
                </div>
              </div>

              {/* Buttons */}
              <div className="flex gap-4">
                <Skeleton className="flex-1 h-12 rounded-md" />
                <Skeleton className="h-12 w-12 rounded-md" />
              </div>

              {/* Accordions */}
              <div className="space-y-4 pt-4">
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-12 w-full" />
              </div>
            </div>

          </div>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    if (!selectedSize && product.sizes.length > 0) {
      toast.error("Please select a size");
      return;
    }

    const sizeObj = product.sizes.find(s => s.id === selectedSize);
    const sizeName = sizeObj ? sizeObj.name : "N/A";

    addItem({
      productId: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      size: sizeName,
      imageUrl: product.images[0]?.url,
    });

    // Custom Toast
    const totalItems = useCartStore.getState().getItemCount();
    const totalAmount = useCartStore.getState().getTotal();

    toast.custom((t) => (
      <AddedToCartToast 
        t={t}
        product={{
          name: product.name,
          price: product.price,
          imageUrl: product.images[0]?.url,
          size: sizeName
        }}
        cartSummary={{
          totalItems,
          totalAmount
        }}
        onViewCart={() => useCartStore.getState().toggleCart()}
      />
    ), { duration: 4000, position: 'top-right' });
  };

  const handleToggleWishlist = async () => {
    if (!product) return;

    if (!user) {
      toast.error("Faça login para salvar favoritos");
      return;
    }

    const isFavorite = isInWishlist(product.id);

    if (isFavorite) {
      // Remove
      const item = wishlistItems.find(i => i.id === product.id);
      removeLocalWishlist(product.id);
      toast.success("Removido dos favoritos");
      if (item?.wishlistId) {
        try {
          await removeFromWishlist(item.wishlistId);
        } catch (error) {
          console.error("Failed to remove from backend", error);
        }
      }
    } else {
      // Add
      addLocalWishlist({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.images[0]?.url,
        addedAt: Date.now()
      });
      toast.success("Adicionado aos favoritos");
      try {
        await addToWishlist(product.id);
      } catch (error) {
        console.error("Failed to add to backend", error);
        removeLocalWishlist(product.id);
        toast.error("Erro ao salvar favorito");
      }
    }
  };

  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  return (
    <div className="min-h-screen bg-background pt-32 pb-16">
      <div className="mx-auto max-w-[1600px] px-6 lg:px-10">

        <div className="grid grid-cols-1 lg:grid-cols-[100px_auto_400px] gap-8 xl:gap-16 justify-center">

          {/* Column 1: Thumbnails (Order 2 on Mobile, Order 1 on Desktop) */}
          <div className="order-2 lg:order-1 hidden lg:flex flex-col gap-4 overflow-x-auto pb-2 lg:pb-0 scrollbar-hide">
            {product.images.map((img, idx) => (
              <button
                key={img.id || idx}
                onClick={() => setCurrentImageIndex(idx)}
                className={`
                  w-full aspect-[3/4] overflow-hidden bg-secondary transition-all duration-300 rounded-sm
                  ${currentImageIndex === idx ? 'opacity-100 ring-1 ring-black' : 'opacity-60 hover:opacity-100'}
                `}
              >
                <img
                  src={img.url}
                  alt=""
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>

          {/* Column 2: Main Image (Order 1 on Mobile, Order 2 on Desktop) */}
          <div className="order-1 lg:order-2 relative w-full max-w-[500px] aspect-[3/4] bg-secondary overflow-hidden mx-auto group rounded-md">

            {/* Combined Carousel/Static Image */}
            <div
              ref={scrollRef}
              onScroll={handleScroll}
              className="flex w-full h-full overflow-x-auto lg:overflow-hidden snap-x snap-mandatory scrollbar-hide lg:pointer-events-none"
            >
              {product.images.map((img, idx) => (
                <div key={img.id || idx} className="min-w-full h-full snap-center">
                  <img
                    src={img.url}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>

            {/* Navigation Arrows (Mobile Only) */}
            {product.images.length > 1 && (
              <>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={prevImage}
                  className={`lg:hidden absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-0 h-10 w-10 shadow-sm transition-opacity disabled:opacity-0 ${currentImageIndex === 0 ? 'invisible' : ''}`}
                  disabled={currentImageIndex === 0}
                >
                  <ChevronLeft className="w-6 h-6" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={nextImage}
                  className={`lg:hidden absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-0 h-10 w-10 shadow-sm transition-opacity disabled:opacity-0 ${currentImageIndex === product.images.length - 1 ? 'invisible' : ''}`}
                  disabled={currentImageIndex === product.images.length - 1}
                >
                  <ChevronRight className="w-6 h-6" />
                </Button>

                {/* Mobile Pagination Dots */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 lg:hidden">
                  {product.images.map((_, idx) => (
                    <div
                      key={idx}
                      className={`w-2 h-2 rounded-full transition-all ${currentImageIndex === idx ? 'bg-white w-4' : 'bg-white/50'}`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Column 3: Details */}
          <div className="order-3 lg:order-3 lg:sticky lg:top-32 h-fit space-y-8">

            {/* Breadcrumbs */}
            <nav className="flex items-center gap-2 text-xs uppercase tracking-wider text-muted-foreground">
              <Link to="/" className="hover:text-foreground">Inicio</Link>
              <span>.</span>
              <Link to="/loja" className="hover:text-foreground">Loja</Link>
              <span>.</span>
              <span className="text-foreground font-bold truncate max-w-[200px]">{product.name}</span>
            </nav>

            {/* Title & Price */}
            <div className="space-y-4">
              <h1 className="text-3xl md:text-4xl font-black uppercase tracking-tighter leading-none">
                {product.name}
              </h1>
              <p className="text-xl font-medium">
                {new Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }).format(product.price)}
              </p>
            </div>

            {/* Size Selector */}
            {product.sizes.length > 0 && (
              <div className="space-y-3">
                <div className="flex justify-between items-center text-xs uppercase tracking-wider">
                  <span className="font-bold">Tamanho</span>
                  <button className="text-muted-foreground hover:text-foreground underline underline-offset-4 flex items-center gap-1">
                    <Ruler className="w-3 h-3" /> Tabela de Medidas
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size.id}
                      onClick={() => setSelectedSize(size.id)}
                      className={`
                        min-w-[40px] h-6 px-2 flex items-center justify-center border text-sm font-medium transition-all rounded-md
                        ${selectedSize === size.id
                          ? 'bg-primary text-primary-foreground border-primary'
                          : 'bg-transparent text-foreground border-input hover:border-primary hover:bg-secondary/50'}
                      `}
                    >
                      {size.name}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* CTA */}
            <div className="flex gap-4">
              <Button
                onClick={handleAddToCart}
                className="flex-1 h-12 bg-primary hover:bg-primary/90 text-primary-foreground font-bold uppercase tracking-widest text-sm rounded-md transition-all active:scale-[0.99]"
              >
                Comprar
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={handleToggleWishlist}
                className="h-12 w-12 border-input hover:border-red-500 hover:text-red-500 hover:bg-red-50 transition-colors"
              >
                <Heart
                  className={`w-6 h-6 transition-all ${isInWishlist(product.id) ? "fill-red-500 text-red-500 scale-110" : "text-muted-foreground"}`}
                />
              </Button>
            </div>

            {/* Accordions */}
            <div className="border-t border-gray-200 pt-2 space-y-2">

              {/* Payment Methods */}
              <div className="border-b border-gray-200">
                <button
                  onClick={() => toggleSection('payment')}
                  className="w-full py-4 flex items-center justify-between text-xs font-bold uppercase tracking-wider hover:text-muted-foreground transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <CreditCard className="w-4 h-4" />
                    Meios de Pagamento
                  </div>
                  <ChevronDown className={`w-4 h-4 transition-transform ${openSections.payment ? 'rotate-180' : ''}`} />
                </button>
                {openSections.payment && (
                  <div className="pb-4 text-[11px] text-muted-foreground leading-relaxed space-y-4">
                    <div className="space-y-2">
                       <p className="text-foreground font-black uppercase tracking-widest text-[10px]">Cartão de Crédito</p>
                       <p>Visa, Mastercard, Amex, Elo e Hipercard. Parcelamento em até 12x.</p>
                    </div>
                    <div className="space-y-2">
                       <p className="text-foreground font-black uppercase tracking-widest text-[10px]">Pix</p>
                       <p>Aprovação instantânea. O processamento do seu pedido é iniciado imediatamente.</p>
                    </div>
                    <div className="pt-2 flex items-center gap-2 text-foreground/40">
                      <div className="w-1 h-1 bg-foreground/40 rounded-full" />
                      <span className="text-[9px] font-black uppercase tracking-[0.2em]">Transação 100% Segura</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Shipping */}
              <div className="border-b border-gray-200">
                <button
                  onClick={() => toggleSection('shipping')}
                  className="w-full py-4 flex items-center justify-between text-xs font-bold uppercase tracking-wider hover:text-muted-foreground transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <Truck className="w-4 h-4" />
                    Meios de Envio
                  </div>
                  <ChevronDown className={`w-4 h-4 transition-transform ${openSections.shipping ? 'rotate-180' : ''}`} />
                </button>
                {openSections.shipping && (
                  <div className="pb-6 text-[11px] text-muted-foreground leading-relaxed space-y-4">
                    <div className="flex items-center gap-2 text-foreground font-black">
                      <div className="w-1.5 h-1.5 bg-foreground rounded-full" />
                      FRETE GRÁTIS PARA TODO O BRASIL
                    </div>
                    <p className="italic">
                      "Na ORDER, cada pedido é tratado como uma obra de arte. Nossa curadoria garante excelência desde a seleção de cada peça até a logística impecável na entrega às suas mãos."
                    </p>
                  </div>
                )}
              </div>

            </div>

            {/* Description Text */}
            <div className="space-y-2 pt-4">
              <p className="font-bold text-sm uppercase">Sobre</p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {product.description}
              </p>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
