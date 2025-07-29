import React, { useEffect, useState } from 'react';
import './CommentsSection.css';
import { MdDelete } from "react-icons/md";

function CommentsSection() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const headers = {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    };
    fetch('http://localhost:5000/api/v1/user/admin/users-with-blogs-comments', { headers })
      .then(res => res.json())
      .then(data => setUsers(data.users || []));
      setUsers((users.comments || []).filter(comment => comment._id !== comment._id))
  }, []);
  
  const handleDelete = async (commentId) => {
    if (!window.confirm('Delete this comment?')) return;

    try {
      const res = await fetch(
        'http://localhost:5000/api/v1/user/admin/delete/comment',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`
          },
          body: JSON.stringify({ id: commentId })
        }
      );
      const data = await res.json();

      if (data.success) {
        // remove comment from local state
        setUsers((prev) =>
          prev.map((u) => ({
            ...u,
            comments: u.comments.filter((c) => c._id !== commentId)
          }))
        );
      } else {
        alert('Server failed to delete the comment.');
      }
    } catch (err) {
      console.error('Delete error:', err);
      alert('Server error while deleting comment.');
    }
  };
 

  return (
    <div className='comment-section' style={{ marginLeft:'190px'}}>
      <h2>All Comments (Admin View)</h2>
      {users.length === 0 && <p>No comments found.</p>}
      {users.map(user => (
        <div key={user._id} className="admin-comment-user-block">
          <h3>{user.name} ({user.email})</h3>
          {user.comments.length === 0 && <p>No comments by this user.</p>}
          {user.comments.map(comment => (
            <div key={comment._id} className="admin-comment-item">
              <p>
                <strong>Comment:</strong> {comment.commentText}
              </p>
             <div className="comment-delete-button" onClick={() => handleDelete(comment._id)}><MdDelete className='delete-icon' /></div>
              <p>
                <strong>Date:</strong> {new Date(comment.createdAt).toLocaleString()}
              </p>
             
              <hr/>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}


export default CommentsSection;