import React from 'react'
import Layout from '../components/Layout/Layout'
import { CredentialForm } from '../components/CredentialPage/CredentialForm'

const CredentialPage = () => {
  return (
    <Layout>
        <div className='w-screen items-center justify-center mt-13'>
               <CredentialForm/>
        </div>
    </Layout>
  )
}

export default CredentialPage