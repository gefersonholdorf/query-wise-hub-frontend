/** biome-ignore-all lint/style/noNonNullAssertion: <!> */
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { App } from './app'
import { Toaster } from './components/ui/sonner'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
    <Toaster
      position="top-center"
      toastOptions={{
        style: {
          borderRadius: '8px',
          padding: '12px 16px',
          fontWeight: 500,
        },
        className: 'custom-toast',
      }}
      richColors
    />
  </StrictMode>,
)
