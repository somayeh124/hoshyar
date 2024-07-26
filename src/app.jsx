import './global.css'; // استایل‌های سراسری برای اپلیکیشن
import { useScrollToTop } from 'src/hooks/use-scroll-to-top'; // استفاده از هوک برای اسکرول به بالا
import Router from 'src/routes/sections'; // مسیردهی و روتر برای مدیریت صفحات
import ThemeProvider from 'src/theme'; // فراهم‌کننده تم برای اپلیکیشن
import rtlPlugin from 'stylis-plugin-rtl'; // پلاگین RTL برای استایل‌ها
import { CacheProvider } from '@emotion/react'; // فراهم‌کننده کش برای Emotion
import createCache from '@emotion/cache'; // ایجاد کش برای Emotion
import { prefixer } from 'stylis'; // پیش‌پردازنده استایل‌ها
import 'react-toastify/dist/ReactToastify.css';

// ----------------------------------------------------------------------

export default function App() {
  useScrollToTop(); // استفاده از هوک برای اسکرول به بالا در هر بار بارگذاری صفحه
  const cacheRtl = createCache({
    key: 'muirtl',
    stylisPlugins: [prefixer, rtlPlugin], // استفاده از پیش‌پردازنده و پلاگین RTL برای استایل‌ها
  });

  return (
    <CacheProvider value={cacheRtl}>
      <ThemeProvider>
        <Router />
      </ThemeProvider>
    </CacheProvider>
  );
}
