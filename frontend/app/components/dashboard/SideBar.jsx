"use client";

import Cookies from "js-cookie";

import { useState } from "react";

import { useRouter } from "next/navigation";

import {
  GrBook,
  GrBookmark,
  GrMoney,
  GrBitcoin,
} from "react-icons/gr";

export default function SideBar() {

  const router = useRouter();

  const [activeItem, setActiveItem] =
    useState("View Mutalfunds");

  /* LOGOUT */

  const handleLogout = () => {

    /* REMOVE COOKIES */

    Cookies.remove("token");

    Cookies.remove("investor_id");

    /* REDIRECT LOGIN */

    router.push("/login");
  };

  /* SIDEBAR MENUS */

  const menuItems = [
    {
      title: "Buy Fund",
      icon: GrBook,
      path: "/dashboard/buyfund",
    },
    {
      title: "View Mutalfunds",
      icon: GrMoney,
      path: "/dashboard/viewfunds",
    },
    {
      title: "View Transaction",
      icon: GrBook,
      path: "/dashboard/transactions",
    },
    {
      title: "View Portfolio",
      icon: GrBookmark,
      path: "/dashboard/portfolio",
    },
  ];

  /* NAVIGATION */

  const handleNavigate = (title, path) => {

    setActiveItem(title);

    router.push(path);
  };

  return (

    <div className="w-[300px] min-h-screen bg-white flex flex-col justify-between px-6 py-5 border-r border-gray-200">

      {/* TOP SECTION */}

      <div>

        {/* LOGO */}

        <div className="font-bold text-3xl mt-4 text-[#6C2CF1]">
          MutualFunds
        </div>

        {/* MENU */}

        <div className="flex flex-col mt-12">

          <div className="text-gray-400 text-sm font-semibold mb-4">
            MAIN MENU
          </div>

          {
            menuItems.map((item) => (

              <HeaderItem
                key={item.title}
                icon={item.icon}
                title={item.title}
                activeItem={activeItem}
                onClick={() =>
                  handleNavigate(
                    item.title,
                    item.path
                  )
                }
              />
            ))
          }

        </div>

      </div>

      {/* BOTTOM SECTION */}

      <div className="border-t border-gray-200 pt-5">

        <HeaderItem
          icon={GrBitcoin}
          title="Logout"
          activeItem={activeItem}
          onClick={handleLogout}
        />

      </div>

    </div>
  );
}

/* SIDEBAR ITEM */

function HeaderItem({
  icon: Icon,
  title,
  activeItem,
  onClick,
}) {

  const active =
    activeItem === title;

  return (

    <div
      onClick={onClick}
      className={`flex items-center gap-4 px-4 py-3 rounded-xl cursor-pointer transition-all duration-200 mb-2
      
      ${
        active
        ? "bg-[#EEE8FF] text-[#6C2CF1] font-semibold"
        : "text-gray-600 hover:bg-gray-100"
      }`}
    >

      <Icon size={18} />

      <span className="text-[15px]">
        {title}
      </span>

    </div>
  );
}