import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import meter1 from "../assets/img/meter1.svg";
import meter2 from "../assets/img/meter2.svg";
import meter3 from "../assets/img/meter3.svg";
import {
  ChatQuoteFill, LightbulbFill, BriefcaseFill, LightningChargeFill
} from 'react-bootstrap-icons';
import { Container, Row, Col } from "react-bootstrap";
import TrackVisibility from 'react-on-screen';
import 'animate.css';

const responsive = {
  superLargeDesktop: { breakpoint: { max: 4000, min: 3000 }, items: 5 },
  desktop:           { breakpoint: { max: 3000, min: 1024 }, items: 3 },
  tablet:            { breakpoint: { max: 1024, min: 464 },  items: 2 },
  mobile:            { breakpoint: { max: 464,  min: 0 },    items: 1 },
};

const TECH_SKILLS = [
  { img: meter1, label: 'React & HTML/CSS' },
  { img: meter3, label: 'Python & FastAPI' },
  { img: meter2, label: 'Machine Learning / CNN' },
  { img: meter1, label: 'NLP & Gemini API' },
  { img: meter2, label: 'ChromaDB & Embeddings' },
  { img: meter3, label: 'SQL & Databases' },
  { img: meter1, label: 'Git & GitHub' },
];

const SOFT_SKILLS = [
  { icon: <ChatQuoteFill />,          label: 'Effective Communication', color: '#7fff6e' },
  { icon: <LightbulbFill />,          label: 'Strategic Problem Solving', color: '#6edaff' },
  { icon: <BriefcaseFill />,          label: 'Dedicated Work Ethic', color: '#ff6eb4' },
  { icon: <LightningChargeFill />,    label: 'Rapid Adaptability', color: '#ffd250' },
];

