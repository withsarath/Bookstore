import React, { useState, useEffect } from 'react';
import API from '../../services/api';
import BackButton from '../BackButton';
import Spinner from '../Spinner';
import { useSnackbar } from 'notistack';
import { BiUser, BiEnvelope, BiLockAlt } from 'react-icons/bi';
import type { User } from '../../types';
import axios from 'axios';

const Profile: React.FC = () => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    setLoading(true);
    API.get<User>('/users/profile')
      .then((response) => {
        setName(response.data.name);
        setEmail(response.data.email);
        setLoading(false);
      })
      .catch((error: unknown) => {
        setLoading(false);
        const message = axios.isAxiosError(error) ? error.response?.data?.message : 'Error fetching profile';
        enqueueSnackbar(message, { variant: 'error' });
        console.error(error);
      });
  }, [enqueueSnackbar]);

  const handleUpdateProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    API.put<User>('/users/profile', { name, email, password })
      .then(() => {
        setLoading(false);
        enqueueSnackbar('Profile updated successfully', { variant: 'success' });
        setPassword('');
      })
      .catch((error: unknown) => {
        setLoading(false);
        const message = axios.isAxiosError(error) ? error.response?.data?.message : 'Error updating profile';
        enqueueSnackbar(message, { variant: 'error' });
        console.error(error);
      });
  };

  return (
    <div className='max-w-2xl mx-auto pb-12 px-4'>
      <BackButton />
      
      <div className='bg-white dark:bg-slate-800 rounded-[2.5rem] shadow-2xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-slate-700 overflow-hidden animate-in slide-in-from-bottom-8 duration-700'>
        <div className='bg-gradient-to-r from-sky-600 to-indigo-600 h-40'></div>
        <div className='px-8 md:px-12 pb-12'>
          <div className='relative -mt-20 mb-8'>
            <div className='w-40 h-40 rounded-[2.5rem] bg-white dark:bg-slate-800 p-3 shadow-2xl shadow-slate-300 dark:shadow-none'>
              <div className='w-full h-full rounded-[2rem] bg-sky-100 dark:bg-sky-900/50 flex items-center justify-center text-sky-600 dark:text-sky-400 text-5xl font-black'>
                {name?.[0]?.toUpperCase() || 'U'}
              </div>
            </div>
          </div>

          <h1 className='text-4xl font-black text-slate-900 dark:text-white mb-2'>Account Settings</h1>
          <p className='text-slate-500 dark:text-slate-400 font-medium mb-10'>Update your profile information and security</p>

          {loading && <div className='flex justify-center mb-8'><Spinner /></div>}

          <form onSubmit={handleUpdateProfile} className='space-y-8'>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <label className='block text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-3 ml-1 flex items-center gap-2'>
                  <BiUser className='text-lg' /> Full Name
                </label>
                <input
                  type='text'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className='input-field'
                  placeholder="John Doe"
                  required
                />
              </div>
              
              <div>
                <label className='block text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-3 ml-1 flex items-center gap-2'>
                  <BiEnvelope className='text-lg' /> Email Address
                </label>
                <input
                  type='email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className='input-field'
                  placeholder="john@example.com"
                  required
                />
              </div>
            </div>

            <div className='pt-8 border-t border-slate-100 dark:border-slate-700'>
              <label className='block text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-3 ml-1 flex items-center gap-2'>
                <BiLockAlt className='text-lg' /> New Password
              </label>
              <input
                type='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className='input-field'
                placeholder='Leave blank to keep current password'
              />
            </div>

            <button 
              type='submit'
              disabled={loading}
              className='btn-primary w-full py-4 text-lg font-black mt-4'
            >
              Update Profile
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
