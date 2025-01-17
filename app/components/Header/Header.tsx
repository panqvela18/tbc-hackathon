"use client";

import { useState, useEffect } from "react";
import DropdownMenu from "./DropDown";
import Registration from "./Registration";
import logo from "../../../public/logo.svg";
import Image from "next/image";
import Link from "next/link";

export default function Header() {
  const [userLoggedIn, setUserLoggedIn] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      const loggedIn = localStorage.getItem("userLoggedIn");
      return loggedIn ? JSON.parse(loggedIn) : false;
    }
    return false;
  });
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const [open, setOpen] = useState<boolean>(false);

  const handleOpen = () => setOpen(true);

  useEffect(() => {
    localStorage.setItem("userLoggedIn", JSON.stringify(userLoggedIn));
  }, [userLoggedIn]);

  return (
    <header className="text-white flex items-center justify-between px-[5%] border-b-2 border-b-white h-[84px]">
      <Link href={"/"}>
        <Image src={logo} width={45} height={45} alt="logo" />
      </Link>
      <nav>
        {isClient && (
          <ul className="flex items-center justify-between">
            {userLoggedIn ? (
              <li>
                <DropdownMenu setUserLoggedIn={setUserLoggedIn} />
              </li>
            ) : (
              <button onClick={handleOpen}>შესვლა</button>
            )}
          </ul>
        )}
      </nav>
      <Registration
        open={open}
        setOpen={setOpen}
        setUserLoggedIn={setUserLoggedIn}
      />
    </header>
  );
}
