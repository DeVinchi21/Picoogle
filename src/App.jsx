import { useState, useEffect } from 'react';
import ImageComponent from './components/ImageComponent';

import './App.css'

const ImageWebsite = () => {
  const [images, setImages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const imagesPerPage = 9; // Number of images to show per page

  useEffect(() => {
    // Fetch images from API and update the 'images' state
    fetch('https://picsum.photos/v2/list')
      .then(response => response.json())
      .then(data => {
        // Shuffle the images array
        const shuffledImages = shuffleArray(data);
        setImages(shuffledImages);
      })
      .catch(error => console.error('Error fetching images:', error));
  }, []);

  // Function to shuffle an array
  const shuffleArray = array => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  const indexOfLastImage = currentPage * imagesPerPage;
  const indexOfFirstImage = indexOfLastImage - imagesPerPage;
  const currentImages = images.slice(indexOfFirstImage, indexOfLastImage);

  return (
    <div>
      <div className="grid grid-cols-3 gap-4 p-4">
        {currentImages.map(image => (
          <ImageComponent key={image.id} imageUrl={image.download_url} author={image.author} />
        ))}
      </div>

      <div className="flex justify-center mt-4">
        <button
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
          className="mr-2 px-3 py-1 bg-gray-300 rounded"
        >
          Previous
        </button>
        <button
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={indexOfLastImage >= images.length}
          className="ml-2 px-3 py-1 bg-gray-300 rounded"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ImageWebsite;