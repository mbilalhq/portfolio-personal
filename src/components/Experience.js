import { Container } from "react-bootstrap";
import { useState, useRef } from "react";
import crmLogo from "../assets/img/crm_logo.bmp";
import ndmaLogo from "../assets/img/ndma.png";
import nutechLogo from "../assets/img/NUTECH_logo.png";

/* ── Logo animation CSS ── */
const LOGO_CSS = `
  .org-logo-wrap {
    width: 72px; height: 72px;
    display: flex; align-items: center; justify-content: center;
    flex-shrink: 0;
    transition: transform 0.4s ease;
    cursor: default;
  }
  .org-logo-wrap img {
    width: 100%; height: 100%;
    object-fit: contain;
    transition: transform 0.4s ease, filter 0.4s ease;
    border-radius: 10px;
  }
  .org-logo-wrap:hover {
    transform: scale(1.18) rotate(-3deg);
  }
  .org-logo-wrap:hover img {
    transform: scale(1.1) rotate(3deg);
    filter: brightness(1.2) drop-shadow(0 0 12px rgba(255,255,255,0.25));
  }
`;

if (!document.getElementById("experience-styles")) {
  const s = document.createElement("style");
  s.id = "experience-styles";
  s.textContent = LOGO_CSS;
  document.head.appendChild(s);
}

const EXPERIENCE_DATA = [
  {
    type: 'Final Year Project',
    role: 'Pulse-Engine — AI Powered Omni Channel CRM System',
    org: 'Rockville Technologies',
    period: '2025 — Present',
    color: '#ffd250',
    emoji: '🤝',
    orgLogo: crmLogo,
    points: [
      'Building an AI-powered omni-channel CRM unifying WhatsApp, Facebook & Instagram',
      'Designed cross-platform identity resolution to detect the same customer across channels',
      'Implemented LLM-driven context-aware response generation and sentiment-based escalation',
      'Architected backend with FastAPI + PostgreSQL, containerised via Docker, deployed on AWS',
    ],
  },
  {
    type: 'internship',
    role: 'AI / Software Engineering Intern',
    org: 'NDMA — National Disaster Management Authority',
    period: '2024',
    color: '#6edaff',
    emoji: '🏛️',
    orgLogo: ndmaLogo,
    points: [
      'Developed internal communication tools and web interfaces for field operations',
      'Built AI-assisted systems to support disaster response data processing',
      'Worked on full-stack web development for reporting and analytics dashboards',
      'Contributed to backend integrations and database management workflows',
    ],
  },
  {
    type: 'education',
    role: 'BS Computer Science',
    org: 'NUTECH — National University of Technology',
    period: '2022 — 2026',
    color: '#7fff6e',
    emoji: '🎓',
    orgLogo: nutechLogo,
    points: [
      'Final semester student with a strong focus on AI, backend systems & SaaS development',
      'Core studies: Data Structures, Algorithms, Machine Learning, Software Engineering',
      'Hands-on projects spanning full-stack web apps, ML models, and cloud deployments',
      'Active contributor to university tech community and collaborative development culture',
    ],
  },
];

function OrgLogo({ src, alt, color }) {
  const [err, setErr] = useState(false);

  if (err || !src) {
    return (
      <div className="org-logo-wrap">
        <span style={{ fontSize: 36 }}>🏢</span>
      </div>
    );
  }
  return (
    <div className="org-logo-wrap">
      <img src={src} alt={alt} onError={() => setErr(true)} />
    </div>
  );
}

