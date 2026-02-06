import { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { Header } from "@/components/layout/header";
import { CartSidebar } from "@/components/cart/CartSidebar";
import { Footer } from "@/components/layout/footer";
import { RouteSkeleton } from "@/components/layout/RouteSkeleton";
const HomePage = lazy(() => import("@/pages/HomePage").then(m => ({ default: m.HomePage })));
const ShopPage = lazy(() => import("@/pages/ShopPage").then(m => ({ default: m.ShopPage })));
const ProductDetailPage = lazy(() => import("@/pages/ProductDetailPage").then(m => ({ default: m.ProductDetailPage })));
const WishlistPage = lazy(() => import("@/pages/WishlistPage").then(m => ({ default: m.WishlistPage })));
const ContactPage = lazy(() => import("@/pages/ContactPage").then(m => ({ default: m.ContactPage })));
const AboutPage = lazy(() => import("@/pages/AboutPage").then(m => ({ default: m.AboutPage })));
const CheckoutPage = lazy(() => import("@/pages/CheckoutPage").then(m => ({ default: m.CheckoutPage })));
const OrderConfirmationPage = lazy(() => import("@/pages/OrderConfirmationPage").then(m => ({ default: m.OrderConfirmationPage })));
const CreateProductPage = lazy(() => import("@/pages/CreateProductPage").then(m => ({ default: m.CreateProductPage })));
const EditProductPage = lazy(() => import("@/pages/EditProductPage").then(m => ({ default: m.EditProductPage })));
const PoliciesPage = lazy(() => import("@/pages/PoliciesPage").then(m => ({ default: m.PoliciesPage })));
const ExchangesReturnsPage = lazy(() => import("@/pages/ExchangesReturnsPage").then(m => ({ default: m.ExchangesReturnsPage })));
const PaymentsPage = lazy(() => import("@/pages/PaymentsPage").then(m => ({ default: m.PaymentsPage })));
const DeliveryPage = lazy(() => import("@/pages/DeliveryPage").then(m => ({ default: m.DeliveryPage })));
const LoginPage = lazy(() => import("@/pages/LoginPage").then(m => ({ default: m.LoginPage })));
const RegisterPage = lazy(() => import("@/pages/RegisterPage").then(m => ({ default: m.RegisterPage })));
const AdminDashboardPage = lazy(() => import("@/pages/admin/AdminDashboardPage").then(m => ({ default: m.AdminDashboardPage })));
const AdminOverviewPage = lazy(() => import("@/pages/admin/AdminOverviewPage").then(m => ({ default: m.AdminOverviewPage })));
const AdminProductsPage = lazy(() => import("@/pages/admin/AdminProductsPage").then(m => ({ default: m.AdminProductsPage })));
const AdminOrdersPage = lazy(() => import("@/pages/admin/AdminOrdersPage").then(m => ({ default: m.AdminOrdersPage })));
const AdminCategoriesPage = lazy(() => import("@/pages/admin/AdminCategoriesPage").then(m => ({ default: m.AdminCategoriesPage })));
const AdminBrandsPage = lazy(() => import("@/pages/admin/AdminBrandsPage").then(m => ({ default: m.AdminBrandsPage })));
const ProfilePage = lazy(() => import("@/pages/ProfilePage").then(m => ({ default: m.ProfilePage })));
import { ProtectedRoute } from "@/components/layout/ProtectedRoute";

import { useUIStore } from "@/store/uiStore";

function AppContent() {
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  // Hide footer on admin pages
  const isAdminPage = location.pathname.startsWith("/admin");
  const isRouteLoading = useUIStore((state) => state.isRouteLoading);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <CartSidebar />
      <div className="flex-1 flex flex-col">
        <Suspense fallback={<RouteSkeleton />}>
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
        </Suspense>
      </div>
      {!isHomePage && !isAdminPage && !isRouteLoading && <Footer />}
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
