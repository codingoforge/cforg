import { Routes, Route, useLocation } from 'react-router-dom';
import { useState } from 'react';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AuthPage from './pages/AuthPage';
import Dashboard from './pages/Dashboard';
import PitchModal from './components/PitchModal';
import { SignedIn, SignedOut, RedirectToSignIn } from "@clerk/clerk-react";
import AdminPanel from './pages/AdminPanel';

// Pages that should NOT show the marketing Navbar + Footer
const BARE_ROUTES = ['/sign-in', '/sign-up', '/dashboard'];

function App() {
  const [modalOpen, setModalOpen] = useState(false);
  const location = useLocation();

  const isBare = BARE_ROUTES.some((r) => location.pathname.startsWith(r));

  return (
    <div className="min-h-screen bg-[#080808] text-white">

      {/* Navbar only on marketing pages */}
      {!isBare && <Navbar onOpenModal={() => setModalOpen(true)} />}

<Routes>
  <Route path="/" element={
    <Home
      modalOpen={modalOpen}
      onOpenModal={() => setModalOpen(true)}
      onCloseModal={() => setModalOpen(false)}
    />
  } />

  {/* ── Admin── */}
  <Route path="/admin" element={<AdminPanel />} />

        {/* ── Auth ── */}
        <Route path="/sign-in" element={<AuthPage />} />
        <Route path="/sign-up" element={<AuthPage />} />

        {/* ── Protected: Dashboard ── */}
        <Route
          path="/dashboard"
          element={
            <>
              <SignedIn>
                <Dashboard />
              </SignedIn>
              <SignedOut>
                <RedirectToSignIn redirectUrl="/dashboard" />
              </SignedOut>
            </>
          }
        />
      </Routes>

      {/* Footer only on marketing pages */}
      {!isBare && <Footer />}

      {modalOpen && <PitchModal onClose={() => setModalOpen(false)} />}
    </div>
  );
}

export default App;