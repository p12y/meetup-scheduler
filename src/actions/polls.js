import firebase from 'lib/firebase';
import { error, success } from 'react-toastify-redux';

const pollObserver = {};

export const fetchPollSuccess = ({ id, pollData, unsubscribe }) => ({
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
        dates: dates.map(date => ({ date, votes: [] })),
        createdBy,
        name,
        location,
        description,
        createdAt: firebase.firestore.Timestamp.fromDate(new Date()),
        votes: [],
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
  const doc = firebase
    .firestore()
    .collection('polls')
    .doc(id);

  pollObserver.unsubscribe = doc.onSnapshot(
    snapshot => {
      if (snapshot.exists) {
        dispatch(
          fetchPollSuccess({
            id: snapshot.id,
            pollData: snapshot.data(),
          })
        );
      } else {
        console.log('No such document!');
      }
    },
    err => console.error(err)
  );
};

export const unsubscribePollObserver = () => dispatch => {
  if (pollObserver.unsubscribe) pollObserver.unsubscribe();
};

export const castVote = ({ vote, pollId, date }) => async dispatch => {
  const pollRef = firebase
    .firestore()
    .collection('polls')
    .doc(pollId);
  const userId = firebase.auth().currentUser.uid;

  try {
    await firebase.firestore().runTransaction(async t => {
      const poll = await t.get(pollRef);
      const dates = poll.data().dates;
      const dateObj = dates.find(obj => obj.date === date);
      const votes = dateObj.votes.filter(vote => vote.userId !== userId);
      const updatedVotes = [...votes, { userId, vote }];
      dateObj.votes = updatedVotes;
      t.update(pollRef, { dates });
    });
  } catch (error) {
    console.log('Transaction failure:', error);
  }
};
