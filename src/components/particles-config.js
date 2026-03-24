export const particlesConfig = {
  background: {
    color: { value: "transparent" },
  },
  fpsLimit: 120,
  interactivity: {
    events: {
      onClick:  { enable: true,  mode: "push" },
      onHover:  { enable: true,  mode: "repulse" },
      resize:   true,
    },
    modes: {
      push:    { quantity: 3 },
      repulse: { distance: 90, duration: 0.4 },
    },
  },
  particles: {
    color: {
      value: ["#7fff6e", "#6edaff", "#ff6eb4", "#ffffff"],
    },
    links: {
      enable: false,
    },
    collisions: { enable: false },
    move: {
      direction: "none",
      enable: true,
      outModes: { default: "bounce" },
      random: true,
      speed: 0.6,
      straight: false,
    },
    number: {
      density: { enable: true, area: 900 },
      value: 55,
    },
    opacity: {
      value: { min: 0.1, max: 0.35 },
      animation: {
        enable: true,
        speed: 1,
        minimumValue: 0.05,
      },
    },
    shape: { type: "circle" },
    size: {
      value: { min: 1, max: 2.5 },
    },
  },
  detectRetina: true,
};
