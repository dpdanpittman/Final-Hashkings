import * as userActions from "./index";
import {
  call,
  put,
  select,
  fork,
  takeLatest,
  takeEvery,
} from "redux-saga/effects";

import axios from "axios";

export const plantWatches = [takeEvery("FARM/PLANT", plant)];

export const waterTowerUpgradeWatches = [
  takeEvery("UPGRADE/WATERPLANT", upgradeWaterTower),
];

export const changeAvatarWatches = [takeEvery("CHANGE/AVATAR", changeAvatar)];

export const waterTowerWatches = [takeEvery("FARM/REGAR", regar)];

export const harvestPLantWatches = [takeEvery("FARM/HARVEST", harvest)];

export const buyJointWatches = [takeEvery("BUY/JOIN", buyJoint)];

export const smokeJointWatches = [takeEvery("SMOKE/JOIN", smokeJoint)];

export const motaPoolDeposit = [takeEvery("POOL/BUDS", motaPool)];

export const subdividePlot = [
  takeEvery("UPGRADE/SUBDIVIDE", upgradeSubdividePlot),
];

function camelize(str) {
  return str
    .replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
      return index === 0 ? word.toLowerCase() : word.toUpperCase();
    })
    .replace(/\s+/g, "");
}

export function* upgradeSubdividePlot(action) {
  yield call(subdividep, action.payload);
}

export function* changeAvatar(action) {
  yield call(changeA, action.payload);
}

