import { useState, useRef, useEffect } from "react";
import { ScrollReveal } from "./ScrollReveal";

// --- Types & Constants ---
type OsType = "LINUX" | "WINDOWS" | "ANDROID" | "OTHER";
type ArchType = "AARCH64" | "X86_64";
type ScreenType = "VNC" | "SPICE";

const CPU_MODELS = {
  AARCH64: [
    { id: "HOST", name: "HOST", score: 100, desc: "Native Hardware Access: Direct silicon speed. | Performance: Up to 100% (KVM)" },
    { id: "MAX", name: "MAX", score: 60, desc: "Peak Software Speed: Fastest non-KVM mode. | Performance: Up to ~60% with Titan Mode" },
    { id: "NEOVERSE_N1", name: "NEOVERSE-N1", score: 45, desc: "Cloud-Class ARM: Optimized for server loads. | Performance: Up to ~45% with Titan Mode" },
    { id: "CORTEX_A76", name: "CORTEX-A76", score: 40, desc: "Modern ARM64: Optimized for AArch64 distros. | Performance: Up to ~40% with Titan Mode" },
    { id: "CORTEX_A72", name: "CORTEX-A72", score: 30, desc: "Standard ARM64: Balanced stability and speed. | Performance: Up to ~30% with Titan Mode" },
    { id: "CORTEX_A53", name: "CORTEX-A53", score: 15, desc: "Ultra Efficient: Lowest overhead, very slow. | Performance: Up to ~15% with Titan Mode" },
  ],
  X86_64: [
    { id: "BROADWELL", name: "BROADWELL", score: 25, desc: "Generic Model: Standard software emulation. | Performance: ~20-25% with Titan Mode" },
    { id: "HASWELL", name: "HASWELL", score: 24, desc: "Generic Model: Standard software emulation. | Performance: ~20-25% with Titan Mode" },
    { id: "IVYBRIDGE", name: "IVYBRIDGE", score: 22, desc: "Generic Model: Standard software emulation. | Performance: ~20-25% with Titan Mode" },
    { id: "QEMU64", name: "QEMU64", score: 20, desc: "Generic Model: Standard software emulation. | Performance: ~20-25% with Titan Mode" },
  ]
};

// --- Material Design Icons (SVGs) ---
const Icons = {
  Label: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path><line x1="7" y1="7" x2="7.01" y2="7"></line></svg>,
  Linux: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4M12,6A6,6 0 0,0 6,12A6,6 0 0,0 12,18A6,6 0 0,0 18,12A6,6 0 0,0 12,6M12,8A4,4 0 0,1 16,12A4,4 0 0,1 12,16A4,4 0 0,1 8,12A4,4 0 0,1 12,8Z"/></svg>,
  Windows: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M3,12V6.75L9,5.43V12H3M21,12V3L10,5.04V12H21M3,13V18.25L9,19.57V13H3M21,13V21L10,19.96V13H21Z"/></svg>,
  Android: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M15,5L15.57,2.22C15.62,1.96 15.43,1.75 15.17,1.75C15,1.75 14.82,1.87 14.77,2.05L14.21,4.82C13.5,4.58 12.77,4.45 12,4.45C11.23,4.45 10.5,4.58 9.79,4.82L9.23,2.05C9.18,1.87 9,1.75 8.79,1.75C8.56,1.75 8.38,1.96 8.42,2.22L9,5C6.88,6.07 5.4,8.19 5,10.74H19C18.6,8.19 17.12,6.07 15,5M6,12A1,1 0 0,0 5,13V18A1,1 0 0,0 6,19H18A1,1 0 0,0 19,18V13A1,1 0 0,0 18,12H6M8,14.5A1,1 0 0,1 9,15.5A1,1 0 0,1 8,16.5A1,1 0 0,1 7,15.5A1,1 0 0,1 8,14.5M16,14.5A1,1 0 0,1 17,15.5A1,1 0 0,1 16,16.5A1,1 0 0,1 15,15.5A1,1 0 0,1 16,14.5Z"/></svg>,
  Shield: ({ color }: any) => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>,
  Bolt: ({ color }: any) => <svg width="20" height="20" viewBox="0 0 24 24" fill={color}><path d="M11 21h-1l1-7H7.5c-.58 0-.57-.32-.38-.66.19-.34.05-.08.07-.12C8.48 10.94 10.42 7.54 13 3h1l-1 7h3.5c.49 0 .56.33.47.51l-.07.15C12.96 17.47 11 21 11 21z"/></svg>,
  Memory: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="4" width="16" height="16" rx="2" ry="2"></rect><rect x="9" y="9" width="6" height="6"></rect><line x1="9" y1="1" x2="9" y2="4"></line><line x1="15" y1="1" x2="15" y2="4"></line><line x1="9" y1="20" x2="9" y2="23"></line><line x1="15" y1="20" x2="15" y2="23"></line><line x1="20" y1="9" x2="23" y2="9"></line><line x1="20" y1="15" x2="23" y2="15"></line><line x1="1" y1="9" x2="4" y2="9"></line><line x1="1" y1="15" x2="4" y2="15"></line></svg>,
  Cpu: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="4" width="16" height="16" rx="2"></rect><rect x="9" y="9" width="6" height="6"></rect><path d="M15 2v2"></path><path d="M15 20v2"></path><path d="M2 15h2"></path><path d="M2 9h2"></path><path d="M20 15h2"></path><path d="M20 9h2"></path><path d="M9 2v2"></path><path d="M9 20v2"></path></svg>,
  Speed: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>,
  ChevronDown: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
};

