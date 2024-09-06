// src/app/components/MailList.tsx
import styled from "styled-components";
import Link from "next/link";

const MailItem = styled.div`
  padding: 10px;
  border-bottom: 1px solid #ccc;
  cursor: pointer;

  &:hover {
    background-color: #f1f1f1;
  }
`;

const MailList: React.FC = () => (
  <>
    <Link href="/mail/view">
      <MailItem>Mail 1: Welcome to the Webmailer!</MailItem>
    </Link>
    <MailItem>Mail 2: Your subscription is confirmed</MailItem>
    <MailItem>Mail 3: Event details</MailItem>
  </>
);

export default MailList;
