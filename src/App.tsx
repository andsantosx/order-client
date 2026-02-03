import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { Header } from "@/components/layout/header";
import { CartSidebar } from "@/components/cart/CartSidebar";
import { Footer } from "@/components/layout/footer";
import { HomePage } from "@/pages/HomePage";
import { ShopPage } from "@/pages/ShopPage";
import { ProductDetailPage } from "@/pages/ProductDetailPage";
import { WishlistPage } from "@/pages/WishlistPage";
import { ContactPage } from "@/pages/ContactPage";
import { AboutPage } from "@/pages/AboutPage";
import { CheckoutPage } from "@/pages/CheckoutPage";
import { OrderConfirmationPage } from "@/pages/OrderConfirmationPage";
import { CreateProductPage } from "@/pages/CreateProductPage";
import { EditProductPage } from "@/pages/EditProductPage";
import { PoliciesPage } from "@/pages/PoliciesPage";
import { ExchangesReturnsPage } from "@/pages/ExchangesReturnsPage";
import { PaymentsPage } from "@/pages/PaymentsPage";
import { DeliveryPage } from "@/pages/DeliveryPage";
import { LoginPage } from "@/pages/LoginPage";
import { RegisterPage } from "@/pages/RegisterPage";
import { AdminDashboardPage } from "@/pages/admin/AdminDashboardPage";
import { AdminOverviewPage } from "@/pages/admin/AdminOverviewPage";
import { AdminProductsPage } from "@/pages/admin/AdminProductsPage";
import { AdminOrdersPage } from "@/pages/admin/AdminOrdersPage";
import { AdminCategoriesPage } from "@/pages/admin/AdminCategoriesPage";
import { AdminBrandsPage } from "@/pages/admin/AdminBrandsPage";
import { ProtectedRoute } from "@/components/layout/ProtectedRoute";
import { ProfilePage } from "@/pages/ProfilePage";

function AppContent() {
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  // Hide footer on admin pages
  const isAdminPage = location.pathname.startsWith("/admin");

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <CartSidebar />
      <div className="flex-1">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/loja" element={<ShopPage />} />
          <Route path="/produto/:id" element={<ProductDetailPage />} />
          <Route path="/sobre" element={<AboutPage />} />
          <Route path="/politicas" element={<PoliciesPage />} />
          <Route path="/trocas-devolucoes" element={<ExchangesReturnsPage />} />
          <Route path="/pagamentos" element={<PaymentsPage />} />
          <Route path="/entregas" element={<DeliveryPage />} />
          <Route path="/contato" element={<ContactPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/order-confirmation" element={<OrderConfirmationPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* Customer Routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/favoritos" element={<WishlistPage />} />
          </Route>

          {/* Admin Routes */}
          <Route element={<ProtectedRoute requireAdmin />}>
            <Route path="/admin" element={<AdminDashboardPage />}>
              <Route index element={<AdminOverviewPage />} />
              <Route path="products" element={<AdminProductsPage />} />
              <Route path="categories" element={<AdminCategoriesPage />} />
              <Route path="brands" element={<AdminBrandsPage />} />
              <Route path="orders" element={<AdminOrdersPage />} />
            </Route>
            <Route path="/produto/novo" element={<CreateProductPage />} />
            <Route path="/produto/editar/:id" element={<EditProductPage />} />
          </Route>

        </Routes>
      </div>
      {!isHomePage && !isAdminPage && <Footer />}
    </div>
  );
}

export function App() {
  return (
    <BrowserRouter>
      <AppContent />
      <Toaster position="bottom-right" />
    </BrowserRouter>
  );
}

export default App;