function* changeA(action) {
  let body = {
    avatar: action.id,
  };
  let response = yield new Promise((resolve, reject) => {
    window.hive_keychain.requestCustomJson(
      action.owner,
      "qwoyn_change_avatar",
      "Posting",
      `${JSON.stringify(body)}`,
      "Planting seed",
      (res) => {
        resolve(res);
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

function* subdividep({ username, obj }) {
  console.log(username, obj);

  try {
    if (username || obj.id) {
    } else {
      yield put(
        userActions.plantError({
          loaderPlant: false,
          completePlant: true,
          errorPlant: true,
          mensajePlant: "u cant subdivide to this farm",
        })
      );
      return;
    }

    let body = { region: camelize(obj.properties.NAME), plotID: obj.id };

    let response = yield new Promise((resolve, reject) => {
      window.hive_keychain.requestCustomJson(
        username,
        "qwoyn_subdivide_plot",
        "Active",
        `${JSON.stringify(body)}`,
        "Subdivide " + obj.properties.NAME,
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
  } catch (e) {
    console.log("ERROR AL SUBDIVIDIR", e);
  }
}

export function* motaPool(action) {
  yield call(MotaPool, action.payload);
}

function* MotaPool(action) {
  console.log("METIENDOME EN LA POOOOOL", action);
  let response = yield new Promise((resolve, reject) => {
    window.hive_keychain.requestSendToken(
      action.username,
      "hk-buds",
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

export function* smokeJoint(action) {
  yield call(SmokeJoints, action.payload);
}

function autorizedBuyJoin(join, lvl) {
  switch (join) {
    case "pinner":
      if (lvl >= 1) {
        return true;
      }
      break;
    case "hempWrappedJoint":
      if (lvl >= 15) {
        return true;
      }
      break;
    case "crossJoint":
      if (lvl >= 30) {
        return true;
      }
      break;
    case "blunt":
      if (lvl >= 45) {
        return true;
      }
      break;
    case "hempWrappedBlunt":
      if (lvl >= 60) {
        return true;
      }
      break;
    case "twaxJoint":
      if (lvl >= 75) {
        return true;
      }
      break;
  }

  return false;
}

function* SmokeJoints(action) {
  /*
  console.info("SMOOOKE JOOOOIN", action, action.username, action.join);

  yield put(
    userActions.plantError({
      loaderPlant: false,
      completePlant: true,
      errorPlant: true,
      mensajePlant: "sorry, smoking is currently disabled",
    })
  );
  return; */

  /*
  if (
    !autorizedBuyJoin(camelize("" + action.join.properties.NAME), action.lvl)
  ) {
    yield put(
      userActions.plantError({
        loaderPlant: false,
        completePlant: true,
        errorPlant: true,
        mensajePlant: "Your LVL is not high enough to smoke this join",
      })
    );
    return;
  } */

  let body = {
    contractName: "nft",
    contractAction: "transfer",
    contractPayload: {
      to: "hk-vault",
      nfts: [{ symbol: "HKFARM", ids: [`${action.join.id}`] }],
    },
  };
  let response = yield new Promise((resolve, reject) => {
    window.hive_keychain.requestCustomJson(
      action.username,
      "ssc-mainnet-hive",
      "Active",
      `${JSON.stringify(body)}`,
      "Smoke a " + action.join.properties.NAME,
      (resp) => {
        resolve(resp);
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

function* BuyJoints(action) {
  console.info("BUUUUY JOOOOIN", action, action.username, action.join);

  if (!autorizedBuyJoin(camelize("" + action.join.name), action.lvl)) {
    yield put(
      userActions.plantError({
        loaderPlant: false,
        completePlant: true,
        errorPlant: true,
        mensajePlant: "Your LVL is not high enough to buy this join",
      })
    );
    return;
  }

  let response = yield new Promise((resolve, reject) => {
    window.hive_keychain.requestSendToken(
      action.username,
      "hk-vault",
      parseFloat("" + action.join.buds).toFixed(3),
      camelize("" + action.join.name) + " " + new Date().getTime(),
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

function checkStorage(data) {

  let dataStorage = JSON.parse(localStorage.getItem("pendings"));

  
  if (dataStorage.includes(data)) {
    return false;
  } else {
    return true;
  }
}

function* harvestPlot(action) {
  console.log("harvesting....", action);

  if (!checkStorage(JSON.stringify(action.farm.farmid))) {
    yield put(
      userActions.plantError({
        loaderPlant: false,
        completePlant: true,
        errorPlant: true,
        mensajePlant: "Please wait for the blockchain to receive the transaction",
      })
    );
    return;
  }

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
    setLocalStorage(JSON.stringify(action.farm.farmid));
    yield put(
      userActions.plantComplete({
        loaderPlant: false,
        completePlant: true,
        errorPlant: false,
        mensajePlant: response.message,
      })
    );
  } else {
 removeStorage(JSON.stringify(action.farm.farmid));
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

function autorizedLVLUp(watertowerLvl, lvl) {
  let response = false;
  switch (watertowerLvl + 1) {
    case 2:
      if (lvl >= 10) {
        response = true;
      }
      break;

    case 3:
      if (lvl >= 20) {
        response = true;
      }
      break;

    case 4:
      if (lvl >= 30) {
        response = true;
      }
      break;

    case 5:
      if (lvl >= 40) {
        response = true;
      }
      break;

    case 6:
      if (lvl >= 50) {
        response = true;
      }
      break;

    case 7:
      if (lvl >= 60) {
        response = true;
      }
      break;

    case 8:
      if (lvl >= 70) {
        response = true;
      }
      break;

    case 9:
      if (lvl >= 80) {
        response = true;
      }
      break;

    case 10:
      if (lvl >= 90) {
        response = true;
      }
      break;
  }

  return response;
}

function* upgradeWater(action) {

  let data = action.waterTower.item.split("lvl");

  let lvl = parseInt(data[1]);

  if (!checkStorage(JSON.stringify(action.waterTower.upgradeFunction()))) {
    yield put(
      userActions.plantError({
        loaderPlant: false,
        completePlant: true,
        errorPlant: true,
        mensajePlant: "Please wait for the blockchain to receive the transaction",
      })
    );
    return;
  }

  if (!autorizedLVLUp(lvl, action.lvl)) {
    removeStorage(JSON.stringify(action.waterTower.upgradeFunction()));
    yield put(
      userActions.plantError({
        loaderPlant: false,
        completePlant: true,
        errorPlant: true,
        mensajePlant: "Your LVL is not high enough to upgrade this water tower",
      })
    );

    return "imposible upgradear";
  }

  if (lvl + 1 > 10) {
    yield put(
      userActions.plantError({
        loaderPlant: false,
        completePlant: true,
        errorPlant: true,
        mensajePlant: "water tower is at maximum level",
      })
    );
    removeStorage(JSON.stringify(action.waterTower.upgradeFunction()));
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
        "hashkings",
        response.toFixed(3),
        "water" + (lvl + 1) + " " + action.waterTower.id,
        "HIVE",
        (response) => {
          resolve(response);
        },
        true
      );
    });
    if (rkeychain.success) {
      setLocalStorage(JSON.stringify(action.waterTower.upgradeFunction()));
      yield put(
        userActions.plantComplete({
          loaderPlant: false,
          completePlant: true,
          errorPlant: false,
          mensajePlant: rkeychain.message,
        })
      );
    } else {
      removeStorage(JSON.stringify(action.waterTower.upgradeFunction()));
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
    removeStorage(JSON.stringify(action.waterTower.upgradeFunction()));
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
      null
    );
  });

  console.log("plantar dice",response);

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

function* verificarTransaccion(tipo, user, json) {
  let url = "https://hashkings.xyz/pending";

  if (tipo == "HKWATER") {
    console.log("pidiendo datos");
    return yield axios
      .post(url, { user, json })
      .then(async (response) => {
        console.log(response.data);
        return response.data;
      })
      .catch((e) => {
        console.log("error ", e);
        return { response: false };
      });
  }

  return true;
}

function* regarPlot(action) {
  console.error("regando", action);

  if (!checkStorage(JSON.stringify( action.farm.seedToPlant ))) {
    yield put(
      userActions.plantError({
        loaderPlant: false,
        completePlant: true,
        errorPlant: true,
        mensajePlant: "Please wait for the blockchain to receive the transaction",
      })
    );
    return;
  }


  try {
    
    let verificacion = yield verificarTransaccion("HKWATER", action.username, {
      contractName: "tokens",
      contractAction: "transfer",
      contractPayload: {
        symbol: "HKWATER",
        to: "hk-vault",
        quantity: parseFloat(
          "" + action.farm.seedToPlant.properties.WATER
        ).toFixed(3),
        memo: action.farm.seedToPlant.id,
      },
      transaction_id: "null",
      block_num: "null",
    });

    if (verificacion.response) {
      removeStorage(JSON.stringify( action.farm.seedToPlant ));
      return yield put(
        userActions.plantError({
          loaderPlant: false,
          completePlant: true,
          errorPlant: true,
          mensajePlant:
            "this transaction have this status: " +
            verificacion.status +
            " please wait",
        })
      );
    }

    if (action.farm.seedToPlant.properties.WATER) {
    }
    if (action.farm.seedToPlant.properties.WATER <= 0) {
      removeStorage(JSON.stringify( action.farm.seedToPlant ));
      return yield put(
        userActions.plantError({
          loaderPlant: false,
          completePlant: true,
          errorPlant: true,
          mensajePlant: "you don't need to add more water",
        })
      );
    }
  } catch (e) {
    removeStorage(JSON.stringify( action.farm.seedToPlant ));
    return yield put(
      userActions.plantError({
        loaderPlant: false,
        completePlant: true,
        errorPlant: true,
        mensajePlant:
          "you can't irrigate this land now, sorry we're working on this",
      })
    );
  }

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
    setLocalStorage(JSON.stringify( action.farm.seedToPlant ));
    yield put(
      userActions.plantComplete({
        loaderPlant: false,
        completePlant: true,
        errorPlant: false,
        mensajePlant: response.message,
      })
    );
  } else {
    removeStorage(JSON.stringify( action.farm.seedToPlant ));
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

function removeStorage(data) {
  let datos = JSON.parse(localStorage.getItem("pendings"));
  localStorage.setItem(
    "pendings",
    JSON.stringify(datos.filter((e) => e != data) )
  );
}

function setLocalStorage(data) {
  let datos = JSON.parse(localStorage.getItem("pendings"));
  if (datos) {
    localStorage.setItem("pendings", JSON.stringify([...datos, data]));
  } else {
    localStorage.setItem("pendings", JSON.stringify([...data]));
  }
}
