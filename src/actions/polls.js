import firebase from 'lib/firebase';
import { error, success } from 'react-toastify-redux';

export const fetchPollSuccess = ({ id, pollData }) => ({
  type: 'FETCH_POLL_SUCCESS',
  id,
  pollData,
});

export const createPoll = ({
  dates,
  createdBy,
  name,
  location,
  description,
  history,
}) => async dispatch => {
  try {
    const docRef = await firebase
      .firestore()
      .collection('polls')
      .add({
        pollItems: dates.map(date => ({
          date,
          votes: {
            yes: [],
            no: [],
          },
        })),
        createdBy,
        name,
        location,
        description,
        createdAt: firebase.firestore.Timestamp.fromDate(new Date()),
        numParticipants: 0,
      });
    history.push(`/p/${docRef.id}`);
    dispatch(success('Poll created!'));
  } catch (err) {
    console.error(err);
    dispatch(error("Poll couldn't be created."));
  }
};

export const fetchPoll = id => async dispatch => {
  try {
    const doc = await firebase
      .firestore()
      .collection('polls')
      .doc(id)
      .get();

    if (doc.exists) {
      dispatch(fetchPollSuccess({ id: doc.id, pollData: doc.data() }));
    } else {
      console.log('No such document!');
    }
  } catch (error) {
    console.log('Error getting document:', error);
  }
};
