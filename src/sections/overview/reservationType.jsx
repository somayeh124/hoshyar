/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react-hooks/exhaustive-deps */
import axios from 'axios';
import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';

import { Grid, styled, Typography, IconButton } from '@mui/material';

import { getCookieValue } from 'src/utils/cookie';

import { Onrun } from 'src/api/onRun';

import Iconify from 'src/components/iconify';

const StyledBox = styled(Grid)(({ selected }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '40px',
  margin: '20px',
  border: selected ? '4px solid #e1f5fe' : '2px solid #f5f5f5',
  borderRadius: '12px',
  cursor: 'pointer',
  backgroundColor: selected ? '#e3f2fd' : '#ffffff',
  transition: 'all 0.3s ease',
  boxShadow: selected ? '0px 0px 20px rgba(0, 0, 0, 0.2)' : '0px 0px 10px rgba(0, 0, 0, 0.1)',
  '&:hover': {
    transform: 'scale(1.05)',
    boxShadow: selected ? '0px 0px 20px rgba(0, 0, 0, 0.2)' : '0px 0px 15px #e1f5fe',
  },
}));

const TitleBox = styled(Grid)({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '10vh',
  padding: '20px',
});

const ReservationType = ({ setTypeData, typeData, handleClick }) => {
  const [selected, setSelected] = useState('');

  // گرفتن اطلاعات مربوط به نوع مشاوره
  const fetchType = async () => {
    const token = getCookieValue('UID');

    try {
      const response = await axios.get(`${Onrun}/api/kindofcounseling/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTypeData(response.data);
    } catch (error) {
      console.error('Error fetching type data:', error);
      // Optionally handle the error (e.g., set default typeData)
    }
  };

  useEffect(() => {
    fetchType();
  }, []);

  const checkUID = () => {
    const uid = getCookieValue('UID');
    console.log(uid);
  };

  useEffect(() => {
    checkUID();
  }, []);

  // این تابع وقتی یک باکس کلیک می‌شود، عنصر مربوطه را انتخاب کرده و سپس تابع handleClick را صدا می‌زند.
  const handleBoxClick = (item) => {
    setSelected(item.id);
    handleClick(item);
  };

  console.log(selected);

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      style={{
        minHeight: '50vh',
        backgroundColor: '#fafafa',
        borderRadius: 20,
        padding: '20px',
        boxShadow: '0px 0px 20px rgba(0, 0, 0, 0.2)',
        margin: '10rem auto',
        width: '50vw',
        maxWidth: '800px',
      }}
    >
      <Grid item xs={12}>
        <TitleBox>
          <Typography variant="h5">لطفاً نوع مشاوره خود را انتخاب کنید</Typography>
        </TitleBox>
      </Grid>
      {typeData.map((item, index) => (
        <Grid key={index} item xs={12} sm={6} md={4}>
          <StyledBox selected={selected === item.title} onClick={() => handleBoxClick(item)}>
            <IconButton>
              {item.icon ? (
                <img src={`${Onrun}/${item.icon}`} width={80} height={80} />
              ) : (
                <Iconify icon="gravity-ui:person" width={80} height={80} />
              )}
            </IconButton>
            <Typography
              variant="h6"
              style={{ color: selected === item.title ? '#42a5f5' : '#000' }}
            >
              {item.title}
            </Typography>
          </StyledBox>
        </Grid>
      ))}
    </Grid>
  );
};

// تعریف نوع پراپ‌ها برای کامپوننت ReservationType
ReservationType.propTypes = {
  setTypeData: PropTypes.func.isRequired, // تابع برای تنظیم داده‌های نوع رزرو
  typeData: PropTypes.array.isRequired, // داده‌های نوع رزرو
  handleClick: PropTypes.func.isRequired, // تابع برای کلیک روی آیتم‌های نوع رزرو
};

export default ReservationType;
