import axios from 'axios';
import apiKeys from '../../../db/apiKeys.json';

const baseUrl = apiKeys.firebaseKeys.databaseURL;
const getHolidayIdsForFriend = friendId => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/holidayFriends.json?orderBy="friendId"&equalTo="${friendId}"`)
    .then((result) => {
      // console.log('result', result);
      const holidayFriendObject = result.data;
      const holidayIds = [];
      if (holidayFriendObject !== null) {
        Object.keys(holidayFriendObject).forEach((hfId) => {
          holidayIds.push(holidayFriendObject[hfId].holidayId);
        });
      }
      resolve(holidayIds);
    }).catch((error) => {
      reject(error);
    });
});

export default { getHolidayIdsForFriend };
