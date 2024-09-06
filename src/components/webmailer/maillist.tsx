import Link from "next/link";
import React from "react";
import style from "./maillist.module.scss";
import { Maillist } from "@/lib/backend/WebmailerData";

const MailList: React.FC = () => (
  <>
    {Maillist.map((mail, idx) => {
      return (
        <div key={"mail" + idx} className={style.mailItem}>
          <div className={style.status}>*</div>
          <div className={style.mailContainer}>
            <div>{mail.from}</div>
            <div>
              <Link href="/mail/view" className="mail-item" color="blue.400">
                <div className={style.mailItem}>{mail.subject}</div>
              </Link>
            </div>
          </div>
          <div>{mail.date.toISOString()}</div>
        </div>
      );
    })}
  </>
);

export default MailList;
