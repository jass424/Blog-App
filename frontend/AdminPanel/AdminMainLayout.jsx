import React from 'react'
import AdminSideBar from './AdminSidebar/AdminSidebar'

function AdminMainLayout({children}) {
  return (
    <div className='admin-main -layout'>
        <div className="content-wrapper" style={{  display:"flex"}}>
        <AdminSideBar />
        <main style={{ flex: 1 }} className="main-content">
          {children}
        </main>
      </div>
      
    </div>
  )
}

export default AdminMainLayout
