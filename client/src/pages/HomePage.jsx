import React from 'react'
import Layout from '../components/Layout/Layout'
import Banner from '../components/HomePage/Banner'
import CardList from '../components/AdminDashboard/ExplorePage/CardList'



const HomePage = () => {
  return (
    <Layout>
      <div className='w-screen items-center justify-center'>
        <Banner/>
        <div className='w-[70%] self-center'>
          
        </div>
      </div>
    </Layout>
  )
}

export default HomePage