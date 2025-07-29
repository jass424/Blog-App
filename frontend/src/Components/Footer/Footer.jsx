// import React from 'react'
// import './Footer.css'
// import logo from '../assets/blog_logo.png'
// import insta_icon from '../assets/insta_icon.png'
// import twitter_icon from '../assets/twitter_icon.png'
// import youtube_icon from '../assets/youtube_icon.png'
// import { Link } from 'react-router-dom'

// function Footer() {
//   return (
//     <div className='footer'>
//       <div className="footer-logo">
//         <img src={logo} alt="Blog Logo" />
//         <p>Blogger</p>
//       </div>
//         <div className="footer-social-icon">
//           <div className="footer-icon-container">
//             <img src={insta_icon} alt="Instagram Icon" />
//           </div>
//            <div className="footer-icon-container">
//             <img src={twitter_icon} alt="Twitter Icon" />
//           </div>
//            <div className="footer-icon-container">
//             <img src={youtube_icon} alt="YouTube Icon" />
//           </div>
//         </div>
//         <div className="footer-copyright">
//            <hr />
//             <p>© 2023 Blog. All rights reserved.</p>
//         </div>
//         <div className="footer-links">
//   <Link to="/about">About</Link>
//   <Link to="/contact">Contact</Link>
//   <Link to="/terms">Terms</Link>
//   <Link to="/privacy">Privacy</Link>
// </div>
// <form className="newsletter-form">
//   <input type="email" placeholder="Your email address" />
//   <button type="submit">Subscribe</button>
// </form>
       
//     </div>
//   )
// }

// export default Footer



import React from 'react';
import './Footer.css';
import logo from '../assets/blog_logo.png';
import insta_icon from '../assets/insta_icon.png';
import twitter_icon from '../assets/twitter_icon.png';
import youtube_icon from '../assets/youtube_icon.png';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className='footer'>
      <div className="footer-top">
        <div className="footer-brand">
          <img src={logo} alt="Blog Logo" />
          <p>Blogger</p>
        </div>

        <div className="footer-links">
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/terms">Terms</Link>
          <Link to="/privacy">Privacy</Link>
        </div>

        <div className="footer-newsletter">
          <p className="newsletter-title">Subscribe to our newsletter</p>
          <form className="newsletter-form">
            <input type="email" placeholder="Your email address" />
            <button type="submit">Subscribe</button>
          </form>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-social-icon">
          <a href="https://www.instagram.com/jxss.61?igsh=NXFyOTRuaHN5M2xt" target="_blank" rel="noreferrer" className="footer-icon-container">
            <img src={insta_icon} alt="Instagram Icon" />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noreferrer" className="footer-icon-container">
            <img src={twitter_icon} alt="Twitter Icon" />
          </a>
          <a href="https://youtube.com" target="_blank" rel="noreferrer" className="footer-icon-container">
            <img src={youtube_icon} alt="YouTube Icon" />
          </a>
        </div>
        <hr />
        <p>© {new Date().getFullYear()} Blogger. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
