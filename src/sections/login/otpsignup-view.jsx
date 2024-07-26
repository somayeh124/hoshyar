import React from 'react';
import PropTypes from 'prop-types';

import { Stack } from '@mui/system';
import { Button, Skeleton, TextField } from '@mui/material';

// __________________________________________________________________________________________________________

const OtpSignUpView = ({
  otpSignUpClick,
  isLoadingCaptcha,
  setMobileNumber,
  captchaData,
  fetchCaptcha,
  captchaLogin,
  setCaptchaLogin,
}) => (
  <>
    <Stack spacing={3}>
      <TextField label="شماره موبایل" onChange={(e) => setMobileNumber(e.target.value)}  name="mobileNumber" />

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

    <div className="space-y-5" style={{ marginTop: '20px' }}>
      <Button
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        sx={{ backgroundColor: '#1976d2' }}
        onClick={otpSignUpClick}
      >
        ورود
      </Button>
    </div>
  </>
);

OtpSignUpView.propTypes = {
  otpSignUpClick: PropTypes.func.isRequired,
  isLoadingCaptcha: PropTypes.bool.isRequired,
  setMobileNumber: PropTypes.func.isRequired,
  fetchCaptcha: PropTypes.func.isRequired,
  captchaData: PropTypes.object.isRequired,
  captchaLogin: PropTypes.func.isRequired,
  setCaptchaLogin: PropTypes.func.isRequired,
};

export default OtpSignUpView;
