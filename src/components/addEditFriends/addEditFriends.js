import $ from 'jquery';
import authHelpers from '../../helpers/authHelpers';

const formBuilder = () => {
  const form = `
  <div class="form-group">
    <label for="form-friend-name">Name:</label>
    <input type="text" class="form-control" id="form-friend-name" placeholder="John Smith">
    <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
  </div>
  <div class="form-group">
    <label for="form-friend-address">Address:</label>
    <input type="text" class="form-control" id="form-friend-address" placeholder="500 Interstate Blvd">
    <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
  </div>
  <div class="form-group">
    <label for="form-friend-email">Email:</label>
    <input type="email" class="form-control" id="form-friend-email" placeholder="fake@person.com">
    <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
  </div>
  <div class="form-group">
    <label for="form-friend-phone">Phone Number:</label>
    <input type="text" class="form-control" id="form-friend-phone" placeholder="111-111-2222">
    <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
  </div>
  <div class="form-group">
    <label for="form-friend-relationship">Relationship:</label>
    <input type="text" class="form-control" id="form-friend-relationship" placeholder="student">
    <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
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
};
