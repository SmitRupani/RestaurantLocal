const CocktailCard = ({ cocktail, showDetails }) => (
    <div
      className="bg-white shadow rounded p-4 hover:shadow-lg cursor-pointer transition"
      onClick={() => showDetails(cocktail)}
    >
      <img src={cocktail.strDrinkThumb} alt={cocktail.strDrink} className="rounded mb-2 w-full h-48 object-cover" />
      <h2 className="text-xl font-semibold text-blue-800">{cocktail.strDrink}</h2>
      <p className="text-sm text-blue-600">{cocktail.strCategory}</p>
    </div>
  );
  
  export default CocktailCard;
  