import { Hero } from "@/components/home/hero"
import { Featured } from "@/components/home/featured"
import { Products } from "@/components/home/products"
import { PromoBanner } from "@/components/home/promo-banner"
import { Footer } from "@/components/layout/footer"
import { BrandNarrative } from "@/components/home/brand-narrative"
import { CookieBanner } from "@/components/ui/cookie-banner"
import { CategorySection } from "@/components/home/category-section"
import { useEffect } from "react"

export function HomePage() {
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-background">
      <Hero />
      <CategorySection />
      <BrandNarrative />
      <Featured />
      <Products />
      <PromoBanner />
      <Footer />
      <CookieBanner />
    </div>
  )
}

