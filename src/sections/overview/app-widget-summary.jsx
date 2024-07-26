import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { fShortenNumber } from 'src/utils/format-number';

// ----------------------------------------------------------------------


// ویجت خلاصه برای نمایش عنوان، مقدار کلی و آیکون به صورت کارت
export default function AppWidgetSummary({ title, total, icon, color = 'primary', sx, ...other }) {
  return (
    <Card
      component={Stack}
      spacing={3}
      direction="row"
      sx={{
        px: 3,
        py: 5,
        borderRadius: 2,
        ...sx,
      }}
      {...other}
    >
      {icon && <Box sx={{ width: 64, height: 64 }}>{icon}</Box>}

      <Stack spacing={0.5}>
        <Typography variant="h4">{fShortenNumber(total)}</Typography>

        <Typography variant="subtitle2" sx={{ color: 'text.disabled' }}>
          {title}
        </Typography>
      </Stack>
    </Card>
  );
}

// تعریف نوع پراپ‌ها برای کامپوننت AppWidgetSummary
AppWidgetSummary.propTypes = {
  color: PropTypes.string, // رنگ کارت
  icon: PropTypes.oneOfType([PropTypes.element, PropTypes.string]), // آیکون یا عنصر نمایشی
  sx: PropTypes.object, // شی استایلینگ
  title: PropTypes.string, // عنوان
  total: PropTypes.number, // مقدار کلی
};