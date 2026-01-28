import { Hero } from "@/components/home/hero"
import { Featured } from "@/components/home/featured"
import { Products } from "@/components/home/products"
import { PromoBanner } from "@/components/home/promo-banner"
import { Newsletter } from "@/components/home/newsletter"
import { Footer } from "@/components/layout/footer"
import { BrandNarrative } from "@/components/home/brand-narrative"

export function HomePage() {
  return (
    <div className="bg-background">
      <Hero />
      <BrandNarrative />
      <Featured />
      <Products />
      <PromoBanner />
      <Newsletter />
      <Footer />
    </div>
  )
}
