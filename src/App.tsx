import { Routes, Route } from 'react-router-dom';
import { useState } from 'react';

import Home from './pages/Home';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import PitchModal from './components/PitchModal'; // modal separate file hona chahiye

function App() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#080808] text-white">

      <Navbar onOpenModal={() => setModalOpen(true)} />

      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>

      <Footer />

      {modalOpen && <PitchModal onClose={() => setModalOpen(false)} />}
      
    </div>
  );
}

export default App;