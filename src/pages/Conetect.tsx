"use client";
import { useState } from "react";
import { Send, Phone, Mail, MapPin, Clock } from "lucide-react";

const NoiseBg = () => (
  <svg className="pointer-events-none fixed inset-0 w-full h-full opacity-[0.03] z-0" xmlns="http://www.w3.org/2000/svg">
    <filter id="noise-con">
      <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
      <feColorMatrix type="saturate" values="0" />
    </filter>
    <rect width="100%" height="100%" filter="url(#noise-con)" />
  </svg>
);

export default function Conetect() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", company: "", message: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-[#060e1a] text-white overflow-x-hidden" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,700;0,9..40,900&family=Space+Mono:wght@400;700&display=swap');
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #060e1a; }
        ::-webkit-scrollbar-thumb { background: #8ab4ff; border-radius: 2px; }

        @keyframes fadeUp { from { opacity:0; transform:translateY(24px); } to { opacity:1; transform:translateY(0); } }
        .fade-up { animation: fadeUp 0.7s ease forwards; }
        .delay-1 { animation-delay: 0.1s; opacity: 0; }
        .delay-2 { animation-delay: 0.25s; opacity: 0; }
        .delay-3 { animation-delay: 0.4s; opacity: 0; }
        .delay-4 { animation-delay: 0.55s; opacity: 0; }

        .form-input {
          width: 100%;
          border-radius: 12px;
          padding: 14px 16px;
          font-size: 14px;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          color: #fff;
          outline: none;
          transition: border-color 0.2s, background 0.2s;
          font-family: 'DM Sans', sans-serif;
        }
        .form-input::placeholder { color: rgba(255,255,255,0.25); }
        .form-input:focus { border-color: rgba(138,180,255,0.4); background: rgba(255,255,255,0.06); }

        .form-label {
          display: block;
          font-size: 10px;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          color: #8ab4ff;
          margin-bottom: 6px;
          font-family: 'Space Mono', monospace;
          font-weight: 700;
        }

        .submit-btn {
          position: relative;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          padding: 16px 40px;
          border-radius: 100px;
          border: none;
          background: linear-gradient(135deg, #8ab4ff 0%, #5b8def 50%, #7c5cff 100%);
          color: #fff;
          font-family: 'DM Sans', sans-serif;
          font-size: 13px;
          font-weight: 900;
          text-transform: uppercase;
          letter-spacing: 0.07em;
          cursor: pointer;
          transition: opacity 0.2s, transform 0.15s;
          box-shadow: 0 0 28px rgba(138,180,255,0.25);
        }
        .submit-btn:hover { opacity: 0.92; transform: translateY(-2px); }

        .info-card {
          display: flex;
          align-items: flex-start;
          gap: 14px;
          padding: 16px 0;
        }
        .info-card + .info-card { border-top: 1px solid rgba(255,255,255,0.06); }

        .info-icon {
          width: 44px;
          height: 44px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          background: rgba(138,180,255,0.08);
          border: 1px solid rgba(138,180,255,0.12);
        }
      `}</style>

      <NoiseBg />

      <section className="relative min-h-screen flex flex-col justify-center pt-16 overflow-hidden"
        style={{
          backgroundImage: "url('/hero_bg.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="relative max-w-6xl mx-auto px-6 py-24 w-full">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="px-4 py-1 rounded-full bg-white/10 border border-white/20 text-sm text-white/80">
                Get In Touch
              </div>
            </div>

            <h1 className="text-5xl md:text-7xl font-medium text-center 
                bg-gradient-to-r from-white via-blue-100 to-blue-400 
                bg-clip-text text-transparent leading-[1.1]">
              Let's Build Something
              <br />
              Great Together
            </h1>

            <p className="fade-up delay-3 text-white/76 text-lg leading-relaxed max-w-2xl text-center mx-auto mt-6">
              Have a project in mind? Reach out and we'll get back to you within 24 hours.
            </p>
          </div>

          <div className="flex gap-16 items-start max-w-5xl mx-auto">
            <div className="flex-1">
              <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
                <div>
                  <label className="form-label">Full Name</label>
                  <input className="form-input" name="name" placeholder="John Doe" value={form.name} onChange={handleChange} />
                </div>
                <div>
                  <label className="form-label">Email Address</label>
                  <input className="form-input" name="email" type="email" placeholder="john@example.com" value={form.email} onChange={handleChange} />
                </div>
                <div>
                  <label className="form-label">Phone Number</label>
                  <input className="form-input" name="phone" placeholder="+1 (555) 123-4567" value={form.phone} onChange={handleChange} />
                </div>
                <div>
                  <label className="form-label">Company</label>
                  <input className="form-input" name="company" placeholder="Your Company Inc." value={form.company} onChange={handleChange} />
                </div>
                <div>
                  <label className="form-label">Message</label>
                  <textarea className="form-input" name="message" rows={5} placeholder="Tell us about your project..." value={form.message} onChange={handleChange} style={{ resize: "vertical" }} />
                </div>
                <button type="submit" className="submit-btn w-full">
                  <Send size={15} strokeWidth={2.5} />
                  Send Message
                </button>
              </form>
            </div>

            <div className="w-80 shrink-0 pt-2">
              <p className="text-xs font-bold text-[#8ab4ff] mb-6 uppercase tracking-widest" style={{ fontFamily: "'Space Mono', monospace" }}>
                Contact Information
              </p>

              <div className="info-card">
                <div className="info-icon">
                  <Mail size={18} className="text-[#8ab4ff]" />
                </div>
                <div>
                  <p className="text-sm font-bold text-white">Email</p>
                  <p className="text-sm text-white/60 mt-0.5">codingo-innovation@outlook.com</p>
                </div>
              </div>

              <div className="info-card">
                <div className="info-icon">
                  <Phone size={18} className="text-[#8ab4ff]" />
                </div>
                <div>
                  <p className="text-sm font-bold text-white">Phone</p>
                  <p className="text-sm text-white/60 mt-0.5">+91 8799765476</p>
                </div>
              </div>

              <div className="info-card">
                <div className="info-icon">
                  <MapPin size={18} className="text-[#8ab4ff]" />
                </div>
                <div>
                  <p className="text-sm font-bold text-white">Location</p>
                  <p className="text-sm text-white/60 mt-0.5">Noida, India</p>
                </div>
              </div>

              <div className="info-card">
                <div className="info-icon">
                  <Clock size={18} className="text-[#8ab4ff]" />
                </div>
                <div>
                  <p className="text-sm font-bold text-white">Response Time</p>
                  <p className="text-sm text-white/60 mt-0.5">Within 48 hours</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
