import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom"
import { Toaster } from "react-hot-toast"
import { Header } from "@/components/header"
import { CartSidebar } from "@/components/cart/CartSidebar"
import { Footer } from "@/components/footer"
import { HomePage } from "@/pages/HomePage"
import { ShopPage } from "@/pages/ShopPage"
import { ProductDetailPage } from "@/pages/ProductDetailPage"
import { WishlistPage } from "@/pages/WishlistPage"
import { ContactPage } from "@/pages/ContactPage"
import { AboutPage } from "@/pages/AboutPage"

function AppContent() {
  const location = useLocation()
  const isHomePage = location.pathname === "/"

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <CartSidebar />
      <div className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/loja" element={<ShopPage />} />
          <Route path="/produto/:id" element={<ProductDetailPage />} />
          <Route path="/favoritos" element={<WishlistPage />} />
          <Route path="/sobre" element={<AboutPage />} />
          <Route path="/contato" element={<ContactPage />} />
        </Routes>
      </div>
      {!isHomePage && <Footer />}
    </div>
  )
}

export function App() {
  return (
    <BrowserRouter>
      <AppContent />
      <Toaster position="bottom-right" />
    </BrowserRouter>
  )
}

export default App
