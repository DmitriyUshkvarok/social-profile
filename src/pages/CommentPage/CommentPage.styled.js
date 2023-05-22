import styled from 'styled-components';
import { HiArrowLeftCircle } from 'react-icons/hi2';
import { TfiCommentsSmiley } from 'react-icons/tfi';

export const HeaderCommentPost = styled.div`
  position: fixed;
  top: 10px;
  left: 10px;
  right: 10px;
  z-index: 20;
  display: flex;
  align-items: center;
  margin-left: auto;
  margin-right: auto;
  padding-top: 15px;
  padding-bottom: 15px;
  box-shadow: 0px 0px 30px 10px rgba(10, 216, 244, 0.2);
`;

export const HeaderCommentPostTitle = styled.h3`
  width: 100px;
  margin-left: auto;
  margin-right: auto;
  text-align: center;
  text-transform: uppercase;
  text-shadow: 0px 0px 20px #28a745;
  color: #28a745;
  letter-spacing: 2px;
`;

export const BtnBackCommentPostWrapper = styled.div`
  margin-right: 10px;
  cursor: pointer;
`;

export const StyleHiArrowLeftCircle = styled(HiArrowLeftCircle)`
  margin-left: 10px;
  fill: gold;
  transition: fill 0.4s;

  &:hover {
    fill: aqua;
  }
`;

export const CommentPostInfo = styled.div`
  margin-top: 90px;
  width: 100%;
  max-width: 600px;
  max-height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin-left: auto;
  margin-right: auto;
`;

export const CommentPostImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  margin-bottom: 10px;
  border-radius: 5px;
`;

export const CommentPostTitle = styled.h3`
  font-weight: 500;
  font-size: 35px;
  line-height: 1.16;
  letter-spacing: 0.01em;
  color: green;
  text-shadow: 1px 1px 10px orange;
`;

export const CommentFormWrapper = styled.div`
  position: fixed;
  margin-left: auto;
  margin-right: auto;
  bottom: 10px;
  left: 10px;
  right: 10px;
  z-index: 5;
  background-color: rgba(0, 128, 0, 0.4);
  box-shadow: 0px 0px 30px 10px rgba(10, 216, 244, 0.6);
`;

export const FedbackComment = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 800px;
  height: 60px;
  margin-left: auto;
  margin-right: auto;
  padding: 10px;
`;

export const CommentInput = styled.input`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  margin-left: auto;
  margin-right: auto;
  padding: 5px;
  padding-right: 50px;
  color: gold;
  font-size: 18px;
  background-color: transparent;
  box-shadow: 0px 0px 30px 10px rgba(10, 216, 244, 0.7);
  border: none;
  border-radius: 10px;

  &:focus {
    outline: none;
  }
`;

export const StyleTfiCommentsSmiley = styled(TfiCommentsSmiley)`
  fill: gold;
`;

export const CommentButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30px;
  height: 30px;
  position: absolute;
  right: 30px;
  background-color: green;
  border: 1px solid gold;
  border-radius: 50%;
  cursor: pointer;
  transition: 0.4s;

  &:hover {
    background-color: aqua;
    border-color: green;

    > ${StyleTfiCommentsSmiley} {
      fill: green;
    }
  }
`;
