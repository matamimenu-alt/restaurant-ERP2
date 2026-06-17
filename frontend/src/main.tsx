import React from 'react'
import ReactDOM from 'react-dom/client'
import { QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import { queryClient } from './lib/queryClient'
import './index.css'

// Initialize language direction from stored preference
const storedLang = localStorage.getItem('lang-storage')
if (storedLang) {
  try {
    const parsed = JSON.parse(storedLang)
    const lang = parsed?.state?.lang || 'ar'
    const dir = lang === 'ar' ? 'rtl' : 'ltr'
    document.documentElement.lang = lang
    document.documentElement.dir = dir
  } catch {
    document.documentElement.lang = 'ar'
    document.documentElement.dir = 'rtl'
  }
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>,
)
