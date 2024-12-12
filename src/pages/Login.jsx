import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Icon from "../assets/icon.jpg";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../store/action/UserAction";

const Login = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const {
    loading = false,
    error = null,
    token,
  } = useSelector((state) => state.userState || {});

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("https://fakestoreapi.com/users");
        const data = await response.json();

        // Filter users to only show "johnd"
        const johndUser = data.filter((user) => user.username === "johnd");

        setUsers(johndUser);

        if (johndUser.length > 0) {
          setSelectedUser(johndUser[0].username);
          setPassword(johndUser[0].password); // Assuming password is part of user data
        }
      } catch (err) {
        console.error("Failed to fetch users:", err);
      }
    };
    fetchUsers();
  }, []);

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token, navigate]);

  const handleLogin = (e) => {
    e.preventDefault();
    if (!selectedUser) {
      alert("Please select a user");
      return;
    }
    dispatch(loginUser(selectedUser, password));
  };

  const handleUserChange = (e) => {
    const username = e.target.value;
    setSelectedUser(username);

    const user = users.find((user) => user.username === username);
    if (user) {
      setPassword(user.password);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-white p-4 sm:p-8">
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-md flex flex-col sm:flex-row">
        {/* Left Side - Login Form */}
        <div className="w-full sm:w-1/2 p-8">
          <h1 className="text-3xl font-semibold mb-4">Welcome Back!!</h1>
          <p className="text-gray-600 mb-8">
            Let's log in to our e-commerce website so that you can explore more,
            so you can log in first.
          </p>
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label
                htmlFor="users"
                className="block text-gray-700 font-medium"
              >
                Select User
              </label>
              <select
                id="users"
                className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
                value={selectedUser}
                onChange={handleUserChange}
              >
                {users.map((user) => (
                  <option key={user.id} value={user.username}>
                    {user.username}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-gray-700 font-medium"
              >
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)} // Allow manual password override if needed
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-2 top-2 text-gray-500"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
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

        {/* Right Side - Icon and Description */}
        <div className="w-full sm:w-1/2 bg-white flex items-center justify-center p-8">
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
