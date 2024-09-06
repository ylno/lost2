import Link from "next/link";
import React from "react";
import "./mailList.scss";
import { Maillist } from "@/lib/backend/WebmailerData"; // Falls du separate CSS-Dateien verwenden möchtest

const MailList: React.FC = () => (
  <>
    {Maillist.map((mail, idx) => {
      return (
        <Link key={"mail" + idx} href="/mail/view" className="mail-item">
          <div className="mail-item">{mail.subject}</div>
        </Link>
      );
    })}
  </>
);

export default MailList;
