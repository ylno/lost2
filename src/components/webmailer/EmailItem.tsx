import type { Email } from "@/components/webmailer/types";
import React from "react";

export function EmailItem(props: {
  email: Email;
  handleEmailClick: (id: number) => void;
}) {
  return (
    <li
      className="list-group-item d-flex justify-content-start"
      onClick={() => props.handleEmailClick(props.email.id)}
    >
      <div className="checkbox">
        <input type="checkbox" />
      </div>
      &nbsp;&nbsp;<span className="fa fa-star-o"></span>&nbsp;&nbsp;
      <span className="name">{props.email.from}</span>
      <span>{props.email.subject}</span>
      <span className="ml-auto p-2">
        <span className="fa fa-paperclip">&nbsp;&nbsp;</span>
        <span className="badge badge-default badge-pill">
          {props.email.time}
        </span>
      </span>
    </li>
  );
}
