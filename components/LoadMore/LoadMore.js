import { useState } from "react";

export const LoadMore = ({ loadMoreHandler, pageNumbers }) => {
  return (
    <div className="container mx-auto py-6 text-center">
      <button
        className="btn"
        onClick={() => {
          loadMoreHandler(pageNumbers);
        }}
      >
        Load More
      </button>
    </div>
  );
};
