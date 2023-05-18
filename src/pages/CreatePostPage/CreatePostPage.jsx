import AppNavigation from 'components/AppNavigation/AppNavigation';
import Container from 'components/Container/Container';
import {
  HeaderCreatePost,
  BtnBackCreatePostWrapper,
  HeaderCreatePostTitle,
} from './CreatePostPage.styled';

const CreatePostPage = () => {
  return (
    <>
      <Container>
        <HeaderCreatePost>
          <BtnBackCreatePostWrapper></BtnBackCreatePostWrapper>
          <HeaderCreatePostTitle>Create Post</HeaderCreatePostTitle>
        </HeaderCreatePost>
        <div>Привет здесь пока что ничего нет</div>
        <AppNavigation />
      </Container>
    </>
  );
};

export default CreatePostPage;
