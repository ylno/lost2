import React from "react";
import "./composemail.scss";

const ComposeMail: React.FC = () => (
  <div className="compose-container">
    <input type="text" placeholder="To:" className="input" />
    <input type="text" placeholder="Subject:" className="input" />
    <textarea placeholder="Your message..." className="textarea"></textarea>
    <button className="button">Send</button>
  </div>
);

export default ComposeMail;
