"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { SlMenu } from "react-icons/sl";
import { FaTimes } from "react-icons/fa";
import { useState } from "react";

const Navbar = () => {
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const router = useRouter();

  const signOut = async () => {
    setShowMenu(false);
    localStorage.removeItem("token");
    router.push("/auth/signin");
  };

  return (
    <div className="py-2 relative">
      <div className="flex justify-between items-center">
        <div className="logo font-bold text-3xl">Booker</div>

        <ul
          className={`sm:flex w-full sm:w-fit absolute top-full p-4 sm:p-0 sm:static gap-4 text-center sm:gap-2 text-sm font-semibold bg-slate-500 sm:bg-transparent ${
            !showMenu && "hidden"
          }`}
        >
          {/* <li className="py-2 px-4 hover:bg-gray-600">
            <Link href={"/movies/mine"}>My Movies</Link>
          </li> */}
          <li className="py-2 px-4 hover:bg-gray-600">
            <Link href={"/movies"}>Movies</Link>
          </li>
          <li className="">
            <button
              className="bg-gray-300 text-gray-700 rounded-full py-2 px-6 font-semibold"
              onClick={signOut}
            >
              Sign Out
            </button>
          </li>
        </ul>
        <div
          className="w-12 h-12 border border-gray-400 rounded-lg p-2 sm:hidden block"
          onClick={() => setShowMenu((prevShowMenu) => !prevShowMenu)}
        >
          {showMenu ? (
            <FaTimes className="text-3xl text-gray-400" />
          ) : (
            <SlMenu className="text-3xl text-gray-400" />
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
