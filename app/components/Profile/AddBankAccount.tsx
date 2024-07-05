"use client";

import { Modal } from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function AddBankAccount() {
  const [open, setOpen] = useState<boolean>(false);
  const [iBanNumber, setIBanNumber] = useState("");
  const [iBans, setIbans] = useState([]);
  const router = useRouter();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    const fetchIbans = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          throw new Error("No token found");
        }

        const response = await fetch(
          "http://3.76.39.238/api/iban/getAllIbans",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch IBANs");
        }

        const data = await response.json();
        setIbans(data);
      } catch (error) {
        console.error("Error fetching IBANs:", error);
      }
    };

    fetchIbans();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    if (!token) {
      console.error("No token found in localStorage");
      return;
    }
    try {
      await fetch("http://3.76.39.238/api/iban/addIban", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ iBanNumber }),
      });
      handleClose();
      router.refresh();
    } catch (error) {
      console.error("Failed to add bank account:", error);
    }
  };

  return (
    <div>
      <div className="flex justify-center items-center mt-5">
        <button
          className="bg-[#6A80EA] text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-[#5A70DA] transition duration-200"
          onClick={handleOpen}
        >
          ანგარიშის დამატება
        </button>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className="flex items-center justify-center"
      >
        <>
          <div className="flex items-center justify-center py-10">
            <div className="bg-[#181424] p-8 rounded-lg shadow-lg text-white w-80">
              <h2 className="text-center mb-6 text-base font-bold">
                ახალი ბარათის დამატება:
              </h2>
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="flex flex-col space-y-2">
                  <label htmlFor="cardNumber" className="text-lg">
                    ანგარიშის ნომერი:
                  </label>
                  <input
                    type="text"
                    id="cardNumber"
                    name="cardNumber"
                    value={iBanNumber}
                    onChange={(e) => setIBanNumber(e.target.value)}
                    className="p-3 rounded-lg text-black outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="text-center">
                  <button
                    type="submit"
                    className="bg-blue-500 text-white py-2 px-4 rounded-lg shadow-lg hover:bg-blue-600 transition duration-200"
                  >
                    დამატება
                  </button>
                </div>
              </form>
            </div>
          </div>
        </>
      </Modal>
      <div className="flex items-center justify-center py-10">
        <div className="bg-[#181424] p-6 rounded-lg shadow-lg text-white w-80">
          <h2 className="text-center mb-4 text-lg font-semibold">
            ყველა ანგარიში
          </h2>
          <ul>
            {iBans.length > 0 ? (
              iBans.map((iban: any, index) => (
                <li key={index} className="text-white text-center">
                  {iban.iBanNumber}
                </li>
              ))
            ) : (
              <p className="text-white text-center">
                ანგარიში დამატებული არ არის
              </p>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}
