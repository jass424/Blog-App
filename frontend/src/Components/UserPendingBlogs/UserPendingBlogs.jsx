import React, { useEffect, useState } from 'react'
import './UserPendingBlogs.css'

function UserPendingBlogs() {
    const [blogs, setBlogs] = useState([]);

useEffect(()=>{
    console.log(blogs)
   fetch('http://localhost:5000/api/v1/user/myblogs', {
     method: 'GET',
     headers: {
     Authorization: `Bearer ${localStorage.getItem('token')}`,
    }}).then(res => res.json())
    .then(data => setBlogs(data.blogs || []));
}, [])
  return (
    <div className="pending-blogs-list">
      {blogs.length === 0 && (<div>You haven't posted yet....</div>)}
      {blogs.map(blog => (
        <div className="pending-blog-card" key={blog.id}>
          <img
            className="pending-blog-thumbnail"
            src={blog.blogThumbnail}
            alt={blog.title}
          />
          <div className="pending-blog-info">
            <h3>{blog.title.slice(0, 50)}</h3>
            <div className="blog-detail-content" dangerouslySetInnerHTML={{ __html: blog.content.slice(0, 100)+ '...' } }/>
        
            <div className="pending-blog-meta">
              <span className={`pending-blog-status ${blog.status === 'rejected' ? 'rejected-status' : ''}`}>{blog.status || "Pending"}</span>
              <span className="pending-blog-date">{blog.createdAt ? new Date(blog.createdAt).toLocaleDateString() : ""}</span>
                <span  className="pending-blog-author">author: {blog.author?.name || blog.author || ""} </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default UserPendingBlogs
