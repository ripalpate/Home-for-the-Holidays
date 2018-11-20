import axios from 'axios';
import $ from 'jquery';
import apiKeys from '../../../db/apiKeys.json';
import authHelpers from '../../helpers/authHelpers';


const buildDropdown = (friendsArray) => {
  let dropdown = `<div class="dropdown">
  <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
    Pick a Friend
  </button>
  <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">`;
  friendsArray.forEach((friend) => {
    dropdown += `<div class="dropdown-item">${friend.name}</div>`;
  });
  dropdown += '</div></div>';
  $('#dropdown-container').html(dropdown);
};

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
      // console.log(friendsArray);
      buildDropdown(friendsArray);
    }).catch((error) => {
      console.error('error in getting friends', error);
    });
};
export default friendsPage;
