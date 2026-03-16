import { Container, Row, Col } from "react-bootstrap";
import { useRef } from "react";

/* ── Inject CSS once ── */
const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300;400;500&display=swap');

  @keyframes anim-spin-bounce {
    0%   { transform: rotate(0deg) scale(1); }
    50%  { transform: rotate(180deg) scale(1.3); filter: drop-shadow(0 0 12px #3776AB); }
    100% { transform: rotate(360deg) scale(1); }
  }
  @keyframes anim-orbit {
    0%   { transform: rotate(0deg) scale(1.1); filter: drop-shadow(0 0 8px #61DAFB); }
    100% { transform: rotate(360deg) scale(1.1); filter: drop-shadow(0 0 18px #61DAFB); }
  }
  @keyframes anim-lightning {
    0%,100% { transform: scale(1) skewX(0deg); filter: brightness(1); }
    20%     { transform: scale(1.2) skewX(-8deg); filter: brightness(2) drop-shadow(0 0 10px #00e5cc); }
    40%     { transform: scale(0.9) skewX(8deg); filter: brightness(0.7); }
    60%     { transform: scale(1.25) skewX(-4deg); filter: brightness(2.2) drop-shadow(0 0 14px #00e5cc); }
    80%     { transform: scale(1) skewX(0deg); filter: brightness(1.3); }
  }
  @keyframes anim-shake {
    0%,100% { transform: translateX(0) rotate(0deg); }
    15%     { transform: translateX(-7px) rotate(-10deg); }
    30%     { transform: translateX(7px) rotate(10deg); }
    45%     { transform: translateX(-4px) rotate(-5deg); }
    60%     { transform: translateX(4px) rotate(5deg); }
    75%     { transform: translateX(-2px) rotate(-2deg); }
  }
  @keyframes anim-pop {
    0%   { transform: scale(1) rotate(0deg); }
    30%  { transform: scale(1.4) rotate(-8deg); filter: drop-shadow(0 0 12px #E34F26); }
    60%  { transform: scale(0.88) rotate(4deg); }
    100% { transform: scale(1.08) rotate(0deg); }
  }
  @keyframes anim-morph {
    0%,100% { transform: scale(1) rotate(0deg); }
    25%     { transform: scale(1.2) rotate(12deg); filter: drop-shadow(0 0 10px #1572B6); }
    50%     { transform: scale(1.1) rotate(-12deg); }
    75%     { transform: scale(0.92) rotate(0deg); }
  }
  @keyframes anim-swing {
    0%,100% { transform: rotate(0deg); transform-origin: top center; }
    20%     { transform: rotate(20deg); transform-origin: top center; }
    40%     { transform: rotate(-14deg); transform-origin: top center; }
    60%     { transform: rotate(9deg); transform-origin: top center; }
    80%     { transform: rotate(-5deg); transform-origin: top center; }
  }
  @keyframes anim-flip-x {
    0%   { transform: perspective(400px) rotateY(0deg); }
    50%  { transform: perspective(400px) rotateY(180deg) scale(1.2); filter: drop-shadow(0 0 12px #aaa); }
    100% { transform: perspective(400px) rotateY(360deg); }
  }
  @keyframes anim-pulse-scale {
    0%,100% { transform: scale(1); }
    25%     { transform: scale(1.35); filter: drop-shadow(0 0 10px #4479A1); }
    50%     { transform: scale(1.1); }
    75%     { transform: scale(1.28); }
  }
  @keyframes anim-wobble {
    0%,100% { transform: translateY(0) rotate(0deg); }
    20%     { transform: translateY(-12px) rotate(-6deg); filter: drop-shadow(0 0 10px #ED8B00); }
    40%     { transform: translateY(5px) rotate(6deg); }
    60%     { transform: translateY(-7px) rotate(-3deg); }
    80%     { transform: translateY(2px) rotate(2deg); }
  }

  .about-info-card {
    position: relative;
    padding: 22px 24px;
    background: rgba(255,255,255,0.03);
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 14px;
    overflow: hidden;
    transition: border-color 0.25s, box-shadow 0.25s;
  }
  .about-info-card .top-bar {
    position: absolute; top: 0; left: 0; right: 0; height: 2px;
  }
  .about-info-card .card-eyebrow {
    font-family: 'JetBrains Mono', monospace;
    font-size: 9.5px; letter-spacing: 0.25em; text-transform: uppercase; margin-bottom: 10px;
  }
  .tech-logo-wrap {
    display: flex; flex-direction: column; align-items: center; gap: 7px;
    padding: 12px 8px;
    background: rgba(255,255,255,0.03);
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 12px;
    cursor: pointer;
    transition: background 0.22s, border-color 0.22s, transform 0.22s, box-shadow 0.22s;
  }
  .tech-logo-wrap:hover { transform: translateY(-4px); }
  .contact-card-link {
    display: flex; align-items: center; gap: 14px;
    padding: 12px 16px;
    background: rgba(255,255,255,0.03);
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 12px;
    text-decoration: none;
    transition: all 0.22s ease;
  }

  /* Responsive fixes */
  @media (max-width: 991px) {
    .about-right-col { margin-top: 20px !important; }
    .about-contact-box { height: auto !important; }
  }
  @media (max-width: 767px) {
    .about-left-col, .about-right-col { padding-right: 12px !important; padding-left: 12px !important; }
    .about-heading { font-size: 28px !important; }
    .tech-stack-grid { grid-template-columns: repeat(auto-fill, minmax(64px, 1fr)) !important; }
  }
`;

if (!document.getElementById("about-styles-v2")) {
  const s = document.createElement("style");
  s.id = "about-styles-v2";
  s.textContent = CSS;
  document.head.appendChild(s);
}

/* ── Data ── */
const TECH_STACK = [
  { name:"Python",     color:"#3776AB", anim:"anim-spin-bounce", svg:<svg viewBox="0 0 128 128" width="36" height="36"><linearGradient id="py1b" x1="70.252" y1="1237.476" x2="170.659" y2="1151.089" gradientTransform="matrix(.563 0 0 -.568 -29.215 707.817)" gradientUnits="userSpaceOnUse"><stop offset="0" stopColor="#5A9FD4"/><stop offset="1" stopColor="#306998"/></linearGradient><linearGradient id="py2b" x1="209.474" y1="1098.811" x2="173.62" y2="1149.537" gradientTransform="matrix(.563 0 0 -.568 -29.215 707.817)" gradientUnits="userSpaceOnUse"><stop offset="0" stopColor="#FFD43B"/><stop offset="1" stopColor="#FFE873"/></linearGradient><path fill="url(#py1b)" d="M63.391 1.988c-4.222.02-8.252.379-11.8 1.007-10.45 1.846-12.346 5.71-12.346 12.837v9.411h24.693v3.137H29.977c-7.176 0-13.46 4.313-15.426 12.521-2.268 9.405-2.368 15.275 0 25.096 1.755 7.311 5.947 12.519 13.124 12.519h8.491V67.234c0-8.151 7.051-15.34 15.426-15.34h24.665c6.866 0 12.346-5.654 12.346-12.548V15.833c0-6.693-5.646-11.72-12.346-12.837-4.244-.706-8.645-1.027-12.866-1.008zM50.037 9.557c2.55 0 4.634 2.117 4.634 4.721 0 2.593-2.083 4.69-4.634 4.69-2.56 0-4.633-2.097-4.633-4.69-.001-2.604 2.073-4.721 4.633-4.721z"/><path fill="url(#py2b)" d="M91.682 28.38v10.966c0 8.5-7.208 15.655-15.426 15.655H51.591c-6.756 0-12.346 5.783-12.346 12.549v23.515c0 6.691 5.818 10.628 12.346 12.547 7.816 2.297 15.312 2.713 24.665 0 6.216-1.801 12.346-5.423 12.346-12.547v-9.412H63.938v-3.138h37.012c7.176 0 9.852-5.005 12.348-12.519 2.578-7.735 2.467-15.174 0-25.096-1.774-7.145-5.161-12.521-12.348-12.521h-9.268zM77.809 87.927c2.561 0 4.634 2.097 4.634 4.692 0 2.602-2.074 4.719-4.634 4.719-2.55 0-4.633-2.117-4.633-4.719 0-2.595 2.083-4.692 4.633-4.692z"/></svg> },
  { name:"React",      color:"#61DAFB", anim:"anim-orbit",        svg:<svg viewBox="-11.5 -10.23174 23 20.46348" width="36" height="36"><circle cx="0" cy="0" r="2.05" fill="#61dafb"/><g stroke="#61dafb" strokeWidth="1" fill="none"><ellipse rx="11" ry="4.2"/><ellipse rx="11" ry="4.2" transform="rotate(60)"/><ellipse rx="11" ry="4.2" transform="rotate(120)"/></g></svg> },
  { name:"FastAPI",    color:"#00e5cc", anim:"anim-lightning",    svg:<svg viewBox="0 0 100 100" width="36" height="36"><circle cx="50" cy="50" r="50" fill="#009688"/><path d="M55 15 L25 55 H50 L45 85 L75 45 H50 Z" fill="white"/></svg> },
  { name:"JavaScript", color:"#F7DF1E", anim:"anim-shake",        svg:<svg viewBox="0 0 128 128" width="36" height="36"><path fill="#F7DF1E" d="M1.408 1.408h125.184v125.185H1.408z"/><path fill="#323330" d="M116.347 96.736c-.917-5.711-4.641-10.508-15.672-14.981-3.832-1.761-8.104-3.022-9.377-5.926-.452-1.69-.512-2.642-.226-3.665.821-3.32 4.784-4.355 7.925-3.403 2.023.678 3.938 2.237 5.093 4.724 5.402-3.498 5.391-3.475 9.163-5.879-1.381-2.141-2.118-3.129-3.022-4.045-3.249-3.629-7.676-5.498-14.756-5.355l-3.688.477c-3.534.893-6.902 2.748-8.877 5.235-5.926 6.724-4.236 18.492 2.975 23.335 7.104 5.332 17.54 6.545 18.873 11.531 1.297 6.104-4.486 8.08-10.234 7.378-4.236-.881-6.592-3.034-9.139-6.949-4.688 2.713-4.688 2.713-9.508 5.485 1.143 2.499 2.344 3.63 4.26 5.795 9.068 9.198 31.76 8.746 35.83-5.176.165-.478 1.261-3.666.38-8.581zM69.462 58.943H57.753l-.048 30.272c0 6.438.333 12.34-.714 14.149-1.713 3.558-6.152 3.117-8.175 2.427-2.059-1.012-3.106-2.451-4.319-4.485-.333-.584-.583-1.036-.667-1.071l-9.52 5.83c1.583 3.249 3.915 6.069 6.902 7.901 4.462 2.678 10.459 3.499 16.731 2.059 4.082-1.189 7.604-3.652 9.448-7.401 2.666-4.915 2.094-10.864 2.07-17.444.06-10.735.001-21.468.001-32.237z"/></svg> },
  { name:"HTML5",      color:"#E34F26", anim:"anim-pop",          svg:<svg viewBox="0 0 128 128" width="36" height="36"><path fill="#E44D26" d="M19.037 113.876L9.032 1.661h109.936l-10.016 112.198-45.019 12.48z"/><path fill="#F16529" d="M64 116.8l36.378-10.086 8.559-95.878H64z"/><path fill="#EBEBEB" d="M64 52.455H45.788L44.53 38.361H64V24.599H29.489l.33 3.692 3.382 37.927H64zm0 35.743l-.061.017-15.327-4.14-.979-10.975H33.816l1.928 21.609 28.193 7.826.063-.017z"/><path fill="#fff" d="M63.952 52.455v13.763h16.947l-1.597 17.849-15.35 4.143v14.319l28.215-7.82.207-2.325 3.234-36.233.335-3.696h-3.708zm0-27.856v13.762h33.244l.276-3.092.628-6.978.329-3.692z"/></svg> },
  { name:"CSS3",       color:"#1572B6", anim:"anim-morph",        svg:<svg viewBox="0 0 128 128" width="36" height="36"><path fill="#1572B6" d="M18.814 114.123L8.76 1.352h110.48l-10.064 112.754-45.243 12.543-45.119-12.526z"/><path fill="#33A9DC" d="M64.001 117.062l36.559-10.136 8.601-96.354H64.001v106.49z"/><path fill="#fff" d="M64.001 51.429h18.302l1.264-14.163H64.001V23.435h34.682l-.332 3.711-3.4 38.114h-30.95V51.429z"/><path fill="#EBEBEB" d="M64.083 87.349l-.061.018-15.403-4.152-.985-11.031H33.752l1.937 21.717 28.331 7.863.063-.018v-14.397z"/><path fill="#fff" d="M81.127 64.675l-1.666 18.522-15.426 4.164v14.374l28.354-7.853.208-2.337 2.406-26.87H81.127z"/><path fill="#EBEBEB" d="M64.048 23.435v13.831H30.64l-.277-3.108-.63-6.994-.331-3.729h34.646zm-.047 27.994v13.831H49.023l-.277-3.108-.631-6.994-.33-3.729h16.216z"/></svg> },
  { name:"Git",        color:"#F05032", anim:"anim-swing",        svg:<svg viewBox="0 0 128 128" width="36" height="36"><path fill="#F34F29" d="M124.742 58.378L69.625 3.264c-3.172-3.174-8.32-3.174-11.497 0L46.685 14.71l14.518 14.518c3.375-1.139 7.243-.375 9.932 2.314 2.703 2.706 3.461 6.607 2.294 9.993L87.42 55.529c3.385-1.167 7.292-.413 9.994 2.295 3.78 3.777 3.78 9.9 0 13.679-3.78 3.78-9.901 3.78-13.683 0-2.842-2.844-3.545-7.019-2.105-10.521L67.1 46.459v32.935c.919.386 1.799.929 2.588 1.719 3.778 3.777 3.778 9.898 0 13.679-3.78 3.78-9.9 3.78-13.682 0-3.778-3.781-3.778-9.902 0-13.679.961-.962 2.058-1.653 3.22-2.1V45.789c-1.162-.447-2.259-1.138-3.22-2.1-2.855-2.854-3.549-7.055-2.093-10.562L39.629 18.595 3.289 54.933c-3.172 3.171-3.172 8.314 0 11.489l55.117 55.116c3.174 3.172 8.32 3.172 11.499 0l54.837-54.836c3.175-3.176 3.175-8.319 0-11.324z"/></svg> },
  { name:"GitHub",     color:"#ffffff", anim:"anim-flip-x",       svg:<svg viewBox="0 0 128 128" width="36" height="36"><path fillRule="evenodd" clipRule="evenodd" d="M64 5.103c-33.347 0-60.388 27.035-60.388 60.388 0 26.682 17.303 49.317 41.297 57.303 3.017.56 4.125-1.31 4.125-2.905 0-1.44-.056-6.197-.082-11.243-16.8 3.653-20.345-7.125-20.345-7.125-2.747-6.98-6.705-8.836-6.705-8.836-5.48-3.748.413-3.67.413-3.67 6.063.425 9.257 6.223 9.257 6.223 5.386 9.23 14.127 6.562 17.573 5.02.542-3.903 2.107-6.568 3.834-8.076-13.413-1.525-27.514-6.707-27.514-29.843 0-6.593 2.36-11.98 6.223-16.21-.628-1.52-2.695-7.662.584-15.98 0 0 5.07-1.623 16.61 6.19C53.7 35 58.867 34.327 64 34.304c5.13.023 10.3.694 15.127 2.033 11.526-7.813 16.59-6.19 16.59-6.19 3.287 8.317 1.22 14.46.593 15.98 3.872 4.23 6.215 9.617 6.215 16.21 0 23.194-14.127 28.3-27.574 29.796 2.167 1.874 4.097 5.55 4.097 11.183 0 8.08-.07 14.583-.07 16.572 0 1.607 1.088 3.49 4.148 2.897 23.98-7.994 41.263-30.622 41.263-57.294C124.388 32.14 97.35 5.104 64 5.104z" fill="white"/></svg> },
  { name:"SQL",        color:"#4479A1", anim:"anim-pulse-scale",  svg:<svg viewBox="0 0 128 128" width="36" height="36"><path fill="#00618A" d="M116.948 97.807c-6.863-.187-12.104.452-16.585 2.341-1.273.537-3.305.552-3.513 2.147.7.733.809 1.829 1.365 2.731 1.07 1.73 2.876 4.052 4.488 5.268 1.762 1.33 3.577 2.751 5.465 3.902 3.358 2.047 7.107 3.217 10.34 5.268 1.906 1.21 3.799 2.733 5.658 4.097.92.675 1.537 1.724 2.732 2.147v-.194c-.628-.8-.79-1.898-1.366-2.733l-2.537-2.537c-2.48-3.292-5.629-6.184-8.976-8.585-2.669-1.916-8.642-4.504-9.755-7.609l-.195-.195c1.892-.214 4.107-.898 5.854-1.367 2.934-.786 5.556-.583 8.585-1.365l4.097-1.171v-.78c-1.531-1.571-2.623-3.651-4.292-5.073-4.37-3.72-9.138-7.437-14.048-10.537-2.724-1.718-6.089-2.835-8.976-4.292-.971-.491-2.677-.746-3.318-1.562-1.517-1.932-2.342-4.382-3.511-6.633-2.449-4.717-4.854-9.868-7.024-14.831-1.48-3.384-2.443-6.72-4.293-9.756-8.86-14.568-18.369-23.395-33.144-32.058-3.144-1.838-6.929-2.563-10.929-3.513-2.145-.129-4.292-.26-6.438-.391-1.311-.546-2.673-2.149-3.902-2.927-4.894-3.092-17.448-9.817-21.072-.975-2.289 5.581 3.421 11.025 5.462 13.854 1.434 2.009 3.271 4.258 4.293 6.633.671 1.53.786 3.077 1.365 4.683 1.42 3.949 2.651 8.221 4.488 11.902.924 1.873 1.941 3.835 3.122 5.463.718.981 1.937 1.413 2.147 2.927-1.206 1.686-1.273 4.304-1.951 6.438-3.057 9.633-1.898 21.567 2.537 28.69 1.36 2.186 4.567 6.871 8.975 5.073 3.856-1.57 2.995-6.438 4.098-10.732.249-.973.096-1.681.585-2.341v.195l3.513 7.024c2.6 4.187 7.212 8.562 11.122 11.514 2.027 1.531 3.623 4.177 6.244 5.073v-.195h-.195c-.508-.791-1.304-1.124-1.951-1.756-1.527-1.497-3.225-3.358-4.488-5.073-3.559-4.789-6.704-10.034-9.561-15.416-1.367-2.627-2.56-5.476-3.708-8.196-.444-1.07-.438-2.69-1.364-3.317-1.262 1.958-3.118 3.545-4.098 5.854-1.565 3.676-1.762 8.164-2.341 12.877-.342.122-.19.038-.391.195-2.718-.655-3.672-3.452-4.683-5.853-2.554-6.07-3.026-15.824-.781-22.829.582-1.809 3.21-7.501 2.146-9.172-.508-1.666-2.184-2.63-3.121-3.903-1.161-1.574-2.319-3.646-3.122-5.464-2.091-4.731-3.227-10.012-5.561-14.636-1.092-2.182-2.941-4.392-4.488-6.244-1.716-2.06-3.63-3.571-5.073-6.048-.482-.833-1.135-2.166-.39-3.122.21-.274.528-.391.975-.585.937-.366 3.547.931 4.487 1.367 2.634 1.208 4.849 2.348 7.024 3.902 1.064.745 2.143 2.181 3.513 2.537h1.56c2.434.557 5.158.172 7.414.78 4.007 1.08 7.59 2.762 10.732 4.683 9.826 6.21 17.859 15.033 23.316 25.561.883 1.693 1.265 3.308 2.147 5.073 1.65 3.317 3.732 6.739 5.464 9.952 1.727 3.203 3.403 6.437 5.854 9.172 1.279 1.436 6.266 2.204 8.585 2.927 1.598.487 4.238.976 5.659 1.952 2.685 1.887 5.293 4.085 7.804 6.244 1.271 1.094 5.191 3.496 5.659 5.073z"/></svg> },
  { name:"Java",       color:"#ED8B00", anim:"anim-wobble",       svg:<svg viewBox="0 0 128 128" width="36" height="36"><path fill="#0074BD" d="M47.617 98.12s-4.767 2.774 3.397 3.71c9.892 1.13 14.947.968 25.845-1.092 0 0 2.871 1.795 6.873 3.351-24.439 10.47-55.308-.607-36.115-5.969zM44.629 84.455s-5.348 3.959 2.823 4.805c10.567 1.091 18.91 1.18 33.354-1.6 0 0 1.993 2.025 5.132 3.131-29.542 8.64-62.446.68-41.309-6.336z"/><path fill="#EA2D2E" d="M69.802 61.271c6.025 6.935-1.58 13.17-1.58 13.17s15.289-7.891 8.269-17.777c-6.559-9.215-11.587-13.792 15.635-29.58 0 .001-42.731 10.67-22.324 34.187z"/><path fill="#0074BD" d="M102.123 108.229s3.529 2.91-3.888 5.159c-14.102 4.272-58.706 5.56-71.094.171-4.451-1.938 3.899-4.625 6.526-5.192 2.739-.593 4.303-.485 4.303-.485-4.953-3.487-32.013 6.85-13.743 9.815 49.821 8.076 90.817-3.637 77.896-9.468zM49.912 70.294s-22.686 5.389-8.033 7.348c6.188.828 18.518.638 30.011-.326 9.39-.789 18.813-2.474 18.813-2.474s-3.308 1.419-5.704 3.053c-23.042 6.061-67.544 3.238-54.731-2.958 10.832-5.239 19.644-4.643 19.644-4.643zM90.609 93.041c23.421-12.167 12.591-23.86 5.032-22.285-1.848.385-2.677.72-2.677.72s.688-1.079 2-1.543c14.953-5.255 26.451 15.503-4.823 23.725 0-.002.359-.327.468-.617z"/><path fill="#EA2D2E" d="M76.491 1.587S89.459 14.563 64.58 34.51c-20.17 15.961-4.602 25.069-.007 35.458-11.802-10.651-20.463-20.03-14.645-28.765C58.639 28.946 81.293 23.048 76.491 1.587z"/><path fill="#0074BD" d="M52.214 126.021c22.476 1.437 57-.8 57.817-11.436 0 0-1.571 4.032-18.577 7.231-19.186 3.612-42.854 3.191-56.887.874 0 .001 2.875 2.381 17.647 3.331z"/></svg> },
];

const CONTACT_ITEMS = [
  { label:"Email",    value:"mbilalhq38@gmail.com",          href:"mailto:mbilalhq38@gmail.com",          color:"#EA4335", anim:"anim-shake",       svg:<svg viewBox="0 0 48 48" width="34" height="34"><path fill="#4285F4" d="M45 16.2l-5 2.75-5 4.75V40h7a3 3 0 0 0 3-3V16.2z"/><path fill="#34A853" d="M3 16.2l3.5 2.09L13 23.7V40H6a3 3 0 0 1-3-3V16.2z"/><path fill="#FBBC05" d="M13 23.7l-9.3-7.5A3 3 0 0 1 6 11h36a3 3 0 0 1 2.3 5.2L35 23.7l-11 8z"/><path fill="#EA4335" d="M3 16.2l10 7.5 11 8 11-8 10-7.5A3 3 0 0 0 42 11H6a3 3 0 0 0-3 5.2z"/></svg> },
  { label:"WhatsApp", value:"0310 0119166",                  href:"https://wa.me/923100119166",            color:"#25D366", anim:"anim-pulse-scale", svg:<svg viewBox="0 0 48 48" width="34" height="34"><circle cx="24" cy="24" r="22" fill="#25D366"/><path fill="white" d="M24 11C16.8 11 11 16.8 11 24c0 2.3.6 4.5 1.7 6.4L11 37l6.8-1.7c1.8 1 3.9 1.6 6.1 1.6h.1C31.2 37 37 31.2 37 24S31.2 11 24 11zm0 23.4c-2 0-3.9-.5-5.5-1.5l-.4-.2-4 1 1-3.9-.3-.4c-1.1-1.7-1.7-3.6-1.7-5.6C13.1 17.9 18 13 24 13c2.9 0 5.6 1.1 7.6 3.2 2 2 3.2 4.7 3.2 7.7-.1 5.9-4.9 10.5-10.8 10.5zm5.9-8.1c-.3-.2-1.8-.9-2.1-1-.3-.1-.5-.2-.7.2-.2.3-.8 1-.9 1.2-.2.2-.3.2-.6 0-.3-.2-1.3-.5-2.5-1.5-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.5.1-.6l.5-.5c.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5-.1-.2-.7-1.6-1-2.2-.3-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.4s1 2.8 1.2 3c.2.2 2.1 3.1 5 4.4.7.3 1.2.5 1.6.6.7.2 1.3.2 1.8.1.6-.1 1.8-.7 2-1.4.2-.7.2-1.3.2-1.4-.2-.1-.4-.2-.6-.3z"/></svg> },
  { label:"LinkedIn", value:"m-bilal-hashmi",                href:"https://linkedin.com/in/m-bilal-hashmi",color:"#0A66C2", anim:"anim-swing",      svg:<svg viewBox="0 0 48 48" width="34" height="34"><rect width="48" height="48" rx="8" fill="#0A66C2"/><path fill="white" d="M12 19h5v17h-5V19zm2.5-8a2.9 2.9 0 1 1 0 5.8A2.9 2.9 0 0 1 14.5 11zM21 19h4.8v2.3h.1c.7-1.2 2.3-2.7 4.8-2.7 5.1 0 6 3.4 6 7.7V36h-5V27.4c0-2 0-4.6-2.8-4.6s-3.2 2.2-3.2 4.4V36H21V19z"/></svg> },
];

function hexToRgb(hex) {
  return [parseInt(hex.slice(1,3),16), parseInt(hex.slice(3,5),16), parseInt(hex.slice(5,7),16)].join(',');
}

function TechLogo({ item, index }) {
  const iconRef = useRef(null);
  const triggerAnim = () => { const el=iconRef.current; if(!el)return; el.style.animation="none"; void el.offsetWidth; el.style.animation=`${item.anim} 0.7s ease forwards`; };
  const resetAnim  = () => { if(iconRef.current) iconRef.current.style.animation="none"; };
  return (
    <div
      className="tech-logo-wrap"
      onMouseEnter={triggerAnim} onMouseLeave={resetAnim}
      onMouseOver={e => { e.currentTarget.style.background=`rgba(${hexToRgb(item.color)},0.1)`; e.currentTarget.style.borderColor=`rgba(${hexToRgb(item.color)},0.4)`; e.currentTarget.style.boxShadow=`0 4px 20px rgba(${hexToRgb(item.color)},0.2)`; }}
      onMouseOut={e  => { e.currentTarget.style.background="rgba(255,255,255,0.03)"; e.currentTarget.style.borderColor="rgba(255,255,255,0.08)"; e.currentTarget.style.boxShadow="none"; }}
    >
      <div ref={iconRef} style={{ width:36, height:36, display:"flex", alignItems:"center", justifyContent:"center" }}>{item.svg}</div>
      <span style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:9, color:"rgba(255,255,255,0.4)", letterSpacing:"0.08em", textTransform:"uppercase", whiteSpace:"nowrap" }}>{item.name}</span>
    </div>
  );
}

function ContactCard({ item }) {
  const iconRef = useRef(null);
  return (
    <a
      href={item.href}
      target={item.href.startsWith("mailto") ? "_self" : "_blank"}
      rel="noreferrer"
      className="contact-card-link"
      onMouseEnter={() => { const el=iconRef.current; if(!el)return; el.style.animation="none"; void el.offsetWidth; el.style.animation=`${item.anim} 0.65s ease forwards`; }}
      onMouseLeave={() => { if(iconRef.current) iconRef.current.style.animation="none"; }}
      onMouseOver={e => { e.currentTarget.style.background=`rgba(${hexToRgb(item.color)},0.08)`; e.currentTarget.style.borderColor=`rgba(${hexToRgb(item.color)},0.35)`; e.currentTarget.style.transform="translateX(6px)"; e.currentTarget.style.boxShadow=`-3px 0 0 ${item.color}`; }}
      onMouseOut={e  => { e.currentTarget.style.background="rgba(255,255,255,0.03)"; e.currentTarget.style.borderColor="rgba(255,255,255,0.08)"; e.currentTarget.style.transform="translateX(0)"; e.currentTarget.style.boxShadow="none"; }}
    >
      <div ref={iconRef} style={{ flexShrink:0 }}>{item.svg}</div>
      <div>
        <div style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:9, letterSpacing:"0.2em", textTransform:"uppercase", color:item.color, marginBottom:2 }}>{item.label}</div>
        <div style={{ fontSize:12.5, color:"rgba(255,255,255,0.82)", fontWeight:500 }}>{item.value}</div>
      </div>
    </a>
  );
}

export const About = () => (
  <section id="about" style={{ background:"linear-gradient(180deg,#0a0a0f 0%,#0d0d18 100%)", padding:"64px 0 72px", position:"relative", overflow:"hidden" }}>
    {/* Blobs */}
    <div style={{ position:"absolute", top:-100, left:-100, width:450, height:450, background:"radial-gradient(circle,rgba(127,255,110,0.06) 0%,transparent 70%)", pointerEvents:"none" }} />
    <div style={{ position:"absolute", bottom:-70, right:-70, width:380, height:380, background:"radial-gradient(circle,rgba(110,218,255,0.06) 0%,transparent 70%)", pointerEvents:"none" }} />

    <Container>
      {/* ── Section header ── */}
      <div style={{ marginBottom:32 }}>
        <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:10 }}>
          <span style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:10, letterSpacing:"0.3em", textTransform:"uppercase", color:"#606080" }}>— About Me</span>
          <div style={{ flex:1, height:1, background:"linear-gradient(to right,rgba(255,255,255,0.07),transparent)" }} />
        </div>
        <h2 className="about-heading" style={{ fontSize:"clamp(26px,4vw,46px)", fontWeight:800, letterSpacing:"-0.03em", color:"#fff", lineHeight:1.05, margin:0 }}>
          The person behind
          <span style={{ display:"block", WebkitTextStroke:"1.5px rgba(255,255,255,0.2)", color:"transparent" }}>the code.</span>
        </h2>
      </div>

      {/* ── Main two-col layout ── */}
      <Row style={{ gap:"20px 0" }}>

        {/* LEFT */}
        <Col xs={12} lg={7} className="about-left-col" style={{ paddingRight:10 }}>
          {/* Education */}
          <div
            className="about-info-card"
            style={{ marginBottom:14 }}
            onMouseOver={e=>{e.currentTarget.style.borderColor="rgba(255,110,180,0.28)";e.currentTarget.style.boxShadow="0 0 28px rgba(255,110,180,0.07)";}}
            onMouseOut={e =>{e.currentTarget.style.borderColor="rgba(255,255,255,0.08)";e.currentTarget.style.boxShadow="none";}}
          >
            <div className="top-bar" style={{ background:"linear-gradient(to right,#ff6eb4,transparent)" }} />
            <div className="card-eyebrow" style={{ color:"#ff6eb4" }}>🎓 Education</div>
            <div style={{ fontSize:17, fontWeight:700, color:"#fff", letterSpacing:"-0.02em", marginBottom:4 }}>Bachelor of Computer Science</div>
            <div style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:11, color:"#7fff6e", marginBottom:2 }}>National University of Technology (NUTECH)</div>
            <div style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:10.5, color:"#606080" }}>📍 Islamabad, Pakistan · 2022 – 2026</div>
          </div>

          {/* What I Do */}
          <div
            className="about-info-card"
            onMouseOver={e=>{e.currentTarget.style.borderColor="rgba(110,218,255,0.28)";e.currentTarget.style.boxShadow="0 0 28px rgba(110,218,255,0.07)";}}
            onMouseOut={e =>{e.currentTarget.style.borderColor="rgba(255,255,255,0.08)";e.currentTarget.style.boxShadow="none";}}
          >
            <div className="top-bar" style={{ background:"linear-gradient(to right,#6edaff,transparent)" }} />
            <div className="card-eyebrow" style={{ color:"#6edaff" }}>⚡ What I Do</div>
            <p style={{ fontSize:13.5, lineHeight:1.75, color:"#c8c8e0", margin:0, marginBottom:10 }}>
              I'm a passionate <strong style={{ color:"#fff" }}>Full Stack Developer</strong> specializing in modern web applications and AI-powered solutions. With expertise in Python, React, FastAPI, and Git/GitHub, I craft scalable, efficient, and user-friendly products.
            </p>
            <p style={{ fontSize:13.5, lineHeight:1.75, color:"#c8c8e0", margin:0 }}>
              Recently focused on integrating <strong style={{ color:"#fff" }}>Machine Learning and LLMs</strong> (Google Gemini API) into full-stack systems — where intelligent back-ends meet polished front-ends.
            </p>
          </div>
        </Col>

        {/* RIGHT */}
        <Col xs={12} lg={5} className="about-right-col" style={{ paddingLeft:10 }}>
          <div
            className="about-contact-box"
            style={{ position:"relative", padding:"20px 18px 18px", background:"rgba(255,255,255,0.03)", border:"1px solid rgba(255,255,255,0.08)", borderRadius:14, overflow:"hidden" }}
          >
            <div style={{ position:"absolute", top:0, left:0, right:0, height:2, background:"linear-gradient(to right,#7fff6e,#6edaff,#ff6eb4)" }} />
            <div style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:9.5, letterSpacing:"0.25em", textTransform:"uppercase", color:"#7fff6e", marginBottom:14 }}>📬 Get In Touch</div>
            <div style={{ display:"flex", flexDirection:"column", gap:9 }}>
              {CONTACT_ITEMS.map(item => <ContactCard key={item.label} item={item} />)}
            </div>
          </div>
        </Col>
      </Row>

      {/* ── Tech Stack ── */}
      <div style={{ marginTop:20, padding:"20px 22px", background:"rgba(255,255,255,0.02)", border:"1px solid rgba(255,255,255,0.06)", borderRadius:14 }}>
        <div style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:9.5, letterSpacing:"0.25em", textTransform:"uppercase", color:"#606080", marginBottom:14 }}>⬡ Tech Stack — hover to animate</div>
        <div className="tech-stack-grid" style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(72px,1fr))", gap:8 }}>
          {TECH_STACK.map((item, i) => <TechLogo key={item.name} item={item} index={i} />)}
        </div>
      </div>
    </Container>
  </section>
);
