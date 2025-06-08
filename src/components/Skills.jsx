import React, { useState, useEffect, useRef } from 'react';
import './skills.css';

const Skills = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [animationDirection, setAnimationDirection] = useState('from-bottom');
  const skillsRef = useRef(null);
  const lastScrollY = useRef(0);

  const skillsData = {
    "Programming Languages": [
      "JavaScript", "Python", "Java", "C++", "C"
    ],
    "Frontend": [
      "React", "HTML5", "CSS3",
      "Tailwind CSS", "Bootstrap"
    ],
    "Backend": [
      "Node.js", "Express.js", "Django", "Flask", "MySQL", "PostgreSQL", "REST APIs"
    ],
    "Tools & Technologies": [
      "Git", "GitHub", "Vercel", "Vite"
    ],
    "Design & Others": [
       "Photoshop"
    ]
  };

  useEffect(() => {
    const handleScroll = () => {
      if (!skillsRef.current) return;

      const rect = skillsRef.current.getBoundingClientRect();
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

  return (
    <section 
      ref={skillsRef}
      className={`skills-section ${isVisible ? 'visible' : ''} ${animationDirection}`} 
      id='skills'
    >
      <div className="skills-container">
        <h2 className="skills-title">My Skills</h2>
        <p className="skills-subtitle">Technologies and tools I work with</p>
        
        <div className="skills-categories">
          {Object.entries(skillsData).map(([category, skills], categoryIndex) => (
            <div 
              key={category} 
              className="skill-category"
              style={{ animationDelay: `${categoryIndex * 0.2}s` }}
            >
              <h3 className="category-title">{category}</h3>
              <div className="skills-grid">
                {skills.map((skill, skillIndex) => (
                  <div 
                    key={skill} 
                    className="skill-item"
                    style={{ 
                      animationDelay: `${categoryIndex * 0.2 + skillIndex * 0.05}s` 
                    }}
                  >
                    <span className="skill-name">{skill}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;