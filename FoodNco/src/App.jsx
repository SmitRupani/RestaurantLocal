import React, { useState, useEffect, lazy } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
const Favorites = lazy(() => import("./components/Favorites"));
const Header = lazy(() => import("./components/Header"));
const SearchBar = lazy(() => import("./components/SearchBar"));
const CocktailList = lazy(() => import("./components/CocktailList"));
const CocktailDetails = lazy(() => import("./components/CocktailDetails"));
const Pagination = lazy(() => import("./components/Pagination"));
const RandomCocktail = lazy(() => import("./components/RandomCocktail"));
import bg from "./assets/bg.jpeg";

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
  const [favorites, setFavorites] = useState(() => {
    return JSON.parse(localStorage.getItem("favorites")) || [];
  });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  useEffect(() => {
    setCurrentPage(1);
  }, [cocktails]);

  const paginatedCocktails = cocktails.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

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

  const handleCombinedSearchFilter = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSelected(null);

    let url = "";
    if (category) {
      url = `${API_BASE}filter.php?c=${encodeURIComponent(category)}`;
      // } else if (ingredient) {
      //   url = `${API_BASE}filter.php?i=${encodeURIComponent(ingredient)}`;
    } else {
      url = `${API_BASE}search.php?s=${search}`;
    }

    const res = await fetch(url);
    let data = await res.json();
    let filtered = data.drinks || [];

    if (search && url.indexOf("search.php") === -1) {
      filtered = filtered.filter((cocktail) =>
        cocktail.strDrink.toLowerCase().includes(search.toLowerCase())
      );
    }
    if (glass) {
      filtered = filtered.filter((cocktail) => cocktail.strGlass === glass);
    }
    if (alcoholic) {
      filtered = filtered.filter(
        (cocktail) => cocktail.strAlcoholic === alcoholic
      );
    }

    setCocktails(filtered);
    setLoading(false);
  };

  const toggleFavorite = (cocktail) => {
    let updated;
    if (favorites.some((fav) => fav.idDrink === cocktail.idDrink)) {
      updated = favorites.filter((fav) => fav.idDrink !== cocktail.idDrink);
    } else {
      updated = [...favorites, cocktail];
    }
    setFavorites(updated);
    localStorage.setItem("favorites", JSON.stringify(updated));
  };

  const showDetails = (cocktail) => setSelected(cocktail);

  return (
    <Router>
      <div
        className="min-h-screen p-4"
        style={{
          backgroundImage: `url(${bg})`,
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "fixed",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <Header />
        <nav className="flex justify-center gap-4 mb-6 text-lg font-semibold border border-gray-300 bg-gray-300 rounded-lg p-4 shadow">
          <Link to="/" className="text-blue-700 hover:underline">
            Home
          </Link>
          <Link to="/favorites" className="text-blue-700 hover:underline">
            Favorites
          </Link>
          <Link to="/random" className="text-blue-700 hover:underline">
            Random
          </Link>
        </nav>

        <Routes>
          <Route
            path="/"
            element={
              <>
                <div className="flex flex-wrap gap-4 justify-center items-center mb-6">
                  <SearchBar
                    search={search}
                    setSearch={setSearch}
                    handleSearch={handleCombinedSearchFilter}
                  />

                  <select
                    className="p-2 rounded border text-white"
                    value={category}
                    onChange={(e) => {
                      setCategory(e.target.value);
                      setGlass("");
                      setAlcoholic("");
                      handleCombinedSearchFilter();
                    }}
                  >
                    <option style={{ color: "white", backgroundColor: "black" }} value="">All Categories</option>
                    {categories.map((cat) => (
                      <option style={{ color: "white", backgroundColor: "black" }} key={cat.strCategory} value={cat.strCategory}>
                        {cat.strCategory}
                      </option>
                    ))}
                  </select>
                  <select
                    className="p-2 rounded border text-white"
                    value={glass}
                    onChange={(e) => setGlass(e.target.value)}
                  >
                    <option style={{ color: "white", backgroundColor: "black" }} value="">All Glasses</option>
                    {glasses.map((gls) => (
                      <option style={{ color: "white", backgroundColor: "black" }} key={gls.strGlass} value={gls.strGlass}>
                        {gls.strGlass}
                      </option>
                    ))}
                  </select>
                  <select
                    className="p-2 rounded border text-white"
                    value={alcoholic}
                    onChange={(e) => setAlcoholic(e.target.value)}
                  >
                    <option style={{ color: "white", backgroundColor: "black" }} value="">All Types</option>
                    {alcoholicOptions.map((alc) => (
                      <option style={{ color: "white", backgroundColor: "black" }} key={alc.strAlcoholic} value={alc.strAlcoholic}>
                        {alc.strAlcoholic}
                      </option>
                    ))}
                  </select>
                  <button
                    className="bg-black text-white px-4 py-2 rounded hover:bg-blue-600"
                    onClick={handleCombinedSearchFilter}
                    type="button"
                  >
                    Filter
                  </button>
                </div>

                {loading && (
                  <div className="text-center text-white">Loading...</div>
                )}
                {!selected && cocktails.length > 0 && (
                  <CocktailList
                    cocktails={paginatedCocktails}
                    showDetails={showDetails}
                    favorites={favorites}
                    toggleFavorite={toggleFavorite}
                  />
                )}

                <Pagination
                  currentPage={currentPage}
                  totalPages={Math.ceil(cocktails.length / itemsPerPage)}
                  setCurrentPage={setCurrentPage}
                />
                {selected && (
                  <CocktailDetails
                    selected={selected}
                    setSelected={setSelected}
                    favorites={favorites}
                    toggleFavorite={toggleFavorite}
                  />
                )}

                {!loading && cocktails.length === 0 && !selected && (
                  <div className="text-center text-white mt-8">
                    No cocktails found. Try searching for something else!
                  </div>
                )}
              </>
            }
          />
          {/* Update the Favorites route */}
          <Route
            path="/favorites"
            element={
              <Favorites
                favorites={favorites}
                showDetails={showDetails}
                toggleFavorite={toggleFavorite}
              />
            }
          />
          <Route
            path="/random"
            element={
              <RandomCocktail
                favorites={favorites}
                toggleFavorite={toggleFavorite}
              />
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
