"use client";
import Navbar from "@/app/components/Navbar";
import "@/app/globals.css";
import { useEffect, useState } from "react";

const MovieById = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const [movie, setMovie] = useState<any>({});
  const [booked, setBooked] = useState<string[]>([]);

  useEffect(() => {
    fetch(`/api/movies/${id}?token=${localStorage.getItem("token")}`)
      .then((res) => res.json())
      .then((data) => {
        setMovie(data.movie);
        setBooked(data.movie.seatsBooked);
      });
  }, []);

  const [selected, setSelected] = useState<string[]>([]);

  let row: string[];
  row = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k"];

  let column: number[];
  column = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

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
      {/* <div className="text-2xl mb-6 text-center">Movie Booking System</div> */}
      <div className="grid grid-cols-10 divide-x-2 divide-gray-400">
        <div className="flex justify-items-center w-fit gap-12 mx-auto col-span-7">
          <div className="left">
            <div className="grid gap-4">
              <div className="text-center h-6 w-12 flex justify-center items-center uppercase"></div>
              {row.map((rows, idx) => (
                <div
                  className="text-center h-10 w-10 flex justify-center items-center p-2 uppercase"
                  key={idx}
                >
                  {rows}
                </div>
              ))}
            </div>
            {column.map((col, idx) => {
              if (col < 4) {
                return (
                  <div className="grid gap-2" key={idx}>
                    <div className="text-center">{col}</div>
                    {row.map((rows) => (
                      <div
                        className=" border-black uppercase w-12 h-12 text-sm flex justify-center items-center p-2"
                        id={`${col} ${rows}`}
                        onClick={() => addAndRemove(`${col} ${rows}`)}
                        key={`${col} ${rows}`}
                      >
                        {booked.includes(`${col} ${rows}`) ? (
                          <img src="/img/seat-car-red.svg" alt="" />
                        ) : selected.includes(`${col} ${rows}`) ? (
                          <img src="/img/seat-car-blue.svg" alt="" />
                        ) : (
                          <img src="/img/seat-car-green.svg" alt="" />
                        )}
                      </div>
                    ))}
                  </div>
                );
              }
            })}
          </div>
          <div className="middle">
            {column.map((col, idx) => {
              if (col > 3 && col < 8) {
                return (
                  <div className="grid gap-2" key={idx}>
                    <div className="text-center">{col}</div>
                    {row.map((rows) => (
                      <div
                        className=" border-black uppercase w-12 h-12 text-sm flex justify-center items-center p-2"
                        id={`${col} ${rows}`}
                        onClick={() => addAndRemove(`${col} ${rows}`)}
                        key={`${col} ${rows}`}
                      >
                        {booked.includes(`${col} ${rows}`) ? (
                          <img src="/img/seat-car-red.svg" alt="" />
                        ) : selected.includes(`${col} ${rows}`) ? (
                          <img src="/img/seat-car-blue.svg" alt="" />
                        ) : (
                          <img src="/img/seat-car-green.svg" alt="" />
                        )}
                      </div>
                    ))}
                  </div>
                );
              }
            })}
          </div>
          <div className="right">
            {column.map((col, idx) => {
              if (col > 7) {
                return (
                  <div className="grid gap-2" key={idx}>
                    <div className="text-center">{col}</div>
                    {row.map((rows) => (
                      <div
                        className=" border-black uppercase w-12 h-12 text-sm flex justify-center items-center p-2"
                        id={`${col} ${rows}`}
                        onClick={() => addAndRemove(`${col} ${rows}`)}
                        key={`${col} ${rows}`}
                      >
                        {booked.includes(`${col} ${rows}`) ? (
                          <img src="/img/seat-car-red.svg" alt="" />
                        ) : selected.includes(`${col} ${rows}`) ? (
                          <img src="/img/seat-car-blue.svg" alt="" />
                        ) : (
                          <img src="/img/seat-car-green.svg" alt="" />
                        )}
                      </div>
                    ))}
                  </div>
                );
              }
            })}
          </div>
        </div>
        <div className="col-span-3 pl-10">
          <div className="details">
            <div>
              <span className="field font-semibold mr-8 text-blue-700 text-lg">
                Movie:{" "}
              </span>
              <span className="value text-sm">{movie?.title}</span>
            </div>
            <div>
              <span className="field font-semibold mr-8 text-blue-700 text-lg">
                Date:{" "}
              </span>
              <span className="value text-sm">
                {formatDate(movie?.time).date}
              </span>
            </div>
            <div>
              <span className="field font-semibold mr-8 text-blue-700 text-lg">
                Time:{" "}
              </span>
              <span className="value text-sm">
                {formatDate(movie?.time).time}
              </span>
            </div>
            <div>
              <span className="field font-semibold mr-8 text-blue-700 text-lg">
                Price:{" "}
              </span>
              <span className="value text-sm">#{movie?.price}</span>
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
    </div>
  );
};

export default MovieById;
