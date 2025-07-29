import React, { createContext, useState, useContext, useEffect } from "react";

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export function UserProvider({ children }) {
  const [user, setUser] = useState(null); // or initial user from localStorage/api

  const [logs , setLogs] = useState([]);

  const fetchUser = async () =>{
    const token = localStorage.getItem("token");
    if(!token) return;
  
    try {
      const res = await fetch('http://localhost:5000/api/v1/user/auth',{
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
       const data = await res.json();

      if (data.success) {
        setUser(data.user);
      } else {
        console.error("Auth failed:", data.message);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  }

  useEffect(()=>{
    fetchUser();
  }, [])

  return (
    <UserContext.Provider value={{ user, setUser, logs, setLogs }}>
      {children}
    </UserContext.Provider>
  );
}