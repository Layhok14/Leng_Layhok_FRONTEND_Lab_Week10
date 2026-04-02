import { useEffect } from "react";
import { BrowserRouter, Routes, Route, Outlet, Link } from "react-router-dom";
import { staticProducts } from "./data";
import ProductList from "./pages/ProductList";
import ProductDetail from "./pages/ProductDetail";
import AdminDashboard from "./pages/AdminDashboard";
import ClientShop from "./pages/ClientShop";
const ClientLayout = () => (
  <div className="bg-blue-50 min-h-screen">
    <nav className="p-4 bg-blue-600 text-white flex gap-4">
      <Link to="/">Home</Link>
      <Link to="/admin">Admin Panel</Link>
    </nav>
    <div className="p-8">
      <Outlet />
    </div>
  </div>
);

const AdminLayout = () => (
  <div className="flex min-h-screen bg-gray-900 text-white">
    <aside className="w-64 p-6 bg-black flex flex-col gap-4">
      <Link to="/admin">Dashboard</Link>
      <Link to="/">Back to Store</Link>
    </aside>
    <div className="p-8 flex-1">
      <Outlet />
    </div>
  </div>
);

export default function App() {
  useEffect(() => {
    if (!localStorage.getItem("app_products")) {
      localStorage.setItem("app_products", JSON.stringify(staticProducts));
    }
    if (!localStorage.getItem("app_user")) {
      localStorage.setItem("app_user", JSON.stringify({ id: 1, name: "Guest", role: "user" }));
    }
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        {/* CLIENT SECTION */}
        <Route path="/" element={<ClientLayout />}>
          <Route index element={<ClientShop />} />
          {/* Exercise 3 GAP 1: dynamic route for product details by ID */}
          <Route path="product/:id" element={<ProductDetail />} />
        </Route>

        {/* ADMIN SECTION */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}