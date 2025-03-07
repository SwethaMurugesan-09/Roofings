import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'
import {BrowserRouter} from 'react-router-dom'
import {ClerkProvider} from '@clerk/clerk-react'

const PUBLISHABLE_KEY = process.env.REACT_APP_CLERK_PUBLISHABLE_KEY || "Missing key in environment file";

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key")
}


createRoot(document.getElementById('root')).render(
  <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
  <BrowserRouter>
    <App />
  </BrowserRouter>
  </ClerkProvider>,
)
 