import { Tab } from "@/components/webmailer/Tab";
import React from "react";
import { Email } from "@/components/webmailer/types";
import { EmailItem } from "@/components/webmailer/EmailItem";

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
