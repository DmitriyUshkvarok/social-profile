import Container from 'components/Container/Container';
import {
  StyleNavigation,
  NavigationList,
  NavigatiomItem,
  StyleCgProfile,
  StyleAiOutlinePlus,
  StyleTfiLayoutGrid3,
} from './AppNavigation.styled';
const AppNavigation = () => {
  return (
    <Container>
      <StyleNavigation>
        <NavigationList>
          <NavigatiomItem>
            <StyleCgProfile size={30} />
          </NavigatiomItem>
          <NavigatiomItem>
            <StyleAiOutlinePlus size={30} />
          </NavigatiomItem>
          <NavigatiomItem>
            <StyleTfiLayoutGrid3 size={30} />
          </NavigatiomItem>
        </NavigationList>
      </StyleNavigation>
    </Container>
  );
};

export default AppNavigation;
