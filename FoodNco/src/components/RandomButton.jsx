const RandomButton = ({ getRandom }) => (
    <button
      className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
      onClick={getRandom}
    >
      Random Cocktail
    </button>
  );
  
  export default RandomButton;
  