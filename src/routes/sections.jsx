/* eslint-disable import/no-unresolved */
import { lazy, Suspense } from 'react';
import { Outlet, Navigate, useRoutes } from 'react-router-dom';

import DashboardLayout from 'src/layouts/dashboard';
// دسترسی به صفحات با استفاده از lazy loading برای بهبود کارایی بارگذاری

export const IndexPage = lazy(() => import('src/pages/app'));
export const BlogPage = lazy(() => import('src/pages/blog'));
export const ConsultantReservation = lazy(() =>
  import('src/sections/overview/ConsultantReservation')
);
export const ValidationPage = lazy(() => import('src/pages/validation'));
export const ProductsPage = lazy(() => import('src/pages/products'));
export const Page404 = lazy(() => import('src/pages/page-not-found'));
export const EditProfile = lazy(() => import('src/sections/overview/editProfile'));
export const TransactionHistory = lazy(() => import('src/sections/overview/transactionHistory'));

// ----------------------------------------------------------------------

export default function Router() {
  const routes = useRoutes([
    {
      element: (
        <DashboardLayout>
          <Suspense>
            <Outlet />
          </Suspense>
        </DashboardLayout>
      ),
      children: [
        { element: <IndexPage />, index: true }, // صفحه اصلی با index: true برای نمایش به عنوان صفحه اصلی
        { path: 'ConsultantReservation', element: <ConsultantReservation /> }, // صفحه رزرو مشاور
        { path: 'products', element: <ProductsPage /> }, // صفحه محصولات
        { path: 'blog', element: <BlogPage /> }, // صفحه بلاگ
        { path: 'edit', element: <EditProfile /> }, // صفحه ویرایش پروفایل
        { path: 'transactionHistory', element: <TransactionHistory /> }, // صفحه تاریخچه تراکنش‌ها
      ],
    },
    {
      path: 'login',
      element: <ValidationPage />,
    },
    {
      path: '404',
      element: <Page404 />,
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
