// Utility function to make authenticated requests
export const fetchProtectedData = async (endpoint) => {
    const token = localStorage.getItem('authToken');  // Get token from localStorage
  
    if (!token) {
      throw new Error('No token found. Please login.');
    }
  
    try {
      const response = await fetch(endpoint, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
  
      if (!response.ok) {
        throw new Error('Authorization failed or token expired');
      }
  
      return await response.json();  // Parse and return JSON data
    } catch (error) {
      throw new Error(error.message || 'Something went wrong');
    }
  };
  