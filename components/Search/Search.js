import { useCallback, useEffect, useState } from "react";
import styles from "./SearchField/SearchField.module.css";
import { SearchField } from "./SearchField";
import { SearchResults } from "./SearchResults";
import queryString from "query-string";
import { useRouter } from "next/router";
import { LoadMore } from "components/LoadMore";

export const Search = () => {
  const [keyword, setKeyword] = useState("");
  const [searchResponse, setSearchResponse] = useState([]);
  const [totalResults, setTotalResults] = useState(0);
  const [loadMorePageNumbers, setLoadMorePageNumbers] = useState("1");
  const [displayLoadMore, setDisplayLoadMore] = useState(false);
  const [fisrtLoad, setFirstLoad] = useState(true);

  const router = useRouter();

  const search = async () => {
    const { page, keyword, pages } = queryString.parse(window.location.search);
    const response = await fetch(`/api/search`, {
      method: "POST",
      body: JSON.stringify({
        searchKeyword: keyword,
        page: 1,
        pages: pages,
      }),
    });
    const data = await response.json();
    setSearchResponse(data.results);
    setTotalResults(data.total);
    console.log("TOTAL SEARCH: ", data.total);
    if (data.total > 3 * parseInt(page || "1")) {
      setDisplayLoadMore(true);
    } else {
      setDisplayLoadMore(false);
    }
  };

  const searchFieldChangeHandler = useCallback((e) => {
    setKeyword(e.target.value);
    setLoadMorePageNumbers("1");
  }, []);

  const searchAndAppendPosts = async () => {
    const { page, keyword, pages } = queryString.parse(window.location.search);
    const response = await fetch(`/api/search`, {
      method: "POST",
      body: JSON.stringify({
        page: parseInt(page || "1"),
        searchKeyword: keyword,
        pages: pages,
      }),
    });
    const data = await response.json();
    setSearchResponse(data.results);
    if (totalResults > 3 * parseInt(page || "1")) {
      setDisplayLoadMore(true);
    } else {
      setDisplayLoadMore(false);
    }
  };

  const loadMoreHandler = async (pages) => {
    const { page, keyword } = queryString.parse(window.location.search);
    const pageToAdd = page ? page : 1;
    const searchKeyword = keyword ? keyword : "";
    const currentPage = page ? parseInt(page) + 1 : 2;
    setLoadMorePageNumbers(
      (prevState) => `${prevState},${parseInt(pageToAdd) + 1}`
    );
    await router.push(
      `${router.query.slug.join("/")}?page=${parseInt(
        currentPage
      )}&keyword=${searchKeyword}&pages=${pages},${parseInt(currentPage)}`,
      null,
      {
        shallow: true,
      }
    );
    searchAndAppendPosts();
  };

  useEffect(() => {
    const updateUrl = async () => {
      await router
        .push(
          `${router.query.slug.join("/")}?page=1&keyword=${keyword}`,
          null,
          {
            shallow: true,
          }
        )
        .then(search());
    };
    const delayDebounceFn = setTimeout(() => {
      if (!fisrtLoad) {
        updateUrl();
      } else {
        search();
      }
    }, 500);
    setFirstLoad(false);
    return () => clearTimeout(delayDebounceFn);
  }, [keyword, fisrtLoad]);

  return (
    <div className="container mx-auto px-4">
      <SearchField
        onSearchFieldChange={searchFieldChangeHandler}
        searchKeyword={keyword}
      />
      <SearchResults searchResults={searchResponse} />
      {displayLoadMore && (
        <LoadMore
          loadMoreHandler={loadMoreHandler}
          pageNumbers={loadMorePageNumbers}
        />
      )}
    </div>
  );
};
