import React from "react";

export function Tab(props: { activeTab: boolean; name: string; icon: string }) {
  // Classes to add to the <a> element
  const tabClasses = ["nav-link"];
  // Classes to add to the <i> element (the icon)
  const iconClasses = ["fa", props.icon];

  // Update the class array if the state is visible
  if (props.activeTab) {
    tabClasses.push("active");
    console.log("active");
  }

  return (
    <li className="nav-item">
      <a className={tabClasses.join(" ")} href="#">
        <i className={iconClasses.join(" ")}></i>&nbsp;&nbsp;{props.name}
      </a>
    </li>
  );
}
