import { auth } from '../../firebase/config';
import { authSlice } from './authReducers';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  updateProfile,
  signOut,
} from 'firebase/auth';

const authSignUpUser =
  ({ email, password, login, userAvatar }) =>
  async dispatch => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);

      const user = await auth.currentUser;

      await updateProfile(user, {
        displayName: login,
        photoURL: userAvatar,
      });

      const userUpdateProfile = {
        userId: user.uid,
        login: user.displayName,
        userAvatar: user.photoURL,
        userEmail: user.email,
      };

      dispatch(authSlice.actions.updateUserProfile(userUpdateProfile));
    } catch (error) {
      console.log(error);
    }
  };

const authSignInUser =
  ({ email, password }) =>
  async () => {
    await signInWithEmailAndPassword(auth, email, password)
      .then(userCredential => {
        // eslint-disable-next-line no-unused-vars
        const user = userCredential.user;
      })
      .catch(error => {
        console.log(error);
      });
  };

const authStateChangeUser = () => async dispatch => {
  await onAuthStateChanged(auth, user => {
    if (user) {
      const userUpdateProfile = {
        userId: user.uid,
        login: user.displayName,
        userEmail: user.email,
      };

      dispatch(authSlice.actions.updateUserProfile(userUpdateProfile));
      dispatch(authSlice.actions.authStateChange({ stateChange: true }));
    }
  });
};

const authSignOutUser = () => async dispatch => {
  await signOut(auth);
  dispatch(authSlice.actions.authSignOut());
};

export { authSignUpUser, authSignInUser, authStateChangeUser, authSignOutUser };
