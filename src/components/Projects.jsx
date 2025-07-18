import React, { useState, useEffect, useRef } from 'react';
import './projects.css';

const Projects = ({setIsPopupOpen}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [animationDirection, setAnimationDirection] = useState('from-bottom');
  const [selectedProject, setSelectedProject] = useState(null);
  const projectsRef = useRef(null);
  const lastScrollY = useRef(0);

  const projects = [
    {
      id: 1,
      name: "KodeWithMusic(BETA)",
      image: "/images/kodewithmusic.png",
      description: "A modern, full-stack music streaming application built with React and Django, featuring a stunning glassmorphism UI and comprehensive music management capabilities.",
      technologies: ["Vite-React", "JavaScript", "Django", "Python", "CSS3"],
      githubUrl: "https://github.com/KarthikNambiar135/KodeWithMusic.git",
      liveUrl: "https://kode-with-music.vercel.app"
    },
    {
      id: 2,
      name: "PoopyBot(Live Demo Unavailable)",
      image: "/images/poopybot.png",
      description: "A chaotic, energetic AI chatbot with personality-based responses and a poop-obsessed sense of humor! Built with React frontend and Flask backend, powered by Ollama's Mistral model.",
      technologies: ["Vite-ReactJS", "Flask-Python", "Ollama's Mistral", "CSS3", "Flask-CORS"],
      githubUrl: "https://github.com/KarthikNambiar135/poopybot.git",
      liveUrl: "https://github.com/KarthikNambiar135/poopybot.git"
    },
    { 
      id: 3,
      name: "KodeWithK - Project Gallery",
      image: "/images/project-gallery.png",
      description: "A sleek and animated personal project gallery showcasing creative React components, transitions, designed to be fun, interactive, and a reflection of my chaotic coding energy.",
      technologies: ["ReactJS", "Vite", "Framer Motion", "TailwindCSS", "Lucide Icons"],
      githubUrl: "https://github.com/KarthikNambiar135/MyProjectGallery",
      liveUrl: "https://my-project-gallery-nine.vercel.app/"
    },
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (!projectsRef.current) return;

      const rect = projectsRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const currentScrollY = window.scrollY;
      
      const isInViewport = rect.top < windowHeight * 0.8 && rect.bottom > windowHeight * 0.2;
      
      if (currentScrollY > lastScrollY.current) {
        setAnimationDirection('from-bottom');
      } else {
        setAnimationDirection('from-top');
      }
      
      setIsVisible(isInViewport);
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const openProjectModal = (project) => {
    setSelectedProject(project);
    document.body.style.overflow = 'hidden';
     setIsPopupOpen(true);
  };

  const closeProjectModal = () => {
    setSelectedProject(null);
    document.body.style.overflow = 'auto';
     setIsPopupOpen(false);
  };

  const handleModalClick = (e) => {
    if (e.target.classList.contains('project-modal-overlay')) {
      closeProjectModal();
    }
  };

  return (
    <>
      <section 
        ref={projectsRef}
        className={`projects-section ${isVisible ? 'visible' : ''} ${animationDirection}`} 
        id='projects'
      >
        <div className="projects-container">
          <h2 className="projects-title">My Projects</h2>
          <p className="projects-subtitle">Here are some of the projects I've worked on</p>
          
          <div className="projects-grid">
            {projects.map((project, index) => (
              <div 
                key={project.id} 
                className="project-tile"
                style={{ animationDelay: `${index * 0.1}s` }}
                onClick={() => openProjectModal(project)}
              >
                <div className="project-image-wrapper">
                  <img 
                    src={project.image} 
                    alt={project.name}
                    className="project-image"
                    onError={(e) => {
                      e.target.src = '/api/placeholder/400/250';
                    }}
                  />
                  <div className="project-overlay">
                    <div className="project-overlay-content">
                      <h3>{project.name}</h3>
                      <p>Click to view details</p>
                    </div>
                  </div>
                </div>
                <div className="project-info">
                  <h4>{project.name}</h4>
                  <div className="project-tech-preview">
                    {project.technologies.slice(0, 3).map((tech, i) => (
                      <span key={i} className="tech-tag-mini">{tech}</span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span className="tech-more">+{project.technologies.length - 3}</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {selectedProject && (
        <div className="project-modal-overlay" onClick={handleModalClick}>
          <div className="project-modal">
            <div className="project-modal-content">
              <div className="project-modal-image">
                <img 
                  src={selectedProject.image} 
                  alt={selectedProject.name}
                  onError={(e) => {
                    e.target.src = '/api/placeholder/600/400';
                  }}
                />
              </div>
              <div className="project-modal-info">
                <h3>{selectedProject.name}</h3>
                <p className="project-description">{selectedProject.description}</p>
                
                <div className="project-technologies">
                  <h4>Technologies Used:</h4>
                  <div className="tech-tags">
                    {selectedProject.technologies.map((tech, index) => (
                      <span key={index} className="tech-tag">{tech}</span>
                    ))}
                  </div>
                </div>
                
                <div className="project-buttons">
                  <a 
                    href={selectedProject.githubUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="project-btn github-btn"
                  >
                    <span>GitHub</span>
                  </a>
                  <a 
                    href={selectedProject.liveUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="project-btn live-btn"
                  >
                    <span>Live Demo</span>
                  </a>
                </div>
              </div>
            </div>
            <button className="modal-close-btn" onClick={closeProjectModal}>×</button>
          </div>
        </div>
      )}
    </>
  );
};

export default Projects;