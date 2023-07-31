"use client";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import useStore, { authFuncs, authState } from "../state/state";
import { BsFillPersonFill } from "react-icons/bs";
import Link from "next/link";

const Profile = () => {
  const { user, error, getUser }: authState & authFuncs = useStore();
  const [currentUser, setCurrentUser] = useState<any>();

  useEffect(() => {
    if (!user) {
      getUser();
    } else {
      setCurrentUser(user);
      console.log(user);
    }
  }, [user]);

  return (
    <div className="w-4/5 mx-auto">
      <Navbar />

      <div className="lg:flex gap-12 items-center mt-8 block text-center lg:text-start">
        <div className="picture-part border-4 border-slate-200 rounded-full ">
          <BsFillPersonFill className="w-60 h-auto " />
        </div>
        {user && (
          <div>
            <div className="text-2xl">{user.username}</div>
            <div className="text-2xl font-semibold my-4">{user.email}</div>
            <button className="bg-slate-200 font-semibold text-slate-800 text-sm p-2 rounded-md">
              <Link href={"/password/change"}>Change Password</Link>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
