"use client";

import { useState, useEffect, useRef } from "react";

const GOLD = "#C9A84C";
const GOLD_LIGHT = "#E8C97A";
const GOLD_DIM = "#8A6E2F";
const BLACK = "#0A0A0A";
const NEAR_BLACK = "#111111";
const DARK = "#1A1A1A";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Watch", href: "#intro" },
  { label: "Who We Are", href: "#who" },
  { label: "Mission", href: "#mission" },
  { label: "Ventures", href: "#ventures" },
  { label: "Music", href: "#music" },
  { label: "Books", href: "#books" },
  { label: "Contact", href: "#contact" },
];

const ventures = [
  {
    icon: "✈️",
    title: "Travel Plug",
    subtitle: "AI Travel Concierge",
    desc: "Luxury AI-powered travel concierge launching in the Dominican Republic. QR-code first, no download required.",
    tag: "TECH",
    url: "https://www.travelplug.app",
  },
  {
    icon: "🎵",
    title: "WLG Music",
    subtitle: "Ya Boy Rick",
    desc: "Full catalog available on all streaming platforms. Albums and singles — all under Watson Legacy Group.",
    tag: "MUSIC",
    url: "#music",
  },
  {
    icon: "📚",
    title: "WLG Publishing",
    subtitle: "Books & Audiobooks",
    desc: "Expand your mind. Full library of books on Amazon and audiobooks on Google Play Books by Ya Boy Rick.",
    tag: "PUBLISHING",
    url: "#books",
  },
  {
    icon: "🎓",
    title: "WLG Academy",
    subtitle: "Courses & Coaching",
    desc: "Courses available on Stan Store. Interoception Self-Mastery Programming — shift your frequency, build your legacy.",
    tag: "EDUCATION",
    url: "#books",
  },
  {
    icon: "👥",
    title: "Creator Network",
    subtitle: "Global Creator Plug",
    desc: "WLG's elite creator pipeline spanning six global markets. AI-powered, system-run, zero friction.",
    tag: "NETWORK",
    url: "#contact",
  },
  {
    icon: "🎪",
    title: "WLG Events",
    subtitle: "Live Experiences",
    desc: "Book tickets and experiences via Eventbrite. We bring the culture to you live.",
    tag: "EVENTS",
    url: "#books",
  },
];

const platforms = [
  { name: "Books on Amazon", icon: "📖", url: "https://www.amazon.com/s?k=Ya+Boy+Rick", desc: "Full library of books by Ya Boy Rick" },
  { name: "Audiobooks on Google Play", icon: "🎧", url: "https://play.google.com/store/search?q=ya%20boy%20rick&c=books", desc: "Listen on the go" },
  { name: "Music on All Streaming Platforms", icon: "🎵", url: "#music", desc: "Spotify, Apple Music, Tidal & more" },
  { name: "Courses on Stan Store", icon: "🎓", url: "https://stan.store/yaboyrick", desc: "Level up with WLG Academy" },
  { name: "Events on Eventbrite", icon: "🎟️", url: "https://www.eventbrite.com/o/watson-legacy-group-120634610266", desc: "Live WLG experiences" },
  { name: "YouTube — WLG", icon: "▶️", url: "https://youtube.com/@watsonlegacyg", desc: "Watch the movement" },
];

const streamingPlatforms = [
  { name: "Spotify", url: "https://open.spotify.com/artist/1Beij2uN4LAvhV5wZJFcRS" },
  { name: "Apple Music", url: "https://music.apple.com/us/artist/ya-boy-rick/1783588061" },
  { name: "Tidal", url: "https://www.amazon.com/s?k=Ya+Boy+Rick" },
  { name: "Amazon Music", url: "https://www.amazon.com/s?k=Ya+Boy+Rick" },
  { name: "YouTube Music", url: "https://youtube.com/channel/UCHcpRW85xKFifnTuif0AxwA" },
  { name: "Deezer", url: "https://www.amazon.com/s?k=Ya+Boy+Rick" },
  { name: "Pandora", url: "https://pandora.app.link/gi2U4sFmR3b" },
  { name: "All Platforms", url: "https://open.spotify.com/artist/1Beij2uN4LAvhV5wZJFcRS" },
];

