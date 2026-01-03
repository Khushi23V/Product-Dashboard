import ProductCard from "./Card";

export default function ProductList({ products, view, onEdit, onDelete }) {
  if (view === "list") {
    return (
      <table className="product-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Category</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p.id}>
              <td>{p.name}</td>
              <td>{p.category}</td>
              <td>₹{p.price}</td>
              <td>{p.stock}</td>
              <td className="desc-col">{p.description || "-"}</td>
              <td className="actions-col">
  <div className="actions">
    <button onClick={() => onEdit(p)}>Edit</button>
    <button className="action-2" onClick={() => onDelete(p.id)}>Delete</button>
  </div>
</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }

  return (
    <div className="card-grid">
      {products.map((p) => (
        <ProductCard
          key={p.id}
          product={p}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
