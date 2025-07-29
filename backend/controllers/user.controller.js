const User = require("../models/usermodel.js");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const dotenv = require('dotenv');
const getDataUri = require("../utils/dataUri.js");
const Blog = require("../models/blog.model.js");
const Comments = require("../models/comment.model.js");
const cloudinary = require('cloudinary').v2;
const ActivityLog = require("../models/activitylog.model.js");
const logActivity = require('../utils/logActivity.js')



dotenv.config();

// for user regeistation

const register = async (req, res) =>{
    try {
        const { name, email, password}= req.body;
        if(!name || !email || !password){
            return res.status(400).json({
                success: false,
                message: "Please fill all the fields"
            })
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!emailRegex.test(email)){
            return res.status(400).json({
                success: false,
                message: "Please enter a valid email"
            })
        }
        if(password.length < 6){
            return res.status(400).json({
                success: false,
                message: "Password must be at least 6 characters long"
            })
        }
        const existingUserByEmail = await User.findOne({email: email});
        if(existingUserByEmail){
            return res.status(400).json({
                success: false,
                message: "User with this email already exists"
            })
        }
        await User.create({
            name,
            email,
            password
        })
        return res.status(201).json({
            success: true,
            message: "User registered successfully"
        })
        
    } catch (error) {
       console.log(error);
       return res.status(500).json({
            success: false,
            message: "failed to register"
       })
        
    }
}


// for user login
const login = async (req, res) =>{
    try {
        const {email, password} =req.body;
        if(!email || !password){
            return res.status(400).json({
                success: false,
                message: "Please fill all the fields"
            })
        }
        let user = await User.findOne({email});
        if(!user){
            return  res.status(400).json({
                success: false,
                message: "Incorrect email or password"
            })
        }
        const isPasswordCorrect = await bcrypt.compare(password, user.password)
        if(!isPasswordCorrect){
            return res.status(400).json({
                success: false,
                message: "invalid Credentials"
            })
        }
        const token =  jwt.sign({ id:user._id, role: user.role}, process.env.SECRET_KEY, {expiresIn:"1d"}) /// token genrate

         // Log activity
        await logActivity({
            action: 'User Login',
            user: user._id,
            targetType: 'User',
            target: user._id,
            details: `User ${user.name} logged in.`
        });

        return res.status(200).cookie("token", token, {maxAge: 1*24*60*60*1000, httpsOnly:true, sameSite:"strict" }).json({
            success:true,
            token,
            message:`Welcome back ${user.name}`,
            user
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "failed to login"
        });
        
    }
}
// for logout
const logOut = async (req, res) =>{
     try {
        // Log activity (if user is authenticated)
        if (req.user) {
           console.log('logging out', req.user);
            await logActivity({
                action: 'User Logout',
                user: req.user._id,
                targetType: 'User',
                target: req.user._id,
                details: `User logged out.`
            });
        }
        return  res.status(200).cookie("token", "", {maxAge: 0}).json({
            message: 'Logout successfully',
            success: 'true'
        })
     } catch (error) {
        console.log(error)
     }
};


