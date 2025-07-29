import React from 'react'
import './AdminSidebar.css'
import {  NavLink } from 'react-router-dom'

function Sidebar() {
  return (
    <div className='admin-sidebar'>
       
        <div className="admin-sidebar-links">
             <NavLink to='/admin-dashboard'>Dashboard</NavLink>
        </div>

        <div className="admin-sidebar-links">
             <NavLink to='/pendingblogs'>Pending Blogs</NavLink>
        </div>
        <div className="admin-sidebar-links">
             <NavLink to='/approved-blogs-by-admin'>Approved Blogs</NavLink>
        </div>
         <div className="admin-sidebar-links">
             <NavLink to='/comment-section/admin'>Comments</NavLink>
        </div>
          <div className="admin-sidebar-links">
             <NavLink to='/activity-section/admin'>Activities</NavLink>
        </div>
       
      
    </div>
  )
}

export default Sidebar
