import firebase from 'firebase/app';
import apiKeys from '../db/apiKeys.json';
import createNavbar from './components/navbar/navbar';
import loginButton from './components/auth/auth';
import 'bootstrap';
import './index.scss';

const initializeApp = () => {
  firebase.initializeApp(apiKeys.firebaseKeys);
  createNavbar();
  loginButton();
};
initializeApp();
