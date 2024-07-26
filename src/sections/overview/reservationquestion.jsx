import React from 'react';
import PropTypes from 'prop-types';

import {
  Radio,
  Divider,
  Accordion,
  Typography,
  RadioGroup,
  FormControl,
  useMediaQuery,
  AccordionSummary,
  AccordionDetails,
  FormControlLabel,
} from '@mui/material';

import Iconify from 'src/components/iconify';

import { questions } from './questionConfig';
// کامپوننت ReservationQuestion برای نمایش و مدیریت سوالات رزرواسیون با استفاده از گزینه‌های انتخابی
// دسترسی به ویژگی‌های رزرواسیون بر اساس اندازه صفحه
const ReservationQuestion = ({ questionPostData, handleOptionChange }) => {
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down('sm'));

  return (
    <div style={styles.container}>
      <div style={{ ...styles.quizBox, padding: isMobile ? '15px' : '30px' }}>
        <Typography color="#3f51b5" variant={isMobile ? 'h4' : 'h3'} gutterBottom>
          سوالات
        </Typography>
        <Typography mb={2} variant="body1" gutterBottom>
          سوالات زیر را بخوانید و پاسخ مناسب دهید
        </Typography>
        <Divider />
        {questions.map((q, qIndex) => (
          <Accordion key={qIndex} style={styles.accordion}>
            <AccordionSummary expandIcon={<Iconify icon="gravity-ui:plus" />}>
              <Typography
                variant="h6"
                style={{
                  fontSize: isMobile ? '14px' : '16px',
                  marginTop: '15px',
                  borderRadius: '30px',
                }}
              >
                {q.num}. {q.question}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <FormControl component="fieldset">
                <RadioGroup
                  aria-label={`quiz-${qIndex}`}
                  name={`quiz-${qIndex}`}
                  value={questionPostData[qIndex] || ''}
                  onChange={(e) => handleOptionChange(qIndex, e.target.value)}
                >
                  {q.options.map((option, index) => (
                    <FormControlLabel
                      key={index}
                      value={option.value}
                      control={<Radio />}
                      label={option.lable}
                      style={styles.option}
                    />
                  ))}
                </RadioGroup>
              </FormControl>
            </AccordionDetails>
          </Accordion>
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    fontFamily: 'Arial, sans-serif',
    padding: '20px',
    boxSizing: 'border-box',
    overflowY: 'auto',
  },
  quizBox: {
    backgroundColor: '#fff',
    padding: '30px',
    borderRadius: '20px',
    boxShadow: '0 0 20px rgba(0, 0, 0, 0.1)',
    width: '100%',
    maxWidth: '750px',
    textAlign: 'right',
    border: '10px solid #fafafa',
  },
  questionContainer: {
    marginBottom: '25px',
    paddingBottom: '15px',
  },
  option: {
    margin: '10px 0',
  },
  accordion: {
    marginBottom: '15px',
  },
};

// تعریف نوع پراپ‌ها برای کامپوننت ReservationQuestion
ReservationQuestion.propTypes = {
  questionPostData: PropTypes.object.isRequired, // گزینه‌های انتخابی انتخاب شده
  handleOptionChange: PropTypes.func.isRequired, // تابع برای تغییر گزینه‌های انتخابی
};

export default ReservationQuestion;
