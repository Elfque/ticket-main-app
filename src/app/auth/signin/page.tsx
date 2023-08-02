"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import axios from "axios";
import Alert from "@/app/components/Alert";
import Loader from "@/app/components/Loader";
import { motion } from "framer-motion";

const Page = () => {
  const [alert, setAlert] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  type detail = {
    username: string;
    password: string;
  };

  const [details, setDetails] = useState<detail>({
    username: "",
    password: "",
  });

  const { username, password } = details;

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
        "https://r3tro.pythonanywhere.com/auth/login/",
        { username, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      localStorage.setItem("token", res.data.key);
      setLoading(false);
      router.push("/movies");
    } catch (error: any) {
      setAlert((prevAlert) => [
        ...prevAlert,
        { type: "bad", text: error.response.data.non_field_errors[0] },
      ]);
      setTimeout(() => {
        setAlert([]);
      }, 3000);
      setLoading(false);
    }
  };

  // ANIMATION
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

  return (
    <motion.div
      className="flex justify-center items-center min-h-screen overflow-x-hidden"
      variants={parentAnimation}
      initial="hidden"
      animate="visible"
    >
      <div className="border border-gray-400 rounded-3xl p-10 w-[90%] max-w-sm">
        <motion.div
          className="text-3xl text-center font-semibold mb-4"
          variants={childrenAnimation}
        >
          Sign In
        </motion.div>
        {alert.map((ale, idx) => (
          <Alert alert={ale} key={idx} />
        ))}
        <form action="" onSubmit={submitForm}>
          <motion.div className="control mt-2" variants={childrenAnimation}>
            <label htmlFor="title">UserName</label>
            <input
              type="text"
              name="username"
              className="block bg-gray-600 text-white mt-2 outline-none py-2 px-4 w-full rounded-md"
              onChange={changing}
            />
          </motion.div>
          <motion.div className="control mt-2" variants={childrenAnimation}>
            <label htmlFor="title">Password</label>
            <input
              type="password"
              name="password"
              className="block bg-gray-600 text-white mt-2 outline-none py-2 px-4 w-full rounded-md"
              onChange={changing}
            />
          </motion.div>

          <div className="text-center mt-6">
            <motion.button
              type="submit"
              className="bg-gray-200 text-gray-800 text-sm font-semibold py-2 px-6 rounded-md w-full mb-4 flex justify-center items-center gap-4"
            >
              {loading && <Loader />} Sign In
            </motion.button>
            <div className="text-center text-[12px]">
              Don't have an account?{" "}
              <Link className="text-blue-500" href={"/auth/signup"}>
                Sign Up
              </Link>
            </div>
          </div>
        </form>
      </div>
    </motion.div>
  );
};
export default Page;
