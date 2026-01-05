export default function ProductCard({ product, onEdit, onDelete }) {
  return (
    <div className="product-card">
      <div className="product-card-header">
        <h3 className="product-title">{product.name}</h3>
        <span className="product-category">{product.category}</span>
      </div>

      <div className="product-price">₹{product.price}</div>
      <div className="product-stock">Stock: {product.stock}</div>

      <p className="product-description">
        {product.description || "—"}
      </p>

      <div className="card-actions">
        <button onClick={() => onEdit(product)}>Edit</button>
        <button className="action-2" onClick={() => onDelete(product.id)}>Delete</button>
      </div>
    </div>
  );
}

