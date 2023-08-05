"use client";
import LoadingComponent from "@/app/components/LoaderComp";
import Navbar from "@/app/components/Navbar";
import Loading1 from "@/app/components/Loader1";
import useStore, { authState, authFuncs } from "@/app/state/state";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Page = () => {
  const router = useRouter();
  const { user, error, getUser, months, days }: authState & authFuncs =
    useStore();

  const [movies, setMovies] = useState<any[]>();

  const getMyMovies = () => {
    fetch(`https://r3tro.pythonanywhere.com/my-movies/`, {
      headers: {
        Authorization: `Token ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setMovies(data);
      });
  };

  const formatDate = (date: Date) => {
    const newDate = new Date(date);

    return {
      date: `${days[newDate.getDay()]}, ${newDate.getDate()}, ${
        months[newDate.getMonth()]
      } ${newDate.getFullYear()}`,
      time: `${newDate.getHours() < 10 ? 0 : ""}${newDate.getHours()} : ${
        newDate.getMinutes() < 10 ? 0 : ""
      }${newDate.getMinutes()}`,
    };
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
          {movies ? (
            <div>
              {movies?.map((movie) => (
                <Link
                  href={`/movies/mine/${movie.ticket_number}`}
                  key={movie.id}
                >
                  <div className="hover:bg-gray-600 p-2 flex gap-6 border-2 border-gray-500 my-2 rounded-md">
                    <img
                      src={movie.showtime.movie.poster}
                      alt=""
                      className="w-24 h-24 object cover"
                    />
                    <div>
                      <div className="font-semibold">
                        {movie.showtime.movie.title}
                      </div>
                      <div className="text-sm">
                        Time :{formatDate(movie.showtime.start_time).date}{" "}
                        {formatDate(movie.showtime.start_time).time}
                      </div>
                      <div className="text-sm">
                        Seat number : {movie.seat.seat_number}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="flex h-[70vh] justify-center items-center w-[80vw] col-span-4">
              <Loading1 />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;
