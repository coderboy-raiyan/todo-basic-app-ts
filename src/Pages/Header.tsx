import React from "react";
import { BiUserCircle } from "react-icons/bi";

const Header = () => {
  return (
    <header className="bg-white shadow">
      <div className="max-w-6xl mx-auto">
        <nav className="flex justify-between py-2">
          {/* logo */}

          <a href="/">
            <img
              src="https://www.gstatic.com/images/branding/product/1x/keep_2020q4_48dp.png"
              alt=""
            />
          </a>

          <ul className="flex space-x-8 items-center text-sm">
            <li className="text-gray-600 hover:text-blue-500 cursor-pointer">
              Workshop
            </li>
            <li className="text-gray-600 hover:text-blue-500 text-2xl cursor-pointer">
              <BiUserCircle />
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
