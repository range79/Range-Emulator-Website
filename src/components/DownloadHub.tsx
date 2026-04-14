import { ScrollReveal } from "./ScrollReveal";
import { DecryptText } from "./DecryptText";
import { useLatestRelease } from "../hooks/useLatestRelease";

export function DownloadHub() {
  const { version, apkUrl, isLoading } = useLatestRelease();

  return (
    <section
      id="download-hub"
      style={{
        padding: "8rem 1.5rem",
        background: "linear-gradient(to bottom, transparent, rgba(103, 80, 164, 0.05))",
        textAlign: "center"
      }}
    >
      <ScrollReveal>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <h2 style={{ fontSize: "clamp(2rem, 6vw, 3.5rem)", fontWeight: 900, marginBottom: "1.5rem", letterSpacing: "-0.03em" }}>
            Ready to <DecryptText delay={1000}>TRANSFORM</DecryptText> your device?
          </h2>
          <p style={{ color: "var(--on-surface-variant)", fontSize: "1.25rem", marginBottom: "4rem" }}>
            Join thousands of developers and enthusiasts pushing the boundaries of mobile computing.
          </p>

          <div style={{ 
            display: "grid", 
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", 
            gap: "2rem",
            justifyContent: "center"
          }}>
            {/* Main App */}
            <div className="glass-card-cockpit" style={{ padding: "40px", border: "1px solid var(--brand)", background: "rgba(103, 80, 164, 0.03)" }}>
              <div style={{ marginBottom: "2rem" }}>
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--brand-bright)" strokeWidth="1.5">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                </svg>
              </div>
              <h3 style={{ fontSize: "1.5rem", fontWeight: 800, marginBottom: "1rem" }}>Range Emulator App</h3>
              <p style={{ fontSize: "0.9rem", color: "var(--on-surface-variant)", marginBottom: "2.5rem" }}>
                The full virtualization engine with Titan optimizations.
              </p>
              <a href={apkUrl} className="btn-cta" style={{ width: "100%", opacity: isLoading ? 0.7 : 1 }}>
                {isLoading ? "FETCHING APK..." : `DOWNLOAD APK ${version}`}
              </a>
            </div>

            {/* Spice Client */}
            <div className="glass-card-cockpit" style={{ padding: "40px" }}>
              <div style={{ marginBottom: "2rem" }}>
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5">
                  <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4M10 17l5-5-5-5M13.8 12H3" />
                </svg>
              </div>
              <h3 style={{ fontSize: "1.5rem", fontWeight: 800, marginBottom: "1rem" }}>Remote Viewer</h3>
              <p style={{ fontSize: "0.9rem", color: "var(--on-surface-variant)", marginBottom: "2.5rem" }}>
                High-performance SPICE client for smooth graphics and audio.
              </p>
              <a href="#spice" className="btn-cta-secondary" style={{ width: "100%", borderColor: "rgba(255,255,255,0.2)" }}>
                GET SPICE CLIENT
              </a>
            </div>
          </div>

          <div style={{ marginTop: "4rem", opacity: 0.5, fontSize: "0.85rem", fontWeight: 700 }}>
            CURRENT STATUS: {isLoading ? "CHECKING GITHUB..." : `${version} STABLE`} — ARM64 REQUIRED
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}
