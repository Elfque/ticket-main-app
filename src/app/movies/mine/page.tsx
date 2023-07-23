"use client";
import Navbar from "@/app/components/Navbar";
import useStore, { authState, authFuncs } from "@/app/state/state";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Page = () => {
  const router = useRouter();
  const { user, error, getUser }: authState & authFuncs = useStore();

  const [movies, setMovies] = useState<any[]>([]);

  const getMyMovies = () => {
    fetch(`/api/movies/mine?token=${localStorage.getItem("token")}`)
      .then((res) => res.json())
      .then((data) => {
        setMovies(data.bookings);
        console.log(data);
      });
  };

  useEffect(() => {
    if (!user) {
      getUser();
    }

    user && getMyMovies();
    error === "Authorization required" && router.push("/auth/signin");
  }, [user, error]);

  return (
    <div>
      <div className="w-4/5 mx-auto">
        <Navbar />
        <div className="text-2xl mb-6 font-semibold">My Movies</div>
        <div>
          {movies?.map((movie) => (
            <div className="hover:bg-gray-600 p-2" key={movie.id}>
              <div>{movie.title}</div>
              <div className="text-sm">
                Seats :{" "}
                {movie.seats.map((seat: string, idx: number) => (
                  <span className="uppercase">
                    {seat} {idx !== movie.seats.length - 1 && ","}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Page;
