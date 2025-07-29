import React, { useEffect, useState } from 'react'
import './Comments.css'
import { FaCommentAlt } from "react-icons/fa";

function Comments({blogId}) {

    const [content, setContent] = useState('');
    const [comment, setComment] = useState([]);

    useEffect(()=>{
        fetch(`http://localhost:5000/api/v1/user/blog/${blogId}/comments`)
        .then(res => res.json())
        .then(data => setComment(data.comments || []));
    }, [blogId])


    const handleSubmit = async (e)=>{
      e.preventDefault();

      const res = await  fetch(`http://localhost:5000/api/v1/user/blog/${blogId}/comment`,{
            method: 'POST',
            headers:{
                'Content-type': 'application/json',
                Authorization:  `Bearer ${localStorage.getItem('token')}`,
            },
            body: JSON.stringify({ blogId, commentText: content}),
        });
        const data = await res.json();
        if(data.success) {
            setComment([data.comment, ...comment]);
            setContent('');
        }
    }


  return (
    <div className='comments'>
        <h3>Comments </h3>
        <hr />
        <div className="comment-section">
            <form action="" onSubmit={handleSubmit}>
                <textarea name="" value={content} onChange={(e)=> setContent(e.target.value)} placeholder='Write a comment...' rows={5}/>
                    <button type='submit'>Post Comment</button>
            </form>
             <div className="comments-list">
          {comment.map(comment => (
            <div key={comment._id} className="comment-item">
              {comment.author?.avatar && (
                <img src={comment.author.avatar} alt={comment.author.name} className="comment-avatar" />
              )}
              <div>
                <span className="comment-author">{comment.author?.name || "Unknown"}</span>
                <span className="comment-date">{new Date(comment.createdAt).toLocaleString()}</span>
                <div className="comment-text">{comment.commentText}</div>
              </div>
            </div>
          ))}
        </div>
        </div>
      
    </div>
  )
}

export default Comments
