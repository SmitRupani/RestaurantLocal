import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import RandomButton from "./components/RandomButton";
import CocktailList from "./components/CocktailList";
import CocktailDetails from "./components/CocktailDetails";

const API_BASE = "https://www.thecocktaildb.com/api/json/v1/1/";

function App() {
  const [search, setSearch] = useState("");
  const [cocktails, setCocktails] = useState([]);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState("");
  const [glass, setGlass] = useState("");
  const [alcoholic, setAlcoholic] = useState("");
  const [categories, setCategories] = useState([]);
  const [glasses, setGlasses] = useState([]);
  const [alcoholicOptions, setAlcoholicOptions] = useState([]);

  useEffect(() => {
    async function fetchFilters() {
      const [catRes, glassRes, alcRes] = await Promise.all([
        fetch(`${API_BASE}list.php?c=list`),
        fetch(`${API_BASE}list.php?g=list`),
        fetch(`${API_BASE}list.php?a=list`),
      ]);
      const cats = await catRes.json();
      const gls = await glassRes.json();
      const alcs = await alcRes.json();
      setCategories(cats.drinks || []);
      setGlasses(gls.drinks || []);
      setAlcoholicOptions(alcs.drinks || []);
    }
    fetchFilters();
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSelected(null);
    const res = await fetch(`${API_BASE}search.php?s=${search}`);
    const data = await res.json();
    setCocktails(data.drinks || []);
    setLoading(false);
  };

  const handleFilter = async () => {
    setLoading(true);
    setSelected(null);
    let url = "";
    if (category) {
      url = `${API_BASE}filter.php?c=${encodeURIComponent(category)}`;
    } else if (glass) {
      url = `${API_BASE}filter.php?g=${encodeURIComponent(glass)}`;
    } else if (alcoholic) {
      url = `${API_BASE}filter.php?a=${encodeURIComponent(alcoholic)}`;
    } else {
      setLoading(false);
      return;
    }
    const res = await fetch(url);
    const data = await res.json();
    setCocktails(data.drinks || []);
    setLoading(false);
  };

  const getRandom = async () => {
    setLoading(true);
    setSelected(null);
    setSearch("");
    const res = await fetch(`${API_BASE}random.php`);
    const data = await res.json();
    setCocktails(data.drinks || []);
    setLoading(false);
  };

  const showDetails = (cocktail) => setSelected(cocktail);

  return (
    <div className="min-h-screen bg-blue-50 p-4">
      <Header />
      <div className="flex flex-wrap gap-4 justify-center items-center mb-6">
        {/* Existing SearchBar and RandomButton */}
        <SearchBar
          search={search}
          setSearch={setSearch}
          handleSearch={handleSearch}
        />
        <RandomButton getRandom={getRandom} />

        {/* New Filter Dropdowns */}
        <select
          className="p-2 rounded border"
          value={category}
          onChange={e => {
            setCategory(e.target.value);
            setGlass('');
            setAlcoholic('');
          }}
        >
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat.strCategory} value={cat.strCategory}>
              {cat.strCategory}
            </option>
          ))}
        </select>
        <select
          className="p-2 rounded border"
          value={glass}
          onChange={(e) => setGlass(e.target.value)}
        >
          <option value="">All Glasses</option>
          {glasses.map((gls) => (
            <option key={gls.strGlass} value={gls.strGlass}>
              {gls.strGlass}
            </option>
          ))}
        </select>
        <select
          className="p-2 rounded border"
          value={alcoholic}
          onChange={(e) => setAlcoholic(e.target.value)}
        >
          <option value="">All Types</option>
          {alcoholicOptions.map((alc) => (
            <option key={alc.strAlcoholic} value={alc.strAlcoholic}>
              {alc.strAlcoholic}
            </option>
          ))}
        </select>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          onClick={handleFilter}
          type="button"
        >
          Filter
        </button>
      </div>

      {loading && <div className="text-center text-blue-600">Loading...</div>}
      {!selected && cocktails.length > 0 && (
        <CocktailList cocktails={cocktails} showDetails={showDetails} />
      )}
      {selected && (
        <CocktailDetails selected={selected} setSelected={setSelected} />
      )}
      {!loading && cocktails.length === 0 && !selected && (
        <div className="text-center text-gray-500 mt-8">
          No cocktails found. Try searching for something else!
        </div>
      )}
    </div>
  );
}

export default App;
