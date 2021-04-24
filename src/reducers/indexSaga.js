import * as userActions from "./index";

import {
  call,
  put,
  select,
  fork,
  takeLatest,
  takeEvery,
} from "redux-saga/effects";

export const plantWatches = [takeEvery("FARM/PLANT", plant)];

export const waterTowerUpgradeWatches = [
  takeEvery("UPGRADE/WATERPLANT", upgradeWaterTower),
];

export const waterTowerWatches = [takeEvery("FARM/REGAR", regar)];

export const harvestPLantWatches = [takeEvery("FARM/HARVEST", harvest)];

export const buyJointWatches = [takeEvery("BUY/JOIN", buyJoint)];

export const motaPoolDeposit = [takeEvery("POOL/BUDS", motaPool)];

export function* motaPool(action) {
  yield call(MotaPool, action.payload);
}

function* MotaPool(action) {
  console.log("METIENDOME EN LA POOOOOL", action);
  let response = yield new Promise((resolve, reject) => {
    window.hive_keychain.requestSendToken(
      action.username,
      "hk-vault",
      parseFloat("" + action.cantidad).toFixed(3),
      "deposit",
      "BUDS",
      (resp) => {
        resolve(resp);
      },
      null
    );
  });

  if (response.success) {
    yield put(
      userActions.plantComplete({
        loaderPlant: false,
        completePlant: true,
        errorPlant: false,
        mensajePlant: response.message,
      })
    );
  } else {
    yield put(
      userActions.plantError({
        loaderPlant: false,
        completePlant: true,
        errorPlant: true,
        mensajePlant: response.message,
      })
    );
    return;
  }
}

export function* buyJoint(action) {
  yield call(BuyJoints, action.payload);
}

function* BuyJoints(action) {
  console.info("BUUUUY JOOOOIN", action, action.username, action.join);

  let response = yield new Promise((resolve, reject) => {
    window.hive_keychain.requestSendToken(
      action.username,
      "hk-vault",
      parseFloat("" + action.join.buds).toFixed(3),
      ("" + action.join.name).toLowerCase(),
      "BUDS",
      (resp) => {
        resolve(resp);
      },
      null
    );
  });

  if (response.success) {
    yield put(
      userActions.plantComplete({
        loaderPlant: false,
        completePlant: true,
        errorPlant: false,
        mensajePlant: response.message,
      })
    );
  } else {
    yield put(
      userActions.plantError({
        loaderPlant: false,
        completePlant: true,
        errorPlant: true,
        mensajePlant: response.message,
      })
    );
    return;
  }
}

export function* harvest(action) {
  yield call(harvestPlot, action.payload);
}

export function* regar(action) {
  yield call(regarPlot, action.payload);
}

export function* plant(action) {
  yield call(plantSeed, action.payload);
}

export function* upgradeWaterTower(action) {
  yield call(upgradeWater, action.payload);
}

function* harvestPlot(action) {
  console.log("harvesting....", action);
  let body = {
    contractName: "nft",
    contractAction: "transfer",
    contractPayload: {
      to: "hk-vault",
      nfts: [
        { symbol: "HKFARM", ids: [`${action.farm.farmid.properties.SEEDID}`] },
      ],
    },
  };
  let response = yield new Promise((resolve, reject) => {
    window.hive_keychain.requestCustomJson(
      action.username,
      "ssc-mainnet-hive",
      "Active",
      `${JSON.stringify(body)}`,
      "Harvest Seed",
      (res) => {
        resolve(res);
      }
    );
  });

  if (response.success) {
    yield put(
      userActions.plantComplete({
        loaderPlant: false,
        completePlant: true,
        errorPlant: false,
        mensajePlant: response.message,
      })
    );
  } else {
    yield put(
      userActions.plantError({
        loaderPlant: false,
        completePlant: true,
        errorPlant: true,
        mensajePlant: response.message,
      })
    );
    return;
  }
}

function* upgradeWater(action) {
  console.error("UPGRADE WATER FUNCIONA", action);
  let data = action.waterTower.item.split("lvl");
  let name = data[0];
  let lvl = parseInt(data[1]);

  if (lvl + 1 > 10) {
    yield userActions.plantError({
      loaderPlant: false,
      completePlant: true,
      errorPlant: true,
      mensajePlant: "water tower is at maximum level",
    });
    return "imposible upgradear";
  }

  const response = yield new Promise((resolve, reject) => {
    fetch(
      "https://api.coingecko.com/api/v3/simple/price?ids=hive&vs_currencies=usd&include_24hr_change=true",
      {
        headers: {
          accept: "application/json, text/plain, ",
        },
      }
    )
      .then((response) => response.json())
      .then((res) => {
        const hiveValue = res.hive.usd;
        resolve(1 / hiveValue);
      })
      .catch((e) => {
        resolve(0);
      });
  });

  if (response) {
    let rkeychain = yield new Promise((resolve, reject) => {
      window.hive_keychain.requestTransfer(
        action.username,
        "hk-vault",
        response.toFixed(3),
        "water" + lvl + 1,
        "HIVE",
        (response) => {
          resolve(response);
        },
        true
      );
    });
    if (rkeychain.success) {
      yield put(
        userActions.plantComplete({
          loaderPlant: false,
          completePlant: true,
          errorPlant: false,
          mensajePlant: rkeychain.message,
        })
      );
    } else {
      yield put(
        userActions.plantError({
          loaderPlant: false,
          completePlant: true,
          errorPlant: true,
          mensajePlant: rkeychain.message,
        })
      );
      return;
    }
  } else {
    yield put(
      userActions.plantError({
        loaderPlant: false,
        completePlant: true,
        errorPlant: true,
        mensajePlant: "Please try again",
      })
    );
    return;
  }
}

function* plantSeed(action) {
  console.log("recibiendo", action);
  let body = {
    plotID: "" + action.seed.farmid.id,
    seedID: "" + action.seed.seedToPlant.id,
  };

  const response = yield new Promise((resolve) => {
    window.hive_keychain.requestCustomJson(
      action.username,
      "qwoyn_plant_plot",
      "Posting",
      `${JSON.stringify(body)}`,
      "Planting seed",
      (res) => {
        resolve(res);
      },
      true
    );
  });

  if (response.success) {
    yield put(
      userActions.plantComplete({
        loaderPlant: false,
        completePlant: true,
        errorPlant: false,
        mensajePlant: response.message,
      })
    );
  } else {
    yield put(
      userActions.plantError({
        loaderPlant: false,
        completePlant: true,
        errorPlant: true,
        mensajePlant: response.message,
      })
    );
    return;
  }
}

function* regarPlot(action) {
  console.error(action);

  let response = yield new Promise((resolve, reject) => {
    window.hive_keychain.requestSendToken(
      action.username,
      "hk-vault",
      parseFloat("" + action.farm.seedToPlant.properties.WATER).toFixed(3),
      action.farm.seedToPlant.id,
      "HKWATER",
      (resp) => {
        resolve(resp);
      },
      null
    );
  });

  if (response.success) {
    yield put(
      userActions.plantComplete({
        loaderPlant: false,
        completePlant: true,
        errorPlant: false,
        mensajePlant: response.message,
      })
    );
  } else {
    yield put(
      userActions.plantError({
        loaderPlant: false,
        completePlant: true,
        errorPlant: true,
        mensajePlant: response.message,
      })
    );
    return;
  }
}
