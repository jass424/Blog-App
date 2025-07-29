import React, { useEffect, useState } from 'react';
import './Activity.css'

function Activity() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowPerPage]= useState(10);
  const indexOfLastItem = currentPage * rowsPerPage;
  const indexOfFirstItem = indexOfLastItem - rowsPerPage;
  const currentItem = logs.slice(indexOfFirstItem, indexOfLastItem);
  const totalPage = Math.ceil(logs.length/rowsPerPage)

  useEffect(() => {
    fetch('http://localhost:5000/api/v1/user/admin/activity/logs', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      }
    })
      .then(res => res.json())
      .then(data => {
        setLogs(data.logs || []);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading...</div>;

  const handlePrev = () => {
   setCurrentPage((prev)=> Math.max(prev - 1, 1))
  }

  const handlePageClick = (pageNumber)=> {
        setCurrentPage(pageNumber)
    }

    const handleNext = () =>{
      setCurrentPage((prev)=> Math.min(prev + 1, totalPage))
    }

  return (
    <div className="activity-section">
      <h2> Activity Logs</h2>
      <table>
        <thead>
          <tr>
            <th>Time</th>
            <th>User</th>
            <th>Action</th>
            <th>Target</th>
            <th>Details</th>
          </tr>
        </thead>
        <tbody>
          {currentItem.length === 0 && (
            <tr>
              <td colSpan={5} style={{ textAlign: 'center' }}>No activity logs found.</td>
            </tr>
          )}
          {currentItem.map(log => (
            <tr key={log._id}>
              <td>{new Date(log.createdAt).toLocaleString()}</td>
              <td>{log.user?.name || 'Unknown'}</td>
              <td>{log.action}</td>
              <td>
                {log.targetType === 'User' && (log.action === 'User Login' || log.action === 'User Logout')
                  ? log.user?.email || log.user?._id || ''
                  : `${log.targetType} ${log.target?._id || ''}`
                }
              </td>
              <td>{log.details}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination-btn">
        <button   onClick={handlePrev} disabled ={currentPage === 1}>Prev</button>
        {Array.from({length: totalPage}, (_, index) =>(
         <button onClick={() => handlePageClick(index + 1)} className={currentPage ===index+1 ? 'active' : '' } >{index + 1}</button>
       ))}
        <button onClick={handleNext} disabled={currentPage === totalPage}>Next</button>
      </div>
      
    </div>
   
  );

}

export default Activity;