function useInView(ref, threshold = 0.15) {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true);
      },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [ref, threshold]);
  return inView;
}

function FadeIn({ children, delay = 0, style = {} }) {
  const ref = useRef(null);
  const inView = useInView(ref);
  return (
    <div
      ref={ref}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(32px)",
        transition: `opacity 0.8s ease ${delay}s, transform 0.8s ease ${delay}s`,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

function GoldDivider() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 16, margin: "32px 0" }}>
      <div style={{ flex: 1, height: 1, background: `linear-gradient(to right, transparent, ${GOLD})` }} />
      <div style={{ width: 8, height: 8, background: GOLD, transform: "rotate(45deg)" }} />
      <div style={{ flex: 1, height: 1, background: `linear-gradient(to left, transparent, ${GOLD})` }} />
    </div>
  );
}

export default function WatsonLegacyGroup() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (href) => {
    setMenuOpen(false);
    if (href.startsWith("#")) {
      const id = href.replace("#", "");
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    } else {
      window.open(href, "_blank");
    }
  };

  return (
    <div style={{ background: BLACK, color: "#E8E0D0", fontFamily: "'Georgia', 'Times New Roman', serif", minHeight: "100vh", overflowX: "hidden" }}>

      {/* NAV */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        background: scrolled ? "rgba(10,10,10,0.96)" : "transparent",
        borderBottom: scrolled ? `1px solid ${GOLD_DIM}33` : "none",
        transition: "all 0.4s ease",
        padding: "0 24px",
      }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: 72 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <img src="/wlg-logo.jpeg" alt="Watson Legacy Group logo" style={{
              width: 44, height: 44, borderRadius: "50%",
              objectFit: "cover",
              border: `1px solid ${GOLD}`,
              flexShrink: 0,
            }} />
            <span className="nav-brand" style={{ fontSize: 13, letterSpacing: 3, color: GOLD, fontFamily: "sans-serif", fontWeight: 600, textTransform: "uppercase" }}>
              Watson Legacy Group
            </span>
          </div>

          {/* Desktop nav */}
          <div className="desktop-nav" style={{ display: "flex", gap: 28, alignItems: "center" }}>
            {navLinks.map(link => (
              <button key={link.href} onClick={() => scrollTo(link.href)}
                style={{ background: "none", border: "none", color: "#C0B090", fontSize: 11, letterSpacing: 2, cursor: "pointer", fontFamily: "sans-serif", textTransform: "uppercase", padding: "4px 0", transition: "color 0.2s" }}
                onMouseEnter={e => e.target.style.color = GOLD}
                onMouseLeave={e => e.target.style.color = "#C0B090"}
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Mobile hamburger */}
          <button onClick={() => setMenuOpen(!menuOpen)} className="ham-btn"
            style={{ display: "none", background: "none", border: "none", color: GOLD, fontSize: 26, cursor: "pointer", padding: 8 }}
            aria-label="Open menu"
          >☰</button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div style={{ position: "fixed", inset: 0, zIndex: 200, background: "rgba(10,10,10,0.98)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 30 }}>
          <button onClick={() => setMenuOpen(false)} style={{ position: "absolute", top: 24, right: 24, background: "none", border: "none", color: GOLD, fontSize: 30, cursor: "pointer", padding: 8 }} aria-label="Close menu">✕</button>
          {navLinks.map(link => (
            <button key={link.href} onClick={() => scrollTo(link.href)}
              style={{ background: "none", border: "none", color: "#E8E0D0", fontSize: 22, letterSpacing: 4, cursor: "pointer", fontFamily: "Georgia, serif", textTransform: "uppercase" }}
            >{link.label}</button>
          ))}
        </div>
      )}

      {/* HERO */}
      <section id="home" style={{ position: "relative", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, background: `radial-gradient(ellipse at 30% 50%, rgba(201,168,76,0.08) 0%, transparent 60%), radial-gradient(ellipse at 70% 80%, rgba(201,168,76,0.05) 0%, transparent 50%), ${BLACK}` }} />
        <div style={{ position: "absolute", inset: 0, backgroundImage: `linear-gradient(${GOLD}08 1px, transparent 1px), linear-gradient(90deg, ${GOLD}08 1px, transparent 1px)`, backgroundSize: "80px 80px" }} />

        <div style={{ position: "relative", textAlign: "center", padding: "120px 24px 80px", maxWidth: 900, margin: "0 auto" }}>
          <div style={{ marginBottom: 40, display: "flex", justifyContent: "center" }}>
            <img src="/wlg-logo.jpeg" alt="Watson Legacy Group logo" style={{
              width: 160, height: 160,
              borderRadius: "50%",
              objectFit: "cover",
              boxShadow: `0 0 50px ${GOLD}40`,
              animation: "pulse 4s ease-in-out infinite",
            }} />
          </div>

          <div style={{ fontSize: 11, letterSpacing: 8, color: GOLD_DIM, fontFamily: "sans-serif", marginBottom: 24, textTransform: "uppercase" }}>
            Watson Legacy Group
          </div>

          <h1 style={{
            fontSize: "clamp(36px, 7vw, 88px)",
            fontWeight: "normal",
            lineHeight: 1.05,
            margin: "0 0 32px",
            letterSpacing: "-1px",
            color: "#F5EFE0",
          }}>
            We Don&apos;t Just<br />
            <span style={{ color: GOLD, fontStyle: "italic" }}>Build Businesses.</span><br />
            We Build Dynasties.
          </h1>

          <p style={{ fontSize: 16, lineHeight: 1.8, color: "#A09070", maxWidth: 560, margin: "0 auto 48px", fontFamily: "sans-serif" }}>
            Music. Technology. Publishing. Creator Networks. One empire. One legacy. Built to last generations.
          </p>

          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
            <button onClick={() => scrollTo("#ventures")}
              style={{ background: GOLD, color: BLACK, border: "none", padding: "14px 36px", fontSize: 11, letterSpacing: 3, cursor: "pointer", fontFamily: "sans-serif", fontWeight: 700, textTransform: "uppercase", transition: "all 0.2s" }}
              onMouseEnter={e => { e.target.style.background = GOLD_LIGHT; e.target.style.transform = "translateY(-2px)"; }}
              onMouseLeave={e => { e.target.style.background = GOLD; e.target.style.transform = "translateY(0)"; }}
            >
              Explore WLG
            </button>
            <button onClick={() => scrollTo("#contact")}
              style={{ background: "transparent", color: GOLD, border: `1px solid ${GOLD}`, padding: "14px 36px", fontSize: 11, letterSpacing: 3, cursor: "pointer", fontFamily: "sans-serif", fontWeight: 700, textTransform: "uppercase", transition: "all 0.2s" }}
              onMouseEnter={e => { e.target.style.background = "rgba(201,168,76,0.08)"; }}
              onMouseLeave={e => { e.target.style.background = "transparent"; }}
            >
              Contact Us
            </button>
          </div>
        </div>

        <div style={{ position: "absolute", bottom: 32, left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: 8, animation: "bounce 2s ease-in-out infinite" }}>
          <div style={{ width: 1, height: 40, background: `linear-gradient(to bottom, transparent, ${GOLD})` }} />
          <div style={{ fontSize: 9, letterSpacing: 3, color: GOLD_DIM, fontFamily: "sans-serif" }}>SCROLL</div>
        </div>
      </section>

      {/* INTRO VIDEO */}
      <section id="intro" style={{ padding: "100px 24px", maxWidth: 1000, margin: "0 auto", textAlign: "center" }}>
        <FadeIn>
          <div style={{ fontSize: 10, letterSpacing: 6, color: GOLD, fontFamily: "sans-serif", marginBottom: 16 }}>WATCH — THE LEGACY</div>
          <h2 style={{ fontSize: "clamp(28px, 4vw, 48px)", fontWeight: "normal", margin: "0 0 16px", lineHeight: 1.2, color: "#D4B860" }}>
            This Is <span style={{ color: GOLD, fontStyle: "italic" }}>Watson Legacy Group</span>
          </h2>
          <p style={{ fontSize: 15, color: "#807060", fontFamily: "sans-serif", marginBottom: 48, maxWidth: 520, margin: "0 auto 48px" }}>
            Press play. Understand the vision, the movement, and what it means to build a legacy.
          </p>
        </FadeIn>
        <FadeIn delay={0.2}>
          <div style={{
            position: "relative",
            padding: 8,
            border: `1px solid ${GOLD}40`,
            background: `${GOLD}05`,
            boxShadow: `0 0 50px ${GOLD}15`,
          }}>
            <div style={{ position: "absolute", top: -1, left: 40, right: 40, height: 2, background: GOLD }} />
            <div style={{ position: "relative", width: "100%", paddingBottom: "56.25%", height: 0, overflow: "hidden" }}>
              <iframe
                src="https://www.youtube.com/embed/pz4pCyRbpyQ"
                title="Watson Legacy Group — Intro"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", border: "none" }}
              />
            </div>
          </div>
        </FadeIn>
      </section>

      {/* WHO WE ARE */}
      <section id="who" style={{ padding: "100px 24px", maxWidth: 1000, margin: "0 auto" }}>
        <FadeIn>
          <div style={{ fontSize: 10, letterSpacing: 6, color: GOLD, fontFamily: "sans-serif", marginBottom: 16 }}>01 — WHO WE ARE</div>
          <h2 style={{ fontSize: "clamp(36px, 5vw, 64px)", fontWeight: "normal", margin: "0 0 32px", lineHeight: 1.1, color: "#D4B860" }}>
            A New Class of<br /><span style={{ color: GOLD, fontStyle: "italic" }}>Apex Leaders</span>
          </h2>
        </FadeIn>
        <GoldDivider />
        <FadeIn delay={0.2}>
          <p style={{ fontSize: 18, lineHeight: 2, color: "#C0B090", maxWidth: 780, fontFamily: "sans-serif", fontWeight: 300 }}>
            Discover unparalleled sophistication and efficiency as you streamline your professional endeavors. At Watson Legacy Group, we don&apos;t just chase success — we architect it.
          </p>
        </FadeIn>
        <FadeIn delay={0.3}>
          <div style={{ marginTop: 48, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 1, background: "rgba(201,168,76,0.12)" }}>
            {[
              { num: "6", label: "Active Verticals" },
              { num: "∞", label: "Global Reach" },
              { num: "1", label: "Mission: Legacy" },
            ].map(stat => (
              <div key={stat.label} style={{ background: NEAR_BLACK, padding: "40px 32px", textAlign: "center" }}>
                <div style={{ fontSize: 48, color: GOLD, fontStyle: "italic", marginBottom: 8 }}>{stat.num}</div>
                <div style={{ fontSize: 10, letterSpacing: 4, color: "#807060", fontFamily: "sans-serif", textTransform: "uppercase" }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </FadeIn>
      </section>

      {/* MISSION */}
      <section id="mission" style={{ background: NEAR_BLACK, padding: "100px 24px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: `linear-gradient(to right, transparent, rgba(201,168,76,0.4), transparent)` }} />
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 1, background: `linear-gradient(to right, transparent, rgba(201,168,76,0.4), transparent)` }} />
        <div style={{ position: "absolute", top: "-50%", right: "-20%", width: "60vw", height: "60vw", borderRadius: "50%", background: "radial-gradient(circle, rgba(201,168,76,0.04) 0%, transparent 70%)", pointerEvents: "none" }} />

        <div style={{ maxWidth: 900, margin: "0 auto", position: "relative" }}>
          <FadeIn>
            <div style={{ fontSize: 10, letterSpacing: 6, color: GOLD, fontFamily: "sans-serif", marginBottom: 16, textAlign: "center" }}>02 — MISSION STATEMENT</div>
            <h2 style={{ fontSize: "clamp(28px, 4vw, 52px)", fontWeight: "normal", textAlign: "center", margin: "0 0 48px", lineHeight: 1.2, color: "#D4B860" }}>
              Watson Legacy Group&apos;s<br /><span style={{ color: GOLD, fontStyle: "italic" }}>Interoception Self-Mastery</span><br />Programming Experience
            </h2>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div className="mission-box" style={{ border: "1px solid rgba(201,168,76,0.3)", padding: "48px", background: "rgba(201,168,76,0.03)", position: "relative" }}>
              <div style={{ position: "absolute", top: -1, left: 40, right: 40, height: 2, background: GOLD }} />
              {[
                "At Watson Legacy Group, we're not just building businesses—we're building dynasties. We don't just chase success—we architect it.",
                "Our mission is to create a new class of Apex leaders—visionaries, disruptors, and power players who understand that true dominance starts with raising their frequency and mastering the essence of their existence—mind, body, and soul.",
                "Through books, music, technology, and business, we provide the blueprint to elevate your mentality, wealth, and influence. This isn't just about financial freedom—it's about legacy, control, and ownership at the highest level.",
                "WLG is more than a brand—it's a revelation. A movement for those who refuse to settle, refuse to follow, and refuse to play small. We're here to shift the culture, rewrite the rules, and create generational power that stands the test of time.",
              ].map((para, i) => (
                <p key={i} style={{ fontSize: 16, lineHeight: 2, color: "#C0B090", fontFamily: "sans-serif", marginBottom: i < 3 ? 24 : 0 }}>
                  {para}
                </p>
              ))}
            </div>
          </FadeIn>

          <FadeIn delay={0.4}>
            <div style={{ marginTop: 48, textAlign: "center" }}>
              <p style={{ fontSize: 22, fontStyle: "italic", color: GOLD, lineHeight: 1.8, marginBottom: 16 }}>
                &ldquo;We don&apos;t just influence — we influence the influencers.&rdquo;
              </p>
              <p style={{ fontSize: 14, color: "#807060", fontFamily: "sans-serif", letterSpacing: 2 }}>
                You&apos;re either building your legacy or being used for someone else&apos;s.
              </p>
              <p style={{ fontSize: 18, color: "#E8E0D0", fontFamily: "sans-serif", marginTop: 16, fontWeight: 600 }}>
                We choose to build. What about you?
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* VENTURES */}
      <section id="ventures" style={{ padding: "100px 24px", maxWidth: 1200, margin: "0 auto" }}>
        <FadeIn>
          <div style={{ fontSize: 10, letterSpacing: 6, color: GOLD, fontFamily: "sans-serif", marginBottom: 16 }}>03 — OUR VENTURES</div>
          <h2 style={{ fontSize: "clamp(32px, 5vw, 60px)", fontWeight: "normal", margin: "0 0 16px", color: "#D4B860" }}>
            The <span style={{ color: GOLD, fontStyle: "italic" }}>Empire</span>
          </h2>
          <p style={{ fontSize: 15, color: "#807060", fontFamily: "sans-serif", marginBottom: 60, maxWidth: 500 }}>
            Multiple verticals. One vision. Built for generational dominance.
          </p>
        </FadeIn>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 2, background: "rgba(201,168,76,0.1)" }}>
          {ventures.map((v, i) => (
            <FadeIn key={v.title} delay={i * 0.1}>
              <div style={{ background: NEAR_BLACK, padding: "40px 32px", height: "100%", position: "relative", transition: "all 0.3s", cursor: "pointer" }}
                onClick={() => scrollTo(v.url)}
                onMouseEnter={e => { e.currentTarget.style.background = DARK; e.currentTarget.style.transform = "translateY(-4px)"; }}
                onMouseLeave={e => { e.currentTarget.style.background = NEAR_BLACK; e.currentTarget.style.transform = "translateY(0)"; }}
              >
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(to right, ${GOLD}, transparent)`, opacity: 0.6 }} />
                <div style={{ fontSize: 10, letterSpacing: 3, color: GOLD_DIM, fontFamily: "sans-serif", marginBottom: 20, fontWeight: 600 }}>{v.tag}</div>
                <div style={{ fontSize: 32, marginBottom: 16 }}>{v.icon}</div>
                <h3 style={{ fontSize: 22, fontWeight: "normal", margin: "0 0 6px", color: "#EFE6D2" }}>{v.title}</h3>
                <div style={{ fontSize: 12, color: GOLD_DIM, fontFamily: "sans-serif", marginBottom: 16, letterSpacing: 1 }}>{v.subtitle}</div>
                <p style={{ fontSize: 14, lineHeight: 1.8, color: "#807060", fontFamily: "sans-serif", margin: 0 }}>{v.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* MUSIC */}
      <section id="music" style={{ background: NEAR_BLACK, padding: "100px 24px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: `linear-gradient(to right, transparent, rgba(201,168,76,0.4), transparent)` }} />
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <FadeIn>
            <div style={{ fontSize: 10, letterSpacing: 6, color: GOLD, fontFamily: "sans-serif", marginBottom: 16 }}>04 — MUSIC & MEDIA</div>
            <h2 style={{ fontSize: "clamp(32px, 5vw, 60px)", fontWeight: "normal", margin: "0 0 16px", color: "#D4B860" }}>
              <span style={{ color: GOLD, fontStyle: "italic" }}>Ya Boy Rick</span><br />Under Watson Legacy Group
            </h2>
            <p style={{ fontSize: 15, color: "#807060", fontFamily: "sans-serif", maxWidth: 540, marginBottom: 60, lineHeight: 1.8 }}>
              A long list of albums available on all streaming platforms — plus books, audiobooks, and digital releases. The full WLG catalog, everywhere you listen.
            </p>
          </FadeIn>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 16 }}>
            {streamingPlatforms.map((p, i) => (
              <FadeIn key={p.name} delay={i * 0.06}>
                <a href={p.url} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none", display: "block" }}>
                  <div style={{ border: "1px solid rgba(201,168,76,0.25)", padding: "24px 20px", textAlign: "center", transition: "all 0.3s", cursor: "pointer" }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = GOLD; e.currentTarget.style.background = "rgba(201,168,76,0.06)"; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(201,168,76,0.25)"; e.currentTarget.style.background = "transparent"; }}
                  >
                    <div style={{ fontSize: 10, letterSpacing: 3, color: "#A09070", fontFamily: "sans-serif", textTransform: "uppercase" }}>{p.name}</div>
                  </div>
                </a>
              </FadeIn>
            ))}
          </div>

          <FadeIn delay={0.3}>
            <p style={{ marginTop: 40, fontSize: 13, color: "#605040", fontFamily: "sans-serif", textAlign: "center", letterSpacing: 1 }}>
              Search &ldquo;Ya Boy Rick&rdquo; on your favorite platform 🎵
            </p>
          </FadeIn>
        </div>
      </section>

      {/* BOOKS & PLATFORMS */}
      <section id="books" style={{ padding: "100px 24px", maxWidth: 1200, margin: "0 auto" }}>
        <FadeIn>
          <div style={{ fontSize: 10, letterSpacing: 6, color: GOLD, fontFamily: "sans-serif", marginBottom: 16 }}>05 — BOOKS, COURSES & MORE</div>
          <h2 style={{ fontSize: "clamp(32px, 5vw, 60px)", fontWeight: "normal", margin: "0 0 16px", color: "#D4B860" }}>
            The <span style={{ color: GOLD, fontStyle: "italic" }}>Blueprint</span><br />Is Everywhere
          </h2>
          <p style={{ fontSize: 15, color: "#807060", fontFamily: "sans-serif", maxWidth: 540, marginBottom: 60, lineHeight: 1.8 }}>
            A long list of books available on Amazon by Ya Boy Rick under Watson Legacy Group. Audiobooks on Google Play Books. Courses on Stan Store. Live events on Eventbrite. The blueprint is everywhere.
          </p>
        </FadeIn>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 2, background: "rgba(201,168,76,0.1)" }}>
          {platforms.map((p, i) => (
            <FadeIn key={p.name} delay={i * 0.08}>
              <a href={p.url} target={p.url.startsWith("#") ? "_self" : "_blank"} rel="noopener noreferrer" style={{ textDecoration: "none" }}>
                <div style={{ background: NEAR_BLACK, padding: "36px 28px", display: "flex", alignItems: "center", gap: 20, transition: "all 0.3s", cursor: "pointer", height: "100%" }}
                  onMouseEnter={e => { e.currentTarget.style.background = DARK; }}
                  onMouseLeave={e => { e.currentTarget.style.background = NEAR_BLACK; }}
                >
                  <div style={{ fontSize: 28, flexShrink: 0 }}>{p.icon}</div>
                  <div>
                    <div style={{ fontSize: 14, color: "#E8E0D0", fontFamily: "sans-serif", fontWeight: 600, marginBottom: 4 }}>{p.name}</div>
                    <div style={{ fontSize: 12, color: "#807060", fontFamily: "sans-serif", marginBottom: 6 }}>{p.desc}</div>
                    <div style={{ fontSize: 10, color: GOLD_DIM, fontFamily: "sans-serif", letterSpacing: 2 }}>VISIT PLATFORM →</div>
                  </div>
                </div>
              </a>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" style={{ background: NEAR_BLACK, padding: "100px 24px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: `linear-gradient(to right, transparent, rgba(201,168,76,0.4), transparent)` }} />
        <div style={{ position: "absolute", bottom: "0", left: "50%", transform: "translateX(-50%)", width: "80vw", height: "80vw", maxWidth: 600, borderRadius: "50%", background: "radial-gradient(circle, rgba(201,168,76,0.04) 0%, transparent 70%)", pointerEvents: "none" }} />

        <div style={{ maxWidth: 700, margin: "0 auto", textAlign: "center", position: "relative" }}>
          <FadeIn>
            <div style={{ fontSize: 10, letterSpacing: 6, color: GOLD, fontFamily: "sans-serif", marginBottom: 24 }}>06 — CONTACT US</div>

            <img src="/wlg-logo.jpeg" alt="Watson Legacy Group logo" style={{ width: 100, height: 100, borderRadius: "50%", objectFit: "cover", margin: "0 auto 40px", display: "block", boxShadow: "0 0 30px rgba(201,168,76,0.25)" }} />

            <h2 style={{ fontSize: "clamp(32px, 5vw, 60px)", fontWeight: "normal", margin: "0 0 24px", lineHeight: 1.1, color: "#D4B860" }}>
              Ready to Build<br /><span style={{ color: GOLD, fontStyle: "italic" }}>Your Legacy?</span>
            </h2>
            <p style={{ fontSize: 16, lineHeight: 1.8, color: "#A09070", fontFamily: "sans-serif", marginBottom: 48 }}>
              Business inquiries, partnerships, and collaborations. Let&apos;s connect.
            </p>
          </FadeIn>

          <FadeIn delay={0.2}>
            <ContactForm />
          </FadeIn>

          <FadeIn delay={0.3}>
            <div style={{ marginTop: 64, display: "flex", justifyContent: "center", gap: 32, flexWrap: "wrap" }}>
              {[
                { label: "Email", value: "WatsonLegacyGroup@gmail.com", href: "mailto:WatsonLegacyGroup@gmail.com" },
                { label: "Instagram", value: "@youngrickon1", href: "https://instagram.com/youngrickon1" },
              ].map(item => (
                <a key={item.label} href={item.href} target="_blank" rel="noopener noreferrer" style={{ textAlign: "center", textDecoration: "none" }}>
                  <div style={{ fontSize: 9, letterSpacing: 4, color: GOLD_DIM, fontFamily: "sans-serif", marginBottom: 6 }}>{item.label}</div>
                  <div style={{ fontSize: 13, color: "#C0B090", fontFamily: "sans-serif" }}>{item.value}</div>
                </a>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: BLACK, borderTop: "1px solid rgba(201,168,76,0.15)", padding: "40px 24px", textAlign: "center" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ fontSize: 10, letterSpacing: 4, color: GOLD_DIM, fontFamily: "sans-serif", marginBottom: 16 }}>WATSON LEGACY GROUP</div>
          <p style={{ fontSize: 12, color: "#404030", fontFamily: "sans-serif", margin: 0 }}>
            © {new Date().getFullYear()} Watson Legacy Group. All Rights Reserved. Building dynasties since day one.
          </p>
        </div>
      </footer>

      <style jsx global>{`
        @keyframes pulse { 0%, 100% { box-shadow: 0 0 40px rgba(201,168,76,0.2); } 50% { box-shadow: 0 0 60px rgba(201,168,76,0.35); } }
        @keyframes bounce { 0%, 100% { transform: translateX(-50%) translateY(0); } 50% { transform: translateX(-50%) translateY(-8px); } }
        @media (max-width: 820px) {
          .desktop-nav { display: none !important; }
          .ham-btn { display: block !important; }
          .nav-brand { font-size: 10px !important; }
          .mission-box { padding: 28px 20px !important; }
        }
      `}</style>
    </div>
  );
}

function ContactForm() {
  const [sent, setSent] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSend = () => {
    const subject = encodeURIComponent(`WLG Website Inquiry from ${name || "Visitor"}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
    window.location.href = `mailto:WatsonLegacyGroup@gmail.com?subject=${subject}&body=${body}`;
    setSent(true);
  };

  const inputStyle = {
    background: "rgba(201,168,76,0.05)",
    border: "1px solid rgba(201,168,76,0.25)",
    color: "#E8E0D0",
    padding: "16px 20px",
    fontSize: 14,
    fontFamily: "sans-serif",
    outline: "none",
    width: "100%",
    transition: "border-color 0.2s",
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16, maxWidth: 500, margin: "0 auto" }}>
      <input placeholder="Your Name" value={name} onChange={e => setName(e.target.value)}
        style={inputStyle}
        onFocus={e => e.target.style.borderColor = "#C9A84C"}
        onBlur={e => e.target.style.borderColor = "rgba(201,168,76,0.25)"}
      />
      <input placeholder="Email Address" type="email" value={email} onChange={e => setEmail(e.target.value)}
        style={inputStyle}
        onFocus={e => e.target.style.borderColor = "#C9A84C"}
        onBlur={e => e.target.style.borderColor = "rgba(201,168,76,0.25)"}
      />
      <textarea placeholder="Your message..." rows={5} value={message} onChange={e => setMessage(e.target.value)}
        style={{ ...inputStyle, resize: "vertical" }}
        onFocus={e => e.target.style.borderColor = "#C9A84C"}
        onBlur={e => e.target.style.borderColor = "rgba(201,168,76,0.25)"}
      />
      <button onClick={handleSend}
        style={{ background: "#C9A84C", color: "#0A0A0A", border: "none", padding: "18px 40px", fontSize: 11, letterSpacing: 4, cursor: "pointer", fontFamily: "sans-serif", fontWeight: 700, textTransform: "uppercase", transition: "all 0.2s", marginTop: 8 }}
        onMouseEnter={e => { e.target.style.background = "#E8C97A"; }}
        onMouseLeave={e => { e.target.style.background = "#C9A84C"; }}
      >
        {sent ? "✓ Opening Your Email App..." : "Send Message"}
      </button>
    </div>
  );
}
