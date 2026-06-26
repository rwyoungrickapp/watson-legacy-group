"use client";

import { useState, useRef, useEffect } from "react";

// ------- Brand tokens (matched to watsonlegacygroup.com) -------
const C = {
  bg: "#0A0A0A",
  surface: "#121214",
  raised: "#1A1A1A",
  gold: "#C9A84C",
  goldBright: "#E8C97A",
  text: "#ECE9E2",
  muted: "#9A958B",
  border: "rgba(201,168,76,0.18)",
  borderStrong: "rgba(201,168,76,0.34)",
};
const serif = '"Hoefler Text", "Iowan Old Style", Garamond, Georgia, serif';
const sans = 'ui-sans-serif, system-ui, -apple-system, "SF Pro Text", "Helvetica Neue", sans-serif';

// ------- Inline SVG icons (no external dependency) -------
const Svg = (p) => (
  <svg
    width={p.size || 16}
    height={p.size || 16}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ display: "block" }}
  >
    {p.children}
  </svg>
);
const Send = (p) => (
  <Svg {...p}>
    <line x1="22" y1="2" x2="11" y2="13" />
    <polygon points="22 2 15 22 11 13 2 9 22 2" />
  </Svg>
);
const ArrowRight = (p) => (
  <Svg {...p}>
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </Svg>
);
const Instagram = (p) => (
  <Svg {...p}>
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </Svg>
);
const Music2 = (p) => (
  <Svg {...p}>
    <circle cx="8" cy="18" r="4" />
    <path d="M12 18V2l7 4" />
  </Svg>
);
const BookOpen = (p) => (
  <Svg {...p}>
    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
  </Svg>
);
const LifeBuoy = (p) => (
  <Svg {...p}>
    <circle cx="12" cy="12" r="10" />
    <circle cx="12" cy="12" r="4" />
    <line x1="4.93" y1="4.93" x2="9.17" y2="9.17" />
    <line x1="14.83" y1="14.83" x2="19.07" y2="19.07" />
    <line x1="14.83" y1="9.17" x2="19.07" y2="4.93" />
    <line x1="9.17" y1="14.83" x2="4.93" y2="19.07" />
  </Svg>
);

const SPOTIFY = "https://tr.ee/gYK6GyKWGX";
const INSTAGRAM = "https://tr.ee/OURwpmM3DY";

const CHIPS = [
  "I feel broke and stuck",
  "I keep procrastinating",
  "Heading to the DR soon",
  "Hosting friends tonight",
  "My relationship is rocky",
  "I want to learn AI",
];

function Meter({ name, score, note }) {
  const [w, setW] = useState(0);
  useEffect(() => {
    const t = setTimeout(() => setW(score), 60);
    return () => clearTimeout(t);
  }, [score]);
  return (
    <div style={{ marginBottom: 14 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 6 }}>
        <span style={{ fontFamily: sans, fontSize: 13, letterSpacing: 0.3, color: C.text }}>{name}</span>
        <span style={{ fontFamily: serif, fontSize: 15, color: C.goldBright }}>{score}</span>
      </div>
      <div style={{ height: 4, background: "rgba(255,255,255,0.06)", borderRadius: 99, overflow: "hidden" }}>
        <div style={{ height: "100%", width: `${w}%`, background: `linear-gradient(90deg, ${C.gold}, ${C.goldBright})`, borderRadius: 99, transition: "width 900ms cubic-bezier(.22,1,.36,1)" }} />
      </div>
      {note ? <div style={{ fontFamily: sans, fontSize: 11.5, color: C.muted, marginTop: 5 }}>{note}</div> : null}
    </div>
  );
}

