import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const handleRegister = async (e) => {
    e.preventDefault(); // Prevent form submission
    
    // Basic validation
    if (!name || !email || !password) {
      enqueueSnackbar("Please fill in all fields", { variant: "error" });
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      enqueueSnackbar("Please enter a valid email address", { variant: "error" });
      return;
    }

    setLoading(true);
    try {
      await axios.post("http://localhost:5555/auth/register", {
        name,
        email,
        password,
      });
      enqueueSnackbar("Registration successful", { variant: "success" });
      navigate("/login");
    } catch (error) {
      console.error("Registration error:", error.response?.data);
      enqueueSnackbar(
        error.response?.data?.message || "Error during registration", 
        { variant: "error" }
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-3xl my-4">Register</h1>
      <form onSubmit={handleRegister} className="flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto">
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full"
          />
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full"
          />
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full"
          />
        </div>
        <button 
          type="submit"
          disabled={loading}
          className={`p-2 bg-sky-300 m-8 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {loading ? "Registering..." : "Register"}
        </button>
      </form>
    </div>
  );
};

export default Register;