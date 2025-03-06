import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { BsArrowLeft } from 'react-icons/bs';

const BackButton = ({ destination = '/' }) => {
  return (
    <div className="flex">
      <Link
        to={destination}
        className="bg-sky-800 text-white px-4 py-2 rounded-lg flex items-center justify-center w-fit"
      >
        <BsArrowLeft className="text-2xl mr-2" />
        <span>Back</span>
      </Link>
    </div>
  );
};

// Prop Validation
BackButton.propTypes = {
  destination: PropTypes.string, // destination must be a string
};

export default BackButton;

