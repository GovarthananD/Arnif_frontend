import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Toaster, toast } from "sonner";

export default function Signup() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await axios.post("https://arnif-backend.onrender.com/signup", formData, {
                withCredentials: false, // only set true if using cookies
            });
            toast.success(res.data.message || "Registered successfully!");
            setTimeout(() => navigate("/login"), 1500);
        } catch (err) {
            // Robust error handling
            if (err.response) {
                // Server responded with status code != 2xx
                toast.error(err.response.data?.message || "Server error occurred");
            } else if (err.request) {
                // Request made but no response received (network error)
                toast.error("Network error: Please check your internet connection");
                console.log(err)
            } else {
                // Something else happened
                toast.error(err.message || "An unexpected error occurred");
            }
        } finally {
            setLoading(false);
        }
    };


    return (
        <>
            <Toaster position="top-right" richColors closeButton />
            <div
  className="flex justify-center items-center min-h-screen bg-cover bg-center"
  style={{
    backgroundImage:
      "linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url('https://images.pexels.com/photos/990432/pexels-photo-990432.jpeg')",
  }}
>
  <div className="bg-gray-800 bg-opacity-90 p-8 rounded-2xl shadow-xl w-full max-w-md">
    <h2 className="text-3xl text-white font-semibold mb-6 text-center">
      Sign Up
    </h2>

    <form onSubmit={handleSubmit} className="space-y-5">
      <input
        type="text"
        name="name"
        placeholder="Full Name"
        value={formData.name}
        onChange={handleChange}
        className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
        required
      />
      <input
        type="email"
        name="email"
        placeholder="Email Address"
        value={formData.email}
        onChange={handleChange}
        className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
        required
      />
      <input
        type="password"
        name="password"
        placeholder="Password (min 6 chars)"
        value={formData.password}
        onChange={handleChange}
        className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
        required
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
          "Sign Up"
        )}
      </button>
    </form>

    <p className="text-gray-400 text-sm text-center mt-5">
      Already have an account?{" "}
      <span
        onClick={() => navigate("/login")}
        className="text-blue-400 hover:underline cursor-pointer"
      >
        Login
      </span>
    </p>
  </div>
</div>

        </>
    );
}
