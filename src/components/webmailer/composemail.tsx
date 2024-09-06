import styled from "styled-components";

const ComposeContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Input = styled.input`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const TextArea = styled.textarea`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  height: 200px;
`;

const Button = styled.button`
  padding: 10px 15px;
  border: none;
  background-color: #007bff;
  color: white;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

const ComposeMail: React.FC = () => (
  <ComposeContainer>
    <Input type="text" placeholder="To:" />
    <Input type="text" placeholder="Subject:" />
    <TextArea placeholder="Your message..." />
    <Button>Send</Button>
  </ComposeContainer>
);

export default ComposeMail;
