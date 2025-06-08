import React from 'react';
import Hero from './components/Hero.jsx';
import Background from './components/Background.jsx';
import NavBar from './components/NavBar.jsx';
import About from './components/About.jsx';
import Skills from './components/Skills.jsx';
import Contact from './components/Contact.jsx';
import Projects from './components/Projects.jsx';

function App() {
  return (
    <><div className="app">
      <NavBar />
      <div className="sections">
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Contact />
      </div>
    </div>
      <Background />
      
    </>
  );
}

export default App;
