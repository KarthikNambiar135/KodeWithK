import React, { useState, useEffect } from 'react';
import '../index.css';

const navItems = [
  { id: 'home', label: 'Home', icon: 'home.png' },
  { id: 'about', label: 'About', icon: 'about.png' },
  { id: 'projects', label: 'Projects', icon: 'projects.png' },
  { id: 'skills', label: 'Skills', icon: 'skills.png' },
  { id: 'contact', label: 'Contact', icon: 'contact.png' },
];

function NavBar() {
  const [active, setActive] = useState('home');

  const handleScroll = (id) => {
    setActive(id);
    const section = document.getElementById(id);
    section?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    const handleScrollEvent = () => {
      navItems.forEach(({ id }) => {
        const section = document.getElementById(id);
        if (section) {
          const { top } = section.getBoundingClientRect();
          if (top >= 0 && top < window.innerHeight / 2) {
            setActive(id);
          }
        }
      });
    };
    window.addEventListener('scroll', handleScrollEvent);
    return () => window.removeEventListener('scroll', handleScrollEvent);
  }, []);

  return (
    <nav className="navbar">
      {navItems.map(({ id, label, icon }) => (
        <div
          key={id}
          className={`nav-item ${active === id ? 'active' : ''}`}
          onClick={() => handleScroll(id)}
        >
          <img src={`images/${icon}`} alt={label} />
          <span className="tooltip">{label}</span>
        </div>
      ))}
    </nav>
  );
}

export default NavBar;
