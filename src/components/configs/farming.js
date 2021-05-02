/** @format */

import steemConnectAPI from "steemconnect";

import Miniature1 from "../../assets/img/miniatures/Miniatura1.png";
import Miniature2 from "../../assets/img/miniatures/Miniatura2.png";
import Miniature3 from "../../assets/img/miniatures/Miniatura3.png";
import Miniature4 from "../../assets/img/miniatures/Miniatura4.png";
import Miniature5 from "../../assets/img/miniatures/Miniatura5.png";
import Miniature6 from "../../assets/img/miniatures/Miniatura6.png";

import PlantingPNG from "../../assets/img/ui/plant button.png";
import WateringPNG from "../../assets/img/ui/water button.png";
import HarvestingPNG from "../../assets/img/ui/harvest button.png";

export const regionsToMiniatures = {
  africa: Miniature1,
  asia: Miniature2,
  afghanistan: Miniature3,
  jamaica: Miniature4,
  mexico: Miniature5,
  southamerica: Miniature6,
};

export const regions = {
  africa: Miniature1,
  asia: Miniature2,
  afghanistan: Miniature3,
  jamaica: Miniature4,
  mexico: Miniature5,
  southamerica: Miniature6,
};

export const farmingOperationsImgs = {
  plant: PlantingPNG,
  water: WateringPNG,
  harvest: HarvestingPNG,
};

class FarmingOperations {
  async plant(username, seed, plot) {
    return "";
  }

  water(username, seed, plot) {
    //return alert("Watering...");
  }

  harvest(username, seed, plot) {
    return alert("Harvesting...");
  }

  upgrade(username, obj) {
    return alert("Upgrading...");
  }

  transfer(usernamesend, to, obj, cantidad, type) {
    console.log(usernamesend, to, obj, cantidad, type);

    switch (type) {
      case "":
        break;
      default:
        break;
    }

    if (obj == "water") {
      obj = "HKWATER";
    }

    if (usernamesend && to && obj && cantidad) {
      window.hive_keychain.requestSendToken(
        usernamesend,
        to,
        parseFloat("" + cantidad).toFixed(3),
        "transfer " + obj,
        obj.toUpperCase(),
        (resp) => {
          console.log("transferencia responde", resp);
        },
        null
      );
    }
  }

  camelize(str) {
    return str
      .replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
        return index === 0 ? word.toLowerCase() : word.toUpperCase();
      })
      .replace(/\s+/g, "");
  }

  subdivide(username, obj) {
   
  }

  smoke(username, piner) {
    console.log("smoke", username, piner);

    let body = {
      contractName: "nft",
      contractAction: "transfer",
      contractPayload: {
        to: "hk-vault",
        nfts: [{ symbol: "HKFARM", ids: [`${piner.id}`] }],
      },
    };

    window.hive_keychain.requestCustomJson(
      username,
      "ssc-mainnet-hive",
      "Active",
      `${JSON.stringify(body)}`,
      "Smoke a " + piner.properties.NAME,
      (res) => {
        console.log("response", res);
        alert("Success");
      }
    );

    return alert("Smoking...");
  }

  buyJoint(username, joint) {
    console.log(username, joint);
    if (!joint) {
      alert("error joint not selected");
      return;
    }
  }

  useTimebooster(username, boosterLevel) {
    return alert("Boosting...");
  }

  depositBuds(username, budsToDeposit) {
    return alert("Depositing...");
  }

  stakeMota(username, motaToStake) {
    let json = {
      contractName: "tokens",
      contractAction: "stake",
      contractPayload: {
        symbol: "MOTA",
        to: username,
        quantity: motaToStake,
      },
    };

    window.hive_keychain.requestCustomJson(
      username,
      "ssc-mainnet-hive",
      "Active",
      `${JSON.stringify(json)}`,
      "Stake Mota",
      (res) => {
        if (res.success) {
          alert("Success");
        }
      }
    );
    return alert("Staking...");
  }

  unstakeMota(username, motaToUnstake) {
    let json = {
      contractName: "tokens",
      contractAction: "unstake",
      contractPayload: {
        symbol: "MOTA",
        quantity: motaToUnstake,
      },
    };

    window.hive_keychain.requestCustomJson(
      username,
      "ssc-mainnet-hive",
      "Active",
      `${JSON.stringify(json)}`,
      "Unstake Mota",
      (res) => {
        if (res.success) {
          alert("Success");
        }
      }
    );

    return alert("Unstaking...");
  }
}
export const Farm = new FarmingOperations();