// --- Sub-Components ---
function SectionHeader({ title }: { title: string }) {
  return (
    <div style={{ margin: "32px 0 12px" }}>
        <h4 style={{ fontSize: "0.75rem", fontWeight: 900, color: "var(--brand)", letterSpacing: "0.1em", margin: 0 }}>{title.toUpperCase()}</h4>
        <div style={{ height: "0.5px", background: "linear-gradient(90deg, var(--brand) 0%, transparent 100%)", marginTop: "4px", opacity: 0.3 }} />
    </div>
  );
}

function SegmentedChip({ options, selected, onSelect, color, icons }: any) {
    return (
        <div style={{ display: "flex", background: "rgba(0,0,0,0.3)", borderRadius: "14px", padding: "4px", gap: "4px" }}>
            {options.map((opt: string, idx: number) => {
                const isSelected = selected === opt;
                return (
                    <button 
                      key={opt}
                      onClick={() => onSelect(opt)}
                      style={{ 
                        flex: 1, padding: "12px", border: "none", borderRadius: "10px", fontWeight: 900, fontSize: "0.7rem", 
                        background: isSelected ? color : "transparent", 
                        color: isSelected ? "white" : "rgba(255,255,255,0.4)", cursor: "pointer", transition: "all 0.2s",
                        display: "flex", alignItems: "center", justifyContent: "center", gap: "6px"
                      }}
                    >
                        {icons && icons[idx]}
                        {opt}
                    </button>
                );
            })}
        </div>
    );
}

