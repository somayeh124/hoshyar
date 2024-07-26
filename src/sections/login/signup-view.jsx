import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import DatePicker from 'react-multi-date-picker';
import persian from 'react-date-object/calendars/persian';
import persian_fa from 'react-date-object/locales/persian_fa';

import { LoadingButton } from '@mui/lab';
import { Grid, Tooltip, TextField, Typography } from '@mui/material';

// _____________________________________________________________________________________________________________________

const SignupView = ({
  handelLogin,
  signupClick,
  setFirstName,
  setLastName,
  britDate,
  setEmailAddress,
  setUserName,
  nationalCode,
  userName,
  firstName,
  lastName,
  mobileNumber,
  setCodeNumber,
  emailAddress,
}) => (
  <>
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <TextField label="کدملی" value={nationalCode} name="nationalCode" fullWidth />
      </Grid>
      <Grid item xs={6}>
        <TextField
          name="username"
          label="نام کاربری"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          fullWidth
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          name="name"
          label="نام"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          fullWidth
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          name="last_name"
          label="نام خانوادگی"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          fullWidth
        />
      </Grid>
      <Grid item xs={6}>
        <Tooltip title="تاریخ تولد">
          <div>
            <DatePicker
              style={{
                height: '55px',
                borderRadius: '8px',
                fontSize: '12px',
                padding: '8px',
                textAlign: 'center',
                color: '#616161',
                width: '100%',
              }}
              name="dateBirth"
              calendar={persian}
              locale={persian_fa}
              calendarPosition="bottom-left"
              placeholder="تاریخ تولد"
              value={britDate}
            />
          </div>
        </Tooltip>
      </Grid>

      <Grid item xs={6} mb={2}>
        <TextField
          disabled
          name="mobileNumber"
          label="شماره موبایل"
          type="number"
          value={mobileNumber}
          fullWidth
        />
      </Grid>

      <Grid item xs={6}>
        <TextField
          name="Code"
          label="کد تایید"
          onChange={(e) => setCodeNumber(e.target.value)}
          fullWidth
        />
      </Grid>
    </Grid>

    <Grid item xs={12}>
      <TextField
        name="email"
        label="ایمیل"
        type="email"
        value={emailAddress}
        onChange={(e) => setEmailAddress(e.target.value)}
        fullWidth
      />
    </Grid>

    <div className="space-y-5" style={{ marginTop: '20px' }}>
      <LoadingButton
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        sx={{ backgroundColor: '#1976d2' }}
        onClick={signupClick}
      >
        ثبت‌نام
      </LoadingButton>
    </div>

    <div style={{ display: 'flex', marginTop: '30px', fontSize: '14px' }}>
      <Typography style={{ fontSize: '14px' }} marginRight={0.5}>
        حساب کاربری دارید؟
      </Typography>
      <Link
        fullWidth
        size="medium"
        type="submit"
        variant="contained"
        style={{ color: 'blue', textDecoration: 'underLine' }}
        onClick={handelLogin}
      >
        وارد شوید
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

SignupView.propTypes = {
  signupClick: PropTypes.func.isRequired,
  handelLogin: PropTypes.func.isRequired,
  setUserName: PropTypes.func.isRequired,
  setEmailAddress: PropTypes.func.isRequired,
  setLastName: PropTypes.func.isRequired,
  setFirstName: PropTypes.func.isRequired,
  emailAddress: PropTypes.string.isRequired,
  setCodeNumber: PropTypes.func.isRequired,
  mobileNumber: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  firstName: PropTypes.string.isRequired,
  userName: PropTypes.string.isRequired,
  nationalCode: PropTypes.string.isRequired,
  britDate: PropTypes.string.isRequired,
};

export default SignupView;
