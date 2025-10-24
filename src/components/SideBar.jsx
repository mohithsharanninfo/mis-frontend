"use client";

import { useState } from "react";
import Link from "next/link";
import { LuLayoutDashboard } from "react-icons/lu";
import { MdOutlineKeyboardArrowDown ,MdOutlineKeyboardArrowRight } from "react-icons/md";

export default function Sidebar() {
  const [openMenus, setOpenMenus] = useState({});

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
      title: "Settings",
      children: [
        { title: "Profile", path: "#" },
        { title: "Users", path: "#" },
      ],
    },
  ];

  return (
    <aside className="fixed top-0 left-0 h-full w-60 bg-[#8a5a20] text-white shadow-lg p-4">
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
                  <span>{item.title}</span>
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
                          className="block px-3 py-2 rounded-md hover:bg-gray-800"
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
    </aside>
  );
}
