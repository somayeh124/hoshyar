/* eslint-disable no-unused-vars */
import axios from 'axios';
/* eslint-disable no-nested-ternary */
import * as React from 'react';
import { useState, useEffect } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';

import Box from '@mui/material/Box';
import Step from '@mui/material/Step';
import Button from '@mui/material/Button';
import Stepper from '@mui/material/Stepper';
import StepLabel from '@mui/material/StepLabel';
import Typography from '@mui/material/Typography';

import { getCookieValue, setCookieValue } from 'src/utils/cookie';

import { Onrun } from 'src/api/onRun';

import ReservationType from './reservationType';
import ReservationTime from './reservationTime';
import ChoosingConsultant from './choosingConsultant';
import ReservationInvoice from './reservationInvoice';
import Reservationquestion from './reservationquestion';

const steps = ['سوالات', 'نوع مشاوره', 'انتخاب مشاور', 'انتخاب تاریخ وزمان', 'پیش فاکتور'];

export default function ConfirmationModal() {
  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set());
  const [selectedConsultant, setSelectedConsultant] = useState('');
  const [consultantData, setConsultantData] = useState([]);
  const [consultantId, setConsultantId] = useState('');

  const [selectedDay, setSelectedDay] = useState('');
  const [selectedTime, setSelectedTime] = useState('');

  const Navigate = useNavigate();

  const [selected, setSelected] = useState('');
  const [typeData, setTypeData] = useState([]);
  const [typeDataId, setTypeDataId] = useState('');
  const [profile, setProfile] = useState('');
  const [questionPostData, setQuestionPostData] = useState({
    10: profile,
  });

  const fetchProfile = async () => {
    try {
      const token = getCookieValue('UID');
  
      const response = await axios.get(`${Onrun}/api/user/profile/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      setNum1(response.data.date_birth); // تنظیم مقدار profile در setNum1
    } catch (error) {
      if (error.response && error.response.status === 401) {
        console.log(error.response.data.message || error.message || '401');
      } else if (error.response && error.response.status === 500) {
        console.log(error.response.data.message || error.message || 'خطا');
      } else {
        console.log(error.response.data.message || error.message || 'خطا');
      }
    }
  };
  

  useEffect(() => {
    fetchProfile();
  }, []);
  console.log(profile);

  // مدیریت کلیک آیتم و تنظیم مقادیر انتخاب شده

  const handleClick = (item) => {
    setSelected(item.title);
    setTypeDataId(item.id);
  };
  // انتخاب مشاور و تنظیم شناسه مشاور انتخاب شده

  const handleSelectConsultant = (index) => {
    setSelectedConsultant(index);
    setConsultantId(consultantData[index].id);
  };
  // تعریف متغیرهای حالت برای نگهداری پاسخ سوالات
  const [num1, setNum1] = useState('');
  const [num2, setNum2] = useState('');
  const [num3, setNum3] = useState('');
  const [num4, setNum4] = useState('');
  const [num5, setNum5] = useState('');
  const [num6, setNum6] = useState('');
  const [num7, setNum7] = useState('');
  const [num8, setNum8] = useState('');
  const [num9, setNum9] = useState('');
  const [num10, setNum10] = useState('');
  // بررسی اختیاری بودن مرحله

  // بررسی اختیاری بودن مرحله
  const isStepOptional = (step) => step === 1;

  // بررسی رد شدن مرحله
  const isStepSkipped = (step) => skipped.has(step);

  // مدیریت تغییر گزینه‌های انتخابی برای هر سوال
  const handleOptionChange = (questionIndex, option) => {
    setQuestionPostData((prevQuestionPostData) => ({
      ...prevQuestionPostData,
      [questionIndex]: option,
      10: prevQuestionPostData[10] || num1,
    }));
  };
  
  console.log('جواب سوالات', questionPostData);
  console.log('نوع مشاوره', typeDataId);
  console.log('انتخاب مشاور', selectedConsultant);
  // مدیریت گام بعدی در فرآیند پرسشنامه و بررسی پاسخ‌دهی به تمام سوالات

  const handleNext = () => {
    const allAnswered = Object.values(questionPostData).length >= 9;

    if (!allAnswered) {
      toast.error('لطفا به تمام سوالات پاسخ دهید');
    } else {
      let newSkipped = skipped;
      if (isStepSkipped(activeStep)) {
        newSkipped = new Set(newSkipped.values());
        newSkipped.delete(activeStep);
      }
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
      setSkipped(newSkipped);
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }
  };
  // مدیریت بازگشت به گام قبلی در فرآیند پرسشنامه

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  // بازگشت به داشبورد اصلی

  const handleBackDashboard = () => {
    Navigate('/');
  };
  // رد کردن گام فعلی در صورت امکان وجود نداشتن اجباری بودن آن

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };
  // بازگشت به صفحه اصلی داشبورد

  const handleReset = () => {
    Navigate('/');
  };

  const fetchData = async () => {
    try {
      const token = getCookieValue('UID'); // گرفتن توکن از کوکی

      const sendApiCode = await axios.post(
        `${Onrun}/api/visit/`,
        {
          customer: profile,
          consultant: selectedConsultant,
          questions: questionPostData,
          kind: typeDataId,
          date: selectedDay,
          time: selectedTime,
          survey: null,
          note: 'date',
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // اضافه کردن توکن به هدر
          },
        }
      );

      setCookieValue('UID', sendApiCode.data.access);
      Navigate('/');
    } catch (error) {
      toast.error('خطا در ارسال درخواست', error.message);
    }
  };

  const checkUID = () => {
    const uid = getCookieValue('UID');
    console.log('Current UID:', uid);
  };

  useEffect(() => {
    checkUID();
  }, []);
  return (
    <Box sx={{ width: '100%', direction: 'ltr', margin: 'auto', marginTop: '2vh' }}>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};
          if (isStepOptional(index)) {
            labelProps.optional = null;
          }
          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {activeStep === steps.length ? (
        <>
          <Typography sx={{ mt: 2, mb: 1 }}>
            تمام مراحل به پایان رسیده‌اند - شما به پایان رسیده‌اید
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Box sx={{ flex: '1 1 auto' }} />
            <Button onClick={handleReset}>بازنشانی</Button>
          </Box>
        </>
      ) : (
        <>
          <Typography sx={{ mt: 2, mb: 1 }}>
            {activeStep === 0 ? (
              <Reservationquestion
                setNum1={setNum1}
                setNum2={setNum2}
                setNum3={setNum3}
                setNum4={setNum4}
                setNum5={setNum5}
                setNum6={setNum6}
                setNum7={setNum7}
                setNum8={setNum8}
                setNum9={setNum9}
                setNum10={setNum10}
                questionPostData={questionPostData}
                setQuestionPostData={setQuestionPostData}
                handleOptionChange={handleOptionChange}
              />
            ) : activeStep === 1 ? (
              <ReservationType
                setTypeData={setTypeData}
                typeData={typeData}
                handleClick={handleClick}
                selected={selected}
              />
            ) : activeStep === 2 ? (
              <ChoosingConsultant
                setConsultantData={setConsultantData}
                handleSelectConsultant={handleSelectConsultant}
                selectedConsultant={selectedConsultant}
                consultantData={consultantData}
              />
            ) : activeStep === 3 ? (
              <ReservationTime
                selectedDay={selectedDay}
                setSelectedDay={setSelectedDay}
                selectedTime={selectedTime}
                setSelectedTime={setSelectedTime}
                consultantId={consultantId}
                consultantData={consultantData}
              />
            ) : (
              <ReservationInvoice typeDataId={typeDataId} consultantData={consultantData} />
            )}
          </Typography>

          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Button onClick={handleBackDashboard} sx={{ mr: 1 }}>
              بازگشت به پنل کاربری
            </Button>
            <Button
              variant="contained"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              بازگشت
            </Button>
            <Box sx={{ flex: '1 1 auto' }} />
            {isStepOptional(activeStep) && (
              <Button onClick={handleSkip} sx={{ mr: 1 }}>
                رد کردن
              </Button>
            )}
            {activeStep === steps.length - 1 ? (
              <Button variant="contained" onClick={fetchData}>
                پرداخت
              </Button>
            ) : (
              <Button variant="contained" onClick={handleNext}>
                بعدی
              </Button>
            )}
          </Box>
        </>
      )}
      <ToastContainer />
    </Box>
  );
}
