import React from 'react';
import { useParams } from 'react-router-dom';

const BlogDetail = () => {
  const { id } = useParams();  // To fetch the 'id' from the URL

  return (
    <div>
      <h1>Blog Detail Page</h1>
      <p>Displaying details for blog with ID: {id}</p>
    </div>
  );
};

export default BlogDetail;
