import { useState } from "react";
import { Footer } from "./components/Footer";
import { Hero } from "./components/Hero";
import { Navbar } from "./components/Navbar";
import { ParticleCanvas } from "./components/ParticleCanvas";
import { MaterialDialog } from "./components/MaterialDialog";
import { DownloadHub } from "./components/DownloadHub";
import { EngineTuning } from "./components/EngineTuning";
import { FeatureHub } from "./components/FeatureHub";
import { SpiceSection } from "./components/SpiceSection";

import { AboutSection } from "./components/AboutSection";

export default function App() {
  const [showSupportDialog, setShowSupportDialog] = useState(false);
  const donateUrl = "https://buymeacoffee.com/darkrange6s";

  const handleSupportClick = () => {
    setShowSupportDialog(true);
  };

  const confirmSupport = () => {
    window.open(donateUrl, "_blank");
    setShowSupportDialog(false);
  };

  return (
    <>
      <ParticleCanvas />
      <MaterialDialog
        isOpen={showSupportDialog}
        title="Fuel the Engine"
        message="Thank you for supporting Range Emulator. Your contribution directly fuels our core development and server infrastructure."
        type="success"
        onCancel={() => setShowSupportDialog(false)}
        onConfirm={confirmSupport}
      />
      <div style={{ position: "relative", zIndex: 1, backgroundColor: "var(--bg-deep)" }}>
        <Navbar onSupportClick={handleSupportClick} />
        <main>
          <Hero onSupportClick={handleSupportClick} />
          <AboutSection />
          
          <div id="titan">
            <EngineTuning />
          </div>

          <FeatureHub />
          <SpiceSection />
          <DownloadHub />
        </main>
        <Footer />
      </div>
    </>
  );
}
