import { Routes, Route, useLocation } from 'react-router-dom';
import { useState } from 'react';
import Home from './pages/Home';
import Solution from './pages/Solution';
import About from './pages/About';
import Career from './pages/Career';
import Process from './pages/Process';
import Conetect from './pages/Conetect';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AuthPage from './pages/AuthPage';
import Dashboard from './pages/Dashboard';
import PitchModal from './components/PitchModal';
import { SignedIn, SignedOut, RedirectToSignIn } from "@clerk/clerk-react";
import AdminPanel from './pages/AdminPanel';
import AdminRoute from './utils/AdminRoute';

// Pages that should NOT show the marketing Navbar + Footer
const BARE_ROUTES = ['/sign-in', '/sign-up', '/dashboard'];

function App() {
  const [modalOpen, setModalOpen] = useState(false);
  const [initialIdea, setInitialIdea] = useState("");
  const openPitch = (idea = "") => { setInitialIdea(idea); setModalOpen(true); };
  const location = useLocation();

  const isBare = BARE_ROUTES.some((r) => location.pathname.startsWith(r));

  return (
    <div className="min-h-screen bg-[#080808] text-white">

      {/* Navbar only on marketing pages */}
      {!isBare && <Navbar onOpenModal={() => openPitch()} />}

<Routes>
  <Route path="/" element={
    <Home
      onOpenModal={() => openPitch()}
      onUseBrief={openPitch}
    />
  } />
  <Route path="/solution" element={
    <Solution onOpenModal={() => openPitch()} />
  } />
  <Route path="/process" element={<Process />} />
  <Route path="/about" element={<About />} />
  <Route path="/career" element={<Career />} />
  <Route path="/conetect" element={<Conetect />} />

      {/* ── Admin── */}
      <Route
      path="/admin"
      element={
        <AdminRoute>
          <AdminPanel />
        </AdminRoute>
      }
    />

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

      {modalOpen && <PitchModal initialIdea={initialIdea} onClose={() => setModalOpen(false)} />}
    </div>
  );
}

export default App;