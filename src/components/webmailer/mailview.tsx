import React from "react";
import "./mailView.scss"; // Falls du separate CSS-Dateien verwenden möchtest

const MailView: React.FC = () => (
  <div className="mail-view-container">
    <h2>Mail Subject</h2>
    <p>Dear User,</p>
    <p>This is a static email content for demonstration purposes.</p>
    <p>
      Best regards,
      <br />
      Webmailer Team
    </p>
  </div>
);

export default MailView;
