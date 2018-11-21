import axios from 'axios';
import $ from 'jquery';
import apiKeys from '../../../db/apiKeys.json';
import authHelpers from '../../helpers/authHelpers';
import friendsData from '../../helpers/data/friendsData';

const printSingleFriend = (friend) => {
  const friendString = `
  <div>
    <h1>${friend.name}</h1>
    <h3>${friend.relationship}</h3>
    <p>${friend.address}</p>
    <p>${friend.email}</p>
    <p>${friend.phoneNumber}</p>
    <button class="btn btn-danger delete-button" data-delete-id=${friend.id}>X</button>
  </div>
  `;
  $('#single-container').html(friendString);
};

const getSingleFriend = (e) => {
  // firebase id(friendId:get from friend object that is in buildDropdown)
  const friendId = e.target.dataset.dropdownId;
  // dataset.dropdownID-comes from data-dropdown-id. you have to write in camlecase instead of dash
  // console.log(friendId);
  friendsData.getSingleFriend(friendId)
    .then((singleFriend) => {
      printSingleFriend(singleFriend);
    }).catch((error) => {
      console.error('error in getting friend', error);
    });
};
const buildDropdown = (friendsArray) => {
  let dropdown = `<div class="dropdown">
  <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
    Pick a Friend
  </button>
  <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">`;
  if (friendsArray.length) {
    friendsArray.forEach((friend) => {
      dropdown += `<div class="dropdown-item get-single" data-dropdown-id=${friend.id}>${friend.name}</div>`;
    });
  } else {
    dropdown += '<div class="dropdown-item"> You have no friends.</div>';
  }
  dropdown += '</div></div>';
  $('#dropdown-container').html(dropdown);
};

const friendsPage = () => {
  // getting uid for the current user who is logged in
  const uid = authHelpers.getCurrentUid();
  friendsData.getAllFriends(uid)
    .then((friendsArray) => {
      buildDropdown(friendsArray);
    }).catch((error) => {
      console.error('error in getting friends', error);
    });
};

const deleteFriend = (e) => {
  // firebase id
  const idToDelete = e.target.dataset.deleteId;
  axios.delete(`${apiKeys.firebaseKeys.databaseURL}/friends/${idToDelete}.json`)
    .then(() => {
      friendsPage();
      $('#single-container').html('');
    }).catch((error) => {
      console.error('error in deleting friend', error);
    });
};

const bindEvents = () => {
  $('body').on('click', '.get-single', getSingleFriend);
  $('body').on('click', '.delete-button', deleteFriend);
};

const initializeFriendsPage = () => {
  friendsPage();
  bindEvents();
};

export default initializeFriendsPage;
