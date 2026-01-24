import { Hero } from "@/components/home/hero"
import { Featured } from "@/components/home/featured"
import { Products } from "@/components/home/products"
import { PromoBanner } from "@/components/home/promo-banner"
import { Newsletter } from "@/components/home/newsletter"
import { Footer } from "@/components/layout/footer"

export function HomePage() {
  return (
    <div className="bg-background">
      <Hero />
      <Products />
      <Featured />
      <PromoBanner />
      <Newsletter />
      <Footer />
    </div>
  )
}
