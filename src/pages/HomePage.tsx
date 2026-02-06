import { Hero } from "@/components/home/hero"
import { CookieBanner } from "@/components/ui/cookie-banner"
import { CategorySection } from "@/components/home/category-section"
import { useEffect, Suspense, lazy } from "react"
import { Skeleton } from "@/components/ui/skeleton"

const BrandNarrative = lazy(() => import("@/components/home/brand-narrative").then(m => ({ default: m.BrandNarrative })));
const Featured = lazy(() => import("@/components/home/featured").then(m => ({ default: m.Featured })));
const Products = lazy(() => import("@/components/home/products").then(m => ({ default: m.Products })));
const PromoBanner = lazy(() => import("@/components/home/promo-banner").then(m => ({ default: m.PromoBanner })));
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

      <Suspense fallback={<div className="py-24 lg:py-32 bg-background border-t border-border">
        <div className="mx-auto max-w-[1200px] px-6 lg:px-10">
          <Skeleton className="h-[300px] w-full rounded-2xl" />
        </div>
      </div>}>
        <BrandNarrative />
      </Suspense>

      <Suspense fallback={<Skeleton className="h-[600px] w-full" />}>
        <Featured />
      </Suspense>

      <Suspense fallback={<Skeleton className="h-[600px] w-full" />}>
        <Products />
      </Suspense>

      <Suspense fallback={<Skeleton className="h-[400px] w-full" />}>
        <PromoBanner />
      </Suspense>

      <Suspense fallback={<div className="h-64 bg-secondary/10" />}>
        <FooterLazy />
      </Suspense>
      <CookieBanner />
    </div>
  )
}

