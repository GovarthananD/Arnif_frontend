import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import API from "../services/api";

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);

  const getBlogs = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const res = await API.get("/blogs/getBlogs", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setBlogs(res.data);
    } catch (err) {
      toast.error("Failed to fetch blogs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getBlogs();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <h1 className="text-3xl font-bold text-center mb-6">All Blogs</h1>

      {loading ? (
        <div className="flex justify-center items-center h-40">
          <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : blogs.length === 0 ? (
        <p className="text-gray-600 text-center">No blogs found</p>
      ) : (
        <div className="max-w-6xl mx-auto grid gap-6 sm:grid-cols-2 md:grid-cols-3 px-4">
          {blogs.map((blog) => (
            <div
              key={blog._id}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition"
            >
              {/* Blog Image */}
              <img
                src={
                  blog.image
                    ? blog.image
                    : "https://via.placeholder.com/600x300?text=No+Image"
                }
                alt={blog.title}
                className="w-full h-48 object-cover"
              />

              {/* Blog Content */}
              <div className="p-5">
                <h2 className="text-xl font-semibold mb-2">{blog.title}</h2>
                <p className="text-sm text-gray-600 mb-2">
                  Category: {blog.category}
                </p>
                <p className="text-gray-700 line-clamp-3 mb-3">
                  {blog.content}
                </p>
                <p className="text-xs text-gray-500">
                  Author: {blog.author || "Unknown"}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Blogs;
