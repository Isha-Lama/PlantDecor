import React from "react";
import { Link } from "react-router-dom";
import "../styles/BlogSection.css";

const blogs = [
  {
    id: 1,
    title: "5 Best Indoor Plants for Your Home",
    content: "Indoor plants not only beautify your home but also purify the air...",
    image: "/images/blog1.jpg",
  },
  {
    id: 2,
    title: "How to Care for Succulents",
    content: "Succulents are easy to maintain, but they need proper watering and sunlight...",
    image: "/images/blog2.jpg",
  },
  {
    id: 3,
    title: "Top Decor Trends for 2024",
    content: "Minimalist designs, earthy tones, and eco-friendly decor are trending...",
    image: "/images/blog3.jpg",
  },
  {
    id: 4,
    title: "Choosing the Perfect Gift for Plant Lovers",
    content: "From stylish pots to rare plant species, here’s what plant lovers will appreciate...",
    image: "/images/blog4.jpg",
  },
];

const BlogSection = () => {
  return (
    <section className="blog-section">
      <h2 className="section-title">Latest Blog Posts</h2>
      
      <div className="blog-grid">
        {blogs.map((blog) => (
          <div key={blog.id} className="blog-box">
            <img src={blog.image} alt={blog.title} className="blog-image" />
            <h3 className="blog-title">{blog.title}</h3>
            <p className="blog-content">{blog.content.slice(0, 80)}...</p>
            <Link to={`/blog/${blog.id}`} className="blog-read-more-btn">
              Read More
            </Link>
          </div>
        ))}
        
        {/* "View All Blogs" button with the class name "blog-button" */}
        <div className="view-all-btn-container">
          <Link to="/blog" className="blog-button">View All Blogs</Link>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
