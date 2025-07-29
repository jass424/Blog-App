import React from 'react'
import './PendingBlog.css'
import { useState } from 'react'
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

function PendingBlogs() {
  const [blogs, setBlogs] = useState([]);

  useEffect(()=>{
    console.log(blogs)
   fetch('http://localhost:5000/api/v1/user/pending-blogs',{
    method: "GET",
    headers:{
      Authorization:`Bearer ${localStorage.getItem('token')}`,
    }
   }).then(res => res.json()).then(data => setBlogs(data.blogs || []));
  }, []);

  const handleApprove = async (id) =>{
    await fetch(`http://localhost:5000/api/v1/user/blog/${id}/approve`, {
      method: 'POST',
      headers:{
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      }
    });
    setBlogs(blogs.filter(blog => blog._id !== id));
  }
  
  const handleReject = async (id) => {
  await fetch(`http://localhost:5000/api/v1/user/blog/${id}/reject`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    }
  });
  setBlogs(blogs.filter(blog => blog._id !== id));
};



  return (
    <div className='pending-blogs-for-admin'>
      {blogs.length === 0 ? ( <div>
        No pending blogs
      </div>) : (
      blogs.map(blog =>(
        <div className="pending-blogs-card-for-admin" key={blog._id}>
         <Link to={`/detail-blog-for-admin/${blog._id}`}>
          <img src={blog.blogThumbnail} alt="" />
          <div className="blogs-info">
            <h4>{blog.title.slice(0, 50)}...</h4>
          <div className="blog-detail-content" dangerouslySetInnerHTML={{ __html: blog.content.slice(0, 100)+'...' }}/>
          </div></Link>
         <div className="pending-blogs-details">
              <span className="blogs-date">{blog.createdAt ? new Date(blog.createdAt).toLocaleDateString() : ""}</span>
                <span  className="blogs-author">author: {blog.author?.name || blog.author || ""} </span>
            </div>
          
            <button onClick={() => handleApprove(blog._id)} className='aproved-button'>Approve</button>
            <button  onClick={() => handleReject(blog._id)} className='rejected-button'>Reject</button>
         
        </div>
      ))
    )}
    </div>
  )
}

export default PendingBlogs
