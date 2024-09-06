"use client";
import React, { useState } from "react";

import "font-awesome/css/font-awesome.min.css";
import "./styles.scss";
import Image from "next/image";

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

export function EmailLabels({
  onLabelClick,
}: {
  onLabelClick: (label: number) => void;
}) {
  const defaultProps = {
    //Labels will be static for this example.
    labels: [
      {
        id: 1,
        name: "Inbox",
        emailNumber: 4,
      },
      {
        id: 2,
        name: "Important",
        emailNumber: 2,
      },
      {
        id: 3,
        name: "Sent",
        emailNumber: 9,
      },
      {
        id: 4,
        name: "Trash",
        emailNumber: 12,
      },
    ],
  };
  return (
    <ul className="list-group">
      {defaultProps.labels.map((label) => (
        <LabelItem
          key={label.id}
          id={label.id}
          label={label}
          onClick={() => onLabelClick(label.id)}
        />
      ))}
    </ul>
  );
}

export function LabelItem(props: {
  key: number;
  id: number;
  label: { id: number; name: string; emailNumber: number };
  onClick: (id: number) => void;
}) {
  return (
    <li
      className="list-group-item d-flex justify-content-between align-items-center"
      onClick={() => props.onClick(props.id)}
    >
      {props.label.name}
      <span className="badge badge-default badge-pill">
        {props.label.emailNumber}
      </span>
    </li>
  );
}

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

export function EmailList(props: { emails: Email[] }) {
  const handleEmailClick = (id: number) => {
    alert("Clicked" + id);
  };

  return (
    <div>
      {/* Tabs created only as an example, they don't interact with the rest of the app. */}
      <ul className="nav nav-tabs">
        <Tab name="Inbox" activeTab={true} icon="fa-inbox" />
        <Tab name="Social" activeTab={false} icon="fa-users" />
        <Tab name="Notifications" activeTab={false} icon="fa-tags" />
        <Tab name="Updates" activeTab={false} icon="fa-info-circle" />
      </ul>
      <div className="list-group">
        {/* EmailItem creation: */}
        {props.emails.map((email) => (
          <EmailItem
            key={email.id}
            email={email}
            handleEmailClick={handleEmailClick}
          />
        ))}
      </div>
    </div>
  );
}

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

class EmptyBox extends React.Component {
  render() {
    return <p className="center">The email box is empty.</p>;
  }
}

type Email = {
  id: number;
  from: string;
  subject: string;
  time: string;
  labelId: number;
};

/**
 * Main class which contains the labels and the email list.
 */
export function MainContainer(props: {}) {
  const [selectedTab, setSelectedTab] = useState(1);

  function handleLabelClick(labelId: number) {
    console.log("Label clicked: " + labelId);
    setSelectedTab(labelId);
  }

  const defaultProps = {
    //Emails to be displayed on the Email List
    emails: [
      {
        id: 0,
        labelId: 1,
        from: "Mike James",
        subject: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        time: "11:15",
      },
      {
        id: 1,
        labelId: 1,
        from: "Emma Thompson",
        subject: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        time: "22:08",
      },
      {
        id: 2,
        labelId: 1,
        from: "Olivia Jefferson",
        subject: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        time: "19:12",
      },
      {
        id: 3,
        labelId: 1,
        from: "Mike Conley",
        subject: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        time: "18:35",
      },
      {
        id: 4,
        labelId: 2,
        from: "Emily Iverson",
        subject: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        time: "14:05",
      },
      {
        id: 5,
        labelId: 3,
        from: "Michael Neal",
        subject: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        time: "14:05",
      },
    ],
  };

  const filteredEmails = defaultProps.emails.filter(
    (e) => e.labelId && e.labelId == selectedTab,
  );

  let content = null;
  if (filteredEmails.length > 0) {
    content = <EmailList emails={filteredEmails} />;
  } else {
    content = <EmptyBox />;
  }

  return (
    <div className="container">
      <ActionsRow />
      <hr />
      <div className="row">
        <div className="col-12 col-sm-12 col-md-3 col-lg-2">
          <EmailLabels onLabelClick={handleLabelClick} />
        </div>
        <div className="col-12 col-sm-12 col-md-9 col-lg-10">{content}</div>
      </div>
    </div>
  );
}

/**
 * Come options for showing how to emulate Gmail using Bootsrap 4.
 */
class ActionsRow extends React.Component {
  render() {
    return (
      <div className="row">
        <div className="col-12 col-sm-12 col-md-3 col-lg-2">
          <a href="#" className="btn btn-danger btn-primary btn-block">
            <i className="fa fa-edit"></i> Compose
          </a>
        </div>
        <div className="col-12 col-sm-12 col-md-9 col-lg-10">
          <div
            className="btn-group"
            role="group"
            aria-label="Button group with nested dropdown"
          >
            <button type="button" className="btn btn-secondary">
              &nbsp;<i className="fa fa-refresh" aria-hidden="true"></i>&nbsp;
            </button>
            <button type="button" className="btn btn-secondary">
              &nbsp;<i className="fa fa-star" aria-hidden="true"></i>&nbsp;
            </button>
          </div>
          <div className="btn-group" role="group">
            <button
              id="btnGroupDrop1"
              type="button"
              className="btn btn-secondary dropdown-toggle"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              More
            </button>
            <div className="dropdown-menu" aria-labelledby="btnGroupDrop1">
              <a className="dropdown-item" href="#">
                Action
              </a>
              <a className="dropdown-item" href="#">
                Another action
              </a>
              <a className="dropdown-item" href="#">
                Something else here
              </a>
              <div className="dropdown-divider"></div>
              <a className="dropdown-item" href="#">
                Separated link
              </a>
            </div>
          </div>

          <div className="pull-right">
            <button type="button" className="btn btn-secondary">
              &nbsp;<i className="fa fa-cog" aria-hidden="true"></i>&nbsp;
            </button>
            <button type="button" className="btn btn-secondary">
              &nbsp;<i className="fa fa-bars" aria-hidden="true"></i>&nbsp;
            </button>
          </div>
        </div>
      </div>
    );
  }
}
