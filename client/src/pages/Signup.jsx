import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { setUser, setLoading, setError } from "../store/reducers/userSlice";

import { registerUser } from "../services/userApi";

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, error } = useSelector((state) => state.user);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleInput = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      dispatch(setLoading(true));
      const user = await registerUser(formData);
      dispatch(setUser(user));
      setFormData({
        name: "",
        email: "",
        password: "",
      });
      navigate("/");
    } catch (error) {
      dispatch(setError(error.message));
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div
      className="container"
      style={{
        padding: "5rem",
      }}
    >
      <h1>Signup</h1>

      {/* Display loading message when signing up */}
      {isLoading && <p>Loading...</p>}

      {/* Display error message if signup fails */}
      {error && <p>Error: {error}</p>}

      <form onSubmit={handleSignup}>
        {/* Name input */}
        <input
          type="text"
          placeholder="Enter your name"
          name="name"
          value={formData.name}
          onChange={handleInput}
        />

        {/* Email input */}
        <input
          type="text"
          placeholder="Enter your email"
          name="email"
          value={formData.email}
          onChange={handleInput}
        />

        {/* Password input */}
        <input
          type="password"
          placeholder="Enter your password"
          name="password"
          value={formData.password}
          onChange={handleInput}
        />

        {/* Submit button */}
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Signing up..." : "Signup"}
        </button>
      </form>
      <Link to={"/login"}>
        <span>or</span> Login
      </Link>
    </div>
  );
};

export default Signup;
