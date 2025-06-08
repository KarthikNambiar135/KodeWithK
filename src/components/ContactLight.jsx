import React, { useState, useEffect, useRef } from 'react';
import emailjs from '@emailjs/browser';
import './contacts-light.css';

const ContactLight = () => {
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
      
      // Reset form after successful submission
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
      // Clear status message after 3 seconds
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
      icon: 'images/github.svg'
    },
    {
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/in/karthik-nambiar-739957289/',
      icon: 'images/linkedin.svg'
    },
    {
      name: 'X',
      url: 'https://x.com/KarthikNambia15',
      icon: 'images/X.svg'
    },
    {
      name: 'Instagram',
      url: 'https://www.instagram.com/karrthikk._.1/',
      icon: 'images/instagram.svg'
    }
  ];

  return (
    <section 
      ref={contactRef}
      className={`contact-section-light ${isVisible ? 'visible' : ''}`} 
      id='contact'
    >
      <div className="contact-container-light">
        <h2 className="contact-title-light">Get In Touch</h2>
        <p className="contact-subtitle-light">
          Let's discuss your next project or just say hello!
        </p>
        
        <div className="contact-content-light">
          {/* Contact Information */}
          <div className="contact-info-light">
            <h3>Contact Information</h3>
            {contactInfo.map((item, index) => (
              <div 
                key={index} 
                className="contact-item-light"
                onClick={() => item.link && window.open(item.link, '_blank')}
                style={{ cursor: item.link ? 'pointer' : 'default' }}
              >
                <span className="contact-icon-light">{item.icon}</span>
                <div className="contact-text-light">
                  <div className="contact-label-light">{item.label}</div>
                  <div className="contact-value-light">
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
          <div className="contact-form-light">
            <h3>Send Me a Message</h3>
            <form onSubmit={handleSubmit}>
              <div className="form-group-light">
                <label htmlFor="name" className="form-label-light">Name *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="form-input-light"
                  placeholder="Your full name"
                  required
                />
              </div>

              <div className="form-group-light">
                <label htmlFor="email" className="form-label-light">Email *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="form-input-light"
                  placeholder="your.email@example.com"
                  required
                />
              </div>

              <div className="form-group-light">
                <label htmlFor="subject" className="form-label-light">Subject *</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  className="form-input-light"
                  placeholder="What's this about?"
                  required
                />
              </div>

              <div className="form-group-light">
                <label htmlFor="message" className="form-label-light">Message *</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  className="form-textarea-light"
                  placeholder="Tell me about your project or just say hi!"
                  rows="5"
                  required
                ></textarea>
              </div>

              <button 
                type="submit" 
                className="submit-btn-light"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>

              {submitStatus === 'success' && (
                <div className="form-status-light success">
                  ✅ Message sent successfully! I'll get back to you soon.
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="form-status-light error">
                  ❌ Failed to send message. Please try again.
                </div>
              )}
            </form>
          </div>
        </div>

        {/* Social Links */}
        <div className="social-links-light">
          {socialLinks.map((social, index) => (
            <a
              key={index}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="social-link-light"
              title={social.name}
            >
              <img className="social-icon-light" src={social.icon} alt={social.name} />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ContactLight;