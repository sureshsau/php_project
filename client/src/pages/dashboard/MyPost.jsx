import React, { useEffect } from 'react'
import AdminLayout from '../../components/AdminDashboard/AdminLayout'
import MyPostsList from '../../components/AdminDashboard/MypostsPage/MyPostsList'

export const MyPost = () => {

  useEffect(()=>{


  },[])
  return (
    <AdminLayout>
        <MyPostsList/>
    </AdminLayout>
  )
}
