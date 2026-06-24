"use client";
import { useState } from "react";
import { Bot, LayoutGrid, Warehouse, Shield, Wrench, Rocket, ArrowRight, ChevronDown } from "lucide-react";

const ICON_MAP: Record<string, any> = { Bot, LayoutGrid, Warehouse, Shield, Wrench, Rocket };

const SERVICES = [
  {
    title: "AI CRM Systems",
    desc: "Smart customer platforms with automation, insights, and workflow support.",
    icon: "Bot",
    tag: "POPULAR",
    why: "Manual customer management leaves your team drowning in spreadsheets and scattered inboxes. Leads fall through the cracks and follow-ups are delayed without a clear pipeline view. Your business needs AI-powered automation to track leads, personalize communication, and close deals faster. Implementing an AI CRM eliminates these pain points by automating lead capture and delivering real-time insights.",
    whatItDoes: "AI CRM automates lead capture, scoring, and routing so no opportunity slips through. It centralizes all customer data into a single intelligent dashboard with real-time analytics. Automated workflows trigger personalized emails and task assignments based on customer behavior. The system learns from every interaction, turning reactive firefighting into proactive relationship building.",
    provides: [
      "AI-driven lead scoring and automated routing to the right sales representative",
      "Centralized customer dashboard with 360-degree view of every interaction",
      "Automated email sequences and follow-up reminders triggered by behavior",
      "Sentiment analysis and churn prediction for proactive retention",
      "Real-time analytics and forecasting dashboards for data-driven decisions",
    ],
  },
  {
    title: "ERP Solutions",
    desc: "Operational systems for planning, reporting, and internal efficiency.",
    icon: "LayoutGrid",
    tag: null,
    why: "Disconnected tools and manual processes create data silos that fragment your business operations. Reconciling data across departments becomes a full-time job riddled with errors. Scaling becomes impossible when operations rely on manual handoffs and email chains. Implementing an ERP solution unifies everything into one source of truth, giving leadership accurate real-time reports.",
    whatItDoes: "ERP connects finance, HR, inventory, and operations into one unified platform with real-time data synchronization. Automated workflows replace manual approvals and purchase orders across departments. Business intelligence dashboards give leadership instant visibility into cash flow and bottlenecks. Modular architecture lets you start with what you need and expand as you grow.",
    provides: [
      "Unified platform integrating finance, HR, inventory, procurement, and operations",
      "Automated approval workflows and cross-department process orchestration",
      "Real-time business intelligence dashboards with drill-down analytics",
      "Role-based access control and compliance-ready audit trails",
      "Modular, scalable architecture that grows with your business",
    ],
  },
  {
    title: "Warehouse Management",
    desc: "Inventory and logistics systems built for clarity and scale.",
    icon: "Warehouse",
    tag: "FAST TRACK",
    why: "Inventory inefficiencies create stockouts that frustrate customers and overstocking that ties up capital. Your warehouse team wastes hours searching for misplaced items and fixing shipping errors. Without real-time visibility, you cannot forecast demand or optimize storage. Implementing a WMS brings precision to every operation, from receiving to dispatch.",
    whatItDoes: "WMS provides real-time inventory tracking with barcode and RFID scanning for pinpoint accuracy. Smart algorithms optimize bin placement, picking routes, and replenishment schedules. Automated reorder triggers prevent stockouts when inventory hits threshold levels. The system scales from single-site to multi-warehouse networks with centralized control.",
    provides: [
      "Real-time inventory tracking with barcode and RFID scanning integration",
      "Smart bin placement and optimized picking route algorithms",
      "Automated reorder triggers and purchase order generation",
      "Integrated shipping and courier management with live tracking",
      "Advanced analytics for demand forecasting and cost optimization",
    ],
  },
  {
    title: "DRM Platforms",
    desc: "Content and asset protection systems with secure access controls.",
    icon: "Shield",
    tag: null,
    why: "Unprotected digital assets expose your business to piracy, revenue leakage, and compliance risks. Your premium content can be copied and shared without permission, while regulatory fines loom if data falls into the wrong hands. Without granular access controls, you cannot track who accessed what. Implementing DRM locks down assets with enterprise-grade encryption and policy enforcement.",
    whatItDoes: "DRM encrypts your digital assets and enforces access policies at every touchpoint. License management defines exactly who can access what, for how long, and on which devices. Dynamic watermarking deters unauthorized sharing with trackable identifiers. Usage analytics provide a complete audit trail across web, mobile, and desktop platforms.",
    provides: [
      "Enterprise-grade encryption and policy-based access enforcement",
      "Dynamic watermarking and forensic tracking for piracy deterrence",
      "Granular license management with device and geographic restrictions",
      "Complete usage audit trails and compliance reporting",
      "Multi-platform content delivery with seamless user experience",
    ],
  },
  {
    title: "Internal Tools",
    desc: "Custom admin, operations, and team productivity dashboards.",
    icon: "Wrench",
    tag: null,
    why: "Off-the-shelf software forces your team to adapt to rigid workflows that never quite fit. Critical information gets lost across tools because there is no centralized system. Customizing generic platforms is expensive and requires compromises. Custom internal tools transform your workflows into automated systems built exactly how you work.",
    whatItDoes: "Custom tools automate repetitive tasks and centralize all operations into a single intuitive interface. Workflow engines replace email chains with automated approvals and task assignments. Admin dashboards give leadership real-time visibility into team performance and project status. The platform evolves with your business, adding features as needs change.",
    provides: [
      "Custom admin dashboards with real-time team and project visibility",
      "Automated workflow engines replacing manual approvals and handoffs",
      "Seamless integration with existing tools like Slack, email, and databases",
      "Role-based access controls with granular permission management",
      "Scalable architecture that evolves with your growing business needs",
    ],
  },
  {
    title: "MVP Development",
    desc: "Fast product launches from idea to working prototype.",
    icon: "Rocket",
    tag: "MVP",
    why: "Slow development cycles and feature creep kill innovative ideas before they reach the market. Your team burns through capital building features nobody asked for. Without user validation, you risk launching a solution to a problem that does not exist. A focused MVP approach gets a working prototype in front of real users within weeks, not months.",
    whatItDoes: "MVP development follows a lean methodology prioritizing core features that deliver maximum customer value. Rapid prototyping transforms your vision into a clickable prototype within days. Iterative sprints deliver working software every two weeks with continuous feedback integration. Scalable architecture ensures the MVP grows into a full product without rewrites.",
    provides: [
      "Lean MVP strategy with prioritized feature roadmap based on customer value",
      "Rapid prototyping and user testing within the first two weeks",
      "Two-week iterative sprints with continuous feedback integration",
      "Scalable architecture designed for seamless transition to full product",
      "User behavior analytics and A/B testing frameworks for data-driven iteration",
    ],
  },
];

