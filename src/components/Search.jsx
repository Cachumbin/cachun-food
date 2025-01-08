import { useState } from "react";

const Search = () => {
  const [search, setSearch] = useState("");

  const debounce = (fetchingFunction, delay) => {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
    };
  };

  return (
    <div>
      <input
        type="text"
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
        }}
      />
    </div>
  );
};

export default Search;
