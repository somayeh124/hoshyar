import React from 'react';
import PropTypes from 'prop-types';

import { Stack } from '@mui/system';
import { LoadingButton } from '@mui/lab';
import { Button, TextField } from '@mui/material';

// ________________________________________________________________________________________________________________________

const OtpLoginView = ({ loginClick, editNumber, setCodeNumber, nationalCode }) => (
  <>
    <Stack spacing={3}>
      <TextField value={nationalCode} disabled name="nationalCode" />

      <TextField
        name="Code"
        label="کد تایید"
        onChange={(e) => setCodeNumber(e.target.value)}
        fullWidth
      />
    </Stack>

    <div className="space-y-5" style={{ marginTop: '20px' }}>
      <LoadingButton
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        sx={{ backgroundColor: '#1976d2' }}
        onClick={editNumber}
      >
        ویرایش کدملی
      </LoadingButton>
      <Button
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        sx={{ backgroundColor: '#1976d2' }}
        onClick={loginClick}
      >
        ورود
      </Button>
    </div>
  </>
);

OtpLoginView.propTypes = {
  loginClick: PropTypes.func.isRequired,
  setCodeNumber: PropTypes.func.isRequired,
  editNumber: PropTypes.func.isRequired,
  nationalCode: PropTypes.array.isRequired,
};

export default OtpLoginView;
