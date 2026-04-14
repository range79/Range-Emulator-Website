import { useState } from "react";
import { ScrollReveal } from "./ScrollReveal";

interface OSProps {
  title: string;
  icon: React.ReactNode;
  description: string;
  action: React.ReactNode;
}

function OSCard({ title, icon, description, action }: OSProps) {
  return (
    <div 
      className="glass-card-cockpit"
      style={{
        padding: "24px",
        display: "flex",
        flexDirection: "column",
        gap: "16px",
        height: "100%",
        minHeight: "360px" // Ensure consistency
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        <div style={{
          width: 40,
          height: 40,
          borderRadius: "12px",
          background: "rgba(255, 255, 255, 0.03)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          border: "1px solid rgba(255, 255, 255, 0.05)",
          color: "white" // Force SVG visibility
        }}>
          {icon}
        </div>
        <h4 style={{ fontSize: "1.1rem", fontWeight: 800, color: "white", margin: 0 }}>{title}</h4>
      </div>
      
      <p style={{ fontSize: "0.85rem", color: "var(--on-surface-variant)", lineHeight: 1.5, margin: 0 }}>
        {description}
      </p>

      <div style={{ marginTop: "auto" }}>
        {action}
      </div>
    </div>
  );
}

export function SpiceSection() {
  const [activeDistro, setActiveDistro] = useState<"debian" | "ubuntu" | "fedora" | "arch" | "flatpak">("ubuntu");

  const distros = {
    debian: { label: "DEBIAN", color: "#D70A53", cmd: "sudo apt install virt-viewer" },
    ubuntu: { label: "UBUNTU", color: "#E95420", cmd: "sudo apt install virt-viewer" },
    fedora: { label: "FEDORA", color: "#51A2DA", cmd: "sudo dnf install virt-viewer" },
    arch: { label: "ARCH", color: "#1793D1", cmd: "sudo pacman -S virt-viewer" },
    flatpak: { label: "FLATPAK", color: "#4BB3FD", cmd: "flatpak install flathub org.virt_manager.virt-viewer" },
  };

  return (
    <section id="spice" style={{ padding: "4rem 1.5rem", maxWidth: 1000, margin: "0 auto" }}>
      <ScrollReveal>
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <h2 style={{ fontSize: "2rem", fontWeight: 900, marginBottom: "0.5rem" }}>Remote Cockpit</h2>
          <p style={{ color: "var(--on-surface-variant)" }}>Connect to your virtual machine from any desktop OS using the SPICE protocol.</p>
        </div>
      </ScrollReveal>

      <div style={{ 
        display: "grid", 
        gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", 
        gap: "1.5rem" 
      }}>
        {/* Windows */}
        <ScrollReveal delayMs={100}>
          <OSCard 
            title="Windows"
            icon={<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M3,12V6.75L9,5.43V12H3M21,12V3L10,5.04V12H21M3,13V18.25L9,19.57V13H3M21,13V21L10,19.96V13H21Z"/></svg>}
            description="High-performance Virt-Viewer MSI for x64 architectures. Features full-screen support and USB redirection."
            action={
              <a 
                href="https://gitlab.com/virt-viewer/virt-viewer/-/releases/v11.0/downloads/virt-viewer-x64-11.0-1.0.msi" 
                className="btn-cta"
                style={{ width: "100%", fontSize: "0.8rem" }}
              >
                DOWNLOAD MSI (X64)
              </a>
            }
          />
        </ScrollReveal>

        {/* Linux with Tabs */}
        <ScrollReveal delayMs={200}>
          <OSCard 
            title="Linux"
            icon={<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4M12,6A6,6 0 0,0 6,12A6,6 0 0,0 12,18A6,6 0 0,0 18,12A6,6 0 0,0 12,6M12,8A4,4 0 0,1 16,12A4,4 0 0,1 12,16A4,4 0 0,1 8,12A4,4 0 0,1 12,8Z"/></svg>}
            description="Natively supported on all major distributions. Select your distribution to see the command."
            action={
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                  {(Object.keys(distros) as Array<keyof typeof distros>).map((key) => (
                    <button
                      key={key}
                      onClick={() => setActiveDistro(key)}
                      style={{
                        padding: "6px 10px",
                        fontSize: "0.65rem",
                        fontWeight: 800,
                        borderRadius: "8px",
                        border: "1px solid",
                        borderColor: activeDistro === key ? distros[key].color : "rgba(255,255,255,0.1)",
                        background: activeDistro === key ? `${distros[key].color}15` : "transparent",
                        color: activeDistro === key ? distros[key].color : "rgba(255,255,255,0.4)",
                        cursor: "pointer",
                        transition: "all 0.2s ease"
                      }}
                    >
                      {distros[key].label}
                    </button>
                  ))}
                </div>
                
                <div style={{ 
                  background: "rgba(0,0,0,0.3)", 
                  borderRadius: "12px", 
                  border: `1px solid ${distros[activeDistro].color}33`, 
                  overflow: "hidden",
                  minHeight: "80px",
                  display: "flex",
                  flexDirection: "column"
                }}>
                  <div style={{ 
                    padding: "8px 12px", 
                    background: `${distros[activeDistro].color}11`, 
                    fontSize: "0.6rem", 
                    fontWeight: 900, 
                    color: distros[activeDistro].color,
                    letterSpacing: "0.05em"
                  }}>
                    {distros[activeDistro].label} INSTALL
                  </div>
                  <code style={{ 
                    padding: "12px", 
                    fontSize: "0.75rem", 
                    color: "white", 
                    fontFamily: "var(--font-mono)",
                    wordBreak: "break-all"
                  }}>
                    {distros[activeDistro].cmd}
                  </code>
                </div>
              </div>
            }
          />
        </ScrollReveal>

        {/* macOS */}
        <ScrollReveal delayMs={300}>
          <OSCard 
            title="macOS"
            icon={<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M18.71,19.5C17.88,20.74 17,21.95 15.66,21.97C14.32,22 13.89,21.18 12.37,21.18C10.84,21.18 10.37,21.95 9.1,22C7.79,22.05 6.8,20.68 5.96,19.47C4.25,17 2.94,12.45 4.7,9.39C5.57,7.87 7.13,6.91 8.82,6.88C10.1,6.86 11.32,7.75 12.11,7.75C12.89,7.75 14.37,6.68 15.92,6.84C16.57,6.87 18.39,7.1 19.56,8.82C19.47,8.88 17.39,10.1 17.41,12.63C17.44,15.65 20.06,16.66 20.09,16.67C20.06,16.74 19.67,18.11 18.71,19.5M13,3.5C13.73,2.67 14.94,2.04 15.94,2C16.07,3.17 15.6,4.35 14.9,5.19C14.21,6.04 13.07,6.7 11.95,6.61C11.8,5.46 12.36,4.26 13,3.5Z"/></svg>}
            description="Use Homebrew to install the latest Virt-Viewer build. Supports Retina displays and Metal acceleration."
            action={
              <div style={{ background: "rgba(0,0,0,0.3)", borderRadius: "12px", border: "1px solid rgba(103, 80, 164, 0.2)", overflow: "hidden" }}>
                  <div style={{ padding: "8px 12px", background: "rgba(103, 80, 164, 0.1)", fontSize: "0.6rem", fontWeight: 900, color: "var(--brand-bright)" }}>HOMEBREW</div>
                  <code style={{ display: "block", padding: "12px", fontSize: "0.75rem", color: "white", fontFamily: "var(--font-mono)" }}>
                    brew install virt-viewer
                  </code>
              </div>
            }
          />
        </ScrollReveal>
      </div>
    </section>
  );
}
