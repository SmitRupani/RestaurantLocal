import headerBackground from "../assets/header.jpeg";
const Header = () => (
  <header
    className="mb-8 text-center gap-4 mb-6 text-lg font-semibold rounded-lg p-4 shadow"
    style={{
      backgroundImage: `url(${headerBackground})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
    }}
  >
    <h2 className="text-4xl font-bold text-white mb-2">Cocktail Explorer</h2>
    <p className="text-white">
      Search for your favorite cocktails or get a random surprise!
    </p>
  </header>
);

export default Header;
