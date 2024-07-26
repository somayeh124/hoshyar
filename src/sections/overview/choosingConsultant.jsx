/* eslint-disable react-hooks/exhaustive-deps */
import axios from 'axios';
import * as React from 'react';
import { useEffect } from 'react';
import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Rating, CardContent } from '@mui/material';

import { getCookieValue } from 'src/utils/cookie';

import { Onrun } from 'src/api/onRun';

import Iconify from 'src/components/iconify';

export default function ChoosingConsultant({setConsultantData, consultantData, selectedConsultant, handleSelectConsultant }) {


 // دریافت اطلاعات مشاور ها 
  const fetchConsultant = async () => {
    const token = getCookieValue('UID');

    try {
      const response = await axios.get(`${Onrun}/api/consultant/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setConsultantData(response.data);
    } catch (error) {
      console.log('Error fetching consultant data:', error);
    }
  };

  useEffect(() => {
    fetchConsultant();
  }, []);

  const checkUID = () => {
    const uid = getCookieValue('UID');
    console.log(uid);
  };

  useEffect(() => {
    checkUID();
  }, []);


  return (
    <Box sx={{ flexGrow: 1 }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: '20px',
        }}
      >
        <Typography variant="h4" align="center" mt="50px" mb="50px">
          لطفا مشاور خود را انتخاب کنید
        </Typography>
      </Box>
      <Grid container spacing={2} sx={{ maxWidth: 1200, margin: 'auto' }}>
        {consultantData.map((consultant, index) => (
          <Grid item key={index} xs={12} sm={6} md={4}>
            <Card
              sx={{
                height: '100%',
                boxShadow: selectedConsultant === index ? '0px 0px 10px 3px #b7deb8' : 'none',
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: 200,
                }}
              >
                <Avatar
                  sx={{ width: 160, height: 160 }}
                  src={`${Onrun}/${consultant.profile_photo}`}/>

</Box>
              <CardContent>
                <Typography gutterBottom variant="h5" component="div" align="center">
                  {consultant.name} {consultant.last_name}
                </Typography>
                <Typography variant="body2" color="text.secondary" align="center">
                  {consultant.position}
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
                  <Rating name="read-only" value={consultant.rank} readOnly />
                </Box>
              </CardContent>
              <Button
                fullWidth
                variant="contained"
                sx={{
                  backgroundColor: selectedConsultant === index ? '#00c853' : '#1976d2',
                  color: '#ffffff',

                  '&:hover': {
                    backgroundColor: selectedConsultant === index ? '#00e676' : '#1976d2',
                  },
                }}
                onClick={() => handleSelectConsultant(index)}
              >
                {selectedConsultant === index ? (
                  <Iconify fontWeight="800" width="25px" icon="gravity-ui:check" />
                ) : (
                  'انتخاب'
                )}
              </Button>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

// تعریف نوع پراپ‌ها برای کامپوننت ChoosingConsultant
ChoosingConsultant.propTypes = {
  consultantData: PropTypes.array.isRequired, // داده‌های مشاوران
  selectedConsultant: PropTypes.number.isRequired, // شناسه مشاور انتخاب شده
  setConsultantData: PropTypes.func.isRequired, // تابع برای تنظیم داده‌های مشاوران
  handleSelectConsultant: PropTypes.func.isRequired, // تابع برای انتخاب مشاور
};
