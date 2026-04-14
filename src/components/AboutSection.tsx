import { ScrollReveal } from "./ScrollReveal";

export function AboutSection() {
  return (
    <section id="about" style={{ padding: "6rem 1.5rem", maxWidth: 1100, margin: "0 auto" }}>
      <ScrollReveal>
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <h2 style={{
              fontSize: "clamp(1.75rem, 8vw, 3rem)",
              fontWeight: 900,
              marginBottom: "1rem",
              letterSpacing: "-0.04em",
              lineHeight: 1.1
            }}
          >
            The Power of Desktop, <span style={{ color: "var(--brand-bright)" }}>in Your Pocket.</span>
          </h2>
          <p style={{ color: "var(--on-surface-variant)", fontSize: "clamp(0.95rem, 4vw, 1.15rem)", maxWidth: 700, margin: "0 auto", lineHeight: 1.6 }}>
            Range Emulator is a professional virtualization platform designed to run full PC operating systems 
            natively on your Android device. 
          </p>
        </div>
      </ScrollReveal>

      <div style={{ 
        display: "grid", 
        gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", 
        gap: "1.5rem" 
      }}>
        {/* Card 1: Performance Bridge */}
        <ScrollReveal delayMs={100}>
          <div className="glass-card-cockpit" style={{ padding: "0", height: "100%", border: "1px solid rgba(103, 80, 164, 0.2)", display: "flex", flexDirection: "column" }}>
            <div style={{ padding: "32px 32px 0" }}>
              <img 
                src="/assets/about-bridge.png" 
                alt="Performance Bridge" 
                style={{ width: "100%", borderRadius: "16px", marginBottom: "24px", border: "1px solid rgba(255,255,255,0.05)" }}
              />
              <h3 style={{ fontSize: "1.25rem", fontWeight: 800, marginBottom: "1rem", color: "white" }}>Performance Bridge</h3>
              <p style={{ fontSize: "0.95rem", color: "var(--on-surface-variant)", lineHeight: 1.6, marginBottom: "32px" }}>
                If your phone is not as powerful as your current PC, don't worry. Our proprietary <b>Titan Engine</b> bridges 
                the performance gap using extreme binary translation optimizations, allowing you to run desktop software 
                smoothly even on mid-range hardware.
              </p>
            </div>
          </div>
        </ScrollReveal>

        {/* Card 2: Full Virtualization */}
        <ScrollReveal delayMs={200}>
          <div className="glass-card-cockpit" style={{ padding: "0", height: "100%", border: "1px solid rgba(103, 80, 164, 0.2)", display: "flex", flexDirection: "column" }}>
            <div style={{ padding: "32px 32px 0" }}>
              <img 
                src="/assets/about-os.png" 
                alt="OS Ecosystem" 
                style={{ width: "100%", borderRadius: "16px", marginBottom: "24px", border: "1px solid rgba(255,255,255,0.05)" }}
              />
              <h3 style={{ fontSize: "1.25rem", fontWeight: 800, marginBottom: "1rem", color: "white" }}>Any OS, Anywhere</h3>
              <p style={{ fontSize: "0.95rem", color: "var(--on-surface-variant)", lineHeight: 1.6, marginBottom: "32px" }}>
                Run full Linux distributions like Ubuntu, Debian, or Kali, and even x86-based Windows environments. 
                Range Emulator provides a true desktop environment with full root access, package management, and system-level control.
              </p>
            </div>
          </div>
        </ScrollReveal>

        {/* Card 3: Mobile Workstation */}
        <ScrollReveal delayMs={300}>
          <div className="glass-card-cockpit" style={{ padding: "0", height: "100%", border: "1px solid rgba(103, 80, 164, 0.2)", display: "flex", flexDirection: "column" }}>
            <div style={{ padding: "32px 32px 0" }}>
              <img 
                src="/assets/about-workstation.png" 
                alt="Mobile Workstation" 
                style={{ width: "100%", borderRadius: "16px", marginBottom: "24px", border: "1px solid rgba(255,255,255,0.05)" }}
              />
              <h3 style={{ fontSize: "1.25rem", fontWeight: 800, marginBottom: "1rem", color: "white" }}>Unlock Flagship Power</h3>
              <p style={{ fontSize: "0.95rem", color: "var(--on-surface-variant)", lineHeight: 1.6, marginBottom: "32px" }}>
                If you own a modern flagship device, Range Emulator unlocks its true potential. Turn your Snapdragon or Dimensity 
                beast into a mobile coding station, a secure penetration testing lab, or a portable office that rivals modern ultra-books.
              </p>
            </div>
          </div>
        </ScrollReveal>
      </div>

      {/* Bonus Use-Case Badge */}
      <ScrollReveal delayMs={400}>
        <div style={{ marginTop: "4rem", display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "12px" }}>
           {["DEVELOPMENT", "SECURITY", "PRIVACY", "EMULATION", "OFFICE"].map(tag => (
             <span key={tag} className="status-badge status-badge--primary" style={{ fontSize: "0.65rem", padding: "8px 16px" }}>
                {tag}
             </span>
           ))}
        </div>
      </ScrollReveal>
    </section>
  );
}