function SettingSlider({ title, value, max, unit, icon, onChange, color = "var(--brand)" }: any) {
    return (
        <div style={{ margin: "16px 0" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
                <span style={{ color: color }}>{icon}</span>
                <span style={{ fontSize: "0.8rem", fontWeight: 800, color: "white" }}>{title}: {Math.round(value)}{unit} / {max}{unit}</span>
            </div>
            <input 
                type="range" 
                min="1" 
                max={max} 
                value={value} 
                onChange={(e) => onChange(parseInt(e.target.value))}
                style={{
                    width: "100%",
                    accentColor: color,
                    cursor: "pointer"
                }}
            />
        </div>
    );
}

// --- Main Engine Tuning ---

export function EngineTuning() {
  const [os, setOs] = useState<OsType>("LINUX");
  const [arch, setArch] = useState<ArchType>("AARCH64");
  const [cpu, setCpu] = useState(CPU_MODELS.AARCH64[0]);
  const [isCpuOpen, setIsCpuOpen] = useState(false);
  const cpuRef = useRef<HTMLDivElement>(null);

  const [screenType, setScreenType] = useState<ScreenType>("VNC");
  const [isTitan, setIsTitan] = useState(false);
  const [showTitanWarning, setShowTitanWarning] = useState(false);
  
  // Resources
  const [ram, setRam] = useState(4096);
  const [cores, setCores] = useState(4);
  const [tbSize, setTbSize] = useState(512);

  const TOTAL_DEVICE_RAM = 16384;
  const SAFE_LIMIT = TOTAL_DEVICE_RAM * 0.9;
  const osColor = os === "WINDOWS" ? "#0078D4" : os === "ANDROID" ? "#3DDC84" : "var(--brand)";

  // Handlers for TCG vs Guest RAM logic
  const handleRamChange = (val: number) => {
    let newRam = val;
    if (newRam + tbSize > SAFE_LIMIT) {
        setTbSize(Math.max(128, SAFE_LIMIT - newRam));
    }
    setRam(newRam);
  };

  const handleTbChange = (val: number) => {
    let newTb = val;
    if (newTb + ram > SAFE_LIMIT) {
        setRam(Math.max(512, SAFE_LIMIT - newTb));
    }
    setTbSize(newTb);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (cpuRef.current && !cpuRef.current.contains(event.target as Node)) {
        setIsCpuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const isHighPressure = (ram + tbSize) > (SAFE_LIMIT * 0.95);

  return (
    <section id="tuning" style={{ padding: "4rem 1.5rem", maxWidth: 680, margin: "0 auto" }}>
      {showTitanWarning && (
          <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.85)", zIndex: 9999, display: "flex", alignItems: "center", justifyContent: "center", padding: "20px" }}>
            <div style={{ maxWidth: "400px", background: "#1C1B1F", border: "2px solid #FF0000", borderRadius: "28px", padding: "24px", boxShadow: "0 0 40px rgba(255,0,0,0.3)" }}>
               <div style={{ display: "flex", alignItems: "center", gap: "12px", color: "#FF0000", marginBottom: "16px" }}>
                  <Icons.Bolt color="#FF0000" />
                  <h2 style={{ fontSize: "1.2rem", fontWeight: 900, margin: 0 }}>Titan Mode: Extreme Risk</h2>
               </div>
               <div style={{ color: "rgba(255,255,255,0.8)", fontSize: "0.85rem", lineHeight: 1.6, marginBottom: "24px" }}>
                  <p>Titan Mode activates <code>cache=unsafe</code>. Writes are <b>not</b> flushed to disk. A device crash will result in total data corruption.</p>
               </div>
               <button onClick={() => { setIsTitan(true); setShowTitanWarning(false); }} style={{ width: "100%", padding: "14px", background: "#FF0000", color: "white", border: "none", borderRadius: "14px", fontWeight: 900, cursor: "pointer" }}>I ACCEPT THE RISK</button>
            </div>
          </div>
      )}

      <ScrollReveal>
        <div style={{ background: "linear-gradient(180deg, #1C1B1F 0%, #121212 100%)", border: "1.5px solid rgba(255, 255, 255, 0.08)", padding: 0, borderRadius: "32px", overflow: "hidden" }}>
          <div style={{ background: "rgba(255,255,255,0.03)", padding: "16px 24px", display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
             <h3 style={{ fontSize: "1.1rem", fontWeight: 900, color: "white", margin: 0 }}>Create New VM</h3>
             <button style={{ background: osColor, color: "white", border: "none", borderRadius: "12px", padding: "8px 20px", fontWeight: 900, fontSize: "0.75rem" }}>SAVE</button>
          </div>

          <div style={{ padding: "24px" }}>
            <SectionHeader title="Core Configuration" />
            
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))", gap: "8px", marginBottom: "16px" }}>
                {(["LINUX", "WINDOWS", "ANDROID", "OTHER"] as OsType[]).map((o) => (
                    <div key={o} onClick={() => setOs(o)} style={{ height: "80px", borderRadius: "16px", cursor: "pointer", background: os === o ? `${osColor}22` : "rgba(255,255,255,0.02)", border: `1.5px solid ${os === o ? osColor : "transparent"}`, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", transition: "0.2s" }}>
                        <span style={{ fontSize: "1.4rem" }}>{o === "LINUX" ? <Icons.Linux /> : o === "WINDOWS" ? <Icons.Windows /> : o === "ANDROID" ? <Icons.Android /> : "🔘"}</span>
                        <span style={{ fontSize: "0.65rem", fontWeight: 900, marginTop: "6px", color: os === o ? "white" : "rgba(255,255,255,0.4)" }}>{o}</span>
                    </div>
                ))}
            </div>

            <label style={{ fontSize: "0.65rem", fontWeight: 900, color: "rgba(255,255,255,0.4)", marginBottom: "6px", display: "block" }}>TARGET ARCHITECTURE</label>
            <SegmentedChip options={["AARCH64", "X86_64"]} selected={arch} onSelect={(a: ArchType) => { setArch(a); setCpu(CPU_MODELS[a][0]); }} color={osColor} />

            {/* Processor Model Dropdown Search-like UI */}
            <div style={{ position: "relative", marginTop: "20px" }} ref={cpuRef}>
                <label style={{ fontSize: "0.65rem", fontWeight: 900, color: "rgba(255,255,255,0.4)", marginBottom: "6px", display: "block" }}>PROCESSOR MODEL</label>
                <div 
                  onClick={() => setIsCpuOpen(!isCpuOpen)}
                  style={{ 
                    padding: "16px", borderRadius: "16px", background: "rgba(255,255,255,0.02)", border: `1.5px solid ${isCpuOpen ? osColor : "rgba(255,255,255,0.15)"}`,
                    display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer", transition: "0.2s"
                  }}
                >
                    <div>
                        <div style={{ fontSize: "0.9rem", fontWeight: 900, color: "white" }}>{cpu.name}</div>
                        <div style={{ fontSize: "0.65rem", color: "rgba(255,255,255,0.4)" }}>{cpu.desc}</div>
                    </div>
                    <Icons.ChevronDown />
                </div>

                {isCpuOpen && (
                    <div style={{ 
                        position: "absolute", top: "110%", left: 0, right: 0, zIndex: 100,
                        background: "#1C1B1F", border: "1.5px solid rgba(255,255,255,0.1)", borderRadius: "16px",
                        boxShadow: "0 10px 30px rgba(0,0,0,0.5)", overflow: "hidden"
                    }}>
                        {CPU_MODELS[arch as keyof typeof CPU_MODELS].map((model) => (
                            <div 
                              key={model.id}
                              onClick={() => { setCpu(model); setIsCpuOpen(false); }}
                              style={{ 
                                padding: "16px", borderBottom: "1px solid rgba(255,255,255,0.05)", cursor: "pointer",
                                background: cpu.id === model.id ? "rgba(255,255,255,0.05)" : "transparent"
                              }}
                            >
                                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                    <span style={{ fontSize: "0.85rem", fontWeight: 900, color: cpu.id === model.id ? osColor : "white" }}>{model.name}</span>
                                    <span style={{ fontSize: "0.6rem", background: "rgba(255,255,255,0.05)", padding: "2px 8px", borderRadius: "10px", color: "rgba(255,255,255,0.4)" }}>{model.score}% SPEED</span>
                                </div>
                                <div style={{ fontSize: "0.65rem", color: "rgba(255,255,255,0.4)", marginTop: "4px" }}>{model.desc}</div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <SectionHeader title="Display & Graphics" />
            <SegmentedChip options={["VNC", "SPICE"]} selected={screenType} onSelect={setScreenType} color={osColor} />

            <SectionHeader title="Power & Hardware" />
            <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
                <div onClick={() => setIsTitan(false)} style={{ flex: 1, padding: "16px", borderRadius: "24px", background: !isTitan ? "rgba(76,175,80,0.1)" : "rgba(0,0,0,0.2)", border: `1.5px solid ${!isTitan ? "#4CAF50" : "transparent"}`, cursor: "pointer", display: "flex", gap: "12px", alignItems: "center" }}>
                    <Icons.Shield color={!isTitan ? "#4CAF50" : "rgba(255,255,255,0.3)"} />
                    <div><div style={{ fontWeight: 900, fontSize: "0.85rem", color: !isTitan ? "#4CAF50" : "white" }}>Balanced</div></div>
                </div>
                <div onClick={() => setShowTitanWarning(true)} style={{ flex: 1, padding: "16px", borderRadius: "24px", background: isTitan ? "rgba(255,0,0,0.1)" : "rgba(0,0,0,0.2)", border: `1.5px solid ${isTitan ? "#FF0000" : "transparent"}`, cursor: "pointer", display: "flex", gap: "12px", alignItems: "center" }}>
                    <Icons.Bolt color={isTitan ? "#FF0000" : "rgba(255,255,255,0.3)"} />
                    <div><div style={{ fontWeight: 900, fontSize: "0.85rem", color: isTitan ? "#FF0000" : "white" }}>Titan</div></div>
                </div>
            </div>

            <SettingSlider title="Guest RAM" value={ram} max={TOTAL_DEVICE_RAM} unit="MB" icon={<Icons.Memory />} onChange={handleRamChange} color={osColor} />
            <SettingSlider title="CPU Cores" value={cores} max={12} unit=" Cores" icon={<Icons.Cpu />} onChange={setCores} color={osColor} />
            
            <SectionHeader title="Emulation Engine" />
            <SettingSlider title="TCG TB-Size" value={tbSize} max={TOTAL_DEVICE_RAM - 512} unit="MB" icon={<Icons.Speed />} onChange={handleTbChange} color={osColor} />
            
            <div style={{ 
                padding: "16px", borderRadius: "24px", border: `1.5px solid ${isHighPressure ? "rgba(255,0,0,0.3)" : "rgba(103,80,164,0.15)"}`,
                background: isHighPressure ? "rgba(255,0,0,0.05)" : "rgba(103,80,164,0.04)", marginTop: "20px"
            }}>
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <div style={{ fontSize: "1.2rem" }}>{isHighPressure ? "⚠️" : "🚀"}</div>
                    <div>
                        <span style={{ fontSize: "0.65rem", fontWeight: 900, color: isHighPressure ? "#FF0000" : "var(--brand)" }}>{isHighPressure ? "DANGER: HIGH PRESSURE" : "MEMORY STATUS: SAFE"}</span>
                        <p style={{ fontSize: "0.8rem", color: "white", margin: 0, fontWeight: 700 }}>Total: {Math.round(ram + tbSize)} MB / {TOTAL_DEVICE_RAM} MB</p>
                    </div>
                </div>
            </div>
          </div>

        </div>
      </ScrollReveal>
    </section>
  );
}
