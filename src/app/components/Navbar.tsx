"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";

const Navbar = () => {
  const router = useRouter();

  const signOut = async () => {
    try {
      axios
        .get("https://r3tro.pythonanywhere.com/auth/logout/", {
          headers: {
            Authorization: `Token ${localStorage.getItem("token")}`,
          },
        })
        .then((data) => {
          // localStorage.removeItem("token");
          console.log(data);
        });
    } catch (error) {
      console.log(error);
    }
    // router.push("/auth/signin");
  };

  return (
    <div className="py-2">
      <div className="flex justify-between items-center">
        <div className="logo font-bold text-3xl">Booker</div>

        <ul className="flex gap-2 text-sm font-semibold">
          {/* <li>
            <Link href={"/"}>Movies</Link>
          </li> */}
          <li className="py-2 px-4 hover:bg-gray-600">
            <Link href={"/movies/mine"}>My Movies</Link>
          </li>
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
      </div>
    </div>
  );
};

export default Navbar;
