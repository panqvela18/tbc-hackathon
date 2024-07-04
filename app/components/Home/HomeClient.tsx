"use client";
import { useEffect, useState } from "react";

export default function HomeClient() {
  const [euroEchangeRate, setEuroExchangeRate] = useState(null);
  const [usdEchangeRate, setUsdEchangeRate] = useState(null);

  useEffect(() => {
    const fetchEuroToGelExchangeRate = async () => {
      try {
        const response = await fetch(
          "https://v6.exchangerate-api.com/v6/92efa4e87fb04725625633fe/pair/EUR/GEL"
        );
        const data = await response.json();
        setEuroExchangeRate(data.conversion_rate);
      } catch (error) {
        console.error("Failed to fetch exchange rate:", error);
      }
    };

    fetchEuroToGelExchangeRate();
  }, []);

  useEffect(() => {
    const fetchUsdToGelExchangeRate = async () => {
      try {
        const response = await fetch(
          "https://v6.exchangerate-api.com/v6/92efa4e87fb04725625633fe/pair/USD/GEL"
        );
        const data = await response.json();
        setUsdEchangeRate(data.conversion_rate);
      } catch (error) {
        console.error("Failed to fetch exchange rate:", error);
      }
    };

    fetchUsdToGelExchangeRate();
  }, []);

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <div className="container mx-auto p-4">
        <div className="text-center text-gray-400">
          <h1 className="text-3xl font-bold">Dashboard</h1>
        </div>

        <div className="flex justify-between mt-6">
          <div className="bg-gray-800 p-6 rounded-lg w-1/2 text-center">
            <div className="text-lg mb-4">USD Rate</div>
            <div className="text-2xl mb-4">{`1₾ = $${usdEchangeRate}`}</div>
            <div className="bg-gray-700 h-24 rounded"></div>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg w-1/2 text-center">
            <div className="text-lg mb-4">EUR Rate</div>
            <div className="text-2xl mb-4">{`1₾ = €${euroEchangeRate}`}</div>
            <div className="bg-gray-700 h-24 rounded"></div>
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-6">
          <div className="bg-gray-800 p-6 rounded-lg text-center text-xl text-gray-400">
            No Data Available
          </div>

          <div className="flex justify-around gap-6">
            <div className="bg-gray-800 p-6 rounded-lg w-1/2 text-center text-lg">
              Active Orders
            </div>
            <div className="bg-gray-800 p-6 rounded-lg w-1/2 text-center text-lg">
              Archived Orders
            </div>
          </div>
        </div>

        <div className="flex justify-center mt-6">
          <button className="bg-purple-600 flex items-center justify-center text-white p-4 rounded-full text-2xl hover:bg-purple-800 transition duration-300">
            +
          </button>
        </div>
      </div>
    </div>
  );
}
