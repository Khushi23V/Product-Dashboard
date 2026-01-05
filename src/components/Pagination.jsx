export default function Pagination({
  total,
  perPage,
  currentPage,
  setCurrentPage,
}) {
  const totalPages = Math.ceil(total / perPage);

  if (totalPages <= 1) return null;

  return (
    <div className="pagination">
      <button className="pagination-extra"
        onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
        disabled={currentPage === 1}
      >
        {'<   ' }      Previous 
      </button>

      {Array.from({ length: totalPages }, (_, i) => (
        <button
          key={i}
          className={currentPage === i + 1 ? "active" : ""}
          onClick={() => setCurrentPage(i + 1)}
        >
          {i + 1}
        </button>
      ))}

      <button
        onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
        disabled={currentPage === totalPages}
      className="pagination-extra">
        Next      {'   >'}
      </button>
    </div>
  );
}
