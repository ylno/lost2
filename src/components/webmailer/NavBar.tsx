import Image from "next/image";
import React from "react";

export function NavBar({ title, user }: { title: string; user: string }) {
  return (
    <nav className="navbar navbar-expand-md navbar-dark bg-dark">
      <button
        className="navbar-toggler navbar-toggler-right"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <Image
        className="nav-logo"
        src="/webmaillogo.webp"
        width={36}
        height={36}
        alt="Picture of the author"
      />
      <a className="navbar-brand" href="#">
        {title}
      </a>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav ml-auto">
          <li className="nav-item active">
            <a className="nav-link" href="#">
              &nbsp;<i className="fa fa-calendar" aria-hidden="true"></i>
              &nbsp;
            </a>
          </li>
          <li className="nav-item active">
            <a className="nav-link" href="#">
              &nbsp;<i className="fa fa-th" aria-hidden="true"></i>&nbsp;
            </a>
          </li>
          <li className="nav-item active">
            <a className="nav-link" href="#">
              {user} <span className="sr-only">(current)</span>
              <i className="fa fa-angle-down" aria-hidden="true"></i>
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}
