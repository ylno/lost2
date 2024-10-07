import type { Email } from "@/components/webmailer/types";
import React from "react";

export function EmailItem({
  email,
  handleEmailClick,
}: {
  email: Email;
  handleEmailClick: (id: number) => void;
}) {
  return (
    <li
      className="list-group-item d-flex justify-content-start"
      onClick={() => handleEmailClick(email.id)}
    >
      <div className="checkbox">
        <input type="checkbox" />
      </div>
      &nbsp;&nbsp;<span className="fa fa-star-o"></span>&nbsp;&nbsp;
      <span className="name">{email.from}</span>
      <span>{email.subject}</span>
      <span className="ml-auto p-2">
        <span className="fa fa-paperclip">&nbsp;&nbsp;</span>
        <span className="badge badge-default badge-pill">{email.time}</span>
      </span>
    </li>
  );
}
