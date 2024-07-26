/* eslint-disable react-hooks/exhaustive-deps */
import axios from 'axios';
import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import 'react-datepicker/dist/react-datepicker.css';

import { Box, Avatar, Divider, Typography } from '@mui/material';

import { getCookieValue } from 'src/utils/cookie';

import { Onrun } from 'src/api/onRun';

const ReservationTime = ({
  consultantId,
  consultantData,
  setSelectedTime,
  selectedTime,
  setSelectedDay,
  selectedDay,
}) => {
  const [time, setTime] = useState([]);

  useEffect(() => {
    fetchTime();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // Set default selected day and time when time data is fetched
    if (time.length > 0) {
      setSelectedDay(0); // Select the first day by default
      if (time[0]?.time.length > 0) {
        setSelectedTime(0); // Select the first time slot of the first day by default
      }
    }
  }, [time]);

  console.log(selectedDay);
  console.log(selectedTime);

  // گرفتن اطلاعات تایم و زمان مشاور براسا کد مشاور انتخابی کاربر
  const fetchTime = async () => {
    const token = getCookieValue('UID');

    try {
      const response = await axios.get(`${Onrun}/api/selecttime/${consultantId}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTime(response.data);
    } catch (error) {
      console.log('Error fetching time:', error);
    }
  };
  // پیدا کردن مشاور بر اساس شناسه

  const findConsultantById = () =>
    consultantData.find((consultant) => consultant.id === consultantId);
  // تبدیل روز هفته به فارسی

  const getPersianDay = (weekday) => {
    switch (weekday) {
      case 0:
        return 'شنبه';
      case 1:
        return 'یکشنبه';
      case 2:
        return 'دوشنبه';
      case 3:
        return 'سه‌شنبه';
      case 4:
        return 'چهارشنبه';
      case 5:
        return 'پنج‌شنبه';
      case 6:
        return 'جمعه';
      default:
        return '';
    }
  };
  // مدیریت انتخاب روز و ساعت برای رزرواسیون

  const handleDayClick = (index) => {
    setSelectedDay(index === selectedDay ? null : index);
    setSelectedTime(null);
  };
  const handleTimeClick = (index) => {
    setSelectedTime(index === selectedTime ? null : index);
  };

  return (
    <div style={{ margin: '20px', fontFamily: 'Arial, sans-serif' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
        <Avatar
          src={`${Onrun}/${findConsultantById()?.profile_photo}`}
          sx={{ width: 120, height: 120 }}
        />
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <Typography variant="h5">
            {findConsultantById()?.name} {findConsultantById()?.last_name}
          </Typography>
          <Typography variant="body2">{findConsultantById()?.postion}</Typography>
        </div>
      </div>

      <div
        style={{
          width: '800px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#fff',
          boxShadow: '0 0 4px rgba(0, 0, 0, 0.1)',
          margin: '30px auto',
          borderRadius: '15px',
          padding: '30px',
        }}
      >
        <div
          style={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Typography
            variant="h6"
            style={{ marginBottom: '30px', fontWeight: 'bold', color: '#3f51b5' }}
          >
            انتخاب زمان مشاوره
          </Typography>
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '20px',
              justifyContent: 'center',
            }}
          >
            {time.map((timeSlot, index) => (
              <Box
                key={index}
                height={selectedDay === index ? 140 : 130}
                width={selectedDay === index ? 140 : 130}
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                gap={1}
                p={2}
                boxShadow="0 0 4px rgba(0, 0, 0, 0.1)"
                bgcolor={selectedDay === index ? '#bbdefb' : '#e3f2fd'}
                borderRadius="10px"
                transition="transform 0.2s"
                sx={{
                  '&:hover': {
                    transform: 'scale(1.05)',
                    backgroundColor: '#bbdefb',
                  },
                  cursor: 'pointer',
                }}
                onClick={() => handleDayClick(index)}
              >
                <Typography
                  style={{
                    backgroundColor: '#bbdefb',
                    padding: '10px 20px',
                    borderRadius: '10px',
                    marginTop: '-2px',
                    border: '2px solid #90caf9',
                    fontWeight: 'bold',
                    color: selectedDay === index ? '#3f51b5' : '#000',
                    fontSize: '1rem',
                  }}
                >
                  {getPersianDay(timeSlot.weekday)}{' '}
                </Typography>
                <Typography
                  style={{
                    marginTop: '2px',
                    fontWeight: 'bold',
                    color: selectedDay === index ? '#3f51b5' : '#000',
                    fontSize: '1rem',
                  }}
                >
                  {timeSlot.jalali}
                </Typography>
              </Box>
            ))}
          </div>
        </div>

        <Divider style={{ width: '100%', margin: '30px 0' }} />

        <div
          style={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Typography
            variant="h6"
            style={{ marginBottom: '20px', fontWeight: 'bold', color: '#3f51b5' }}
          >
            انتخاب ساعت مشاوره
          </Typography>
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '20px',
              justifyContent: 'center',
            }}
          >
            {time[selectedDay]?.time.map((T, timeIndex) => (
              <Box
                key={timeIndex}
                height={selectedTime === timeIndex ? 80 : 70}
                width={selectedTime === timeIndex ? 130 : 140}
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                p={2}
                boxShadow="0 0 4px rgba(0, 0, 0, 0.1)"
                bgcolor={selectedTime === timeIndex ? '#bbdefb' : '#e3f2fd'}
                borderRadius="10px"
                transition="transform 0.2s"
                sx={{
                  '&:hover': {
                    transform: 'scale(1.05)',
                    backgroundColor: '#bbdefb',
                  },
                  cursor: 'pointer',
                }}
                onClick={() => handleTimeClick(timeIndex)}
              >
                <Typography
                  style={{
                    fontSize: '20px',
                    fontWeight: '600',
                    color: selectedTime === timeIndex ? '#3f51b5' : '#000',
                  }}
                >
                  {T}
                </Typography>
              </Box>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// تعریف نوع پراپ‌ها برای کامپوننت ReservationTime
ReservationTime.propTypes = {
  selectedTime: PropTypes.number.isRequired,
  setSelectedDay: PropTypes.func.isRequired,
  setSelectedTime: PropTypes.func.isRequired,
  selectedDay: PropTypes.number.isRequired,
  consultantId: PropTypes.string.isRequired, // شناسه مشاور مورد نظر برای رزرو
  consultantData: PropTypes.array.isRequired, // اطلاعات مشاوران
};

export default ReservationTime;
