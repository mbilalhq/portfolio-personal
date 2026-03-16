import { useState } from "react";
import { Col, Modal, Button } from "react-bootstrap";
import Tilt from 'react-parallax-tilt';

export const ProjectCard = ({ title, description, fullDescription, features, imgUrl, tech, github }) => {
  const [showModal, setShowModal] = useState(false);

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  return (
    <>
      <Col size={12} sm={6} md={4}>
        <Tilt
          className="parallax-effect"
          tiltMaxAngleX={15}
          tiltMaxAngleY={15}
          perspective={800}
          transitionSpeed={1500}
          scale={1.05}
          gyroscope={true}
        >
          <div className="proj-box" onClick={handleShow} style={{ cursor: 'pointer' }}>
            {imgUrl && <img src={imgUrl} alt={title} className="proj-img" />}
            <div className="proj-content">
              <h4>{title}</h4>
              <span>{description}</span>
              {tech && <p className="tech-tag" style={{ marginTop: '10px', fontSize: '0.85rem', color: '#B8B8B8' }}>{tech}</p>}
            </div>
          </div>
        </Tilt>
      </Col>

      <Modal show={showModal} onHide={handleClose} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h5>Description</h5>
          <p>{fullDescription || description}</p>
          
          {features && features.length > 0 && (
            <>
              <h5 style={{marginTop: '20px'}}>Key Features</h5>
              <ul className="features-list">
                {features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </>
          )}
          
          {tech && (
            <>
              <h5 style={{marginTop: '20px'}}>Technologies Used</h5>
              <p className="tech-details">{tech}</p>
            </>
          )}
          
          {github && (
            <>
              <h5 style={{marginTop: '20px'}}>Repository</h5>
              <a href={github} target="_blank" rel="noreferrer" className="github-link">
                <svg height="24" width="24" viewBox="0 0 16 16" fill="currentColor" style={{marginRight: '8px'}}>
                  <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"></path>
                </svg>
                View on GitHub
              </a>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}
