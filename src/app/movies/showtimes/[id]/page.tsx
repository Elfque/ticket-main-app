"use client";

import Navbar from "@/app/components/Navbar";
import useStore, { authState, authFuncs } from "@/app/state/state";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Loading1 from "@/app/components/Loader1";
import Overlay from "@/app/components/Overlay";
import Alert from "@/app/components/Alert";
import axios from "axios";

const Page = ({ params }: { params: { id: string } }) => {
  const router = useRouter();
  const { id } = params;

  const { user, error, getUser }: authState & authFuncs = useStore();

  type movieInterface = {
    seats: Array<any>;
    title: string;
    movie: any;
    start_time: Date;
  };
  const [movies, setMovies] = useState<movieInterface>();
  const [selected, setSelected] = useState<number[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [seatAlert, setSeatAlert] = useState<any[]>([]);

  let row: string[] = ["", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j"];
  let column: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  const getMyMovies = () => {
    fetch(`https://r3tro.pythonanywhere.com/showtimes/${id}/`)
      .then((res) => res.json())
      .then((data) => {
        setMovies(data);
      });
  };

  useEffect(() => {
    if (!localStorage.getItem("token")) router.push("/auth/signin");
    if (!user) getUser();
    user && getMyMovies();
  }, [user]);

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

  const bookSeats = async () => {
    setLoading(true);

    try {
      const res = await axios.put(
        `https://r3tro.pythonanywhere.com/showtimes/${id}`,
        { book_seat: selected },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${localStorage.getItem("token")}`,
          },
        }
      );
      setMovies(res.data);
      setLoading(false);
    } catch (error: any) {
      setSeatAlert(error.response.data);
      const newError = error.response.data.map((err: string) => {
        return { type: "bad", text: err };
      });

      setSeatAlert(newError);
      setTimeout(() => {
        setSeatAlert([]);
      }, 3000);

      setLoading(false);
    }
  };

  const addAndRemove = (seatNumber: number) => {
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
        {seatAlert.map((ale, idx) => (
          <Alert alert={ale} key={idx} />
        ))}
      </div>
      {movies ? (
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
                  key={seat.id}
                  className=""
                  onClick={() => {
                    if (seat.is_booked) {
                      // alert("Seat has been booked");
                      setSeatAlert([
                        ...seatAlert,
                        { type: "bad", text: "This seat has been booked" },
                      ]);
                      setTimeout(() => {
                        setSeatAlert([]);
                      }, 2000);
                    } else {
                      addAndRemove(seat.id);
                    }
                  }}
                >
                  {seat.is_booked === true ? (
                    <img src="/img/seat-car-red.svg" alt="" className="h-10" />
                  ) : selected.includes(seat.id) ? (
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
                <span className="value text-sm">{movies?.movie.title}</span>
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
      ) : (
        <div className="flex h-[80vh] justify-center items-center w-full col-span-4">
          <Loading1 />
        </div>
      )}
      {loading && (
        <div className="w-screen h-screen flex justify-center items-center fixed top-0">
          <Overlay />
          <div className="relative z-10">
            <Loading1 />
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;
