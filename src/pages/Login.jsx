import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Icon from "../assets/icon.jpg";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../store/action/UserAction";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const {
    loading = false,
    error = null,
    token,
  } = useSelector((state) => state.userState || {});

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token, navigate]);

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(loginUser(username, password));
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-md flex">
        <div className="w-1/2 p-8">
          <h1 className="text-3xl font-semibold mb-4">Welcome Back!!</h1>
          <p className="text-gray-600 mb-8">
            Let's log in to our e-commerce website so that you can explore more,
            so you can log in first.
          </p>
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label
                htmlFor="username"
                className="block text-gray-700 font-medium"
              >
                Username
              </label>
              <input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                type="text"
                id="username"
                className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
                placeholder="Enter your username"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-gray-700 font-medium"
              >
                Password
              </label>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                id="password"
                className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
                placeholder="Enter your password"
              />
            </div>
            <div className="flex justify-between items-center mb-4">
              <a href="#" className="text-sm text-blue-500 hover:underline">
                Forgot Password
              </a>
            </div>
            <button
              type="submit"
              className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>
          {error && <p className="text-red-500 mt-2">{error}</p>}
        </div>

        <div className="w-1/2 bg-green-50 flex items-center justify-center p-8">
          <div className="text-center">
            <img src={Icon} alt="icon" className="w-48 mx-auto mb-4" />
            <h2 className="text-xl font-semibold mb-2">Let's shop now!!</h2>
            <p className="text-gray-600">
              with <span className="font-bold text-green-500">HealShoop</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
