import { ImProfile } from "react-icons/im";
import { FaIdCard, FaPhoneAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

export default function Profile() {
  return (
    <main>
      <h1 className="text-3xl font-bold text-white text-center py-10">
        პროფილი
      </h1>
      <div className="flex items-center justify-center">
        <div className="bg-[#181424] p-6 rounded-lg shadow-lg text-white w-80">
          <h2 className="text-center mb-4 text-lg font-semibold">
            კომპანიის მონაცემები:
          </h2>
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <ImProfile />
              <span>ika</span>
            </div>
            <div className="flex items-center space-x-3">
              <FaIdCard />
              <span>12345678</span>
            </div>
            <div className="flex items-center space-x-3">
              <MdEmail />
              <span>irakli.pankvelashvili@gmail.com</span>
            </div>
            <div className="flex items-center space-x-3">
              <FaPhoneAlt />
              <span>12324242</span>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
