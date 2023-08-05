"use client";

import Navbar from "@/app/components/Navbar";
import axios from "axios";
import QRCode from "react-qr-code";

const Page = ({ params }: { params: { id: string } }) => {
  const { id } = params;

  const deleteBooking = async () => {
    try {
      const res = await axios.delete(
        `https://r3tro.pythonanywhere.com/my-movies/${id}`
      );
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-4/5 mx-auto">
      <Navbar />
      <main className="text-center bg-slate-600/50 text-white p-6 w-fit mx-auto rounded-xl">
        <QRCode value={id} className="mb-8" />
        <div className="border p-2 border-gray-500 text-sm">{id}</div>
      </main>
      <div className="text-center">
        <button
          className="delete_seats bg-slate-600 text-white py-2 px-10 text-sm rounded-sm mt-8 mx-auto"
          onClick={deleteBooking}
        >
          Unbook Seat
        </button>
      </div>
    </div>
  );
};

export default Page;
