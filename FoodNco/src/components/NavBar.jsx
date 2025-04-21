import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
    return (
        <div className="flex justify-center gap-4 mb-6 text-lg font-semibold border border-gray-300 bg-gray-300 rounded-lg p-4 shadow">
          <Link to="/" className="text-blue-700 hover:underline">
            Home
          </Link>
          <Link to="/favorites" className="text-blue-700 hover:underline">
            Favorites
          </Link>
          <Link to="/random" className="text-blue-700 hover:underline">
            Random
          </Link>
        </div>
    );
}

export default NavBar;