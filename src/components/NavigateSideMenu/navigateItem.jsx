"use client";
import React from "react";

const NavigateItem = ({
  text,
  title,
  icon,
  activeMenu,
  setActiveMenu,
  scroll,
}) => {

  const handleMenuClick = () => {
    setActiveMenu(title === activeMenu ? null : title);
    window.scrollTo({ top: scroll, behavior: "smooth" });
  };

  return (
    <li
      className={`relative flex items-center justify-center py-2 my-5 font-medium rounded-md cursor-pointer transition-colors group
          ${activeMenu === title
          ? "bg-gradient-to-tr from-blue-200 to-blue-100 text-blue-800"
          : "hover:bg-blue-50 text-blue-400"
        }`}
      onClick={() => handleMenuClick(title)}
    >
      {icon}
      <div
        className="absolute left-full whitespace-nowrap rounded-md px-2 py-1 ml-6 max-sm:ml-2 max-md:ml-2
            bg-blue-100 text-blue-800 text-sm invisible opacity-20 -translate-x-3 transition-all 
            group-hover:visible group-hover:opacity-100 group-hover:translate-x-0"
      >
        {text}
      </div>
    </li>
  );
};

export default NavigateItem;
