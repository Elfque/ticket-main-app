"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
// import useStore from "../state/state";
// import { useRouter } from "next/navigation";
import axios from "axios";

const Movies = () => {
  const [movies, setMovies] = useState<any[]>();

  const getMovies = async () => {
    try {
      const res = await axios.get("https://r3tro.pythonanywhere.com/movies/");
      setMovies(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getMovies();
  }, []);

  const formatDate = (date: Date) => {
    const newDate = new Date(date);
    return Intl.DateTimeFormat("en-US").format(newDate);
  };

  return (
    <div>
      <div className="w-5/6 mx-auto">
        <Navbar />
        <div className="text-2xl mb-4">Movies that are available</div>
        <div className="movies grid grid-cols-movieGrid gap-4">
          {movies &&
            movies?.map((movie) => (
              <Link href={`/movies/showtimes/${movie.id}`} key={movie.id}>
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
            ))}
        </div>
      </div>
    </div>
  );
};

export default Movies;
