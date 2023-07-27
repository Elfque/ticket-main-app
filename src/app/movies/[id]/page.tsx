"use client";
import Navbar from "@/app/components/Navbar";
import "@/app/globals.css";
import { useEffect, useState } from "react";
import axios from "axios";

const MovieById = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const [movie, setMovie] = useState<any>({});
  const [booked, setBooked] = useState<string[]>([]);

  const getMovieById = async () => {
    try {
      const res = await axios.get(
        `https://r3tro.pythonanywhere.com/showtimes/${id}/`
      );

      console.log(res.data);
      setMovie(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getMovieById();
  }, []);

  const [selected, setSelected] = useState<string[]>([]);

  let row: string[];
  row = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j"];

  let column: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

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

  const addAndRemove = (seatNumber: string) => {
    if (booked.includes(seatNumber)) {
      alert("Seat Has been Booked");
      return;
    }
    if (selected.includes(seatNumber)) {
      setSelected((prevSelected) =>
        prevSelected.filter((prev) => prev !== seatNumber)
      );
    } else {
      setSelected((prevSelected) => [...prevSelected, seatNumber]);
    }
  };

  const formatDate = (date: Date) => {
    const newDate = new Date(date);

    return {
      date: `${newDate.getDay()}, ${
        months[newDate.getMonth()]
      } ${newDate.getFullYear()}`,
      time: `${newDate.getHours()} : ${newDate.getMinutes()}`,
    };
  };

  const bookSeats = () => {
    fetch(`/api/movies/${id}?token=${localStorage.getItem("token")}`, {
      method: "PATCH",
      body: JSON.stringify({
        seats: selected,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setBooked(data.movie.seatsBooked);
        setMovie(data.movie);
        setSelected([]);
      });
  };

  return (
    <div>
      <div className="w-4/5 mx-auto mb-6">
        <Navbar />
      </div>

      <div className="grid grid-cols-10 divide-x-2 divide-gray-400">
        <div className="flex justify-items-center w-fit gap-4 mx-auto col-span-7">
          <div className="grid gap-2">
            <div className=" h-6 w-6 "></div>
            {row.map((rows, idx) => (
              <div
                className="text-center h-10 w-10 flex justify-center items-center p-2 uppercase"
                key={idx}
              >
                {rows}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-10 gap-2">
            {column.map((col) => (
              <div className="text-center" key={col}>
                {col}
              </div>
            ))}
            {movie?.seats?.map((seat) => (
              <div
                className=" border-black uppercase w-12 h-12 text-sm flex justify-center items-center p-2"
                onClick={() => addAndRemove(seat.seat_number)}
                key={seat.seat_number}
              >
                {seat.isbooked ? (
                  <img src="/img/seat-car-red.svg" alt="" />
                ) : selected.includes(seat.seat_number) ? (
                  <img src="/img/seat-car-blue.svg" alt="" />
                ) : (
                  <img src="/img/seat-car-green.svg" alt="" />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="col-span-3 pl-10">
          <div className="details">
            <div>
              <span className="field font-semibold mr-8 text-blue-700 text-lg">
                Movie:{" "}
              </span>
              <span className="value text-sm">{movie?.movie?.title}</span>
            </div>
            <div>
              <span className="field font-semibold mr-8 text-blue-700 text-lg">
                Date:{" "}
              </span>
              <span className="value text-sm">
                {formatDate(movie?.start_time)?.date}
              </span>
            </div>
            <div>
              <span className="field font-semibold mr-8 text-blue-700 text-lg">
                Time:{" "}
              </span>
              <span className="value text-sm">
                {formatDate(movie?.start_time)?.time}
              </span>
            </div>
            {/* <div>
              <span className="field font-semibold mr-8 text-blue-700 text-lg">
                Price:{" "}
              </span>
              <span className="value text-sm">#{movie?.price}</span>
            </div> */}

            <button
              className="book text-sm font-semibold bg-blue-700 text-white py-2 px-6 rounded-md mt-6"
              onClick={bookSeats}
            >
              Book Now
            </button>
            <div className="signifiers">
              <div>
                <img src="/img/seat-car-green.svg" alt="" />
                <div>Available</div>
              </div>
              <div>
                <img src="/img/seat-car-red.svg" alt="" />
                <div>Booked</div>
              </div>
              <div>
                <img src="/img/seat-car-blue.svg" alt="" />
                <div>Selected</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieById;
