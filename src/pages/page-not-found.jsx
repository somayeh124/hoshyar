import { Helmet } from 'react-helmet-async';

import { NotFoundView } from 'src/sections/error';

// ----------------------------------------------------------------------

export default function NotFoundPage() {
  return (
    <>
      <Helmet>
        <title> 404 صفحه وجود ندارد </title>
      </Helmet>

      <NotFoundView />
    </>
  );
}
