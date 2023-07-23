"use client";
import React, { useState } from "react";
// import useStore from "@/app/state/state";

const Page = () => {
  // const user = useStore((state) => state.user);
  // const authorized = useStore((state) => state.authorized);
  // const getUser = useStore((state) => state.getUser);
  // const error = useStore((state) => state.error);

  type movie = {
    title: string;
    price: number;
    time: string;
  };

  const [newMovieDetails, setNewMovieDetails] = useState<movie>({
    title: "",
    price: 0,
    time: "",
  });

  const { title, price, time } = newMovieDetails;

  const changing = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewMovieDetails({ ...newMovieDetails, [e.target.name]: e.target.value });
  };

  const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      fetch("/api/movies/new", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: title,
          price: price,
          time: time,
          token: localStorage.getItem("token"),
        }),
      })
        .then((res) => res.json())
        .then((data) => console.log(data));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="border border-gray-400 rounded-3xl p-10">
        <div className="text-3xl text-center font-semibold mb-4">
          Add A Movie
        </div>

        <form action="" onSubmit={submitForm}>
          <div className="control mt-2">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              name="title"
              className="block bg-gray-600 text-white mt-2 outline-none p-1"
              onChange={changing}
            />
          </div>
          <div className="control mt-2">
            <label htmlFor="title">Price</label>
            <input
              type="text"
              name="price"
              className="block bg-gray-600 text-white mt-2 outline-none p-1"
              onChange={changing}
            />
          </div>
          <div className="control mt-2">
            <label htmlFor="title">Date</label>
            <input
              type="datetime-local"
              name="time"
              id=""
              onChange={changing}
              className="block bg-gray-600 text-white mt-2 outline-none p-1"
            />
          </div>

          <div className="text-center mt-6">
            <button
              type="submit"
              className="bg-gray-200 text-gray-800 text-sm font-semibold py-2 px-6 rounded-md"
            >
              Add A Movie
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Page;
