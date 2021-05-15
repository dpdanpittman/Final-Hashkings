/** @format */

import axios from "axios";

import bucket from "../utils/data_placeholders/bucket";

// user: 'hosherama',
// user: 'quantumnachos',
let initState = {
  user: "",
  API_bucket: null,
  areas: [],
  map_area: {},
  plantstatus: {
    loaderPlant: false,
    completePlant: false,
    errorPlant: false,
    mensajePlant: "",
  },
  displayPlantModal: false,
  displayUpgradeWaterPlantModal: false,
  displayWaterModal: false,
  displayHarvestModal: false,
  displayBuyJoint: false,
  displayPoolBuds: false,
  displaySmokeJoint: false,
  prices: {
    timeBooster: {},
  },
};

const indexReducer = (state = initState, action) => {
  switch (action.type) {
    case "API UPDATE":
      console.log("Attempting to update Store from API", action.payload);
      state = {
        ...state,
        API_bucket: action.payload,
        plantstatus: {
          loaderPlant: false,
          completePlant: false,
          errorPlant: false,
          mensajePlant: "",
        },
      };
      return state;
    case "PUSH AREAS TO STORE":
      // console.log("Pushing areas to store :>>", action.areas)
      const { areas } = action;
      state = {
        ...state,
        areas,
      };
      return state;
    case "SET MAP AREA":
      const map_area = action.area;
      // console.log("Setting map_area ::>> ", map_area);
      state = {
        ...state,
        map_area,
      };
      return state;
    case "UPDATE USERNAME":
      //console.log("actualizando usuario logeado" , action.username)
      return {
        ...state,
        user: action.username,
      };

    case "FARM/PLANT":
      console.log("PLANTANDO DESDE REDUCER");
      return state;

    case "FARM/PLANTSTATUS":
      return {
        ...state,
        plantstatus: action.payload,
      };

    case "FARM/DISPLAYPLANTMODAL":
      return {
        ...state,
        displayPlantModal: action.payload,
        displayUpgradeWaterPlantModal: action.payload,
        displayWaterModal: action.payload,
        displayHarvestModal: action.payload,
        displayBuyJoint: action.payload,
        displaySmokeJoint: action.payload,
        displayPoolBuds: action.payload,
        displayChangeAvatar : action.payload
      };

    case "RESTORELOADER":
      return {
        ...state,
        plantstatus: {
          loaderPlant: false,
          completePlant: false,
          errorPlant: false,
          mensajePlant: "",
        },
      };

    case "PRICE UPDATE":
      return {
        ...state,
        prices: action.payload,
      };

    case "UPGRADE/WATERPLANT":
      return {
        ...state,
        displayUpgradeWaterPlantModal: true,
      };

    case "UPGRADE/SUBDIVIDE":
      return {
        ...state,
        displayUpgradeWaterPlantModal: true,
      };

    case "FARM/REGAR":
      return {
        ...state,
        displayWaterModal: true,
      };

    case "FARM/HARVEST":
      return {
        ...state,
        displayHarvestModal: true,
      };

    case "BUY/JOIN":
      return {
        ...state,
        displayBuyJoint: true,
      };

    case "SMOKE/JOIN":
      return {
        ...state,
        displaySmokeJoint: true,
      };

    case "POOL/BUDS":
      return {
        ...state,
        displayPoolBuds: true,
      };

    case "CHANGE/AVATAR":
      return {
        ...state,
        displayChangeAvatar: true,
      };

    default:
      break;
  }

  return state;
};

export default indexReducer;

export const populateStore = async () => {
  if (localStorage.getItem("username")) {
    console.log("actualizando username", localStorage.getItem("username"));
    indexReducer(localStorage.getItem("username"), "UPDATE USERNAME");
  }
  const API = "https://hashkings.xyz/utest/" + localStorage.getItem("username");

  console.log("API", API);
  await axios
    .get(API)
    .then((res) => {
      indexReducer(res.data, "API UPDATE");
    })
    .catch((err) => console.log("Error fetching bucket :>>", err));

  await axios
    .get("https://hashkings.xyz/prices") //dan changed this url
    .then((res) => {
      indexReducer(res.data, "PRICE UPDATE");
    })
    .catch((err) => console.log("Error fetching bucket :>>", err));
};

export const updateBucket = (payload) => ({
  type: "API UPDATE",
  payload,
});

export const plant = (payload) => ({
  type: "FARM/PLANT",
  payload,
});

export const plantComplete = (payload) => ({
  type: "FARM/PLANTSTATUS",
  payload,
});
export const plantError = (payload) => ({
  type: "FARM/PLANTSTATUS",
  payload,
});

export const displayPlantModal = (payload) => ({
  type: "FARM/DISPLAYPLANTMODAL",
  payload,
});
