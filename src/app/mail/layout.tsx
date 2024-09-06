import Sidebar from "@/components/webmailer/sidebar";
import React from "react";
import "./layout.scss"; // Falls du separate CSS-Dateien verwenden möchtest

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="container">
    <Sidebar />
    <div className="content">{children}</div>
  </div>
);

export default Layout;
