import React, { useState } from 'react';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import RandomButton from './components/RandomButton';
import CocktailList from './components/CocktailList';
import CocktailDetails from './components/CocktailDetails';

const API_BASE = "https://www.thecocktaildb.com/api/json/v1/1/";

function App() {
  const [search, setSearch] = useState('');
  const [cocktails, setCocktails] = useState([]);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSelected(null);
    const res = await fetch(`${API_BASE}search.php?s=${search}`);
    const data = await res.json();
    setCocktails(data.drinks || []);
    setLoading(false);
  };

  const getRandom = async () => {
    setLoading(true);
    setSelected(null);
    setSearch('');
    const res = await fetch(`${API_BASE}random.php`);
    const data = await res.json();
    setCocktails(data.drinks || []);
    setLoading(false);
  };

  const showDetails = (cocktail) => setSelected(cocktail);

  return (
    <div className="min-h-screen bg-blue-50 p-4">
      <Header />
      <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-6">
        <SearchBar search={search} setSearch={setSearch} handleSearch={handleSearch} />
        <RandomButton getRandom={getRandom} />
      </div>
      {loading && <div className="text-center text-blue-600">Loading...</div>}
      {!selected && cocktails.length > 0 && (
        <CocktailList cocktails={cocktails} showDetails={showDetails} />
      )}
      {selected && (
        <CocktailDetails selected={selected} setSelected={setSelected} />
      )}
      {!loading && cocktails.length === 0 && !selected && (
        <div className="text-center text-gray-500 mt-8">No cocktails found. Try searching for something else!</div>
      )}
    </div>
  );
}

export default App;
