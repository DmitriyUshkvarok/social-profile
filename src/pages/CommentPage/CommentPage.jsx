import Container from 'components/Container/Container';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { collection, query, getDocs } from 'firebase/firestore';
import { firestore } from '../../firebase/config';
import {
  HeaderCommentPost,
  BtnBackCommentPostWrapper,
  StyleHiArrowLeftCircle,
  HeaderCommentPostTitle,
  CommentPostInfo,
  CommentPostImg,
  CommentPostTitle,
  CommentFormWrapper,
  FedbackComment,
  CommentInput,
  CommentButton,
  StyleTfiCommentsSmiley,
} from './CommentPage.styled';

const CommentPage = () => {
  const [posts, setPosts] = useState([]);

  const { id } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      const postsCollectionRef = collection(firestore, 'userPost');
      const postsQuery = query(postsCollectionRef);
      const snapshot = await getDocs(postsQuery);
      const fetchedPosts = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPosts(fetchedPosts);
    };

    fetchPosts();
  }, []);

  const handleClickBack = () => {
    navigate(-1);
  };

  const post = posts.find(post => post.id === id);
  return (
    <>
      <Container>
        <HeaderCommentPost>
          <BtnBackCommentPostWrapper onClick={handleClickBack}>
            <StyleHiArrowLeftCircle size={30} />
          </BtnBackCommentPostWrapper>
          <HeaderCommentPostTitle>Comments</HeaderCommentPostTitle>
        </HeaderCommentPost>
        <CommentPostInfo>
          {post && <CommentPostImg src={post.imageURL} alt="postImg" />}
          {post && <CommentPostTitle>{post.title}</CommentPostTitle>}
        </CommentPostInfo>

        <CommentFormWrapper>
          <FedbackComment>
            <CommentInput type="text" />
            <CommentButton type="submit">
              <StyleTfiCommentsSmiley />
            </CommentButton>
          </FedbackComment>
        </CommentFormWrapper>
      </Container>
    </>
  );
};

export default CommentPage;
