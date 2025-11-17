"use client";

import { useState } from "react";
import Link from "next/link";
import { LuLayoutDashboard } from "react-icons/lu";
import { MdOutlineKeyboardArrowDown, MdOutlineKeyboardArrowRight } from "react-icons/md";
import { BASE_URL } from "../../constant";
import axios from "axios";
import { useRouter } from 'next/navigation';
import { AiOutlineLogout } from "react-icons/ai";
import { toast } from "react-toastify";

export default function Sidebar() {
  const [openMenus, setOpenMenus] = useState({});
  const router = useRouter();

  const toggleMenu = (menu) => {
    setOpenMenus((prev) => ({ ...prev, [menu]: !prev[menu] }));
  };

  const menuItems = [
    {
      title: "Dashboard",
      icon: <LuLayoutDashboard size={24} />,
      path: "/",
    },
    {
      title: "Product Import",
      children: [
        { title: "Import Products", path: "/productImport" },
        { title: "Report IN", path: "/productImport/reportIn" },
        { title: "Report SG", path: "/productImport/reportSg" },
      ],
    },
    {
      title: "Order Reports",
      children: [
        { title: "Shipment Status Report", path: "/orders/shipmentStatusReport" },
        //{ title: "Picked Items only", path: "/orders/pickedItemsOnly" },
      ],
    },
  ];

  const LogOut = async () => {
    try {

      const response = await axios.post(`${BASE_URL}/api/logout`);
      if (response?.data?.success) {
        toast.success(response?.data?.message);
        router.push('/login');
      }
    } catch (err) {
      throw err;
    }
  }

  return (
    <aside className="fixed top-0 left-0 h-full w-60 bg-[#8a5a20] text-white shadow-lg p-4 ">
      <h2 className="text-2xl font-bold mb-6">MIS APP</h2>

      <ul className="space-y-2">
        {menuItems.map((item) => (
          <li key={item.title}>
            {/* Parent Menu */}
            {item.children ? (
              <>
                <button
                  onClick={() => toggleMenu(item.title)}
                  className="flex items-center justify-between w-full px-3 py-2 rounded-md hover:bg-gray-800"
                >
                  <span className="text-md">{item.title}</span>
                  {openMenus[item.title] ? (
                    <MdOutlineKeyboardArrowDown size={22} />
                  ) : (
                    <MdOutlineKeyboardArrowRight size={22} />
                  )}
                </button>

                {/* Dropdown Children */}
                {openMenus[item.title] && (
                  <ul className="ml-4 mt-1 space-y-1 border-l border-gray-700 pl-3">
                    {item.children.map((child) => (
                      <li key={child.title}>
                        <Link
                          href={child.path}
                          className="block px-3 text-sm py-1 rounded-md hover:bg-gray-800"
                        >
                          {child.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </>
            ) : (
              // Simple menu item (no dropdown)
              <Link
                href={item.path}
                className="flex items-center px-3 py-2 rounded-md hover:bg-gray-800"
              >
                {item.icon && <span className="mr-2">{item.icon}</span>}
                {item.title}
              </Link>
            )}
          </li>
        ))}
      </ul>

      <p className="flex items-center  px-3 py-2 rounded-md hover:bg-gray-800 cursor-pointer absolute bottom-20 " onClick={() => LogOut()}><AiOutlineLogout size={25} />&nbsp;LogOut</p>
    </aside>
  );
}
