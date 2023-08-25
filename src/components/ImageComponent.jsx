import PropTypes from 'prop-types';

const ImageComponent = ({ imageUrl, author }) => {
  return (
    <div className="relative max-w-sm rounded overflow-hidden shadow-lg transition transform hover:scale-105">
      <img src={imageUrl} alt={`Image by ${author}`} className="w-full h-auto" />
      <div className="absolute bottom-0 w-full bg-gray-800 bg-opacity-75 text-white py-2 px-4 flex justify-between">
        <p className="text-base truncate">By {author}</p>
        <a
          href={imageUrl}
          download={`${author}_image.jpg`}
          className="text-blue-500 hover:underline"
        >
          Download
        </a>
      </div>
    </div>
  );
};

ImageComponent.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
};

export default ImageComponent;
