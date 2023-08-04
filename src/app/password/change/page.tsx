"use client";

import { useState } from "react";
// import {v4 as uuidv4} from "uuid";
import axios from "axios";
import Navbar from "@/app/components/Navbar";
import Alert from "@/app/components/Alert";

const Page = () => {
  const [alert, setAlert] = useState<any[]>([]);
  type detail = {
    old_password: string;
    new_password1: string;
    new_password2: string;
  };

  const [details, setDetails] = useState<detail>({
    old_password: "",
    new_password1: "",
    new_password2: "",
  });

  const changing = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDetails({
      ...details,
      [e.target.name]: e.target.value,
    });
  };

  const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (details.new_password1 !== details.new_password2) {
      setAlert((prevAlert) => [
        ...prevAlert,
        { type: "bad", text: "Passwords Don't match" },
      ]);
      setTimeout(() => {
        setAlert([]);
      }, 3000);
    }

    try {
      const res = await axios.post(
        "https://r3tro.pythonanywhere.com/auth/password/change/",
        details,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${localStorage.getItem("token")}`,
          },
        }
      );
      setAlert((prevAlert) => [
        ...prevAlert,
        { type: "good", text: res.data.detail },
      ]);
      setTimeout(() => {
        setAlert([]);
      }, 3000);
    } catch (error: any) {
      for (const pass in error.response.data) {
        setAlert((prevAlert) => [
          ...prevAlert,
          { type: "bad", text: error.response.data[pass][0] },
        ]);
        setTimeout(() => {
          setAlert([]);
        }, 3000);
      }
    }
  };

  return (
    <div className="w-4/5 mx-auto">
      <Navbar />
      <div className="flex justify-center items-center min-h-screen">
        <div className="border border-gray-400 rounded-3xl p-10">
          <div className="text-3xl text-center font-semibold mb-4">
            Change Password
          </div>
          {alert.map((ale, idx) => (
            <Alert alert={ale} key={idx} />
          ))}
          <form action="" onSubmit={submitForm} autoComplete="false">
            <div className="control mt-2">
              <label htmlFor="title">Old Password</label>
              <input
                type="text"
                name="old_password"
                className="block bg-gray-600 text-white mt-2 outline-none p-1 w-full"
                onChange={changing}
              />
            </div>

            <div className="control mt-2">
              <label htmlFor="title">Password</label>
              <input
                type="password"
                name="new_password1"
                className="block bg-gray-600 text-white mt-2 outline-none p-1 w-full"
                onChange={changing}
              />
            </div>

            <div className="control mt-2">
              <label htmlFor="title">Confirm Password</label>
              <input
                type="password"
                name="new_password2"
                className="block bg-gray-600 text-white mt-2 outline-none p-1 w-full"
                onChange={changing}
              />
            </div>

            <div className="text-center mt-6">
              <button
                type="submit"
                className="bg-gray-200 text-gray-800 text-sm font-semibold py-2 px-6 rounded-md w-full mb-4"
              >
                Change Password
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Page;
