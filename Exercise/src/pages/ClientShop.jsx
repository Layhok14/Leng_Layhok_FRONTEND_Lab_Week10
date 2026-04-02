import { useState } from "react";
import { Link } from "react-router-dom";

// ─── Exercise 2: Client Store - List Insertion ────────────────────────────────
// GAP 1: [...products, newItem]  → spread existing array + append new item
// GAP 2: JSON.stringify(newList) → serialize for localStorage
export default function ClientShop() {
  const [products, setProducts] = useState(
    JSON.parse(localStorage.getItem("app_products")) || []
  );
  const addNewItem = () => {
    const newItem = { id: Date.now(), name: "Headphones", price: 120, description: "Wireless headphones" };
    // GAP 1: Create a new array including the old items and the new item
    const newList = [...products, newItem];
    // GAP 2: Update state and LocalStorage
    setProducts(newList);
    localStorage.setItem("app_products", JSON.stringify(newList));
  };
  return (
    <div className="p-5 bg-blue-50">
      <h1 className="text-2xl font-bold mb-4">Client Store</h1>
      <button
        onClick={addNewItem}
        className="bg-green-600 text-white p-2 rounded mb-6"
      >
        + Suggest New Product
      </button>
      {/* Map through products */}
      <div className="grid gap-4">
        {products.map((p) => (
          <div key={p.id} className="p-4 bg-white shadow rounded flex justify-between items-center">
            <div>
              <h3 className="font-bold">{p.name}</h3>
              <p className="text-gray-500 text-sm">{p.description}</p>
            </div>
            <div className="text-right">
              <p className="text-green-600 font-bold">${p.price}</p>
              <Link
                to={`/product/${p.id}`}
                className="text-blue-500 text-sm underline"
              >
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
