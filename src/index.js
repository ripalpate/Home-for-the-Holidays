import $ from 'jquery';
import firebase from 'firebase/app';
import apiKeys from '../db/apiKeys.json';
import createNavbar from './components/navbar/navbar';
import loginButton from './components/auth/auth';
import authHelpers from './helpers/authHelpers';
import friendsPage from './components/friendsPage/friendsPage';
import showAddForm from './components/addEditFriends/addEditFriends';
import 'bootstrap';
import './index.scss';


const initializeApp = () => {
  firebase.initializeApp(apiKeys.firebaseKeys);
  createNavbar();
  authHelpers.checkLoginStatus(friendsPage);
  loginButton();
  $('#show-friend-form').on('click', showAddForm);
};
initializeApp();
