import firebase from 'lib/firebase';
import { error, success } from 'react-toastify-redux';

export const createPoll = ({
  dates,
  createdBy,
  name,
  location,
  description,
  history,
}) => async (dispatch) => {
  try {
    const docRef = await firebase.firestore().collection('polls').add({
      dates,
      createdBy,
      name,
      location,
      description,
      createdAt: firebase.firestore.Timestamp.fromDate(new Date()),
      numParticipants: 0,
    });
    history.push(`/plans/${docRef.id}`);
    dispatch(success('Poll created!'));
  } catch (err) {
    console.error(err);
    dispatch(error("Poll couldn't be created."));
  }
};