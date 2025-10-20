import './App.css'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ProtectRoute from './protectRoute';
import Blogs from './components/pages/blogs';
import CreateBlogs from './components/pages/createBlog';
import EditBlogs from './components/pages/EditBlog';
import MyBlogs from './components/pages/myBlog';
import Navbar from './components/navbar';
import Signup from './components/pages/signup';
import Login from './components/pages/login';

function App() {


  return (
    <BrowserRouter>
    <Navbar/>
      <div>
        <Routes>
          <Route path="/login" element={<Login/>}/>
          <Route path="/signup" element={<Signup/>}/>

          <Route path='/blogs' element={<ProtectRoute><Blogs /></ProtectRoute>} />
          <Route path='/create' element={<ProtectRoute><CreateBlogs /></ProtectRoute>} />
          <Route path='/:id' element={<ProtectRoute><EditBlogs /></ProtectRoute>} />
          <Route path='/myblogs' element={<ProtectRoute><MyBlogs /></ProtectRoute>} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
