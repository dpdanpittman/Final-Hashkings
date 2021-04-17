/** @format */

import steemConnectAPI from 'steemconnect';

import Miniature1 from '../../assets/img/miniatures/Miniatura1.png';
import Miniature2 from '../../assets/img/miniatures/Miniatura2.png';
import Miniature3 from '../../assets/img/miniatures/Miniatura3.png';
import Miniature4 from '../../assets/img/miniatures/Miniatura4.png';
import Miniature5 from '../../assets/img/miniatures/Miniatura5.png';
import Miniature6 from '../../assets/img/miniatures/Miniatura6.png';

import PlantingPNG from '../../assets/img/ui/plant button.png';
import WateringPNG from '../../assets/img/ui/water button.png';
import HarvestingPNG from '../../assets/img/ui/harvest button.png';

export const regionsToMiniatures = {
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
  plant(username, seed, plot) {
    return alert('Planting...');
  }

  water(username, plot, seed) {
    return alert('Watering...');
  }

  harvest(username, seed, plot) {
    return alert('Harvesting...');
  }

  upgrade(username, obj) {
    return alert('Upgrading...');
  }

  transfer(username, obj) {
    return alert('Tansfering...');
  }

  subdivide(username, obj) {
    return alert('Subdividing...');
  }

  smoke(username) {
    return alert('Smoking...');
  }

  useTimebooster(username, boosterLevel) {
    return alert('Boosting...');
  }

  depositBuds(username, budsToDeposit) {
    return alert('Depositing...');
  }

  stakeMota(username, motaToStake) {
    return alert('Staking...');
  }

  unstakeMota(username, motaToUnstake) {
    return alert('Unstaking...');
  }
}
export const Farm = new FarmingOperations();
