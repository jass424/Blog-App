import React, { useEffect, useRef, useState } from "react";
import "./CreateBlogs.css";
import upload_area from '../assets/upload_area.svg'
import Quill from "quill";
import { marked } from 'marked';  

const CreateBlogs = () => {

  const editorRef = useRef(null);
   const quillRef = useRef(null);

 const [createBlog, setCreateBlog] = useState({
    title: '',
    content:'',
    image:''
 })
  const [image, setImage] = useState(false);
  const [content, setContent] = useState('');
  
  const [loading, setLoading] = useState(false);
  
  const imageHandler = (e) => {
        setImage(e.target.files[0])
     }

 const handleContent = async ()=> {
  if(!createBlog.title.trim()) return ;
  try {
    setLoading(true);
    const res = await fetch('http://localhost:5000/api/v1/user/generate/content',{
      method: 'POST',
      headers: {
       'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt: createBlog.title })
    })
    const data = await res.json();
    if(data.success){
      quillRef.current.root.innerHTML = marked(data.content)
    }
  } catch (error) {
    console.log(error)
  } finally {
    setLoading(false);
  }
}
 

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(createBlog)
     let responseData;
         const content = quillRef.current.root.innerHTML;
         let blog = {
             ...createBlog,
             content,
          };

        let formData = new FormData()
        formData.append('blogimage', image);

        await fetch('http://localhost:5000/api/v1/user/upload/blogimage', {
            method: 'POST',
            headers: {
                Accept:'application/json',
            },
            body: formData,
        }).then((resp)=> resp.json()).then((data)=> {responseData = data})

        if(responseData.success)
        {
          blog.blogThumbnail= responseData.image_url;
          console.log(blog);
          await fetch('http://localhost:5000/api/v1/user/upload/blog', {
            method:'POST',
            headers:{
                Accept:'application/json',
                'Content-Type':'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}` 
            },
            body:JSON.stringify(blog),
          }).then((resp)=>resp.json()).then((data)=>{
             data.success?alert('blog Added'):alert('Failed')
          })
        }
   
    setCreateBlog({
      title: '',
    content:'',
    image:''   
    });
    setImage(false);
    setContent('');
    if (quillRef.current) {
  quillRef.current.setContents([]);
}
  };

  useEffect(()=>{
    if(!quillRef.current && editorRef.current){
      quillRef.current = new Quill(editorRef.current, {theme: 'snow',
        
      })
       quillRef.current.on('text-change', () => {
      setContent(quillRef.current.root.innerHTML);
    });
    }
  }, [])

  return (
    <div className="blog-creation-container">
      <h2>Create a New Blog</h2>
      <form className="blog-form" onSubmit={handleSubmit}>
        
        <label htmlFor="file-input">
                <img src={image ? URL.createObjectURL(image) : upload_area} alt=""  className='addblog-thumbnail-img'/>
            </label>
            <input onChange={imageHandler} type="file" name='image' id='file-input' hidden />      
        <label>
          Title:
          <input type="text" value={createBlog.title} name="title" onChange={(e) => setCreateBlog({...createBlog, [e.target.name]:e.target.value})}
            required className="blog-input" placeholder="Enter blog title"
          />
        </label>

        <div >
          Content:
         
            <div className="blog-content-area" ref={editorRef}></div>
            {/* {loading && (<div>loading...</div>)}
            <button className="generate-with-ai-btn" type="button" onClick={handleContent}>Generate with AI</button> */}
        </div>
 

        <button  type="submit" className="blog-submit-btn">  Create Blog </button>
      </form>
    </div>
  );
};

export default CreateBlogs;