import React from "react";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div>
    <div className="content">{children}</div>
  </div>
);

export default Layout;
