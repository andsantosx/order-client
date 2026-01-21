import { Header } from "./components/header"
import { Hero } from "./components/hero"
import { Categories } from "./components/categories"
import { Products } from "./components/products"
import { Featured } from "./components/featured"
import { PromoBanner } from "./components/promo-banner"
import { Newsletter } from "./components/newsletter"
import { Footer } from "./components/footer"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <Hero />
      <Categories />
      <Products />
      <Featured />
      <PromoBanner />
      <Newsletter />
      <Footer />
    </main>
  )
}
