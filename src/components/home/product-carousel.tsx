import { useState, useEffect } from "react"
import { getAll as getAllProducts, type Product } from "@/services/product/getAll"

export function ProductCarousel() {
    const [products, setProducts] = useState<Product[]>([])
    const [hoveredId, setHoveredId] = useState<string | null>(null)

    useEffect(() => {
        const loadProducts = async () => {
            try {
                const data = await getAllProducts()
                // Pegar 6 produtos para o carousel
                setProducts(data.slice(0, 6))
            } catch (error) {
                console.error("Failed to load products", error)
            }
        }
        loadProducts()
    }, [])

    return (
        <section className="py-12 bg-background border-t border-border">
            <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
                {/* Carousel de miniaturas circulares */}
                <div className="flex items-center justify-center gap-6 overflow-x-auto pb-4">
                    {products.map((product) => (
                        <a
                            key={product.id}
                            href={`/produto/${product.id}`}
                            className="flex-shrink-0 group"
                            onMouseEnter={() => setHoveredId(product.id)}
                            onMouseLeave={() => setHoveredId(null)}
                        >
                            <div
                                className={`relative w-16 h-16 rounded-full overflow-hidden border-2 transition-all duration-300 ${hoveredId === product.id
                                    ? 'border-primary scale-110'
                                    : 'border-transparent'
                                    }`}
                            >
                                {product.image ? (
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                ) : (
                                    <div className="h-full w-full bg-secondary flex items-center justify-center">
                                        <span className="text-muted-foreground text-[8px] uppercase">N/A</span>
                                    </div>
                                )}
                            </div>
                        </a>
                    ))}
                </div>
            </div>
        </section>
    )
}
