import styled from "styled-components";
import Sidebar from "@/components/webmailer/sidebar";

const Container = styled.div`
  display: flex;
  height: 100vh;
`;

const Content = styled.div`
  flex: 1;
  padding: 20px;
  background-color: white;
  overflow-y: auto;
`;

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <Container>
    <Sidebar />
    <Content>{children}</Content>
  </Container>
);

export default Layout;
