import { Container, Row, Col, Tab, Nav } from "react-bootstrap";
import { ProjectCard } from "./ProjectCard";
import projImg1 from "../assets/img/project-img1.png";
import projImg2 from "../assets/img/project-img2.png";
import projImg3 from "../assets/img/project-img3.png";
import colorSharp2 from "../assets/img/color-sharp2.png";
import 'animate.css';
import TrackVisibility from 'react-on-screen';

export const Projects = () => {

  const projects = [
    {
      title: "AI Story Generator",
      description: "Interactive Storytelling Platform. Designed stateful session architecture ensuring story continuity.",
      fullDescription: "Built a React + FastAPI web app where users shape branching narratives; choices are sent to Gemini API which generates contextual story continuations in real time. Integrated multilingual text-to-speech narration, showcasing third-party API orchestration.",
      features: [
        "React + FastAPI web app for branching narratives",
        "Generates contextual continuations in real time via Gemini API",
        "Multilingual text-to-speech narration",
        "Stateful session architecture for story continuity"
      ],
      imgUrl: projImg3,
      tech: "FastAPI, React, Google Gemini API, Text-to-Speech",
      github: "https://github.com/BilalHq38/AI-Story-Generator.git"
    },
    {
      title: "Chaty_PDFs",
      description: "AI-Powered Document Chatbot. Engineered a full-stack web app enabling Q&A over uploaded PDFs.",
      fullDescription: "Engineered a full-stack web app enabling natural-language Q&A over any uploaded PDF — handling document ingestion, chunking, embedding, and semantic retrieval end-to-end. Integrated ChromaDB as the vector store, enabling sub-second search. Delivered a responsive HTML chat interface that streams answers back in real time.",
      features: [
        "Natural-language Q&A over uploaded PDFs",
        "Sub-second semantic search via ChromaDB vector store",
        "Document ingestion, chunking, and embedding",
        "Real-time text streaming over responsive UI"
      ],
      imgUrl: projImg2,
      tech: "Python, NLP, Vector Embeddings, ChromaDB, HTML",
      github: "https://github.com/BilalHq38/Chaty_PDFs.git"
    },
    {
      title: "Image Search Engine",
      description: "Content-Based Image Retrieval System. Built a CNN-powered retrieval engine finding visually similar images.",
      fullDescription: "Built a CNN-powered retrieval engine that finds visually similar images using feature embeddings — eliminating reliance on fragile metadata matching. Designed a responsive front-end returning ranked image results in real time. Fine-tuned embedding extraction layers to improve retrieval precision.",
      features: [
        "CNN-powered feature extraction for visual similarity",
        "No reliance on explicit metadata tags",
        "Real-time ranked image retrieval UI",
        "Fine-tuned embedding extraction layers"
      ],
      imgUrl: projImg1,
      tech: "Python, CNN, Deep Learning, Feature Embeddings, HTML",
      github: "https://github.com/BilalHq38/Image_Search_Engine_Using_CNN.git"
    }
  ];

  return (
    <section className="project" id="projects">
      <Container>
        <Row>
          <Col size={12}>
            <TrackVisibility>
              {({ isVisible }) =>
              <div className={isVisible ? "animate__animated animate__fadeIn": ""}>
                <h2>Projects</h2>
                <p>Here are my featured projects demonstrating expertise in AI/ML, deep learning, and full-stack development. Each project showcases practical applications of cutting-edge technologies including CNNs, NLP, vector databases, and modern web frameworks.</p>
                <Tab.Container id="projects-tabs" defaultActiveKey="first">
                  <Nav variant="pills" className="nav-pills mb-5 justify-content-center align-items-center" id="pills-tab">
                    <Nav.Item>
                      <Nav.Link eventKey="first">All Projects</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="second">AI/ML</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="third">Web Apps</Nav.Link>
                    </Nav.Item>
                  </Nav>
                  <Tab.Content id="slideInUp" className={isVisible ? "animate__animated animate__slideInUp" : ""}>
                    <Tab.Pane eventKey="first">
                      <Row>
                        {
                          projects.map((project, index) => {
                            return (
                              <ProjectCard
                                key={index}
                                {...project}
                                />
                            )
                          })
                        }
                      </Row>
                    </Tab.Pane>
                    <Tab.Pane eventKey="second">
                      <Row>
                        <ProjectCard
                          title="🔍 Image Search Engine Using CNN"
                          description="Content-Based Image Retrieval using deep learning and CNN embeddings"
                          imgUrl={projImg1}
                        />
                        <ProjectCard
                          title="📄 Chaty_PDFs"
                          description="AI chatbot for PDFs with vector embeddings and semantic search"
                          imgUrl={projImg2}
                        />
                        <ProjectCard
                          title="🎭 AI Story Generator"
                          description="Interactive storytelling with Google Gemini and multilingual TTS"
                          imgUrl={projImg3}
                        />
                      </Row>
                    </Tab.Pane>
                    <Tab.Pane eventKey="third">
                      <Row>
                        <ProjectCard
                          title="🔍 Image Search Engine Using CNN"
                          description="Content-Based Image Retrieval System powered by deep learning"
                          imgUrl={projImg1}
                          tech="CNNs, Deep Learning, Feature Embeddings, HTML, Python"
                        />
                        <ProjectCard
                          title="📄 Chaty_PDFs"
                          description="AI-Powered chatbot for document interaction web app"
                          imgUrl={projImg2}
                          tech="Python, NLP, Embeddings, ChromaDB, HTML, AI Chatbot"
                        />
                        <ProjectCard
                          title="🎭 AI Story Generator"
                          description="Interactive AI-Driven Storytelling Platform with FastAPI + React"
                          imgUrl={projImg3}
                          tech="FastAPI, React, Google Gemini API, Text-to-Speech"
                        />
                      </Row>
                    </Tab.Pane>
                  </Tab.Content>
                </Tab.Container>
              </div>}
            </TrackVisibility>
          </Col>
        </Row>
      </Container>
      <img className="background-image-right" src={colorSharp2} alt="background design" />
    </section>
  )
}
