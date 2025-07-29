import React from 'react'
import './DetailBlogsForAdmin.css'
import { useNavigate, useParams } from 'react-router-dom'
import { useState } from 'react';
import { useEffect } from 'react';

function DetailBlogsForAdmin() {
     const {id} = useParams();
    const [blog, setBlog] = useState('');
    const navigate = useNavigate()

    const handleClick = ()=>{
        navigate('/pendingblogs')
    }

    useEffect(()=>{
     fetch(`http://localhost:5000/api/v1/user/blog/${id}`)
     .then(res => res.json())
     .then(data => setBlog(data.blog));
    }, [])
  return (
    <div className='detailBlogsForAdmin'>
         <div className="detailBlogsForAdmin-header">
        <div className="detailBlogsForAdmin-image">
            <img src={blog.blogThumbnail} alt="" />
        </div>
        <div className="detailBlogsForAdmin-date-name">
          <p>   By: <span>{blog.author?.name || 'Unknown'}</span></p>
         <span className='detailBlogsForAdmin-date'>{blog.createdAt ? new Date(blog.createdAt).toLocaleDateString() : "" }</span>
         
        </div>
        <hr/>
        <div className="detailBlogsForAdmin-title">
          <h1>  {blog.title} </h1>
        </div>
       <div
       className="detailBlogsForAdmin-content"
       dangerouslySetInnerHTML={{ __html: blog.content }}/>
       <div className="detailBlogsForAdmin-button">
            <button className='detailBlogsForAdmin-btn' onClick={handleClick}>Go Back</button>
        </div>
        </div>
        
      
    </div>
  )
}

export default DetailBlogsForAdmin
