import { lazy, Suspense, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import { authStateChangeUser } from 'redux/auth/authOperation';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import authSelector from 'redux/auth/authSelector';

const RegistrationPage = lazy(() =>
  import('../../pages/RegistrationPage/RegistrationPage')
);
const LoginPage = lazy(() => import('../../pages/LoginPage/LoginPage'));

const HomePage = lazy(() => import('../../pages/HomePage/HomePage'));

const App = () => {
  const dispatch = useDispatch();

  const isLoggedIn = useSelector(authSelector.getIsLoggedIn);

  useEffect(() => {
    dispatch(authStateChangeUser());
  }, [dispatch]);

  return (
    <>
      <ToastContainer />
      <Suspense>
        <Routes>
          <Route
            path="/"
            element={isLoggedIn ? <HomePage /> : <RegistrationPage />}
          />
          <Route path="Registration" element={<RegistrationPage />} />
          <Route path="Login" element={<LoginPage />} />
          <Route path="Home" element={<HomePage />} />
          <Route path="*" element={<RegistrationPage />} />
        </Routes>
      </Suspense>
    </>
  );
};

export default App;
