"use client";
import { EmailList } from "@/components/webmailer/EmailList";
import { EmailLabels } from "@/components/webmailer/EmailLabels";
import { useState } from "react";
import { EmptyBox } from "@/components/webmailer/EmptyBox";
import { ActionsRow } from "@/components/webmailer/ActionRow";

import "font-awesome/css/font-awesome.min.css";
import "./styles.scss";

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
