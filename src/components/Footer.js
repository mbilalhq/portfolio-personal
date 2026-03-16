import { Container, Row, Col } from "react-bootstrap";
import logo from "../assets/img/logo.svg";
import { Linkedin, Whatsapp, EnvelopeFill, Github } from 'react-bootstrap-icons';

export const Footer = () => {
  const year = new Date().getFullYear();
  const linkedInUrl = 'https://linkedin.com/in/m-bilal-hashmi';
  const whatsappUrl = 'https://wa.me/923100119166';
  const emailUrl = 'mailto:mbilalhq38@gmail.com';
  const githubUrl = 'https://github.com/BilalHq38';

  const socials = [
    { href: linkedInUrl, icon: <Linkedin size={16} />, label: 'LinkedIn', color: '#0A66C2', target:'_blank' },
    { href: whatsappUrl, icon: <Whatsapp size={16} />, label: 'WhatsApp', color: '#25D366', target:'_blank' },
    { href: emailUrl,    icon: <EnvelopeFill size={16} />, label: 'Email', color: '#EA4335', target:'_self' },
    { href: githubUrl,   icon: <Github size={16} />, label: 'GitHub', color: '#ffffff', target:'_blank' },
  ];

  const navLinks = [
    { href: '#home',     label: 'Home' },
    { href: '#about',    label: 'About' },
    { href: '#skills',   label: 'Skills' },
    { href: '#projects', label: 'Projects' },
    { href: '#connect',  label: 'Contact' },
  ];

  return (
    <footer style={{
      background: 'linear-gradient(180deg,#0a0a0f 0%,#07070d 100%)',
      borderTop: '1px solid rgba(255,255,255,0.07)',
      padding: '52px 0 28px',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Subtle top glow */}
      <div style={{ position:'absolute', top:0, left:'50%', transform:'translateX(-50%)', width:500, height:1, background:'linear-gradient(90deg,transparent,rgba(127,255,110,0.3),rgba(110,218,255,0.3),transparent)', pointerEvents:'none' }} />

      <Container>
        <Row style={{ marginBottom: 36, gap: '28px 0' }}>

          {/* Brand col */}
          <Col xs={12} md={4}>
            <div style={{ marginBottom: 14 }}>
              <img src={logo} alt="Logo" style={{ height:32, filter:'brightness(0) invert(1)', marginBottom:14 }} />
              <p style={{ fontSize:13, lineHeight:1.7, color:'#606080', maxWidth:260, margin:0, fontFamily:"'Inter',sans-serif" }}>
                Full-Stack Developer & ML Engineer based in Islamabad, Pakistan. Building intelligent web experiences.
              </p>
            </div>

            {/* Social icons */}
            <div style={{ display:'flex', gap:8, marginTop:18 }}>
              {socials.map(s => (
                <a
                  key={s.label}
                  href={s.href}
                  target={s.target}
                  rel="noreferrer"
                  aria-label={s.label}
                  style={{
                    width:36, height:36,
                    display:'inline-flex', alignItems:'center', justifyContent:'center',
                    borderRadius:'50%',
                    border:'1px solid rgba(255,255,255,0.1)',
                    color:'#a8a8c0',
                    textDecoration:'none',
                    transition:'all 0.2s',
                  }}
                  onMouseOver={e => {
                    e.currentTarget.style.color=s.color;
                    e.currentTarget.style.borderColor=s.color;
                    e.currentTarget.style.background=`${s.color}15`;
                    e.currentTarget.style.transform='translateY(-3px)';
                    e.currentTarget.style.boxShadow=`0 4px 16px ${s.color}30`;
                  }}
                  onMouseOut={e => {
                    e.currentTarget.style.color='#a8a8c0';
                    e.currentTarget.style.borderColor='rgba(255,255,255,0.1)';
                    e.currentTarget.style.background='transparent';
                    e.currentTarget.style.transform='translateY(0)';
                    e.currentTarget.style.boxShadow='none';
                  }}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </Col>

          {/* Quick links */}
          <Col xs={6} md={2} style={{ paddingLeft: 32 }}>
            <div style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:9.5, letterSpacing:'0.25em', textTransform:'uppercase', color:'#7fff6e', marginBottom:16 }}>
              Navigation
            </div>
            <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
              {navLinks.map(l => (
                <a
                  key={l.label}
                  href={l.href}
                  style={{
                    textDecoration:'none', color:'#606080', fontSize:13,
                    fontFamily:"'Inter',sans-serif",
                    transition:'color 0.2s, paddingLeft 0.2s',
                    paddingLeft:0,
                  }}
                  onMouseOver={e => { e.currentTarget.style.color='#fff'; e.currentTarget.style.paddingLeft='6px'; }}
                  onMouseOut={e => { e.currentTarget.style.color='#606080'; e.currentTarget.style.paddingLeft='0'; }}
                >
                  {l.label}
                </a>
              ))}
            </div>
          </Col>

          {/* Tech stack mini */}
          <Col xs={6} md={3} style={{ paddingLeft:24 }}>
            <div style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:9.5, letterSpacing:'0.25em', textTransform:'uppercase', color:'#6edaff', marginBottom:16 }}>
              Tech Stack
            </div>
            <div style={{ display:'flex', flexWrap:'wrap', gap:6 }}>
              {['Python','FastAPI','React','JS','HTML','CSS','Git','ML/AI'].map(t => (
                <span
                  key={t}
                  style={{
                    padding:'3px 9px', borderRadius:5,
                    fontFamily:"'JetBrains Mono',monospace", fontSize:10,
                    color:'#606080', background:'rgba(255,255,255,0.04)',
                    border:'1px solid rgba(255,255,255,0.06)',
                    transition:'color 0.2s, borderColor 0.2s',
                    cursor:'default',
                  }}
                  onMouseOver={e => { e.currentTarget.style.color='#6edaff'; e.currentTarget.style.borderColor='rgba(110,218,255,0.3)'; }}
                  onMouseOut={e => { e.currentTarget.style.color='#606080'; e.currentTarget.style.borderColor='rgba(255,255,255,0.06)'; }}
                >
                  {t}
                </span>
              ))}
            </div>
          </Col>

          {/* Contact mini */}
          <Col xs={12} md={3}>
            <div style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:9.5, letterSpacing:'0.25em', textTransform:'uppercase', color:'#ff6eb4', marginBottom:16 }}>
              Contact
            </div>
            <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
              {[
                { label:'mbilalhq38@gmail.com', href:emailUrl },
                { label:'0310 0119166', href:whatsappUrl },
                { label:'Islamabad, Pakistan', href:null },
              ].map(c => (
                c.href ? (
                  <a key={c.label} href={c.href} style={{ textDecoration:'none', color:'#606080', fontSize:12, fontFamily:"'JetBrains Mono',monospace", transition:'color 0.2s' }}
                    onMouseOver={e => e.currentTarget.style.color='#fff'}
                    onMouseOut={e => e.currentTarget.style.color='#606080'}
                  >{c.label}</a>
                ) : (
                  <span key={c.label} style={{ color:'#606080', fontSize:12, fontFamily:"'JetBrains Mono',monospace" }}>{c.label}</span>
                )
              ))}
            </div>
          </Col>

        </Row>

        {/* Bottom bar */}
        <div style={{
          paddingTop: 22,
          borderTop: '1px solid rgba(255,255,255,0.06)',
          display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap', gap:12,
        }}>
          <p style={{ margin:0, fontFamily:"'JetBrains Mono',monospace", fontSize:11, color:'#404060' }}>
            © {year} Muhammad Bilal Hashmi. All Rights Reserved.
          </p>
          <div style={{ display:'flex', alignItems:'center', gap:6, fontFamily:"'JetBrains Mono',monospace", fontSize:10, color:'#404060' }}>
            <span style={{ width:5, height:5, borderRadius:'50%', background:'#7fff6e', display:'inline-block', animation:'footerPulse 2s ease-in-out infinite' }} />
            Available for opportunities
          </div>
        </div>
      </Container>

      <style>{`
        @keyframes footerPulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.4;transform:scale(0.7)} }
      `}</style>
    </footer>
  );
};
