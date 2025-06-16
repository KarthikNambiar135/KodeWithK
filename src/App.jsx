import React, { useState, useEffect } from 'react';

// Dark theme components
import Hero from './components/Hero.jsx';
import Background from './components/Background.jsx';
import NavBar from './components/NavBar.jsx';
import About from './components/About.jsx';
import Projects from './components/Projects.jsx';
import Skills from './components/Skills.jsx';
import Contact from './components/Contact.jsx';

// Light theme components  
import HeroLight from './components/HeroLight.jsx';
import BackgroundLight from './components/BackgroundLight.jsx';
import NavBarLight from './components/NavBarLight.jsx';
import AboutLight from './components/AboutLight.jsx';
import ProjectsLight from './components/ProjectsLight.jsx';
import SkillsLight from './components/SkillsLight.jsx';
import ContactLight from './components/ContactLight.jsx';

// Import both CSS files
import './index.css';
import './index-light.css';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

    const certdata = [
      {
        title: "Certifications",
        certificates: [
          {
            title: "Web Development Certification",
            subtitle: "NSDC",
            details: "Completed: 2025",
            image: "/images/webdev.png",
            buttonText: "View Certificate"
          },
          {
            title: "Agile Project Management",
            subtitle: "Google",
            details: "Completed: 2025",
            image: "/images/agile.png",
            buttonText: "View Certificate"
          },
          {
            title: "Introduction to Openshift Applications",
            subtitle: "Redhat",
            details: "Completed: 2025",
            image: "/images/openshift.png",
            buttonText: "View Certificate"
          },
        ]
      },
      {
        title: "Education",
        certificates: [
          {
            title: "Secondary Education",
            subtitle: "CBSE Board",
            details: "Percentage: 92.4%",
            image: "/images/ssc.png",
            buttonText: "View Certificate"
          },
          {
            title: "Higher Secondary Education",
            subtitle: "Science Stream - Physics, Chemistry, Mathematics",
            details: "Percentage: 80.57%",
            image: "/images/12th.png",
            buttonText: "View Certificate"
          }
        ]
      },
      {
        title: "Competitive Exams",
        certificates: [
          {
            title: "CET Exam Result",
            subtitle: "Engineering Entrance Examination",
            details: "Percentile: 92.2",
            image: "/api/placeholder/600/800",
            buttonText: "View Result"
          },
        ]
      }, 
    ];

  useEffect(() => {
    document.body.className = isDarkMode ? 'dark-theme' : 'light-theme';
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <>
      <div className="app">
        {/* Theme Toggle Button */}
        {!isPopupOpen && (
        <button 
          className="theme-toggle"
          onClick={toggleTheme}
          aria-label={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}
        >
          <div className="toggle-icon">
            {isDarkMode ? (
             // Sun icon for switching to light mode
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="5"/>
                <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
              </svg>
            ) : (
              // Moon icon for switching to dark mode
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
              </svg>
            )}
          </div>
          <span className="toggle-text">
            {isDarkMode ? 'Light' : 'Dark'}
          </span>
        </button>
      )}
        {/* Conditional NavBar */}
        {isDarkMode ? <NavBar /> : <NavBarLight />}
        
        <div className="sections">
          {isDarkMode ? <Hero /> : <HeroLight />}
          {isDarkMode ? <About certificatesData = {certdata} setIsPopupOpen={setIsPopupOpen}/> : <AboutLight certificatesData = {certdata} setIsPopupOpen={setIsPopupOpen}/>}
          {isDarkMode ? <Projects setIsPopupOpen={setIsPopupOpen}/> : <ProjectsLight setIsPopupOpen={setIsPopupOpen}/>}
          {isDarkMode ?< Skills /> : <SkillsLight />}
          {isDarkMode ? <Contact /> : <ContactLight />}
        </div>
      </div>
      
      {/* Conditional Background */}
      {isDarkMode ? <Background /> : <BackgroundLight />}
    </>
  );
}

export default App;