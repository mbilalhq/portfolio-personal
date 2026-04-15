import { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import contactImg from "../assets/img/contact-img.svg";
import { EnvelopeFill, Whatsapp, Linkedin } from 'react-bootstrap-icons';
import 'animate.css';
import TrackVisibility from 'react-on-screen';

const SOCIALS = [
  {
    href: 'mailto:mbilalhq38@gmail.com',
    icon: <EnvelopeFill size={20} />,
    label: 'Email',
    color: '#EA4335',
    title: 'Email Me',
  },
  {
    href: 'https://wa.me/923100119166',
    icon: <Whatsapp size={20} />,
    label: 'WhatsApp',
    color: '#25D366',
    title: 'WhatsApp',
    target: '_blank',
  },
  {
    href: 'https://linkedin.com/in/m-bilal-hashmi',
    icon: <Linkedin size={20} />,
    label: 'LinkedIn',
    color: '#0A66C2',
    title: 'LinkedIn',
    target: '_blank',
  },
];

export const Contact = () => {
  const formInitialDetails = { firstName: '', lastName: '', email: '', phone: '', message: '' };
  const [formDetails, setFormDetails] = useState(formInitialDetails);
  const [buttonText, setButtonText] = useState('Send Message');
  const [status, setStatus] = useState({});
  const [focusedField, setFocusedField] = useState(null);

  const onFormUpdate = (category, value) => setFormDetails({ ...formDetails, [category]: value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Client-side validation
    if (!formDetails.firstName.trim() || !formDetails.email.trim() || !formDetails.message.trim()) {
      setStatus({ success: false, message: "Please fill in your name, email, and message." });
      return;
    }
    // Basic email format check
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formDetails.email)) {
      setStatus({ success: false, message: "Please enter a valid email address." });
      return;
    }

    setButtonText("Sending...");
    setStatus({});
    try {
      // Silently collect lead metadata from browser (no extra form fields)
      const meta = {
        timestamp: new Date().toISOString(),
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        locale: navigator.language || navigator.userLanguage || 'unknown',
        screen: `${window.screen.width}x${window.screen.height}`,
        viewport: `${window.innerWidth}x${window.innerHeight}`,
        referrer: document.referrer || 'Direct',
        page: window.location.href,
        userAgent: navigator.userAgent,
        platform: navigator.platform || 'unknown',
        touchDevice: 'ontouchstart' in window || navigator.maxTouchPoints > 0,
      };

      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formDetails, meta }),
      });
      const result = await response.json();
      if (response.ok && result.status === "Message Sent") {
        setStatus({ success: true, message: "Message sent successfully! I'll get back to you soon." });
        setFormDetails(formInitialDetails);
      } else {
        setStatus({ success: false, message: result.message || "Failed to send message. Please try again." });
      }
    } catch (err) {
      setStatus({ success: false, message: "Could not reach the server. Please check your connection and try again." });
    }
    setButtonText("Send Message");
    // Auto-dismiss status message after 3 seconds
    setTimeout(() => setStatus({}), 3000);
  };

  const inputStyle = (field) => ({
    width: '100%',
    padding: '12px 16px',
    background: 'rgba(255,255,255,0.04)',
    border: focusedField === field
      ? '1px solid rgba(127,255,110,0.5)'
      : '1px solid rgba(255,255,255,0.09)',
    borderRadius: 10,
    color: '#fff',
    fontFamily: "'Inter', sans-serif",
    fontSize: 13.5,
    outline: 'none',
    transition: 'border-color 0.2s, box-shadow 0.2s, background 0.2s',
    boxShadow: focusedField === field ? '0 0 0 3px rgba(127,255,110,0.08)' : 'none',
    boxSizing: 'border-box',
  });

  return (
    <section id="contact" style={{
      padding: '80px 0 140px 0', //padding here
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Blobs */}
      <div style={{ position: 'absolute', top: -100, right: -100, width: 400, height: 400, background: 'radial-gradient(circle,rgba(110,218,255,0.06) 0%,transparent 70%)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: -80, left: -80, width: 380, height: 380, background: 'radial-gradient(circle,rgba(255,110,180,0.05) 0%,transparent 70%)', pointerEvents: 'none' }} />

      <style>{`
        ::placeholder { color: rgba(255,255,255,0.28) !important; }
        input:-webkit-autofill { -webkit-box-shadow: 0 0 0 100px #13131e inset !important; -webkit-text-fill-color: #fff !important; }
      `}</style>

      <Container>
        <Row className="align-items-center" style={{ gap: '40px 0' }}>

          {/* ── LEFT: Image + social chips ── */}
          <Col size={12} md={5}>
            <TrackVisibility>
              {({ isVisible }) => (
                <div style={{ opacity: 1 }}>
                  {/* Section header */}
                  <div style={{ marginBottom: 32 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10, fontFamily: "'JetBrains Mono',monospace", fontSize: 10, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#606080' }}>
                      <span style={{ width: 24, height: 1, background: '#606080', display: 'block' }} />
                      Get In Touch
                    </div>
                    <h2 style={{ fontSize: 'clamp(28px,4vw,44px)', fontWeight: 800, letterSpacing: '-0.03em', color: '#fff', lineHeight: 1.05, margin: 0 }}>
                      Let's build
                      <span style={{ display: 'block', color: 'transparent', WebkitTextStroke: '1.5px rgba(255,255,255,0.2)' }}>something great.</span>
                    </h2>
                  </div>

                  {/* Contact image */}
                  <div style={{ position: 'relative', marginBottom: 28 }}>
                    <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle,rgba(127,255,110,0.1) 0%,transparent 70%)', borderRadius: '50%', filter: 'blur(20px)' }} />
                    <img
                      src={contactImg}
                      alt="Contact"
                      style={{
                        position: 'relative', zIndex: 1,
                        width: '100%', maxWidth: 320,
                        filter: 'drop-shadow(0 0 30px rgba(110,218,255,0.15))',
                        display: 'block', margin: '0 auto',
                      }}
                    />
                  </div>

                  {/* Social chips */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    {SOCIALS.map((s, i) => (
                      <a
                        key={s.label}
                        href={s.href}
                        target={s.target || '_self'}
                        rel="noreferrer"
                        title={s.title}
                        style={{
                          display: 'flex', alignItems: 'center', gap: 14,
                          padding: '12px 18px',
                          background: 'rgba(255,255,255,0.03)',
                          border: '1px solid rgba(255,255,255,0.08)',
                          borderRadius: 12,
                          textDecoration: 'none',
                          color: '#a8a8c0',
                          fontFamily: "'JetBrains Mono',monospace",
                          fontSize: 12,
                          transition: 'all 0.22s ease',
                          animation: `contactFadeUp 0.3s ${i * 0.08}s ease both`,
                        }}
                        onMouseOver={e => {
                          e.currentTarget.style.background = `${s.color}12`;
                          e.currentTarget.style.borderColor = `${s.color}50`;
                          e.currentTarget.style.color = s.color;
                          e.currentTarget.style.transform = 'translateX(6px)';
                          e.currentTarget.style.boxShadow = `-4px 0 0 ${s.color}`;
                        }}
                        onMouseOut={e => {
                          e.currentTarget.style.background = 'rgba(255,255,255,0.03)';
                          e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
                          e.currentTarget.style.color = '#a8a8c0';
                          e.currentTarget.style.transform = 'translateX(0)';
                          e.currentTarget.style.boxShadow = 'none';
                        }}
                      >
                        <span style={{ color: s.color }}>{s.icon}</span>
                        <span style={{ color: '#fff', fontWeight: 500 }}>{s.title}</span>
                        <span style={{ marginLeft: 'auto', fontSize: 10, opacity: 0.4 }}>→</span>
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </TrackVisibility>
          </Col>

          {/* ── RIGHT: Form ── */}
          <Col size={12} md={7}>
            <TrackVisibility>
              {({ isVisible }) => (
                <div style={{ opacity: 1, paddingTop: 60 }} >
                  <div style={{
                    padding: 'clamp(20px, 4vw, 36px)',
                    background: 'rgba(255,255,255,0.025)',
                    border: '1px solid rgba(255,255,255,0.09)',
                    borderRadius: 20,
                    position: 'relative',
                    overflow: 'hidden',
                  }}>
                    {/* Top gradient bar */}
                    <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: 'linear-gradient(90deg,#7fff6e,#6edaff,#ff6eb4)' }} />

                    <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 9.5, letterSpacing: '0.25em', textTransform: 'uppercase', color: '#7fff6e', marginBottom: 20 }}>
                      📬 Send a Message
                    </div>

                    <form onSubmit={handleSubmit}>
                      <Row style={{ gap: '12px 0' }}>
                        <Col size={12} sm={6} style={{ paddingRight: 6, paddingLeft: 0 }}>
                          <input
                            type="text" value={formDetails.firstName} placeholder="First Name"
                            onChange={e => onFormUpdate('firstName', e.target.value)}
                            onFocus={() => setFocusedField('firstName')}
                            onBlur={() => setFocusedField(null)}
                            style={inputStyle('firstName')}
                          />
                        </Col>
                        <Col size={12} sm={6} style={{ paddingLeft: 6, paddingRight: 0 }}>
                          <input
                            type="text" value={formDetails.lastName} placeholder="Last Name"
                            onChange={e => onFormUpdate('lastName', e.target.value)}
                            onFocus={() => setFocusedField('lastName')}
                            onBlur={() => setFocusedField(null)}
                            style={inputStyle('lastName')}
                          />
                        </Col>
                        <Col size={12} sm={6} style={{ paddingRight: 6, paddingLeft: 0 }}>
                          <input
                            type="email" value={formDetails.email} placeholder="Email Address"
                            onChange={e => onFormUpdate('email', e.target.value)}
                            onFocus={() => setFocusedField('email')}
                            onBlur={() => setFocusedField(null)}
                            style={inputStyle('email')}
                          />
                        </Col>
                        <Col size={12} sm={6} style={{ paddingLeft: 6, paddingRight: 0 }}>
                          <input
                            type="tel" value={formDetails.phone} placeholder="Phone No."
                            onChange={e => onFormUpdate('phone', e.target.value)}
                            onFocus={() => setFocusedField('phone')}
                            onBlur={() => setFocusedField(null)}
                            style={inputStyle('phone')}
                          />
                        </Col>
                        <Col size={12} style={{ paddingLeft: 0, paddingRight: 0 }}>
                          <textarea
                            rows="10" value={formDetails.message} placeholder="Your message..."
                            onChange={e => onFormUpdate('message', e.target.value)}
                            onFocus={() => setFocusedField('message')}
                            onBlur={() => setFocusedField(null)}
                            style={{ ...inputStyle('message'), resize: 'vertical', minHeight: 240 }}
                          />
                        </Col>
                        <Col size={12} style={{ paddingLeft: 0, paddingRight: 0 }}>
                          <button
                            type="submit"
                            style={{
                              width: '100%', padding: '13px 24px',
                              background: 'linear-gradient(90deg,#7fff6e,#6edaff)',
                              border: 'none', borderRadius: 10,
                              color: '#0a0a0f', fontWeight: 700, fontSize: 13.5,
                              fontFamily: "'JetBrains Mono',monospace",
                              letterSpacing: '0.08em', cursor: 'pointer',
                              transition: 'transform 0.2s, box-shadow 0.2s',
                              boxShadow: '0 0 24px rgba(127,255,110,0.25)',
                            }}
                            onMouseOver={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 32px rgba(127,255,110,0.4)'; }}
                            onMouseOut={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 0 24px rgba(127,255,110,0.25)'; }}
                          >
                            {buttonText} →
                          </button>
                        </Col>
                        {status.message && (
                          <Col size={12} style={{ paddingLeft: 0 }}>
                            <div style={{
                              padding: '11px 16px', borderRadius: 9, fontSize: 13,
                              fontFamily: "'JetBrains Mono',monospace",
                              background: status.success ? 'rgba(127,255,110,0.08)' : 'rgba(255,80,80,0.08)',
                              border: status.success ? '1px solid rgba(127,255,110,0.25)' : '1px solid rgba(255,80,80,0.25)',
                              color: status.success ? '#7fff6e' : '#ff6b6b',
                            }}>
                              {status.success ? '✓ ' : '✕ '}{status.message}
                            </div>
                          </Col>
                        )}
                      </Row>
                    </form>
                  </div>
                </div>
              )}
            </TrackVisibility>
          </Col>

        </Row>
      </Container>

      <style>{`
        @keyframes contactFadeUp { from{opacity:0;transform:translateY(14px)} to{opacity:1;transform:translateY(0)} }
      `}</style>
    </section>
  );
};