function RecCard({ rec, accent }) {
  if (!rec) return null;
  const icon = rec.type === "music" ? <Music2 size={15} /> : rec.type === "social" ? <Instagram size={15} /> : <BookOpen size={15} />;
  return (
    <a href={rec.link} target="_blank" rel="noopener noreferrer" style={{ display: "block", textDecoration: "none", background: C.raised, border: `1px solid ${accent ? C.borderStrong : C.border}`, borderRadius: 12, padding: "16px 18px", marginBottom: 12 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
        <span style={{ color: C.gold, display: "flex" }}>{icon}</span>
        <span style={{ fontFamily: sans, fontSize: 10.5, letterSpacing: 1.4, textTransform: "uppercase", color: C.muted }}>{accent ? "Recommended for you" : "Also worth a look"}</span>
      </div>
      <div style={{ fontFamily: serif, fontSize: 19, color: C.text, lineHeight: 1.2, marginBottom: 6 }}>{rec.title}</div>
      <div style={{ fontFamily: sans, fontSize: 13.5, color: C.muted, lineHeight: 1.5, marginBottom: 12 }}>{rec.reason}</div>
      <div style={{ display: "inline-flex", alignItems: "center", gap: 6, fontFamily: sans, fontSize: 13, color: C.goldBright }}>Open <ArrowRight size={14} /></div>
    </a>
  );
}

export default function LegacyAI() {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const endRef = useRef(null);

  useEffect(() => {
    if (result || error) endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [result, error]);

  async function run(text) {
    const msg = (text ?? input).trim();
    if (!msg || loading) return;
    setLoading(true);
    setResult(null);
    setError("");
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ message: msg }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Something went wrong. Try again.");
        return;
      }
      const clean = (data.text || "").replace(/```json|```/g, "").trim();
      let parsed;
      try {
        parsed = JSON.parse(clean);
      } catch {
        setError("LEGACY AI sent something I couldn't read. Try rephrasing.");
        return;
      }
      setResult(parsed);
    } catch {
      setError("Connection hiccup. Check your network and try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ minHeight: "100vh", background: C.bg, color: C.text, fontFamily: sans, padding: "0 16px 64px" }}>
      <div style={{ maxWidth: 720, margin: "0 auto" }}>
        <header style={{ paddingTop: 48, paddingBottom: 28, textAlign: "center" }}>
          <a href="/" style={{ display: "inline-block", marginBottom: 20 }}>
            <img src="/wlg-logo.jpeg" alt="Watson Legacy Group" width={64} height={64} style={{ borderRadius: "50%", border: `1px solid ${C.border}` }} />
          </a>
          <div style={{ fontFamily: sans, fontSize: 11, letterSpacing: 3.5, textTransform: "uppercase", color: C.gold, marginBottom: 18 }}>Legacy AI · Watson Legacy Group</div>
          <h1 style={{ fontFamily: serif, fontSize: "clamp(32px, 7vw, 52px)", lineHeight: 1.05, fontWeight: 500, margin: "0 0 14px", letterSpacing: -0.5 }}>
            How are you doing<br /><span style={{ fontStyle: "italic", color: C.goldBright }}>today?</span>
          </h1>
          <p style={{ fontFamily: sans, fontSize: 14.5, color: C.muted, maxWidth: 440, margin: "0 auto", lineHeight: 1.55 }}>Tell me how you feel, what you're building, or what's weighing on you. I'll point you somewhere real.</p>
        </header>

        <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 16, padding: 14 }}>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) run(); }}
            placeholder="Type it here…"
            rows={3}
            style={{ width: "100%", resize: "none", background: "transparent", border: "none", outline: "none", color: C.text, fontFamily: sans, fontSize: 16, lineHeight: 1.5, padding: 6 }}
          />
          <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 6 }}>
            <button
              onClick={() => run()}
              disabled={loading || !input.trim()}
              style={{ display: "inline-flex", alignItems: "center", gap: 8, background: input.trim() && !loading ? `linear-gradient(90deg, ${C.gold}, ${C.goldBright})` : "rgba(255,255,255,0.06)", color: input.trim() && !loading ? "#1a1407" : C.muted, border: "none", borderRadius: 10, padding: "11px 20px", fontFamily: sans, fontSize: 14, fontWeight: 600, cursor: input.trim() && !loading ? "pointer" : "default", letterSpacing: 0.2 }}
            >
              {loading ? "Reading…" : "Get my Legacy Blueprint"} <Send size={15} />
            </button>
          </div>
        </div>

        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 14 }}>
          {CHIPS.map((c) => (
            <button key={c} onClick={() => { setInput(c); run(c); }} disabled={loading} style={{ background: "transparent", border: `1px solid ${C.border}`, color: C.muted, borderRadius: 99, padding: "7px 14px", fontFamily: sans, fontSize: 12.5, cursor: loading ? "default" : "pointer" }}>{c}</button>
          ))}
        </div>

        {error ? (
          <div style={{ marginTop: 24, background: C.surface, border: `1px solid ${C.borderStrong}`, borderRadius: 14, padding: "16px 18px" }}>
            <div style={{ fontFamily: sans, fontSize: 14, color: C.text, lineHeight: 1.5 }}>{error}</div>
          </div>
        ) : null}

        {result ? (
          <div style={{ marginTop: 30 }}>
            {result.crisis ? (
              <div style={{ background: C.surface, border: `1px solid ${C.borderStrong}`, borderRadius: 16, padding: "22px 22px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, color: C.gold, marginBottom: 12 }}><LifeBuoy size={18} /><span style={{ fontFamily: sans, fontSize: 11, letterSpacing: 2, textTransform: "uppercase" }}>You matter</span></div>
                <p style={{ fontFamily: serif, fontSize: 18, lineHeight: 1.5, color: C.text, margin: 0 }}>{result.supportMessage}</p>
              </div>
            ) : (
              <>
                <div style={{ marginBottom: 24 }}>
                  {result.mode ? <span style={{ display: "inline-block", fontFamily: sans, fontSize: 11, letterSpacing: 1.6, textTransform: "uppercase", color: C.goldBright, border: `1px solid ${C.border}`, borderRadius: 99, padding: "5px 12px", marginBottom: 14 }}>{result.mode}</span> : null}
                  <p style={{ fontFamily: serif, fontSize: "clamp(20px, 4.5vw, 26px)", lineHeight: 1.4, color: C.text, margin: 0 }}>{result.reflection}</p>
                </div>
                {result.steps?.length ? (
                  <div style={{ marginBottom: 26 }}>
                    <div style={{ fontFamily: sans, fontSize: 11, letterSpacing: 2, textTransform: "uppercase", color: C.muted, marginBottom: 14 }}>Today's moves</div>
                    {result.steps.map((s, i) => (
                      <div key={i} style={{ display: "flex", gap: 14, marginBottom: 12 }}>
                        <span style={{ fontFamily: serif, fontSize: 15, color: C.gold, minWidth: 18 }}>{String(i + 1).padStart(2, "0")}</span>
                        <span style={{ fontFamily: sans, fontSize: 15, lineHeight: 1.5, color: C.text }}>{s}</span>
                      </div>
                    ))}
                  </div>
                ) : null}
                <RecCard rec={result.primary} accent />
                <RecCard rec={result.secondary} />
                {result.legacyScore?.dimensions?.length ? (
                  <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 16, padding: "22px 22px", marginTop: 14 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 20 }}>
                      <span style={{ fontFamily: sans, fontSize: 11, letterSpacing: 2, textTransform: "uppercase", color: C.muted }}>Legacy Score</span>
                      <span style={{ fontFamily: serif, fontSize: 34, color: C.goldBright, lineHeight: 1 }}>{result.legacyScore.overall}</span>
                    </div>
                    {result.legacyScore.dimensions.map((d, i) => <Meter key={i} {...d} />)}
                  </div>
                ) : null}
                {result.challenge ? (
                  <div style={{ background: `linear-gradient(135deg, rgba(201,168,76,0.10), rgba(201,168,76,0.02))`, border: `1px solid ${C.border}`, borderRadius: 16, padding: "20px 22px", marginTop: 14 }}>
                    <div style={{ fontFamily: sans, fontSize: 11, letterSpacing: 2, textTransform: "uppercase", color: C.gold, marginBottom: 10 }}>Daily Legacy Challenge</div>
                    <p style={{ fontFamily: serif, fontSize: 18, lineHeight: 1.5, color: C.text, margin: 0 }}>{result.challenge}</p>
                  </div>
                ) : null}
                {result.followUp ? <p style={{ fontFamily: serif, fontStyle: "italic", fontSize: 17, color: C.muted, textAlign: "center", marginTop: 28, lineHeight: 1.5 }}>{result.followUp}</p> : null}
              </>
            )}
            <div style={{ display: "flex", justifyContent: "center", gap: 10, marginTop: 28, flexWrap: "wrap" }}>
              <a href={INSTAGRAM} target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: 7, textDecoration: "none", color: C.muted, border: `1px solid ${C.border}`, borderRadius: 99, padding: "9px 16px", fontFamily: sans, fontSize: 13 }}><Instagram size={14} /> Follow Ya Boy Rick</a>
              <a href={SPOTIFY} target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: 7, textDecoration: "none", color: C.muted, border: `1px solid ${C.border}`, borderRadius: 99, padding: "9px 16px", fontFamily: sans, fontSize: 13 }}><Music2 size={14} /> Listen on Spotify</a>
            </div>
          </div>
        ) : null}
        <div ref={endRef} />
      </div>
    </div>
  );
}
