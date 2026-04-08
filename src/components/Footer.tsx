"use client";

const footerLinks = {
  Services: [
    { label: "MVP in 4 Weeks", href: "#services" },
    { label: "Pitch Decks", href: "#services" },
    { label: "Prototype Sprint", href: "#services" },
    { label: "Launch Package", href: "#services" },
    { label: "Tech Strategy", href: "#services" },
    { label: "Rebuild & Rescue", href: "#services" },
  ],
  Company: [
    { label: "About", href: "#" },
    { label: "Process", href: "#process" },
    { label: "Case Studies", href: "#" },
    { label: "Blog", href: "#" },
    { label: "Careers", href: "#" },
  ],
  Legal: [
    { label: "Privacy Policy", href: "#" },
    { label: "Terms of Service", href: "#" },
    { label: "Cookie Policy", href: "#" },
    { label: "Refund Policy", href: "#" },
  ],
};

const socials = [
  {
    label: "X / Twitter",
    href: "#",
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    label: "GitHub",
    href: "#",
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.154-1.11-1.462-1.11-1.462-.908-.62.069-.607.069-.607 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.252-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0 1 12 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "#",
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: "Discord",
    href: "#",
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057c.002.022.015.043.03.056a19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z" />
      </svg>
    ),
  },
];

export default function Footer() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;700;900&family=Space+Mono:wght@400;700&display=swap');

        .cf-footer {
          background: #07070f;
          border-top: 1px solid #0f0f22;
          font-family: 'DM Sans', sans-serif;
          color: #fff;
          position: relative;
          overflow: hidden;
        }
        .cf-footer::before {
          content: '';
          position: absolute;
          top: -120px;
          left: 50%;
          transform: translateX(-50%);
          width: 600px;
          height: 300px;
          background: radial-gradient(ellipse, rgba(124,92,252,0.07) 0%, transparent 70%);
          pointer-events: none;
        }
        .cf-footer-inner {
          max-width: 1280px;
          margin: 0 auto;
          padding: 5rem 2rem 0;
          position: relative;
          z-index: 1;
        }
        .cf-footer-top {
          display: grid;
          grid-template-columns: 1.8fr repeat(3, 1fr);
          gap: 3rem;
          padding-bottom: 4rem;
          border-bottom: 1px solid #0f0f22;
        }
        .cf-footer-brand {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }
        .cf-footer-logo {
          display: flex;
          align-items: center;
          gap: 10px;
          text-decoration: none;
        }
        .cf-footer-logo-mark {
          width: 34px;
          height: 34px;
          border-radius: 9px;
          background: linear-gradient(135deg, #7c5cfc 0%, #4f8ef7 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 900;
          font-size: 14px;
          color: #fff;
          letter-spacing: -0.03em;
          flex-shrink: 0;
        }
        .cf-footer-logo-text {
          font-weight: 900;
          font-size: 15px;
          color: #fff;
          letter-spacing: -0.02em;
        }
        .cf-footer-tagline {
          color: #444466;
          font-size: 13px;
          line-height: 1.7;
          max-width: 240px;
        }
        .cf-footer-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: rgba(124, 92, 252, 0.08);
          border: 1px solid rgba(124, 92, 252, 0.2);
          border-radius: 100px;
          padding: 5px 12px 5px 8px;
          font-family: 'Space Mono', monospace;
          font-size: 10px;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #a78bfa;
          width: fit-content;
        }
        .cf-footer-badge-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #a78bfa;
          animation: cf-pulse 2s ease-in-out infinite;
          flex-shrink: 0;
        }
        @keyframes cf-pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.35; }
        }
        .cf-footer-socials {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
        }
        .cf-social-btn {
          width: 34px;
          height: 34px;
          border-radius: 9px;
          border: 1px solid #1e1e3a;
          background: transparent;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #444466;
          text-decoration: none;
          transition: color 0.2s, border-color 0.2s, background 0.2s;
        }
        .cf-social-btn:hover {
          color: #a78bfa;
          border-color: rgba(124, 92, 252, 0.35);
          background: rgba(124, 92, 252, 0.07);
        }
        .cf-footer-col-title {
          font-family: 'Space Mono', monospace;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: #2a2a4a;
          margin-bottom: 1.25rem;
        }
        .cf-footer-col ul {
          list-style: none;
          margin: 0;
          padding: 0;
          display: flex;
          flex-direction: column;
          gap: 0.6rem;
        }
        .cf-footer-col ul li a {
          text-decoration: none;
          color: #444466;
          font-size: 13px;
          font-weight: 500;
          transition: color 0.2s;
        }
        .cf-footer-col ul li a:hover {
          color: #a78bfa;
        }
        .cf-footer-bottom {
          max-width: 1280px;
          margin: 0 auto;
          padding: 1.75rem 2rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
          position: relative;
          z-index: 1;
        }
        .cf-footer-copy {
          font-family: 'Space Mono', monospace;
          font-size: 10px;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #1e1e3a;
        }
        .cf-footer-bottom-links {
          display: flex;
          align-items: center;
          gap: 1.25rem;
        }
        .cf-footer-bottom-links a {
          text-decoration: none;
          font-family: 'Space Mono', monospace;
          font-size: 10px;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #1e1e3a;
          transition: color 0.2s;
        }
        .cf-footer-bottom-links a:hover { color: #7c5cfc; }
        .cf-footer-accent {
          display: flex;
          align-items: center;
          gap: 6px;
          font-family: 'Space Mono', monospace;
          font-size: 10px;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #1e1e3a;
        }
        .cf-footer-accent span {
          color: #7c5cfc;
        }

        @media (max-width: 900px) {
          .cf-footer-top {
            grid-template-columns: 1fr 1fr;
            gap: 2rem;
          }
          .cf-footer-brand { grid-column: 1 / -1; }
        }
        @media (max-width: 600px) {
          .cf-footer-top { grid-template-columns: 1fr; }
          .cf-footer-bottom { flex-direction: column; align-items: flex-start; gap: 0.75rem; }
        }
      `}</style>

      <footer className="cf-footer">
        <div className="cf-footer-inner">
          <div className="cf-footer-top">
            {/* Brand column */}
            <div className="cf-footer-brand">
              <a href="/" className="cf-footer-logo">
                <div className="cf-footer-logo-mark">CF</div>
                <span className="cf-footer-logo-text">CodingoForge</span>
              </a>
              <p className="cf-footer-tagline">
                We turn founder ideas into launchable MVPs — designed for traction, built for scale.
              </p>
              <div className="cf-footer-badge">
                <span className="cf-footer-badge-dot" />
                Accepting Projects · Est. 2025
              </div>
              <div className="cf-footer-socials">
                {socials.map(({ label, href, icon }) => (
                  <a key={label} href={href} className="cf-social-btn" aria-label={label}>
                    {icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Link columns */}
            {Object.entries(footerLinks).map(([category, links]) => (
              <div key={category} className="cf-footer-col">
                <p className="cf-footer-col-title">// {category.toLowerCase()}</p>
                <ul>
                  {links.map(({ label, href }) => (
                    <li key={label}>
                      <a href={href}>{label}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="cf-footer-bottom">
          <p className="cf-footer-copy">© 2025 CodingoForge · All rights reserved</p>
          <div className="cf-footer-bottom-links">
            <a href="#">Privacy</a>
            <a href="#">Terms</a>
            <a href="#">Cookies</a>
          </div>
          <div className="cf-footer-accent">
            Built with <span>♥</span> for founders
          </div>
        </div>
      </footer>
    </>
  );
}