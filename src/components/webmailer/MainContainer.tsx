"use client";
import { EmailList } from "@/components/webmailer/EmailList";
import { EmailLabels } from "@/components/webmailer/EmailLabels";
import { useState } from "react";
import { EmptyBox } from "@/components/webmailer/EmptyBox";
import { ActionsRow } from "@/components/webmailer/ActionRow";

import "font-awesome/css/font-awesome.min.css";
import "./styles.scss";
import { emails } from "@/components/webmailer/data";

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
    emails: emails,
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
