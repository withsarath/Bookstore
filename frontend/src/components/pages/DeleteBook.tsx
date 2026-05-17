import React, { useState } from 'react';
import BackButton from '../BackButton';
import Spinner from '../Spinner';
import API from '../../services/api';
import { useNavigate, useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { MdDeleteForever } from 'react-icons/md';
import axios from 'axios';

const DeleteBook: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { enqueueSnackbar } = useSnackbar();

  const handleDeleteBook = () => {
    setLoading(true);
    API
      .delete(`/books/${id}`)
      .then(() => {
        setLoading(false);
        enqueueSnackbar('Book Deleted successfully', { variant: 'success' });
        navigate('/books');
      })
      .catch((error: unknown) => {
        setLoading(false);
        const message = axios.isAxiosError(error) ? error.response?.data?.message : 'Error deleting book';
        enqueueSnackbar(message, { variant: 'error' });
        console.error(error);
      });
  };
  
  return (
    <div className='max-w-2xl mx-auto'>
      <BackButton />
      
      <div className='bg-white p-12 rounded-3xl shadow-2xl shadow-slate-200 border border-slate-100 flex flex-col items-center text-center animate-in zoom-in duration-300'>
        <div className='w-24 h-24 bg-red-50 rounded-full flex items-center justify-center text-red-500 mb-8'>
          <MdDeleteForever className='text-6xl' />
        </div>
        
        <h1 className='text-4xl font-black text-slate-900 mb-4'>Are you sure?</h1>
        <p className='text-slate-500 text-lg mb-10 max-w-sm'>
          This action cannot be undone. This will permanently remove the book from your collection.
        </p>

        {loading && <div className='mb-8'><Spinner /></div>}

        <div className='flex gap-4 w-full'>
          <button
            className='flex-1 btn-secondary py-4'
            onClick={() => navigate('/books')}
            disabled={loading}
          >
            Cancel
          </button>
          <button
            className='flex-1 bg-red-500 hover:bg-red-600 text-white font-bold py-4 rounded-xl shadow-lg shadow-red-200 transition-all active:scale-95 disabled:opacity-50'
            onClick={handleDeleteBook}
            disabled={loading}
          >
            Yes, Delete it
          </button>
        </div>
      </div>
    </div>
  )
}

export default DeleteBook;
