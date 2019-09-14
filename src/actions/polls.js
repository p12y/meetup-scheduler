import firebase from 'lib/firebase';
import { error, success } from 'react-toastify-redux';
import { setPerformingAsync } from 'actions/common';

const pollObserver = {};

export const fetchPollSuccess = ({ id, pollData, topDate }) => ({
  type: 'FETCH_POLL_SUCCESS',
  id,
  pollData,
  topDate,
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
    const newDocRef = firebase
      .firestore()
      .collection('polls')
      .doc();

    await newDocRef.set({
      dates: dates.map(date => ({
        date,
        votes: [],
        yesVoteCount: 0,
        noVoteCount: 0,
      })),
      createdBy,
      name,
      location,
      description,
      createdAt: firebase.firestore.Timestamp.fromDate(new Date()),
      votes: [],
      numParticipants: 0,
      id: newDocRef.id,
    });
    history.push(`/p/${newDocRef.id}`);
    dispatch(success('Poll created!'));
  } catch (err) {
    console.error(err);
    dispatch(error("Poll couldn't be created."));
  }
};

export const fetchPoll = id => async dispatch => {
  dispatch(setIsLoading());
  const doc = firebase
    .firestore()
    .collection('polls')
    .doc(id);

  pollObserver.unsubscribe = doc.onSnapshot(
    snapshot => {
      if (snapshot.exists) {
        const pollData = snapshot.data();
        let topDate = null;

        if (pollData && pollData.dates.length) {
          const sortedDates = Array.from(pollData.dates).sort(
            (a, b) => b.yesVoteCount - a.yesVoteCount
          );

          if (sortedDates.length > 1) {
            if (sortedDates[0].yesVoteCount > sortedDates[1].yesVoteCount) {
              topDate = sortedDates[0];
            }
          } else if (sortedDates[0].yesVoteCount > 0) {
            topDate = sortedDates[0];
          }
        }

        dispatch(
          fetchPollSuccess({
            topDate,
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
  if (pollObserver.unsubscribe) {
    pollObserver.unsubscribe();
    dispatch({ type: 'UNSUBSCRIBE_POLL' });
  }
};

export const castVote = ({ vote, pollId, date }) => async dispatch => {
  dispatch(setPerformingAsync('polls'));
  const pollRef = firebase
    .firestore()
    .collection('polls')
    .doc(pollId);
  const { uid, email, displayName, photoURL } = firebase.auth().currentUser;

  try {
    await firebase.firestore().runTransaction(async t => {
      const poll = await t.get(pollRef);
      const dates = poll.data().dates;
      const dateObj = dates.find(obj => obj.date === date);
      const votes = dateObj.votes.filter(
        currentVote => currentVote.user.uid !== uid
      );

      const updatedVotes = [
        ...votes,
        {
          vote,
          user: {
            uid,
            displayName,
            email,
            photoURL,
          },
        },
      ];

      let yesVoteCount = 0;
      let noVoteCount = 0;
      for (const currentVote of updatedVotes) {
        if (currentVote.vote === 'yes') {
          yesVoteCount += 1;
        } else {
          noVoteCount += 1;
        }
      }

      dateObj.votes = updatedVotes;
      dateObj.yesVoteCount = yesVoteCount;
      dateObj.noVoteCount = noVoteCount;
      const numParticipants = yesVoteCount + noVoteCount;
      t.update(pollRef, { dates, numParticipants });
      dispatch({ type: 'POLL_UPDATED' });
    });
  } catch (error) {
    console.log('Transaction failure:', error);
    dispatch({ type: 'POLL_UPDATE_ERROR' });
  }
};

export const setVotes = votes => dispatch => {
  dispatch(openWhoVotedLayer());
  dispatch({
    type: 'SET_VOTES',
    votes,
  });
};

export const openWhoVotedLayer = () => ({
  type: 'OPEN_WHO_VOTED_LAYER',
});

export const closeWhoVotedLayer = () => ({
  type: 'CLOSE_WHO_VOTED_LAYER',
});

export const setIsLoading = () => ({
  type: 'SET_IS_LOADING',
});

export const fetchPolls = uid => async dispatch => {
  dispatch(setIsLoading());
  const polls = [];
  try {
    const snapshot = await firebase
      .firestore()
      .collection('polls')
      .where('createdBy', '==', uid)
      .orderBy('createdAt', 'desc')
      .get();

    if (!snapshot.empty) {
      snapshot.forEach(doc => {
        polls.push(doc.data());
      });
    }

    dispatch({
      type: 'FETCH_POLLS_SUCCESS',
      polls,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: 'FETCH_POLLS_ERROR',
    });
  }
};

export const navigateToPoll = ({ history, id }) => {
  history.push(`/p/${id}`);
  return {
    type: 'NAVIGATE_TO_POLL',
  };
};
