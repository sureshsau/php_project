import React from 'react'
import Layout from '../components/Layout/Layout'
import FounderCard from '../components/AboutPage/CardSection/FounderCard'
import FounderSection from '../components/AboutPage/CardSection/FounderSection'

const AboutPage = () => {
  return (
    <Layout>
    <div className='w-screen items-center justify-center'>
        <FounderSection/>       
    </div>
  </Layout>
  )
}

export default AboutPage