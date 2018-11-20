import axios from 'axios';
import apiKeys from '../../../db/apiKeys.json';
import authHelpers from '../../helpers/authHelpers';

const friendsPage = () => {
  // getting uid for the current user who is logged in
  const uid = authHelpers.getCurrentUid();
  axios.get(`${apiKeys.firebaseKeys.databaseURL}/friends.json?orderBy="uid"&equalTo="${uid}"`)
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
      console.log(friendsArray);
    }).catch((error) => {
      console.error('error in getting friends', error);
    });
};
export default friendsPage;