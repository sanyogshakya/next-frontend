export const Pagination = ({ total, onPageClick }) => {
  const numberOfPosts = 3;
  const totalPages = Math.ceil(total / numberOfPosts);
  return (
    <div className="max-w-5xl mx-auto flex justify-center mb-16 gap-2">
      {Array.from({ length: totalPages }).map((_, i) => (
        <div
          key={i}
          className="btn"
          onClick={() => {
            onPageClick(i + 1);
          }}
        >
          {i + 1}
        </div>
      ))}
    </div>
  );
};
