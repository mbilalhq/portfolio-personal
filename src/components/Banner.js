import { useState, useEffect, useCallback } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { ArrowRightCircle } from 'react-bootstrap-icons';

/* ── Animated terminal that types out code lines ── */
const TERMINAL_LINES = [
  { text: "$ python bilal.py", color: "#7fff6e", delay: 0 },
  { text: "  name       = 'Muhammad Bilal Hashmi'", color: "#c0c0d8", delay: 600 },
  { text: "  role       = 'Full-Stack Developer'", color: "#c0c0d8", delay: 1100 },
  { text: "  stack      = ['Python','FastAPI','React']", color: "#c0c0d8", delay: 1600 },
  { text: "  ai_focus   = ['LLMs','CNN','NLP']", color: "#c0c0d8", delay: 2100 },
  { text: "  location   = 'Islamabad, Pakistan 🇵🇰'", color: "#c0c0d8", delay: 2600 },
  { text: "  status     = 'Open to opportunities ✅'", color: "#6edaff", delay: 3100 },
  { text: "", color: "", delay: 3600 },
  { text: ">>> bilal.build('something great')", color: "#ffd250", delay: 3900 },
  { text: "  ✓ Shipped!", color: "#7fff6e", delay: 4600 },
];

function Terminal() {
  const [visibleLines, setVisibleLines] = useState(0);
  const [cursor, setCursor] = useState(true);

  useEffect(() => {
    const timers = TERMINAL_LINES.map((_, i) =>
      setTimeout(() => setVisibleLines(i + 1), TERMINAL_LINES[i].delay)
    );
    const cursorTimer = setInterval(() => setCursor(c => !c), 530);
    return () => { timers.forEach(clearTimeout); clearInterval(cursorTimer); };
  }, []);

  return (
    <div style={{
      background: 'rgba(10,10,15,0.85)',
      border: '1px solid rgba(255,255,255,0.1)',
      borderRadius: 16,
      overflow: 'hidden',
      boxShadow: '0 24px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(127,255,110,0.08), 0 0 40px rgba(127,255,110,0.06)',
      backdropFilter: 'blur(12px)',
      width: '100%',
      maxWidth: 480,
      margin: '0 auto',
      position: 'relative',
    }}>
      {/* Top shine effect */}
      <div style={{
        position: 'absolute', top: 0, left: '-75%', width: '50%', height: 1,
        background: 'linear-gradient(90deg, transparent, rgba(127,255,110,0.4) 40%, rgba(110,218,255,0.5) 60%, transparent)',
        animation: 'shineSlide 3.5s ease-in-out infinite',
        zIndex: 2, pointerEvents: 'none', filter: 'blur(2px)',
      }} />
      {/* Glow band along top edge */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 3,
        background: 'linear-gradient(90deg, transparent, rgba(127,255,110,0.35) 25%, rgba(110,218,255,0.45) 50%, rgba(255,110,180,0.25) 75%, transparent)',
        filter: 'blur(3px)', zIndex: 2, pointerEvents: 'none',
      }} />
      {/* Traffic lights */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 7, padding: '12px 16px', borderBottom: '1px solid rgba(255,255,255,0.07)', background: 'rgba(255,255,255,0.03)' }}>
        {['#ff5f57', '#febc2e', '#28c840'].map(c => (
          <div key={c} style={{ width: 12, height: 12, borderRadius: '50%', background: c, opacity: 0.85 }} />
        ))}
        <span style={{ marginLeft: 8, fontFamily: "'JetBrains Mono',monospace", fontSize: 11, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.05em' }}>
          bilal.py
        </span>
      </div>
      {/* Code area */}
      <div style={{ padding: '18px 20px', minHeight: 260, fontFamily: "'JetBrains Mono',monospace", fontSize: 12.5, lineHeight: 1.9 }}>
        {TERMINAL_LINES.slice(0, visibleLines).map((line, i) => (
          <div key={i} style={{ color: line.color || 'transparent', minHeight: '1.9em', whiteSpace: 'pre-wrap', wordBreak: 'break-all' }}>
            {line.text}
            {i === visibleLines - 1 && cursor && (
              <span style={{ display: 'inline-block', width: 8, height: '1em', background: '#7fff6e', marginLeft: 2, verticalAlign: 'text-bottom' }} />
            )}
          </div>
        ))}
        {visibleLines < TERMINAL_LINES.length && cursor && visibleLines === 0 && (
          <span style={{ display: 'inline-block', width: 8, height: '1em', background: '#7fff6e' }} />
        )}
      </div>
    </div>
  );
}

