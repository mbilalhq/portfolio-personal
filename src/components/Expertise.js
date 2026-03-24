import { Container } from "react-bootstrap";
import { useState } from "react";

const EXPERTISE_DATA = [
  {
    num: "01",
    title: "AI / Retrieval",
    subtitle: "Context-aware intelligence & adaptive workflows",
    description:
      "Designing AI systems that understand, adapt, and respond with continuity. Built around retrieval-based reasoning, semantic understanding, and intelligent automation pipelines.",
    tags: ["AI Automation", "Retrieval-Augmented Generation (RAG)", "Vector Embeddings", "pgVector", "Prompt Engineering", "Sentiment Analysis"],
    color: "#7fff6e",
  },
  {
    num: "02",
    title: "Backend / Data",
    subtitle: "Robust APIs & scalable data systems",
    description:
      "Building reliable backend services with strong data flow, clean architecture, and systems designed for real-world scale.",
    tags: ["Python", "FastAPI", "PostgreSQL", "JavaScript", "API Development", "Backend Systems Design"],
    color: "#6edaff",
  },
  {
    num: "03",
    title: "Cloud / Deployment",
    subtitle: "Infrastructure-ready & deployment-focused systems",
    description:
      "Engineering software that is containerized, reproducible, and ready for modern cloud environments.",
    tags: ["Docker", "Kubernetes", "AWS", "Kafka", "Apache Spark", "Cloud-Native Architecture"],
    color: "#ffd250",
  },
  {
    num: "04",
    title: "Product / UI",
    subtitle: "Clean interfaces & meaningful user experience",
    description:
      "Crafting intuitive, responsive interfaces with a strong focus on usability, clarity, and collaboration.",
    tags: ["React", "Responsive Design", "Product Thinking", "Communication", "Problem Solving", "Team Collaboration"],
    color: "#ff6eb4",
  },
];

function ExpertiseCard({ item, index }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "relative",
        padding: "28px 26px 24px",
        background: hovered ? `rgba(255,255,255,0.035)` : "rgba(255,255,255,0.02)",
        border: `1px solid ${hovered ? `${item.color}40` : "rgba(255,255,255,0.07)"}`,
        borderRadius: 18,
        overflow: "hidden",
        transition: "all 0.3s ease",
        transform: hovered ? "translateY(-4px)" : "translateY(0)",
        boxShadow: hovered ? `0 16px 48px ${item.color}15` : "none",
      }}
    >
      {/* Top accent line */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 2,
          background: `linear-gradient(90deg, ${item.color}, transparent)`,
          opacity: hovered ? 1 : 0.5,
          transition: "opacity 0.3s",
        }}
      />

      {/* Number + Title row */}
      <div style={{ display: "flex", alignItems: "flex-start", gap: 14, marginBottom: 6 }}>
        <span
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 11,
            color: item.color,
            opacity: 0.6,
            flexShrink: 0,
            marginTop: 2,
          }}
        >
          {item.num}
        </span>
        <div>
          <h3
            style={{
              fontSize: 17,
              fontWeight: 700,
              color: "#fff",
              margin: "0 0 2px",
              letterSpacing: "-0.01em",
            }}
          >
            {item.title}
          </h3>
          <div
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 10,
              color: item.color,
              letterSpacing: "0.04em",
              marginBottom: 12,
              opacity: 0.85,
            }}
          >
            {item.subtitle}
          </div>
        </div>
      </div>

      {/* Description */}
      <p
        style={{
          fontSize: 13,
          lineHeight: 1.7,
          color: "#a0a0b8",
          margin: "0 0 16px",
        }}
      >
        {item.description}
      </p>

      {/* Tags */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
        {item.tags.map((tag) => (
          <span
            key={tag}
            style={{
              padding: "4px 10px",
              borderRadius: 6,
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 9.5,
              color: item.color,
              background: `${item.color}0c`,
              border: `1px solid ${item.color}20`,
              letterSpacing: "0.02em",
              transition: "all 0.2s",
            }}
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}

export const Expertise = () => (
  <section style={{ padding: "80px 0 40px", position: "relative" }}>
    <Container>
      {/* Header */}
      <div style={{ marginBottom: 40, textAlign: "center" }}>
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 10,
            marginBottom: 10,
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 10,
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            color: "#606080",
          }}
        >
          <span style={{ width: 24, height: 1, background: "#606080", display: "block" }} />
          What I Focus On
          <span style={{ width: 24, height: 1, background: "#606080", display: "block" }} />
        </div>
        <h2
          style={{
            fontSize: "clamp(26px,4vw,44px)",
            fontWeight: 800,
            letterSpacing: "-0.03em",
            color: "#fff",
            lineHeight: 1.1,
            margin: "0 0 14px",
          }}
        >
          Focused on Intelligent Systems
          <span style={{ display: "block", color: "transparent", WebkitTextStroke: "1.5px rgba(255,255,255,0.2)" }}>
            & Scalable Product Execution.
          </span>
        </h2>
        <p
          style={{
            fontSize: 14,
            lineHeight: 1.8,
            color: "#8888a8",
            maxWidth: 600,
            margin: "0 auto",
          }}
        >
          Driven by practical AI implementation, production-ready architecture, and user-centered design.
          <br />
          Bridging intelligent automation with reliable backend systems and modern interfaces.
        </p>
      </div>

      {/* Cards Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: 16,
        }}
      >
        {EXPERTISE_DATA.map((item, i) => (
          <ExpertiseCard key={item.num} item={item} index={i} />
        ))}
      </div>
    </Container>
  </section>
);
