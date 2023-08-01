import Navbar from "@/app/components/Navbar";
import QRCode from "react-qr-code";

const Page = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  return (
    <div className="w-4/5 mx-auto">
      <Navbar />
      <main className="text-center bg-slate-600/50 text-black p-6 w-fit mx-auto rounded-xl">
        <QRCode value={id} className="mb-8" />
        <div className="border p-2 border-black text-sm">{id}</div>
      </main>
    </div>
  );
};

export default Page;
