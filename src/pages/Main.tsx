import * as S from "../styles/pages/main";
import { useNavigate } from "react-router-dom";

export default function Main() {
  const navigate = useNavigate();

  const handleRouteToList = () => {
    navigate("/post");
  };

  return (
    <S.MainContainer>
      <S.SubTitle>유튜브 영상에 자막을 달아보세요</S.SubTitle>
      <S.Title>만담</S.Title>
      <S.Link onClick={handleRouteToList}>로그인 후 만담 이용하기 &gt;</S.Link>
    </S.MainContainer>
  );
}
