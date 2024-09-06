import {
  MainContainer,
  NavBar,
} from "@/components/webmailer2/WebmailerComponents";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Page() {
  return (
    <>
      <NavBar title="Webmailer ttest" user="test@examle.com" />
      <div className="p-3">
        <MainContainer />
      </div>
    </>
  );
}
