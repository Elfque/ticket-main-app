"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import axios from "axios";

const Page = () => {
  const router = useRouter();
  type detail = {
    email: string;
    password: string;
  };

  const [details, setDetails] = useState<detail>({
    email: "",
    password: "",
  });

  const { email, password } = details;

  const changing = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDetails({
      ...details,
      [e.target.name]: e.target.value,
    });
  };

  const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      fetch("/api/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.msg === "Success") {
            localStorage.setItem("token", data.token);
            router.push("/movies");
          }
        });
      axios
        .post(
          "/auth/login",
          { email, password },
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
        <div className="text-3xl text-center font-semibold mb-4">Sign In</div>

        <form action="" onSubmit={submitForm}>
          <div className="control mt-2">
            <label htmlFor="title">Email</label>
            <input
              type="email"
              name="email"
              className="block bg-gray-600 text-white mt-2 outline-none p-1"
              onChange={changing}
            />
          </div>
          <div className="control mt-2">
            <label htmlFor="title">Password</label>
            <input
              type="password"
              name="password"
              className="block bg-gray-600 text-white mt-2 outline-none p-1"
              onChange={changing}
            />
          </div>

          <div className="text-center mt-6">
            <button
              type="submit"
              className="bg-gray-200 text-gray-800 text-sm font-semibold py-2 px-6 rounded-md w-full mb-4"
            >
              Sign In
            </button>
            <div className="text-center text-[12px]">
              Don't have an account?{" "}
              <Link className="text-blue-500" href={"/auth/signup"}>
                Sign Up
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
export default Page;
