/* eslint-disable no-unused-vars */
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import { alpha, useTheme } from '@mui/material/styles';

import { getCookieValue, setCookieValue } from 'src/utils/cookie';

// http://192.168.62.106:8000
import { Onrun } from 'src/api/onRun';
import { bgGradient } from 'src/theme/css';

import LoginView from '../login-view';
import SignupView from '../signup-view';
import OtpLoginView from '../otplogin-view';
import OtpSignUpView from '../otpsignup-view';

// ___________________________________________________________________________________________________________________________________________

export default function ValidationView() {
  const theme = useTheme();
  const Navigate = useNavigate();
  const token = getCookieValue('UID');

  const [nationalCode, setNationalCode] = useState('');
  const [captchaLogin, setCaptchaLogin] = useState('');
  const [codeNumber, setCodeNumber] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const [userName, setUserName] = useState('');
  const [britDate, setBritDate] = useState('');
  const [isLoadingCaptcha, setIsLoadingCaptcha] = useState(true);
  const [captchaData, setCaptchaData] = useState(null);
  const [secondForm, setSecondForm] = useState(false);
  const [thirdForm, setThirdForm] = useState(false);
  const [fourthForm, setFourthForm] = useState(false);
  const [firstForm, setFirstForm] = useState(true);
  const [profile, setProfile] = useState(null);

  // گرفتن اطلاعات کاربر برای بخش پروفایل

  const fetchProfile = async () => {
    try {
      const response = await axios.get(`${Onrun}/api/user/profile/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setProfile(response.data);
      console.log(profile);
    } catch (error) {
      if (error.response) {
        if (error.response.status === 401 || error.response.status === 500) {
          setCookieValue('UID');
          Navigate('/');
        } else {
          toast.error(error.response.data.message);
        }
      } else {
        toast.error('اینترنت خود را چک کنید');
      }
    }
  };

  useEffect(() => {
    if (token) {
      Navigate('/');
    } else {
      fetchProfile();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, Navigate]);

  // برای گرفتن کپچا در ورود
  const fetchCaptcha = async () => {
    setIsLoadingCaptcha(true);
    try {
      const response = await axios.get(`${Onrun}/api/captcha/`);
      setCaptchaData(response.data);
    } catch (error) {
      console.error(error.response.data.message);
    } finally {
      setIsLoadingCaptcha(false);
    }
  };
  useEffect(() => {
    fetchCaptcha();
  }, []);

  // بعد از وارد کردن شماره تلفن و کد کپچا کد تایید ارسال میشود
  const handleClick = async () => {
    try {
      const response = await axios.post(`${Onrun}/api/otp/`, {
        national_code: nationalCode,
        captcha: captchaLogin,
        encrypted_response: captchaData.encrypted_response,
      });
      if (response.data.registered === false) {
        setThirdForm(true);
        setSecondForm(false);
      } else {
        setSecondForm(true);
        setThirdForm(false);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  // پس از وارد کردن کد کپچا وارد صفحه و پنل خودش میشه
  const loginClick = async () => {
    try {
      const sendApiCode = await axios.post(`${Onrun}/api/login/`, {
        national_code: nationalCode,
        code: codeNumber,
      });
      setCookieValue('UID', sendApiCode.data.access);

      Navigate('/');
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const otpSignUpClick = () => {
    setFourthForm(true);
  };

  // برای زمانی است که کاربر شماره اش ثبت نیست و ثبت نام میکند و اطلاعات جدید را ارسال میکند
  const signupClick = async () => {
    try {
      const payload = {
        username: userName,
        name: firstName,
        last_name: lastName,
        national_code: nationalCode,
        mobile: mobileNumber,
        email: emailAddress,
        password: '123456',
        code: codeNumber,
        date_birth: null,
      };

      const response = await axios.post(`${Onrun}/api/signup/`, payload);
      setCookieValue('UID', response.data.access);
      setSecondForm(true);
      setThirdForm(false);
      fetchProfile();
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  // کوکی رو مدام چک میکنه که از بین نرفته باشه
  const checkUID = () => {
    const uid = getCookieValue('UID');
    console.log(uid);
  };
  useEffect(() => {
    checkUID();
  }, []);

  // برای گرفتن تاریخ تولد
  const handelDate = (value) => {
    const formattedDate = value.format('YYYY-MM-DD');
    setBritDate(formattedDate);
  };

  // برای ویرایش شماره تلفن کاربر در بخش ثبت نام و یا ورود
  const editNumber = () => {
    setSecondForm(false);
    setThirdForm(false);
    setFirstForm(true);
  };

  const handleSignUp = () => {
    setThirdForm(true);
  };

  const handelLogin = () => {
    setThirdForm(false);
    setFourthForm(false);
  };

  const renderForm = (
    <>
      {firstForm && !secondForm && !thirdForm && !fourthForm && (
        <LoginView
          handleSignUp={handleSignUp}
          loginClick={loginClick}
          fetchCaptcha={fetchCaptcha}
          handleClick={handleClick}
          captchaData={captchaData}
          isLoadingCaptcha={isLoadingCaptcha}
          captchaLogin={captchaLogin}
          setCaptchaLogin={setCaptchaLogin}
          setNationalCode={setNationalCode}
          nationalCode={nationalCode}
        />
      )}
      {secondForm && !thirdForm && !fourthForm && (
        <OtpLoginView
          mobileNumber={mobileNumber}
          setCodeNumber={setCodeNumber}
          editNumber={editNumber}
          loginClick={loginClick}
        />
      )}

      {thirdForm && !fourthForm && (
        <OtpSignUpView
          setCaptchaLogin={setCaptchaLogin}
          captchaData={captchaData}
          fetchCaptcha={fetchCaptcha}
          captchaLogin={captchaLogin}
          isLoadingCaptcha={isLoadingCaptcha}
          setMobileNumber={setMobileNumber}
          setCodeNumber={setCodeNumber}
          editNumber={editNumber}
          otpSignUpClick={otpSignUpClick}
        />
      )}

      {fourthForm && (
        <SignupView
          setUserName={setUserName}
          setEmailAddress={setEmailAddress}
          setMobileNumber={setMobileNumber}
          setLastName={setLastName}
          setFirstName={setFirstName}
          handelLogin={handelLogin}
          signupClick={signupClick}
          handelDate={handelDate}
          emailAddress={emailAddress}
          setCodeNumber={setCodeNumber}
          lastName={lastName}
          firstName={firstName}
          userName={userName}
          nationalCode={nationalCode}
          britDate={britDate}
        />
      )}
    </>
  );

  return (
    <Box
      sx={{
        ...bgGradient({
          color: alpha(theme.palette.background.default, 0.9),
          imgUrl: '/assets/background/overlay_4.jpg',
        }),
        height: 1,
      }}
    >
      {/* برای هدر های بالای بخش فرم هاست  */}
      <Stack alignItems="center" justifyContent="center" sx={{ height: 1 }}>
        <Card
          sx={{
            p: 5,
            width: 1,
            maxWidth: 420,
          }}
        >
          {!secondForm && !thirdForm && (
            <Divider sx={{ my: 3 }}>
              <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: '30px' }}>
                ورود
              </Typography>
            </Divider>
          )}
          {secondForm && !thirdForm && (
            <>
              <Typography variant="h3"> تایید شماره تلفن</Typography>
              <Divider sx={{ my: 3 }}>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  تایید شماره
                </Typography>
              </Divider>
            </>
          )}
          {thirdForm && (
            <Divider sx={{ my: 3 }}>
              <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: '30px' }}>
                ثبت نام
              </Typography>
            </Divider>
          )}

          {/* یک متغییره که تمام فرم ها و input های مربوط بهشون اینجا صدا زده میشه  */}
          {renderForm}
        </Card>
      </Stack>
    </Box>
  );
}
