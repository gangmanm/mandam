import * as S from "../styles/pages/myPage";
import NavBar from "../components/NavBar";
import UserInfo from "../components/UserInfo";
import { useState } from "react";
export default function MyPage() {
  const [selectedBoxId, setSelectedBoxId] = useState<number | null>(1);
  return (
    <S.MainContainer>
      <NavBar />
      <S.ContentContainer>
        <S.LeftContainer>
          <UserInfo selectedBoxId={selectedBoxId} setSelectedBoxId={setSelectedBoxId} />
          
        </S.LeftContainer>
        <S.RightContainer></S.RightContainer>
      </S.ContentContainer>

    </S.MainContainer>
  );
}