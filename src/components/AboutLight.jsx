import React, { useState, useEffect, useRef } from 'react';
import './about-light.css';

const AboutLight = ({certificatesData, setIsPopupOpen}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [animationDirection, setAnimationDirection] = useState('from-bottom');
  const [popupImage, setPopupImage] = useState(null);
  const aboutRef = useRef(null);
  const lastScrollY = useRef(0);
  const [currentPage, setCurrentPage] = useState(0);

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
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setPopupImage(null);
    document.body.style.overflow = 'auto';
    setIsPopupOpen(false);
  };

  const handlePopupClick = (e) => {
    if (e.target.classList.contains('popup-overlay')) {
      closePopup();
    }
  };

   const intervalRef = useRef(null);
  
    useEffect(() => {
      startAutoScroll();
      return () => clearInterval(intervalRef.current);
    }, []);
  
    const startAutoScroll = () => {
      clearInterval(intervalRef.current);
      intervalRef.current = setInterval(() => {
        setCurrentPage(prev => (prev + 1) % certificatesData.length);
      }, 4000);
    };
  
    const nextPage = () => {
      setCurrentPage((prev) => (prev + 1) % certificatesData.length);
      startAutoScroll();
    };
  
    const prevPage = () => {
      setCurrentPage((prev) => (prev - 1 + certificatesData.length) % certificatesData.length);
      startAutoScroll();
    };
  
    const goToPage = (pageIndex) => {
      setCurrentPage(pageIndex);
      startAutoScroll();
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
            <div className='resume'>
              <button 
                  className="cert-button-light"
                 onClick={() => window.open('docs/Karthik_Nambiar_Resume.pdf', '_blank')}
                > 
                  View Resume
                </button>
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

            <div className="certificates-section-light">
              <div className="certificates-header-light">
                <h3>{certificatesData[currentPage].title}</h3>
                <div className="pagination-controls-light">
                  <button className="nav-button-light" onClick={prevPage}>
                    <span>‹</span>
                  </button>
                  <div className="page-indicators-light">
                    {certificatesData.map((_, index) => (
                      <button
                        key={index}
                        className={`page-dot-light ${index === currentPage ? 'active' : ''}`}
                        onClick={() => goToPage(index)}
                      />
                    ))}
                  </div>
                  <button className="nav-button-light" onClick={nextPage}>
                    <span>›</span>
                  </button>
                </div>
              </div>

              <div className="certificates-content-light">
                {certificatesData[currentPage].certificates.map((cert, index) => (
                  <div key={index} className="education-item-light">
                    <div className="education-info-light">
                      <h4>{cert.title}</h4>
                      {cert.subtitle && <p>{cert.subtitle}</p>}
                      {cert.details && <p>{cert.details}</p>}
                    </div>
                    <button 
                      className="cert-button-light"
                      onClick={() => {
                        if (cert.action) {
                          cert.action();
                        } else if (cert.image) {
                          openPopup(cert.image);
                        }
                      }}
                    >
                      {cert.buttonText}
                    </button>
                  </div>
                ))}
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