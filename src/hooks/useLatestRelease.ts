import { useState, useEffect } from "react";

interface ReleaseData {
  version: string;
  apkUrl: string;
  isLoading: boolean;
  error: Error | null;
}

const FALLBACK_VERSION = "v1.0.4";
const FALLBACK_APK_URL = "https://github.com/range79/Range-Emulator/releases/latest/download/app-release.apk";

export function useLatestRelease(): ReleaseData {
  const [data, setData] = useState<Omit<ReleaseData, "isLoading" | "error">>({
    version: FALLBACK_VERSION,
    apkUrl: FALLBACK_APK_URL,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchRelease() {
      try {
        const response = await fetch(
          "https://api.github.com/repos/range79/Range-Emulator/releases/latest"
        );
        if (!response.ok) throw new Error("GitHub API unavailable");
        
        const json = await response.json();
        const apkAsset = json.assets.find((a: any) => a.name.endsWith(".apk"));
        
        setData({
          version: json.tag_name || FALLBACK_VERSION,
          apkUrl: apkAsset?.browser_download_url || FALLBACK_APK_URL,
        });
      } catch (err) {
        console.error("Failed to fetch latest release:", err);
        setError(err instanceof Error ? err : new Error("Unknown error"));
      } finally {
        setIsLoading(false);
      }
    }

    fetchRelease();
  }, []);

  return { ...data, isLoading, error };
}
