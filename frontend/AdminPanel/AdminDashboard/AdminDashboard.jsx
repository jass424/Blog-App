import React, { useEffect, useState } from 'react'
import './AdminDashboard.css'
import { IoSearch } from "react-icons/io5";
import { Link } from 'react-router-dom';

function AdminDashboard() {
  const [users, setUsers] = useState([]); 
  const [userCount, setUserCount] = useState(0);
  const [blogCount, setBlogCount] = useState(0);
  const [search, setSearch] = useState('');

  useEffect(()=>{
    const headers = {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    };


    fetch('http://localhost:5000/api/v1/user/admin/total/users', { headers})
    .then(res => res.json()).then(data => setUserCount(data.count || 0));

    fetch('http://localhost:5000/api/v1/user/admin/total/blog', { headers})
    .then(res => res.json()).then(data => setBlogCount(data.count || 0));

    fetch('http://localhost:5000/api/v1/user/admin/users-with-blogs-comments', { headers})
    .then(res => res.json())
    .then(data => setUsers(data.users || []));

  }, [])

  const filteredUsers = users.filter(user => user.name.toLowerCase().includes(search.toLowerCase()) );

  return (
    <div className='adminDashboard'>
      <div className="adminDashboard-search-bar">
        <input type="text" placeholder='Search Here....' onChange={e => setSearch(e.target.value)} value={search} />
        <button type='submit'  className="adminDashboard-search-bar-button"><IoSearch  className="search-icon"/></button>
      </div>
        <div className="admin-dashboard-user">
          <h3>Total User</h3>
          <p>{userCount}</p>
        </div>
         <Link to='/approved-blogs-by-admin'>
          <div className="admin-dashboard-blog">
          <h3>Total Blogs</h3>
          <p>{blogCount}</p>    
        </div></Link>
        <div className="admin-dashboard-users-list">
  <h3>Users and Their Approved Blogs & Comments</h3>
  {filteredUsers.length === 0 && <p>No users found.</p>}
  {filteredUsers.map(user => (
    <div key={user._id} className="admin-dashboard-user-detail">
      <div>
        <strong>{user.name}</strong> ({user.email})
        {user.avatar && <img src={user.avatar} alt={user.name} style={{ width: 32, height: 32, borderRadius: '50%', marginLeft: 8 }} />}
      </div>
      <div>
        <strong>Approved Blogs:</strong>
        <ul>
          {user.blogs.map(blog => (
            <li key={blog._id}>{blog.title}</li>
          ))}
        </ul>
      </div>
      <div>
        <strong>Comments:</strong>
        <ul>
          {user.comments.map(comment => (
            <li key={comment._id}>{comment.commentText}</li>
          ))}
        </ul>
      </div>
      <hr />
    </div>
  ))}
</div>

      
    </div>
  )
}

export default AdminDashboard
