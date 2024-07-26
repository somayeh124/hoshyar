/* eslint-disable no-nested-ternary */
import axios from 'axios';
import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';

import Table from '@mui/material/Table';
import Paper from '@mui/material/Paper';
import TableRow from '@mui/material/TableRow';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import { Button, Avatar, Divider, TextField, Typography } from '@mui/material';

import { getCookieValue } from 'src/utils/cookie';

import { Onrun } from 'src/api/onRun';

import Iconify from 'src/components/iconify';

const tableContainerStyle = {
  maxWidth: 900,
  margin: 'auto',
  textAlign: 'center',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
  borderRadius: '8px',
  marginTop: '20px',
  color: '#616161',
};

const lastRowStyle = {
  backgroundColor: '#e3f2fd',
};

function createData(name, content, isCodeValid = true) {
  return { name, content, isCodeValid };
}

// Utility function to format numbers with commas
const formatNumberWithCommas = (number) => {
  if (typeof number === 'number') {
    return number.toLocaleString();
  }
  return number;
};

const BasicTable = ({ typeDataId, consultantData }) => {
  const [discountCode, setDiscountCode] = useState('');
  const [isCodeValid, setIsCodeValid] = useState(null);
  const [helperText, setHelperText] = useState('');
  const [invoice, setInvoice] = useState(null);
  const token = getCookieValue('UID');

  // گرفتن اطلاعات فاکتور پرداخت بر اساس ایدی نوع مشاوره انتخابی کاربر
  const findConsultantById = () =>
    consultantData.find((consultant) => consultant.id === typeDataId);

  const fetchTime = async () => {
    try {
      const response = await axios.get(`${Onrun}/api/perpay/${typeDataId}/?code=${discountCode}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
        },
      });
      setInvoice(response.data);
    } catch (error) {
      console.error('Error fetching time:', error.response || error.message);
    }
  };

  useEffect(() => {
    fetchTime();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

 // گرفتن اطلاعات کد تخفیف 
  const handleDiscountValidation = async () => {
    try {
      const config = {
        method: 'get',
        url: `${Onrun}/api/discount/?code=${discountCode}`,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.request(config);

      setHelperText(response.data.message);
      setIsCodeValid(true);

      fetchTime();
    } catch (error) {
      console.error('Error validating discount:', error.message);
      if (error.response) {
        setHelperText(error.response.data.message);
        fetchTime();
      } else {
        setHelperText(error.message);
        fetchTime();
      }
      setIsCodeValid(false);
    }
  };

  const buttonStyle = {
    borderRadius: '50%',
    width: '30px',
    height: '30px',
    minWidth: 'auto',
    padding: '0',
    margin: '10px',
    backgroundColor: isCodeValid === null ? 'blue' : isCodeValid ? 'green' : 'red',
  };
  const headerText = {
    marginBottom: '40px',
    fontSize: '18px',
    textAlign: 'center',
    marginTop: '20px',
  };

  const rows = [
    createData('هزینه', invoice ? formatNumberWithCommas(invoice.price) : '--'),
    createData('تخفیف ویژه مشتریان', invoice ? formatNumberWithCommas(invoice.off) : '--'),
    createData('ارزش افزوده', invoice ? formatNumberWithCommas(invoice.tax) : '--'),
    createData(
      'کد تخفیف',
      <>
        <TextField
          id="outlined"
          label="کد تخفیف"
          value={discountCode}
          onChange={(e) => setDiscountCode(e.target.value)}
          error={isCodeValid === false}
          success={isCodeValid === true}
          helperText={helperText}
        />
        <Button onClick={handleDiscountValidation} variant="contained" style={buttonStyle}>
          <Iconify icon="gravity-ui:circle-check-fill" />
        </Button>
      </>,
      isCodeValid
    ),
    createData('مجموع', invoice ? formatNumberWithCommas(invoice.pey) : '--'),
  ];

  return (
    <div style={{ margin: '20px', fontFamily: 'Arial, sans-serif' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
        <Avatar src={`${Onrun}/${findConsultantById()?.profile_photo}`} sx={{ width: 120, height: 120 }} />
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <Typography variant="h5">
            {findConsultantById()?.name} {findConsultantById()?.last_name}
          </Typography>
          <Typography variant="body2">{findConsultantById()?.postion}</Typography>
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
        <TableContainer component={Paper} style={tableContainerStyle}>
          <div className="text-xl font-bold text-[#212b36]" style={headerText}>
            اطلاعات پرداخت
          </div>
          <Divider />

          <Table aria-label="simple table">
            <TableBody>
              {rows.map((row, index) => (
                <TableRow key={row.name} style={index === rows.length - 1 ? lastRowStyle : {}}>
                  <TableCell component="th" scope="row">
                    <Typography
                      variant="inherit"
                      style={
                        row.name === 'مجموع'
                          ? { fontWeight: 'bold', color: '#212b36', fontSize: '18px' }
                          : { fontWeight: 'bold', color: '#202b36', fontSize: '14px' }
                      }
                    >
                      {row.name}
                    </Typography>
                  </TableCell>
                  <TableCell
                    align="center"
                    style={{ fontWeight: 'bold', color: '#616161', fontSize: '16px' }}
                  >
                    {row.content}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

// تعریف نوع پراپ‌ها برای کامپوننت BasicTable
BasicTable.propTypes = {
  typeDataId: PropTypes.string.isRequired, // شناسه نوع داده
  consultantData: PropTypes.array.isRequired, // داده‌های مشاوران
};
export default BasicTable;
