import axios from 'axios';
import apiKeys from '../../../db/apiKeys.json';

const firebaseUrl = apiKeys.firebaseKeys.databaseURL;
const getAllFriends = uid => new Promise((resolve, reject) => {
  axios.get(`${firebaseUrl}/friends.json?orderBy="uid"&equalTo="${uid}"`)
    .then((results) => {
      const friendsObject = results.data;
      const friendsArray = [];
      if (friendsObject !== null) {
        Object.keys(friendsObject).forEach((friendId) => {
          // grabbing friendID from friendObject and setting that id to friendID that
          //  is passed in as parameter.
          friendsObject[friendId].id = friendId;
          friendsArray.push(friendsObject[friendId]);
        });
      }
      // console.log(friendsArray);
      resolve(friendsArray);
    }).catch((error) => {
      reject(error);
    });
});

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

const deleteFriend = friendId => axios.delete(`${firebaseUrl}/friends/${friendId}.json`);

export default {
  getAllFriends,
  getSingleFriend,
  deleteFriend,
};
