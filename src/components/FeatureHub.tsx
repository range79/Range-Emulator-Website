import { ScrollReveal } from "./ScrollReveal";
import { useLatestRelease } from "../hooks/useLatestRelease";

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  status: string;
  statusType: "success" | "warning" | "error" | "info";
  description: string;
}

function NativeFeatureCard({ icon, title, subtitle, status, statusType, description }: FeatureCardProps) {
  const statusColor = `var(--${statusType})`;
  
  return (
    <div 
      className="glass-card-cockpit"
      style={{
        padding: "24px",
        display: "flex",
        flexDirection: "column",
        gap: "16px",
        border: "1px solid rgba(255, 255, 255, 0.08)",
        background: "linear-gradient(165deg, rgba(28, 27, 31, 1) 0%, rgba(18, 18, 18, 0.95) 100%)",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
        <div style={{
          width: 48,
          height: 48,
          borderRadius: "14px",
          background: "rgba(255, 255, 255, 0.03)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          border: "1px solid rgba(255, 255, 255, 0.05)"
        }}>
          {icon}
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <h4 style={{ fontSize: "1rem", fontWeight: 800, color: "white", margin: 0 }}>{title}</h4>
            <div style={{
              padding: "4px 8px",
              borderRadius: "8px",
              background: `rgba(var(--${statusType}-rgb, 0,0,0), 0.1)`, 
              border: `1px solid ${statusColor}44`,
              color: statusColor,
              fontSize: "9px",
              fontWeight: 900,
              textTransform: "uppercase"
            }}>
              {status}
            </div>
          </div>
          <p style={{ fontSize: "0.75rem", color: "var(--on-surface-variant)", margin: "2px 0 0" }}>{subtitle}</p>
        </div>
      </div>
      
      <p style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.6)", lineHeight: 1.5, margin: 0 }}>
        {description}
      </p>
    </div>
  );
}

export function FeatureHub() {
  const { version, isLoading } = useLatestRelease();

  return (
    <section style={{ padding: "4rem 1.5rem", maxWidth: 1000, margin: "0 auto" }}>
      <ScrollReveal>
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <h3 style={{ fontSize: "1.5rem", fontWeight: 800, marginBottom: "1rem" }}>Range Emulator App</h3>
          <p style={{ fontSize: "0.9rem", color: "var(--on-surface-variant)", marginBottom: "2.5rem" }}>
            The full virtualization engine with Titan optimizations.
          </p>
        </div>
      </ScrollReveal>

      <div style={{ 
        display: "grid", 
        gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", 
        gap: "1.5rem" 
      }}>
        <ScrollReveal delayMs={100}>
          <NativeFeatureCard 
            icon={<span style={{fontSize: "24px"}}>⚡</span>}
            title="Titan Engine"
            subtitle={`${isLoading ? "v1.0.4" : version}-Performance`}
            status="Titan Active"
            statusType="error"
            description="Bypasses standard scheduler constraints to deliver bare-metal performance for heavy virtualization workloads."
          />
        </ScrollReveal>

        <ScrollReveal delayMs={200}>
          <NativeFeatureCard 
            icon={<span style={{fontSize: "24px"}}>🛡️</span>}
            title="KVM Hardware"
            subtitle="Hardware Acceleration"
            status="Secure"
            statusType="success"
            description="Direct CPU feature passthrough using Android's native KVM implementation for near-native instruction speed."
          />
        </ScrollReveal>

        <ScrollReveal delayMs={300}>
          <NativeFeatureCard 
            icon={<span style={{fontSize: "24px"}}>🌐</span>}
            title="Spice Protocol"
            subtitle="Remote Graphics"
            status="High-Res"
            statusType="info"
            description="Crystal-clear graphics and ultra-low latency audio streaming using the high-performance SPICE backend."
          />
        </ScrollReveal>

        <ScrollReveal delayMs={400}>
          <NativeFeatureCard 
            icon={<span style={{fontSize: "24px"}}>📦</span>}
            title="Snapshot System"
            subtitle="State Management"
            status="Optimized"
            statusType="warning"
            description="Save and resume your virtual machines instantly. Advanced memory compression ensures fast disk I/O operations."
          />
        </ScrollReveal>
      </div>
    </section>
  );
}
