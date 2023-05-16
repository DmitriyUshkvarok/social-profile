import { authSignOutUser } from 'redux/auth/authOperation';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Notiflix from 'notiflix';
import Container from 'components/Container/Container';
import AppNavigation from 'components/AppNavigation/AppNavigation';
import {
  HeaderProfile,
  HeaderProfileTitle,
  LogoutWrapper,
  StyleBiLogOut,
} from './HomePage.styled';

const HomePage = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const logOut = () => {
    Notiflix.Confirm.show(
      'Confirmation',
      'Are you sure you want to log out?',
      'Yes',
      'No',
      () => {
        dispatch(authSignOutUser());
        navigate('/Login');
      },
      () => {}
    );
  };

  return (
    <Container>
      <HeaderProfile>
        <HeaderProfileTitle>Profile</HeaderProfileTitle>
        <LogoutWrapper>
          <StyleBiLogOut size={30} onClick={logOut} />
        </LogoutWrapper>
      </HeaderProfile>
      <AppNavigation />
    </Container>
  );
};

export default HomePage;
