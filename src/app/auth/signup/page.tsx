"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";

const Page = () => {
  const router = useRouter();

  type detail = {
    email: string;
    userName: string;
    password: string;
    password1: string;
  };

  const [details, setDetails] = useState<detail>({
    email: "",
    userName: "",
    password: "",
    password1: "",
  });

  const { email, password, userName } = details;

  const changing = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDetails({
      ...details,
      [e.target.name]: e.target.value,
    });
  };

  const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      // fetch("/api/users", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify({
      //     email,
      //     password,
      //     userName,
      //   }),
      // })
      //   .then((res) => res.json())
      //   .then((data) => {
      //     if (data.msg === "Success") {
      //       router.push("/movies");
      //     }
      //   });
      axios
        .post(
          "/auth/registration",
          { email, password, userName },
          {
            baseURL: process.env.REACT_APP_BASE_URL,
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then(({ data }) => {
          if (data.msg === "Success") {
            router.push("/movies");
          }
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="border border-gray-400 rounded-3xl p-10">
        <div className="text-3xl text-center font-semibold mb-4">Register</div>

        <form action="" onSubmit={submitForm}>
          <div className="control mt-2">
            <label htmlFor="title">Email</label>
            <input
              type="email"
              name="email"
              className="block bg-gray-600 text-white mt-2 outline-none p-1 w-full"
              onChange={changing}
            />
          </div>
          <div className="control mt-2">
            <label htmlFor="title">Username</label>
            <input
              type="text"
              name="userName"
              className="block bg-gray-600 text-white mt-2 outline-none p-1 w-full"
              onChange={changing}
            />
          </div>
          <div className="control mt-2">
            <label htmlFor="title">Password</label>
            <input
              type="password"
              name="password"
              className="block bg-gray-600 text-white mt-2 outline-none p-1 w-full"
              onChange={changing}
            />
          </div>
          <div className="control mt-2">
            <label htmlFor="title">Confirm Password</label>
            <input
              type="password"
              name="password1"
              className="block bg-gray-600 text-white mt-2 outline-none p-1 w-full"
              onChange={changing}
            />
          </div>

          <div className="text-center mt-6">
            <button
              type="submit"
              className="bg-gray-200 text-gray-800 text-sm font-semibold py-2 px-6 rounded-md w-full mb-4"
            >
              Sign Up
            </button>
          </div>
          <div className="text-center text-[12px]">
            Already had an account?{" "}
            <Link className="text-blue-500" href={"/auth/signin"}>
              Sign In
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};
export default Page;
