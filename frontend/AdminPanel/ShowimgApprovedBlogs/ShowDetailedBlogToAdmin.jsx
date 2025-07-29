import React from 'react'
import './ShowDetailedBlogToAdmin.css'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useState } from 'react';
import { useEffect } from 'react';

function ShowDetailedBlogToAdmin() {
    const {id} = useParams();
    const [blog, setBlog] = useState('');
       const navigate = useNavigate()
   
       const handleClick = ()=>{
           navigate('/approved-blogs-by-admin')
       }

   

    useEffect(()=>{
     fetch(`http://localhost:5000/api/v1/user/blog/${id}`)
     .then(res => res.json())
     .then(data => setBlog(data.blog));
    }, [])
  return (
    <div className='aproved-Blogs-detailForAdmin'>
         <div className="aproved-Blogs-detailForAdmin-header">
        <div className="aproved-Blogs-detailForAdmin-image">
            <img src={blog.blogThumbnail} alt="" />
        </div>
        <div className="aproved-Blogs-detailForAdmin-date-name">
          <p>   By: <span>{blog.author?.name || 'Unknown'}</span></p>
         <span className='aproved-Blogs-detailForAdmin-date'>{blog.createdAt ? new Date(blog.createdAt).toLocaleDateString() : "" }</span>
         
        </div>
        <hr/>
        <div className="aproved-Blogs-detailForAdmin-title">
          <h1>  {blog.title} </h1>
        </div>
       <div
       className="aproved-Blogs-detailForAdmin-content"
       dangerouslySetInnerHTML={{ __html: blog.content }}/>
        </div>
         <div className="aproved-Blogs-detailForAdmin-button">
            <button className='detailBlogsForAdmin-btn' onClick={handleClick}>Go Back</button>
        </div>
      
    </div>
  )
}

export default ShowDetailedBlogToAdmin
