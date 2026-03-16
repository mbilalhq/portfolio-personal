import { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import logo from '../assets/img/logo.svg';
import { Linkedin, Whatsapp, EnvelopeFill, List, X } from 'react-bootstrap-icons';
import { HashLink } from 'react-router-hash-link';
import { BrowserRouter as Router } from "react-router-dom";

export const NavBar = () => {
  const linkedInUrl = 'https://linkedin.com/in/m-bilal-hashmi';
  const whatsappUrl = 'https://wa.me/923100119166';
  const emailUrl = 'mailto:mbilalhq38@gmail.com';

  const [activeLink, setActiveLink] = useState('home');
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const onUpdateActiveLink = (value) => {
    setActiveLink(value);
    setMenuOpen(false);
  };

  const linkBase = {
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: 11,
    letterSpacing: '0.12em',
    textTransform: 'uppercase',
    color: '#a8a8c0',
    padding: '6px 16px',
    borderRadius: 50,
    transition: 'color 0.2s, background 0.2s',
    textDecoration: 'none',
    display: 'block',
  };
  const linkActive = { ...linkBase, color: '#7fff6e', background: 'rgba(127,255,110,0.08)' };

  const socialIconStyle = {
    width: 34, height: 34,
    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
    borderRadius: '50%',
    border: '1px solid rgba(255,255,255,0.12)',
    color: '#a8a8c0',
    transition: 'all 0.2s',
    textDecoration: 'none',
  };

  const socials = [
    { href: linkedInUrl, icon: <Linkedin size={15} />, label: 'LinkedIn', hoverColor: '#0A66C2' },
    { href: whatsappUrl, icon: <Whatsapp size={15} />, label: 'WhatsApp', hoverColor: '#25D366' },
    { href: emailUrl,    icon: <EnvelopeFill size={15} />, label: 'Email', hoverColor: '#EA4335' },
  ];

  return (
    <Router>
      <style>{`
        @media (max-width: 768px) {
          .nav-desktop-links, .nav-desktop-right { display: none !important; }
          .nav-mobile-toggle { display: flex !important; }
        }
        @media (min-width: 769px) {
          .nav-mobile-toggle, .nav-mobile-menu { display: none !important; }
        }
      `}</style>

      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
        padding: '14px 0',
        transition: 'all 0.3s ease',
        background: scrolled ? 'rgba(10,10,15,0.92)' : 'transparent',
        backdropFilter: scrolled ? 'blur(16px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.07)' : '1px solid transparent',
        boxShadow: scrolled ? '0 4px 32px rgba(0,0,0,0.4)' : 'none',
      }}>
        <Container>
          <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', gap:12 }}>

            {/* Logo */}
            <a href="/" style={{ display:'flex', alignItems:'center', textDecoration:'none' }}>
              <img src={logo} alt="Logo" style={{ height:36, filter:'brightness(0) invert(1)' }} />
            </a>

            {/* Desktop nav links */}
            <div className="nav-desktop-links" style={{ display:'flex', alignItems:'center', gap:4 }}>
              {['home','about','skills','projects'].map(link => (
                <a
                  key={link}
                  href={`#${link}`}
                  style={activeLink === link ? linkActive : linkBase}
                  onClick={() => onUpdateActiveLink(link)}
                  onMouseOver={e => { if (activeLink !== link) { e.currentTarget.style.color='#fff'; e.currentTarget.style.background='rgba(255,255,255,0.05)'; }}}
                  onMouseOut={e => { if (activeLink !== link) { e.currentTarget.style.color='#a8a8c0'; e.currentTarget.style.background='transparent'; }}}
                >
                  {link.charAt(0).toUpperCase() + link.slice(1)}
                </a>
              ))}
            </div>

            {/* Desktop right: socials + CTA */}
            <div className="nav-desktop-right" style={{ display:'flex', alignItems:'center', gap:10 }}>
              <div style={{ display:'flex', gap:7 }}>
                {socials.map(s => (
                  <a
                    key={s.label} href={s.href}
                    target={s.href.startsWith('mailto') ? '_self' : '_blank'}
                    rel="noreferrer" aria-label={s.label}
                    style={socialIconStyle}
                    onMouseOver={e => { e.currentTarget.style.color=s.hoverColor; e.currentTarget.style.borderColor=s.hoverColor; e.currentTarget.style.background=`${s.hoverColor}18`; e.currentTarget.style.transform='translateY(-2px)'; }}
                    onMouseOut={e => { e.currentTarget.style.color='#a8a8c0'; e.currentTarget.style.borderColor='rgba(255,255,255,0.12)'; e.currentTarget.style.background='transparent'; e.currentTarget.style.transform='translateY(0)'; }}
                  >{s.icon}</a>
                ))}
              </div>
              <HashLink to="#connect" style={{ textDecoration:'none' }}>
                <button style={{
                  padding:'9px 20px', background:'linear-gradient(90deg, #7fff6e, #6edaff)',
                  border:'none', borderRadius:50, color:'#0a0a0f', fontWeight:700, fontSize:11.5,
                  fontFamily:"'JetBrains Mono', monospace", letterSpacing:'0.08em', cursor:'pointer',
                  transition:'transform 0.2s, box-shadow 0.2s', boxShadow:'0 0 18px rgba(127,255,110,0.25)',
                }}
                  onMouseOver={e => { e.currentTarget.style.transform='translateY(-2px)'; e.currentTarget.style.boxShadow='0 6px 24px rgba(127,255,110,0.4)'; }}
                  onMouseOut={e => { e.currentTarget.style.transform='translateY(0)'; e.currentTarget.style.boxShadow='0 0 18px rgba(127,255,110,0.25)'; }}
                >Let's Connect</button>
              </HashLink>
            </div>

            {/* Mobile hamburger */}
            <button
              className="nav-mobile-toggle"
              onClick={() => setMenuOpen(!menuOpen)}
              style={{
                display:'none', alignItems:'center', justifyContent:'center',
                width:40, height:40, borderRadius:10,
                border:'1px solid rgba(255,255,255,0.15)', background:'rgba(255,255,255,0.05)',
                color:'#fff', cursor:'pointer', transition:'all 0.2s',
              }}
            >
              {menuOpen ? <X size={22} /> : <List size={22} />}
            </button>
          </div>

          {/* Mobile dropdown */}
          {menuOpen && (
            <div className="nav-mobile-menu" style={{
              marginTop:14, padding:20,
              background:'rgba(10,10,15,0.97)', border:'1px solid rgba(255,255,255,0.08)',
              borderRadius:16, animation:'navSlideDown 0.2s ease',
            }}>
              <div style={{ display:'flex', flexDirection:'column', gap:6, marginBottom:16 }}>
                {['home','about','skills','projects'].map(link => (
                  <a
                    key={link} href={`#${link}`}
                    style={activeLink === link ? { ...linkActive, padding:'10px 16px' } : { ...linkBase, padding:'10px 16px' }}
                    onClick={() => onUpdateActiveLink(link)}
                  >
                    {link.charAt(0).toUpperCase() + link.slice(1)}
                  </a>
                ))}
              </div>
              <div style={{ display:'flex', gap:8, marginBottom:14 }}>
                {socials.map(s => (
                  <a key={s.label} href={s.href} target={s.href.startsWith('mailto') ? '_self' : '_blank'} rel="noreferrer" style={socialIconStyle}>{s.icon}</a>
                ))}
              </div>
              <HashLink to="#connect" style={{ textDecoration:'none' }} onClick={() => setMenuOpen(false)}>
                <button style={{
                  width:'100%', padding:'11px 20px',
                  background:'linear-gradient(90deg, #7fff6e, #6edaff)',
                  border:'none', borderRadius:50, color:'#0a0a0f', fontWeight:700, fontSize:12,
                  fontFamily:"'JetBrains Mono', monospace", cursor:'pointer',
                }}>Let's Connect</button>
              </HashLink>
            </div>
          )}
        </Container>
      </nav>

      <style>{`
        @keyframes navSlideDown { from{opacity:0;transform:translateY(-8px)} to{opacity:1;transform:translateY(0)} }
      `}</style>
    </Router>
  );
};
