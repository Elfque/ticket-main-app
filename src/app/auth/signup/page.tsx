"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import Alert from "@/app/components/Alert";
import Loader from "@/app/components/Loader";

const Page = () => {
  const [alert, setAlert] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const parentAnimation = {
    hidden: {
      opacity: 0,
      x: "100vw",
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 1,
        type: "spring",
        mass: 0.4,
        damping: 4,
        when: "beforeChildren",
        staggerChildren: 0.4,
      },
    },
  };

  const childrenAnimation = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: {
        duration: 1,
      },
    },
  };

  type detail = {
    email: string;
    username: string;
    password1: string;
    password2: string;
  };

  const [details, setDetails] = useState<detail>({
    email: "",
    username: "",
    password2: "",
    password1: "",
  });

  const { email, password1, password2, username } = details;

  const changing = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDetails({
      ...details,
      [e.target.name]: e.target.value,
    });
  };

  const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post(
        "https://r3tro.pythonanywhere.com/auth/register/",
        { email, password1, password2, username },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      router.push("/auth/signin");
    } catch (error: any) {
      setLoading(false);
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
    <motion.div
      variants={parentAnimation}
      initial="hidden"
      animate="visible"
      className="flex justify-center items-center min-h-screen"
    >
      <div className="border border-gray-400 rounded-3xl p-10 w-[90%] max-w-sm">
        <div className="text-3xl text-center font-semibold mb-4">Register</div>
        {alert.map((ale, idx) => (
          <Alert alert={ale} key={idx} />
        ))}
        <form action="" onSubmit={submitForm} autoComplete="off">
          <motion.div variants={childrenAnimation} className="control mt-2">
            <label htmlFor="title">Email</label>
            <input
              type="email"
              name="email"
              className="block bg-gray-600 text-white mt-2 outline-none py-2 px-4 w-full rounded-md"
              onChange={changing}
            />
          </motion.div>
          <motion.div variants={childrenAnimation} className="control mt-2">
            <label htmlFor="title">Username</label>
            <input
              type="text"
              name="username"
              className="block bg-gray-600 text-white mt-2 outline-none py-2 px-4 w-full rounded-md"
              onChange={changing}
            />
          </motion.div>
          <motion.div variants={childrenAnimation} className="control mt-2">
            <label htmlFor="title">Password</label>
            <input
              type="password"
              name="password1"
              className="block bg-gray-600 text-white mt-2 outline-none py-2 px-4 w-full rounded-md"
              onChange={changing}
            />
          </motion.div>
          <motion.div variants={childrenAnimation} className="control mt-2">
            <label htmlFor="title">Confirm Password</label>
            <input
              type="password"
              name="password2"
              className="block bg-gray-600 text-white mt-2 outline-none py-2 px-4 w-full rounded-md"
              onChange={changing}
            />
          </motion.div>

          <div className="text-center mt-6">
            <motion.button
              variants={childrenAnimation}
              type="submit"
              className="bg-gray-200 text-gray-800 text-sm font-semibold py-2 px-6 rounded-md w-full mb-4 flex justify-center items-center gap-4"
            >
              {loading && <Loader />} Sign Up
            </motion.button>
          </div>
          <div className="text-center text-[12px]">
            Already had an account?{" "}
            <Link className="text-blue-500" href={"/auth/signin"}>
              Sign In
            </Link>
          </div>
        </form>
      </div>
    </motion.div>
  );
};
export default Page;
