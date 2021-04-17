/** @format */

import axios from 'axios';

import bucket from '../utils/data_placeholders/bucket';

// user: 'hosherama',
// user: 'quantumnachos',
let initState = {
  user: 'bhoa',
  API_bucket: bucket,
  areas: [],
  map_area: {},
};

const indexReducer = (state = initState, action) => {
  switch (action.type) {
    case 'API UPDATE':
      // console.log("Attempting to update Store from API");
      state = {
        ...state,
        API_bucket: action.payload,
      };
      return state;
    case 'PUSH AREAS TO STORE':
      // console.log("Pushing areas to store :>>", action.areas)
      const { areas } = action;
      state = {
        ...state,
        areas,
      };
      return state;
    case 'SET MAP AREA':
      const map_area = action.area;
      // console.log("Setting map_area ::>> ", map_area);
      state = {
        ...state,
        map_area,
      };
      return state;
    case 'UPDATE USERNAME':
      return {
        ...state,
        user: action.username,
      };

    default:
      break;
  }

  return state;
};

// const populateStore = () => {
//     const API = "http://hashkings.xyz";
//     axios.get(API)
//       .then(res => {
//             indexReducer(res.data, "API UPDATE");
//         })
//       .catch(err => console.log("Error fetching bucket :>>", err));
// }

// populateStore();

export default indexReducer;
