import React from 'react'
import Layout from '../components/Layout/Layout'
import QueryForm from '../components/ContactPage/QueryForm'

const ContactPage = () => {
  return (
    <Layout>
        <div className='w-screen items-center justify-center'>
                <QueryForm/>
        </div>
    </Layout>
  )
}

export default ContactPage