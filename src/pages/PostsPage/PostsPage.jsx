import Container from 'components/Container/Container';
import AppNavigation from 'components/AppNavigation/AppNavigation';
import {
  HeaderPosts,
  HeaderPostsTitle,
  LogoutWrapper,
  StyleBiLogOut,
} from './PostsPage.styled';

const PostsPage = () => {
  return (
    <>
      <Container>
        <HeaderPosts>
          <HeaderPostsTitle>Posts</HeaderPostsTitle>
          <LogoutWrapper>
            <StyleBiLogOut size={30} />
          </LogoutWrapper>
        </HeaderPosts>
        <div>Привет!туточки тоже пока ничего нет</div>
        <AppNavigation />
      </Container>
    </>
  );
};

export default PostsPage;
