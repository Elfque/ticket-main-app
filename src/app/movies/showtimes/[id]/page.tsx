"use client";

import Navbar from "@/app/components/Navbar";
import { useEffect, useState } from "react";
const Page = ({ params }: { params: { id: string } }) => {
  const { id } = params;

  type movieInterface = {
    seats: Array<any>;
    title: string;
    start_time: Date;
  };
  const [movies, setMovies] = useState<movieInterface>();
  const [selected, setSelected] = useState<string[]>([]);

  let row: string[] = ["", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j"];
  let column: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  const getMyMovies = () => {
    fetch(`https://r3tro.pythonanywhere.com/showtimes/${id}/`)
      .then((res) => res.json())
      .then((data) => {
        setMovies(data);
        console.log(data);
      });
  };

  useEffect(() => {
    getMyMovies();
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

  const bookSeats = () => {
    fetch(`https://r3tro.pythonanywhere.com/showtimes/${id}/`, {
      method: "PUT",
      body: JSON.stringify({
        book_seat: selected,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);

        // setMovies(data.movie);
        // setSelected([]);
      });
  };

  const addAndRemove = (seatNumber: string) => {
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

  return (
    <div>
      <div className="w-4/5 mx-auto mb-6">
        <Navbar />
      </div>
      {movies && (
        <div className="grid grid-cols-10 divide-x-2 divide-gray-400 w-4/5 mx-auto">
          <div className="flex gap-4 col-span-7">
            <div className="grid gap-4">
              {row.map((rows) => (
                <div
                  className="text-center h-10 w-10 flex justify-center items-center p-2 uppercase"
                  key={rows}
                >
                  {rows}
                </div>
              ))}
            </div>
            <div className="grid grid-cols-10 gap-4">
              {column.map((col) => (
                <div
                  className="text-center h-10 w-10 flex justify-center items-center p-2 uppercase"
                  key={col}
                >
                  {col}
                </div>
              ))}
              {movies.seats.map((seat) => (
                <div
                  key={seat.seat_number}
                  className=""
                  onClick={() => {
                    if (seat.isbooked) {
                      alert("Seat has been booked");
                    } else {
                      addAndRemove(seat.seat_number);
                    }
                  }}
                >
                  {seat.isbooked === true ? (
                    <img src="/img/seat-car-red.svg" alt="" className="h-10" />
                  ) : selected.includes(seat.seat_number) ? (
                    <img src="/img/seat-car-blue.svg" alt="" className="h-10" />
                  ) : (
                    <img
                      src="/img/seat-car-green.svg"
                      alt=""
                      className="h-10"
                    />
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
                <span className="value text-sm">{movies?.title}</span>
              </div>
              <div>
                <span className="field font-semibold mr-8 text-blue-700 text-lg">
                  Date:{" "}
                </span>
                <span className="value text-sm">
                  {formatDate(movies?.start_time).date}
                </span>
              </div>
              <div>
                <span className="field font-semibold mr-8 text-blue-700 text-lg">
                  Time:{" "}
                </span>
                <span className="value text-sm">
                  {formatDate(movies?.start_time).time}
                </span>
              </div>

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
      )}
    </div>
  );
};

export default Page;
