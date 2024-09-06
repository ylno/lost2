import Link from "next/link";
import React from "react";
import "./Sidebar.scss"; // Falls du separate CSS-Dateien verwenden möchtest

const Sidebar: React.FC = () => (
  <div className="sidebar-container">
    <h2>Webmailer</h2>
    <div className="nav-item">
      <Link href="/mail">Inbox</Link>
    </div>
    <div className="nav-item">
      <Link href="/sent">Sent</Link>
    </div>
    <div className="nav-item">
      <Link href="/mail/compose">Compose</Link>
    </div>
  </div>
);

export default Sidebar;
