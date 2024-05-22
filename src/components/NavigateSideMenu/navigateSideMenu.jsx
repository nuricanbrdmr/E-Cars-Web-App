"use client";
import React, { useState } from "react";
import { IoCarSport } from "react-icons/io5";
import { BsPersonCircle } from "react-icons/bs";
import { GiHomeGarage, GiCarKey } from "react-icons/gi";
import NavigateItem from "./navigateItem";
import { useSession } from "next-auth/react";

const NavigateSideMenu = () => {
  const [activeMenu, setActiveMenu] = useState(null);
  const { data: session, status: sessionStatus } = useSession();
  const username =
    sessionStatus === "authenticated"
      ? session.user?.email?.substring(0, session.user?.email?.indexOf("@"))
      : "Guest";

  return (
    <aside className="h-screen fixed top-[30%] z-50" data-aos="fade-right">
      <nav className="h-[260px] flex flex-col bg-white bg-opacity-10 border shadow-sm">
        <div className="pb-2 border-b flex justify-center items-center group">
          <IoCarSport className="size-10 text-blue-500 p-1.5 hover:bg-blue-50" />
          <div
            className="absolute left-full whitespace-nowrap rounded-md px-2 py-1 ml-2
            bg-blue-100 text-blue-800 font-semibold text-sm invisible opacity-20 -translate-x-3 transition-all 
            group-hover:visible group-hover:opacity-100 group-hover:translate-x-0"
          >
            E - Cars
          </div>
        </div>

        <ul className="flex-1 px-0">
          <NavigateItem
            text={"Home"}
            title={"home"}
            icon={<GiHomeGarage className="size-7" />}
            activeMenu={activeMenu}
            setActiveMenu={setActiveMenu}
            scroll={0}
          />
          <NavigateItem
            text={"Car Categories"}
            title={"car"}
            icon={<GiCarKey className="size-7" />}
            activeMenu={activeMenu}
            setActiveMenu={setActiveMenu}
            scroll={900}
          />
        </ul>

        <div className="border-t flex p-0 items-center justify-center group">
          <span className="font-bold p-2 rounded-lg hover:bg-blue-50 text-blue-400">
            <BsPersonCircle className="size-7 text-blue-500" />
          </span>
          <div
            className="absolute left-full whitespace-nowrap rounded-md px-2 py-1 ml-2
            bg-blue-100 text-blue-800 text-sm font-semibold invisible opacity-20 -translate-x-3 transition-all 
            group-hover:visible group-hover:opacity-100 group-hover:translate-x-0"
          >
            {username}
          </div>
        </div>
      </nav>
    </aside>
  );
};

export default NavigateSideMenu;
