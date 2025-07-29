import React, { useState } from 'react';
import default_logo from '../Components/assets/user.png';
import { Link } from 'react-router-dom';
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";
import './Css/Profile.css';
import { useUser } from './UserContext';

function Profile() {
  const { user, setUser } = useUser();
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file || !user?._id) return alert("User or file missing.");

    const formData = new FormData();
    formData.append("avatar", file);
    formData.append("userId", user._id);

    const res = await fetch("http://localhost:5000/api/v1/user/upload/avatar", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    if (data.success) {
      setUser((prev) => ({ ...prev, avatar: data.avatar }));
      alert("Avatar updated!");
    } else {
      alert(data.message || "Failed to update avatar");
    }
  };

  // ✅ show loading fallback while user is null
  if (!user) return <p className="loading-text">Loading user details...</p>;

  return (
    <div className="profile">
      <form onSubmit={handleUpload}>
        <div className="user_profile_details">
      <div className="profile-details-left">
        
          <label htmlFor="file-input">
            <img  src={  file  ? URL.createObjectURL(file)  : user?.avatar  || default_logo }    alt="avatar"  className="profile-avatar"  />
          </label>
          <input  onChange={handleFileChange}  type="file"  name="avatar"  id="file-input"  hidden  />
          
        
        {/* <h3>Web Developer</h3> */}
        <div className="user-social-icons">
          <Link to="#"><FaFacebook /></Link>
          <Link to="#"><FaInstagram /></Link>
          <Link to="#"><FaLinkedin /></Link>
        </div>
      </div>

      <div className="profile-details-right">
        <h2>{user.name}</h2>
        <p><span>Email:</span> {user.email}</p>
        {/* <h3>About Me</h3> */}
        {/* <div className="user-about-section">
          <textarea  name="aboutme"  id="aboutme"  rows={6}  placeholder="Write here..."  className="aboutme-textarea"  />
        </div> */}
        <button type='submit' className='submit-btn'>Upload</button>
      </div>
      </div>
      </form>
    </div>
  );
}

export default Profile;
