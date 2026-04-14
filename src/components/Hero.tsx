import { BrandLogo } from "./BrandLogo";
import { ScrollReveal } from "./ScrollReveal";
import { DecryptText } from "./DecryptText";
import { useLatestRelease } from "../hooks/useLatestRelease";

interface Props {
  onSupportClick: () => void;
}

export function Hero({ onSupportClick }: Props) {
  const { version, apkUrl, isLoading } = useLatestRelease();
  const appRepoUrl = "https://github.com/range79/Range-Emulator";

  return (
    <section
      id="hero"
      style={{
        padding: "clamp(4rem, 15vw, 8rem) 1.5rem 4rem",
        maxWidth: 1000,
        margin: "0 auto",
        textAlign: "center",
      }}
    >
      <ScrollReveal>
        <div style={{ marginBottom: "2.5rem" }}>
          <BrandLogo size="hero" style={{ margin: "0 auto 1.5rem" }} />
          <DecryptText 
            as="h1"
            style={{
              fontSize: "clamp(2.25rem, 12vw, 4.5rem)",
              fontWeight: 900,
              color: "white",
              marginBottom: "0.25rem",
              letterSpacing: "-0.05em",
              textTransform: "uppercase",
              lineHeight: 1
            }}
          >
            Range Emulator
          </DecryptText>
          <p
            style={{
              fontSize: "clamp(1.1rem, 4vw, 1.4rem)",
              color: "var(--brand-bright)",
              fontWeight: 600,
              opacity: 0.8
            }}
          >
            NATIVE VIRTUALIZATION FOR ANDROID
          </p>
        </div>
      </ScrollReveal>

      <ScrollReveal delayMs={200}>
        <div style={{ 
          display: "flex", 
          flexDirection: "column", 
          gap: "1rem", 
          maxWidth: 400, 
          margin: "0 auto" 
        }}>
          <a
            className="btn-cta"
            href={apkUrl}
            style={{ width: "100%", opacity: isLoading ? 0.7 : 1 }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
            </svg>
            GET RELEASE — {isLoading ? "CHECKING..." : version}
          </a>
          
          <div style={{ display: "flex", gap: "10px" }}>
            <a
              className="btn-cta-secondary"
              href={appRepoUrl}
              target="_blank"
              style={{ flex: 1, fontSize: "0.85rem", height: "48px" }}
            >
              SOURCE CODE
            </a>
            <button
              onClick={onSupportClick}
              className="btn-cta-secondary"
              style={{ flex: 1, fontSize: "0.85rem", height: "48px", borderColor: "rgba(233, 30, 99, 0.3)", color: "#E91E63" }}
            >
              SPONSOR
            </button>
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}
