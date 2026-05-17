import React from 'react';
import { Link } from 'react-router-dom';
import { BiArrowBack } from 'react-icons/bi';

interface BackButtonProps {
  destination?: string;
}

const BackButton: React.FC<BackButtonProps> = ({ destination = '/books' }) => {
  return (
    <div className='flex mb-6'>
      <Link
        to={destination}
        className='btn-secondary py-2 px-4 flex items-center gap-2 group'
      >
        <BiArrowBack className='text-2xl group-hover:-translate-x-1 transition-transform' />
        <span>Go Back</span>
      </Link>
    </div>
  );
};

export default BackButton;
