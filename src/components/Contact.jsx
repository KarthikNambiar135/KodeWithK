import React, { useState, useEffect, useRef } from 'react';
import './contacts.css';
import emailjs from '@emailjs/browser';


const Contact = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('');
  const contactRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!contactRef.current) return;

      const rect = contactRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      const isInViewport = rect.top < windowHeight * 0.8 && rect.bottom > windowHeight * 0.2;
      setIsVisible(isInViewport);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('');

    try {
      
      // await new Promise(resolve => setTimeout(resolve, 2000));
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );
      
      //Reset form after successful submission
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      setSubmitStatus('success');
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
      //Clear status message after 3 seconds
      setTimeout(() => setSubmitStatus(''), 3000);
    }
  };

  const contactInfo = [
    {
      label: 'Email',
      value: 'karthiknambiar135@gmail.com',
      icon: '📧',
      link: 'mailto:karthiknambiar135@gmail.com'
    },
    {
      label: 'Phone',
      value: '+91 8983230833',
      icon: '📱',
      link: 'tel:+918983230833'
    },
    {
      label: 'Location',
      value: 'Pune, Maharashtra, India',
      icon: '📍',
      link: "https://maps.app.goo.gl/HdJ2hicCRkwjnE7TA"
    },
    {
      label: 'LinkedIn',
      value: 'linkedin.com/in/karthik-nambiar',
      icon: '💼',
      link: 'https://www.linkedin.com/in/karthik-nambiar-739957289/'
    }
  ];

  const socialLinks = [
    {
      name: 'GitHub',
      url: 'https://github.com/KarthikNambiar135',
      icon: 'src/assets/icons/github.svg'
    },
    {
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/in/karthik-nambiar-739957289/',
      icon: 'images/linkedin.svg'
    },
    {
      name: 'X',
      url: 'https://x.com/KarthikNambia15',
      icon: 'src/assets/icons/X.svg'
    },
    {
      name: 'Instagram',
      url: 'https://www.instagram.com/karrthikk._.1/',
      icon: 'src/assets/icons/instagram.svg'
    }
  ];

  return (
    <section 
      ref={contactRef}
      className={`contact-section ${isVisible ? 'visible' : ''}`} 
      id='contact'
    >
      <div className="contact-container">
        <h2 className="contact-title">Get In Touch</h2>
        <p className="contact-subtitle">
          Let's discuss your next project or just say hello!
        </p>
        
        <div className="contact-content">
          {/* Contact Information */}
          <div className="contact-info">
            <h3>Contact Information</h3>
            {contactInfo.map((item, index) => (
              <div 
                key={index} 
                className="contact-item"
                onClick={() => item.link && window.open(item.link, '_blank')}
                style={{ cursor: item.link ? 'pointer' : 'default' }}
              >
                <span className="contact-icon">{item.icon}</span>
                <div className="contact-text">
                  <div className="contact-label">{item.label}</div>
                  <div className="contact-value">
                    {item.link ? (
                      <a href={item.link} target="_blank" rel="noopener noreferrer">
                        {item.value}
                      </a>
                    ) : (
                      item.value
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Contact Form */}
          <div className="contact-form">
            <h3>Send Me a Message</h3>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name" className="form-label">Name *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="form-input"
                  placeholder="Your full name"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="email" className="form-label">Email *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="form-input"
                  placeholder="your.email@example.com"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="subject" className="form-label">Subject *</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  className="form-input"
                  placeholder="What's this about?"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="message" className="form-label">Message *</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  className="form-textarea"
                  placeholder="Tell me about your project or just say hi!"
                  rows="5"
                  required
                ></textarea>
              </div>

              <button 
                type="submit" 
                className="submit-btn"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>

              {submitStatus === 'success' && (
                <div className="form-status success">
                  ✅ Message sent successfully! I'll get back to you soon.
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="form-status error">
                  ❌ Failed to send message. Please try again.
                </div>
              )}
            </form>
          </div>
        </div>

        {/* Social Links */}
        <div className="social-links">
          {socialLinks.map((social, index) => (
            <a
              key={index}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="social-link"
              title={social.name}
            >
              <img className="social-icon" src={social.icon}></img>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Contact;