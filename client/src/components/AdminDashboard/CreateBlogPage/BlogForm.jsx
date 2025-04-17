import React from 'react'
import BlogEditor from './BlogEditor'
import FeaturedImageUploader from './FeaturedImageUploader'
import TagInput from './TagInput'
import TitleInput from './TitleInput'
import CategorySelect from './CategorySelect'
import SummaryInput from './SummaryInput'

export const BlogForm = () => {
  return (
    <div>
        <TitleInput/>
        <CategorySelect/>
        <FeaturedImageUploader/>
        <TagInput/>
        <BlogEditor/>
        <BlogEditor/>
        <SummaryInput/>
    </div>
  )
}
