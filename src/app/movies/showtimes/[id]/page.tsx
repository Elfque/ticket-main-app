"use client";
import Navbar from "@/app/components/Navbar";
import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";

const Page = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const [movie, setMovie] = useState<any>(null);

  const getMovieById = async () => {
    try {
      const res = await axios.get(
        `https://r3tro.pythonanywhere.com/movies/${id}/`
      );
      setMovie(res.data);
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getMovieById();
  }, []);

  let months: string[] = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const formatDate = (date: Date) => {
    const newDate = new Date(date);

    return {
      date: `${newDate.getDay()}, ${
        months[newDate.getMonth()]
      } ${newDate.getFullYear()}`,
      time: `${newDate.getHours()} : ${newDate.getMinutes()}`,
    };
  };

  return (
    <div className="w-4/5 mx-auto">
      <Navbar />
      {movie && (
        <div>
          <div className="relative h-fit">
            <img
              src={movie.backdrop_path}
              alt=""
              className="w-full h-96 object-cover"
            />
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-black/50">
              <div className="absolute left-4 bottom-4">
                <div className="text-[3rem] font-extrabold">{movie.title}</div>
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
            /10
          </div>
          <div className="mt-4">
            <div>Showtimes</div>
            <div className="grid grid-cols-movieGrid gap-4">
              {movie.showtimes?.map((show) => (
                <div
                  key={show.id}
                  className="bg-gray-900/80 p-2 rounded-md hover:bg-gray-900 transform duration-500"
                >
                  <div>{formatDate(show.start_time).date}</div>
                  <div>{formatDate(show.start_time).time}</div>
                  <div className="text-end">
                    <button className="text-sm font-semibold text-white rounded-md border border-white p-2">
                      <Link href={`/movies/${show.id}`}>Book Seat</Link>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;
