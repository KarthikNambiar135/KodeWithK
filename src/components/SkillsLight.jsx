import React, { useState, useEffect, useRef } from 'react';
import './skills-light.css';

const SkillsLight = () => {
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
      
      // Checking if element is in viewport
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

  return (
    <section 
      ref={skillsRef}
      className={`skills-section-light ${isVisible ? 'visible' : ''} ${animationDirection}`} 
      id='skills'
    >
      <div className="skills-container-light">
        <h2 className="skills-title-light">My Skills</h2>
        <p className="skills-subtitle-light">Technologies and tools I work with</p>
        
        <div className="skills-categories-light">
          {Object.entries(skillsData).map(([category, skills], categoryIndex) => (
            <div 
              key={category} 
              className="skill-category-light"
              style={{ animationDelay: `${categoryIndex * 0.2}s` }}
            >
              <h3 className="category-title-light">{category}</h3>
              <div className="skills-grid-light">
                {skills.map((skill, skillIndex) => (
                  <div 
                    key={skill} 
                    className="skill-item-light"
                    style={{ 
                      animationDelay: `${categoryIndex * 0.2 + skillIndex * 0.05}s` 
                    }}
                  >
                    <span className="skill-name-light">{skill}</span>
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

export default SkillsLight;