import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { Button, Skeleton } from '@mui/material';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';

// ___________________________________________________________________________________________________________________________________________

const LoginView = ({ handleClick, fetchCaptcha, handleSignUp, captchaData, isLoadingCaptcha,nationalCode,setNationalCode,setCaptchaLogin,captchaLogin }) => (
    <>
      <Stack spacing={3}>
        <TextField
          name="mobile"
          label="کدملی"
          value={nationalCode}
          onChange={(e) => setNationalCode(e.target.value)}
        />
        <TextField
          style={{ marginBottom: '20px' }}
          name="captcha"
          label="کپچا"
          value={captchaLogin}
          onChange={(e) => setCaptchaLogin(e.target.value)}
        />
      </Stack>

      {isLoadingCaptcha ? (
        <Skeleton variant="rounded" width={330} height={60} />
      ) : (
        <Stack spacing={3}>
          <Button onClick={fetchCaptcha}>
            <img src={`data:image/png;base64,${captchaData?.image}`} alt="captcha" />
          </Button>
        </Stack>
      )}

      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <LoadingButton
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          sx={{ backgroundColor: '#1976d2' }}
          onClick={handleClick}
        >
          تایید
        </LoadingButton>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </div>

      <div style={{ display: 'flex', marginTop: '30px', fontSize: '14px' }}>
        <Typography style={{ fontSize: '14px' }} marginRight={0.5}>
          حساب کاربری ندارید؟
        </Typography>
        <Link
          fullWidth
          size="medium"
          type="submit"
          variant="contained"
          style={{ color: 'blue', textDecoration: 'underLine' }}
          onClick={handleSignUp}
        >
          ثبت نام کنید
        </Link>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </div>
    </>
  );

LoginView.propTypes = {
  fetchCaptcha: PropTypes.func.isRequired,
  handleClick: PropTypes.func.isRequired,
  handleSignUp: PropTypes.func.isRequired,
  captchaData: PropTypes.object.isRequired,
  isLoadingCaptcha: PropTypes.bool.isRequired,
  captchaLogin:PropTypes.string.isRequired,
  setCaptchaLogin:PropTypes.func.isRequired,
  setNationalCode:PropTypes.func.isRequired,
  nationalCode:PropTypes.string.isRequired,
};

export default LoginView;
