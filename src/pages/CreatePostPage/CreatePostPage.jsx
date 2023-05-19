import AppNavigation from 'components/AppNavigation/AppNavigation';
import Container from 'components/Container/Container';
import { useNavigate } from 'react-router-dom';
import { Formik } from 'formik';
import { useState } from 'react';
import { storage } from '../../firebase/config';
import { ref, getDownloadURL, uploadBytes } from 'firebase/storage';
import {
  MainLoader,
  HeaderCreatePost,
  BtnBackCreatePostWrapper,
  StyleHiArrowLeftCircle,
  HeaderCreatePostTitle,
  StyleFormCreatePost,
  CustomFileInput,
  ImagePostContainer,
  ImgPost,
  StyleInputFileCreatePost,
  StyleMdAddAPhoto,
  TextLabel,
  LabelInputTitle,
  StyleInputTitle,
  TextTitle,
  ButtonSendPost,
  ButtonClearWrapper,
  StyleFaTrashAlt,
  NavigationWrapper,
} from './CreatePostPage.styled';

const initialValues = {
  userPost: null,
  postTitle: '',
};

const CreatePostPage = () => {
  const [loading, setLoading] = useState(false);
  const [uploadedImage, setUploadedImage] = useState(null);

  const navigate = useNavigate();

  const handleClickBack = () => {
    navigate(-1);
  };

  const handleFileChange = async e => {
    try {
      setLoading(true);
      setUploadedImage(null);

      const file = e.target.files[0];
      const storageRef = ref(storage, `userPost/${file.name}`);

      await uploadBytes(storageRef, file);

      const downloadURL = await getDownloadURL(storageRef);

      setUploadedImage(downloadURL);
    } catch (error) {
      console.log('Ошибка при загрузке файла:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeletePhoto = () => {
    const inputElement = document.getElementById('postImg');
    inputElement.value = '';
    setUploadedImage(null);
  };

  return (
    <>
      <Container>
        <HeaderCreatePost>
          <BtnBackCreatePostWrapper onClick={handleClickBack}>
            <StyleHiArrowLeftCircle size={30} />
          </BtnBackCreatePostWrapper>
          <HeaderCreatePostTitle>Create Post</HeaderCreatePostTitle>
        </HeaderCreatePost>
        <Formik initialValues={initialValues}>
          <StyleFormCreatePost>
            <CustomFileInput htmlFor="postImg">
              {uploadedImage && (
                <ImagePostContainer>
                  <ImgPost src={uploadedImage} alt="Uploaded Avatar" />
                </ImagePostContainer>
              )}
              {loading && <MainLoader size={200} fill="gold" />}
              <StyleInputFileCreatePost
                type="file"
                name="postImg"
                id="postImg"
                onChange={handleFileChange}
                style={{ display: 'none' }}
                disabled={!!uploadedImage}
              />
              {!loading && !uploadedImage && <StyleMdAddAPhoto size={100} />}
            </CustomFileInput>
            <TextLabel
              onClick={handleDeletePhoto}
              style={{
                cursor: uploadedImage ? 'pointer' : 'default',
                color: uploadedImage ? 'red' : 'green',
              }}
            >
              {uploadedImage ? 'Edit Photo' : 'Download Photo'}
            </TextLabel>
            <LabelInputTitle htmlFor="inputTitle">
              <TextTitle>title...</TextTitle>
              <StyleInputTitle type="text" name="postTitle" id="inputTitle" />
            </LabelInputTitle>
            <ButtonSendPost
              type="submit"
              style={{
                backgroundColor: uploadedImage ? 'gold' : 'gray',
                color: uploadedImage ? 'green' : 'white',
              }}
            >
              Publish
            </ButtonSendPost>
          </StyleFormCreatePost>
        </Formik>
        <ButtonClearWrapper>
          <StyleFaTrashAlt size={30} color={uploadedImage ? 'gold' : 'gray'} />
        </ButtonClearWrapper>
        <NavigationWrapper>
          <AppNavigation />
        </NavigationWrapper>
      </Container>
    </>
  );
};

export default CreatePostPage;
