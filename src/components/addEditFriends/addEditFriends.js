import $ from 'jquery';
import authHelpers from '../../helpers/authHelpers';
import friendsData from '../../helpers/data/friendsData';
import initializeFriendsPage from '../friendsPage/friendsPage';

const formBuilder = () => {
  const form = `
  <div class="form-group">
    <label for="form-friend-name">Name:</label>
    <input type="text" class="form-control" id="form-friend-name" placeholder="John Smith">
  </div>
  <div class="form-group">
    <label for="form-friend-address">Address:</label>
    <input type="text" class="form-control" id="form-friend-address" placeholder="500 Interstate Blvd">
  </div>
  <div class="form-group">
    <label for="form-friend-email">Email:</label>
    <input type="email" class="form-control" id="form-friend-email" placeholder="fake@person.com">
  </div>
  <div class="form-group">
    <label for="form-friend-phone">Phone Number:</label>
    <input type="text" class="form-control" id="form-friend-phone" placeholder="111-111-2222">
  </div>
  <div class="form-group">
    <label for="form-friend-relationship">Relationship:</label>
    <input type="text" class="form-control" id="form-friend-relationship" placeholder="student">
  </div>
  `;
  return form;
};

const gettingFriendFromForm = () => {
  const friend = {
    name: $('#form-friend-name').val(),
    address: $('#form-friend-address').val(),
    email: $('#form-friend-email').val(),
    relationship: $('#form-friend-relationship').val(),
    phoneNumber: $('#form-friend-phone').val(),
    isAvoiding: false,
    uid: authHelpers.getCurrentUid(),
  };
  return friend;
};

const buildAddForm = () => {
  let domString = '<h2> Add New Friend</h2>';
  domString += formBuilder();
  domString += '<button id="add-friend">Save New Friend</button>';
  $('#add-edit-friend').html(domString).show();
  $('#friends').hide();
};

const addNewFriend = () => {
  const newFriend = gettingFriendFromForm();
  friendsData.addNewFriend(newFriend)
    .then(() => {
      // when you add object firebase returns firebase unique id.
      // tryadding result in .then () and see console.log(result);
      $('#add-edit-friend').html('').hide();
      $('#friends').show();
      initializeFriendsPage();
    }).catch((error) => {
      console.error(error);
    });
};

$('body').on('click', '#add-friend', addNewFriend);

export default buildAddForm;
