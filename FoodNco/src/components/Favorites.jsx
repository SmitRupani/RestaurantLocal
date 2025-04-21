import React from 'react';
import CocktailList from './CocktailList';

const Favorites = ({ favorites, showDetails, toggleFavorite }) => (
    <div>
      <h2 className="text-2xl font-bold text-center mb-4 text-white">Your Favorite Cocktails</h2>
      {favorites.length === 0 ? (
        <div className="text-center text-white">No favorites yet.</div>
      ) : (
        <CocktailList 
          cocktails={favorites} // Pass favorites instead of cocktails
          showDetails={showDetails}
          favorites={favorites}
          toggleFavorite={toggleFavorite}
        />
      )}
    </div>
  );
export default Favorites;  