import {
  NoPostBlock,
  HeaderProfile,
  HeaderProfileTitle,
  LogoutWrapper,
  StyleBiLogOut,
  MainPostProfileWrapper,
  UserPhotoWrapper,
  InputFileChange,
  StyleAiOutlineMinusCircle,
  BtnUpdateAvatar,
  NameUser,
  ImgUserAvatar,
  EmailUser,
  ProfilPostList,
  ProfilListItem,
  ImgPostProfile,
  ProfilePostTitle,
  PanelPostList,
  PanelPostItem,
  StyleFaRegComment,
  CommentCount,
  StyleSlLike,
  CountLike,
  StyleCiLocationOn,
} from './HomePage.styled';
import { authSignOutUser } from 'redux/auth/authOperation';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import Notiflix from 'notiflix';
import Container from 'components/Container/Container';
import AppNavigation from 'components/AppNavigation/AppNavigation';
import authSelector from 'redux/auth/authSelector';
import { authSlice } from 'redux/auth/authReducers';
import { useState, useEffect } from 'react';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { storage, auth, firestore } from '../../firebase/config';
import {
  collection,
  query,
  getDocs,
  where,
  orderBy,
  doc,
  getDoc,
  updateDoc,
  onSnapshot,
} from 'firebase/firestore';
import { updateProfile } from 'firebase/auth';
import { toast } from 'react-toastify';

const HomePage = () => {
  const [posts, setPost] = useState([]);
  const [postLikes, setPostLikes] = useState({});
  const [commentCounts, setCommentCounts] = useState({});
  const [selectedAvatar, setSelectedAvatar] = useState(null);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const name = useSelector(authSelector.getName);
  const email = useSelector(authSelector.getEmail);
  const avatar = useSelector(authSelector.getAvatar);
  const userId = useSelector(authSelector.getUserId);

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

  useEffect(() => {
    const fetchPostById = async () => {
      const postCollectionIdRef = collection(firestore, 'userPost');
      const postQueryId = query(
        postCollectionIdRef,
        where('userId', '==', userId),
        orderBy('createdAt')
      );
      const snapshot = await getDocs(postQueryId);
      const fetchedPostId = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPost(fetchedPostId.reverse());
    };
    fetchPostById();
  }, [userId]);

  const handleAvatarChange = e => {
    const file = e.target.files[0];
    setSelectedAvatar(file);
  };

  const updateAvatar = async () => {
    try {
      if (selectedAvatar) {
        // Создаем ссылку для загрузки файла в Firebase Storage
        const storageRef = ref(storage, 'userAvatar/' + userId);

        // Загружаем файл в Storage
        await uploadBytes(storageRef, selectedAvatar);

        // Получаем URL загруженного файла
        const downloadURL = await getDownloadURL(storageRef);

        // Обновляем аватар пользователя в Firebase Authentication
        await updateProfile(auth.currentUser, {
          photoURL: downloadURL,
        });

        // Обновляем аватар пользователя в Redux Store
        dispatch(authSlice.actions.updateAvatar(downloadURL));

        // Сбрасываем выбранный аватар
        setSelectedAvatar(null);

        // Отображаем уведомление об успешном обновлении аватара
        toast.success('Avatar updated successfully.');
      }
    } catch (error) {
      console.log('Error updating avatar:', error);
      Notiflix.Notify.failure('Failed to update avatar. Please try again.');
    }
  };

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

      setPost(prevPosts =>
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
      <MainPostProfileWrapper>
        <NameUser>{name}</NameUser>
        <UserPhotoWrapper>
          <ImgUserAvatar src={avatar} alt="userAvatar" />
          <label htmlFor="inputFile">
            <StyleAiOutlineMinusCircle size={30} />
          </label>
          <InputFileChange
            type="file"
            accept="image/*"
            id="inputFile"
            onChange={handleAvatarChange}
          />
          <BtnUpdateAvatar onClick={updateAvatar}>Update Foto</BtnUpdateAvatar>
        </UserPhotoWrapper>
        <EmailUser>{email}</EmailUser>
        {posts.length === 0 ? (
          <NoPostBlock>No posts found.</NoPostBlock>
        ) : (
          <ProfilPostList>
            {posts.map(post => (
              <ProfilListItem key={post.id}>
                <ImgPostProfile src={post.imageURL} alt="Post" loading="lazy" />
                <ProfilePostTitle>{post.title}</ProfilePostTitle>
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
              </ProfilListItem>
            ))}
          </ProfilPostList>
        )}
        <AppNavigation />
      </MainPostProfileWrapper>
    </Container>
  );
};

export default HomePage;
