import { AnimatePresence, motion } from "framer-motion"
import { useState, useEffect } from "react"
import React from "react"

export default function MainInfo() {
    const [isVisible, setIsVisible] = useState(false)
    
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(true)
        }, 100)

        return () => clearTimeout(timer)
    }, [])

    const boxes = [
        { id: 1, color: "#222222", text: "자막을 만들고", fontColor: "#ffffff" },
        { id: 2, color: "#ffffff", text: "글을 작성하여 공유하고", fontColor: "#222222" },
        { id: 3, color: "#222222", text: "모두가 즐길 수 있어요", fontColor: "#ffffff" }
    ]

    return (
        <div style={container}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <AnimatePresence mode="wait" initial={true}>
                    {isVisible && boxes.map((item, index) => (
                        <motion.div
                            key={item.id}
                            initial={{ 
                                opacity: 0, 
                                x: -200,  // 시작 위치를 더 멀리
                                scale: 0.8,  // 시작할 때 약간 작게
                                rotateX: -20  // 약간 기울어진 상태로 시작
                            }}
                            animate={{ 
                                opacity: 1, 
                                x: 0,
                                scale: 1,
                                rotateX: 0
                            }}
                            exit={{ 
                                opacity: 0, 
                                x: 100,
                                scale: 0.8
                            }}
                            transition={{
                                type: "spring",
                                damping: 12,  // 튀어오르는 정도 조절
                                stiffness: 100,  // 스프링의 강도
                                mass: 0.8,  // 무게감
                                delay: index * 0.3,  // 각 박스 사이의 딜레이 증가
                            }}
                            style={{
                                ...box,
                                backgroundColor: item.color,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "flex-start",
                                perspective: "1000px",  // 3D 효과를 위한 perspective 추가
                            }}
                        >
                            <div style={{ 
                                marginLeft: "10px", 
                                fontSize: "15px", 
                                fontWeight: "bold", 
                                color: item.fontColor 
                            }}>
                                {item.text}
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
        </div>
    )
}

/**
 * ==============   Styles   ================
 */

const container: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    position: "relative",
    gap: "10px",
    padding: "10px"
}

const box: React.CSSProperties = {
    width: "100%",
    height: "50px",
    borderRadius: "10px",
    border: "2px solid rgba(255, 255, 255, 0.1)"
}

const button: React.CSSProperties = {
    backgroundColor: "#0cdcf7",
    borderRadius: "10px",
    padding: "10px 20px",
    color: "#0f1115",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    border: "none",
    cursor: "pointer",
}
