const CocktailCard = ({ cocktail, showDetails, favorites, toggleFavorite }) => {
  const isFavorite = favorites?.some(fav => fav.idDrink === cocktail.idDrink);

  return (
    <div
      className="bg-white shadow rounded p-4 hover:shadow-lg cursor-pointer transition relative"
      onClick={() => showDetails(cocktail)}
    >
      <img
        src={cocktail.strDrinkThumb}
        alt={cocktail.strDrink}
        className="rounded mb-2 w-full h-48 object-cover"
      />
      <h2 className="text-xl font-semibold text-black">{cocktail.strDrink}</h2>
      <p className="text-sm text-black">{cocktail.strCategory}</p>
      <button
        className="absolute top-2 right-2 z-10 p-2 hover:scale-110 transition-transform"
        onClick={(e) => {
          e.stopPropagation();
          toggleFavorite(cocktail);
          console.log(isFavorite, "isFavorite in card"); // Debugging line
          console.log(cocktail, "cocktail in card"); // Debugging line
          console.log(favorites, "favorites in card"); // Debugging line
        }}
      >
        {isFavorite ? "💖" : "🤍"}
      </button>
    </div>
  );
};

export default CocktailCard;