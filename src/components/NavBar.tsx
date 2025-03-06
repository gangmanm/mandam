import * as S from "../styles/components/navBar";
import { FaList, FaTimes } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useMediaQuery } from 'react-responsive';
import { useNavigate } from "react-router-dom";

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const navigate = useNavigate();
  const menuItems = [
    { id: 1, title: "글 목록", path: "/list" },
    { id: 2, title: "글 작성하기", path: "/post" },
    { id: 3, title: "자막 만들기", path: "/create" },
    { id: 4, title: "마이 페이지", path: "/mypage" },
  ];

  const slideVariants = {
    desktop: {
      initial: { x: "-100%" },
      animate: { x: 0 },
      exit: { x: "-100%" },
    },
    mobile: {
      initial: { y: "-100%" },
      animate: { y: 0 },
      exit: { y: "-100%" },
    }
  };

  return (
    <S.NavBarContainer>
      <S.NavBarContent>
        <S.RightSection>
          <S.Title>만담</S.Title>
        </S.RightSection>
        <S.LeftSection>
          <S.IconContainer onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <FaTimes size={20} /> : <FaList size={20} />}
          </S.IconContainer>
        </S.LeftSection>
      </S.NavBarContent>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={isMobile ? slideVariants.mobile.initial : slideVariants.desktop.initial}
            animate={isMobile ? slideVariants.mobile.animate : slideVariants.desktop.animate}
            exit={isMobile ? slideVariants.mobile.exit : slideVariants.desktop.exit}
            transition={{ type: "spring", damping: 20 }}
            style={{
              position: "fixed",
              ...(isMobile 
                ? {
                    top: 0,
                    left: 0,
                    right: 0,
                    height: "auto",
                    maxHeight: "80vh",
                  }
                : {
                    top: 0,
                    left: 0,
                    width: "250px",
                    height: "100vh",
                  }
              ),
              backgroundColor: "#1a1a1a",
              zIndex: 99,
              padding: isMobile ? "20px" : "60px 20px 20px 20px",
              display: "flex",
              flexDirection: "column",
              gap: "10px",
            }}
          >
            {menuItems.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: isMobile ? 0 : -20, y: isMobile ? -20 : 0 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ delay: item.id * 0.1 }}
                style={{
                  padding: "15px",
                  color: "white",
                  cursor: "pointer",
                  borderBottom: "1px solid rgba(255,255,255,0.1)",
                  textAlign: "left",
                }}
                whileHover={{
                  backgroundColor: "rgba(255,255,255,0.1)",
                }}
                onClick={() => navigate(item.path)}
              >     
                {item.title}
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {isOpen && (
        <S.Overlay
          onClick={() => setIsOpen(false)}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        />
      )}
    </S.NavBarContainer>
  );
}