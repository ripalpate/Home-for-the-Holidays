import axios from 'axios';
import apiKeys from '../../../db/apiKeys.json';

const firebaseUrl = apiKeys.firebaseKeys.databaseURL;
const getAllFriends = (uid) => {
  console.log(uid);
};

const getSingleFriend = friendId => new Promise((resolve, reject) => {
  axios.get(`${firebaseUrl}/friends/${friendId}.json`)
    .then((result) => {
      // singlefriend is coming directly from firebase object and
      // doesn't have an id so we need to set it everytime.
      const singleFriend = result.data;
      // setting back id again
      singleFriend.id = friendId;
      resolve(singleFriend);
    }).catch((error) => {
      reject(error);
    });
});

const deleteFriend = (friendId) => {
  console.log(friendId);
};

export default {
  getAllFriends,
  getSingleFriend,
  deleteFriend,
};
