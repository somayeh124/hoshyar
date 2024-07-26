// توابع برای تنظیم و دریافت مقدار کوکی با استفاده از کتابخانه js-cookie
import Cookies from 'js-cookie';

// تابع برای تنظیم مقدار کوکی
export const setCookieValue = (name, value, options = {}) => {
  Cookies.set(name, value, { path: '/', ...options });
};

// تابع برای دریافت مقدار کوکی
export const getCookieValue = (name) => {
  const cookieValue = Cookies.get(name);
  return cookieValue !== undefined ? cookieValue : null;
};
