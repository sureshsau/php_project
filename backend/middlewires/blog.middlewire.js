import Blog from "../models/blog.model.js";

export const isWriter=async(req,res,next)=>{
    try{
        const role=req.user.role;
        if(role!='writer'){
            return res.status(500).json({
                success:false,
                message:"you are not a writer you can't create a blog"
            })
        }
        next();
    }catch(err){
        console.log("err",err)
    }
}
export const isBlogOwner = async (req, res, next) => {
    try {
      const blogId = req.params.id;
  
      const blog = await Blog.findById(blogId).select('author');
    
      if (!blog) {
        return res.status(404).json({ message: 'Blog not found' });
      }
  
      if (blog.author.toString() !== req.user._id.toString()) {
        return res.status(403).json({ message: 'You are not the owner of this blog' });
      }
  
      next(); 
    } catch (err) {
      console.error(err);
      res.status(500).json({ message:err.message || 'something went wrong in isBlogOwner middlewire' });
    }
};