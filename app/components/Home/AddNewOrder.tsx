"use client";
import { useEffect, useState } from "react";
import Modal from "@mui/material/Modal";
import { FaExchangeAlt } from "react-icons/fa";

export default function AddNewOrder() {
  const [open, setOpen] = useState<boolean>(false);
  const [gelFirst, setGelFirst] = useState<boolean>(true);
  const [selectedCurrency, setSelectedCurrency] = useState<"gel" | "usd">(
    "gel"
  );
  const [ibans, setIbans] = useState<{ id: number; iBanNumber: string }[]>([]);
  const [selectedIban, setSelectedIban] = useState<string>("");
  const [gelAmount, setGelAmount] = useState<string>("0.00");
  const [usdAmount, setUsdAmount] = useState<string>("0.00");

  const gelToUsdRate = 0.36;
  const usdToGelRate = 2.75;

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

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleToggleInputs = () => {
    setGelFirst((prev) => !prev);
    setSelectedCurrency((prev) => (prev === "gel" ? "usd" : "gel"));
  };

  useEffect(() => {
    if (selectedCurrency === "gel") {
      const usdValue = parseFloat(gelAmount) * gelToUsdRate;
      setUsdAmount(usdValue.toFixed(2));
    } else {
      const gelValue = parseFloat(usdAmount) * usdToGelRate;
      setGelAmount(gelValue.toFixed(2));
    }
  }, [gelAmount, usdAmount, selectedCurrency]);

  const handleGelInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setGelAmount(event.target.value);
  };

  const handleUsdInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsdAmount(event.target.value);
  };

  const handleIbanChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedIban(event.target.value);
  };

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        throw new Error("No token found");
      }

      const buyingAmount =
        selectedCurrency === "gel"
          ? parseFloat(gelAmount)
          : parseFloat(usdAmount);
      const sellingAmount =
        selectedCurrency === "gel"
          ? parseFloat(usdAmount)
          : parseFloat(gelAmount);
      const taxAmount = (buyingAmount * 0.03).toFixed(2);
      const taxCurrency = selectedCurrency;

      const order = {
        buyingCurrency: selectedCurrency === "gel" ? 0 : 1,
        sellingCurrency: selectedCurrency === "gel" ? 1 : 0,
        buyingAmount: buyingAmount,
        sellingAmount: sellingAmount,
        taxCurrency: taxCurrency === "gel" ? 0 : 1,
        taxAmount: taxAmount,
        iBanId: ibans.find((iban) => iban.iBanNumber === selectedIban)?.id,
      };

      const response = await fetch("http://3.76.39.238/api/order/createOrder", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(order),
      });
      handleClose();

      if (!response.ok) {
        const errorText = await response.text(); // Read the response as text
        throw new Error(
          `Failed to create order: ${response.statusText}. ${errorText}`
        );
      }

      const data = await response.json();
      console.log("Order created successfully:", data);
    } catch (error) {
      console.error("Error creating order:", error);
    }
  };

  return (
    <section className="px-[5%] mt-10 flex justify-center">
      <button
        onClick={handleOpen}
        className="bg-blue-600 text-white px-6 py-3 rounded-full text-lg hover:bg-blue-700 transition duration-300"
      >
        + დაამატე ორდერი
      </button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className="flex items-center justify-center"
      >
        <div className="bg-gray-900 flex items-center justify-center">
          <div className="bg-gray-800 text-white p-6 rounded-lg shadow-lg w-full max-w-md md:max-w-2xl">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl">თანხის კონვერტაცია</h2>
              {selectedCurrency === "gel" ? (
                <span className="text-gray-400">
                  1 GEL = {gelToUsdRate.toFixed(2)} USD
                </span>
              ) : (
                <span className="text-gray-400">
                  1 USD = {usdToGelRate.toFixed(2)} GEL
                </span>
              )}
            </div>
            <div
              className={`flex ${
                gelFirst ? "flex-row" : "flex-row-reverse"
              } gap-4`}
            >
              <div className="flex flex-col">
                <label htmlFor="gel-amount" className="mb-2">
                  GEL
                </label>
                <input
                  type="number"
                  id="gel-amount"
                  className="bg-gray-700 p-2 rounded"
                  placeholder="Amount"
                  value={gelAmount}
                  onChange={handleGelInputChange}
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="usd-amount" className="mb-2">
                  USD
                </label>
                <input
                  type="number"
                  id="usd-amount"
                  className="bg-gray-700 p-2 rounded"
                  placeholder="Amount"
                  value={usdAmount}
                  onChange={handleUsdInputChange}
                />
              </div>
            </div>
            <div className="text-gray-400 my-4">
              საკომისიო (3%) ={" "}
              {Number(gelAmount) !== 0
                ? (Number(gelAmount) * 0.03).toFixed(2)
                : 0.0}
              {selectedCurrency === "gel" ? " GEL" : " USD"}
            </div>
            <div className="text-gray-400 mb-4">
              თქვენ მიიღებთ{" "}
              {gelFirst
                ? (Number(usdAmount) - Number(usdAmount) * 0.03).toFixed(2)
                : (Number(gelAmount) - Number(gelAmount) * 0.03).toFixed(2)}
              {selectedCurrency === "gel" ? " USD" : " GEL"}
            </div>
            <div className="flex justify-center items-center mb-4">
              <button
                className="bg-blue-600 p-2 rounded"
                onClick={handleToggleInputs}
              >
                <FaExchangeAlt color="white" />
              </button>
            </div>
            <div className="flex justify-between items-center mb-4">
              <select
                value={selectedIban}
                onChange={handleIbanChange}
                className="bg-gray-700 p-2 rounded flex-1"
              >
                <option value="" disabled>
                  აირჩიე საბანკო ანგარიში
                </option>
                {ibans.map((iban) => (
                  <option key={iban.id} value={iban.iBanNumber}>
                    {iban.iBanNumber}
                  </option>
                ))}
              </select>
              <button
                className="bg-blue-600 p-2 rounded flex-1 ml-4"
                onClick={handleSubmit}
              >
                ორდერის დამატება
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </section>
  );
}
