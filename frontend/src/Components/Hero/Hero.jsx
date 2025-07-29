import React from 'react'
import "./Hero.css"
import { Link } from 'react-router-dom';
import hero_image from '../../Components/assets/hero_image.png'

function Hero() {
  return (
    <div className='hero'>
        <div className="hero-left">
            <h1>Empower Your Words.</h1>
            <p>Join a community of thinkers, storytellers, and creators. Write your blogs, get recognized, and spark conversations.</p>
            <div className='hero-left-button'>
                <div className='get-started'><Link to="/login">Get Started</Link></div>
                <div className='explore-blogs'><Link to="/" onClick={() => window.scrollTo(0, 500)}>Explore Blogs</Link></div>
            </div>
        </div>
        <div className="hero-right">
            <img src={hero_image} alt=""  />
        </div>
      
    </div>
  )
}

export default Hero
