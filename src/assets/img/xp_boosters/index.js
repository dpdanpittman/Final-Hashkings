/** @format */

import BroncePNG from "./bronce.png";
import BluntPNG from "./blunt.png";
import HempWrappedBluntBroncePNG from "./hemp wrapped blunt bronce.png";
import HempWrappedJointBroncePNG from "./hemp wrapped joint bronce.png";
import PinnerBroncePNG from "./pinner bronce.png";
import TwaxJointBroncePNG from "./Twax joint bronce.png";
import axios from "axios";

export default {
  PinnerBroncePNG: {
    image: PinnerBroncePNG,
    buds: 0.1,
    boost: 15,
    name: "Pinner",
    usd: () => {
      return getMotaPrice(0.1);
    },
  },
  HempWrappedJointBroncePNG: {
    image: HempWrappedJointBroncePNG,
    buds: 0.4,
    boost: 75,
    name: "Hemp Wrapped",
    usd: () => {
      return getMotaPrice(0.4);
    },
  },
  BroncePNG: {
    image: BroncePNG,
    buds: 2,
    boost: 400,
    name: "Cross",
    usd: () => {
      return getMotaPrice(2);
    },
  },
  BluntPNG: {
    image: BluntPNG,
    buds: 5,
    boost: 1000,
    name: "Blunt",
    usd: () => {
      return getMotaPrice(5);
    },
  },
  HempWrappedBluntBroncePNG: {
    image: HempWrappedBluntBroncePNG,
    buds: 10,
    boost: 2500,
    name: "Hemp Wrapped Blunt",
    usd: () => {
      return getMotaPrice(10);
    },
  },
  TwaxJointBroncePNG: {
    image: TwaxJointBroncePNG,
    buds: 20,
    boost: 6000,
    name: "Twax",
    usd: () => {
      return getMotaPrice(20);
    },
  },
};

async function getUSDPrice(price) {
  return await new Promise((resolve, reject) => {
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
        resolve(price / hiveValue);
      })
      .catch((e) => {
        resolve(0);
      });
  });
}

export async function usd(price) {
  return await getMotaPrice(price);
}

async function getMotaPrice(price) {
  let usdPrice = await getUSDPrice(price);

  if (!usdPrice) {
    return 0;
  }

  console.log("valor de $", price, " en hive es", usdPrice);

  return new Promise((resolve, reject) => {
    axios
      .post("https://engine.rishipanthee.com/contracts", {
        jsonrpc: "2.0",
        id: 12,
        method: "find",
        params: {
          contract: "market",
          table: "metrics",
          query: { symbol: { $in: ["BUDS"] } },
          limit: 1000,
          offset: 0,
          indexes: [],
        },
      })
      .then((result) => {
        const lasPrice = result.data.result[0].lastPrice;
        const valueInHive = usdPrice / lasPrice;
        console.log(
          "valor actual del buds",
          lasPrice,
          "valor en hive",
          valueInHive
        );
        resolve(valueInHive);
      })
      .catch(async (err) => {
        console.log("error al traer valor de la mota", err);
        resolve(0);
      });
  });
}
