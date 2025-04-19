import React from "react";
import { useParams, Link } from "react-router-dom";
import "../styles/BlogPage.css";

const blogs = [
  {
    id: 1,
    title: "5 Best Indoor Plants for Your Home",
    content:
      "Indoor plants not only beautify your home but also purify the air. Here are the top 5 indoor plants...",
    image: "/images/blog1.jpg",
  },
  {
    id: 2,
    title: "How to Care for Succulents",
    content:
      "Succulents are low-maintenance, but they require specific care to thrive. Here’s everything you need to know...",
    image: "/images/blog2.jpg",
  },
  {
    id: 3,
    title: "Top Decor Trends for 2024",
    content:
      "The world of home decor is evolving with new trends like earthy tones and minimalist designs...",
    image: "/images/blog3.jpg",
  },
  {
    id: 4,
    title: "Choosing the Perfect Gift for Plant Lovers",
    content:
      "Looking for the perfect gift for a plant lover? Here are some thoughtful and creative ideas...",
    image: "/images/blog4.jpg",
  },
];

const BlogPage = () => {
  const { id } = useParams(); // Get the blog ID from the URL parameter
  const blog = blogs.find((b) => b.id === parseInt(id)); // Find the blog by ID

  if (!blog) {
    return <h2>Blog Not Found</h2>;
  }

  return (
    <section className="blog-page">
      <h2 className="blog-title">{blog.title}</h2>
      <img src={blog.image} alt={blog.title} className="blog-image" />
      <p className="blog-content">{blog.content}</p>
      <Link to="/blog" className="back-btn">← Back to Blogs</Link>
    </section>
  );
};

export default BlogPage;
