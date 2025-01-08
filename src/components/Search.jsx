import { useState, useCallback } from "react";

const debounce = (fetchingFunction, delay) => {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      fetchingFunction(...args);
    }, delay);
  };
};

const Search = ({ fetchFunction }) => {
  const [search, setSearch] = useState("");

  const debounceSearch = useCallback(debounce(fetchFunction, 500), [
    fetchFunction,
  ]);

  const handleSearch = (e) => {
    setSearch(e.target.value);
    debounceSearch(e.target.value);
  };

  return (
    <div>
      <input type="text" value={search} onChange={handleSearch} />
    </div>
  );
};

export default Search;
