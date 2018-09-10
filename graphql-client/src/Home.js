import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => (
  <div>
    <p><Link to="/list">List of the closest 100 stars</Link></p>
  </div>
)

export default Home
