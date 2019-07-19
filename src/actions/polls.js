import firebase from 'lib/firebase';

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
    dispatch({ type: 'CREATE_POLL_SUCCESS', createdPollID: docRef.id });
  } catch (error) {
    console.error(error);
    dispatch({ type: 'CREATE_POLL_FAILURE' });
  }
};