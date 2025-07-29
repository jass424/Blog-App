import { BrowserRouter, Route, Routes } from "react-router";
import './App.css'
import MainLayout from './pages/MainLayout';
import AuthLayout from "./pages/AuthLayout ";
import Home from './pages/Home';
import Login from './pages/Login';
import BlogDetail from './Components/BlogDetail/BlogDetail';
import Profile from "./pages/Profile";
import CreateBlogs from "./Components/CreateBlogs/CreateBlogs";
import UserPendingBlogs from "./Components/UserPendingBlogs/UserPendingBlogs";
import Admin from "../AdminPanel/Admin";
import PendingBlogs from "../AdminPanel/PendingBlogs/PendingBlogs";
import AdminMainLayout from "../AdminPanel/AdminMainLayout";
import DetailBlogsForAdmin from "../AdminPanel/DetailBlogsForAdmin/DetailBlogsForAdmin";
import ShowingApprovedBlogs from "../AdminPanel/ShowimgApprovedBlogs/ShowingApprovedBlogs";
import AdminDashboard from "../AdminPanel/AdminDashboard/AdminDashboard";
import UserComments from "./Components/UserComments/UserComments";
import ShowDetailedBlogToAdmin from "../AdminPanel/ShowimgApprovedBlogs/ShowDetailedBlogToAdmin";
import RequireAdmin from "../AdminPanel/RequireAdmin";
import CommentsSection from "../AdminPanel/CommentsSectionFor Admin/CommentsSection";
import Activity from "../AdminPanel/Activity/Activity";
import About from "./Components/About/About";


function App() {
 

  return (
    <> 
     <BrowserRouter>
      <Routes>
        <Route path='/' element={<MainLayout><Home/></MainLayout>}/>
          <Route path='/about' element={<MainLayout><About/></MainLayout>}/>
         <Route path='/blog/:id' element={<BlogDetail/>}/>
          <Route path='/profile' element={<MainLayout><Profile/></MainLayout>}/>
           <Route path='/my-comments' element={<MainLayout><UserComments/></MainLayout>}/>
          <Route path='/createblogs' element={<MainLayout><CreateBlogs/></MainLayout>}/>
           <Route path='/userpendingblogs' element={<MainLayout><UserPendingBlogs/></MainLayout>}/>
         <Route path='/login' element={<AuthLayout><Login/></AuthLayout>}/>


        <Route path='/admin' element={<RequireAdmin><AuthLayout><Admin/></AuthLayout></RequireAdmin>}/>
        <Route path='/detail-blog-for-admin/:id' element={<RequireAdmin><AuthLayout><DetailBlogsForAdmin/></AuthLayout></RequireAdmin>}/>
        <Route path='/showdetail-blog-for-admin/:id' element={<RequireAdmin><AuthLayout><ShowDetailedBlogToAdmin/></AuthLayout></RequireAdmin>}/>
        <Route path='/pendingblogs' element={<RequireAdmin><AdminMainLayout><PendingBlogs/></AdminMainLayout></RequireAdmin> }/>
        <Route path='/comment-section/admin' element={<RequireAdmin><AdminMainLayout><CommentsSection/></AdminMainLayout></RequireAdmin> }/>
        <Route path='/admin-dashboard' element={<RequireAdmin><AdminMainLayout><AdminDashboard/></AdminMainLayout></RequireAdmin> }/>
        <Route path='/approved-blogs-by-admin' element={<RequireAdmin><AdminMainLayout><ShowingApprovedBlogs/></AdminMainLayout></RequireAdmin> }/>
        <Route path='//activity-section/admin' element={<RequireAdmin><AdminMainLayout><Activity/></AdminMainLayout></RequireAdmin> }/>
      </Routes>
     </BrowserRouter>
    </>
  )
}

export default App
