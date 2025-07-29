import React, { useEffect, useState } from 'react';
import './UserComments.css'

function UserComments() {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/v1/user/myblogs/comments', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      }
    })
      .then(res => res.json())
      .then(data => setComments(data.comments || []));
  }, []);


  return (
     <div className='user-comments'>
      <h2>Comments on Your Blogs</h2>
      {comments.length === 0 && <p>No comments yet.</p>}
      {comments.map(comment => (
        <div key={comment._id} className="user-comment-item">
          <div className="user-blog-name">
            <h3>{comment.blog?.title || "Blog deleted"}</h3>
          </div>
          <div className="another-user-details">
            {comment.author?.avatar && (
              <img src={comment.author.avatar} alt={comment.author.name} style={{ width: 32, height: 32, borderRadius: '50%', marginRight: 8 }} />
            )}
            <strong>{comment.author?.name || "Unknown"}</strong> commented:
            <p>{comment.commentText}</p>
            <span style={{ fontSize: 12, color: "#888" }}>{new Date(comment.createdAt).toLocaleString()}</span>
          </div>
          <hr />
        </div>
      ))}
    </div>
  );
}

export default UserComments
