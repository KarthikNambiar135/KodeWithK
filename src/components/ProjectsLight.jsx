import React, { useState, useEffect, useRef } from 'react';
import './projects-light.css';

const ProjectsLight = () => {
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
      image: "/images/poopybot.jpg",
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
      
      // Check if element is in viewport
      const isInViewport = rect.top < windowHeight * 0.8 && rect.bottom > windowHeight * 0.2;
      
      // Determine scroll direction and animation
      if (currentScrollY > lastScrollY.current) {
        // Scrolling down
        setAnimationDirection('from-bottom');
      } else {
        // Scrolling up
        setAnimationDirection('from-top');
      }
      
      setIsVisible(isInViewport);
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const openProjectModal = (project) => {
    setSelectedProject(project);
    document.body.style.overflow = 'hidden';
  };

  const closeProjectModal = () => {
    setSelectedProject(null);
    document.body.style.overflow = 'auto';
  };

  const handleModalClick = (e) => {
    if (e.target.classList.contains('project-modal-overlay-light')) {
      closeProjectModal();
    }
  };

  return (
    <>
      <section 
        ref={projectsRef}
        className={`projects-section-light ${isVisible ? 'visible' : ''} ${animationDirection}`} 
        id='projects'
      >
        <div className="projects-container-light">
          <h2 className="projects-title-light">My Projects</h2>
          <p className="projects-subtitle-light">Here are some of the projects I've worked on</p>
          
          <div className="projects-grid-light">
            {projects.map((project, index) => (
              <div 
                key={project.id} 
                className="project-tile-light"
                style={{ animationDelay: `${index * 0.1}s` }}
                onClick={() => openProjectModal(project)}
              >
                <div className="project-image-wrapper-light">
                  <img 
                    src={project.image} 
                    alt={project.name}
                    className="project-image-light"
                    onError={(e) => {
                      e.target.src = '/api/placeholder/400/250';
                    }}
                  />
                  <div className="project-overlay-light">
                    <div className="project-overlay-content-light">
                      <h3>{project.name}</h3>
                      <p>Click to view details</p>
                    </div>
                  </div>
                </div>
                <div className="project-info-light">
                  <h4>{project.name}</h4>
                  <div className="project-tech-preview-light">
                    {project.technologies.slice(0, 3).map((tech, i) => (
                      <span key={i} className="tech-tag-mini-light">{tech}</span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span className="tech-more-light">+{project.technologies.length - 3}</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {selectedProject && (
        <div className="project-modal-overlay-light" onClick={handleModalClick}>
          <div className="project-modal-light">
            <div className="project-modal-content-light">
              <div className="project-modal-image-light">
                <img 
                  src={selectedProject.image} 
                  alt={selectedProject.name}
                  onError={(e) => {
                    e.target.src = '/api/placeholder/600/400';
                  }}
                />
              </div>
              <div className="project-modal-info-light">
                <h3>{selectedProject.name}</h3>
                <p className="project-description-light">{selectedProject.description}</p>
                
                <div className="project-technologies-light">
                  <h4>Technologies Used:</h4>
                  <div className="tech-tags-light">
                    {selectedProject.technologies.map((tech, index) => (
                      <span key={index} className="tech-tag-light">{tech}</span>
                    ))}
                  </div>
                </div>
                
                <div className="project-buttons-light">
                  <a 
                    href={selectedProject.githubUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="project-btn-light github-btn-light"
                  >
                    <span>GitHub</span>
                  </a>
                  <a 
                    href={selectedProject.liveUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="project-btn-light live-btn-light"
                  >
                    <span>Live Demo</span>
                  </a>
                </div>
              </div>
            </div>
            <button className="modal-close-btn-light" onClick={closeProjectModal}>×</button>
          </div>
        </div>
      )}
    </>
  );
};

export default ProjectsLight;