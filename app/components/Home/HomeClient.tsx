"use client";
import Image from "next/image";
import chart from "../../../public/Graph.png";
import chart2 from "../../../public/Group 13.png";
import { useEffect, useState } from "react";
import AddNewOrder from "./AddNewOrder";

export default function HomeClient() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          throw new Error("No token found");
        }

        const response = await fetch(
          "https://localhost:44324/api/order/getAllOrders",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch orders");
        }

        const data = await response.json();
        setOrders(data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []);

  const activeOrders = orders.filter((order: any) => order.status === "Active");
  const inactiveOrders = orders.filter(
    (order: any) => order.status === "Canceled" || order.status === "Completed"
  );

  return (
    <main>
      <h1 className="text-3xl font-bold text-white text-center py-10">
        Dashboard
      </h1>
      <section className="px-[5%]">
        <div className="flex flex-col">
          <div className="text-lg mb-4 text-white">USD კურსი</div>
          <div className="text-4xl mb-4 text-white">$2.875</div>
        </div>
        <div className="w-full">
          <Image src={chart} width={1920} height={400} alt="chart" />
        </div>
      </section>
      <section className="px-[5%] mt-10">
        <div className="flex flex-col">
          <div className="text-lg mb-4 text-white">EUR კურსი</div>
          <div className="text-4xl mb-4 text-white">€2.98</div>
        </div>
        <div className="w-full">
          <Image src={chart2} width={1920} height={400} alt="chart" />
        </div>
      </section>
      <AddNewOrder />

      <section className="px-[5%] my-10">
        <div className="flex justify-between w-full gap-5">
          <div className="bg-gray-800 p-6 rounded-lg text-center text-white text-lg w-1/2">
            <h2 className="text-2xl mb-4">აქტიური ორდერები</h2>
            <ul>
              {activeOrders.map((order: any) => (
                <li key={order.id} className="mb-2">
                  {order.buyingCurrency} {order.buyingAmount}
                  {order.sellingAmount} {order.status}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg text-center text-white text-lg w-1/2">
            <h2 className="text-2xl mb-4">დასრულებული ორდერები</h2>
            <ul>
              {inactiveOrders.map((order: any) => (
                <li key={order.id} className="mb-2">
                  {order.buyingCurrency} {order.buyingAmount}
                  {order.sellingAmount} {order.status}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </main>
  );
}
