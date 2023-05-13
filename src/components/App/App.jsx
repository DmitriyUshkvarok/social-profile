import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';

const RegistrationPage = lazy(() =>
  import('../../pages/RegistrationPage/RegistrationPage')
);
const LoginPage = lazy(() => import('../../pages/LoginPage/LoginPage'));

const App = () => {
  return (
    <>
      <Suspense>
        <Routes>
          <Route path="/" element={<RegistrationPage />} />
          <Route path="Registration" element={<RegistrationPage />} />
          <Route path="Login" element={<LoginPage />} />
          <Route path="*" element={<RegistrationPage />} />
        </Routes>
      </Suspense>
    </>
  );
};

export default App;
