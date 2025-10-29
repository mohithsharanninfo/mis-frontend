"use client";

import { usePathname } from "next/navigation";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import 'ag-grid-community/styles/ag-grid.css';
import Sidebar from "@/components/SideBar";

export default function ClientLayout({ children }) {
  const pathname = usePathname();
  const showSidebar = pathname !== "/login";

  return (
    <>
      {showSidebar && <Sidebar />}
      <main style={{ marginLeft: showSidebar ? "250px" : "0" }}>
        <div id="root">
          {children}
        </div>

        <ToastContainer
          position="top-right"
          autoClose={1500}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </main>
    </>
  );
}
