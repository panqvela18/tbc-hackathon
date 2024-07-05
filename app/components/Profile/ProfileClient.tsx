"use client";
import { useState, useEffect } from "react";
import { ImProfile } from "react-icons/im";
import { FaIdCard, FaPhoneAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

export default function ProfileClient() {
  const [profile, setProfile] = useState<UserProfile | null>(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("Token");

        if (!token) {
          throw new Error("No token found");
        }

        const response = await fetch("https://localhost:44324/user/getUser", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch orders");
        }

        const data = await response.json();
        setProfile(data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []);

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
              <span>{profile?.userName}</span>
            </div>
            <div className="flex items-center space-x-3">
              <FaIdCard />
              <span>{profile?.identificationNumber}</span>
            </div>
            <div className="flex items-center space-x-3">
              <MdEmail />
              <span>{profile?.email}</span>
            </div>
            <div className="flex items-center space-x-3">
              <FaPhoneAlt />
              <span>{profile?.phoneNumber}</span>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
