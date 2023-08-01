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

  const { user, error, getUser, days, months }: authState & authFuncs =
    useStore();

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
      setLoading(false);

      const newError = error?.response?.data.map((err: string) => {
        return { type: "bad", text: err };
      });

      setSeatAlert(
        error?.response?.data
          ? newError
          : [{ text: "Please Try Again", type: "bad" }]
      );
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

  const formatDate: any = (date: Date) => {
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

  const getColNum = (id: number) => {
    return id % 10;
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
        <div className="grid lg:grid-cols-10 lg:divide-x-2 divide-gray-400 w-4/5 mx-auto mb-8">
          <div className="flex gap-4 col-span-10 lg:col-span-7 items-end  overflow-x-auto w-full justify-center">
            <div className="grid gap-4">
              {row.map((rows) => (
                <div
                  className="h-10 w-10 flex justify-center uppercase items-center"
                  key={rows}
                >
                  {rows}
                </div>
              ))}
            </div>
            <div className="flex gap-16">
              <div className="left">
                <div className="text-center">1</div>
                <div className="text-center">2</div>
                <div className="text-center">3</div>
                {movies.seats.map((seat) => {
                  if (getColNum(seat.id) < 4 && getColNum(seat.id) > 0) {
                    return (
                      <div
                        key={seat.id}
                        className=""
                        onClick={() => {
                          if (seat.is_booked) {
                            setSeatAlert([
                              ...seatAlert,
                              {
                                type: "bad",
                                text: "This seat has been booked",
                              },
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
                          <img
                            src="/img/seat-car-red.svg"
                            alt=""
                            className="h-10"
                          />
                        ) : selected.includes(seat.id) ? (
                          <img
                            src="/img/seat-car-blue.svg"
                            alt=""
                            className="h-10"
                          />
                        ) : (
                          <img
                            src="/img/seat-car-green.svg"
                            alt=""
                            className="h-10"
                          />
                        )}
                      </div>
                    );
                  }
                })}
              </div>
              <div className="middle">
                <div className="text-center">4</div>
                <div className="text-center">5</div>
                <div className="text-center">6</div>
                <div className="text-center">7</div>
                {movies.seats.map((seat) => {
                  if (getColNum(seat.id) > 3 && getColNum(seat.id) < 8) {
                    return (
                      <div
                        key={seat.id}
                        className=""
                        onClick={() => {
                          if (seat.is_booked) {
                            setSeatAlert([
                              ...seatAlert,
                              {
                                type: "bad",
                                text: "This seat has been booked",
                              },
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
                          <img
                            src="/img/seat-car-red.svg"
                            alt=""
                            className="h-10"
                          />
                        ) : selected.includes(seat.id) ? (
                          <img
                            src="/img/seat-car-blue.svg"
                            alt=""
                            className="h-10"
                          />
                        ) : (
                          <img
                            src="/img/seat-car-green.svg"
                            alt=""
                            className="h-10"
                          />
                        )}
                      </div>
                    );
                  }
                })}
              </div>
              <div className="right">
                <div className="text-center">8</div>
                <div className="text-center">9</div>
                <div className="text-center">10</div>
                {movies.seats.map((seat) => {
                  if (getColNum(seat.id) > 7 || getColNum(seat.id) === 0) {
                    return (
                      <div
                        key={seat.id}
                        className=""
                        onClick={() => {
                          if (seat.is_booked) {
                            setSeatAlert([
                              ...seatAlert,
                              {
                                type: "bad",
                                text: "This seat has been booked",
                              },
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
                          <img
                            src="/img/seat-car-red.svg"
                            alt=""
                            className="h-10"
                          />
                        ) : selected.includes(seat.id) ? (
                          <img
                            src="/img/seat-car-blue.svg"
                            alt=""
                            className="h-10"
                          />
                        ) : (
                          <img
                            src="/img/seat-car-green.svg"
                            alt=""
                            className="h-10"
                          />
                        )}
                      </div>
                    );
                  }
                })}
              </div>
            </div>
          </div>
          <div className="col-span-10 lg:col-span-3 pl-10 row-start-1 lg:col-start-8">
            <div className="details text-center lg:text-left">
              <div>
                <span className="value text-xl">{movies?.movie.title}</span>
              </div>
              <div>
                <span className="value text-lg">
                  {formatDate(movies?.start_time).date}
                </span>
              </div>
              <div>
                <span className="value text-lg">
                  {formatDate(movies?.start_time).time}
                </span>
              </div>

              <button
                className="book text-sm font-semibold bg-blue-700 text-white py-2 px-6 rounded-md mt-6"
                onClick={bookSeats}
              >
                Book Now
              </button>
              {selected.length > 0 && (
                <div className="my-4">{selected.length} seats selected</div>
              )}
              <div className="signifiers flex gap-6 justify-center flex-wrap lg:block">
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
