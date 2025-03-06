import { motion } from "framer-motion";
import styled from "styled-components";

export const Overlay = styled(motion.div)`

  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
`;

export const NavBarContainer = styled.div`
  position: relative;
  width: 100vw;
  height: 50px;
  padding: 15px 20px;
`;

export const NavBarContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

export const LeftSection = styled.div`
  display: flex;
  align-items: center;
`;

export const RightSection = styled.div`
  display: flex;
  align-items: center;
`;

export const Logo = styled.div`
  color: white;
  font-size: 20px;
  font-weight: 600;
`;

export const Title = styled.div`
  color: white;
  font-size: 24px;
  font-weight: 700;
`;

export const IconContainer = styled.div`
  cursor: pointer;
  padding: 10px;
  color: white;
  display: flex;
  align-items: center;
  
  &:hover {
    opacity: 0.8;
  }

  @media (max-width: 768px) {
    padding: 5px;
  }
`; 