import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "sonner";

export default function EditBlog() {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState("");

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/blogs/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTitle(res.data.title);
        setCategory(res.data.category);
        setContent(res.data.content);
        setImage(res.data.image || "");
      } catch (err) {
        toast.error(err.response?.data?.message || "Failed to fetch blog");
      } finally {
        setLoading(false);
      }
    };
    fetchBlog();
  }, [id, token]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `https://arnif-backend.onrender.com/blogs/${id}`,
        { title, category, content, image },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Blog updated successfully");
      navigate("/myblogs");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update blog");
    }
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="max-w-2xl mx-auto mt-10 p-5 bg-white rounded-lg shadow">
      <h1 className="text-2xl font-semibold mb-5">Edit Blog</h1>
      <form onSubmit={handleUpdate} className="space-y-4">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          className="w-full border p-2 rounded"
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full border p-2 rounded"
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
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Content"
          className="w-full border p-2 rounded h-32"
        />
        <input
          type="text"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          placeholder="Image URL (optional)"
          className="w-full border p-2 rounded"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-5 py-2 rounded hover:bg-blue-600"
        >
          Update Blog
        </button>
      </form>
    </div>
  );
}
