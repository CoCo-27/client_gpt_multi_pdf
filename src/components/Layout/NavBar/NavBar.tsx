import React, { useState } from 'react';
import { RiMoonFill, RiSunFill } from 'react-icons/ri';
import { FiAlignJustify } from 'react-icons/fi';

const NavBar = ({ onOpenSidenav }) => {
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem('theme')
      ? JSON.parse(localStorage.getItem('theme'))
      : document.body.classList.contains('dark')
  );

  return (
    <nav className="sticky top-4 z-40 flex flex-row flex-wrap items-center justify-between rounded-xl bg-white/10 p-2 backdrop-blur-xl dark:bg-[#0b14374d]">
      <div className="ml-[6px]">
        <div className="h-6 w-[224px] pt-1">
          <a className="text-sm font-normal text-navy-700 hover:underline dark:text-white dark:hover:text-white">
            Pages
            <span className="mx-1 text-sm text-navy-700 hover:text-navy-700 dark:text-white">
              /
            </span>
          </a>
          <a className="text-sm font-normal capitalize text-navy-700 hover:underline dark:text-white dark:hover:text-white">
            Main Dashboard
          </a>
        </div>
        <p className="shrink text-[33px] capitalize text-navy-700 dark:text-white">
          <a className="font-bold capitalize hover:text-navy-700 dark:hover:text-white">
            Main Dashboard
          </a>
        </p>
      </div>
      <div className="relative mt-[3px] flex h-[61px] w-[100px] flex-grow items-center justify-around gap-2 rounded-full bg-white px-2 py-2 shadow-xl shadow-shadow-500 dark:!bg-navy-800 dark:shadow-none md:w-[100px] md:flex-grow-0 md:gap-1 xl:w-[100px] xl:gap-2">
        <div
          className="cursor-pointer text-gray-600"
          onClick={() => {
            if (darkMode) {
              document.body.classList.remove('dark');
              setDarkMode(false);
              localStorage.setItem('theme', JSON.stringify(darkMode));
            } else {
              document.body.classList.add('dark');
              setDarkMode(true);
              localStorage.setItem('theme', JSON.stringify(darkMode));
            }
          }}
        >
          {darkMode ? (
            <RiSunFill className="h-4 w-4 text-gray-600 dark:text-white" />
          ) : (
            <RiMoonFill className="h-4 w-4 text-gray-600 dark:text-white" />
          )}
        </div>
        <span
          className="flex cursor-pointer text-xl text-gray-600 dark:text-white xl:hidden"
          onClick={onOpenSidenav}
        >
          <FiAlignJustify className="h-5 w-5" />
        </span>
      </div>
    </nav>
  );
};

export default NavBar;
