"use client";
import { useCallback, useEffect, useState } from "react";
import { SearchField } from "./SearchField";
import { SearchResults } from "./SearchResults";
import queryString from "query-string";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { LoadMore } from "components/LoadMore";

export const Search = () => {
  const [keyword, setKeyword] = useState("");
  const [searchResponse, setSearchResponse] = useState([]);
  const [totalResults, setTotalResults] = useState(0);
  const [loadMorePageNumbers, setLoadMorePageNumbers] = useState("1");
  const [displayLoadMore, setDisplayLoadMore] = useState(false);
  const [fisrtLoad, setFirstLoad] = useState(true);

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  console.log(searchParams.get("keyword"));

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
    if (data.total > 3 * parseInt(page || "1")) {
      setDisplayLoadMore(true);
    } else {
      setDisplayLoadMore(false);
    }
  };

  const searchFieldChangeHandler = useCallback((e) => {
    setKeyword(e.target.value);
    setLoadMorePageNumbers("1");
    const updateUrl = async () => {
      router.push(`${pathname}?page=1&keyword=${e.target.value}`);
      // search();
    };
    const delayDebounceFn = setTimeout(() => {
      updateUrl();
    }, 500);
    setFirstLoad(false);
    return () => clearTimeout(delayDebounceFn);
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
    router.push(
      `${pathname}?page=${parseInt(
        currentPage
      )}&keyword=${searchKeyword}&pages=${pages},${parseInt(currentPage)}`
    );
    // searchAndAppendPosts();
  };

  // useEffect(() => {
  //   const updateUrl = async () => {
  //     router.push(`${pathname}?page=1&keyword=${keyword}`);
  //     // search();
  //   };

  //   const delayDebounceFn = setTimeout(() => {
  //     if (!fisrtLoad) {
  //       updateUrl();
  //     } else {
  //       search();
  //     }
  //   }, 500);
  //   setFirstLoad(false);
  //   return () => clearTimeout(delayDebounceFn);
  // }, [keyword, fisrtLoad]);

  useEffect(() => {
    search();
  }, []);

  // useEffect(() => {
  //   search();
  //   // if (isPaginationOrLoadMore === "0") {
  //   //   setHasLoadMore(true);
  //   // }
  // }, []);

  return (
    <div className="container mx-auto px-4">
      <SearchField
        onSearchFieldChange={searchFieldChangeHandler}
        searchKeyword={keyword}
        value={searchParams.get("keyword")}
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
