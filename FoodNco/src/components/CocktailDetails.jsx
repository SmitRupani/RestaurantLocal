const CocktailDetails = ({ selected, setSelected }) => (
    <div className="mt-8 max-w-xl mx-auto bg-white shadow-lg rounded-lg p-6">
      <button
        className="mb-4 text-blue-500 hover:underline"
        onClick={() => setSelected(null)}
      >
        ← Back to results
      </button>
      <img src={selected.strDrinkThumb} alt={selected.strDrink} className="rounded mb-4 w-full h-60 object-cover" />
      <h2 className="text-2xl font-bold text-blue-800 mb-2">{selected.strDrink}</h2>
      <p className="mb-2 text-blue-600">{selected.strCategory} | {selected.strAlcoholic}</p>
      <h3 className="font-semibold mt-4 mb-2">Ingredients:</h3>
      <ul className="mb-4 list-disc list-inside">
        {Array.from({ length: 15 }).map((_, i) => {
          const ingredient = selected[`strIngredient${i + 1}`];
          const measure = selected[`strMeasure${i + 1}`];
          return ingredient ? (
            <li key={i}>
              {ingredient} {measure && <span className="text-gray-500">({measure.trim()})</span>}
            </li>
          ) : null;
        })}
      </ul>
      <h3 className="font-semibold mb-2">Instructions:</h3>
      <p className="mb-2">{selected.strInstructions}</p>
    </div>
  );
  
  export default CocktailDetails;
  