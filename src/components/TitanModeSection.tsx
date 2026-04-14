import { ScrollReveal } from "./ScrollReveal";
import { InfoChip } from "./InfoChip";
import { StatusBadge } from "./StatusBadge";

export function TitanModeSection() {
  return (
    <section
      id="titan"
      style={{
        position: "relative",
        zIndex: 1,
        padding: "4rem 1.5rem",
        maxWidth: 1120,
        margin: "0 auto",
      }}
    >
      <ScrollReveal>
        <div style={{ marginBottom: "3rem", textAlign: "center" }}>
          <h2 style={{ fontSize: "clamp(2rem, 5vw, 2.75rem)", fontWeight: 800, marginBottom: "0.5rem" }}>
            Performance Profiles
          </h2>
          <p style={{ color: "var(--on-surface-variant)", maxWidth: 640, margin: "0 auto" }}>
            Choose how you want to fuel your engine. Whether you need sustained stability or 
            unrivaled power, Range Emulator adapts to your hardware.
          </p>
        </div>
      </ScrollReveal>

      <div 
        className="grid-mobile-1"
        style={{ 
          display: "grid", 
          gridTemplateColumns: "1fr 1fr", 
          gap: "1.5rem" 
        }}
      >
        {/* Balanced Mode */}
        <ScrollReveal delayMs={100}>
          <div
            className="glass-card-cockpit"
            style={{
              padding: "28px",
              background: "linear-gradient(135deg, rgba(76, 175, 80, 0.05) 0%, rgba(0, 0, 0, 0.6) 100%)",
              border: "1px solid rgba(76, 175, 80, 0.2)",
              height: "100%",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "20px" }}>
              <div style={{
                width: 54,
                height: 54,
                borderRadius: "16px",
                background: "rgba(76, 175, 80, 0.12)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--success)" strokeWidth="2.5">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
              </div>
              <div>
                <StatusBadge type="success">BALANCED MODE</StatusBadge>
                <h3 style={{ fontSize: "1.25rem", fontWeight: 800, marginTop: "4px" }}>Sustained Power</h3>
              </div>
            </div>

            <p style={{ fontSize: "0.9rem", color: "var(--on-surface-variant)", marginBottom: "2rem", lineHeight: 1.6 }}>
              The ideal profile for daily productivity. Focuses on heat management and battery 
              longevity while maintaining professional-grade virtualization stability.
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginTop: "auto" }}>
              {[
                { label: "Thermal Mitigation", val: "ACTIVE" },
                { label: "Stable Interrupts", val: "GIC v2/v3" },
                { label: "Battery Saver", val: "OPTIMIZED" },
              ].map(item => (
                <div key={item.label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingBottom: "8px", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                  <span style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.5)", fontWeight: 600 }}>{item.label}</span>
                  <span style={{ fontSize: "0.75rem", color: "var(--success)", fontWeight: 800, fontFamily: "var(--font-mono)" }}>{item.val}</span>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* Titan Mode */}
        <ScrollReveal delayMs={200}>
          <div
            className="glass-card-cockpit"
            style={{
              padding: "28px",
              background: "linear-gradient(135deg, rgba(239, 68, 68, 0.08) 0%, rgba(0, 0, 0, 0.6) 100%)",
              border: "1px solid rgba(239, 68, 68, 0.2)",
              height: "100%",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "20px" }}>
              <div style={{
                width: 54,
                height: 54,
                borderRadius: "16px",
                background: "rgba(239, 68, 68, 0.12)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--error)" strokeWidth="2.5">
                  <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                </svg>
              </div>
              <div>
                <StatusBadge type="error">TITAN MODE</StatusBadge>
                <h3 style={{ fontSize: "1.25rem", fontWeight: 800, marginTop: "4px" }}>Apex Evolution</h3>
              </div>
            </div>

            <p style={{ fontSize: "0.9rem", color: "var(--on-surface-variant)", marginBottom: "2rem", lineHeight: 1.6 }}>
              Force the hardware. Bypasses non-essential kernel intercepts to push your 
              CPU cores to their absolute limit. Zero bottlenecks, maximum throughput.
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginTop: "auto" }}>
              {[
                { label: "GICv3 Direct", val: "ENABLED" },
                { label: "Unsafe Cache", val: "Bypass I/O" },
                { label: "TCG JIT Buffer", val: "MAX (2X)" },
                { label: "RTC Frequency", val: "TUNED" }
              ].map(item => (
                <div key={item.label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingBottom: "8px", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                  <span style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.5)", fontWeight: 600 }}>{item.label}</span>
                  <span style={{ fontSize: "0.75rem", color: "var(--error)", fontWeight: 800, fontFamily: "var(--font-mono)" }}>{item.val}</span>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>

      <ScrollReveal delayMs={400}>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem", marginTop: "2.5rem", justifyContent: "center" }}>
          <InfoChip label="KVM-PRIORITY" />
          <InfoChip label="VIRTIO-STABLE" />
          <InfoChip label="CORE-PINNING" />
          <InfoChip label="THERMAL-THROTTLE-BYPASS" style={{ color: "var(--error)" }} />
        </div>
      </ScrollReveal>
    </section>
  );
}
