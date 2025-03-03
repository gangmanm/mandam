import styled from "styled-components";

export const HeaderContainer = styled.div`
  width: 100%;
  height: 50px;
  background-color:rgb(58, 58, 58);

  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: 20px;
`;

export const Title = styled.div`
  font-size: 18px;
  font-weight: bold;
  color: #fff;

  cursor: pointer;

  &:hover {
    color: #e63946;
  }
`;

