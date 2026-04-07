import { useState, useEffect } from "react";

const NAV_LINKS = [ "Track", "Proof of Work", "About Us", "Contact"];

export default function Navbar({ onOpenModal }: { onOpenModal: () => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [activeNav, setActiveNav] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className={`fixed top-0 inset-x-0 z-40 transition-all duration-300 ${scrolled ? "bg-[#080808]/95 backdrop-blur border-b border-[#1a1a1a]" : ""}`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16">
        
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 bg-[#ff6b35] rounded-md flex items-center justify-center">
            <span className="text-white font-black text-xs">CF</span>
          </div>
          <span className="font-black text-white tracking-tight text-lg">
            Codingo<span className="text-[#ff6b35]">Forge</span>
          </span>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((l) => (
            <a key={l} href={`#${l.toLowerCase()}`} className="text-[#888] hover:text-white text-sm">
              {l}
            </a>
          ))}
        </div>

        {/* Button */}
        <button
          onClick={onOpenModal}
          className="hidden md:block bg-[#ff6b35] text-white text-sm font-bold px-5 py-2 rounded-lg"
        >
          Pitch Your Idea
        </button>

        {/* Mobile Menu */}
        <button className="md:hidden text-[#888]" onClick={() => setActiveNav(!activeNav)}>
          ☰
        </button>
      </div>

      {activeNav && (
        <div className="md:hidden bg-[#0d0d0d] border-t border-[#1a1a1a] px-6 py-4 space-y-3">
          {NAV_LINKS.map((l) => (
            <a key={l} href={`#${l.toLowerCase()}`} onClick={() => setActiveNav(false)} className="block text-[#888] hover:text-white text-sm">
              {l}
            </a>
          ))}
          <button
            onClick={() => {
              onOpenModal();
              setActiveNav(false);
            }}
            className="w-full bg-[#ff6b35] text-white font-bold py-2 rounded-lg text-sm"
          >
            Pitch Your Idea
          </button>
        </div>
      )}
    </nav>
  );
}