// for uploading profile picture
const uploadAvatar = async (req, res) => {
    try {
        // Get user id from token/session or req.body
        const userId = req.body.userId; // Adjust as needed
        if (!req.file) {
            return res.status(400).json({ success: false, message: "No file uploaded" });
        }
        const avatarUrl =`http://localhost:${process.env.PORT}/images/${req.file.filename}`; // Or full URL if needed

        // Update user
        const user = await User.findByIdAndUpdate(
            userId,
            { avatar: avatarUrl },
            { new: true }
        );
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }
        res.json({
            success: 1,
            message: "Avatar updated",
            avatar: avatarUrl,
            user
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Failed to update avatar" });
    }
};

//for uploading thumbnail of blog
const uploadThumbnail = async (req, res)=>{
      res.json({
    success:1,
    image_url:`http://localhost:${process.env.PORT}/images/${req.file.filename}`
  })
}


// for upload entire blog..
const addBlog = async (req, res) =>{
   let blogs = await  Blog.find({});
   let id;
   if(blogs.length>0){
    let last_blog_array = blogs.slice(-1);
    let last_blog = last_blog_array[0];
     id = typeof last_blog.id === 'number' ? last_blog.id + 1 : 1;
   } else{
    id =1;
   }

   // validate required fields

   if (
    !req.body.title ||
    !req.body.content ||
    !req.body.blogThumbnail 
   
   ) {
        return res.status(400).json({
        success: false,
        message: "Please fill all the fields"
    });
   }
   const blog = await Blog.create({
    id:id,
    title:req.body.title,
    content:req.body.content,
    blogThumbnail:req.body.blogThumbnail,
    author: req.user.id,
    status: 'pending'

   });
   console.log(blog);
   console.log("save");
   res.json({
    success:true,
    title:req.body.title
   })
}

// get user blogs that he submit... user
const myBlogs = async (req, res)=>{
    try {
        const blogs = await Blog.find({ author: req.user.id}).populate('author', 'name avatar').sort({createdAt: -1});
        res.json({ success: true, blogs })
    } catch (error) {
        res.status(500).json({ success: false, message: 'failed to fetch blogs'})
    }
}

// get pending blogs for .....admin 
const pendingBlogs = async (req, res)=>{
    try {
         const blogs = await Blog.find({ status: 'pending'}).populate( 'author', 'name email').sort({createdAt: -1});
          res.json({ success: true, blogs });
    } catch (error) {
       res.status(500).json({ success: false, message: 'failed to fetch blogs'}); 
    }
   
}

// aproved blogs for admin...
const approveBlog = async (req, res)=>{
    try {
        const blog = await Blog.findByIdAndUpdate(req.params.id, { status: 'approved'}, { new: true});
        if(!blog) return res.status(404).json({
            success: false,
            message: 'Blog not found'
        });
        //notify user
         await User.findByIdAndUpdate(blog.author, {
        $push: {
        notifications: {
          type: 'approved',
          blogTitle: blog.title,
          message: `Your blog "${blog.title}" was approved by admin.`,
        }
      }
    });
        res.json({
            success: true,
            message: 'Blog approved', blog
        });
        await logActivity({
         action: 'Blog Approved',
         user: req.user.id,
         targetType: 'Blog',
         target: blog._id,
         details: `Blog titled "${blog.title}" was approved.`
});
    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to approve blog" }); 
    }
}

// api for the admin to reject the blog
const rejectBlog = async(req, res)=>{
    try {
        const blog = await Blog.findByIdAndUpdate(req.params.id,{ status: 'rejected'},{ new: true});
        if(!blog) return res.status(404).json({ success: false, message: "Blog not found" });
        // notification to the user
         await User.findByIdAndUpdate(blog.author, {
      $push: {
        notifications: {
          type: 'rejected',
          blogTitle: blog.title,
          message: `Your blog "${blog.title}" was rejected by admin.`,
        }
      }
    });
        res.json({success: true, message: 'Blog rejected', blog});
        }
     catch (error) {
        res.status(500).json({ success: false, message: "Failed to reject blog" }); 
    }
}

// for remove blog....
const removeBlog = async (req, res) => {
  const { id } = req.body;
  if (!id) {
    return res.status(400).json({ success: false, message: "Blog id is required" });
  }
  try {
    const deletedBlog = await Blog.findByIdAndDelete( id );
    if (!deletedBlog) {
      return res.status(404).json({ success: false, message: "Blog not found" });
    }
    res.json({ success: true, message: "Blog deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error deleting blog" });
  }
};

// get all the blogs
const allBlogs = async (req, res)=>{
    try {
        const blogs = await Blog.find({}).populate('author', 'name avatar').sort({createdAt: -1});
        if(!blogs){
            return res.status(404).json({
                success: false,
                message: "Blogs not found ! Something went wrong"
            });
        }
         console.log('all blogs fetched');
            res.json({
                success: true,
                blogs
            })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error! blogs not found"
        })
    }
}

