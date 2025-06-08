import React, { useState, useEffect, useRef } from 'react';
import '../about.css';

const About = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [animationDirection, setAnimationDirection] = useState('from-bottom');
  const [popupImage, setPopupImage] = useState(null);
  const aboutRef = useRef(null);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!aboutRef.current) return;

      const rect = aboutRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const currentScrollY = window.scrollY;
      
      //To check if element is in viewport
      const isInViewport = rect.top < windowHeight * 0.8 && rect.bottom > windowHeight * 0.2;
      
      //To determine scroll direction and animation
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

  const openPopup = (imageSrc) => {
    setPopupImage(imageSrc);
    document.body.style.overflow = 'hidden';
  };

  const closePopup = () => {
    setPopupImage(null);
    document.body.style.overflow = 'auto';
  };

  const handlePopupClick = (e) => {
    if (e.target.classList.contains('popup-overlay')) {
      closePopup();
    }
  };

  return (
    <>
      <section 
        ref={aboutRef}
        className={`about-section ${isVisible ? 'visible' : ''} ${animationDirection}`} id='about'
      >
        <div className="about-container">
          <div className="about-image-section">
            <div className="profile-image-wrapper">
              <img 
                src="/images/me.png" 
                alt="Profile" 
                className="profile-image"
              />
            </div>
          </div>
          
          <div className="about-content">
            <h2 className="about-title">About Me</h2>
            
            <div className="personal-details">
              <div className="detail-item">
                <span className="label">Name:</span>
                <span className="value">Karthik Nambiar</span>
              </div>
              <div className="detail-item">
                <span className="label">Date of Birth:</span>
                <span className="value">March 1, 2005</span>
              </div>
              <div className="detail-item">
                <span className="label">Location:</span>
                <span className="value">Pune, Maharashtra, India</span>
              </div>
            </div>

            <div className="education-section">
              <h3>Education</h3>
              
            <div className="education-item">
                <div className="education-info">
                  <h4>Secondary Education</h4>
                  <p>CBSE Board</p>
                  <p>Percentage: 92.4%</p>
                </div>
                <button 
                  className="cert-button"
                  onClick={() => openPopup('/images/ssc.png')}
                >
                  View Certificate
                </button>
              </div>

              <div className="education-item">
                <div className="education-info">
                  <h4>Higher Secondary Education</h4>
                  <p>Science Stream - Physics, Chemistry, Mathematics</p>
                  <p>Percentage: 80.57%</p>
                </div>
                <button 
                  className="cert-button"
                  onClick={() => openPopup('/api/placeholder/600/800')}
                >
                  View Certificate
                </button>
              </div>

              
            </div>

            <div className="exam-section">
              <h3>Competitive Exams</h3>
              <div className="education-item">
                <div className="education-info">
                  <h4>CET Exam Result</h4>
                  <p>Engineering Entrance Examination</p>
                  <p>Percentile: 92.2</p>
                </div>
                <button 
                  className="cert-button"
                  onClick={() => openPopup('/api/placeholder/600/800')}
                >
                  View Result
                </button>
              </div>
            </div>

            <div className="skills-section">
              <h3>Skills & Interests</h3>
              <p>
                Passionate about web development, UI/UX design, and creating innovative 
                digital experiences. Always eager to learn new technologies and contribute 
                to meaningful projects.
              </p>
            </div>
          </div>
        </div>
      </section>

      {popupImage && (
        <div className="popup-overlay" onClick={handlePopupClick}>
          <div className="popup-content">
            <img src={popupImage} alt="Certificate" className="popup-image" />
            <button className="close-button" onClick={closePopup}>×</button>
          </div>
        </div>
      )}
    </>
  );
};

export default About;