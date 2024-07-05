"use client";
import { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CgProfile } from "react-icons/cg";
import Link from "next/link";

function DropdownMenu({
  setUserLoggedIn,
}: {
  setUserLoggedIn: (userLoggedIn: boolean) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  const handleItemClick = () => {
    setIsOpen(false);
  };
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div
      className="dropdown relative mt-2 inline-block text-left"
      ref={dropdownRef}
    >
      <div>
        <button
          type="button"
          className="icon-button inline-flex w-full justify-center rounded-full border shadow-sm focus:outline-none focus:ring-2 focus:ring-[#003049] focus:ring-offset-2 dark:border-gray-700 dark:focus:ring-offset-gray-800"
          onClick={toggleDropdown}
        >
          <CgProfile className="text-4xl text-[#003049] dark:text-white" />
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-gray-800 dark:ring-gray-700"
          >
            <div className="py-1">
              <Link
                onClick={handleItemClick}
                href={"/profile"}
                className="block w-full px-4 py-2 text-center text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                პროფილი
              </Link>
              <button
                onClick={handleItemClick}
                className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                <button onClick={() => setUserLoggedIn(false)}>გასვლა</button>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default DropdownMenu;
