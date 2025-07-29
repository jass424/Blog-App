import React from 'react'
import './ShowingApprovedBlogs.css'
import { useState } from 'react'
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MdDelete } from "react-icons/md";


function ShowingApprovedBlogs() {

     const [blogs, setBlogs] = useState([]);
    
        useEffect(()=>{
        fetch('http://localhost:5000/api/v1/user/allblogs')
        .then(res => res.json())
        .then(data =>{
        console.log(data)
         setBlogs((data.blogs || []).filter(blog => blog.status === 'approved'))});
        }, []);

        const handleDelete = async (id) => {
  if (!window.confirm("Are you sure you want to delete this blog?")) return;
  await fetch('http://localhost:5000/api/v1/user/remove/blog', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
    body: JSON.stringify({ id }),
  });
  // Remove the blog from UI after deletion
  setBlogs(blogs.filter(blog => blog._id !== id));
};


  return (
    <div className="approved-blogs-list-for-admin">
      {blogs.map(blog =>(
              <div className="approved-blogs-card-for-admin" key={blog._id}>
               <Link to={`/showdetail-blog-for-admin/${blog._id}`}>
                <img src={blog.blogThumbnail} alt="" />
                <div className="blogs-info">
                  <h4>{blog.title.slice(0,50)}...</h4>
                <div className="approved-blog-detail-content" dangerouslySetInnerHTML={{ __html: blog.content.slice(0, 80)+ '...' }}/>
                </div></Link>
               <div className="approved-blogs-details">
                         {blog.author?.avatar && (<img src={blog.author.avatar}   alt={blog.author.name}  className="blog-author-avatar" style={{ width: "34px", height: "34px", borderRadius: "50%", marginRight: "8px" }} />  )}
                    
                      <span  className="approved-blogs-author">author: {blog.author?.name || blog.author || ""} </span>
                      <span className="approved-blogs-date">{blog.createdAt ? new Date(blog.createdAt).toLocaleDateString() : ""}</span>
                  </div>
                  <div className="approved-blogs-delete" onClick={() => handleDelete(blog._id)}><MdDelete /></div>
               
              </div>
            ))}
    </div>
  )
}

export default ShowingApprovedBlogs
