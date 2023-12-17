// ImageGenerator.js

import React, { useState, useEffect, useCallback } from 'react';
import './ImageGenerator.css';

const ImageGenerator = () => {
  const [imageUrls, setImageUrls] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [loading, setLoading] = useState(false);

  const apiKey = process.env.REACT_APP_API_KEY;

  const fetchRandomImages = useCallback(async () => {
    try {
      setLoading(true);

      const response = await fetch(
        `https://api.api-ninjas.com/v1/randomimage?category=${selectedCategory}`,
        {
          headers: {
            'X-Api-Key': apiKey,
            'Accept': 'image/jpg',
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Error fetching image. Status code: ${response.status}`);
      }

      const imageUrl = URL.createObjectURL(await response.blob());

      setImageUrls([imageUrl]);
    } catch (error) {
      console.error('Error fetching random image:', error);
    } finally {
      setLoading(false);
    }
  }, [selectedCategory, apiKey]);

  useEffect(() => {
    if (selectedCategory) {
      fetchRandomImages();
    }

    return () => {
    };
  }, [selectedCategory, fetchRandomImages]);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  return (
    <div className="ImageGenerator">
      <h1>Image Generator</h1>
      <div className="categoryButtons">
        <button onClick={() => handleCategoryClick('nature')}>Nature</button>
        <button onClick={() => handleCategoryClick('city')}>City</button>
        <button onClick={() => handleCategoryClick('technology')}>Technology</button>
        <button onClick={() => handleCategoryClick('food')}>Food</button>
        <button onClick={() => handleCategoryClick('still_life')}>Still Life</button>
        <button onClick={() => handleCategoryClick('abstract')}>Abstract</button>
        <button onClick={() => handleCategoryClick('wildlife')}>Wildlife</button>
      </div>
      {loading && <p>Loading...</p>}
      {imageUrls.length > 0 && (
        <div>
          <ul>
            {imageUrls.map((url, index) => (
              <li key={index}>
                <img src={url} alt={`Random ${index + 1}`} />
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ImageGenerator;
