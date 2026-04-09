import { Routes, Route } from 'react-router-dom';
import { useState } from 'react';

import Home from './pages/Home';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { SignedIn, SignedOut, RedirectToSignIn } from "@clerk/clerk-react";
import PitchModal from './components/PitchModal'; // modal separate file hona chahiye
import { SignIn, SignUp } from "@clerk/clerk-react";
import Dashboard from "./pages/Dashboard";

function App() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#080808] text-white">

      <Navbar onOpenModal={() => setModalOpen(true)} />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route
              path="/dashboard"
              element={
                <>
                  <SignedIn>
                    <Dashboard />
                  </SignedIn>
                  <SignedOut>
                    <RedirectToSignIn />
                  </SignedOut>
                </>
              }
            />
      </Routes>

      <Footer />

      {modalOpen && <PitchModal onClose={() => setModalOpen(false)} />}
      
    </div>
  );
}

export default App;