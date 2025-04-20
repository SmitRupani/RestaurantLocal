const SearchBar = ({ search, setSearch, handleSearch }) => (
    <form onSubmit={handleSearch} className="flex gap-2">
      <input
        className="px-3 py-2 rounded border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
        type="text"
        placeholder="Search cocktails..."
        value={search}
        onChange={e => setSearch(e.target.value)}
      />
      <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700" type="submit">
        Search
      </button>
    </form>
  );
  
  export default SearchBar;
  