export const Experience = () => (
  <section id="experience" style={{
    padding: '80px 0',
    position: 'relative',
    overflow: 'hidden',
  }}>
    {/* Ambient blobs */}
    <div style={{ position:'absolute', top:-100, left:-80, width:400, height:400, background:'radial-gradient(circle,rgba(255,210,80,0.05) 0%,transparent 70%)', pointerEvents:'none' }} />
    <div style={{ position:'absolute', bottom:-80, right:-80, width:380, height:380, background:'radial-gradient(circle,rgba(127,255,110,0.05) 0%,transparent 70%)', pointerEvents:'none' }} />

    <Container>
      {/* Header */}
      <div style={{ marginBottom: 44 }}>
        <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:10, fontFamily:"'JetBrains Mono',monospace", fontSize:10, letterSpacing:'0.3em', textTransform:'uppercase', color:'#606080' }}>
          <span style={{ width:24, height:1, background:'#606080', display:'block' }} />
          Background
        </div>
        <h2 style={{ fontSize:'clamp(28px,4.5vw,48px)', fontWeight:800, letterSpacing:'-0.03em', color:'#fff', lineHeight:1.05, margin:0 }}>
          Experience &
          <span style={{ display:'block', color:'transparent', WebkitTextStroke:'1.5px rgba(255,255,255,0.2)' }}>Education.</span>
        </h2>
        <p style={{ fontSize:14, lineHeight:1.75, color:'#8888a8', maxWidth:520, margin:'14px 0 0' }}>
          Where I've worked, studied, and what I've been building.
        </p>
      </div>

      {/* Cards */}
      <div style={{ display:'flex', flexDirection:'column', gap:20 }}>
        {EXPERIENCE_DATA.map((exp, i) => (
          <div
            key={i}
            style={{
              position:'relative',
              background:'rgba(255,255,255,0.025)',
              border:'1px solid rgba(255,255,255,0.08)',
              borderRadius:16,
              overflow:'hidden',
              transition:'border-color 0.25s, box-shadow 0.25s, transform 0.25s',
            }}
            onMouseOver={e => {
              e.currentTarget.style.borderColor = `${exp.color}35`;
              e.currentTarget.style.boxShadow = `0 8px 32px ${exp.color}12`;
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseOut={e => {
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
              e.currentTarget.style.boxShadow = 'none';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            {/* Top accent */}
            <div style={{ height:2, background:`linear-gradient(90deg,${exp.color},transparent)` }} />

            <div style={{ padding:'22px 26px' }}>
              {/* Top row: logo + role + org */}
              <div style={{ display:'flex', alignItems:'center', gap:14, marginBottom:16, flexWrap:'wrap' }}>
                <OrgLogo src={exp.orgLogo} alt={exp.org} color={exp.color} />
                <div style={{ flex:1, minWidth:180 }}>
                  <div style={{ display:'flex', alignItems:'center', gap:8, flexWrap:'wrap', marginBottom:3 }}>
                    <h3 style={{ fontSize:16, fontWeight:700, color:'#fff', margin:0, letterSpacing:'-0.01em' }}>{exp.role}</h3>
                    <span style={{
                      padding:'2px 9px', borderRadius:20,
                      background:`${exp.color}18`,
                      border:`1px solid ${exp.color}35`,
                      fontFamily:"'JetBrains Mono',monospace",
                      fontSize:9, color:exp.color,
                      letterSpacing:'0.1em', textTransform:'uppercase', whiteSpace:'nowrap',
                    }}>
                      {exp.type === 'education' ? 'Education' : exp.type === 'internship' ? 'Internship' : 'Collaboration'}
                    </span>
                  </div>
                  <div style={{ display:'flex', alignItems:'center', gap:10, flexWrap:'wrap' }}>
                    <span style={{ fontSize:13, color:exp.color, fontWeight:600 }}>{exp.org}</span>
                    <span style={{ width:3, height:3, borderRadius:'50%', background:'rgba(255,255,255,0.2)', display:'inline-block' }} />
                    <span style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:10.5, color:'#606080', letterSpacing:'0.06em' }}>{exp.period}</span>
                  </div>
                </div>
              </div>

              {/* Bullet points */}
              <div style={{ display:'flex', flexDirection:'column', gap:7 }}>
                {exp.points.map((pt, j) => (
                  <div key={j} style={{ display:'flex', gap:10, fontSize:13, color:'#b0b0c8', lineHeight:1.65 }}>
                    <span style={{ color:exp.color, fontFamily:"'JetBrains Mono',monospace", flexShrink:0, marginTop:2, fontSize:11 }}>→</span>
                    {pt}
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </Container>
  </section>
);
