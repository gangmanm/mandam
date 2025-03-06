import * as S from "../styles/pages/main";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import styled from "styled-components";
import { motion } from 'framer-motion';
import MainInfo from "../components/MainInfo";

export default function Main() {
  const navigate = useNavigate();

  const handleRouteToList = () => {
    navigate("/list");
  };

  const TypewriterText = () => {
    const text = "저작권 걱정없이\n유튜브 영상에 자막을 달아보세요";

    return (
      <S.SubTitleText>
        {text.split('\n').map((line, lineIndex) => (
          <motion.div key={`line-${lineIndex}`}>
            {Array.from(line).map((char, charIndex) => (
              <motion.span
                key={`char-${lineIndex}-${charIndex}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                  duration: 0.1,
                  delay: (lineIndex * line.length + charIndex) * 0.1,
                  ease: "linear"
                }}
              >
                {char === ' ' ? '\u00A0' : char}
              </motion.span>
            ))}
          </motion.div>
        ))}
      </S.SubTitleText>
    );
  };

  return (
    <S.MainContainer> 
      <NavBar />
      <S.ContentContainer>
        <S.TextContainer>
          <S.TitleText>만담</S.TitleText>
          <TypewriterText />
        </S.TextContainer>
        <MainInfo />
        <S.Link onClick={handleRouteToList}>
          만담 보러가기 &gt;
        </S.Link>
      </S.ContentContainer>
    </S.MainContainer>
  );
}
