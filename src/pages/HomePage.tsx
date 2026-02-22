import { Hero } from "@/components/home/hero"
import { CookieBanner } from "@/components/ui/cookie-banner"
import { CategorySection } from "@/components/home/category-section"
import { useEffect, Suspense, lazy } from "react"
import { InteractiveLoader } from "@/components/ui/interactive-loader"

const BrandNarrative = lazy(() => import("@/components/home/brand-narrative").then(m => ({ default: m.BrandNarrative })));
const BrandShowcase = lazy(() => import("@/components/home/brand-showcase").then(m => ({ default: m.BrandShowcase })));
const Products = lazy(() => import("@/components/home/products").then(m => ({ default: m.Products })));
const FooterLazy = lazy(() => import("@/components/layout/footer").then(m => ({ default: m.Footer })));

export function HomePage() {
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-background">
      <Hero />
      <CategorySection />

      <Suspense fallback={<div className="py-24 lg:py-32 bg-background">
        <div className="mx-auto max-w-[1200px] px-6 lg:px-10 flex items-center justify-center min-h-[300px]">
          <InteractiveLoader size="lg" variant="spinner" />
        </div>
      </div>}>
        <BrandNarrative />
      </Suspense>

      <Suspense fallback={<div className="min-h-[600px] flex items-center justify-center">
        <InteractiveLoader size="lg" variant="dots" />
      </div>}>
        <Products />
      </Suspense>

      <Suspense fallback={<div className="min-h-[600px] flex items-center justify-center">
        <InteractiveLoader size="lg" variant="pulse" />
      </div>}>
        <BrandShowcase />
      </Suspense>

      <Suspense fallback={<div className="h-64 bg-secondary/10 flex items-center justify-center">
        <InteractiveLoader size="md" variant="pulse" />
      </div>}>
        <FooterLazy />
      </Suspense>
      <CookieBanner />
    </div>
  )
}

