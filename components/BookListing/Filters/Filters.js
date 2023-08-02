import { Input } from "components/Input";
import { useEffect, useState } from "react";
import queryString from "query-string";

export const Filters = ({ genres, onSearch }) => {
  const [selectedGenre, setSelectedGenre] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const handleGenreChange = (e) => {
    setSelectedGenre(e.target.value);
  };

  const handleMinPriceChange = (e) => {
    setMinPrice(e.target.value);
  };

  const handleMaxPriceChange = (e) => {
    setMaxPrice(e.target.value);
  };

  const handleSearch = () => {
    onSearch({ genre: selectedGenre, minPrice, maxPrice });
  };

  useEffect(() => {
    const {
      page: pageNumber,
      genre: genre,
      minPrice: minPriceInitial,
      maxPrice: maxPriceInitial,
    } = queryString.parse(window.location.search);
    setSelectedGenre(genre);
    setMinPrice(minPriceInitial);
    setMaxPrice(maxPriceInitial);
  }, []);

  return (
    <div className="container mt-8 mx-auto px-4">
      <div className="flex gap-4 flex-wrap items-center">
        <div>
          <label htmlFor="genre-filter">Genre: </label>
          <select
            className="border border-slate-900 rounded p-1"
            name="genre"
            id="genre-filter"
            onChange={(e) => {
              handleGenreChange(e);
            }}
            value={selectedGenre}
          >
            <option value="">Select genre...</option>
            {genres.map((genre) => (
              <option value={genre.slug} key={genre.id}>
                {genre.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="min-price-filter">Min price: </label>
          <Input
            type="number"
            name="min-price"
            id="min-price-filter"
            step="0.01"
            min="0"
            onChange={(e) => {
              handleMinPriceChange(e);
            }}
            value={minPrice}
          />
        </div>
        <div>
          <label htmlFor="max-price-filter">Max price: </label>
          <Input
            type="number"
            name="max-price"
            id="max-price-filter"
            step="0.01"
            min="0"
            onChange={(e) => {
              handleMaxPriceChange(e);
            }}
            value={maxPrice}
          />
        </div>
        <button className="btn" onClick={handleSearch}>
          Filter
        </button>
      </div>
    </div>
  );
};
