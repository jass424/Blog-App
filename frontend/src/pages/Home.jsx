import React from 'react'
import Hero from '../Components/Hero/Hero'
import ApprovedBlogsInHomePage from '../Components/ApprovedBlogsInHomePage/ApprovedBlogsInHomePage'
import './Css/Home.css'

function Home() {
  return (
    <div className='home'>
      <Hero />
       <div className='approved-blogs-for-homepage-heading'><h1>Latest Blogs</h1></div>
       <hr className='home-heading-line' />
      <ApprovedBlogsInHomePage/>
    </div>
  )
}

export default Home
