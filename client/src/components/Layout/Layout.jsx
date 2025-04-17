import React from 'react'
import Navbar from './Navbar'
import Footer from './Footer'

const Layout = ({children}) => {
  return (
    <div className='flex flex-col relative h-screen w-screen overflow-x-hidden'>
        <Navbar/>
        <div className='pt-5'>
            {children}
        </div>
        <Footer/>
    </div>
  )
}

export default Layout