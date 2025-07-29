import React from 'react'
import './ApprovedBlogsInHomePage.css'
import { useState } from 'react'
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MdDateRange } from "react-icons/md";

function ApprovedBlogsInHomePage() {
    const [approvedBlog, setApprovedBlog] = useState([]);

    useEffect(()=>{
    fetch('http://localhost:5000/api/v1/user/allblogs')
    .then(res => res.json())
    .then(data =>{
    console.log(data)
     setApprovedBlog((data.blogs || []).filter(blog => blog.status === 'approved'))});
    }, [])
  return (
    <div className='approved-blogs-for-homepage'>
      
    {approvedBlog.length === 0 && (
        <div className="no-blogs-message">No approved blogs to show.</div>
      )}
      {approvedBlog.map(blog => (
        <div className="approved-blog-card" key={blog._id}>
          
          <Link  to={`/blog/${blog._id}`} className="blog-card-link">
            <img  src={blog.blogThumbnail}  alt={blog.title} className="approved-blog-image" />
              <div className="approved-blog-tittle">
                 <h1 className="blog-title">{blog.title.slice(0, 34)}...</h1>
              
              </div>
              <div className="approved-blog-date">
                <span className="blog-date"> 
               <MdDateRange/>    {blog.createdAt 
                    ? new Date(blog.createdAt).toLocaleDateString()
                    : ""}
                </span>
              </div>
                
                <hr/>
              </Link>
              <div className="approved-blog-content">
              <div
                className="blog-excerpt"
                 dangerouslySetInnerHTML={{ __html: blog.content.slice(0, 80) + "..." }}/>
              <div className="blog-meta">
                   {blog.author?.avatar && (
          <img
            src={blog.author.avatar}
            alt={blog.author.name}
            className="blog-author-avatar"
            style={{ width: "34px", height: "34px", borderRadius: "50%", marginRight: "8px" }} />
        )}
                <span className="blog-author">
                  {blog.author?.name || blog.author || "Unknown"}
                </span>
                
              </div>
            </div>
          
        </div>
      ))}
    </div>
  )
}

export default ApprovedBlogsInHomePage
