import styled, { keyframes } from "styled-components";
import { FaSpinner } from "react-icons/fa6";

const spin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

export const Spinner = styled(FaSpinner)`
  animation: ${spin} 1s infinite linear;
`;
