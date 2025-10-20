import React, { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

export default function CreateBlog() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [loading, setLoading] = useState(false);

  const [blogData, setBlogData] = useState({
    title: "",
    category: "",
    content: "",
    image: "",
  });

  const handleChange = (e) => {
    setBlogData({ ...blogData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!token) {
      toast.error("You must be logged in to create a blog");
      navigate("/login");
      return;
    }

    setLoading(true);
    try {
      await axios.post("https://arnif-backend.onrender.com/blogs/createBlog", blogData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Blog created successfully!");
      navigate("/blogs");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to create blog");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center items-center">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-lg">
        <h2 className="text-2xl font-semibold mb-5 text-center">Create Blog</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="title"
            placeholder="Blog Title"
            value={blogData.title}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2 mb-3"
            required
          />

          <select
            name="category"
            value={blogData.category}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2 mb-3"
            required
          >
            <option value="">Select Category</option>
            <option value="Career">Career</option>
            <option value="Finance">Finance</option>
            <option value="Travel">Travel</option>
            <option value="Technology">Technology</option>
            <option value="Health">Health</option>
            <option value="Education">Education</option>
          </select>

          <textarea
            name="content"
            placeholder="Blog Content"
            value={blogData.content}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2 mb-3"
            rows="5"
            required
          />

          <input
            type="text"
            name="image"
            placeholder="Image URL (optional)"
            value={blogData.image}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2 mb-3"
          />

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 font-semibold rounded-lg flex justify-center items-center text-white transition-all duration-300 ${
              loading
                ? "bg-blue-500 cursor-not-allowed opacity-70"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {loading ? (
              <span className="w-5 h-5 border-4 border-white border-t-transparent rounded-full animate-spin"></span>
            ) : (
              "Create Blog"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
