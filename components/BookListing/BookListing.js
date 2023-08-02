import { useEffect, useState } from "react";
import queryString from "query-string";
import { BookList } from "./BookList/BookList";
import { Pagination } from "components/Pagination";
import { useRouter } from "next/router";
import { Filters } from "./Filters";
import { Loading } from "components/Loading";

export const BookListing = ({}) => {
  const [books, setBooks] = useState([]);
  const [totalBooks, setTotalBooks] = useState("0");
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(false);
  const hasLoadMore = false;

  const router = useRouter();

  const searchBooks = async () => {
    const { page, genre, minPrice, maxPrice } = queryString.parse(
      window.location.search
    );
    let filters = {};
    if (minPrice) {
      filters.minPrice = parseFloat(minPrice);
    }
    if (maxPrice) {
      filters.maxPrice = parseFloat(maxPrice);
    }
    if (page) {
      filters.page = parseInt(page) || "1";
    }
    if (genre) {
      filters.genre = genre;
    }
    setLoading(true);
    const response = await fetch(`/api/bookSearch`, {
      method: "POST",
      body: JSON.stringify({
        ...filters,
      }),
    });
    const data = await response.json();
    setLoading(false);
    setBooks(data.books);
    setTotalBooks(data.total);
    setGenres(data.genres);
  };

  const handlePageClick = async (pageNumber) => {
    const { page, genre, minPrice, maxPrice } = queryString.parse(
      window.location.search
    );
    await router.push(
      `${router.query.slug.join(
        "/"
      )}?page=${pageNumber}&genre=${genre}&minPrice=${minPrice}&maxPrice=${maxPrice}`,
      null,
      {
        shallow: true,
      }
    );
    searchBooks();
  };

  const handleSearch = async ({ genre, minPrice, maxPrice }) => {
    // setLoadMorePageNumbers("1");
    await router.push(
      `${router.query.slug.join(
        "/"
      )}?page=1&genre=${genre}&minPrice=${minPrice}&maxPrice=${maxPrice}`,
      null,
      {
        shallow: true,
      }
    );
    searchBooks();
  };

  useEffect(() => {
    searchBooks();
    // if (isPaginationOrLoadMore === "0") {
    //   setHasLoadMore(true);
    // }
  }, []);

  return (
    <div>
      {loading && <Loading />}
      {!loading && (
        <div>
          <Filters onSearch={handleSearch} genres={genres} />
          <BookList books={books} />
          {/* {hasLoadMore && displayLoadMore && (
        <LoadMore
          loadMoreHandler={loadMoreHandler}
          pageNumbers={loadMorePageNumbers}
        />
      )} */}
          {!hasLoadMore && (
            <Pagination onPageClick={handlePageClick} total={totalBooks} />
          )}
        </div>
      )}
    </div>
  );
};
