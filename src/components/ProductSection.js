import React, { useState } from "react";
import "../styles/ProductSection.css"; 

const products = [
  {
    id: 1,
    image: "/images/product1.jpg",
    title: "Indoor Plant",
    description: "A beautiful green plant for your home.",
    price: "Rs250",
  },
  {
    id: 2,
    image: "/images/product2.jpg",
    title: "Decorative Pot",
    description: "Elegant ceramic pot for plants.",
    price: "Rs150",
  },
  {
    id: 3,
    image: "/images/product3.jpg",
    title: "Succulent Pack",
    description: "A set of 3 different succulents.",
    price: "Rs370",
  },
  {
    id: 4,
    image: "/images/product4.jpg",
    title: "Hanging Planter",
    description: "Perfect for small spaces and balconies.",
    price: "Rs180",
  },
  {
    id: 5,
    image: "/images/product5.jpg",
    title: "Bamboo Plant",
    description: "Brings positive energy to your home.",
    price: "Rs220",
  },
  {
    id: 6,
    image: "/images/product6.jpg",
    title: "Terrarium Kit",
    description: "DIY terrarium with decorative stones.",
    price: "Rs230",
  },
  {
    id: 7,
    image: "/images/product7.jpg",
    title: "Cactus Collection",
    description: "Set of 3 unique cacti.",
    price: "Rs200",
  },
  {
    id: 8,
    image: "/images/product8.jpg",
    title: "Decorative Vase",
    description: "Modern and stylish vase for plants.",
    price: "Rs120",
  },
  {
    id: 9,
    image: "/images/product9.jpg",
    title: "Flowering Plant",
    description: "Beautiful indoor flowering plant.",
    price: "Rs80",
  },
  {
    id: 10,
    image: "/images/product10.jpg",
    title: "Large Indoor Palm",
    description: "Adds a tropical vibe to your space.",
    price: "Rs400",
  },
  {
    id: 11,
    image: "/images/product11.jpg",
    title: "Spider Plant",
    description: "Easy to care for and great for air purification.",
    price: "Rs70",
  },
  {
    id: 12,
    image: "/images/product12.jpg",
    title: "Lavender Potted Plant",
    description: "Adds a calming fragrance and a touch of color.",
    price: "Rs130",
},
{
    id: 13,
    image: "/images/product13.jpg",
    title: "Fern ",
    description: "A lush green fern that enhances any space.",
    price: "Rs70",
},
{
    id: 14,
    image: "/images/product14.jpg",
    title: "Hanging String of Pearls",
    description: "A unique trailing plant for modern decor.",
    price: "Rs100",
},
  
  {
    id: 15,
    image: "/images/product15.jpg",
    title: "Pothos Hanging Plant",
    description: "Perfect for shelves and hanging baskets.",
    price: "Rs150",
  },
  {
    id: 16,
    image: "/images/product16.jpg",
    title: "Peace Lily",
    description: "Beautiful white blooms with air-purifying properties.",
    price: "Rs100",
  },
  {
    id: 17,
    image: "/images/product17.jpg",
    title: "Aloe Vera",
    description: "Great for skincare and easy to maintain.",
    price: "Rs100",
  },
  {
    id: 18,
    image: "/images/product18.jpg",
    title: "Fiddle Leaf Fig",
    description: "Trendy and stylish plant for modern interiors.",
    price: "Rs50",
  },
  {
    id: 19,
    image: "/images/product19.jpg",
    title: "ZZ Plant",
    description: "Thrives in low light and requires minimal care.",
    price: "Rs80",
  },
  {
    id: 20,
    image: "/images/product20.jpg",
    title: "Calathea Orbifolia",
    description: "Striking leaves with a unique pattern.",
    price: "Rs120",
  }
];

const ProductSection = () => {
  const [visibleCount, setVisibleCount] = useState(8); // Show 8 products initially

  const showMoreProducts = () => {
    setVisibleCount(products.length); // Show all products
  };

  const showLessProducts = () => {
    setVisibleCount(8); // Show only 8 products again
  };

  return (
    <section className="product-section">
      <h2 className="section-title">Our Products</h2>
      <div className="product-grid">
        {products.slice(0, visibleCount).map((product) => (
          <div className="product-card" key={product.id}>
            <div className="product-image">
              <img src={product.image} alt={product.title} />
              <div className="overlay">
                <button className="add-to-cart">Add to Cart</button>
                <i className="fas fa-heart fav-icon"></i>
              </div>
            </div>
            <h3 className="product-title">{product.title}</h3>
            <p className="product-description">{product.description}</p>
            <p className="product-price">{product.price}</p>
          </div>
        ))}
      </div>
      
      <div className="buttons-container">
        {visibleCount < products.length && (
          <button className="show-more-btn" onClick={showMoreProducts}>
            Show More
          </button>
        )}
        
        {visibleCount === products.length && (
          <button className="show-less-btn" onClick={showLessProducts}>
            Show Less
          </button>
        )}
      </div>
    </section>
  );
};

export default ProductSection;