// get the blog through id
const blogDetail = async (req, res)=>{
    try {
        const blog = await Blog.findById(req.params.id).populate('author','name avatar');
        if(!blog) return res.status(404).json({
            success:false,
            message:'Blog not found'
        });
        res.json({success: true, blog});

    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to fetch blog' }); 
    }
}

// get user detail 
const userdata = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    console.log("Decoded user from token:", req.user); // Useful for debugging

    return res.status(200).json({
      success: true,
      user
    });

  } catch (error) {
    console.error("Error in userdata controller:", error.message);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// api for add comments
const addComments = async (req, res)=>{
    try {
        const {blogId, commentText} = req.body;
        if(!blogId || !commentText) {
            return res.status(400).json({
                success: false,
                message: "Blog id and comment text is required"
            });
        }
            const comment = await Comments.create({
                blog: blogId,
                author: req.user.id,
                commentText
            });
            await comment.populate('author', "name avatar");
            res.json({
                success:true,
                comment
            })
        
    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to add comment" }); 
    }
}

// api for get blog
const getBlog = async (req, res)=>{
   try {
    const {blogId} = req.params;
    const comments = await Comments.find({blog: blogId}).populate('author', 'name avatar')
    .sort({ createdAt: -1 });
    res.json({ success: true, comments});
   } catch (error) {
     res.status(500).json({ success: false, message: "Failed to fetch comments" });
   } 
}

// api to count no. of blogs
const totalUser = async (req, res) => {
  const count = await User.countDocuments();
  res.json({ count});
}

const totalBlogs = async (req, res)=>{
    try {
        const count = await Blog.countDocuments({ status: 'approved'});
        res.json({count});
    } catch (error) {
         res.status(500).json({ success: false, message: "Error counting blogs" });
    }
}

// api for user and the there blogs and comments on them
const usersWithBlogsAndComments = async (req, res) => {
  try {
    const users = await User.find({}, 'name email avatar')
      .lean();

    // For each user, get their approved blogs and comments
    const usersWithDetails = await Promise.all(users.map(async user => {
      const blogs = await Blog.find({ author: user._id, status: 'approved' }).lean();
      const comments = await Comments.find({ author: user._id }).lean();
      return { ...user, blogs, comments };
    }));

    res.json({ success: true, users: usersWithDetails });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to fetch users with blogs and comments" });
  }
};


// api for comments on user blogs
const commentsOnMyBlogs = async (req, res) => {
  try {
    // Find all blogs by this user
    const myBlogs = await Blog.find({ author: req.user.id }, '_id title');
    const blogIds = myBlogs.map(blog => blog._id);

    // Find all comments on these blogs, populate author and blog info
    const comments = await Comments.find({ blog: { $in: blogIds } })
      .populate('author', 'name avatar')
      .populate('blog', 'title')
      .sort({ createdAt: -1 });

    res.json({ success: true, comments });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to fetch comments" });
  }
};

// for remove comment....
const deleteComment = async (req, res) => {
  const { id } = req.body;
  if (!id) {
    return res.status(400).json({ success: false, message: "comment id is required" });
  }
  try {
    const deletedComment = await Comments.findByIdAndDelete( id );
    if (!deletedComment) {
      return res.status(404).json({ success: false, message: "not deleted" });
    }
    res.json({ success: true, message: "comment deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error deleting comment" });
  }
};



// activity
const getActivityLogs = async (req, res) =>{
   try {
    const logs = await ActivityLog.find()
      .populate('user', 'name email')
      .populate('target')
      .sort({ createdAt: -1 })
      .limit(100);
    res.json({ success: true, logs });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to fetch activity logs' });
  }
}


module.exports = { register, login, logOut, uploadThumbnail, addBlog, removeBlog, allBlogs,
    uploadAvatar,userdata, myBlogs, pendingBlogs,approveBlog,rejectBlog, blogDetail, addComments, getBlog, totalUser, totalBlogs, usersWithBlogsAndComments, commentsOnMyBlogs ,deleteComment , getActivityLogs};