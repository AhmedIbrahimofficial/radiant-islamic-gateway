import { createFileRoute } from "@tanstack/react-router";
import { Compass, LocateFixed, Navigation, Smartphone } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

import { PageHeader } from "../components/site/PageHeader";
import { FloatingPatterns } from "../components/site/Decor";

export const Route = createFileRoute("/qibla")({
  head: () => ({
    meta: [
      { title: "Qibla Finder — Nur al-Huda" },
      {
        name: "description",
        content:
          "Find the direction of the Kaaba with an interactive compass, live device heading and precise bearing and distance from your location.",
      },
      { property: "og:title", content: "Qibla Finder & Compass — Nur al-Huda" },
      {
        property: "og:description",
        content: "Interactive Qibla compass with live heading, exact bearing and distance to Makkah.",
      },
    ],
  }),
  component: QiblaPage,
});

const KAABA = { lat: 21.4224779, lng: 39.8251832 };
const rad = (d: number) => (d * Math.PI) / 180;
const deg = (r: number) => (r * 180) / Math.PI;

function qiblaBearing(lat: number, lng: number) {
  const dL = rad(KAABA.lng - lng);
  const y = Math.sin(dL);
  const x = Math.cos(rad(lat)) * Math.tan(rad(KAABA.lat)) - Math.sin(rad(lat)) * Math.cos(dL);
  return (deg(Math.atan2(y, x)) + 360) % 360;
}

function distanceKm(lat: number, lng: number) {
  const R = 6371;
  const dLat = rad(KAABA.lat - lat);
  const dLng = rad(KAABA.lng - lng);
  const a =
    Math.sin(dLat / 2) ** 2 + Math.cos(rad(lat)) * Math.cos(rad(KAABA.lat)) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(a));
}

const compassLabel = (b: number) => {
  const names = ["North", "North-East", "East", "South-East", "South", "South-West", "West", "North-West"];
  return names[Math.round(b / 45) % 8]!;
};

