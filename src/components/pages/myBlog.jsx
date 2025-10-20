import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { Link } from "react-router-dom";

export default function MyBlogs() {
  const token = localStorage.getItem("token");
  const [loading, setLoading] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [blogs, setBlogs] = useState([]);

  const fetchMyBlogs = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:5000/blogs/myblogs", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBlogs(res.data);


      const userId = JSON.parse(atob(token.split(".")[1])).id;

      // ✅ Fix: Normalize ObjectId before comparing
      const myBlogs = res.data.filter(
        (b) => (b.userId?._id || b.userId)?.toString() === userId
      );

      setBlogs(myBlogs);
    } catch (error) {
      toast.error("Failed to fetch blogs");
    } finally {
      setLoading(false);
    }
  };

 const handleDelete = async (id) => {
  setDeletingId(id);
  try {
    await axios.delete(`https://arnif-backend.onrender.com/blogs/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    toast.success("Blog deleted successfully");

    // ✅ Remove deleted blog from state immediately
    setBlogs((prevBlogs) => prevBlogs.filter((b) => b._id !== id));
  } catch (error) {
    toast.error(error.response?.data?.message || "Failed to delete blog");
  } finally {
    setDeletingId(null);
  }
};


  useEffect(() => {
    fetchMyBlogs();
  }, []);

  return (
    <div className="container mx-auto py-10 px-4">
      <h1 className="text-3xl font-semibold text-center mb-6">My Blogs</h1>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <span className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></span>
        </div>
      ) : blogs.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {blogs.map((blog) => (
            <div
              key={blog._id}
              className="bg-white shadow-lg rounded-2xl overflow-hidden border border-gray-100"
            >
              <img
                src={
                  blog.image
                    ? blog.image
                    : "https://via.placeholder.com/600x300?text=No+Image"
                }
                alt={blog.title}
                className="w-full h-48 object-cover"
              />

              <div className="p-5">
                <h3 className="text-lg font-semibold">{blog.title}</h3>
                <p className="text-gray-600 mt-2 text-sm line-clamp-3">
                  {blog.content}
                </p>

                <div className="flex justify-between mt-4">
                  <Link
                    to={`/${blog._id}`}
                    className="text-sm bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
                  >
                    Edit
                  </Link>

                  <button
                    onClick={() => handleDelete(blog._id)}
                    disabled={deletingId === blog._id}
                    className={`text-sm flex items-center justify-center w-[90px] h-[36px] rounded-lg text-white transition-all duration-300 ${deletingId === blog._id
                        ? "bg-red-400 cursor-not-allowed"
                        : "bg-red-500 hover:bg-red-600"
                      }`}
                  >
                    {deletingId === blog._id ? (
                      <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                    ) : (
                      "Delete"
                    )}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">No blogs found</p>
      )}
    </div>
  );
}
