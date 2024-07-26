import { Helmet } from 'react-helmet-async';

import { ValidationView } from 'src/sections/login/view';

// ----------------------------------------------------------------------

export default function ValidationPage() {
  return (
    <>
      <Helmet>
        <title > صفحه ورود|مشاوره بورس هوشیار</title>
      </Helmet>

      <ValidationView />
    </>
  );
}
