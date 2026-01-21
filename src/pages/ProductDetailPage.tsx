import { useParams } from "react-router-dom"
import { useState } from "react"
import { Heart, ShoppingBag, Star, Truck, RotateCcw, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import { allProducts } from "@/data/products"
import { useCartStore } from "@/store/cartStore"
import { useWishlistStore } from "@/store/wishlistStore"
import toast from "react-hot-toast"

export function ProductDetailPage() {
  const { id } = useParams()
  const product = allProducts.find((p) => p.id === Number(id))
  const [quantity, setQuantity] = useState(1)
  const [selectedColor, setSelectedColor] = useState(product?.colors[0])
  const [selectedSize, setSelectedSize] = useState(product?.sizes[0])
  const [selectedImage, setSelectedImage] = useState(0)
  const { addItem } = useCartStore()
  const { isInWishlist, addItem: addToWishlist, removeItem: removeFromWishlist } = useWishlistStore()

  if (!product) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center pt-24">
        <p className="text-xl text-muted-foreground">Produto não encontrado</p>
      </div>
    )
  }

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity,
      selectedColor,
      selectedSize,
    })
    toast.success("Adicionado à sacola!")
    setQuantity(1)
  }

  const handleWishlist = () => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id)
      toast.success("Removido dos favoritos")
    } else {
      addToWishlist({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        addedAt: Date.now(),
      })
      toast.success("Adicionado aos favoritos!")
    }
  }

  return (
    <div className="min-h-screen bg-background pt-24 pb-16">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Images */}
          <div className="space-y-4">
            <div className="aspect-[3/4] rounded-2xl overflow-hidden bg-card">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            {/* Thumbnails */}
            <div className="flex gap-3">
              {[product.image, product.image, product.image].map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(i)}
                  className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                    selectedImage === i ? "border-primary" : "border-transparent"
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Details */}
          <div className="space-y-6">
            {/* Header */}
            <div>
              <div className="flex items-center gap-3 mb-3">
                {product.tag && (
                  <span className="px-3 py-1 rounded-full bg-primary/20 text-primary text-xs font-semibold">
                    {product.tag}
                  </span>
                )}
                <span className="text-xs font-semibold text-muted-foreground uppercase">
                  {product.category}
                </span>
              </div>
              <h1 className="text-4xl font-bold text-foreground mb-3">{product.name}</h1>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${i < Math.floor(product.rating) ? "fill-primary text-primary" : "text-muted-foreground"}`}
                    />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">{product.reviews} avaliações</span>
              </div>
            </div>

            {/* Price */}
            <div className="space-y-2 py-4 border-y border-border">
              <div className="flex items-baseline gap-3">
                <p className="text-3xl font-bold text-foreground">
                  R$ {product.price.toLocaleString("pt-BR")}
                </p>
                {product.originalPrice && (
                  <p className="text-lg text-muted-foreground line-through">
                    R$ {product.originalPrice.toLocaleString("pt-BR")}
                  </p>
                )}
              </div>
              {product.originalPrice && (
                <p className="text-sm text-primary font-semibold">
                  Economize R$ {(product.originalPrice - product.price).toLocaleString("pt-BR")}
                </p>
              )}
            </div>

            {/* Description */}
            <p className="text-foreground/80 leading-relaxed">{product.description}</p>

            {/* Stock */}
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-primary" />
              <span className="text-sm text-foreground">
                {product.stock} produtos em estoque
              </span>
            </div>

            {/* Color Selection */}
            <div>
              <label className="block text-sm font-semibold text-foreground mb-3">Cor</label>
              <div className="flex gap-3">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`w-10 h-10 rounded-full border-2 transition-all ${
                      selectedColor === color
                        ? "border-foreground ring-2 ring-primary"
                        : "border-border hover:border-foreground"
                    }`}
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </div>

            {/* Size Selection */}
            <div>
              <label className="block text-sm font-semibold text-foreground mb-3">Tamanho</label>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 rounded-lg border transition-all ${
                      selectedSize === size
                        ? "bg-primary text-primary-foreground border-primary"
                        : "border-border text-foreground hover:border-foreground"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div>
              <label className="block text-sm font-semibold text-foreground mb-3">Quantidade</label>
              <div className="flex items-center border border-border rounded-lg w-fit">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4 py-2 text-foreground hover:bg-secondary transition-colors"
                >
                  -
                </button>
                <span className="px-6 py-2 text-center font-semibold">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-4 py-2 text-foreground hover:bg-secondary transition-colors"
                >
                  +
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-4">
              <Button
                onClick={handleAddToCart}
                className="flex-1 h-12 bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg flex items-center justify-center gap-2"
              >
                <ShoppingBag className="h-5 w-5" />
                Adicionar à Sacola
              </Button>
              <button
                onClick={handleWishlist}
                className={`px-6 h-12 rounded-lg border-2 transition-all flex items-center justify-center ${
                  isInWishlist(product.id)
                    ? "bg-destructive/20 border-destructive text-destructive"
                    : "border-border text-muted-foreground hover:border-foreground hover:text-foreground"
                }`}
              >
                <Heart className={`h-5 w-5 ${isInWishlist(product.id) ? "fill-current" : ""}`} />
              </button>
            </div>

            {/* Features */}
            <div className="grid grid-cols-3 gap-4 pt-8 border-t border-border">
              <div className="text-center">
                <Truck className="h-6 w-6 text-primary mx-auto mb-2" />
                <p className="text-xs font-semibold text-foreground">Frete Grátis</p>
              </div>
              <div className="text-center">
                <RotateCcw className="h-6 w-6 text-primary mx-auto mb-2" />
                <p className="text-xs font-semibold text-foreground">Devolução Fácil</p>
              </div>
              <div className="text-center">
                <Shield className="h-6 w-6 text-primary mx-auto mb-2" />
                <p className="text-xs font-semibold text-foreground">Garantia</p>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        <div className="pt-8 border-t border-border">
          <h2 className="text-3xl font-bold text-foreground mb-6">Produtos Relacionados</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {allProducts
              .filter((p) => p.category === product.category && p.id !== product.id)
              .slice(0, 4)
              .map((relatedProduct) => (
                <a
                  key={relatedProduct.id}
                  href={`/produto/${relatedProduct.id}`}
                  className="group"
                >
                  <div className="aspect-[3/4] rounded-lg overflow-hidden bg-card mb-3">
                    <img
                      src={relatedProduct.image}
                      alt={relatedProduct.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                    {relatedProduct.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    R$ {relatedProduct.price.toLocaleString("pt-BR")}
                  </p>
                </a>
              ))}
          </div>
        </div>
      </div>
    </div>
  )
}
