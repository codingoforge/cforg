"use client";
import { useRef } from "react";
import PitchModal from "../components/PitchModal";

const SERVICES = [
  { icon: "🤖", title: "AI CRM Systems", desc: "Smart customer platforms with automation, insights, and workflow support.", tag: "POPULAR" },
  { icon: "📊", title: "ERP Solutions", desc: "Operational systems for planning, reporting, and internal efficiency.", tag: null },
  { icon: "🏪", title: "Warehouse Management", desc: "Inventory and logistics systems built for clarity and scale.", tag: "FAST TRACK" },
  { icon: "🔍", title: "DRM Platforms", desc: "Content and asset protection systems with secure access controls.", tag: null },
  { icon: "⚙️", title: "Internal Tools", desc: "Custom admin, operations, and team productivity dashboards.", tag: null },
  { icon: "🚀", title: "MVP Development", desc: "Fast product launches from idea to working prototype.", tag: "MVP" },
];

const TESTIMONIALS = [
  {
    name: "Aarav Mehta",
    role: "Founder, SaaS Startup",
    text: "They turned our messy product idea into a clean MVP with a strong execution flow.",
  },
  {
    name: "Nikita Sharma",
    role: "Operations Lead, Retail Brand",
    text: "The dashboard and workflow automation saved hours every week. Very practical delivery.",
  },
  {
    name: "Rohit Verma",
    role: "Business Owner",
    text: "Clear communication, fast turnaround, and a product that felt built for our exact needs.",
  },
];

const PROCESS = [
  {
    num: "01",
    title: "Discover",
    desc: "We understand your idea, business model, and what needs to be built first.",
  },
  {
    num: "02",
    title: "Plan",
    desc: "We map features, scope, timeline, and the best technical path.",
  },
  {
    num: "03",
    title: "Build",
    desc: "We design and develop the product with regular visibility and feedback.",
  },
  {
    num: "04",
    title: "Launch",
    desc: "We deploy the final product and support the transition into live usage.",
  },
];

const PRICING = [
  {
    title: "Starter",
    price: "Custom",
    desc: "Best for small MVPs and early-stage product ideas.",
  },
  {
    title: "Growth",
    price: "Custom",
    desc: "For businesses that need automation, dashboards, and integrations.",
  },
  {
    title: "Enterprise",
    price: "Custom",
    desc: "For larger systems like ERP, CRM, and internal platforms.",
  },
];

const ABOUT_POINTS = [
  "Product-focused studio built for startups and businesses.",
  "Strong design, clean execution, and practical development flow.",
  "Focused on CRM, ERP, internal tools, MVPs, and automation systems.",
];

const FOUNDER = {
  name: "Gaurav Uniyal",
  role: "Founder",
  title: "Software Engineer and Product Builder",
  desc:
    "Gaurav leads CodingoForge with a focus on practical product development, clean execution, and scalable software systems.",
  image: "/gaurav-uniyal.jpg",
};

const BRAND_MARQUEE = ["Amazon", "Google", "Microsoft", "Stripe", "Shopify", "Notion", "Airbnb", "Uber"];

const MARQUEE_ITEMS = [
  "Tech Solutions",
  "AI CRM",
  "ERP Platforms",
  "Warehouse Mgmt",
  "MVP Development",
  "IT Automation",
  "Custom Web Apps",
  "Enterprise Scale",
];

const NoiseBg = () => (
  <svg className="pointer-events-none fixed inset-0 w-full h-full opacity-[0.03] z-0" xmlns="http://www.w3.org/2000/svg">
    <filter id="noise">
      <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
      <feColorMatrix type="saturate" values="0" />
    </filter>
    <rect width="100%" height="100%" filter="url(#noise)" />
  </svg>
);

interface HomeProps {
  modalOpen: boolean;
  onOpenModal: () => void;
  onCloseModal: () => void;
}

