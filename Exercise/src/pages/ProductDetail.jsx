import { useParams, Link } from "react-router-dom";

// ─── Exercise 4: Dynamic Detail Lookup ───────────────────────────────────────
// GAP 1: Read products from localStorage (not from data.js)
// GAP 2: Find the product — useParams 'id' is a STRING, so parse it to int
export default function ProductDetail() {
  const { id } = useParams();
  // GAP: Get the current list from Local Storage
  const savedItems = JSON.parse(localStorage.getItem("app_products")) || [];
  // GAP: Find the product (useParams 'id' is a string!)
  const product = savedItems.find((p) => p.id === parseInt(id));
  if (!product) return <h2>Product not found</h2>;
  return (
    <div className="p-6 bg-white shadow rounded">
      <Link to="/" className="text-blue-500">← Back to Store</Link>
      <h2 className="text-2xl font-bold mt-4">{product.name}</h2>
      <p className="text-gray-600 italic">{product.description}</p>
      <p className="text-xl font-bold text-green-600 mt-2">${product.price}</p>
    </div>
  );
}
