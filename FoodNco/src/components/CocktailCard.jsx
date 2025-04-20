const CocktailCard = ({ cocktail, showDetails }) => (
    <div
      className="bg-white shadow rounded p-4 hover:shadow-lg cursor-pointer transition"
      onClick={() => showDetails(cocktail)}
    >
      <img src={cocktail.strDrinkThumb} alt={cocktail.strDrink} className="rounded mb-2 w-full h-48 object-cover" />
      <h2 className="text-xl font-semibold text-black">{cocktail.strDrink}</h2>
      <p className="text-sm text-black">{cocktail.strCategory}</p>
    </div>
  );
  
  export default CocktailCard;
  