import React, { Suspense } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { DynamicBackground } from "./components/DynamicBackground";
import { NavBar } from "./components/NavBar";
import { Banner } from "./components/Banner";
import { About } from "./components/About";
import { Expertise } from "./components/Expertise";
import { Skills } from "./components/Skills";
import { Experience } from "./components/Experience";
import { Footer } from "./components/Footer";

// Lazy load below-the-fold components to improve initial load performance
const Projects = React.lazy(() => import('./components/Projects').then(module => ({ default: module.Projects })));
const Contact = React.lazy(() => import('./components/Contact').then(module => ({ default: module.Contact })));

function App() {
  return (
    <div className="App">
      <DynamicBackground />
      <NavBar />
      <Banner />
      <About />
      <Expertise />
      <Skills />
      <Experience />
      
      <Suspense fallback={<div className="text-center py-5 text-white">Loading sections...</div>}>
        <Projects />
        <Contact />
      </Suspense>
      
      <Footer />
    </div>
  );
}

export default App;
