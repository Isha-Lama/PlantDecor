import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext"; // Import Cart Context

// Components and Pages
import HomePage from "./components/HomePage";
import GiftsPage from "./pages/GiftsPage";
import BlogSection from "./components/BlogSection";
import About from "./components/About";
import Shop from "./components/Shop";
import Contact from "./components/Contact";
import CartPage from "./pages/CartPage"; // Import Cart Page
import AuthPage from "./pages/AuthPage"; // Import AuthPage
import UserProfile from "./components/UserProfile"; // Import UserProfile
import PrivateRoute from "./components/PrivateRoute"; // Import PrivateRoute
import CheckoutForm from "./pages/CheckoutForm"; // Import CheckoutForm from pages
import Payment from "./components/payment/Payment"; // Import Payment Component
import Success from "./components/payment/Success"; // Import Success Component
import Failure from "./components/payment/Failure"; // Import Failure Component
import Admin from './pages/admin/Admin';
import InspoDetail from "./components/InspoDetail";
import OrderPage from './pages/OrderPage';
function App() {
  return (
    <CartProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/gifts" element={<GiftsPage />} />
            <Route path="/blog" element={<BlogSection />} />
            <Route path="/about" element={<About />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/contact" element={<Contact />} />
            
            {/* Protect the Cart Page */}
            <Route
              path="/cart"
              element={
                <PrivateRoute>
                  <CartPage />
                </PrivateRoute>
              }
            />
            
            {/* Protect the UserProfile Page */}
            <Route
              path="/user-profile"
              element={
                <PrivateRoute>
                  <UserProfile />
                </PrivateRoute>
              }
            />

            {/* Authentication Route */}
            <Route path="/auth" element={<AuthPage />} />

            

            {/* Checkout Route */}
            <Route path="/checkout" element={<CheckoutForm />} />  {/* Add the Checkout form route */}
            
            {/* Payment Route */}
            <Route path="/payment" element={<Payment />} />  {/* Add the Payment route */}

            {/* Success Route */}
            <Route path="/success" element={<Success />} />  {/* Add the Success route */}

            {/* Failure Route */}
            <Route path="/failure" element={<Failure />} />  {/* Add the Failure route */}

            {/* Admin Route */}
            <Route path="/admin" element={<Admin/>} />

            <Route path="/inspiration/:id" component={InspoDetail} />

            <Route path="/order" element={<OrderPage />} />
            
          </Routes>
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