const TO_ROTATE = ["Full-Stack Developer", "FastAPI Developer", "ML/AI Enthusiast", "Digital Innovator"];
const PERIOD = 1000;

export const Banner = () => {
  const [loopNum, setLoopNum] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [text, setText] = useState('');
  const [delta, setDelta] = useState(100 - Math.random() * 50);

  const tick = useCallback(() => {
    const i = loopNum % TO_ROTATE.length;
    const fullText = TO_ROTATE[i];
    const updatedText = isDeleting
      ? fullText.substring(0, text.length - 1)
      : fullText.substring(0, text.length + 1);
    setText(updatedText);
    if (isDeleting) setDelta(prev => prev / 2);
    if (!isDeleting && updatedText === fullText) { setIsDeleting(true); setDelta(PERIOD); }
    else if (isDeleting && updatedText === '') { setIsDeleting(false); setLoopNum(loopNum + 1); setDelta(200); }
  }, [isDeleting, loopNum, text]);

  useEffect(() => {
    const ticker = setInterval(tick, delta);
    return () => clearInterval(ticker);
  }, [text, delta, tick]);

  return (
    <section id="home" style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      position: 'relative',
      overflow: 'hidden',
      padding: '120px 0 80px',
    }}>
      {/* Blobs */}
      <div style={{ position: 'absolute', top: -150, left: -150, width: 600, height: 600, background: 'radial-gradient(circle,rgba(127,255,110,0.07) 0%,transparent 70%)', pointerEvents: 'none', zIndex: 0 }} />
      <div style={{ position: 'absolute', bottom: -100, right: -100, width: 500, height: 500, background: 'radial-gradient(circle,rgba(110,218,255,0.07) 0%,transparent 70%)', pointerEvents: 'none', zIndex: 0 }} />
      <div style={{ position: 'absolute', top: '40%', left: '35%', width: 350, height: 350, background: 'radial-gradient(circle,rgba(255,110,180,0.05) 0%,transparent 70%)', pointerEvents: 'none', zIndex: 0 }} />

      <Container style={{ position: 'relative', zIndex: 1 }}>
        <Row className="align-items-center" style={{ gap: '48px 0' }}>

          {/* LEFT */}
          <Col xs={12} md={6} xl={7}>
            <div>

              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 18, fontFamily: "'JetBrains Mono',monospace", fontSize: 10.5, letterSpacing: '0.28em', textTransform: 'uppercase', color: '#7fff6e' }}>
                <span style={{ display: 'block', width: 28, height: 1, background: '#7fff6e' }} />
                Welcome to my Portfolio
              </div>

              <h1 style={{ fontSize: 'clamp(34px,5.5vw,68px)', fontWeight: 800, lineHeight: 1.05, letterSpacing: '-0.03em', color: '#fff', marginBottom: 12 }}>
                I'm Bilal Hashmi,
                <br />
                <span style={{ color: 'transparent', WebkitTextStroke: '1.5px rgba(255,255,255,0.22)' }}>a </span>
                <span style={{ background: 'linear-gradient(90deg,#7fff6e,#6edaff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', borderRight: '3px solid #7fff6e', paddingRight: 4 }}>
                  {text}
                </span>
              </h1>

              <p style={{ fontSize: 14.5, lineHeight: 1.8, color: '#c0c0d8', maxWidth: 520, marginBottom: 0 }}>
                I enjoy turning ideas into real products — whether it's a sleek web app,
                an intelligent API, or an ML-powered feature. I work with Python, FastAPI,
                React, and love building things that are both useful and well-crafted.
              </p>

              <div style={{ display: 'flex', gap: 14, alignItems: 'center', marginTop: 36, flexWrap: 'wrap' }}>
                <button
                  onClick={() => document.getElementById('connect')?.scrollIntoView({ behavior: 'smooth' })}
                  style={{ display: 'inline-flex', alignItems: 'center', gap: 10, padding: '12px 26px', background: 'linear-gradient(90deg,#7fff6e,#6edaff)', border: 'none', borderRadius: 50, color: '#0a0a0f', fontWeight: 700, fontSize: 14, fontFamily: "'JetBrains Mono',monospace", cursor: 'pointer', transition: 'transform 0.2s, box-shadow 0.2s', boxShadow: '0 0 24px rgba(127,255,110,0.3)' }}
                  onMouseOver={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 8px 32px rgba(127,255,110,0.45)'; }}
                  onMouseOut={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 0 24px rgba(127,255,110,0.3)'; }}
                >
                  Let's Connect <ArrowRightCircle size={18} />
                </button>
                <div style={{ display: 'flex', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.15)', borderRadius: 50, background: 'rgba(255,255,255,0.04)', backdropFilter: 'blur(8px)' }}>
                  <a href="/resume.html"
                    style={{ textDecoration: 'none', color: '#fff', padding: '11px 6px 11px 22px', fontWeight: 600, fontSize: 13.5, fontFamily: "'JetBrains Mono',monospace", transition: 'background 0.2s', letterSpacing: '0.02em' }}
                    onMouseOver={e => e.currentTarget.style.background = 'rgba(255,255,255,0.08)'}
                    onMouseOut={e => e.currentTarget.style.background = 'transparent'}
                  >View</a>
                  <span style={{ width: 1, background: 'rgba(255,255,255,0.12)', margin: '8px 0' }} />
                  <a href="/resume-custom.html"
                    style={{ textDecoration: 'none', color: '#a8a8c0', padding: '11px 22px 11px 6px', fontWeight: 600, fontSize: 13.5, fontFamily: "'JetBrains Mono',monospace", transition: 'background 0.2s, color 0.2s', letterSpacing: '0.02em' }}
                    onMouseOver={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.08)'; e.currentTarget.style.color = '#fff'; }}
                    onMouseOut={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#a8a8c0'; }}
                  >Resume</a>
                </div>
              </div>

              {/* Stats */}
              <div style={{ display: 'flex', gap: 28, marginTop: 44, flexWrap: 'wrap' }}>
                {[{ num: '3+', label: 'Projects Shipped' }, { num: '10+', label: 'Technologies' }, { num: '2026', label: 'CS Graduate' }].map(s => (
                  <div key={s.label} style={{ borderLeft: '2px solid rgba(127,255,110,0.3)', paddingLeft: 14 }}>
                    <div style={{ fontSize: 22, fontWeight: 800, color: '#fff', letterSpacing: '-0.02em', lineHeight: 1.1 }}>{s.num}</div>
                    <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, color: '#606080', letterSpacing: '0.12em', textTransform: 'uppercase', marginTop: 2 }}>{s.label}</div>
                  </div>
                ))}
              </div>

            </div>
          </Col>

          {/* RIGHT — Terminal */}
          <Col xs={12} md={6} xl={5}>
            <Terminal />
          </Col>

        </Row>
      </Container>

      <style>{`
        @keyframes cursorBlink { 0%,100%{opacity:1} 50%{opacity:0} }
        @keyframes shineSlide { 0%{left:-75%} 100%{left:125%} }
      `}</style>
    </section>
  );
};