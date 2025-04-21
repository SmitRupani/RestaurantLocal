import React, { useState } from "react";

const SearchBar = ({ search, setSearch, handleSearch }) => {
  const [error, setError] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    if (!search.trim()) {
      setError("Please enter a search term.");
      return;
    }
    setError("");
    handleSearch(e);
  };

  return (
    <form onSubmit={onSubmit} className="flex flex-row gap-2">
      <input
        className="px-3 py-2 rounded border border-white text-white"
        type="text"
        placeholder="Search cocktails..."
        value={search}
        onChange={e => {
          setSearch(e.target.value);
          if (error) setError("");
        }}
      />
      {error && <p className="text-red-500">{error}</p>}
      <button className="bg-black text-white px-4 py-2 rounded hover:bg-blue-700" type="submit">
        Search
      </button>
    </form>
  );
};

export default SearchBar;
