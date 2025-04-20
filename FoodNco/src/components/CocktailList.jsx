import CocktailCard from './CocktailCard';

const CocktailList = ({ cocktails, showDetails }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">
    {cocktails.map(cocktail => (
      <CocktailCard key={cocktail.idDrink} cocktail={cocktail} showDetails={showDetails} />
    ))}
  </div>
);

export default CocktailList;
