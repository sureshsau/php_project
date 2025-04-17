
import React, { useEffect } from 'react'
import BlogDetailsLayout from '../components/BlogDetailsPage/BlogDetailsLayout'
import Layout from '../components/Layout/Layout'
import { useParams } from 'react-router-dom'

const BlogDetailsPage = () => {
  return (
    <Layout>
        <div className='w-screen items-center justify-center mt-13'>
        <BlogDetailsLayout/>
        </div>
    </Layout>
  )
}

export default BlogDetailsPage