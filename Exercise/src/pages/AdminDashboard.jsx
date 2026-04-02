import { useState } from "react";

// ─── Exercise 1: Admin Panel - Single Object Update ───────────────────────────
// GAP 1: { ...user, name: "Super_Admin" }  → spread operator to clone + override
// GAP 2: setUser(updatedUser)              → update state
//         JSON.stringify(updatedUser)       → serialize for localStorage

export default function AdminDashboard() {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("app_user"))
  );

  const handleUpdateName = () => {
    // GAP 1: Create an updated object using spread operator
    const updatedUser = { ...user, name: "Super_Admin" };
    // GAP 2: Save to state and update LocalStorage stringified
    setUser(updatedUser);
    localStorage.setItem("app_user", JSON.stringify(updatedUser));
  };
  // ─── Exercise 4 (Testing Injector) ─────────────────────────────────────────
  const [list, setList] = useState(
    JSON.parse(localStorage.getItem("app_products")) || []
  );
  const injectNewProduct = () => {
    const newItem = {
      id: Date.now(),
      name: "New Test Item",
      price: 99,
      description: "Added via Admin Test Button",
    };
    const updated = [...list, newItem];
    // GAP: Sync state and Local Storage
    setList(updated);
    localStorage.setItem("app_products", JSON.stringify(updated));
  };

  return (
    <div className="space-y-6">
      {/* Exercise 1 */}
      <div className="p-5 bg-gray-800 text-white rounded">
        <h2 className="text-xl font-bold mb-2">Welcome, {user?.name}</h2>
        <button
          onClick={handleUpdateName}
          className="bg-yellow-500 p-2 text-black rounded font-semibold"
        >
          ★ Upgrade Permissions
        </button>
        <p className="text-sm text-gray-400 mt-2">
          Current role: {user?.role}
        </p>
      </div>
      {/* Exercise 4 - Testing Injector */}
      <div className="p-4 bg-gray-800 text-white rounded">
        <h3 className="font-bold mb-2">Admin Inventory Manager</h3>
        <button
          onClick={injectNewProduct}
          className="bg-green-500 p-2 mt-4 rounded"
        >
          +Inject Random Product
        </button>
        <p className="mt-2 text-sm text-gray-400">
          Items in DB: {list.length}
        </p>
      </div>
    </div>
  );
}
