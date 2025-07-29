import React, { useState } from 'react'
import './Navbar.css'
import logo from '../assets/blog_logo.png'
import { Link } from 'react-router-dom'
import { IoLogInOutline } from "react-icons/io5";
import { TbLogout2 } from "react-icons/tb";
import { IoSearch } from "react-icons/io5";
import user_icon from '../assets/user.png'
import { useUser } from '../../pages/UserContext';


function Navbar() {
    
    const { user, logs, setLogs } = useUser();
     
  return (
    <div className='navbar'>
        <div className="blog-logo">
            <img src={logo} alt="Blog Logo" />
            <p>Blogger</p>
        </div>
        <form className='search-container'>
          <div className="search-bar">
            
             <input type="text" placeholder='Search here...' />
             <button type='submit'  className="search-button"><IoSearch  className="search-icon"/></button>
            
          </div>
        </form>
        <div className='navbar-links'>
          {localStorage.getItem('token') ?  <div className="nav-user-section">
          <Link to="/profile"><img src={user?.avatar ? user.avatar : user_icon} alt="User Icon"  className='nav-avatar'/></Link>
        </div> : null }
       
       <div className="navbar-buttons">
         {localStorage.getItem('token') ?
           <div className="navbar-signin">
           <Link  onClick={async () => {
    try {
      await fetch('http://localhost:5000/api/v1/user/logout', {
        method: 'GET',
        credentials: 'include', // if you use httpOnly cookies
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
       const res = await fetch('http://localhost:5000/api/v1/user/admin/activity/logs', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });
    const data = await res.json();
    setLogs(data.logs || [])
    } catch (e) {
      console.log(e)
    }
    localStorage.removeItem('token');
    window.location.replace('/login');
  }}><TbLogout2 /> Logout </Link>
           </div> : 
            <div className="navbar-signin">
           <Link to="/login"><IoLogInOutline /> Login </Link>
           </div> }
          </div>
       </div>
           
    </div>
  )
}

export default Navbar
