"use client";
import Navbar from "@/app/components/Navbar";
import Loading1 from "@/app/components/Loader1";
import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import useStore, { authState, authFuncs } from "@/app/state/state";
import { useRouter } from "next/navigation";

const Page = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const { user, error, getUser, months, days }: authState & authFuncs =
    useStore();

  interface movieType {
    showtimes: any[];
    rating: string;
    duration: string;
    backdrop_path: string;
    overview: string;
    title: string;
  }
  const [movie, setMovie] = useState<movieType>();

  const getMovieById = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `https://r3tro.pythonanywhere.com/movies/${id}/`
      );
      setMovie(res.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!localStorage.getItem("token")) router.push("/auth/signin");
    if (!user) getUser();
    user && getMovieById();
  }, [user]);

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

  return (
    <div className="w-4/5 mx-auto">
      <Navbar />
      {movie ? (
        <div className="my-8 ">
          <div className="relative h-fit">
            <img
              src={movie.backdrop_path}
              alt=""
              className="w-full h-96 object-cover"
            />
            <div className="absolute top-0 left-0 w-full h-full movie-grad">
              <div className="absolute left-4 bottom-4">
                <div className="text-[2.5rem] font-extrabold">
                  {movie.title}
                </div>
                <div className="text-sm">{movie.overview}</div>
              </div>
            </div>
          </div>

          <div className="">
            <span className="font-semibold mr-4 text-xl">Rating:</span>{" "}
            {movie.rating}
            /10
          </div>
          <div className="">
            <span className="font-semibold mr-4 text-xl">Duration:</span>{" "}
            {movie.duration}
          </div>
          <div className="mt-4">
            <div className="font-semibold text-lg mb-2">Showtimes: </div>
            <div className="grid grid-cols-seatGrid gap-4">
              {movie.showtimes?.map((show) => (
                <div
                  key={show.id}
                  className="bg-gray-900/80 p-2 rounded-md hover:bg-gray-900 transform duration-500"
                >
                  <div>{formatDate(show.start_time).date}</div>
                  <div>{formatDate(show.start_time).time}</div>
                  <div className="text-end">
                    <button
                      className="text-sm font-semibold text-white rounded-md border border-white p-2"
                      onClick={() =>
                        router.push(`/movies/showtimes/${show.id}`)
                      }
                    >
                      Book Seat
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="flex h-[80vh] justify-center items-center w-full col-span-4">
          <Loading1 />
        </div>
      )}
    </div>
  );
};

export default Page;
