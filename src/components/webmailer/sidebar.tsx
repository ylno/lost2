import styled from "styled-components";
import Link from "next/link";

const SidebarContainer = styled.div`
  width: 250px;
  background-color: #333;
  color: white;
  padding: 20px;
`;

const NavItem = styled.div`
  margin-bottom: 15px;

  a {
    color: white;
    text-decoration: none;
  }

  a:hover {
    text-decoration: underline;
  }
`;

const Sidebar: React.FC = () => (
  <SidebarContainer>
    <h2>Webmailer</h2>
    <NavItem>
      <Link href="/mail">Inbox</Link>
    </NavItem>
    <NavItem>
      <Link href="./sent">Sent</Link>
    </NavItem>
    <NavItem>
      <Link href="/mail/compose">Compose</Link>
    </NavItem>
  </SidebarContainer>
);

export default Sidebar;
