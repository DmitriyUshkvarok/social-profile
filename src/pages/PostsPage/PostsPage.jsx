import Container from 'components/Container/Container';
import AppNavigation from 'components/AppNavigation/AppNavigation';
import InfoUserContainer from 'components/InfoUserContainer/InfoUserContainer';
import { authSignOutUser } from 'redux/auth/authOperation';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  NoPostBlock,
  HeaderPosts,
  HeaderPostsTitle,
  LogoutWrapper,
  StyleBiLogOut,
  MainPostWrapper,
  InfoUserWrapp,
  InfoUserPost,
  InfoUserAvatar,
  InfoUserName,
  PostListWrapper,
  PostList,
  PostListItem,
  PostListPhoto,
  PostTitle,
  PanelPostList,
  CommentCount,
  CountLike,
  PanelPostItem,
  StyleFaRegComment,
  StyleSlLike,
  StyleCiLocationOn,
} from './PostsPage.styled';
import Notiflix from 'notiflix';
import { useEffect, useState } from 'react';
import {
  collection,
  query,
  getDocs,
  orderBy,
  doc,
  updateDoc,
  getDoc,
  onSnapshot,
} from 'firebase/firestore';
import { firestore, auth } from '../../firebase/config';
import { useNavigate } from 'react-router-dom';

const PostsPage = () => {
  const [posts, setPosts] = useState([]);
  const [postLikes, setPostLikes] = useState({});
  const [commentCounts, setCommentCounts] = useState({});

  const dispatch = useDispatch();

  const navigate = useNavigate();

  useEffect(() => {
    const fetchCommentCounts = async () => {
      const commentCountsMap = {};

      for (const post of posts) {
        const postRef = doc(firestore, 'userPost', post.id);
        const commentsCollectionRef = collection(postRef, 'comments');
        const commentsQuery = query(commentsCollectionRef);
        const snapshot = await getDocs(commentsQuery);
        const commentCount = snapshot.size;
        commentCountsMap[post.id] = commentCount;
      }
      setCommentCounts(commentCountsMap);
    };

    fetchCommentCounts();
  }, [posts]);

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

  const handleLike = async postId => {
    try {
      const userId = auth.currentUser.uid;
      const postRef = doc(firestore, 'userPost', postId);
      const postSnapshot = await getDoc(postRef);
      const postData = postSnapshot.data();
      const currentLikes = postData.likes || 0;
      const likedByUser = postData.likedByUser && postData.likedByUser[userId];

      const isLiked = likedByUser === true;

      let updatedLikes;
      let updatedLikedByUser;

      if (isLiked) {
        updatedLikes = currentLikes - 1;
        updatedLikedByUser = { ...postData.likedByUser };
        delete updatedLikedByUser[userId];
      } else {
        updatedLikes = currentLikes + 1;
        updatedLikedByUser = { ...postData.likedByUser, [userId]: true };
      }

      const updateData = {
        likes: updatedLikes,
        likedByUser: updatedLikedByUser,
      };

      await updateDoc(postRef, updateData);

      setPosts(prevPosts =>
        prevPosts.map(post => {
          if (post.id === postId) {
            return {
              ...post,
              likes: updatedLikes,
              likedByUser: updatedLikedByUser,
            };
          }
          return post;
        })
      );
    } catch (error) {
      console.log('Ошибка при обновлении лайка:', error);
    }
  };

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(firestore, 'userPost'),
      snapshot => {
        const updatedPostLikes = {};

        snapshot.forEach(doc => {
          const postId = doc.id;
          const postLikesData = doc.data().likedByUser || {};
          updatedPostLikes[postId] = postLikesData;
        });

        setPostLikes(updatedPostLikes);
      }
    );

    return () => {
      unsubscribe();
    };
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
                    <InfoUserPost>
                      <InfoUserAvatar src={post.userAvatar} alt="userAvatar" />
                      <InfoUserName>{post.login}</InfoUserName>
                    </InfoUserPost>
                    <PostListPhoto
                      src={post.imageURL}
                      alt="Post"
                      loading="lazy"
                    />
                    <PostTitle>{post.title}</PostTitle>
                    <PanelPostList>
                      <PanelPostItem>
                        <Link to={`/comments/${post.id}`}>
                          <StyleFaRegComment size={30} color="aqua" />
                          <CommentCount>{commentCounts[post.id]}</CommentCount>
                        </Link>
                      </PanelPostItem>
                      <PanelPostItem>
                        <StyleSlLike
                          size={30}
                          color={postLikes[post.id] ? 'aqua' : 'gold'}
                          onClick={() => handleLike(post.id, post.userId)}
                        />
                        <CountLike>
                          {postLikes[post.id] ? post.likes : postLikes[post.id]}
                        </CountLike>
                      </PanelPostItem>
                      <PanelPostItem>
                        <StyleCiLocationOn size={30} color="aqua" />
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
