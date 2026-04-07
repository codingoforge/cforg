export default function Footer() {
  return (
    <footer className="border-t border-[#1a1a1a] bg-[#080808]">
      <div className="max-w-7xl mx-auto px-6 py-12 grid md:grid-cols-4 gap-10">
        
        {/* Logo */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-[#ff6b35] rounded-md flex items-center justify-center">
              <span className="text-white font-black text-xs">CF</span>
            </div>
            <span className="font-black text-white">
              Codingo<span className="text-[#ff6b35]">Forge</span>
            </span>
          </div>
          <p className="text-[#555] text-xs">
            The MVP studio for serious founders. We build fast, we build right.
          </p>
        </div>

        {/* Links */}
        {[
          { heading: "Studio", links: ["Services", "Process", "Portfolio"] },
          { heading: "Company", links: ["About", "Careers", "Blog"] },
          { heading: "Connect", links: ["Twitter", "LinkedIn", "GitHub"] },
        ].map(({ heading, links }) => (
          <div key={heading}>
            <p className="text-[#ff6b35] text-xs uppercase mb-4">{heading}</p>
            <ul className="space-y-2">
              {links.map((l) => (
                <li key={l}>
                  <a href="#" className="text-[#555] hover:text-white text-sm">
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-[#1a1a1a] px-6 py-5 flex justify-between">
        <p className="text-[#444] text-xs">© 2026 CodingoForge</p>
        <p className="text-[#333] text-xs">Crafted for builders</p>
      </div>
    </footer>
  );
}