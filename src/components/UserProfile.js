import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Footer from "../components/Footer";
import Nav from "../components/Nav";
import BlogSection from "../components/BlogSection";
import profileImage from "../logos/profile.png"; // Import the profile image


const UserProfile = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch the user data if logged in
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      navigate("/auth"); // Redirect to login page if not logged in
    } else {
      fetch("http://localhost:5000/api/user/profile", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setUserData(data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
          setLoading(false); // Stop loading even if there is an error
        });
    }
  }, [navigate]);

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem("authToken"); // Remove token from localStorage
    navigate("/auth"); // Redirect to the login page (AuthPage)
  };

  // Navigate to Admin page
  const handleAdminClick = () => {
    navigate("/admin"); // Redirect to the Admin page
  };

  // Internal styles for centering elements
  const profileStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    marginTop: "20px",
  };

  const profileImageStyle = {
    width: "150px",
    borderRadius: "50%",
    marginTop: "10px",
  };

  const logoutButtonStyle = {
    padding: "10px 20px",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "16px",
    marginTop: "15px",
    fontWeight: "bold",
  };

  const logoutButtonHoverStyle = {
    backgroundColor: "#c0392b",
  };

  const adminButtonStyle = {
    padding: "10px 20px",
    backgroundColor: "#28a745",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "16px",
    marginTop: "15px",
    fontWeight: "bold",
  };

  const adminButtonHoverStyle = {
    backgroundColor: "#218838",
  };

  return (
    <div className="user-profile">
      {loading ? (
        <p>Loading user profile...</p> // Show loading text while data is being fetched
      ) : (
        <div>
          <Nav />
          <div style={profileStyle}>
            <h1>My Profile</h1>

            {/* Profile Image */}
            <img src={profileImage} alt="Profile" style={profileImageStyle} />

            {/* User Info */}
            <h2>{userData?.name}</h2>
            {/* <p>Email: {userData?.email}</p> */}

            {/* Logout button */}
            <button
              onClick={handleLogout}
              style={logoutButtonStyle}
              onMouseOver={(e) =>
                (e.target.style.backgroundColor = logoutButtonHoverStyle.backgroundColor)
              }
              onMouseOut={(e) =>
                (e.target.style.backgroundColor = logoutButtonStyle.backgroundColor)
              }
            >
              Logout
            </button>

            {/* Admin button */}
            <button
              onClick={handleAdminClick}
              style={adminButtonStyle}
              onMouseOver={(e) =>
                (e.target.style.backgroundColor = adminButtonHoverStyle.backgroundColor)
              }
              onMouseOut={(e) =>
                (e.target.style.backgroundColor = adminButtonStyle.backgroundColor)
              }
            >
              Go to Admin Page
            </button>
          </div>

          <BlogSection />
          <Footer />
        </div>
      )}
    </div>
  );
};

export default UserProfile;
