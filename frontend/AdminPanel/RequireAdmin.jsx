import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

function RequireAdmin({ children}) {
    const [loading, setLoading] = useState(true);
    const [isAdmin, setIsAdmin] = useState(false);
    const naviagate = useNavigate();

    useEffect(()=>{
      fetch("http://localhost:5000/api/v1/user/auth",{
        headers:{
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => res.json())
      .then((data) => {
        if(data.success && data.user.role === 'admin'){
            setIsAdmin(true);
        } else{
            return <div>403 not found</div>
        }
      })
      .finally(()=> setLoading(false));
    }, [naviagate]);
     
    if (loading) return <div>Loading...</div>;
    if (!isAdmin) return null;

  return children;
}

export default RequireAdmin
