import { useState } from 'react';
import { Formik } from 'formik';
import { Link } from 'react-router-dom';
import { BsEye, BsEyeSlash } from 'react-icons/bs';
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
  name: '',
  email: '',
  password: '',
};

const schema = yup.object().shape({
  name: yup.string().min(4).max(20).required(),
  email: yup.string().required(),
  password: yup.string().min(10).max(20).required(),
});

const FormRegistration = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [dowmloadImg, setDownloadImg] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(prewShowPassword => !prewShowPassword);
  };

  const toggleDownloadImg = () => {
    setDownloadImg(prewShowImg => !prewShowImg);
  };

  const handleSubmit = (values, { resetForm }) => {
    resetForm();
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
          </RegistrationImgContainer>
          <RegistrationTitle>Registration</RegistrationTitle>
          <FeedbackFormGroup>
            <StyleInputRegistration
              type="text"
              name="name"
              placeholder="name"
            ></StyleInputRegistration>
            <StyleErrorMessage name="name">
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
