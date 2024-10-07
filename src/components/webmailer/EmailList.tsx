import { Tab } from "@/components/webmailer/Tab";
import React from "react";
import { Email } from "@/components/webmailer/types";
import { EmailItem } from "@/components/webmailer/EmailItem";

export function EmailList({
  emails,
  emailClicked,
}: {
  emails: Email[];
  emailClicked: (email: Email) => void;
}) {
  return (
    <div>
      <div className="list-group">
        {emails.map((email) => (
          <EmailItem
            key={email.id}
            email={email}
            handleEmailClick={() => emailClicked(email)}
          />
        ))}
      </div>
    </div>
  );
}