export default function Home({ modalOpen, onOpenModal, onCloseModal }: HomeProps) {
  const heroRef = useRef<HTMLDivElement>(null);

  const scrollToSection = (section: string) => {
    const element = document.getElementById(section);
    if (element) element.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-[#07111f] text-white overflow-x-hidden" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;700;900&family=Space+Mono:wght@400;700&display=swap');
        * { box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #07111f; }
        ::-webkit-scrollbar-thumb { background: #8ab4ff; border-radius: 2px; }

        @keyframes fadeUp { from { opacity:0; transform:translateY(24px); } to { opacity:1; transform:translateY(0); } }
        @keyframes marquee { from { transform:translateX(0); } to { transform:translateX(-50%); } }
        @keyframes glow-pulse { 0%,100% { opacity:0.5; } 50% { opacity:1; } }

        .fade-up { animation: fadeUp 0.7s ease forwards; }
        .delay-1 { animation-delay: 0.1s; opacity: 0; }
        .delay-2 { animation-delay: 0.25s; opacity: 0; }
        .delay-3 { animation-delay: 0.4s; opacity: 0; }
        .delay-4 { animation-delay: 0.55s; opacity: 0; }

        .marquee-track { animation: marquee 28s linear infinite; }
        .brand-marquee { animation: marquee 20s linear infinite; }

        .card-hover {
          transition: transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
        }
        .card-hover:hover {
          transform: translateY(-4px);
          border-color: rgba(138,180,255,0.45) !important;
          box-shadow: 0 10px 30px rgba(138,180,255,0.08);
        }

        .cf-grid-bg {
          background-image:
            linear-gradient(rgba(138,180,255,0.08) 1px, transparent 1px),
            linear-gradient(90deg, rgba(138,180,255,0.08) 1px, transparent 1px);
          background-size: 60px 60px;
        }

        .accent-tag {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(138,180,255,0.08);
          border: 1px solid rgba(138,180,255,0.18);
          color: #dbeafe;
          padding: 6px 16px;
          border-radius: 100px;
          font-family: 'Space Mono', monospace;
          font-size: 11px;
          letter-spacing: 0.12em;
          text-transform: uppercase;
        }

        .accent-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #22c55e;
          box-shadow: 0 0 12px rgba(34,197,94,0.6);
          animation: glow-pulse 2s ease-in-out infinite;
          flex-shrink: 0;
        }

        .ai-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: rgba(138,180,255,0.1);
          border: 1px solid rgba(138,180,255,0.2);
          color: #dbeafe;
          padding: 4px 12px;
          border-radius: 20px;
          font-family: 'Space Mono', monospace;
          font-size: 10px;
          letter-spacing: 0.1em;
          text-transform: uppercase;
        }

        .btn-primary {
          background: linear-gradient(135deg, #8ab4ff 0%, #5b8def 50%, #7c5cff 100%);
          color: #fff;
          font-weight: 900;
          padding: 14px 32px;
          border-radius: 12px;
          border: none;
          cursor: pointer;
          font-size: 13px;
          text-transform: uppercase;
          letter-spacing: 0.07em;
          transition: opacity 0.2s, transform 0.15s;
          box-shadow: 0 0 28px rgba(138,180,255,0.25);
          font-family: 'DM Sans', sans-serif;
          text-decoration: none;
          display: inline-block;
        }
        .btn-primary:hover { opacity: 0.92; transform: translateY(-2px); }

        .btn-ghost {
          background: rgba(255,255,255,0.04);
          color: #e8f1ff;
          font-weight: 700;
          padding: 14px 32px;
          border-radius: 12px;
          border: 1px solid rgba(255,255,255,0.1);
          cursor: pointer;
          font-size: 13px;
          text-transform: uppercase;
          letter-spacing: 0.07em;
          transition: color 0.2s, border-color 0.2s, background 0.2s;
          font-family: 'DM Sans', sans-serif;
          text-decoration: none;
          display: inline-block;
        }
        .btn-ghost:hover { background: rgba(255,255,255,0.08); border-color: rgba(138,180,255,0.3); }

        .service-tag {
          position: absolute;
          top: 14px;
          right: 14px;
          background: rgba(138,180,255,0.1);
          border: 1px solid rgba(138,180,255,0.2);
          color: #dbeafe;
          font-family: 'Space Mono', monospace;
          font-size: 9px;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          padding: 3px 8px;
          border-radius: 100px;
        }

        .step-num {
          font-family: 'Space Mono', monospace;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.1em;
          color: #8ab4ff;
        }

        .section-eyebrow {
          font-family: 'Space Mono', monospace;
          font-size: 11px;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: #8ab4ff;
          margin-bottom: 12px;
        }

        .brand-item {
          opacity: 0.8;
          font-weight: 700;
          font-size: 18px;
          letter-spacing: -0.02em;
          color: #dbeafe;
        }

        .founder-photo {
          width: 100%;
          max-width: 240px;
          aspect-ratio: 1 / 1;
          border-radius: 24px;
          object-fit: cover;
          border: 1px solid rgba(138,180,255,0.18);
          box-shadow: 0 14px 40px rgba(0,0,0,0.25);
        }
      `}</style>

      <NoiseBg />

      <section ref={heroRef} className="relative min-h-screen flex flex-col justify-center pt-16 overflow-hidden">
        <div className="cf-grid-bg absolute inset-0 opacity-100" />
        <div
          className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[36rem] h-[36rem] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(ellipse, rgba(138,180,255,0.18) 0%, transparent 70%)" }}
        />
        <div
          className="absolute bottom-0 right-0 w-96 h-96 rounded-full pointer-events-none"
          style={{ background: "radial-gradient(ellipse, rgba(124,92,255,0.12) 0%, transparent 70%)" }}
        />

        <div className="relative max-w-7xl mx-auto px-6 py-24 grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div className="accent-tag fade-up delay-1">
              <span className="accent-dot" />
              MVP Studio
            </div>

            <h1 className="fade-up delay-2 text-5xl lg:text-7xl font-black leading-[0.95] tracking-tight">
              Build Modern
              <br />
              <span className="text-white">Tech Solutions</span>
              <br />
              With Clarity.
            </h1>

            <p className="fade-up delay-3 text-white/76 text-lg leading-relaxed max-w-md">
              Custom web apps for CRM, ERP, warehouse, IT tools, and rapid MVPs.
              <span className="ai-badge ml-2">AI-Powered</span>
            </p>

            <div className="fade-up delay-4 flex flex-wrap gap-4">
              <button onClick={onOpenModal} className="btn-primary group">
                Build Solution <span className="group-hover:translate-x-1 inline-block transition-transform">→</span>
              </button>
              <button onClick={() => scrollToSection("processes")} className="btn-ghost">
                See Process
              </button>
            </div>
          </div>

          <div className="fade-up delay-3 relative hidden lg:block">
            <div className="relative bg-[#0b1628] border border-white/10 rounded-2xl p-8 shadow-2xl">
              <div className="flex items-center justify-between mb-5">
                <h3 className="text-2xl font-black text-white tracking-tight">AI-Powered Prompt Box</h3>
                <span className="ai-badge">AI Assistant</span>
              </div>

              <div className="bg-[#0a1424] border border-white/10 rounded-xl p-3 flex items-end gap-3 focus-within:border-[#8ab4ff] transition-colors">
                <textarea
                  placeholder="Describe your CRM, ERP, warehouse or MVP needs..."
                  rows={2}
                  className="flex-1 bg-transparent border-none outline-none text-white text-sm placeholder-white/35 resize-none leading-relaxed"
                />
                <button
                  className="w-9 h-9 rounded-full flex items-center justify-center shrink-0 transition-all hover:opacity-85"
                  style={{ background: "linear-gradient(135deg,#8ab4ff,#7c5cff)" }}
                  onClick={onOpenModal}
                  title="AI-Powered Intake"
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="12" y1="19" x2="12" y2="5" />
                    <polyline points="5 12 12 5 19 12" />
                  </svg>
                </button>
              </div>

              <div className="flex flex-wrap gap-2 mt-4 justify-center">
                {["AI CRM", "ERP Platform", "Warehouse Mgmt", "MVP 4 Weeks"].map((chip) => (
                  <span
                    key={chip}
                    className="text-xs px-3 py-1.5 rounded-full cursor-pointer transition-all hover:bg-[#8ab4ff] hover:text-[#07111f]"
                    style={{
                      background: "rgba(138,180,255,0.08)",
                      border: "1px solid rgba(138,180,255,0.18)",
                      color: "#dbeafe",
                      fontFamily: "'Space Mono',monospace",
                      letterSpacing: "0.05em",
                    }}
                    onClick={onOpenModal}
                  >
                    {chip}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-12 left-0 right-0 py-6 bg-[#0a1424]/90 backdrop-blur-sm border-y border-white/10">
          <div className="brand-marquee flex gap-16 whitespace-nowrap px-6">
            {[...Array(3)].map((_, i) => (
              <span key={i} className="flex gap-16">
                {BRAND_MARQUEE.map((brand) => (
                  <span key={brand} className="brand-item">
                    {brand}
                  </span>
                ))}
              </span>
            ))}
          </div>
        </div>
      </section>

      <div className="border-y border-white/10 py-4 overflow-hidden bg-[#0a1424]">
        <div className="marquee-track flex gap-8 whitespace-nowrap">
          {[...Array(2)].map((_, i) => (
            <span key={i} className="flex gap-8">
              {MARQUEE_ITEMS.map((t) => (
                <span key={t} className="text-white/22 text-sm uppercase tracking-widest" style={{ fontFamily: "'Space Mono',monospace" }}>
                  {t} <span style={{ color: "#8ab4ff", margin: "0 12px" }}>·</span>
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>

      <section id="services" className="max-w-7xl mx-auto px-6 py-20">
        <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <p className="section-eyebrow">Services</p>
            <h2 className="text-4xl md:text-5xl font-black leading-tight">What We Build</h2>
          </div>
          <p className="text-white/70 text-sm max-w-xs leading-relaxed">
            Every service has a clear role in the studio’s delivery model.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {SERVICES.map(({ icon, title, desc, tag }) => (
            <div key={title} className="card-hover relative bg-[#0b1628] border border-white/10 rounded-xl p-6 space-y-3">
              {tag && <div className="service-tag">{tag}</div>}
              <div className="text-3xl">{icon}</div>
              <h3 className="font-black text-lg text-white">{title}</h3>
              <p className="text-white/68 text-sm leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="work" className="max-w-7xl mx-auto px-6 py-20">
        <div className="mb-12 text-center">
          <p className="section-eyebrow">Work</p>
          <h2 className="text-4xl md:text-5xl font-black leading-tight">Testimonials</h2>
          <p className="text-white/70 mt-3 text-sm max-w-xl mx-auto">
            Real feedback from people who used the studio process and product delivery.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((item) => (
            <div key={item.name} className="card-hover bg-[#0b1628] border border-white/10 rounded-xl p-6">
              <p className="text-white/80 leading-relaxed">“{item.text}”</p>
              <div className="mt-6">
                <p className="font-black text-white">{item.name}</p>
                <p className="text-white/55 text-sm">{item.role}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="processes" className="bg-[#0a1424] border-y border-white/10 py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-16 text-center">
            <p className="section-eyebrow">Processes</p>
            <h2 className="text-4xl md:text-5xl font-black">How We Work</h2>
            <p className="text-white/70 mt-3 text-sm max-w-sm mx-auto">
              A structured flow from discovery to launch.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {PROCESS.map(({ num, title, desc }) => (
              <div key={num} className="card-hover bg-[#0b1628] border border-white/10 rounded-xl p-6 space-y-3">
                <div className="step-num">{num}</div>
                <h3 className="font-black text-lg text-white">{title}</h3>
                <p className="text-white/68 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="pricing" className="max-w-7xl mx-auto px-6 py-20">
        <div className="mb-12 text-center">
          <p className="section-eyebrow">Pricing</p>
          <h2 className="text-4xl md:text-5xl font-black leading-tight">Project Ranges</h2>
          <p className="text-white/70 mt-3 text-sm max-w-xl mx-auto">
            Pricing depends on scope, timeline, and system complexity.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {PRICING.map((item) => (
            <div key={item.title} className="card-hover bg-[#0b1628] border border-white/10 rounded-xl p-6">
              <h3 className="font-black text-xl text-white">{item.title}</h3>
              <p className="text-[#8ab4ff] text-3xl font-black mt-3">{item.price}</p>
              <p className="text-white/68 text-sm leading-relaxed mt-4">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="about" className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <div className="space-y-6">
            <p className="section-eyebrow">About</p>
            <h2 className="text-4xl md:text-5xl font-black leading-tight">Built for product clarity and fast execution</h2>
            <p className="text-white/76 text-lg leading-relaxed">
              CodingoForge is a product-focused software studio for startups and growing businesses.
              We help turn ideas into structured web applications with a strong design and delivery mindset.
            </p>
            <div className="space-y-4">
              {ABOUT_POINTS.map((point) => (
                <div key={point} className="flex gap-3 text-white/76">
                  <span className="mt-2 w-2 h-2 rounded-full bg-[#8ab4ff] flex-shrink-0" />
                  <p>{point}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-[#0b1628] border border-white/10 rounded-2xl p-8">
            <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start">
              <img src={FOUNDER.image} alt={FOUNDER.name} className="founder-photo" />
              <div className="space-y-3 text-center sm:text-left">
                <p className="section-eyebrow">Founder</p>
                <h3 className="text-2xl font-black text-white">{FOUNDER.name}</h3>
                <p className="text-[#8ab4ff] font-semibold">{FOUNDER.role} · {FOUNDER.title}</p>
                <p className="text-white/70 leading-relaxed">{FOUNDER.desc}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="careers" className="max-w-4xl mx-auto px-6 py-20 text-center">
        <div className="bg-[#0b1628] border border-white/10 rounded-2xl p-16">
          <p className="section-eyebrow">Careers</p>
          <h2 className="text-4xl md:text-5xl font-black mb-8">Join Us</h2>
          <div className="text-white/76 text-xl leading-relaxed max-w-2xl mx-auto">
            <p className="font-black text-3xl text-white mb-6">No opportunities available right now</p>
            <p>
              We’re always looking for strong engineers and product-minded builders. Contact us at{" "}
              <a href="mailto:codingoforge@gmail.com" className="text-[#8ab4ff] hover:text-white underline">
                codingoforge@gmail.com
              </a>
            </p>
          </div>
        </div>
      </section>

      <section id="contact" className="max-w-7xl mx-auto px-6 py-24">
        <div className="relative bg-[#0b1628] border border-white/10 rounded-2xl p-12 md:p-16 overflow-hidden text-center">
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: "radial-gradient(ellipse at top, rgba(138,180,255,0.12) 0%, transparent 60%)" }}
          />
          <div className="relative space-y-6">
            <p className="section-eyebrow">Contact</p>
            <h2 className="text-4xl md:text-6xl font-black leading-tight">
              Ready to Build?
              <br />
              <span className="text-white">Start Today</span>
            </h2>
            <p className="text-white/76 text-lg max-w-md mx-auto">
              Free AI-powered assessment. Dashboard access & proposal in 24 hours.
            </p>
            <button onClick={onOpenModal} className="btn-primary">
              Get Started → Free
            </button>
            <p className="text-white/40 text-xs" style={{ fontFamily: "'Space Mono',monospace" }}>
              <a href="mailto:codingoforge@gmail.com" className="hover:text-white">
                codingoforge@gmail.com
              </a>
            </p>
          </div>
        </div>
      </section>

      {modalOpen && <PitchModal onClose={onCloseModal} />}
    </div>
  );
}
