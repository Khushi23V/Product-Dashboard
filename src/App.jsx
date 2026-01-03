import { useEffect, useState } from "react";
import ProductForm from "./components/Form";
import ProductList from "./components/List";
import Pagination from "./components/Pagination";

export default function App() {
  const [products, setProducts] = useState([]);
  const [sortBy, setSortBy] = useState("name");
  const [editingProduct, setEditingProduct] = useState(null);
  const [view, setView] = useState("list");
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showForm, setShowForm] = useState(false); 

  const PRODUCTS_PER_PAGE = 3;
useEffect(() => {
  setCurrentPage(1);
}, [sortBy]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
      setCurrentPage(1);
    }, 500);
    return () => clearTimeout(timer);
  }, [search]);

 const filteredProducts = [...products]
  .filter((p) =>
    p.name.toLowerCase().includes(debouncedSearch.toLowerCase())
  )
  .sort((a, b) => {
    if (sortBy === "name") {
      return a.name.localeCompare(b.name);
    }
    if (sortBy === "price") {
      return Number(a.price) - Number(b.price);
    }
    if (sortBy === "stock") {
      return Number(a.stock || 0) - Number(b.stock || 0);
    }
    return 0;
  });


  const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
  const paginatedProducts = filteredProducts.slice(
    startIndex,
    startIndex + PRODUCTS_PER_PAGE
  );

  return (
    <div className="app-container">
      <h1 className="app-title">Product Dashboard</h1>
      <p className="subtitle">Build your product inventory now</p>
      {/* 🔹 Toolbar */}
      <div className="toolbar">
        <input
          className="search-input"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className="toolbar-actions">
          <div className="view-toggle">
            <button
              className={view === "list" ? "active" : ""}
              onClick={() => setView("list")}
            >
              List
            </button>
            <button
              className={view === "card" ? "active" : ""}
              onClick={() => setView("card")}
            >
              Card
            </button>
          </div>

          <button className="add-btn" onClick={() => setShowForm(true)}>
            + Add Product
          </button>
        </div>
      </div>
<select
  value={sortBy}
  onChange={(e) => setSortBy(e.target.value)}
  className="sort-select"
>
  <option value="name">Sort by Name</option>
  <option value="price">Sort by Price</option>
  <option value="stock">Sort by Stock</option>
</select>
      <p className="meta-text">
        Showing {paginatedProducts.length} of {filteredProducts.length} products
      </p>
      

<div className="section-divider" />
{filteredProducts.length === 0 && (
  <div className="empty-state">
    <p>No products found.</p>
  </div>
)}

{filteredProducts.length > 0 && (
  <ProductList
    products={paginatedProducts}
    view={view}
    onEdit={(product) => {
      setEditingProduct(product);
      setShowForm(true);
    }}
    onDelete={(id) => {
      const confirmDelete = window.confirm(
        "Are you sure you want to delete this product?"
      );
      if (!confirmDelete) return;

      setProducts(products.filter((p) => p.id !== id));
    }}
  />
)}

<Pagination
  total={filteredProducts.length}
  perPage={PRODUCTS_PER_PAGE}
  currentPage={currentPage}
  setCurrentPage={setCurrentPage}
/>

      {showForm && (
  <ProductForm
    products={products}
    setProducts={setProducts}
    editingProduct={editingProduct}
    setEditingProduct={setEditingProduct}
    onClose={() => {
      setShowForm(false);
      setEditingProduct(null);
    }}
  />
)}

    </div>
  );
}
