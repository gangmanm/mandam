import * as S from "../styles/pages/main";
import { useNavigate } from "react-router-dom";

export default function Main() {
  const navigate = useNavigate();

  const handleRouteToList = () => {
    navigate("/list");
  };

  return (
    <S.MainContainer>
      <S.SubTitle>저작권 걱정없이 유튜브 영상에 자막을 달아보세요</S.SubTitle>
      <S.Title>만담</S.Title>
      <S.Link onClick={handleRouteToList}>유튜브 만담 확인하기 &gt;</S.Link>
    </S.MainContainer>
  );
}
