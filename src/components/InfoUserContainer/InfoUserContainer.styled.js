import styled from 'styled-components';

export const InfoUserBlock = styled.div`
  max-width: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;

export const PhotoUserContainer = styled.div`
  width: 90px;
  height: 90px;
  border-radius: 16px;
  background-color: transparent;
`;

export const InfoUserPhoto = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 16px;
`;

export const InfoTextUserWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

export const InfoUserName = styled.p`
  font-weight: 700;
  font-size: 13px;
  line-height: 1.15;
  color: aqua;
  text-shadow: 0px 0px 5px #ffffff;
`;

export const InfoUserEmail = styled.p`
  font-size: 11px;
  line-height: 1.15;
  color: rgba(23, 23, 23, 0.8);
  text-shadow: 0px 0px 5px #ffffff;
`;
