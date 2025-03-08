import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

// 콘솔 로그 완전 비활성화
const noop = () => {};
Object.defineProperties(window.console, {
  log: { value: noop, writable: false },
  error: { value: noop, writable: false },
  warn: { value: noop, writable: false },
  info: { value: noop, writable: false },
  debug: { value: noop, writable: false },
  trace: { value: noop, writable: false },
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
