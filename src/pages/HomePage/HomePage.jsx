import { authSignOutUser } from 'redux/auth/authOperation';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Notiflix from 'notiflix';
import Container from 'components/Container/Container';
import AppNavigation from 'components/AppNavigation/AppNavigation';
import authSelector from 'redux/auth/authSelector';
import {
  HeaderProfile,
  HeaderProfileTitle,
  LogoutWrapper,
  StyleBiLogOut,
  UserPhotoWrapper,
  IconContainer,
  StyleAiOutlineMinusCircle,
  StyleAiOutlinePlusCircle,
  NameUser,
  ImgUserAvatar,
  EmailUser,
} from './HomePage.styled';
import { useState } from 'react';

const HomePage = () => {
  const [clickIcon, setClickIcon] = useState(false);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const name = useSelector(authSelector.getName);
  const email = useSelector(authSelector.getEmail);
  const avatar = useSelector(authSelector.getAvatar);

  const toggleDownloadImg = () => {
    setClickIcon(prewShowImg => !prewShowImg);
  };

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
      <NameUser>{name}</NameUser>
      <UserPhotoWrapper>
        <ImgUserAvatar src={avatar} alt="userAvatar" />
        <IconContainer onClick={toggleDownloadImg}>
          {clickIcon ? (
            <StyleAiOutlinePlusCircle size={30} />
          ) : (
            <StyleAiOutlineMinusCircle size={30} />
          )}
        </IconContainer>
      </UserPhotoWrapper>
      <EmailUser>{email}</EmailUser>
      <AppNavigation />
    </Container>
  );
};

export default HomePage;
