"use client";
import { useRef } from "react";
import ProjectAssistant from "../components/ProjectAssistant";
import { Bot, LayoutGrid, Warehouse, Shield, Wrench, Rocket } from "lucide-react";

const ICON_MAP: Record<string, any> = { Bot, LayoutGrid, Warehouse, Shield, Wrench, Rocket };

const SERVICES = [
  { title: "AI CRM Systems", desc: "Smart customer platforms with automation, insights, and workflow support.", tag: "POPULAR", icon: "Bot" },
  { title: "ERP Solutions", desc: "Operational systems for planning, reporting, and internal efficiency.", tag: null, icon: "LayoutGrid" },
  { title: "Warehouse Management", desc: "Inventory and logistics systems built for clarity and scale.", tag: "FAST TRACK", icon: "Warehouse" },
  { title: "DRM Platforms", desc: "Content and asset protection systems with secure access controls.", tag: null, icon: "Shield" },
  { title: "Internal Tools", desc: "Custom admin, operations, and team productivity dashboards.", tag: null, icon: "Wrench" },
  { title: "MVP Development", desc: "Fast product launches from idea to working prototype.", tag: "MVP", icon: "Rocket" },
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







const BRAND_MARQUEE = [
  { name: "Amazon", icon: "/icons8-amazon-50.png" },
  { name: "Google", icon: "/icons8-google-30.png" },
  { name: "Microsoft", icon: "/icons8-microsoft-50.png" },
  { name: "Stripe", icon: "/icons8-stripe-50.png" },
  { name: "Shopify", icon: "/icons8-shopify-50.png" },
  { name: "Notion", icon: "/icons8-notion-50.png" },
  { name: "Airbnb", icon: "/icons8-airbnb-50.png" },
  { name: "Uber", icon: "/icons8-uber-50.png" },
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
  onOpenModal: () => void;
  onUseBrief: (idea: string) => void;
}

export default function Home({ onOpenModal, onUseBrief }: HomeProps) {
  const heroRef = useRef<HTMLDivElement>(null);

  return (
    <div className="min-h-screen bg-[#060e1a] text-white overflow-x-hidden" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,700&family=Space+Mono:wght@400;700&display=swap');
        * { box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #060e1a; }
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
          transition: transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease, background 0.3s ease;
        }
        .card-hover:hover {
          transform: translateY(-6px);
          border-color: rgba(138,180,255,0.25) !important;
          box-shadow: 0 20px 48px rgba(0,0,0,0.35), 0 0 0 1px rgba(138,180,255,0.12);
        }


        .accent-tag {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(138,180,255,0.12);
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
          border-radius: 100px;
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
          border-radius: 100px;
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

      <section
        ref={heroRef}
        className="relative min-h-screen flex flex-col justify-center pt-16 overflow-hidden"
        style={{
          backgroundImage: "url('/hero_bg.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >

        <div className="relative max-w-4xl mx-auto px-6 py-24 flex flex-col items-center text-center gap-10">
          <div className="space-y-8">
            <div className="flex items-center justify-center gap-3 mb-6">
  
  <div className="px-4 py-1 rounded-full bg-white/10 border border-white/20 text-sm text-white/80">
    AI-Powered
  </div>

  <div className="px-4 py-1 rounded-full bg-green-500/10 border border-green-400/30 text-sm text-green-400">
  <span className="inline-block w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
      Accepting Projects
  </div>

</div>

        <h1 className="text-5xl md:text-7xl font-medium text-center 
            bg-gradient-to-r from-white via-blue-100 to-blue-400 
            bg-clip-text text-transparent leading-[1.1]">

            <span className="block whitespace-nowrap">
              Build Modern Tech Solutions
            </span>
            <span className="block">
              With Clarity.
          </span>


        </h1>

            <p className="fade-up delay-3 text-white/76 text-lg leading-relaxed max-w-xl text-center mx-auto">
              Custom web apps for CRM, ERP, warehouse, IT tools, and rapid MVPs.
            </p>

            
          </div>
        
 <ProjectAssistant onUseBrief={onUseBrief} />
        </div>

      </section>

    

      <section id="services" className="max-w-7xl mx-auto px-6 py-20">
        <div className="mb-12 flex flex-col items-center text-center gap-4">
          <div>
          
           <h2 className="text-5xl md:text-7xl font-medium text-center 
            bg-gradient-to-r from-white via-blue-100 to-blue-400 
            bg-clip-text text-transparent leading-[1.1] mx-auto">
              What We Build
           </h2>
          

          </div>
          
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES.map(({ title, desc, tag, icon }) => {
            const IconComponent = ICON_MAP[icon];
            return (
            <div
              key={title}
              className="card-hover relative overflow-hidden rounded-3xl p-7 border"
              style={{
                background: "linear-gradient(160deg, #0d2040 0%, #070f1d 100%)",
                borderColor: "rgba(255,255,255,0.08)",
                boxShadow: "inset 0 1px 0 rgba(255,255,255,0.05), 0 8px 32px rgba(0,0,0,0.3)",
              }}
            >

            
           <div className="absolute top-0 left-0 right-0 h-px"
            style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)" }} />
           
           <div className="w-14 h-14 rounded-full mb-8 flex items-center justify-center"
            style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}>
              {IconComponent && <IconComponent size={22} className="text-white/50" />}
            </div>
            
            {tag && (
              <div
                  className="absolute top-5 right-5 rounded-full"
                  style={{
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    color: "rgba(255,255,255,0.5)",
                    fontFamily: "'Space Mono', monospace",
                    fontSize: "9px",
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    padding: "4px 12px",
                  }}
                >
                  {tag}
                </div>
            )}

            <h3 className="font-black text-lg text-white mb-2">{title}</h3>
            <p className="text-white/68 text-sm leading-relaxed">{desc}</p>
          </div>
          );
          })}
        </div>
        <div className="flex justify-center mt-14">
          <button onClick={onOpenModal} className="btn-primary">
            BUILD SOLUTION →
          </button>
        </div>
      </section>

      <section id="work" className="max-w-7xl mx-auto px-6 py-20">
        <div className="mb-12 text-center">
          
          <h2 className="text-5xl md:text-7xl font-medium text-center 
            bg-gradient-to-r from-white via-blue-100 to-blue-400 
            bg-clip-text text-transparent leading-[1.1] mx-auto">
              Testimonial
           </h2>
          <p className="text-white/70 mt-3 text-sm max-w-xl mx-auto">
            Real feedback from people who used the studio process and product delivery.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((item) => (
            <div key={item.name} className="card-hover relative overflow-hidden rounded-3xl p-7 border"
            style={{
                background: "linear-gradient(160deg, #0d2040 0%, #070f1d 100%)",
                borderColor: "rgba(255,255,255,0.08)",
                boxShadow: "inset 0 1px 0 rgba(255,255,255,0.05), 0 8px 32px rgba(0,0,0,0.3)",
              }}
              >

              <div className="absolute top-0 left-0 right-0 h-px"
            style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)" }} />
          
          

              <p className="text-white/80 leading-relaxed">“{item.text}”</p>
              <div className="mt-6">
                <p className="font-black text-white">{item.name}</p>
                <p className="text-white/55 text-sm">{item.role}</p>
              </div>
            </div>
          ))}
        </div>
        
      </section>
      <section id="powered-by" className="max-w-7xl mx-auto px-6 py-20">
        <div className="mb-12 text-center">
          <h2 className="text-5xl md:text-7xl font-medium text-center 
            bg-gradient-to-r from-white via-blue-100 to-blue-400 
            bg-clip-text text-transparent leading-[1.1] mx-auto">
              Powered By
          </h2>
          <p className="text-white/70 mt-3 text-sm max-w-xl mx-auto">
            Trusted by industry leaders worldwide
          </p>
        </div>
        <div className="overflow-hidden">
          <div className="brand-marquee flex gap-16 whitespace-nowrap">
            {[...Array(2)].map((_, i) => (
              <span key={i} className="flex gap-16 items-center">
                {BRAND_MARQUEE.map((brand) => (
                  <span key={brand.name} className="inline-flex items-center gap-2.5">
                    <img src={brand.icon} alt={brand.name} className="w-5 h-5 object-contain brightness-0 invert opacity-80" />
                    <span className="brand-item">{brand.name}</span>
                  </span>
                ))}
              </span>
            ))}
          </div>
        </div>
      </section>


      <section id="contact" className="max-w-7xl mx-auto px-6 py-24">
        
        
        <div className="relative bg-[#0b1628] border border-white/10 rounded-2xl p-12 md:p-16 overflow-hidden text-center">
          <div
            className="absolute inset-0 pointer-events-none"
            style={{  background: "linear-gradient(160deg, #0d2040 0%, #070f1d 100%)",
                borderColor: "rgba(255,255,255,0.08)",
                boxShadow: "inset 0 1px 0 rgba(255,255,255,0.05), 0 8px 32px rgba(0,0,0,0.3)", }}
          />
          <div className="absolute top-0 left-0 right-0 h-px"
            style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)" }} />
          <div className="relative space-y-6">
            
            <h2 className="text-5xl md:text-7xl font-medium text-center 
            bg-gradient-to-r from-white via-blue-100 to-blue-400 
            bg-clip-text text-transparent leading-[1.1] mx-auto">
              Ready to Build? 
              <br/>
              Let's Talk.
           </h2>
            <p className="text-white/76 text-lg max-w-md mx-auto">
              AI-powered assessment. Dashboard access & proposal in 24 hours.
            </p>
            <button onClick={onOpenModal} className="btn-primary">
              Get Started → 
            </button>
            
          </div>
        </div>
        
      </section>


    </div>
  );
}
