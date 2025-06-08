import React, { useState, useEffect, useRef } from 'react';
import './about-light.css';

const AboutLight = () => {
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
        className={`about-section-light ${isVisible ? 'visible' : ''} ${animationDirection}`} 
        id='about'
      >
        <div className="about-container-light">
          <div className="about-image-section-light">
            <div className="profile-image-wrapper-light">
              <img 
                src="/images/me.png" 
                alt="Profile" 
                className="profile-image-light"
              />
            </div>
          </div>
          
          <div className="about-content-light">
            <h2 className="about-title-light">About Me</h2>
            
            <div className="personal-details-light">
              <div className="detail-item-light">
                <span className="label-light">Name:</span>
                <span className="value-light">Karthik Nambiar</span>
              </div>
              <div className="detail-item-light">
                <span className="label-light">Date of Birth:</span>
                <span className="value-light">March 1, 2005</span>
              </div>
              <div className="detail-item-light">
                <span className="label-light">Location:</span>
                <span className="value-light">Pune, Maharashtra, India</span>
              </div>
            </div>

            <div className="education-section-light">
              <h3>Education</h3>
              
              <div className="education-item-light">
                <div className="education-info-light">
                  <h4>Secondary Education</h4>
                  <p>CBSE Board</p>
                  <p>Percentage: 92.4%</p>
                </div>
                <button 
                  className="cert-button-light"
                  onClick={() => openPopup('/images/ssc.png')}
                >
                  View Certificate
                </button>
              </div>

              <div className="education-item-light">
                <div className="education-info-light">
                  <h4>Higher Secondary Education</h4>
                  <p>Science Stream - Physics, Chemistry, Mathematics</p>
                  <p>Percentage: 80.57%</p>
                </div>
                <button 
                  className="cert-button-light"
                  onClick={() => openPopup('/api/placeholder/600/800')}
                >
                  View Certificate
                </button>
              </div>
            </div>

            <div className="exam-section-light">
              <h3>Competitive Exams</h3>
              <div className="education-item-light">
                <div className="education-info-light">
                  <h4>CET Exam Result</h4>
                  <p>Engineering Entrance Examination</p>
                  <p>Percentile: 92.2</p>
                </div>
                <button 
                  className="cert-button-light"
                  onClick={() => openPopup('/api/placeholder/600/800')}
                >
                  View Result
                </button>
              </div>
            </div>

            <div className="skills-section-light1">
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
        <div className="popup-overlay-light" onClick={handlePopupClick}>
          <div className="popup-content-light">
            <img src={popupImage} alt="Certificate" className="popup-image-light" />
            <button className="close-button-light" onClick={closePopup}>×</button>
          </div>
        </div>
      )}
    </>
  );
};

export default AboutLight;