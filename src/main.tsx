import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { ClerkProvider } from "@clerk/clerk-react"
import './index.css'
import App from './App.tsx'

const key = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

// ClerkProvider ko navigate chahiye React Router ka
// isliye ek wrapper banate hain
function ClerkWithRouter() {
  return (
    <ClerkProvider
      publishableKey={key}
      signInUrl="/sign-in"
      signUpUrl="/sign-up"
      afterSignInUrl="/dashboard"
      afterSignUpUrl="/dashboard"
    >
      <App />
    </ClerkProvider>
  );
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* BrowserRouter pehle — taaki useNavigate kaam kare ClerkProvider mein */}
    <BrowserRouter>
      <ClerkWithRouter />
    </BrowserRouter>
  </StrictMode>,
)