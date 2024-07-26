/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable array-callback-return */
import axios from 'axios';
/* eslint-disable react/prop-types */
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import React, { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import { CardHeader } from '@mui/material';
import TableRow from '@mui/material/TableRow';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';

import { getCookieValue } from 'src/utils/cookie';

import { Onrun } from 'src/api/onRun';

import Iconify from 'src/components/iconify';

import TaskItem from './TaskItem';

// ----------------------------------------------------------------------

export default function AnalyticsTasks({ title, subheader, ...other }) {
  const [selected, setSelected] = useState(['2']);
  const [list, setList] = useState([]);
  const [profile, setProfile] = useState({});

  const navigate = useNavigate();

  // اطلاعات جدول رو میگیره
  const fetchConsultant = async () => {
    const token = getCookieValue('UID');

    try {
      const response = await axios.get(`${Onrun}/api/visit/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setList(response.data);
    } catch (error) {
      console.log('Error fetching consultant data:', error);
    }
  };

  useEffect(() => {
    fetchConsultant();
  }, []);
  const fetchProfile = async () => {
    try {
      const token = getCookieValue('UID');

      const response = await axios.get(`${Onrun}/api/user/profile/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setProfile(response.data);
    } catch (error) {
      if (error.response) {
        if (error.response.status === 401) {
          navigate('/login');
        } else {
          console.log(error.response.data.message || error.message || 'خطا');
        }
      } else {
        console.log('اینترنت خود را چک کنید');
      }
    }
  };

  const checkUID = () => {
    const uid = getCookieValue('UID');
    console.log('Current UID:', uid);
  };

  useEffect(() => {
    checkUID();
  }, []);

  useEffect(() => {
    fetchProfile();
  }, []);

  // تغییر وضعیت تکمیل یک تسک (افزودن یا حذف تسک از لیست تسک‌های تکمیل شده)
  const handleClickComplete = (taskId) => {
    const tasksCompleted = selected.includes(taskId)
      ? selected.filter((value) => value !== taskId)
      : [...selected, taskId];

    setSelected(tasksCompleted);
  };

  //  اگر دکمه دریافت مشاور رو زد باید بره توی مسیر ConsultantReservation
  const handleConsultant = () => {
    // چک کردن وجود تاریخ تولد در پروفایل
    if (!profile.date_birth || profile.date_birth === undefined) {
      toast.error('تاریخ تولد اجباری است. لطفا پروفایل خود را کامل کنید');
      return; // خروج از تابع اگر تاریخ تولد وجود نداشته باشد
    }

    // انتقال به صفحه ConsultantReservation
    navigate('/ConsultantReservation', { replace: true });
  };
  return (
    <Card
      sx={{
        p: 3,
        borderRadius: 2,
        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
        backgroundColor: '#f9f9f9',
      }}
      dir="rtl"
    >
      <CardHeader
        sx={{
          mb: 3,
          textAlign: 'center',
          fontSize: '1.8rem',
        }}
        title="مشاوره های شما"
      />
      <TableContainer sx={{ maxHeight: 400, overflowY: 'auto' }}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead sx={{ backgroundColor: '#64b5f6' }}>
            <TableRow>
              <TableCell
                sx={{
                  fontSize: '1rem',
                  fontWeight: 'bold',
                  color: '#555555',
                }}
              >
                نام مشاور
              </TableCell>
              <TableCell
                sx={{
                  fontSize: '1rem',
                  fontWeight: 'bold',
                  color: '#555555',
                }}
              >
                نوع
              </TableCell>
              <TableCell
                sx={{
                  fontSize: '1rem',
                  fontWeight: 'bold',
                  color: '#555555',
                }}
              >
                وضعیت
              </TableCell>
              <TableCell
                sx={{
                  fontSize: '1rem',
                  fontWeight: 'bold',
                  color: '#555555',
                }}
              >
                تاریخ
              </TableCell>
              <TableCell
                sx={{
                  fontSize: '1rem',
                  fontWeight: 'bold',
                  color: '#555555',
                }}
              >
                ساعت
              </TableCell>
              <TableCell
                sx={{
                  fontSize: '1rem',
                  fontWeight: 'bold',
                  color: '#555555',
                }}
              >
                عملیات
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody
            style={{ borderRight: `5px solid ${list.status === 'done' ? 'blue' : 'green'}` }}
          >
            {list.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  اطلاعاتی موجود نمیباشد
                </TableCell>
              </TableRow>
            ) : (
              list.map((task) => (
                <TaskItem
                  key={task.id}
                  task={task}
                  list={list}
                  checked={selected.includes(task.id)}
                  onClickComplete={() => handleClickComplete(task.id)}
                />
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center' }}>
        <Button
          variant="contained"
          disableElevation
          onClick={handleConsultant}
          sx={{
            backgroundColor: '#1976d2',
            color: '#ffffff',
            fontSize: '1rem',
            fontWeight: 'bold',
            textTransform: 'none',
            borderRadius: 'px',
            boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
            '&:hover': { backgroundColor: '#42a5f5' },
          }}
        >
          <Iconify icon="gravity-ui:plus" sx={{ mr: 1 }} /> دریافت مشاوره
        </Button>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          pauseOnFocusLoss
          draggable
          pauseOnHover
          style={{ marginTop: '50px' }}
        />
      </Box>
    </Card>
  );
}
// تعریف نوع پراپ‌ها برای کامپوننت AnalyticsTasks
AnalyticsTasks.propTypes = {
  list: PropTypes.array,
  subheader: PropTypes.string,
  title: PropTypes.string,
};

// ----------------------------------------------------------------------
