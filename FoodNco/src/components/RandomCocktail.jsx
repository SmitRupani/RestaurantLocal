import React, { useState, useEffect } from "react";
import CocktailDetails from "./CocktailDetails";
import {useNavigate } from "react-router-dom";

const API_BASE = "https://www.thecocktaildb.com/api/json/v1/1/";

const RandomCocktail = ({ favorites, toggleFavorite }) => {
  const navigate = useNavigate();
  const [randomCocktail, setRandomCocktail] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchRandom = async () => {
    setLoading(true);
    const res = await fetch(`${API_BASE}random.php`);
    const data = await res.json();
    setRandomCocktail(data.drinks ? data.drinks[0] : null);
    setLoading(false);
  };

  useEffect(() => {
    fetchRandom();
  }, []);

  return (
    <div className="flex flex-col items-center mt-8">
      <h2 className="text-2xl font-bold mb-4 text-blue-800">Random Cocktail</h2>
      <button
        className="mb-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        onClick={fetchRandom}
      >
        Get Another Random Cocktail
      </button>
      {loading && <div className="text-black">Loading...</div>}
      {randomCocktail && (
        <CocktailDetails
          selected={randomCocktail}
          setSelected={() => navigate("/")}
          favorites={favorites}
          toggleFavorite={toggleFavorite}
        />
      )}
    </div>
  );
};

export default RandomCocktail;
