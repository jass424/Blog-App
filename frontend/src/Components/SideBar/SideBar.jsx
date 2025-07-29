import React, { useEffect } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import './SideBar.css'
import { FaHome } from "react-icons/fa";
import { FaComments } from "react-icons/fa";
import { FaBlogger } from "react-icons/fa";
import { FaMedal } from "react-icons/fa";
import { FaRegUserCircle } from "react-icons/fa";
import { IoIosCreate } from "react-icons/io";
import { useState } from 'react';
import { MdContactPage } from "react-icons/md";
import { useUser } from '../../pages/UserContext';

function SideBar() {


  const {user} = useUser();
  const [showProfile, setShowProfile] = useState(false);
  const location = useLocation();

  useEffect(()=>{
    if (!location.pathname.startsWith('/profile') && !location.pathname.startsWith('/userpendingblogs') && !location.pathname.startsWith('/my-comments') && !location.pathname.startsWith('/createblogs')) {
      setShowProfile(false);
    }
  }, [location.pathname]);
  return (
    <div className='sidebar'>
        {!showProfile && (
          <>
         <div className="sidebar-link">
          <NavLink to='/'>
             <FaHome /> Home</NavLink>
            </div>
           <div className="sidebar-link">
          <NavLink to='/about'> <FaMedal />  About</NavLink> 
            </div>
           
            </>   
         )}
          {user && (
            <div className="sidebar-link" onClick={()=> setShowProfile(!showProfile)} >
           <NavLink to='/profile'>  <FaRegUserCircle /> Profile</NavLink>
           
            </div>
           )}  
         {user && showProfile && (
        <div className="user-profile-details">
          <NavLink to='/userpendingblogs'><p> <FaBlogger />Your Blogs</p></NavLink>
          <NavLink to='/my-comments'><p> <FaComments />Comments</p></NavLink>
          <NavLink to='/createblogs'><p> <IoIosCreate />Create Blogs</p></NavLink>
         </div>
        )}  
    </div>
  )
}

export default SideBar
