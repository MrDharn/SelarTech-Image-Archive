import React, { useState , useContext} from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
// import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
const Login = () => {
  const {user, setUser} = useContext(AuthContext)
  console.log(user)
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  //handle Change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  //handleSubmit

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await API.post("/login", formData);

      localStorage.setItem("token", response.data.createToken);
      navigate("/dashboard");
      // getCurrentUser()
      setUser(user)
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1 className="auth-title">Login</h1>

        <form className="auth-form" onSubmit={handleSubmit}>
          {/* inputs */}

          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
          />

          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
