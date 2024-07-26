/* eslint-disable no-unused-vars */
/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-shadow */
import axios from 'axios';
/* eslint-disable no-undef */
import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

import { Avatar, TextField } from '@mui/material';

import { getCookieValue } from 'src/utils/cookie';

import { Onrun } from 'src/api/onRun';

// مدیریت ویرایش و ذخیره‌سازی اطلاعات پروفایل کاربر، با دریافت و نمایش اطلاعات فعلی و ارسال تغییرات به سرور

function App() {
  const [formData, setFormData] = useState({
    id: '',
    username: '',
    name: '',
    lastName: '',
    email: '',
    profilePicture: null,
    profilePicturePreview: 'default-avatar.png',
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'profilePicture' && files.length > 0) {
      const file = files[0];
      setFormData({
        ...formData,
        profilePicture: file,
        profilePicturePreview: URL.createObjectURL(file),
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    putProfile();
  };
// گرفتن اطلاعات پروفایل کاربر
  const fetchProfile = async () => {
    try {
      const token = getCookieValue('UID');

      if (!token) {
        setError('No token found. Please log in.');
        return;
      }

      const response = await axios.get(`${Onrun}/api/user/profile/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data) {
        setFormData({
          id: response.data.id || '',
          username: response.data.username || '',
          national_code: response.data.national_code || '',
          password: response.data.password || '',
          name: response.data.name || '',
          lastName: response.data.last_name || '',
          email: response.data.email || '',
          profilePicture: null,
          profilePicturePreview: response.data.profile_picture || 'default-avatar.png',
        });
      }
    } catch (error) {
      if (error.response) {
        setError('خطا در ارسال اطلاعات');
      } else {
        setError('اینترنت خود را چک کنید');
      }
    }
  };

  // ارسال اطلاعات ویرایش شده کاربر
  const putProfile = async () => {
    try {
      const token = getCookieValue('UID');
      const data = {
        id: formData.id,
        username: formData.username,
        name: formData.name,
        last_name: formData.lastName,
        email: formData.email,
        password: formData.password,
        national_code: formData.national_code,
        date_birth: formData.date_birth,
      };

      const headers = {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      };

      const response = await axios.put(`${Onrun}/api/user/profile/`, data, { headers });
      setSuccess('اطلاعات ویرایش شد');
      navigate('/');

      fetchProfile();

      // بعد از ویرایش اطلاعات صفحه ریلود میشه 
      window.location.reload();
    } catch (error) {
      console.error('Error updating user profile:', error);
    }
  };

  const checkUID = () => {
    const uid = getCookieValue('UID');
    console.log('Current UID:', uid);
  };

  useEffect(() => {
    checkUID();
    fetchProfile();
  }, []);

  const handelEdit = () => {};

  return (
    <div dir="rtl" className="flex items-center justify-center h-screen">
      <div className="bg-white p-12 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl mb-4 text-center">ویرایش اطلاعات</h2>
        <div className="flex justify-center mb-4">
          <label className="mb-4 " htmlFor="profilePictureInput">
            <Avatar alt="تصویر" src={formData.profilePicturePreview} />
          </label>
          <input
            type="file"
            id="profilePictureInput"
            name="profilePicture"
            accept="image/*"
            onChange={handleChange}
            className="hidden"
          />
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mt-4 mb-8">
            <TextField
              id="outlined-uncontrolled"
              label="نام"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded"
            />
          </div>
          <div className="mt-2 mb-8">
            <TextField
              id="outlined-uncontrolled"
              label="نام خانوادگی"
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded"
            />
          </div>
          <div className="mt-2 mb-8">
            <TextField
              id="outlined-uncontrolled"
              label="ایمیل"
              type="text"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded"
            />
          </div>
          
          <div className="flex mt-6 justify-between">
            <div className="flex justify-end ">
              <button
                onClick={() => navigate('/')}
                className="px-4 py-2 bg-[#1f8ce9] hover:bg-blue-700  text-white rounded"
              >
                بازگشت
              </button>
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                className="px-2 py-1 bg-[#1f8ce9] hover:bg-blue-700  text-white rounded "
                onClick={handelEdit}
              >
                ویرایش اطلاعات
              </button>
            </div>
          </div>
        </form>
        {success && <div className="text-green-500 mt-4">{success}</div>}
        {error && <div className="text-red-500 mt-4">{error}</div>}
      </div>
    </div>
  );
}

export default App;