const NoiseBg = () => (
  <svg className="pointer-events-none fixed inset-0 w-full h-full opacity-[0.03] z-0" xmlns="http://www.w3.org/2000/svg">
    <filter id="noise-solution">
      <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
      <feColorMatrix type="saturate" values="0" />
    </filter>
    <rect width="100%" height="100%" filter="url(#noise-solution)" />
  </svg>
);

type SolutionProps = {
  onOpenModal: () => void;
};

export default function Solution({ onOpenModal }: SolutionProps) {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-[#060e1a] text-white overflow-x-hidden" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,700;0,9..40,900&family=Space+Mono:wght@400;700&display=swap');
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #060e1a; }
        ::-webkit-scrollbar-thumb { background: #8ab4ff; border-radius: 2px; }

        @keyframes fadeUp { from { opacity:0; transform:translateY(24px); } to { opacity:1; transform:translateY(0); } }
        @keyframes glow-pulse { 0%,100% { opacity:0.5; } 50% { opacity:1; } }

        .fade-up { animation: fadeUp 0.7s ease forwards; }
        .delay-1 { animation-delay: 0.1s; opacity: 0; }
        .delay-2 { animation-delay: 0.25s; opacity: 0; }
        .delay-3 { animation-delay: 0.4s; opacity: 0; }
        .delay-4 { animation-delay: 0.55s; opacity: 0; }

        .dropdown-content {
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.4s ease, opacity 0.3s ease;
          opacity: 0;
        }
        .dropdown-content.open {
          max-height: 900px;
          opacity: 1;
        }

        .cta-fill-btn {
          position: relative;
          display: inline-flex;
          align-items: center;
          gap: 14px;
          padding: 18px 44px;
          border: 1px solid rgba(138, 180, 255, 0.3);
          border-radius: 100px;
          background: transparent;
          color: #fff;
          font-family: 'DM Sans', sans-serif;
          font-size: 17px;
          font-weight: 700;
          cursor: pointer;
          overflow: hidden;
          transition: all 0.35s ease;
          text-decoration: none;
          letter-spacing: 0.02em;
        }
        .cta-fill-btn::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(135deg, #8ab4ff 0%, #5b8def 50%, #7c5cff 100%);
          opacity: 0;
          transition: opacity 0.35s ease;
          border-radius: 100px;
        }
        .cta-fill-btn:hover::before {
          opacity: 1;
        }
        .cta-fill-btn:hover {
          border-color: transparent;
          transform: translateY(-3px);
          box-shadow: 0 0 40px rgba(138,180,255,0.3);
        }
        .cta-fill-btn span {
          position: relative;
          z-index: 1;
        }
        .cta-arrow {
          position: relative;
          z-index: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: linear-gradient(135deg, #8ab4ff 0%, #7c5cff 100%);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          flex-shrink: 0;
        }
        .cta-fill-btn:hover .cta-arrow {
          transform: translateX(6px) scale(1.05);
          box-shadow: 0 0 24px rgba(138,180,255,0.4);
        }

        .expand-icon {
          transition: transform 0.3s ease;
        }
        .expand-icon.open {
          transform: rotate(180deg);
        }
      `}</style>

      <NoiseBg />

      <section className="relative min-h-[80vh] flex flex-col justify-center pt-16 overflow-hidden"
        style={{
          backgroundImage: "url('/hero_bg.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="relative max-w-5xl mx-auto px-6 py-24 flex flex-col items-center text-center gap-10">
          <div className="space-y-8">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="px-4 py-1 rounded-full bg-white/10 border border-white/20 text-sm text-white/80">
                Our Solutions
              </div>
            </div>

            <h1 className="text-5xl md:text-7xl font-medium text-center 
                bg-gradient-to-r from-white via-blue-100 to-blue-400 
                bg-clip-text text-transparent leading-[1.1]">
              <span className="block">
                Find the Right Solution
              </span>
              <span className="block">
                For Your Business
              </span>
            </h1>

            <p className="fade-up delay-3 text-white/76 text-lg leading-relaxed max-w-2xl text-center mx-auto">
              Every business is unique. Explore our services and discover exactly what you need to build, scale, and secure your operations.
            </p>
          </div>

          <div className="fade-up delay-4 flex flex-col sm:flex-row items-center gap-4">
            <button className="cta-fill-btn" onClick={onOpenModal}>
              <span>Find What You Need</span>
              <span className="cta-arrow">
                <ArrowRight size={18} strokeWidth={2.5} />
              </span>
            </button>
          </div>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-6 py-20">
        <div className="flex flex-col gap-8">
          {SERVICES.map(({ title, desc, icon, tag, why, whatItDoes, provides }) => {
            const IconComponent = ICON_MAP[icon];
            const isExpanded = expanded === title;

            return (
              <div
                key={title}
                style={{ cursor: "pointer" }}
                onMouseEnter={() => setExpanded(title)}
                onMouseLeave={() => setExpanded(null)}
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 mt-1"
                    style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}>
                    {IconComponent && <IconComponent size={18} className="text-white/50" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3">
                      <h3 className="font-black text-xl text-white">{title}</h3>
                      {tag && (
                        <span style={{
                          background: "rgba(138,180,255,0.1)",
                          border: "1px solid rgba(138,180,255,0.2)",
                          color: "#dbeafe",
                          fontFamily: "'Space Mono', monospace",
                          fontSize: "9px",
                          letterSpacing: "0.12em",
                          textTransform: "uppercase",
                          padding: "3px 8px",
                          borderRadius: "100px",
                        }}>{tag}</span>
                      )}
                      <ChevronDown size={16} className={`expand-icon ${isExpanded ? "open" : ""}`} style={{ color: "rgba(255,255,255,0.3)", marginLeft: "auto", flexShrink: 0 }} />
                    </div>
                    <div style={{ height: "16px" }} />
                    <p className="text-white/68 text-base leading-relaxed">{desc}</p>

                    <div className={`dropdown-content ${isExpanded ? "open" : ""}`}>
                      <div style={{ height: "24px" }} />

                      <div className="flex gap-8">
                        <div style={{ width: "50%" }}>
                          <p className="text-xs font-bold text-[#8ab4ff] mb-3 uppercase tracking-widest" style={{ fontFamily: "'Space Mono', monospace" }}>
                            Why Your Business Needs It
                          </p>
                          <p className="text-white/75 text-base leading-[1.8] text-left">{why}</p>
                        </div>
                        <div style={{ width: "50%" }}>
                          <p className="text-xs font-bold text-[#8ab4ff] mb-3 uppercase tracking-widest" style={{ fontFamily: "'Space Mono', monospace" }}>
                            What It Will Do
                          </p>
                          <p className="text-white/75 text-base leading-[1.8] text-left">{whatItDoes}</p>
                        </div>
                      </div>

                      <div style={{ height: "24px" }} />

                      <div>
                        <p className="text-xs font-bold text-[#8ab4ff] mb-3 uppercase tracking-widest" style={{ fontFamily: "'Space Mono', monospace" }}>
                          What We Can Provide
                        </p>
                        <div className="flex flex-col gap-2.5">
                          {provides.map((item: string, i: number) => (
                            <div key={i} className="flex items-start gap-3">
                              <span className="w-1.5 h-1.5 rounded-full shrink-0 mt-[7px]" style={{
                                background: "#8ab4ff",
                                boxShadow: "0 0 8px rgba(138,180,255,0.6), 0 0 16px rgba(138,180,255,0.3)",
                              }} />
                              <span className="text-white/75 text-sm leading-relaxed">{item}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
