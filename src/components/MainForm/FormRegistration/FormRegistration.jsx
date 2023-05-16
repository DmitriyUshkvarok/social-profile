import { useState, useRef } from 'react';
import { Formik } from 'formik';
import { Link } from 'react-router-dom';
import { BsEye, BsEyeSlash } from 'react-icons/bs';
import { authSignUpUser } from 'redux/auth/authOperation';
import { useDispatch } from 'react-redux';
import { authSlice } from 'redux/auth/authReducers';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import {
  StyleFormRegistration,
  RegistrationImgContainer,
  IconContainer,
  StyleAiOutlinePlusCircle,
  StyleAiOutlineMinusCircle,
  RegistrationTitle,
  FeedbackFormGroup,
  StyleInputRegistration,
  StyleErrorMessage,
  Error,
  PasswordWrapper,
  ToggleShowPasword,
  Btnwrapper,
  BtnRegistration,
  LinkOnPageLogIn,
} from './FormRegistration.styled';

const initialValues = {
  login: '',
  email: '',
  password: '',
};

const schema = yup.object().shape({
  login: yup.string().min(4).max(20).required(),
  email: yup.string().required(),
  password: yup.string().min(10).max(20).required(),
});

const FormRegistration = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [dowmloadImg, setDownloadImg] = useState(false);

  const navigate = useNavigate();

  const fileInputRef = useRef(null);

  const dispatch = useDispatch();

  const toggleShowPassword = () => {
    setShowPassword(prewShowPassword => !prewShowPassword);
  };

  const toggleDownloadImg = () => {
    fileInputRef.current.click();
    setDownloadImg(prewShowImg => !prewShowImg);
  };

  const handleSubmit = async (values, { resetForm }) => {
    try {
      await dispatch(authSignUpUser(values));
      navigate('/Home');
      resetForm();
    } catch (error) {
      console.log('Sign-in error:', error);
    }
  };

  const handleImageChange = e => {
    const file = e.target.files[0];
    // Выполните дополнительную обработку загруженного файла, если необходимо
    // Например, можно использовать FileReader для предварительного просмотра изображения

    // Обновите глобальное состояние userAvatar с данными файла
    dispatch(authSlice.actions.updateUserProfile({ userAvatar: file }));
    setDownloadImg(true);
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={schema}
        onSubmit={handleSubmit}
      >
        <StyleFormRegistration>
          <RegistrationImgContainer>
            <IconContainer onClick={toggleDownloadImg}>
              {dowmloadImg ? (
                <StyleAiOutlineMinusCircle size={30} />
              ) : (
                <StyleAiOutlinePlusCircle size={30} />
              )}
            </IconContainer>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              style={{ display: 'none' }}
              ref={fileInputRef}
            />
          </RegistrationImgContainer>
          <RegistrationTitle>Registration</RegistrationTitle>
          <FeedbackFormGroup>
            <StyleInputRegistration
              type="text"
              name="login"
              placeholder="name"
            ></StyleInputRegistration>
            <StyleErrorMessage name="login">
              {msg => <Error>{msg}</Error>}
            </StyleErrorMessage>
          </FeedbackFormGroup>
          <FeedbackFormGroup>
            <StyleInputRegistration
              type="email"
              name="email"
              placeholder="email"
            />
            <StyleErrorMessage name="email">
              {msg => <Error>{msg}</Error>}
            </StyleErrorMessage>
          </FeedbackFormGroup>
          <FeedbackFormGroup>
            <PasswordWrapper>
              <StyleInputRegistration
                type={showPassword ? 'text' : 'password'}
                name="password"
                placeholder="password"
              />
              <ToggleShowPasword onClick={toggleShowPassword}>
                {showPassword ? <BsEyeSlash /> : <BsEye />}
              </ToggleShowPasword>
            </PasswordWrapper>
            <StyleErrorMessage name="password">
              {msg => <Error>{msg}</Error>}
            </StyleErrorMessage>
          </FeedbackFormGroup>
          <Btnwrapper>
            <BtnRegistration type="submit">Registration</BtnRegistration>
          </Btnwrapper>
          <Link to="/Login">
            <LinkOnPageLogIn>Already have an account? Sign in</LinkOnPageLogIn>
          </Link>
        </StyleFormRegistration>
      </Formik>
    </>
  );
};

export default FormRegistration;
