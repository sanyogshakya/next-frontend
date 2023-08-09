import queryString from "query-string";
import { useEffect, useState } from "react";

export const Filters = ({ categories, onSearch }) => {
  const [categoriesState, setCategoriesState] = useState([]);

  useEffect(() => {
    const { page: pageNumber, categories: categoriesInitial } =
      queryString.parse(window.location.search);
    categoriesInitial ? setCategoriesState(categoriesInitial.split(",")) : [];
  }, [categories]);

  const handleSearch = () => {
    const selectedCategories = [
      ...document.querySelectorAll(".input--category:checked"),
    ].map((input) => input.value);
    onSearch(selectedCategories);
  };
  return (
    <div className="container mt-8 mx-auto px-4">
      <div className="flex gap-4 flex-wrap">
        {categories.map((category) => (
          <label
            htmlFor={`category-${category.id}`}
            className="flex items-center"
            key={category.id}
            onClick={() => {
              handleSearch();
            }}
          >
            <input
              className="input--category"
              type="checkbox"
              value={category.id}
              id={`category-${category.id}`}
              defaultChecked={categoriesState.includes(category.id)}
            />
            <span className="pl-2">{category.name}</span>
          </label>
        ))}
      </div>
    </div>
  );
};
