import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import firebase from 'lib/firebase';
import { setCurrentUser } from 'actions/auth';

export function useAuthObserver() {
  const dispatch = useDispatch();
  const isLoading = useSelector(state => state.auth.isLoading);

  useEffect(() => {
    const unregisterAuthObserver = firebase.auth().onAuthStateChanged(user => {
      if (user) {
        dispatch(setCurrentUser(user));
      } else {
        dispatch(setCurrentUser(null));
      }
      return () => unregisterAuthObserver();
    });
  }, [dispatch]);

  return isLoading;
}
