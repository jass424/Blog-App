import React from 'react'
import Navbar from '../Components/Navbar/Navbar'
import SideBar from '../Components/SideBar/SideBar'
import Footer from '../Components/Footer/Footer'

function MainLayout({ children }) {
  return (
     <div className="main-layout">
      <Navbar />
      <div className="content-wrapper" style={{ display: 'flex' }}>
        <SideBar />
        <main style={{ flex: 1, marginTop: '70px', marginLeft: '160px' }} className="main-content">
          {children}
        </main>
      </div>
      <Footer />
    </div>
  )
}

export default MainLayout
