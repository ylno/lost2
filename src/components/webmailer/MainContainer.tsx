"use client";
import { EmailList } from "@/components/webmailer/EmailList";
import { EmailLabels } from "@/components/webmailer/EmailLabels";
import React, { ReactNode, useState } from "react";
import { EmptyBox } from "@/components/webmailer/EmptyBox";
import { ActionsRow } from "@/components/webmailer/ActionRow";

import "font-awesome/css/font-awesome.min.css";
import "./styles.scss";
import { emails } from "@/components/webmailer/data";
import { Email } from "@/components/webmailer/types";
import { Tab } from "@/components/webmailer/Tab";
import EmailDetail from "@/components/webmailer/EmailDetail";

/**
 * Main class which contains the labels and the email list.
 */
export function MainContainer(props: {}) {
  const [selectedTab, setSelectedTab] = useState(1);
  const [emailDetail, setEmailDetail] = useState<null | Email>(null);

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

  let content: ReactNode = null;
  if (emailDetail != null) {
    content = <EmailDetail email={emailDetail} />;
  } else if (filteredEmails.length > 0) {
    content = (
      <EmailList emails={filteredEmails} emailClicked={setEmailDetail} />
    );
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
        <div className="col-12 col-sm-12 col-md-9 col-lg-10">
          <ul className="nav nav-tabs">
            <Tab name="Inbox" activeTab={true} icon="fa-inbox" />
            <Tab name="Social" activeTab={false} icon="fa-users" />
            <Tab name="Notifications" activeTab={false} icon="fa-tags" />
            <Tab name="Updates" activeTab={false} icon="fa-info-circle" />
          </ul>
          {content}
        </div>
      </div>
    </div>
  );
}
