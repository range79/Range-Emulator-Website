import { BrandLogo } from "./BrandLogo";

interface Props {
  onSupportClick: () => void;
}

export function Navbar({ onSupportClick }: Props) {
  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        backdropFilter: "blur(20px) saturate(170%)",
        WebkitBackdropFilter: "blur(20px) saturate(170%)",
        background: "var(--nav-bg)",
        borderBottom: "1px solid rgba(103, 80, 164, 0.15)",
      }}
    >
      <div
        style={{
          maxWidth: 1120,
          margin: "0 auto",
          padding: "0.75rem 1.25rem",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "1rem",
          flexWrap: "wrap",
        }}
      >
        <a
          href="/"
          style={{
            fontSize: "1.05rem",
            letterSpacing: "-0.02em",
            color: "var(--text)",
            textDecoration: "none",
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            fontWeight: 800,
            flexShrink: 0
          }}
        >
          <BrandLogo
            size="sm"
            style={{ filter: "drop-shadow(0 0 10px rgba(103, 80, 164, 0.45))" }}
          />
          <span style={{ display: "inline-block" }}>Range Emulator</span>
        </a>
        <div 
          style={{ 
            display: "flex", 
            gap: "clamp(0.5rem, 2vw, 1rem)", 
            alignItems: "center", 
            justifyContent: "flex-end",
            padding: "4px 0",
            flex: 1,
            minWidth: "280px" // Threshold for mobile wrapping
          }}
        >
          {[
            ["Download", "#download"],
            ["Telemetry", "#performance"],
            ["Management", "#vms"],
          ].map(([label, href]) => (
            <a
              key={label}
              href={href}
              style={{
                fontSize: "0.75rem",
                fontWeight: 700,
                color: "var(--on-surface-variant)",
                textDecoration: "none",
                transition: "color 0.2s",
                whiteSpace: "nowrap",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--brand-bright)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--on-surface-variant)")}
            >
              {label}
            </a>
          ))}
          <div style={{ display: "flex", alignItems: "center", gap: "6px", marginLeft: "4px", flexShrink: 0 }}>
             <span
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: "var(--success)",
                boxShadow: "0 0 8px var(--success-glow)",
              }}
            />
            <span style={{ fontSize: "0.6rem", fontWeight: 900, color: "var(--success)", letterSpacing: "0.05em" }}>READY</span>
          </div>
          <a
            href="https://github.com/range79/Range-Emulator"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "flex",
              alignItems: "center",
              marginLeft: "4px",
              color: "var(--on-surface-variant)",
              transition: "color 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "white")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "var(--on-surface-variant)")}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
          </a>
          <button
            onClick={(e) => {
              e.preventDefault();
              onSupportClick();
            }}
            style={{
              display: "flex",
              alignItems: "center",
              marginLeft: "4px",
              color: "#E91E63",
              background: "none",
              border: "none",
              padding: 0,
              cursor: "pointer",
              transition: "transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.2)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
            title="Support Development"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}