export const Skills = () => {
  return (
    <section
      id="skills"
      style={{
        background: 'linear-gradient(180deg,#0d0d18 0%,#0a0a0f 100%)',
        padding: '80px 0',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Ambient blobs */}
      <div style={{ position:'absolute', top:-100, left:-100, width:420, height:420, background:'radial-gradient(circle,rgba(127,255,110,0.06) 0%,transparent 70%)', pointerEvents:'none' }} />
      <div style={{ position:'absolute', bottom:-80, right:-80, width:380, height:380, background:'radial-gradient(circle,rgba(110,218,255,0.06) 0%,transparent 70%)', pointerEvents:'none' }} />

      <Container>
        <Row>
          <Col size={12}>
            <TrackVisibility>
              {({ isVisible }) => (
                <div style={{ opacity: 1 }}>

                  {/* ── Section Header ── */}
                  <div style={{ marginBottom: 40, textAlign:'center' }}>
                    <div style={{ display:'inline-flex', alignItems:'center', gap:10, marginBottom:10, fontFamily:"'JetBrains Mono',monospace", fontSize:10, letterSpacing:'0.3em', textTransform:'uppercase', color:'#606080' }}>
                      <span style={{ width:24, height:1, background:'#606080', display:'block' }} />
                      What I Bring
                      <span style={{ width:24, height:1, background:'#606080', display:'block' }} />
                    </div>
                    <h2 style={{ fontSize:'clamp(28px,4.5vw,48px)', fontWeight:800, letterSpacing:'-0.03em', color:'#fff', lineHeight:1.05, margin:0 }}>
                      Skills &
                      <span style={{ display:'block', color:'transparent', WebkitTextStroke:'1.5px rgba(255,255,255,0.2)' }}>Expertise.</span>
                    </h2>
                    <p style={{ fontSize:14, lineHeight:1.75, color:'#8888a8', maxWidth:520, margin:'14px auto 0', fontFamily:"'Inter',sans-serif" }}>
                      Modern web development, AI/ML, and the soft skills to bring them together effectively.
                    </p>
                  </div>

                  {/* ── Technical Skills Carousel ── */}
                  <div style={{ marginBottom: 48 }}>
                    <div style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:9.5, letterSpacing:'0.25em', textTransform:'uppercase', color:'#7fff6e', marginBottom:20, textAlign:'center' }}>
                      ⚡ Technical Skills
                    </div>
                    <Carousel
                      responsive={responsive}
                      infinite={true}
                      autoPlay={true}
                      autoPlaySpeed={3000}
                      containerClass=""
                      itemClass=""
                    >
                      {TECH_SKILLS.map((skill) => (
                        <div key={skill.label} style={{ textAlign:'center', padding:'0 12px' }}>
                          <div style={{
                            background:'rgba(255,255,255,0.03)',
                            border:'1px solid rgba(255,255,255,0.08)',
                            borderRadius:16,
                            padding:'28px 16px 22px',
                            transition:'all 0.25s ease',
                            cursor:'default',
                          }}
                            onMouseOver={e => {
                              e.currentTarget.style.borderColor='rgba(127,255,110,0.3)';
                              e.currentTarget.style.background='rgba(127,255,110,0.04)';
                              e.currentTarget.style.transform='translateY(-4px)';
                              e.currentTarget.style.boxShadow='0 8px 28px rgba(127,255,110,0.12)';
                            }}
                            onMouseOut={e => {
                              e.currentTarget.style.borderColor='rgba(255,255,255,0.08)';
                              e.currentTarget.style.background='rgba(255,255,255,0.03)';
                              e.currentTarget.style.transform='translateY(0)';
                              e.currentTarget.style.boxShadow='none';
                            }}
                          >
                            <img
                              src={skill.img}
                              alt={skill.label}
                              style={{ width:'50%', maxWidth:100, margin:'0 auto 14px', display:'block', filter:'hue-rotate(120deg) saturate(0.7)' }}
                            />
                            <h5 style={{ fontSize:13.5, fontWeight:600, color:'#c0c0d8', margin:0, fontFamily:"'Inter',sans-serif" }}>{skill.label}</h5>
                          </div>
                        </div>
                      ))}
                    </Carousel>
                  </div>

                  {/* ── Soft Skills Grid ── */}
                  <div>
                    <div style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:9.5, letterSpacing:'0.25em', textTransform:'uppercase', color:'#6edaff', marginBottom:20, textAlign:'center' }}>
                      🤝 Soft Skills
                    </div>
                    <div style={{ display:'flex', justifyContent:'center', gap:16, flexWrap:'wrap' }}>
                      {SOFT_SKILLS.map((skill) => (
                        <div
                          key={skill.label}
                          style={{
                            background:'rgba(255,255,255,0.03)',
                            border:'1px solid rgba(255,255,255,0.08)',
                            borderRadius:16,
                            padding:'28px 20px',
                            width:200,
                            display:'flex',
                            flexDirection:'column',
                            alignItems:'center',
                            justifyContent:'center',
                            textAlign:'center',
                            transition:'all 0.25s ease',
                            cursor:'default',
                          }}
                          onMouseOver={e => {
                            e.currentTarget.style.borderColor=`${skill.color}50`;
                            e.currentTarget.style.background=`${skill.color}08`;
                            e.currentTarget.style.transform='translateY(-6px)';
                            e.currentTarget.style.boxShadow=`0 10px 30px ${skill.color}18`;
                          }}
                          onMouseOut={e => {
                            e.currentTarget.style.borderColor='rgba(255,255,255,0.08)';
                            e.currentTarget.style.background='rgba(255,255,255,0.03)';
                            e.currentTarget.style.transform='translateY(0)';
                            e.currentTarget.style.boxShadow='none';
                          }}
                        >
                          <div style={{ fontSize:40, color:skill.color, marginBottom:14, transition:'all 0.3s', lineHeight:1 }}>
                            {skill.icon}
                          </div>
                          <h5 style={{ fontSize:14, fontWeight:600, color:'#fff', margin:0, fontFamily:"'Inter',sans-serif" }}>{skill.label}</h5>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>
              )}
            </TrackVisibility>
          </Col>
        </Row>
      </Container>
    </section>
  );
};
