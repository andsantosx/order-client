import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Truck, CreditCard, ChevronDown, Ruler } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/cartStore";
import toast from "react-hot-toast";
import type { Product } from "@/services/product/getById";
import { getById as getProductById } from "@/services/product/getById";

export function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { addItem } = useCartStore();

  const [openSections, setOpenSections] = useState({
    payment: false,
    shipping: false
  });

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        if (!id) return;
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

  if (!product) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center pt-24">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-4 w-32 bg-secondary mb-4 rounded" />
          <p className="text-sm uppercase tracking-widest text-muted-foreground">Loading...</p>
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
    });
    toast.success("Adicionado à sacola");
  };

  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  return (
    <div className="min-h-screen bg-background pt-32 pb-16">
      <div className="mx-auto max-w-[1600px] px-6 lg:px-10">

        <div className="grid grid-cols-1 lg:grid-cols-[100px_auto_400px] gap-8 xl:gap-16 justify-center">

          {/* Column 1: Thumbnails (Desktop) */}
          <div className="hidden lg:flex flex-col gap-4">
            {product.images.map((img, idx) => (
              <button
                key={img.id || idx}
                onClick={() => setCurrentImageIndex(idx)}
                className={`
                  w-full aspect-[3/4] overflow-hidden bg-secondary transition-all duration-300
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

          {/* Column 2: Main Image */}
          <div className="relative w-full max-w-[500px] aspect-[3/4] bg-secondary overflow-hidden mx-auto">
            {product.images[currentImageIndex] && (
              <img
                src={product.images[currentImageIndex].url}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            )}
          </div>

          {/* Column 3: Details */}
          <div className="lg:sticky lg:top-32 h-fit space-y-8">

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
            <Button
              onClick={handleAddToCart}
              className="w-full h-10 bg-primary hover:bg-primary/90 text-primary-foreground font-bold uppercase tracking-widest text-sm rounded-md transition-all active:scale-[0.99]"
            >
              Comprar
            </Button>

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
                  <div className="pb-4 text-sm text-muted-foreground leading-relaxed">
                    <p>Aceitamos cartões de crédito (Visa, Mastercard, Elo, Amex) em até 6x sem juros.</p>
                    <p>Pagamento via PIX com 5% de desconto.</p>
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
                  <div className="pb-4 text-sm text-muted-foreground leading-relaxed">
                    <p>Enviamos para todo o Brasil via Correios (SEDEX e PAC) e Jadlog.</p>
                    <p>Frete grátis para compras acima de R$ 499,00.</p>
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
