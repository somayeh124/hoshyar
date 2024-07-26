import axios from 'axios';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';

import { Box } from '@mui/system';
import { Chip, Modal, Avatar, Button, Rating, Divider, TextField, Typography } from '@mui/material';

import { getCookieValue } from 'src/utils/cookie';

import { Onrun } from 'src/api/onRun';

import Iconify from 'src/components/iconify';




const ViewModal = ({ open, onClose,id }) => {

    const [starValue, setStarValue] = useState([]);
    const [detail, setDetail]=useState(null)



    const fetchConsultant = async () => {
        const token = getCookieValue('UID');
    
        try {
          const response = await axios.get(`${Onrun}/api/visit/`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setDetail(response.data);
        } catch (error) {
          console.log('Error fetching consultant data:', error);
        }
      };
    
      useEffect(() => {
        fetchConsultant();
      }, []);
    
    
  
 
    return (

        detail &&(

    <Modal open={open} onClose={onClose}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 600,
            maxWidth: '90%',
            backgroundColor: '#FFFFFF',
            boxShadow: 24,
            borderRadius: 4,
            textAlign: 'center',
            p: 4,
            border: '2px solid #E0E0E0',
          }}
        >
          <Typography
            variant="h6"
            sx={{
              mb: 3,
              color: '#42a5f5',
              fontWeight: 'bold',
              backgroundColor: '#e3f2fd',
              py: 1,
              borderRadius: 2,
            }}
          >
            جزئیات مشاوره
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 3 }}>
            <Avatar
              src={`${Onrun}/${detail.consultant_photo}`}
              alt="مشاور"
              sx={{ width: 100, height: 100, mr: 2 }}
            />
  
            <Typography variant="body1" sx={{ fontWeight: 'bold', fontSize: '18px' }}>
              {detail.consultant}{' '}
            </Typography>
          </Box>
          <Typography variant="body1" sx={{ mb: 2 }}>
            نوع مشاوره: {detail.kind}
          </Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>
            تاریخ مشاوره: {detail.date}
          </Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>
            ساعت مشاوره: {detail.time}
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
            <Chip
              icon={
                detail.status === 'done' ? (
                  <Iconify icon="gravity-ui:circle-check-fill" />
                ) : (
                  <Iconify icon="mdi:perimeter" />
                )
              }
              label={detail.status === 'done' ? 'تکمیل شد' : 'درحال اجرا'}
              color={detail.status === 'done' ? 'info' : 'success'}
              sx={{ fontSize: '14px', bgcolor: '#D7ECD9', color: '#4CAF50' }}
            />
          </Box>
          {detail.status === 'done' && (
            <Box>
              <Divider sx={{ mb: 2, mt: 2 }} />
              <Typography variant="body1" sx={{ mb: 2 }}>
                لطفاً به {detail.consultant} امتیاز دهید:
              </Typography>
              <Rating
                name="simple-controlled"
                value={starValue}
                onChange={(event, newValue) => {
                  setStarValue(newValue);
                }}
                size="large"
                sx={{ mb: 2 }}
              />
              <TextField
                id="outlined-basic"
                label="نظر"
                variant="outlined"
                fullWidth
                multiline
                rows={3}
                sx={{ mb: 3 }}
              />
            </Box>
          )}
          <Divider />
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Button
              variant="contained"
              onClick={onClose}
              sx={{ bgcolor: '#1976D2', color: '#FFFFFF', px: 4, mt: '20px' }}
            >
              بستن
            </Button>
          </Box>
        </Box>
      </Modal>
        )
      
    );
  }

  ViewModal.propTypes = {
    open: PropTypes.func,
    onClose: PropTypes.func,
    id:PropTypes.number
  };

  export default ViewModal;

  