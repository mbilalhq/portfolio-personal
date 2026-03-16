import { useState, useEffect } from "react";
import { Col, Row } from "react-bootstrap";

export const Newsletter = ({ status, message, onValidated }) => {
  const [email, setEmail] = useState('');
  const [focused, setFocused] = useState(false);

  useEffect(() => {
    if (status === 'success') setEmail('');
  }, [status]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && email.indexOf("@") > -1) {
      onValidated({ EMAIL: email });
    }
  };

  return (
    <Col lg={12}>
      <div style={{
        position: 'relative',
        padding: '36px 40px',
        background: 'rgba(255,255,255,0.025)',
        border: '1px solid rgba(255,255,255,0.09)',
        borderRadius: 20,
        overflow: 'hidden',
      }}>
        {/* Top bar */}
        <div style={{ position:'absolute', top:0, left:0, right:0, height:2, background:'linear-gradient(90deg,#7fff6e,#6edaff,#ff6eb4)' }} />

        <Row className="align-items-center" style={{ gap:'20px 0' }}>
          <Col lg={12} md={6} xl={5}>
            <div style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:10, letterSpacing:'0.25em', textTransform:'uppercase', color:'#7fff6e', marginBottom:10 }}>
              📬 Stay Updated
            </div>
            <h3 style={{ fontSize:'clamp(18px,3vw,26px)', fontWeight:700, letterSpacing:'-0.02em', color:'#fff', margin:0, lineHeight:1.2 }}>
              Subscribe & Never Miss
              <span style={{ display:'block', color:'transparent', WebkitTextStroke:'1px rgba(255,255,255,0.2)' }}>an Update.</span>
            </h3>

            {/* Status alerts */}
            {status === 'sending' && (
              <div style={{ marginTop:12, padding:'8px 14px', borderRadius:8, background:'rgba(110,218,255,0.08)', border:'1px solid rgba(110,218,255,0.25)', color:'#6edaff', fontFamily:"'JetBrains Mono',monospace", fontSize:12 }}>
                ⟳ Sending...
              </div>
            )}
            {status === 'error' && (
              <div style={{ marginTop:12, padding:'8px 14px', borderRadius:8, background:'rgba(255,80,80,0.08)', border:'1px solid rgba(255,80,80,0.25)', color:'#ff6b6b', fontFamily:"'JetBrains Mono',monospace", fontSize:12 }}>
                ✕ {message}
              </div>
            )}
            {status === 'success' && (
              <div style={{ marginTop:12, padding:'8px 14px', borderRadius:8, background:'rgba(127,255,110,0.08)', border:'1px solid rgba(127,255,110,0.25)', color:'#7fff6e', fontFamily:"'JetBrains Mono',monospace", fontSize:12 }}>
                ✓ {message}
              </div>
            )}
          </Col>

          <Col md={6} xl={7}>
            <form onSubmit={handleSubmit}>
              <div style={{ display:'flex', gap:8, flexWrap:'wrap' }}>
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  onFocus={() => setFocused(true)}
                  onBlur={() => setFocused(false)}
                  style={{
                    flex:1, minWidth:180,
                    padding:'12px 16px',
                    background:'rgba(255,255,255,0.05)',
                    border: focused ? '1px solid rgba(127,255,110,0.5)' : '1px solid rgba(255,255,255,0.1)',
                    borderRadius:10,
                    color:'#fff',
                    fontFamily:"'JetBrains Mono',monospace",
                    fontSize:13,
                    outline:'none',
                    transition:'border-color 0.2s, box-shadow 0.2s',
                    boxShadow: focused ? '0 0 0 3px rgba(127,255,110,0.08)' : 'none',
                  }}
                />
                <button
                  type="submit"
                  style={{
                    padding:'12px 24px',
                    background:'linear-gradient(90deg,#7fff6e,#6edaff)',
                    border:'none', borderRadius:10,
                    color:'#0a0a0f', fontWeight:700, fontSize:12.5,
                    fontFamily:"'JetBrains Mono',monospace",
                    letterSpacing:'0.06em', cursor:'pointer',
                    transition:'transform 0.2s, box-shadow 0.2s',
                    boxShadow:'0 0 18px rgba(127,255,110,0.25)',
                    whiteSpace:'nowrap',
                  }}
                  onMouseOver={e => { e.currentTarget.style.transform='translateY(-2px)'; e.currentTarget.style.boxShadow='0 6px 24px rgba(127,255,110,0.4)'; }}
                  onMouseOut={e => { e.currentTarget.style.transform='translateY(0)'; e.currentTarget.style.boxShadow='0 0 18px rgba(127,255,110,0.25)'; }}
                >
                  Subscribe →
                </button>
              </div>
            </form>
          </Col>
        </Row>
      </div>
      <style>{`::placeholder{color:rgba(255,255,255,0.28)!important}`}</style>
    </Col>
  );
};
