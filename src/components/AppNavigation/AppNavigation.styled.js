import styled from 'styled-components';
import { TfiLayoutGrid3 } from 'react-icons/tfi';
import { CgProfile } from 'react-icons/cg';
import { AiOutlinePlus } from 'react-icons/ai';
import { Link } from 'react-router-dom';

export const StyleNavigation = styled.nav`
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
export const NavigationList = styled.ul`
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding-top: 15px;
  padding-bottom: 15px;
`;

export const NavigatiomItem = styled.li`
  position: relative;
  border: 1px solid gold;
  padding: 3px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  transition: border-color 0.4s;
  cursor: pointer;

  &:hover {
    border-color: #ff4c00;
  }
`;

export const StyleNavigationLink = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  color: gold;
  width: 100%;
  transition: background-color 0.4s;

  &:active {
    background-color: aqua;
  }

  &:focus {
    background-color: orange;
    fill: aqua;
    outline: none;
  }
`;

export const StyleCgProfile = styled(CgProfile)`
  fill: currentColor;
  transition: 0.4s;

  &:hover {
    color: #ff4c00;
  }
`;

export const StyleAiOutlinePlus = styled(AiOutlinePlus)`
  fill: currentColor;
  transition: 0.4s;

  &:hover {
    fill: #ff4c00;
  }
`;

export const StyleTfiLayoutGrid3 = styled(TfiLayoutGrid3)`
  fill: currentColor;
  transition: 0.4s;

  &:hover {
    fill: #ff4c00;
  }
`;
