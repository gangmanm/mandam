import { ThemeProvider } from 'styled-components'
import { theme } from './styles/theme'
import List from './pages/List'
import Main from './pages/Main'
import SignUp from './pages/SignUp'
import SignIn from './pages/SignIn'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Post from './pages/Post'
import Content from './pages/Content'

const AppContent = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
         <Route path="/" element={<Main />} />  
         <Route path="/list" element={<List />} />
         <Route path="/signup" element={<SignUp />} />
         <Route path="/signin" element={<SignIn />} />
         <Route path="/post" element={<Post />} />
         <Route path="/content/:id" element={<Content />} />
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
