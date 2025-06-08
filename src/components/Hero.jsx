import React from 'react';
import { Typewriter } from 'react-simple-typewriter';
import '../index.css';

function Hero() {
  return (
    <section className="hero" id='home'>
      <h1>Hi, I'm Karthik Nambiar</h1>
      <h2>
        I'm a{' '}
        <span className="typed-text">
          <Typewriter
            words={['Web Developer', 'UI/UX Designer']}
            loop={true}
            cursor
            cursorStyle="|"
            typeSpeed={70}
            deleteSpeed={50}
            delaySpeed={1000}
          />
        </span>
      </h2>
    </section>
  );
}

export default Hero;
