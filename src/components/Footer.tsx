"use client";
import { useState } from "react";

type ModalType =
  | "services"
  | "about"
  | "processes"
  | "careers"
  | "contact"
  | "privacy"
  | "terms"
  | null;

const TODAY_DATE = "15 April 2026";

const footerLinks = {
  Services: [
    { label: "AI CRM Systems", href: "#services", modal: "services" as const },
    { label: "ERP Solutions", href: "#services", modal: "services" as const },
    { label: "Warehouse Management", href: "#services", modal: "services" as const },
    { label: "Internal Tools", href: "#services", modal: "services" as const },
    { label: "MVP Development", href: "#services", modal: "services" as const },
  ],
  Company: [
    { label: "About", href: "#about", modal: "about" as const },
    { label: "Processes", href: "#processes", modal: "processes" as const },
    { label: "Careers", href: "#careers", modal: "careers" as const },
    { label: "Contact", href: "#contact", modal: "contact" as const },
  ],
  Legal: [
    { label: "Privacy Policy", href: "#privacy", modal: "privacy" as const },
    { label: "Terms of Service", href: "#terms", modal: "terms" as const },
  ],
};

const linkedin = {
  label: "LinkedIn",
  href: "https://www.linkedin.com/company/codingo-forge/",
  icon: (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  ),
};

const MODALS: Record<Exclude<ModalType, null>, { title: string; body: string[] }> = {
  services: {
    title: "IT Solutions",
    body: [
      `Effective Date: ${TODAY_DATE}`,
      "We build AI CRM systems, ERP platforms, warehouse tools, internal dashboards, and MVP products.",
      "Every project is scoped before development begins.",
      "Deliverables, timelines, and revisions depend on the agreed proposal or statement of work.",
    ],
  },
  about: {
    title: "About CodingoForge",
    body: [
      `Effective Date: ${TODAY_DATE}`,
      "CodingoForge is a product-focused software studio.",
      "We help founders and businesses turn ideas into working digital products with clean execution and modern design.",
    ],
  },
  processes: {
    title: "Processes",
    body: [
      `Effective Date: ${TODAY_DATE}`,
      "Discover: Understand requirements, users, and goals.",
      "Plan: Define scope, timeline, features, and tools.",
      "Build: Design and develop the product.",
      "Launch: Deploy and support the final release.",
    ],
  },
  careers: {
    title: "Careers",
    body: [
      `Effective Date: ${TODAY_DATE}`,
      "We welcome engineers, designers, and product-minded builders.",
      "At the moment, there are no open positions.",
    ],
  },
  contact: {
    title: "Contact",
    body: [
      `Effective Date: ${TODAY_DATE}`,
      "Email: codingoforge@gmail.com",
      "We usually respond with project feedback, next steps, and proposal details.",
    ],
  },
  privacy: {
    title: "Privacy Policy",
    body: [
      `Effective Date: ${TODAY_DATE}`,
      "We collect information you share directly with us, including your name, email, phone number, company name, project details, and messages.",
      "We may also collect basic technical data such as browser type, device information, pages visited, and IP address for analytics and security.",
      "We use this information to respond to inquiries, provide proposals, deliver services, improve our website, and maintain records.",
      "We may use cookies and similar technologies to improve site performance and understand usage patterns.",
      "We do not sell your personal information.",
      "We may share information only with trusted service providers, such as hosting, analytics, communication, or payment tools, when necessary for operations.",
      "We retain personal data only as long as needed for business, legal, or service purposes.",
      "You may request access, correction, or deletion of your data by emailing codingoforge@gmail.com.",
    ],
  },
  terms: {
    title: "Terms of Service",
    body: [
      `Effective Date: ${TODAY_DATE}`,
      "By using this website or hiring our services, you agree to these terms.",
      "All project work is based on the agreed scope, proposal, email confirmation, or statement of work.",
      "Payments must be made on time as per the agreed invoice or proposal.",
      "Delays in feedback, access, or approvals may affect timelines.",
      "We retain rights to work product until full payment is received, unless otherwise agreed in writing.",
      "Third-party tools, libraries, hosting, APIs, and services are subject to their own terms and are outside our control.",
      "We are not liable for indirect losses, business interruption, third-party failures, or downtime beyond our reasonable control.",
      "Either party may terminate a project by written notice, subject to payment for completed work.",
      "These terms are governed by the laws of India.",
    ],
  },
};

