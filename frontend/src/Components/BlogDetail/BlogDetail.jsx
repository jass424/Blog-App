import React from 'react'
import Navbar from '../Navbar/Navbar'
import './BlogDetail.css'
import { useParams } from 'react-router-dom'
import { useState } from 'react';
import { useEffect } from 'react';
import Comments from '../Comments/Comments';
import Footer from '../Footer/Footer';

function BlogDetail() {
    const {id} = useParams();
    const [blog, setBlog] = useState('');

    useEffect(()=>{
     fetch(`http://localhost:5000/api/v1/user/blog/${id}`)
     .then(res => res.json())
     .then(data => setBlog(data.blog));
    }, [])
    
  return (
    <div>
      <Navbar/>
      <div className="blog-detail" onClick={window.scroll(0,40)}>
       <div className="blog-detail-header">
        <div className="blog-detail-image">
            <img src={blog.blogThumbnail} alt="" />
        </div>
        <div className="blog-detail-date-name">
          <p>   By: <span>{blog.author?.name || 'Unknown'}</span></p>
         <span className='blog-detail-date'>{blog.createdAt ? new Date(blog.createdAt).toLocaleDateString() : "" }</span>
         
        </div>
        <hr/>
        <div className="blog-detail-title">
          <h1>  {blog.title} </h1>
        </div>
        <div  className="blog-detail-content"  dangerouslySetInnerHTML={{ __html: blog.content }}/>
        
        </div>
        <Comments blogId={blog._id}/>
        
      </div>
      <Footer/>
    </div>
  )
}

export default BlogDetail
