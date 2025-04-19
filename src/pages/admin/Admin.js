import React, { useEffect, useState } from "react";
import Nav from "../../components/Nav"; // Importing Nav component
import Footer from "../../components/Footer";

import "../../styles/Admin.css";

const API_URL = "http://localhost:5000/api/products"; // Change if hosted elsewhere

const Admin = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [productList, setProductList] = useState([]);
  const [newProduct, setNewProduct] = useState({
    title: "",
    price: "",
    description: "",
    image: "",
  });
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Fetch products from the backend and localStorage
  const fetchProducts = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setProductList(data);

      // Save fetched data to localStorage
      localStorage.setItem("products", JSON.stringify(data));
    } catch (err) {
      console.error("Error fetching products:", err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Add new product to backend and localStorage
  const handleAddProduct = async (e) => {
    e.preventDefault();

    const newProductData = {
      title: newProduct.title,
      price: parseFloat(newProduct.price),
      description: newProduct.description,
      image: newProduct.image,
    };

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newProductData),
      });

      if (res.ok) {
        const created = await res.json();
        setProductList([...productList, created]);

        // Update localStorage with new product
        const updatedProducts = [...productList, created];
        localStorage.setItem("products", JSON.stringify(updatedProducts));

        setNewProduct({ title: "", price: "", description: "", image: "" });
      } else {
        console.error("Failed to add product");
      }
    } catch (err) {
      console.error("Error adding product:", err);
    }
  };

  // Update product by ID and in localStorage
  const handleUpdateProduct = async (id, updatedFields) => {
    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedFields),
      });

      if (res.ok) {
        const updated = await res.json();
        const updatedList = productList.map((product) =>
          product._id === id ? updated : product
        );
        setProductList(updatedList);

        // Update localStorage with updated product
        localStorage.setItem("products", JSON.stringify(updatedList));
      }
    } catch (err) {
      console.error("Error updating product:", err);
    }
  };

  // Delete product and update localStorage
  const handleRemoveProduct = async (id) => {
    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        const updatedList = productList.filter((product) => product._id !== id);
        setProductList(updatedList);

        // Update localStorage with remaining products
        localStorage.setItem("products", JSON.stringify(updatedList));
      }
    } catch (err) {
      console.error("Error deleting product:", err);
    }
  };

  // Handle login
  const handleLogin = (e) => {
    e.preventDefault();
    if (username === "admin" && password === "admin") {
      setIsLoggedIn(true);
      setError("");
    } else {
      setError("Invalid username or password");
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="login-page">
        
        <h2>Login to Admin Interface</h2>
        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Login</button>
        </form>
        {error && <p className="error">{error}</p>}
      </div>
    );
  }

  return (
    <div className="admin-page">
      <Nav/>
      <h2>Admin Interface</h2>
      

      {/* Add Product Form */}
      <section className="add-product">
        <h3>Add New Product</h3>
        <form onSubmit={handleAddProduct}>
          <input
            type="text"
            placeholder="Product Name"
            value={newProduct.title}
            onChange={(e) => setNewProduct({ ...newProduct, title: e.target.value })}
            required
          />
          <input
            type="number"
            placeholder="Price"
            value={newProduct.price}
            onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
            required
          />
          <textarea
            placeholder="Description"
            value={newProduct.description}
            onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
            required
          ></textarea>
          <input
            type="url"
            placeholder="Image URL"
            value={newProduct.image}
            onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
            required
          />
          <button type="submit">Add Product</button>
        </form>
      </section>

      {/* Product List */}
      <h2>All Products List</h2>
      <section className="product-list">
        {productList.map((product) => (
          <div className="product-card" key={product._id}>
            <div className="product-image">
              <img src={product.image} alt={product.title} />
            </div>
            <div className="product-details">
              <h3 className="product-title">{product.title}</h3>
              <p className="product-description">{product.description}</p>
              <p className="product-price">Rs {product.price}</p>
            </div>

            <div className="update-buttons">
              <button
                onClick={() => {
                  const newName = prompt("Enter new product name:", product.title);
                  if (newName) {
                    handleUpdateProduct(product._id, { title: newName });
                  }
                }}
              >
                Update Name
              </button>
              <button
                onClick={() => {
                  const newPrice = prompt("Enter new price:", product.price);
                  if (newPrice && !isNaN(newPrice)) {
                    handleUpdateProduct(product._id, { price: parseFloat(newPrice) });
                  }
                }}
              >
                Update Price
              </button>
              <button onClick={() => handleRemoveProduct(product._id)}>Remove Product</button>
            </div>
          </div>
        ))}
      </section>
      <Footer/>
    </div>
  );
};

export default Admin;