export default function Footer() {
  const [openModal, setOpenModal] = useState<ModalType>(null);

  const openSection = (modal: ModalType) => setOpenModal(modal);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;700;900&family=Space+Mono:wght@400;700&display=swap');

        .cf-footer {
          background: #07111f;
          border-top: 1px solid rgba(138, 180, 255, 0.12);
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
          width: 620px;
          height: 300px;
          background: radial-gradient(ellipse, rgba(138,180,255,0.08) 0%, transparent 70%);
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
          grid-template-columns: 1.8fr repeat(2, 1fr);
          gap: 3rem;
          padding-bottom: 4rem;
          border-bottom: 1px solid rgba(138, 180, 255, 0.12);
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

        .cf-footer-logo img {
          width: 40px;
          height: 40px;
          border-radius: 999px;
          object-fit: cover;
          border: 1px solid rgba(138, 180, 255, 0.2);
          box-shadow: 0 10px 24px rgba(0,0,0,0.25);
        }

        .cf-footer-logo-text {
          font-weight: 900;
          font-size: 15px;
          color: #fff;
          letter-spacing: -0.02em;
        }

        .cf-footer-tagline {
          color: rgba(232, 241, 255, 0.72);
          font-size: 13px;
          line-height: 1.7;
          max-width: 280px;
        }

        .cf-footer-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: rgba(138,180,255,0.08);
          border: 1px solid rgba(138,180,255,0.18);
          border-radius: 100px;
          padding: 5px 12px 5px 8px;
          font-family: 'Space Mono', monospace;
          font-size: 10px;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #dbeafe;
          width: fit-content;
        }

        .cf-footer-badge-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #8ab4ff;
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
          border-radius: 10px;
          border: 1px solid rgba(138, 180, 255, 0.14);
          background: rgba(255,255,255,0.03);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #dbeafe;
          text-decoration: none;
          transition: color 0.2s, border-color 0.2s, background 0.2s, transform 0.2s;
        }

        .cf-social-btn:hover {
          color: #fff;
          border-color: rgba(138, 180, 255, 0.3);
          background: rgba(138, 180, 255, 0.12);
          transform: translateY(-1px);
        }

        .cf-footer-col-title {
          font-family: 'Space Mono', monospace;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: rgba(219, 234, 254, 0.38);
          margin-bottom: 1.25rem;
        }

        .cf-footer-col ul {
          list-style: none;
          margin: 0;
          padding: 0;
          display: flex;
          flex-direction: column;
          gap: 0.7rem;
        }

        .cf-footer-col ul li a,
        .cf-footer-col button {
          text-decoration: none;
          color: rgba(232, 241, 255, 0.72);
          font-size: 13px;
          font-weight: 500;
          transition: color 0.2s;
          background: none;
          border: none;
          padding: 0;
          text-align: left;
          cursor: pointer;
        }

        .cf-footer-col ul li a:hover,
        .cf-footer-col button:hover {
          color: #8ab4ff;
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
          flex-wrap: wrap;
        }

        .cf-footer-copy {
          font-family: 'Space Mono', monospace;
          font-size: 10px;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: rgba(219, 234, 254, 0.32);
        }

        .cf-footer-bottom-links {
          display: flex;
          align-items: center;
          gap: 1.25rem;
          flex-wrap: wrap;
        }

        .cf-footer-bottom-links button {
          background: none;
          border: none;
          padding: 0;
          cursor: pointer;
          font-family: 'Space Mono', monospace;
          font-size: 10px;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: rgba(219, 234, 254, 0.32);
          transition: color 0.2s;
        }

        .cf-footer-bottom-links button:hover { color: #8ab4ff; }

        .cf-footer-accent {
          display: flex;
          align-items: center;
          gap: 6px;
          font-family: 'Space Mono', monospace;
          font-size: 10px;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: rgba(219, 234, 254, 0.32);
        }

        .cf-footer-accent span {
          color: #8ab4ff;
        }

        .cf-modal-backdrop {
          position: fixed;
          inset: 0;
          background: rgba(3, 8, 18, 0.68);
          backdrop-filter: blur(10px);
          z-index: 2000;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1rem;
        }

        .cf-modal {
          width: 100%;
          max-width: 620px;
          max-height: 85vh;
          overflow: auto;
          border-radius: 24px;
          background: linear-gradient(180deg, rgba(11,22,40,0.98), rgba(7,17,31,0.98));
          border: 1px solid rgba(138,180,255,0.16);
          box-shadow: 0 24px 80px rgba(0,0,0,0.45);
          padding: 1.5rem;
        }

        .cf-modal-head {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 1rem;
          margin-bottom: 1rem;
        }

        .cf-modal-title {
          font-size: 1.25rem;
          font-weight: 900;
          color: #fff;
          margin: 0;
        }

        .cf-modal-close {
          border: 1px solid rgba(138,180,255,0.16);
          background: rgba(255,255,255,0.03);
          color: #dbeafe;
          width: 36px;
          height: 36px;
          border-radius: 10px;
          cursor: pointer;
        }

        .cf-modal-body {
          display: grid;
          gap: 0.75rem;
        }

        .cf-modal-item {
          padding: 0.95rem 1rem;
          border-radius: 14px;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(138,180,255,0.1);
          color: rgba(232,241,255,0.82);
          font-size: 14px;
          line-height: 1.7;
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
          .cf-modal { border-radius: 20px; padding: 1.25rem; }
        }
      `}</style>

      <footer className="cf-footer">
        <div className="cf-footer-inner">
          <div className="cf-footer-top">
            <div className="cf-footer-brand">
              <a href="/" className="cf-footer-logo">
                <img src="/logo.jpeg" alt="CodingoForge Logo" />
                <span className="cf-footer-logo-text">CodingoForge</span>
              </a>

              <p className="cf-footer-tagline">
                We turn founder ideas into launchable MVPs — designed for traction, built for scale.
              </p>

              <div className="cf-footer-badge">
                <span className="cf-footer-badge-dot" />
                Accepting Projects · Est. 2026
              </div>

              <div className="cf-footer-socials">
                <a
                  href={linkedin.href}
                  className="cf-social-btn"
                  aria-label={linkedin.label}
                  target="_blank"
                  rel="noreferrer"
                >
                  {linkedin.icon}
                </a>
              </div>
            </div>

            {Object.entries(footerLinks).map(([category, links]) => (
              <div key={category} className="cf-footer-col">
                <p className="cf-footer-col-title">// {category.toLowerCase()}</p>
                <ul>
                  {links.map(({ label, modal }) => (
                    <li key={label}>
                      <button onClick={() => openSection(modal)}>{label}</button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="cf-footer-bottom">
          <p className="cf-footer-copy">© 2026 CodingoForge · All rights reserved</p>

          <div className="cf-footer-bottom-links">
            <button onClick={() => openSection("privacy")}>Privacy Policy</button>
            <button onClick={() => openSection("terms")}>Terms of Service</button>
          </div>

          <div className="cf-footer-accent">
            Built with <span>♥</span> for founders
          </div>
        </div>
      </footer>

      {openModal && (
        <div className="cf-modal-backdrop" onClick={() => setOpenModal(null)}>
          <div className="cf-modal" onClick={(e) => e.stopPropagation()}>
            <div className="cf-modal-head">
              <div>
                <p className="cf-footer-col-title" style={{ marginBottom: 8 }}>info</p>
                <h3 className="cf-modal-title">{MODALS[openModal].title}</h3>
              </div>
              <button className="cf-modal-close" onClick={() => setOpenModal(null)} aria-label="Close modal">
                ×
              </button>
            </div>

            <div className="cf-modal-body">
              {MODALS[openModal].body.map((item) => (
                <div key={item} className="cf-modal-item">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
