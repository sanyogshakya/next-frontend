import { useEffect, useState } from "react";
import { BlogList } from "./BlogList/BlogList";
import { Pagination } from "components/Pagination";
import { useRouter } from "next/router";
import queryString from "query-string";
import { Filters } from "./Filters";
import { LoadMore } from "components/LoadMore";

export const BlogListing = ({ isPaginationOrLoadMore }) => {
  const [posts, setPosts] = useState([]);
  const [totalPosts, setTotalPosts] = useState(0);
  const [allCategories, setAllCategories] = useState([]);
  const [loadMorePageNumbers, setLoadMorePageNumbers] = useState("1");
  const [displayLoadMore, setDisplayLoadMore] = useState(false);
  const [hasLoadMore, setHasLoadMore] = useState(false);

  const router = useRouter();

  const searchPosts = async () => {
    const { page, categories, pages } = queryString.parse(
      window.location.search
    );
    const response = await fetch(`/api/blogSearch`, {
      method: "POST",
      body: JSON.stringify({
        page: parseInt(page || "1"),
        selectedCategories: categories,
        pages: pages,
      }),
    });
    const data = await response.json();
    setPosts(data.posts);
    setTotalPosts(data.total);
    setAllCategories(data.postCategories);

    if (data.total > 3 * parseInt(page || "1")) {
      setDisplayLoadMore(true);
    } else {
      setDisplayLoadMore(false);
    }
  };

  const searchAndAppendPosts = async () => {
    const { page, categories } = queryString.parse(window.location.search);
    const response = await fetch(`/api/blogSearch`, {
      method: "POST",
      body: JSON.stringify({
        page: parseInt(page || "1"),
        selectedCategories: categories,
      }),
    });
    const data = await response.json();
    setPosts((prevState) => [...prevState, ...data.posts]);
    if (totalPosts > 3 * parseInt(page || "1")) {
      setDisplayLoadMore(true);
    } else {
      setDisplayLoadMore(false);
    }
  };

  const handlePageClick = async (pageNumber) => {
    const { page, categories } = queryString.parse(window.location.search);
    const selectedCategories = categories ? categories.toString() : "";
    await router.push(
      `${router.query.slug.join(
        "/"
      )}?page=${pageNumber}&categories=${selectedCategories}`,
      null,
      {
        shallow: true,
      }
    );
    searchPosts();
  };

  const handleSearch = async (categories) => {
    setLoadMorePageNumbers("1");
    const selectedCategories = categories ? categories.toString() : "";
    await router.push(
      `${router.query.slug.join("/")}?page=1&categories=${selectedCategories}`,
      null,
      {
        shallow: true,
      }
    );
    searchPosts();
  };

  useEffect(() => {
    searchPosts();
    if (isPaginationOrLoadMore === "0") {
      setHasLoadMore(true);
    }
  }, []);

  const loadMoreHandler = async (pages) => {
    const { page, categories } = queryString.parse(window.location.search);
    const selectedCategories = categories ? categories.toString() : "";
    const currentPage = page ? parseInt(page) + 1 : 2;
    setLoadMorePageNumbers((prevState) => `${prevState},${parseInt(page) + 1}`);
    await router.push(
      `${router.query.slug.join("/")}?page=${parseInt(
        currentPage
      )}&categories=${selectedCategories.toString()}&pages=${pages},${parseInt(
        currentPage
      )}`,
      null,
      {
        shallow: true,
      }
    );
    searchAndAppendPosts();
  };

  return (
    <div>
      <Filters categories={allCategories} onSearch={handleSearch} />
      <BlogList posts={posts} />
      {hasLoadMore && displayLoadMore && (
        <LoadMore
          loadMoreHandler={loadMoreHandler}
          pageNumbers={loadMorePageNumbers}
        />
      )}
      {!hasLoadMore && (
        <Pagination onPageClick={handlePageClick} total={totalPosts} />
      )}
    </div>
  );
};
