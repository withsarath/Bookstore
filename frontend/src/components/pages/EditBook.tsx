import React, { useState, useEffect } from 'react';
import BackButton from '../BackButton';
import Spinner from '../Spinner';
import API from '../../services/api';
import { useNavigate, useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import type { Book } from '../../types';
import axios from 'axios';
import { BiCloudUpload } from 'react-icons/bi';

const EditBook: React.FC = () => {
  const [title, setTitle] = useState<string>('');
  const [author, setAuthor] = useState<string>('');
  const [publishYear, setPublishYear] = useState<string>('');
  const [genre, setGenre] = useState<string>('General');
  const [pagesRead, setPagesRead] = useState<string>('0');
  const [totalPages, setTotalPages] = useState<string>('0');
  const [loading, setLoading] = useState<boolean>(false);
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [existingCover, setExistingCover] = useState<string | null>(null);
  
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { enqueueSnackbar } = useSnackbar();

  const genres: string[] = ["Fiction", "Non-Fiction", "Sci-Fi", "Fantasy", "Biography", "History", "Mystery", "General"];

  useEffect(() => {
    setLoading(true);
    API.get<Book>(`/books/${id}`)
      .then((response) => {
        const { title, author, publishYear, genre, pagesRead, totalPages, coverUrl } = response.data;
        setTitle(title);
        setAuthor(author);
        setPublishYear(publishYear.toString());
        setGenre(genre || 'General');
        setPagesRead(pagesRead.toString());
        setTotalPages(totalPages.toString());
        setExistingCover(coverUrl || null);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar('Error fetching book details', { variant: 'error' });
        console.error(error);
      });
  }, [id, enqueueSnackbar]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };
  
  const handleEditBook = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      let coverUrl = existingCover || '';

      if (image) {
        const formData = new FormData();
        formData.append('cover', image);
        const uploadRes = await API.post<{ url: string }>('/books/upload', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        coverUrl = uploadRes.data.url;
      }

      const data = { 
        title, 
        author, 
        publishYear: Number(publishYear), 
        genre,
        pagesRead: Number(pagesRead),
        totalPages: Number(totalPages),
        coverUrl
      };

      await API.put<Book>(`/books/${id}`, data);
      
      setLoading(false);
      enqueueSnackbar('Book Updated successfully', { variant: 'success' });
      navigate('/books');
    } catch (error) {
      setLoading(false);
      const message = axios.isAxiosError(error) ? error.response?.data?.message : 'Error updating book';
      enqueueSnackbar(message, { variant: 'error' });
      console.error(error);
    }
  };

  return (
    <div className='max-w-4xl mx-auto pb-12 px-4'>
      <BackButton />
      
      <div className="bg-white dark:bg-slate-800 p-8 md:p-12 rounded-[2.5rem] shadow-2xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-slate-700 animate-in slide-in-from-bottom-8 duration-500">
        <div className="mb-12 text-center md:text-left">
          <h1 className='text-4xl font-black text-slate-900 dark:text-white mb-3 tracking-tight'>Edit Book 📝</h1>
          <p className="text-slate-500 dark:text-slate-400 font-medium text-lg">Keep your library information up to date</p>
        </div>

        {loading && <div className="flex justify-center mb-8"><Spinner /></div>}

        <form onSubmit={handleEditBook} className="space-y-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Left Column: Image Upload */}
            <div className="lg:col-span-4">
              <label className='block text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-4 ml-1'>Cover Image</label>
              <div className="relative group">
                <div className="aspect-[2/3] w-full rounded-2xl bg-slate-50 dark:bg-slate-900 border-2 border-dashed border-slate-200 dark:border-slate-700 flex flex-col items-center justify-center overflow-hidden transition-all group-hover:border-sky-400">
                  {(preview || existingCover) ? (
                    <img src={preview || existingCover || ''} alt="Preview" className="w-full h-full object-cover" />
                  ) : (
                    <>
                      <BiCloudUpload className="text-5xl text-slate-300 mb-3" />
                      <p className="text-slate-400 text-xs font-bold text-center px-4">Click to upload or drag image</p>
                    </>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                  />
                </div>
                {(preview || existingCover) && (
                  <button
                    type="button"
                    onClick={() => { setImage(null); setPreview(null); setExistingCover(null); }}
                    className="absolute -top-2 -right-2 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-red-600 transition-colors"
                  >
                    ×
                  </button>
                )}
              </div>
            </div>

            {/* Right Column: Book Details */}
            <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="md:col-span-2">
                <label className='block text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-3 ml-1'>Book Title</label>
                <input
                  type='text'
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className='input-field'
                  required
                />
              </div>
              
              <div>
                <label className='block text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-3 ml-1'>Author Name</label>
                <input
                  type='text'
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  className='input-field'
                  required
                />
              </div>
              
              <div>
                <label className='block text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-3 ml-1'>Publish Year</label>
                <input
                  type='number'
                  value={publishYear}
                  onChange={(e) => setPublishYear(e.target.value)}
                  className='input-field'
                  required
                />
              </div>

              <div>
                <label className='block text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-3 ml-1'>Genre</label>
                <select
                  value={genre}
                  onChange={(e) => setGenre(e.target.value)}
                  className='input-field font-bold'
                  required
                >
                  {genres.map(g => (
                    <option key={g} value={g}>{g}</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className='block text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-3 ml-1'>Pages Read</label>
                  <input
                    type='number'
                    value={pagesRead}
                    onChange={(e) => setPagesRead(e.target.value)}
                    className='input-field'
                    required
                  />
                </div>
                <div>
                  <label className='block text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-3 ml-1'>Total Pages</label>
                  <input
                    type='number'
                    value={totalPages}
                    onChange={(e) => setTotalPages(e.target.value)}
                    className='input-field'
                    required
                  />
                </div>
              </div>
            </div>
          </div>
          
          <div className="pt-8 border-t border-slate-50 dark:border-slate-700/50">
            <button 
              type="submit"
              disabled={loading}
              className='btn-primary w-full md:w-auto py-4 px-16 text-lg font-black'
            >
              Update Book
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EditBook;
