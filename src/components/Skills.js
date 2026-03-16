import meter1 from "../assets/img/meter1.svg";
import meter2 from "../assets/img/meter2.svg";
import meter3 from "../assets/img/meter3.svg";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
// Removed unused arrow1 and arrow2 imports
import colorSharp from "../assets/img/color-sharp.png"

export const Skills = () => {
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };

  return (
    <section className="skill" id="skills">
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <div className="skill-bx wow zoomIn">
                        <h2>Skills</h2>
                        <p>I specialize in modern web and mobile development technologies.<br></br> Here are my core technical and soft skills that I bring to every project.</p>
                        <h3 style={{color: '#AA367C', marginBottom: '20px', marginTop: '30px'}}>Technical Skills</h3>
                        <Carousel responsive={responsive} infinite={true} autoPlay={true} autoPlaySpeed={3000} className="owl-carousel owl-theme skill-slider">
                            <div className="item">
                                <img src={meter1} alt="React" />
                                <h5>React & HTML/CSS</h5>
                            </div>
                            <div className="item">
                                <img src={meter1} alt="FastAPI" />
                                <h5>Python & FastAPI</h5>
                            </div>
                            <div className="item">
                                <img src={meter1} alt="Machine Learning" />
                                <h5>Machine Learning / CNN</h5>
                            </div>
                            <div className="item">
                                <img src={meter2} alt="NLP" />
                                <h5>NLP & Gemini API</h5>
                            </div>
                            <div className="item">
                                <img src={meter2} alt="Vector Embeddings" />
                                <h5>ChromaDB & Embeddings</h5>
                            </div>
                            <div className="item">
                                <img src={meter3} alt="SQL" />
                                <h5>SQL & Databases</h5>
                            </div>
                            <div className="item">
                                <img src={meter3} alt="Git" />
                                <h5>Git & GitHub</h5>
                            </div>
                        </Carousel>
                        <h3 style={{color: '#AA367C', marginBottom: '20px', marginTop: '40px'}}>Soft Skills</h3>
                        <Carousel responsive={responsive} infinite={true} autoPlay={true} autoPlaySpeed={3000} className="owl-carousel owl-theme skill-slider">
                            <div className="item">
                                <img src={meter1} alt="Communication" />
                                <h5>Good Communication</h5>
                            </div>
                            <div className="item">
                                <img src={meter1} alt="Problem Solving" />
                                <h5>Problem Solving</h5>
                            </div>
                            <div className="item">
                                <img src={meter1} alt="Hard Worker" />
                                <h5>Hard Worker</h5>
                            </div>
                            <div className="item">
                                <img src={meter1} alt="Fast Learner" />
                                <h5>Fast Learner</h5>
                            </div>
                        </Carousel>
                    </div>
                </div>
            </div>
        </div>
        <img className="background-image-left" src={colorSharp} alt="Background" />
    </section>
  )
}
