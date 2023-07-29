"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import useStore, { authState, authFuncs } from "@/app/state/state";
import axios from "axios";
import { useRouter } from "next/navigation";
import Loading1 from "../components/Loader1";

const Movies = () => {
  const router = useRouter();
  const [movies, setMovies] = useState<any[]>();
  // const [loading, setLoading] = useState<boolean>(false);
  const { user, error, getUser }: authState & authFuncs = useStore();

  const getMovies = async () => {
    // setLoading(true)
    try {
      const res = await axios.get("https://r3tro.pythonanywhere.com/movies/");
      setMovies(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!localStorage.getItem("token")) router.push("/auth/signin");
    if (!user) getUser();
    user && getMovies();
  }, [user]);

  const formatDate = (date: Date) => {
    const newDate = new Date(date);
    return Intl.DateTimeFormat("en-US").format(newDate);
  };

  return (
    <div>
      <div className="w-5/6 mx-auto">
        <Navbar />
        <div className="text-2xl mb-4 font-semibold">
          Amazing movies for you
        </div>
        <div className="movies grid grid-cols-movieGrid gap-4">
          {movies ? (
            movies?.map((movie) => (
              <Link href={`/movies/${movie.id}`} key={movie.id}>
                <div className="bg-gray-400 hover:bg-gray-300 rounded-md overflow-hidden movie-card text-slate-700">
                  <div className="w-full h-40 overflow-hidden">
                    <img
                      src={movie.poster}
                      alt=""
                      className="h-full object-cover transform duration-1000 w-full"
                    />
                  </div>
                  <div className="p-2">
                    <div className="w-full truncate">{movie.title}</div>
                    <div>Rating : {movie.rating}</div>
                    <div>Released Date: {movie.release_date}</div>
                    {/* <div>#{movie.price}</div> */}
                    {/* <div>{formatDate(movie.time)}</div> */}
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <div className="flex h-[80vh] justify-center items-center w-full col-span-4">
              <Loading1 />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Movies;
