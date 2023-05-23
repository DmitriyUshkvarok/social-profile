import Container from 'components/Container/Container';
import AppNavigation from 'components/AppNavigation/AppNavigation';
import InfoUserContainer from 'components/InfoUserContainer/InfoUserContainer';
import { authSignOutUser } from 'redux/auth/authOperation';
import { useDispatch, useSelector } from 'react-redux';
import authSelector from 'redux/auth/authSelector';
import { Link } from 'react-router-dom';
import {
  NoPostBlock,
  HeaderPosts,
  HeaderPostsTitle,
  LogoutWrapper,
  StyleBiLogOut,
  MainPostWrapper,
  InfoUserWrapp,
  PostListWrapper,
  PostList,
  PostListItem,
  PostListPhoto,
  PostTitle,
  PanelPostList,
  CommentCount,
  PanelPostItem,
  StyleFaRegComment,
  StyleSlLike,
  StyleCiLocationOn,
} from './PostsPage.styled';
import Notiflix from 'notiflix';
import { useEffect, useState } from 'react';
import { collection, query, getDocs, orderBy } from 'firebase/firestore';
import { firestore } from '../../firebase/config';
import { useNavigate } from 'react-router-dom';

const PostsPage = () => {
  const [posts, setPosts] = useState([]);

  const dispatch = useDispatch();

  const commentCount = useSelector(authSelector.getcommentCount);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      const postsCollectionRef = collection(firestore, 'userPost');
      const postsQuery = query(postsCollectionRef, orderBy('createdAt'));
      const snapshot = await getDocs(postsQuery);
      const fetchedPosts = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPosts(fetchedPosts.reverse());
    };

    fetchPosts();
  }, []);

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
    <>
      <Container>
        <HeaderPosts>
          <HeaderPostsTitle>Posts</HeaderPostsTitle>
          <LogoutWrapper onClick={logOut}>
            <StyleBiLogOut size={30} />
          </LogoutWrapper>
        </HeaderPosts>
        <MainPostWrapper>
          <InfoUserWrapp>
            <InfoUserContainer />
          </InfoUserWrapp>
          <PostListWrapper>
            {posts.length === 0 ? (
              <NoPostBlock>No posts found.</NoPostBlock>
            ) : (
              <PostList>
                {posts.map(post => (
                  <PostListItem key={post.id}>
                    <PostListPhoto
                      src={post.imageURL}
                      alt="Post"
                      loading="lazy"
                    />
                    <PostTitle>{post.title}</PostTitle>
                    <PanelPostList>
                      <PanelPostItem>
                        <Link to={`/comments/${post.id}`}>
                          {commentCount[post.id] > 0 ? (
                            <StyleFaRegComment size={30} color="gold" />
                          ) : (
                            <StyleFaRegComment
                              size={30}
                              style={{
                                stroke: 'gold',
                                strokeWidth: '20px',
                                fill: 'transparent',
                              }}
                            />
                          )}
                          <CommentCount>{commentCount[post.id]}</CommentCount>
                        </Link>
                      </PanelPostItem>
                      <PanelPostItem>
                        <StyleSlLike size={30} color="#212121" />
                      </PanelPostItem>
                      <PanelPostItem>
                        <StyleCiLocationOn size={30} color="#212121" />
                      </PanelPostItem>
                    </PanelPostList>
                  </PostListItem>
                ))}
              </PostList>
            )}
          </PostListWrapper>
        </MainPostWrapper>
        <AppNavigation />
      </Container>
    </>
  );
};

export default PostsPage;
