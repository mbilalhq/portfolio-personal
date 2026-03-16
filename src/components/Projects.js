import { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { ProjectCard } from "./ProjectCard";
import projImg1 from "../assets/img/project_imagesearch.png";
import projImg2 from "../assets/img/project_chatpdf.png";
import projImg3 from "../assets/img/project_aistory.png";
import 'animate.css';
import TrackVisibility from 'react-on-screen';

const ALL_PROJECTS = [
  {
    title: "AI Story Generator",
    description: "Interactive Storytelling Platform. Stateful session architecture for story continuity.",
    fullDescription: "Built a React + FastAPI web app where users shape branching narratives; choices are sent to Gemini API which generates contextual story continuations in real time. Integrated multilingual text-to-speech narration, showcasing third-party API orchestration.",
    features: [
      "React + FastAPI web app for branching narratives",
      "Contextual continuations via Gemini API in real time",
      "Multilingual text-to-speech narration",
      "Stateful session architecture for story continuity",
    ],
    imgUrl: projImg3,
    tech: "FastAPI, React, Google Gemini API, Text-to-Speech",
    github: "https://github.com/BilalHq38/AI-Story-Generator.git",
    category: ["all", "aiml", "webapps"],
  },
  {
    title: "Chaty_PDFs",
    description: "AI-Powered Document Chatbot. Full-stack Q&A over uploaded PDFs.",
    fullDescription: "Engineered a full-stack web app enabling natural-language Q&A over any uploaded PDF — handling document ingestion, chunking, embedding, and semantic retrieval end-to-end. Integrated ChromaDB for sub-second vector search.",
    features: [
      "Natural-language Q&A over uploaded PDFs",
      "Sub-second semantic search via ChromaDB vector store",
      "Document ingestion, chunking, and embedding pipeline",
      "Real-time text streaming over responsive UI",
    ],
    imgUrl: projImg2,
    tech: "Python, NLP, Vector Embeddings, ChromaDB, HTML",
    github: "https://github.com/BilalHq38/Chaty_PDFs.git",
    postLink: "https://www.linkedin.com/posts/m-bilal-hashmi_chatypdfs-rethinking-how-we-read-documents-ugcPost-7373839173864267777-wOXD",
    category: ["all", "aiml", "webapps"],
  },
  {
    title: "Image Search Engine",
    description: "Content-Based Image Retrieval using CNN feature embeddings.",
    fullDescription: "Built a CNN-powered retrieval engine that finds visually similar images using feature embeddings — eliminating reliance on fragile metadata matching. Fine-tuned embedding extraction layers to improve retrieval precision.",
    features: [
      "CNN-powered feature extraction for visual similarity",
      "No reliance on explicit metadata tags",
      "Real-time ranked image retrieval UI",
      "Fine-tuned embedding extraction layers",
    ],
    imgUrl: projImg1,
    tech: "Python, CNN, Deep Learning, Feature Embeddings, HTML",
    github: "https://github.com/BilalHq38/Image_Search_Engine_Using_CNN.git",
    postLink: "https://www.linkedin.com/posts/m-bilal-hashmi_recently-i-worked-on-a-project-the-problem-ugcPost-7377291888778858496-8gOE",
    category: ["all", "aiml", "webapps"],
  },
];

const TABS = [
  { key: 'all',     label: 'All Projects' },
  { key: 'aiml',   label: 'AI / ML' },
  { key: 'webapps',label: 'Web Apps' },
];

export const Projects = () => {
  const [activeTab, setActiveTab] = useState('all');

  const filtered = ALL_PROJECTS.filter(p => p.category.includes(activeTab));

  return (
    <section
      id="projects"
      style={{
        background: 'linear-gradient(180deg,#0a0a0f 0%,#0d0d18 100%)',
        padding: '80px 0',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Ambient blobs */}
      <div style={{ position:'absolute', top:-100, right:-80, width:420, height:420, background:'radial-gradient(circle,rgba(127,255,110,0.05) 0%,transparent 70%)', pointerEvents:'none' }} />
      <div style={{ position:'absolute', bottom:-80, left:-80, width:380, height:380, background:'radial-gradient(circle,rgba(110,218,255,0.05) 0%,transparent 70%)', pointerEvents:'none' }} />

      <Container>
        <Row>
          <Col size={12}>
            <TrackVisibility>
              {({ isVisible }) => (
                <div style={{ opacity: 1 }}>

                  {/* ── Section Header ── */}
                  <div style={{ marginBottom: 40 }}>
                    <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:10, fontFamily:"'JetBrains Mono',monospace", fontSize:10, letterSpacing:'0.3em', textTransform:'uppercase', color:'#606080' }}>
                      <span style={{ width:24, height:1, background:'#606080', display:'block' }} />
                      My Work
                    </div>
                    <h2 style={{ fontSize:'clamp(28px,4.5vw,48px)', fontWeight:800, letterSpacing:'-0.03em', color:'#fff', lineHeight:1.05, margin:0 }}>
                      Featured
                      <span style={{ display:'block', color:'transparent', WebkitTextStroke:'1.5px rgba(255,255,255,0.2)' }}>Projects.</span>
                    </h2>
                    <p style={{ fontSize:14, lineHeight:1.75, color:'#8888a8', maxWidth:560, margin:'14px 0 0', fontFamily:"'Inter',sans-serif" }}>
                      Demonstrating expertise in AI/ML, deep learning, and full-stack development — each project a practical application of cutting-edge technologies.
                    </p>
                  </div>

                  {/* ── Tab Pills ── */}
                  <div style={{
                    display:'flex', gap:8, marginBottom:36, flexWrap:'wrap',
                    padding:'6px', background:'rgba(255,255,255,0.03)',
                    border:'1px solid rgba(255,255,255,0.07)',
                    borderRadius:50, width:'fit-content',
                  }}>
                    {TABS.map(tab => (
                      <button
                        key={tab.key}
                        onClick={() => setActiveTab(tab.key)}
                        style={{
                          padding:'8px 20px', borderRadius:50,
                          border:'none', cursor:'pointer',
                          fontFamily:"'JetBrains Mono',monospace",
                          fontSize:11, letterSpacing:'0.08em',
                          transition:'all 0.22s ease',
                          background: activeTab === tab.key
                            ? 'linear-gradient(90deg,#7fff6e,#6edaff)'
                            : 'transparent',
                          color: activeTab === tab.key ? '#0a0a0f' : '#606080',
                          fontWeight: activeTab === tab.key ? 700 : 400,
                          boxShadow: activeTab === tab.key ? '0 0 18px rgba(127,255,110,0.25)' : 'none',
                        }}
                        onMouseOver={e => { if(activeTab!==tab.key){ e.currentTarget.style.color='#fff'; e.currentTarget.style.background='rgba(255,255,255,0.06)'; }}}
                        onMouseOut={e => { if(activeTab!==tab.key){ e.currentTarget.style.color='#606080'; e.currentTarget.style.background='transparent'; }}}
                      >
                        {tab.label}
                      </button>
                    ))}
                  </div>

                  {/* ── Project Cards ── */}
                  <Row style={{ gap:'0 0' }}>
                    {filtered.map((project, index) => (
                      <ProjectCard
                        key={`${activeTab}-${index}`}
                        {...project}
                        style={{ animationDelay: `${index * 0.08}s` }}
                      />
                    ))}
                  </Row>

                  {/* ── View All on GitHub ── */}
                  <div style={{ textAlign:'center', marginTop:44 }}>
                    <a
                      href="https://github.com/BilalHq38"
                      target="_blank"
                      rel="noreferrer"
                      style={{
                        display:'inline-flex', alignItems:'center', gap:10,
                        padding:'12px 28px', borderRadius:50,
                        background:'rgba(255,255,255,0.04)',
                        border:'1px solid rgba(255,255,255,0.12)',
                        color:'#a8a8c0', textDecoration:'none',
                        fontFamily:"'JetBrains Mono',monospace", fontSize:12,
                        letterSpacing:'0.08em',
                        transition:'all 0.22s ease',
                      }}
                      onMouseOver={e => { e.currentTarget.style.background='rgba(255,255,255,0.08)'; e.currentTarget.style.borderColor='rgba(255,255,255,0.25)'; e.currentTarget.style.color='#fff'; e.currentTarget.style.transform='translateY(-2px)'; }}
                      onMouseOut={e => { e.currentTarget.style.background='rgba(255,255,255,0.04)'; e.currentTarget.style.borderColor='rgba(255,255,255,0.12)'; e.currentTarget.style.color='#a8a8c0'; e.currentTarget.style.transform='translateY(0)'; }}
                    >
                      <svg height="17" width="17" viewBox="0 0 16 16" fill="currentColor"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/></svg>
                      View All on GitHub
                    </a>
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
