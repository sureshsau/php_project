import React from 'react'
import Layout from '../components/Layout/Layout'

const PageNotFoundPage = () => {
  return (
    <Layout>
        <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white text-center px-6">
      <h1 className="text-6xl font-bold text-blue-500">404</h1>
      <h2 className="text-3xl font-semibold mt-4">Page Not Found</h2>
      <p className="text-lg text-gray-400 mt-2 max-w-md">
        Oops! The page you are looking for does not exist. It might have been moved or deleted.
      </p>
      <Link to="/" className="mt-6 px-6 py-3 bg-blue-500 rounded-md text-lg font-semibold shadow-md hover:bg-blue-600 transition-all">
        Go Back Home
      </Link>
    </div>
    </Layout>
  )
}

export default PageNotFoundPage