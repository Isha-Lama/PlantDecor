import React from "react";
import { useParams } from "react-router-dom";
import "../styles/InspoDetail.css";

const InspoDetail = () => {
  const { id } = useParams(); // Get the id from the URL
  const inspoData = [
    { img: "/images/inspo1.jpg", title: "Cozy Living Room", description: "A warm and inviting living room perfect for relaxation with soft lighting and cozy textiles." },
    { img: "/images/inspo2.jpg", title: "Modern Minimalist", description: "Sleek and simple with clean lines, neutral tones, and minimal decoration for a modern, clutter-free space." },
    { img: "/images/inspo3.jpg", title: "Boho Vibes", description: "A relaxed and eclectic vibe with vibrant colors, natural textures, and a variety of unique furniture pieces." },
    // Add more inspirations if necessary
  ];

  const inspo = inspoData[id];

  return (
    <div className="inspo-detail">
      <h2>{inspo.title}</h2>
      <img src={inspo.img} alt={inspo.title} />
      <p>{inspo.description}</p>
      <a href="/" className="back-btn">Back to Inspirations</a>
    </div>
  );
};

export default InspoDetail;
