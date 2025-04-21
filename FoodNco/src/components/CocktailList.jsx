import CocktailCard from './CocktailCard';

const CocktailList = ({ cocktails, showDetails, favorites, toggleFavorite }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">
    {cocktails.map(cocktail => (
      <CocktailCard
      key={cocktail.idDrink}
      cocktail={cocktail}
      showDetails={showDetails}
      favorites={favorites}
      toggleFavorite={toggleFavorite}
    />
    
    ))}
  </div>
);

export default CocktailList;
