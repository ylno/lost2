import styled from "styled-components";

const MailViewContainer = styled.div`
  padding: 20px;
  background-color: #f9f9f9;
  border: 1px solid #ccc;
`;

const MailView: React.FC = () => (
  <MailViewContainer>
    <h2>Mail Subject</h2>
    <p>Dear User,</p>
    <p>This is a static email content for demonstration purposes.</p>
    <p>
      Best regards,
      <br />
      Webmailer Team
    </p>
  </MailViewContainer>
);

export default MailView;
