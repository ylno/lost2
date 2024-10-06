import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { MainContainer } from "@/components/webmailer/MainContainer";
import { NavBar } from "@/components/webmailer/NavBar";

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
