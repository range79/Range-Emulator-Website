import { useState, useEffect } from "react";
import { ScrollReveal } from "./ScrollReveal";

interface MetricProps {
  label: string;
  value: string;
  progress: number;
  color: string;
}

function ResourceMetric({ label, value, progress, color }: MetricProps) {
  return (
    <div style={{ marginBottom: "16px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px", alignItems: "baseline" }}>
        <span style={{ fontSize: "0.7rem", fontWeight: 800, color: "var(--on-surface)" }}>{label}</span>
        <span style={{ fontSize: "0.7rem", fontWeight: 700, color }}>{value}</span>
      </div>
      <div style={{ height: "6px", background: "rgba(255,255,255,0.05)", borderRadius: "3px", overflow: "hidden" }}>
        <div 
          style={{ 
            height: "100%", 
            width: `${progress * 100}%`, 
            background: color, 
            transition: "width 1s cubic-bezier(0.4, 0, 0.2, 1)" 
          }} 
        />
      </div>
    </div>
  );
}

function ThermalGauge({ label, value, progress, color, icon }: MetricProps & { icon: React.ReactNode }) {
  return (
    <div style={{ 
      flex: 1, 
      padding: "16px", 
      background: "rgba(255,255,255,0.02)", 
      border: "1px solid rgba(255,255,255,0.05)", 
      borderRadius: "20px" 
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px" }}>
        {icon}
        <span style={{ fontSize: "0.65rem", fontWeight: 700, color: "var(--on-surface-variant)" }}>{label}</span>
      </div>
      <div style={{ fontSize: "1.1rem", fontWeight: 800, color, marginBottom: "8px" }}>{value}</div>
      <div style={{ height: "4px", background: "rgba(255,255,255,0.05)", borderRadius: "2px", overflow: "hidden" }}>
        <div 
          style={{ 
            height: "100%", 
            width: `${progress * 100}%`, 
            background: color, 
            transition: "width 1s ease" 
          }} 
        />
      </div>
    </div>
  );
}

export function CoreCockpit() {
  const [isTitan, setIsTitan] = useState(false);
  const [metrics, setMetrics] = useState({ cpu: 42, ram: { used: 8.1, total: 16 }, cpuTemp: 48, batTemp: 34 });

  // Simulate pulse metrics for "Alive" feel
  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(prev => ({
        ...prev,
        cpu: Math.min(100, Math.max(0, prev.cpu + (Math.random() - 0.5) * 5)),
        cpuTemp: Math.min(90, Math.max(30, prev.cpuTemp + (Math.random() - 0.5) * 2))
      }));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const thermalStatus = metrics.cpuTemp > 75 ? "Throttling" : metrics.cpuTemp > 45 ? "Warm" : "Cool";
  const thermalColor = metrics.cpuTemp > 75 ? "var(--error)" : metrics.cpuTemp > 45 ? "var(--warning)" : "var(--success)";

  return (
    <section style={{ padding: "4rem 1.5rem", maxWidth: 600, margin: "0 auto" }}>
      <ScrollReveal>
        <div 
          className="glass-card-cockpit"
          style={{
            background: `linear-gradient(180deg, rgba(28, 27, 31, 0.9) 0%, rgba(18, 18, 18, 0.7) 100%)`,
            border: "1px solid rgba(255, 255, 255, 0.1)",
            padding: "24px"
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "24px" }}>
            <div>
              <h3 style={{ fontSize: "1.25rem", fontWeight: 900, color: "var(--on-surface)", margin: 0 }}>CORE Cockpit</h3>
              <div 
                style={{ display: "flex", alignItems: "center", gap: "8px", marginTop: "8px" }}
              >
                {/* M3 Toggle Switch */}
                <div 
                  onClick={() => setIsTitan(!isTitan)}
                  style={{
                    width: "42px",
                    height: "24px",
                    background: isTitan ? "rgba(255, 0, 0, 0.2)" : "rgba(76, 175, 80, 0.2)",
                    borderRadius: "12px",
                    position: "relative",
                    cursor: "pointer",
                    border: `1px solid ${isTitan ? "rgba(255, 0, 0, 0.3)" : "rgba(76, 175, 80, 0.3)"}`,
                    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
                  }}
                >
                  <div style={{
                    position: "absolute",
                    top: "2px",
                    left: isTitan ? "20px" : "2px",
                    width: "18px",
                    height: "18px",
                    background: isTitan ? "var(--error)" : "var(--success)",
                    borderRadius: "50%",
                    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                    boxShadow: "0 2px 4px rgba(0,0,0,0.3)"
                  }} />
                </div>
                
                <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <span style={{ fontSize: "0.75rem", fontWeight: 800, color: isTitan ? "var(--error)" : "var(--success)" }}>
                    {isTitan ? "Titan: Extreme Power" : "Balanced Power"}
                  </span>
                  {isTitan && <span style={{ color: "var(--error)", fontSize: "12px" }}>🔥</span>}
                </div>
              </div>
            </div>
            
            <button style={{ 
              background: "rgba(255,255,255,0.05)", 
              border: "none", 
              borderRadius: "12px", 
              padding: "6px 12px", 
              color: "var(--brand-bright)",
              fontSize: "0.7rem",
              fontWeight: 700,
              cursor: "pointer"
            }}>
              MONITOR
            </button>
          </div>

          <div style={{ display: "flex", gap: "12px", marginBottom: "24px" }}>
            <ThermalGauge 
              label="CPU" 
              value={`${Math.round(metrics.cpuTemp)}°C`} 
              progress={metrics.cpuTemp / 100} 
              color={metrics.cpuTemp > 70 ? "var(--error)" : "var(--info)"}
              icon={<span style={{ fontSize: "14px" }}>🌡️</span>}
            />
            <ThermalGauge 
              label="Battery" 
              value={`${metrics.batTemp}°C`} 
              progress={metrics.batTemp / 100} 
              color="var(--success)"
              icon={<span style={{ fontSize: "14px" }}>🔋</span>}
            />
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
            <ResourceMetric 
              label="Host CPU" 
              value={`${Math.round(metrics.cpu)}%`} 
              progress={metrics.cpu / 100} 
              color={metrics.cpu > 85 ? "var(--error)" : "var(--brand-bright)"}
            />
            <ResourceMetric 
              label="Host RAM" 
              value={`${metrics.ram.used}G / ${metrics.ram.total}G`} 
              progress={metrics.ram.used / metrics.ram.total} 
              color="var(--cyan)"
            />
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", marginTop: "12px", padding: "8px 0", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
            <span style={{ fontSize: "0.7rem", fontWeight: 800, color: "var(--on-surface)" }}>Thermal State</span>
            <span style={{ fontSize: "0.7rem", fontWeight: 900, color: thermalColor }}>{thermalStatus.toUpperCase()}</span>
          </div>

          <div style={{ display: "flex", gap: "8px", marginTop: "20px" }}>
            <div style={{ padding: "4px 8px", background: "rgba(76,175,80,0.12)", border: "1px solid rgba(76,175,80,0.25)", color: "var(--success)", borderRadius: "10px", fontSize: "9px", fontWeight: 900 }}>KVM:ENABLED</div>
            <div style={{ padding: "4px 8px", background: "rgba(33,150,243,0.12)", border: "1px solid rgba(33,150,243,0.25)", color: "var(--info)", borderRadius: "10px", fontSize: "9px", fontWeight: 900 }}>GPU:OK</div>
            <div style={{ padding: "4px 8px", background: isTitan ? "rgba(76,175,80,0.12)" : "rgba(255,87,34,0.12)", border: `1px solid ${isTitan ? "rgba(76,175,80,0.25)" : "rgba(255,87,34,0.25)"}`, color: isTitan ? "var(--success)" : "#FF5722", borderRadius: "10px", fontSize: "9px", fontWeight: 900 }}>{isTitan ? "BOOST:ON" : "POW:LIMIT"}</div>
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}