function QiblaPage() {
  const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(null);
  const [status, setStatus] = useState<"idle" | "locating" | "error">("idle");
  const [heading, setHeading] = useState<number | null>(null);
  const [sensorOn, setSensorOn] = useState(false);
  const [manualLat, setManualLat] = useState("");
  const [manualLng, setManualLng] = useState("");

  const locate = useCallback(() => {
    if (typeof navigator === "undefined" || !navigator.geolocation) {
      setStatus("error");
      return;
    }
    setStatus("locating");
    navigator.geolocation.getCurrentPosition(
      (p) => {
        setCoords({ lat: p.coords.latitude, lng: p.coords.longitude });
        setStatus("idle");
      },
      () => setStatus("error"),
      { enableHighAccuracy: true, timeout: 12000 },
    );
  }, []);

  const enableSensor = useCallback(async () => {
    type OrientationCtor = { requestPermission?: () => Promise<string> };
    const ctor = (window as unknown as { DeviceOrientationEvent?: OrientationCtor }).DeviceOrientationEvent;
    if (ctor?.requestPermission) {
      try {
        const res = await ctor.requestPermission();
        if (res !== "granted") return;
      } catch {
        return;
      }
    }
    setSensorOn(true);
  }, []);

  useEffect(() => {
    if (!sensorOn) return;
    const onOrient = (e: DeviceOrientationEvent & { webkitCompassHeading?: number }) => {
      const webkit = e.webkitCompassHeading;
      if (typeof webkit === "number") setHeading(webkit);
      else if (typeof e.alpha === "number") setHeading((360 - e.alpha) % 360);
    };
    window.addEventListener("deviceorientationabsolute", onOrient as EventListener);
    window.addEventListener("deviceorientation", onOrient as EventListener);
    return () => {
      window.removeEventListener("deviceorientationabsolute", onOrient as EventListener);
      window.removeEventListener("deviceorientation", onOrient as EventListener);
    };
  }, [sensorOn]);

  const bearing = coords ? qiblaBearing(coords.lat, coords.lng) : null;
  const distance = coords ? distanceKm(coords.lat, coords.lng) : null;
  const dialRotation = heading !== null ? -heading : 0;
  const needleRotation = (bearing ?? 0) + dialRotation;
  const aligned =
    bearing !== null && heading !== null && Math.abs(((bearing - heading + 540) % 360) - 180) < 6;

  return (
    <>
      <PageHeader
        eyebrow="Worship tools"
        title="Qibla Finder"
        arabic="فَوَلِّ وَجْهَكَ شَطْرَ الْمَسْجِدِ الْحَرَامِ"
        subtitle="Turn towards the Sacred House with a live compass, exact bearing and the distance from where you stand."
      />

      <section className="relative overflow-hidden py-16 sm:py-20">
        <FloatingPatterns />
        <div className="relative mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 lg:grid-cols-[1fr_1fr] lg:items-center">
          <div className="glass mx-auto w-full max-w-md rounded-[2rem] p-6 shadow-luxe sm:p-10">
            <div className="relative mx-auto aspect-square w-full max-w-sm">
              <div
                className="absolute inset-0 rounded-full border border-gold/40 bg-gradient-emerald transition-transform duration-300 ease-out"
                style={{ transform: `rotate(${dialRotation}deg)` }}
              >
                <div className="islamic-pattern absolute inset-0 rounded-full opacity-40" aria-hidden />
                {["N", "E", "S", "W"].map((d, i) => (
                  <span
                    key={d}
                    className="absolute left-1/2 top-3 -translate-x-1/2 text-xs font-semibold tracking-[0.2em] text-gold"
                    style={{ transformOrigin: "50% calc(50vw)", transform: `rotate(${i * 90}deg)` }}
                  >
                    {d}
                  </span>
                ))}
                {Array.from({ length: 36 }).map((_, i) => (
                  <span
                    key={i}
                    className="absolute left-1/2 top-0 h-3 w-px origin-bottom bg-gold/30"
                    style={{ transform: `rotate(${i * 10}deg) translateY(6px)`, transformOrigin: "50% 50vh" }}
                  />
                ))}
              </div>

              <div
                className="absolute inset-0 grid place-items-center transition-transform duration-300 ease-out"
                style={{ transform: `rotate(${needleRotation}deg)` }}
              >
                <div className="flex h-full flex-col items-center justify-start pt-6">
                  <Navigation
                    className={`size-10 ${aligned ? "text-gold" : "text-cream"} drop-shadow`}
                    strokeWidth={1.5}
                  />
                  <span className="mt-1 h-1/3 w-px bg-gold/60" />
                </div>
              </div>

              <div className="absolute inset-0 grid place-items-center">
                <div
                  className={`grid size-20 place-items-center rounded-full border text-center ${
                    aligned ? "border-gold bg-gold/20 shadow-gold" : "border-gold/40 bg-emerald-deep/80"
                  }`}
                >
                  <span className="font-arabic text-lg text-gold">ٱلْكَعْبَة</span>
                </div>
              </div>
            </div>

            <p className="mt-8 text-center text-sm text-muted-foreground">
              {bearing === null
                ? "Share your location to calculate the Qibla direction."
                : aligned
                  ? "You are facing the Qibla — may Allah accept your prayer."
                  : heading === null
                    ? `Face ${Math.round(bearing)}° from true north (${compassLabel(bearing)}).`
                    : "Rotate slowly until the marker glows gold."}
            </p>
          </div>

          <div className="grid gap-5">
            <div className="glass rounded-3xl p-6 shadow-luxe">
              <h2 className="text-xl font-semibold text-foreground">Your position</h2>
              <div className="mt-5 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={locate}
                  className="inline-flex items-center gap-2 rounded-full bg-gradient-gold px-5 py-3 text-sm font-semibold text-gold-foreground shadow-gold transition-transform hover:-translate-y-0.5"
                >
                  <LocateFixed className="size-4" />
                  {status === "locating" ? "Locating…" : "Use my location"}
                </button>
                <button
                  type="button"
                  onClick={enableSensor}
                  className="inline-flex items-center gap-2 rounded-full border border-gold/40 px-5 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-gold/10"
                >
                  <Smartphone className="size-4 text-gold" />
                  {sensorOn ? "Compass active" : "Enable live compass"}
                </button>
              </div>
              {status === "error" && (
                <p className="mt-4 text-sm text-destructive">
                  Location unavailable. Enter your coordinates manually below.
                </p>
              )}
              <div className="mt-6 grid gap-4 sm:grid-cols-[1fr_1fr_auto] sm:items-end">
                <label className="block">
                  <span className="text-xs tracking-[0.2em] text-muted-foreground uppercase">Latitude</span>
                  <input
                    value={manualLat}
                    onChange={(e) => setManualLat(e.target.value)}
                    placeholder="24.8607"
                    className="mt-2 w-full rounded-2xl border border-border bg-card px-4 py-3 text-sm outline-none focus:border-gold/60"
                  />
                </label>
                <label className="block">
                  <span className="text-xs tracking-[0.2em] text-muted-foreground uppercase">Longitude</span>
                  <input
                    value={manualLng}
                    onChange={(e) => setManualLng(e.target.value)}
                    placeholder="67.0011"
                    className="mt-2 w-full rounded-2xl border border-border bg-card px-4 py-3 text-sm outline-none focus:border-gold/60"
                  />
                </label>
                <button
                  type="button"
                  onClick={() => {
                    const la = Number.parseFloat(manualLat);
                    const ln = Number.parseFloat(manualLng);
                    if (Number.isFinite(la) && Number.isFinite(ln) && Math.abs(la) <= 90 && Math.abs(ln) <= 180) {
                      setCoords({ lat: la, lng: ln });
                      setStatus("idle");
                    }
                  }}
                  className="rounded-2xl border border-gold/40 px-5 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-gold/10"
                >
                  Apply
                </button>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              {[
                { label: "Qibla bearing", value: bearing === null ? "—" : `${Math.round(bearing)}°` },
                { label: "Direction", value: bearing === null ? "—" : compassLabel(bearing) },
                { label: "Distance to Makkah", value: distance === null ? "—" : `${Math.round(distance).toLocaleString()} km` },
              ].map((s) => (
                <div key={s.label} className="glass rounded-3xl p-5 text-center">
                  <Compass className="mx-auto size-5 text-gold" />
                  <p className="mt-3 text-lg font-semibold text-foreground">{s.value}</p>
                  <p className="mt-1 text-xs tracking-[0.16em] text-muted-foreground uppercase">{s.label}</p>
                </div>
              ))}
            </div>

            <div className="glass rounded-3xl p-6">
              <h3 className="text-lg font-semibold text-foreground">For an accurate reading</h3>
              <ul className="mt-3 grid gap-2 text-sm text-muted-foreground">
                <li>• Hold your phone flat and away from metal or magnets.</li>
                <li>• Move it in a figure-of-eight once to calibrate the sensor.</li>
                <li>• Bearings are measured from true north; a paper compass shows magnetic north.</li>
                <li>• If in doubt, confirm with your local mosque's mihrab.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
