import { useState } from "react";
import { Col } from "react-bootstrap";
import Tilt from 'react-parallax-tilt';

export const ProjectCard = ({ title, description, fullDescription, features, imgUrl, tech, github, postLink, isFYP }) => {
  const [showModal, setShowModal] = useState(false);
  const [imgError, setImgError] = useState(false);

  const techArr = tech ? tech.split(',').map(t => t.trim()) : [];
  const borderColor = isFYP ? 'rgba(255,210,80,0.35)' : 'rgba(255,255,255,0.09)';
  const hoverBorder = isFYP ? 'rgba(255,210,80,0.55)' : 'rgba(110,218,255,0.3)';
  const hoverShadow = isFYP ? '0 12px 40px rgba(255,210,80,0.15), 0 0 0 1px rgba(255,210,80,0.2)' : '0 12px 40px rgba(110,218,255,0.1), 0 0 0 1px rgba(110,218,255,0.15)';
  const cardBg = isFYP ? 'rgba(255,210,80,0.03)' : 'rgba(255,255,255,0.025)';
  const imgAreaBg = isFYP ? 'linear-gradient(135deg,rgba(255,210,80,0.08),rgba(255,110,180,0.06))' : 'rgba(255,255,255,0.03)';

  return (
    <>
      <Col size={12} sm={6} md={4} style={{ marginBottom: 20 }}>
        <Tilt
          tiltMaxAngleX={10}
          tiltMaxAngleY={10}
          perspective={900}
          transitionSpeed={1200}
          scale={1.03}
          gyroscope={true}
          style={{ height: '100%' }}
        >
          <div
            onClick={() => setShowModal(true)}
            style={{
              height: '100%',
              background: cardBg,
              border: `1px solid ${borderColor}`,
              borderRadius: 16,
              overflow: 'hidden',
              cursor: 'pointer',
              transition: 'border-color 0.25s, box-shadow 0.25s',
              display: 'flex',
              flexDirection: 'column',
              position: 'relative',
            }}
            onMouseOver={e => {
              e.currentTarget.style.borderColor = hoverBorder;
              e.currentTarget.style.boxShadow = hoverShadow;
            }}
            onMouseOut={e => {
              e.currentTarget.style.borderColor = borderColor;
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            {isFYP && <div style={{ position:'absolute', top:0, left:0, right:0, height:2, background:'linear-gradient(90deg,#ffd250,#ff6eb4,#ffd250)', zIndex:5 }} />}

            {/* Image */}
            <div style={{ position:'relative', overflow:'hidden', height:180, background: imgAreaBg, flexShrink:0 }}>
              {isFYP && imgUrl && !imgError ? (
                <img
                  src={imgUrl} alt={title}
                  onError={() => setImgError(true)}
                  style={{ width:'100%', height:'100%', objectFit:'cover', transition:'transform 0.4s ease' }}
                  onMouseOver={e => e.currentTarget.style.transform='scale(1.06)'}
                  onMouseOut={e => e.currentTarget.style.transform='scale(1)'}
                />
              ) : isFYP ? (
                <div style={{ position:'absolute', inset:0, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:10 }}>
                  <div style={{ fontSize:52, lineHeight:1 }}>
                    <svg width="52" height="52" viewBox="0 0 64 64" fill="none"><rect width="64" height="64" rx="14" fill="rgba(255,210,80,0.12)"/><path d="M32 16v32M20 24h24M20 32h24M20 40h24" stroke="#ffd250" strokeWidth="2" strokeLinecap="round"/><circle cx="16" cy="24" r="3" fill="#6edaff"/><circle cx="16" cy="32" r="3" fill="#7fff6e"/><circle cx="16" cy="40" r="3" fill="#ff6eb4"/></svg>
                  </div>
                  <div style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:9.5, letterSpacing:'0.18em', textTransform:'uppercase', color:'rgba(255,210,80,0.6)', textAlign:'center' }}>Omni-Channel CRM</div>
                </div>
              ) : null}
              {!isFYP && (imgUrl && !imgError ? (
                <img
                  src={imgUrl} alt={title}
                  onError={() => setImgError(true)}
                  style={{ width:'100%', height:'100%', objectFit:'cover', transition:'transform 0.4s ease' }}
                  onMouseOver={e => e.currentTarget.style.transform='scale(1.06)'}
                  onMouseOut={e => e.currentTarget.style.transform='scale(1)'}
                />
              ) : (
                <div style={{ width:'100%', height:'100%', display:'flex', alignItems:'center', justifyContent:'center',
                  background:'linear-gradient(135deg,rgba(127,255,110,0.06),rgba(110,218,255,0.06))',
                  fontSize:42, userSelect:'none' }}>
                  💻
                </div>
              ))}
              {/* Overlay gradient */}
              <div style={{ position:'absolute', bottom:0, left:0, right:0, height:60, background:'linear-gradient(to top,rgba(17,17,24,0.9),transparent)', pointerEvents:'none' }} />
              {isFYP && <div style={{ position:'absolute', top:10, left:10, padding:'4px 10px', background:'rgba(255,210,80,0.15)', backdropFilter:'blur(8px)', border:'1px solid rgba(255,210,80,0.35)', borderRadius:20, fontSize:9, fontFamily:"'JetBrains Mono',monospace", color:'#ffd250', letterSpacing:'0.1em' }}>FYP</div>}
              {/* Click hint */}
              <div style={{
                position:'absolute', top:10, right:10,
                padding:'4px 10px',
                background:'rgba(0,0,0,0.6)', backdropFilter:'blur(8px)',
                border:'1px solid rgba(255,255,255,0.12)',
                borderRadius:20, fontSize:9.5,
                fontFamily:"'JetBrains Mono',monospace",
                color:'rgba(255,255,255,0.5)',
                letterSpacing:'0.1em',
              }}>
                VIEW →
              </div>
            </div>

            {/* Content */}
            <div style={{ padding:'18px 20px 20px', flex:1, display:'flex', flexDirection:'column', gap:8 }}>
              <h4 style={{ fontSize:15.5, fontWeight:700, color:'#fff', letterSpacing:'-0.01em', margin:0, lineHeight:1.25 }}>{title}</h4>
              <p style={{ fontSize:12.5, color:'#8888a8', lineHeight:1.65, margin:0, flex:1 }}>{description}</p>
              {/* Tech tags */}
              {techArr.length > 0 && (
                <div style={{ display:'flex', flexWrap:'wrap', gap:5, marginTop:4 }}>
                  {techArr.slice(0,3).map(t => (
                    <span key={t} style={{
                      padding:'2px 8px', borderRadius:5,
                      fontFamily:"'JetBrains Mono',monospace", fontSize:9.5,
                      color:'#6edaff', background:'rgba(110,218,255,0.08)',
                      border:'1px solid rgba(110,218,255,0.14)',
                    }}>{t}</span>
                  ))}
                  {techArr.length > 3 && <span style={{ fontSize:9.5, color:'#606080', fontFamily:"'JetBrains Mono',monospace", padding:'2px 6px' }}>+{techArr.length-3}</span>}
                </div>
              )}
            </div>
          </div>
        </Tilt>
      </Col>

      {/* ── Custom Modal ── */}
      {showModal && (
        <div
          style={{
            position:'fixed', inset:0, zIndex:9000,
            display:'flex', alignItems:'center', justifyContent:'center',
            padding:'20px',
            background:'rgba(0,0,0,0.75)', backdropFilter:'blur(12px)',
            animation:'modalBackdropIn 0.2s ease',
          }}
          onClick={e => { if(e.target===e.currentTarget) setShowModal(false); }}
        >
          <div style={{
            width:'100%', maxWidth:640, maxHeight:'85vh', overflowY:'auto',
            background:'#111118',
            border:'1px solid rgba(255,255,255,0.1)',
            borderRadius:20, position:'relative',
            animation:'modalSlideIn 0.25s ease',
            scrollbarWidth:'thin', scrollbarColor:'#222230 transparent',
          }}>
            {/* Top accent bar */}
            <div style={{ height:3, background:'linear-gradient(90deg,#7fff6e,#6edaff,#ff6eb4)', borderRadius:'20px 20px 0 0' }} />

            {/* Project image */}
            {imgUrl && !imgError && (
              <div style={{ height:200, overflow:'hidden' }}>
                <img src={imgUrl} alt={title} style={{ width:'100%', height:'100%', objectFit:'cover', opacity:0.85 }} />
                <div style={{ position:'absolute', top:3, left:0, right:0, height:200, background:'linear-gradient(to top,#111118,transparent)', pointerEvents:'none' }} />
              </div>
            )}

            <div style={{ padding:'28px 32px 28px' }}>
              {/* Close */}
              <button
                onClick={() => setShowModal(false)}
                style={{
                  position:'absolute', top:16, right:16,
                  width:32, height:32, borderRadius:'50%',
                  background:'rgba(255,255,255,0.07)',
                  border:'1px solid rgba(255,255,255,0.12)',
                  color:'#a8a8c0', fontSize:16, lineHeight:1,
                  cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center',
                  transition:'all 0.2s',
                }}
                onMouseOver={e => { e.currentTarget.style.background='rgba(255,80,80,0.15)'; e.currentTarget.style.color='#ff6b6b'; }}
                onMouseOut={e => { e.currentTarget.style.background='rgba(255,255,255,0.07)'; e.currentTarget.style.color='#a8a8c0'; }}
              >×</button>

              <h3 style={{ fontSize:22, fontWeight:800, letterSpacing:'-0.02em', color:'#fff', margin:'0 0 6px' }}>{title}</h3>
              <p style={{ fontSize:13.5, color:'#8888a8', margin:'0 0 20px', lineHeight:1.7 }}>{fullDescription || description}</p>

              {features && features.length > 0 && (
                <div style={{ marginBottom:20 }}>
                  <div style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:9.5, letterSpacing:'0.2em', textTransform:'uppercase', color:'#7fff6e', marginBottom:12 }}>Key Features</div>
                  <div style={{ display:'flex', flexDirection:'column', gap:7 }}>
                    {features.map((f,i) => (
                      <div key={i} style={{ display:'flex', gap:11, fontSize:13, color:'#c0c0d8', lineHeight:1.6 }}>
                        <span style={{ color:'#7fff6e', fontFamily:"'JetBrains Mono',monospace", flexShrink:0, marginTop:1 }}>→</span>
                        {f}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {techArr.length > 0 && (
                <div style={{ marginBottom:20 }}>
                  <div style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:9.5, letterSpacing:'0.2em', textTransform:'uppercase', color:'#6edaff', marginBottom:10 }}>Technologies</div>
                  <div style={{ display:'flex', flexWrap:'wrap', gap:6 }}>
                    {techArr.map(t => (
                      <span key={t} style={{
                        padding:'4px 12px', borderRadius:7,
                        fontFamily:"'JetBrains Mono',monospace", fontSize:11,
                        color:'#6edaff', background:'rgba(110,218,255,0.08)',
                        border:'1px solid rgba(110,218,255,0.2)',
                      }}>{t}</span>
                    ))}
                  </div>
                </div>
              )}

              {(github || postLink) && (
                <div style={{ display:'flex', gap:10, flexWrap:'wrap', marginTop:8 }}>
                  {github && (
                    <a href={github} target="_blank" rel="noreferrer" style={{
                      display:'inline-flex', alignItems:'center', gap:8,
                      padding:'10px 20px', borderRadius:9,
                      background:'rgba(255,255,255,0.06)',
                      border:'1px solid rgba(255,255,255,0.12)',
                      color:'#fff', textDecoration:'none', fontSize:13,
                      fontFamily:"'JetBrains Mono',monospace",
                      transition:'all 0.2s',
                    }}
                      onMouseOver={e => { e.currentTarget.style.background='rgba(255,255,255,0.1)'; e.currentTarget.style.borderColor='rgba(255,255,255,0.25)'; e.currentTarget.style.transform='translateY(-2px)'; }}
                      onMouseOut={e => { e.currentTarget.style.background='rgba(255,255,255,0.06)'; e.currentTarget.style.borderColor='rgba(255,255,255,0.12)'; e.currentTarget.style.transform='translateY(0)'; }}
                    >
                      <svg height="16" width="16" viewBox="0 0 16 16" fill="currentColor"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/></svg>
                      View on GitHub
                    </a>
                  )}
                  {postLink && (
                    <a href={postLink} target="_blank" rel="noreferrer" style={{
                      display:'inline-flex', alignItems:'center', gap:8,
                      padding:'10px 20px', borderRadius:9,
                      background:'rgba(10,102,194,0.12)',
                      border:'1px solid rgba(10,102,194,0.3)',
                      color:'#5b9bd5', textDecoration:'none', fontSize:13,
                      fontFamily:"'JetBrains Mono',monospace",
                      transition:'all 0.2s',
                    }}
                      onMouseOver={e => { e.currentTarget.style.background='rgba(10,102,194,0.2)'; e.currentTarget.style.transform='translateY(-2px)'; }}
                      onMouseOut={e => { e.currentTarget.style.background='rgba(10,102,194,0.12)'; e.currentTarget.style.transform='translateY(0)'; }}
                    >
                      <svg height="16" width="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                      View on LinkedIn
                    </a>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes modalBackdropIn { from{opacity:0} to{opacity:1} }
        @keyframes modalSlideIn { from{opacity:0;transform:translateY(20px) scale(0.97)} to{opacity:1;transform:translateY(0) scale(1)} }
      `}</style>
    </>
  );
};
