import styled from 'styled-components';
import { BiLogOut } from 'react-icons/bi';

export const HeaderPosts = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  margin-top: 10px;
  padding-top: 15px;
  padding-bottom: 15px;
  box-shadow: 0px 0px 30px 10px rgba(10, 216, 244, 0.2);
`;

export const HeaderPostsTitle = styled.h3`
  width: 100px;
  margin-left: auto;
  margin-right: auto;
  text-align: center;
  text-transform: uppercase;
  text-shadow: 0px 0px 20px #28a745;
  color: #28a745;
  letter-spacing: 2px;
`;

export const LogoutWrapper = styled.div`
  margin-right: 10px;
  cursor: pointer;
`;

export const StyleBiLogOut = styled(BiLogOut)`
  fill: #28a745;
  transition: 0.4s;

  &:hover {
    fill: #ff4c00;
  }
`;
