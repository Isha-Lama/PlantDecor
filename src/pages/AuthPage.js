import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/AuthPage.css";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // Check if user is already logged in
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      navigate("/"); // Redirect to home if already logged in
    }
  }, [navigate]);

  const toggleMode = () => setIsLogin(!isLogin);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = isLogin ? { email, password } : { name, email, password };
    const endpoint = isLogin
      ? "http://localhost:5000/api/auth/login"
      : "http://localhost:5000/api/auth/register";


    

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json"
         
         },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("authToken", data.token);  // Save token to localStorage

        localStorage.removeItem("cart");
        
        setName("");
        setEmail("");
        setPassword("");
        navigate("/"); // Navigate to home page after login/registration
      } else {
        alert(data.message || "Error occurred");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>{isLogin ? "Login" : "Register"}</h2>
        <form className="auth-form" onSubmit={handleSubmit}>
          {!isLogin && (
            <>
              <label>Name:</label>
              <input 
                type="text" 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                required 
              />
            </>
          )}
          <label>Email:</label>
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
          />
          <label>Password:</label>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
          />
          <button type="submit">{isLogin ? "Login" : "Register"}</button>
        </form>
        <button className="toggle-btn" onClick={toggleMode}>
          {isLogin ? "Go to Register" : "Go to Login"}
        </button>
      </div>
    </div>
  );
};

export default AuthPage;
