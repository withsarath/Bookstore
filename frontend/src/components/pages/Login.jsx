import { useState } from "react";
import axios from "axios";
import { useNavigate, } from "react-router-dom";
import { useSnackbar } from "notistack";
import { useAuth } from "../AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const { login } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:5555/auth/login", {
        email,
        password,
      });
      
      login(response.data);
      enqueueSnackbar("Login successful", { variant: "success" });
      navigate("/books");
    } catch (error) {
      if (error.response) {
        enqueueSnackbar(error.response.data.message || "Login failed", { 
          variant: "error" 
        });
      } else if (error.request) {
        enqueueSnackbar("No response from server", { variant: "error" });
      } else {
        enqueueSnackbar("Error occurred while logging in", { variant: "error" });
      }
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-3xl my-4">Login</h1>
      <div className="flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto">
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
        <button className="p-2 bg-sky-300 m-8" onClick={handleLogin}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </div>
    </div>
  );
};

export default Login;
