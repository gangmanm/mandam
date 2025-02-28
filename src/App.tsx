import { useState } from 'react'
import * as S from "./styles/App"
import { ThemeProvider } from 'styled-components'
import { theme } from './styles/theme'
import List from './pages/List'
import Main from './pages/Main'

import { BrowserRouter, Routes, Route } from "react-router-dom";

const AppContent = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
         <Route path="/" element={<Main />} />  
         <Route path="/list" element={<List />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

function App() {
  return (
    <ThemeProvider theme={theme}>
      <AppContent />
    </ThemeProvider>
  )
}

export default App
