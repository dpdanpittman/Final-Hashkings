import React, { Component, useState } from "react";

import Modal from "react-bootstrap/Modal";
import Table from "react-bootstrap/Table";
import rentFarm from "../assets/img/RentFarm.png";
import rentWaterTower from "../assets/img/RentTower.png";
import rentBundle from "../assets/img/Rent bundle.png";

import Button from "react-bootstrap/Button";
import { connect } from "react-redux";
import ClosePNG from "../assets/img/ui/x close.png";

import axios from "axios";
import Swal from "sweetalert2";
import logo from "../assets/img/logo.png";
import triangle from "../assets/img/triangleselection.png";
import shaggi from "../assets/img/Boss info/Shaggi.png";
import info from "../assets/img/Boss info/Info.png";
import ranking from "../assets/img/Boss info/Ranking.png";

import * as qs from "query-string";

/*--------------ZEUS-------------- */

import zeusRara from "../assets/img/NFTs/Zeus/Rara.png";
import zeusEpica from "../assets/img/NFTs/Zeus/Epica.png";
import zeusComun from "../assets/img/NFTs/Zeus/Comun.png";
import zeusLegendaria from "../assets/img/NFTs/Zeus/Legendaria.gif";
import zeusMitica from "../assets/img/NFTs/Zeus/Mitica.gif";

/*--------------ANNA-------------- */

import annaLegendaria from "../assets/img/NFTs/Anna Kournikova/Legendaria.gif";
import annaMitica from "../assets/img/NFTs/Anna Kournikova/Mitica.gif";
import annaRara from "../assets/img/NFTs/Anna Kournikova/Rara.png";
import annaEpica from "../assets/img/NFTs/Anna Kournikova/Epica.png";
import annaComun from "../assets/img/NFTs/Anna Kournikova/Comun.png";

/*--------------Chameleon-------------- */

import chameleonLegendaria from "../assets/img/NFTs/Chameleon/Legendaria.gif";
import chameleonMitica from "../assets/img/NFTs/Chameleon/Mitica.gif";
import chameleonRara from "../assets/img/NFTs/Chameleon/Rara.png";
import chameleonEpica from "../assets/img/NFTs/Chameleon/Epica.png";
import chameleonComun from "../assets/img/NFTs/Chameleon/Comun.png";

/* --------------Cryptolocker-------------- */

import CryptolockerLegendaria from "../assets/img/NFTs/Cryptolocker/Legendaria.gif";
import CryptolockerMitica from "../assets/img/NFTs/Cryptolocker/Mitica.gif";
import CryptolockerRara from "../assets/img/NFTs/Cryptolocker/Rara.png";
import CryptolockerEpica from "../assets/img/NFTs/Cryptolocker/Epica.png";
import CryptolockerComun from "../assets/img/NFTs/Cryptolocker/Comun.png";

/* --------------Flashback-------------- */

import FlashbackLegendaria from "../assets/img/NFTs/Flashback/Legendaria.gif";
import FlashbackMitica from "../assets/img/NFTs/Flashback/Mitica.gif";
import FlashbackRara from "../assets/img/NFTs/Flashback/Rara.png";
import FlashbackEpica from "../assets/img/NFTs/Flashback/Epica.png";
import FlashbackComun from "../assets/img/NFTs/Flashback/Comun.png";

/* --------------fridaythe13th-------------- */

import fridaythe13thLegendaria from "../assets/img/NFTs/fridaythe13th/Legendaria.gif";
import fridaythe13thMitica from "../assets/img/NFTs/fridaythe13th/Mitica.gif";
import fridaythe13thRara from "../assets/img/NFTs/fridaythe13th/Rara.png";
import fridaythe13thEpica from "../assets/img/NFTs/fridaythe13th/Epica.png";
import fridaythe13thComun from "../assets/img/NFTs/fridaythe13th/Comun.png";

/* --------------GameThief-------------- */

import GameThiefLegendaria from "../assets/img/NFTs/GameThief/Legendaria.gif";
import GameThiefMitica from "../assets/img/NFTs/GameThief/Mitica.gif";
import GameThiefRara from "../assets/img/NFTs/GameThief/Rara.png";
import GameThiefEpica from "../assets/img/NFTs/GameThief/Epica.png";
import GameThiefComun from "../assets/img/NFTs/GameThief/Comun.png";

/* --------------ILOVEYOU-------------- */

import ILOVEYOULegendaria from "../assets/img/NFTs/ILOVEYOU/Legendaria.gif";
import ILOVEYOUMitica from "../assets/img/NFTs/ILOVEYOU/Mitica.gif";
import ILOVEYOURara from "../assets/img/NFTs/ILOVEYOU/Rara.png";
import ILOVEYOUEpica from "../assets/img/NFTs/ILOVEYOU/Epica.png";
import ILOVEYOUComun from "../assets/img/NFTs/ILOVEYOU/Comun.png";

/* --------------Melissa-------------- */

import MelissaLegendaria from "../assets/img/NFTs/Melissa/Legendaria.gif";
import MelissaMitica from "../assets/img/NFTs/Melissa/Mitica.gif";
import MelissaRara from "../assets/img/NFTs/Melissa/Rara.png";
import MelissaEpica from "../assets/img/NFTs/Melissa/Epica.png";
import MelissaComun from "../assets/img/NFTs/Melissa/Comun.png";

/*--------------Michelangelo-------------- */

import MichelangeloLegendaria from "../assets/img/NFTs/Michelangelo/Legendaria.gif";
import MichelangeloMitica from "../assets/img/NFTs/Michelangelo/Mitica.gif";
import MichelangeloRara from "../assets/img/NFTs/Michelangelo/Rara.png";
import MichelangeloEpica from "../assets/img/NFTs/Michelangelo/Epica.png";
import MichelangeloComun from "../assets/img/NFTs/Michelangelo/Comun.png";

/* --------------Mydoom------ ya -------- */

import MydoomLegendaria from "../assets/img/NFTs/Mydoom/Legendaria.gif";
import MydoomMitica from "../assets/img/NFTs/Mydoom/Mitica.gif";
import MydoomRara from "../assets/img/NFTs/Mydoom/Rara.png";
import MydoomEpica from "../assets/img/NFTs/Mydoom/Epica.png";
import MydoomComun from "../assets/img/NFTs/Mydoom/Comun.png";

/*--------------Sobig--- ya ----------- */

import SobigLegendaria from "../assets/img/NFTs/Sobig/Legendaria.gif";
import SobigMitica from "../assets/img/NFTs/Sobig/Mitica.gif";
import SobigRara from "../assets/img/NFTs/Sobig/Rara.png";
import SobigEpica from "../assets/img/NFTs/Sobig/Epica.png";
import SobigComun from "../assets/img/NFTs/Sobig/Comun.png";

const Info = {
  zeus: {
    title: "zeus",
    description: "bla bla bla bla bla",
    comun: zeusComun,
    rara: zeusRara,
    epica: zeusEpica,
    mitica: zeusMitica,
    legendaria: zeusLegendaria,
  },
  anna: {
    title: "anna",
    description: "bla bla bla bla bla",
    comun: annaComun,
    rara: annaRara,
    epica: annaEpica,
    mitica: annaMitica,
    legendaria: annaLegendaria,
  },
  Sobig: {
    title: "sobig",
    description: "bla bla bla bla bla",
    comun: SobigComun,
    rara: SobigRara,
    epica: SobigEpica,
    mitica: SobigMitica,
    legendaria: SobigLegendaria,
  },
  MydoomL: {
    title: "mydoom",
    description: "bla bla bla bla bla",
    comun: MydoomComun,
    rara: MydoomRara,
    epica: MydoomEpica,
    mitica: MydoomMitica,
    legendaria: MydoomLegendaria,
  },
  Michelangelo: {
    title: "Michelangelo",
    description: "bla bla bla bla bla",
    comun: MichelangeloComun,
    rara: MichelangeloRara,
    epica: MichelangeloEpica,
    mitica: MichelangeloMitica,
    legendaria: MichelangeloLegendaria,
  },
  Melissa: {
    title: "Melissa",
    description: "bla bla bla bla bla",
    comun: MelissaComun,
    rara: MelissaRara,
    epica: MelissaEpica,
    mitica: MelissaMitica,
    legendaria: MelissaLegendaria,
  },
  ILOVEYOU: {
    title: "mydoom",
    description: "bla bla bla bla bla",
    comun: ILOVEYOUComun,
    rara: ILOVEYOURara,
    epica: ILOVEYOUEpica,
    mitica: ILOVEYOUMitica,
    legendaria: ILOVEYOULegendaria,
  },
  GameThief: {
    title: "GameThief",
    description: "bla bla bla bla bla",
    comun: GameThiefComun,
    rara: GameThiefRara,
    epica: GameThiefEpica,
    mitica: GameThiefMitica,
    legendaria: GameThiefLegendaria,
  },
  fridaythe13th: {
    title: "Fridaythe13th",
    description: "bla bla bla bla bla",
    comun: fridaythe13thComun,
    rara: fridaythe13thRara,
    epica: fridaythe13thEpica,
    mitica: fridaythe13thMitica,
    legendaria: fridaythe13thLegendaria,
  },
  Flashback: {
    title: "Flashback",
    description: "bla bla bla bla bla",
    comun: FlashbackComun,
    rara: FlashbackRara,
    epica: FlashbackEpica,
    mitica: FlashbackMitica,
    legendaria: FlashbackLegendaria,
  },

  Cryptolocker: {
    title: "Cryptolocker",
    description: "bla bla bla bla bla",
    comun: CryptolockerComun,
    rara: CryptolockerRara,
    epica: CryptolockerEpica,
    mitica: CryptolockerMitica,
    legendaria: CryptolockerLegendaria,
  },

  chameleon: {
    title: "Chameleon",
    description: "bla bla bla bla bla",
    comun: chameleonComun,
    rara: chameleonRara,
    epica: chameleonEpica,
    mitica: chameleonMitica,
    legendaria: chameleonLegendaria,
  },
};

class Raids extends Component {
  constructor(props) {
    super(props);
    this.state = {
      info: {},
      raids: [],
      loading: true,
      avatar: 0,
    };
    this.onSelectavone = this.onSelectavone.bind(this);
    this.setAvatarOnRaid = this.setAvatarOnRaid.bind(this);
  }

  onSelectavone(e) {
    this.setState({ ...this.state, avatar: e.target.value });
  }

  render() {
    let { loading, rentalLoading } = this.state;

    let temp = {};

    if (qs.parse(window.location.search).info) {
      temp = Info[qs.parse(window.location.search).info];
    }

    if (loading || rentalLoading) {
      return (
        <div className="authentication">
          <div
            style={{
              display: "grid",
              placeItems: "center",
              width: "100%",
              height: "60%",
              fontSize: "28px",
            }}
          >
            <img
              style={{
                width: "900px",
              }}
              src={logo}
            />
            <h6 style={{ color: "red !important" }}>Hashkings Alpha</h6>
            Now Loading ...
          </div>
        </div>
      );
    } else {
      if (temp.description) {
        return (
          <div className="authentication">
            <div
              className="overlay"
              style={{ display: this.state.showModalFarm ? "unset" : "none" }}
            ></div>
            <div className="raidsBackground" style={{ overflow: "auto" }}>
              <div className="container">
                <img
                  src={temp.image}
                  style={{
                    width: "15%",
                    position: "fixed",
                    inset: "21% 55% auto auto",
                  }}
                />
                <img
                  src={info}
                  style={{
                    width: "30%",
                    position: "fixed",
                    inset: "20% 28% auto auto",
                  }}
                />
                <img
                  src={ranking}
                  style={{
                    width: "25%",
                    position: "fixed",
                    inset: "60% 27% auto auto",
                  }}
                />
                <img
                  src={shaggi}
                  style={{
                    width: "20%",
                    position: "fixed",
                    inset: "58% 49% auto auto",
                  }}
                />

                <div
                  style={{
                    width: "21%",
                    position: "fixed",
                    height: "16%",
                    inset: "29% 33% auto auto",
                  }}
                >
                  <label className="rentalLabel">{temp.description}</label>
                </div>

                <table
                  style={{
                    width: "25%",
                    position: "fixed",
                    inset: "60% 27% auto auto",
                  }}
                ></table>
              </div>
            </div>
          </div>
        );
      } else {
        let raid = null;
        let infoqs = qs.parse(window.location.search).raid;
        let actual = 0;
        if (infoqs) {
          if (parseInt(infoqs) < 0 || parseInt(infoqs) > 3) {
            actual = 0;
            raid = this.state.raids[0];
          } else {
            actual = parseInt(infoqs);
            raid = this.state.raids[parseInt(infoqs)];
          }
        } else {
          raid = this.state.raids[0];
        }

        let lvl = parseInt(raid.lvl);
        let multiplier = parseInt(raid.multiplicator);
        let rara = raid.type;

        let detailsOFboss = Info[raid.boss];
        temp = Info[raid.boss][rara];

        let avatares = this.props.API_bucket.avatars || [];
        let avatarsOptions = avatares.map((avatar, index) => {
          if (avatar.properties.RENTEDINFO != "available") {
            return (
              <option
                index={index}
                key={index}
                value={avatar.id}
                className="opBlack"
              >
                {avatar.properties.NAME} - {this.getLVL(avatar.properties.XP)}
              </option>
            );
          }
        });
        return (
          <div className="authentication">
            <div
              className="overlay"
              style={{ display: this.state.showModalFarm ? "unset" : "none" }}
            ></div>
            <div className="raidsBackground" style={{ overflow: "auto" }}>
              <div className="container">
                <label
                  style={{
                    width: "24%",
                    position: "fixed",
                    inset: "10% 38% auto auto",
                    fontSize: "113%",
                  }}
                >
                  Boss: {detailsOFboss.title}
                </label>

                <img
                  src={triangle}
                  style={{
                    width: "4%",
                    position: "fixed",
                    inset: "40% 58% auto auto",
                    transform: "rotate( -29deg )",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    window.location.href = "/raids?raid=" + (actual - 1);
                  }}
                />

                <img
                  src={temp}
                  style={{
                    width: "15%",
                    position: "fixed",
                    inset: "23% 42% auto auto",
                  }}
                />

                <img
                  src={triangle}
                  style={{
                    width: "4%",
                    position: "fixed",
                    inset: "40% 38% auto auto",
                    transform: "rotate( 29deg )",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    window.location.href = "/raids?raid=" + (actual + 1);
                  }}
                />

                <img
                  src={shaggi}
                  style={{
                    width: "20%",
                    position: "fixed",
                    inset: "58% 49% auto auto",
                  }}
                />

                <label
                  style={{
                    width: "20%",
                    position: "fixed",
                    inset: "64% 38% auto auto",
                    fontSize: "70%",
                  }}
                >
                  min lvl: {this.getminlvl(lvl)}
                </label>

                <label
                  style={{
                    width: "20%",
                    position: "fixed",
                    inset: "66% 38% auto auto",
                    fontSize: "70%",
                  }}
                >
                  max lvl: {lvl}
                </label>

                <label
                  style={{
                    width: "20%",
                    position: "fixed",
                    inset: "68% 38% auto auto",
                    fontSize: "70%",
                  }}
                >
                  multiplier: {multiplier}X
                </label>

                <select
                  style={{
                    width: "15%",
                    position: "fixed",
                    inset: "66% 33% auto auto",
                  }}
                  onChange={this.onSelectavone}
                >
                  <option value={0} disabled defaultValue>
                    Choose Avatar
                  </option>
                  {avatarsOptions}
                </select>

                <label
                  style={{
                    width: "20%",
                    position: "fixed",
                    inset: "75% 28% auto auto",
                    fontSize: "77%",
                    cursor: "pointer",
                  }}
                >
                  more info
                </label>

                <label
                  style={{
                    width: "20%",
                    position: "fixed",
                    inset: "75% 20% auto auto",
                    fontSize: "77%",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    this.setAvatarOnRaid(raid._id);
                  }}
                >
                  set avatar
                </label>
              </div>
            </div>
          </div>
        );
      }
    }
  }

  getminlvl(lvl) {
    switch (lvl) {
      case 25:
        return 1;

      case 50:
        return 26;

      case 75:
        return 51;
      case 100:
        return 76;
    }
  }

  getLVL(xp) {
    if (xp >= 45 && xp <= 93) {
      return 1;
    } else if (xp >= 94 && xp <= 146) {
      return 2;
    } else if (xp >= 147 && xp <= 202) {
      return 3;
    } else if (xp >= 203 && xp <= 263) {
      return 4;
    } else if (xp >= 264 && xp <= 401) {
      return 5;
    } else if (xp >= 402 && xp <= 478) {
      return 6;
    } else if (xp >= 479 && xp <= 561) {
      return 7;
    } else if (xp >= 562 && xp <= 651) {
      return 8;
    } else if (xp >= 652 && xp <= 749) {
      return 9;
    } else if (xp >= 750 && xp <= 853) {
      return 10;
    } else if (xp >= 854 && xp <= 967) {
      return 11;
    } else if (xp >= 968 && xp <= 1089) {
      return 12;
    } else if (xp >= 1090 && xp <= 1221) {
      return 13;
    } else if (xp >= 1222 && xp <= 1364) {
      return 14;
    } else if (xp >= 1365 && xp <= 1518) {
      return 15;
    } else if (xp >= 1519 && xp <= 1658) {
      return 16;
    } else if (xp >= 1659 && xp <= 1865) {
      return 17;
    } else if (xp >= 1866 && xp <= 2059) {
      return 18;
    } else if (xp >= 2060 && xp <= 2269) {
      return 19;
    } else if (xp >= 2270 && xp <= 2495) {
      return 20;
    } else if (xp >= 2496 && xp <= 2740) {
      return 21;
    } else if (xp >= 2741 && xp <= 3004) {
      return 22;
    } else if (xp >= 3005 && xp <= 3289) {
      return 23;
    } else if (xp >= 3290 && xp <= 3597) {
      return 24;
    } else if (xp >= 3598 && xp <= 3930) {
      return 25;
    } else if (xp >= 3931 && xp <= 4290) {
      return 26;
    } else if (xp >= 4291 && xp <= 4678) {
      return 27;
    } else if (xp >= 4679 && xp <= 5097) {
      return 28;
    } else if (xp >= 5098 && xp <= 5550) {
      return 29;
    } else if (xp >= 5551 && xp <= 6039) {
      return 30;
    } else if (xp >= 6040 && xp <= 6567) {
      return 31;
    } else if (xp >= 6568 && xp <= 7138) {
      return 32;
    } else if (xp >= 7139 && xp <= 7754) {
      return 33;
    } else if (xp >= 7755 && xp <= 8419) {
      return 34;
    } else if (xp >= 8420 && xp <= 9138) {
      return 35;
    } else if (xp >= 9139 && xp <= 9914) {
      return 36;
    } else if (xp >= 9915 && xp <= 10752) {
      return 37;
    } else if (xp >= 10753 && xp <= 11657) {
      return 38;
    } else if (xp >= 11658 && xp <= 12635) {
      return 39;
    } else if (xp >= 12636 && xp <= 13690) {
      return 40;
    } else if (xp >= 13691 && xp <= 14831) {
      return 41;
    } else if (xp >= 14832 && xp <= 16062) {
      return 42;
    } else if (xp >= 16063 && xp <= 17392) {
      return 43;
    } else if (xp >= 17393 && xp <= 18829) {
      return 44;
    } else if (xp >= 18830 && xp <= 20380) {
      return 45;
    } else if (xp >= 20381 && xp <= 22055) {
      return 46;
    } else if (xp >= 22056 && xp <= 23865) {
      return 47;
    } else if (xp >= 23866 && xp <= 25819) {
      return 48;
    } else if (xp >= 25820 && xp <= 27930) {
      return 49;
    } else if (xp >= 27931 && xp <= 30209) {
      return 50;
    } else if (xp >= 30210 && xp <= 32671) {
      return 51;
    } else if (xp >= 32672 && xp <= 35330) {
      return 52;
    } else if (xp >= 35331 && xp <= 38201) {
      return 53;
    } else if (xp >= 38202 && xp <= 41302) {
      return 54;
    } else if (xp >= 41303 && xp <= 44651) {
      return 55;
    } else if (xp >= 44652 && xp <= 48269) {
      return 56;
    } else if (xp >= 48270 && xp <= 52175) {
      return 57;
    } else if (xp >= 52176 && xp <= 56394) {
      return 58;
    } else if (xp >= 56395 && xp <= 60951) {
      return 59;
    } else if (xp >= 60952 && xp <= 65872) {
      return 60;
    } else if (xp >= 65873 && xp <= 71187) {
      return 61;
    } else if (xp >= 71188 && xp <= 76927) {
      return 62;
    } else if (xp >= 76928 && xp <= 83126) {
      return 63;
    } else if (xp >= 83127 && xp <= 89821) {
      return 64;
    } else if (xp >= 89822 && xp <= 97051) {
      return 65;
    } else if (xp >= 97052 && xp <= 104861) {
      return 66;
    } else if (xp >= 104862 && xp <= 113295) {
      return 67;
    } else if (xp >= 113296 && xp <= 122403) {
      return 68;
    } else if (xp >= 122404 && xp <= 132240) {
      return 69;
    } else if (xp >= 132241 && xp <= 142865) {
      return 70;
    } else if (xp >= 142866 && xp <= 154339) {
      return 71;
    } else if (xp >= 154340 && xp <= 166731) {
      return 72;
    } else if (xp >= 166732 && xp <= 180115) {
      return 73;
    } else if (xp >= 180116 && xp <= 194569) {
      return 74;
    } else if (xp >= 194570 && xp <= 210179) {
      return 75;
    } else if (xp >= 210180 && xp <= 227039) {
      return 76;
    } else if (xp >= 227040 && xp <= 264912) {
      return 77;
    } else if (xp >= 264913 && xp <= 286150) {
      return 78;
    } else if (xp >= 286151 && xp <= 309087) {
      return 79;
    } else if (xp >= 309088 && xp <= 333859) {
      return 80;
    } else if (xp >= 333860 && xp <= 360612) {
      return 81;
    } else if (xp >= 360613 && xp <= 389506) {
      return 82;
    } else if (xp >= 389507 && xp <= 420712) {
      return 83;
    } else if (xp >= 420713 && xp <= 454414) {
      return 84;
    } else if (xp >= 454415 && xp <= 490812) {
      return 85;
    } else if (xp >= 490813 && xp <= 530122) {
      return 86;
    } else if (xp >= 530123 && xp <= 572577) {
      return 87;
    } else if (xp >= 572578 && xp <= 618428) {
      return 88;
    } else if (xp >= 618429 && xp <= 667947) {
      return 89;
    } else if (xp >= 667948 && xp <= 721428) {
      return 90;
    } else if (xp >= 721429 && xp <= 779187) {
      return 91;
    }
  }

  componentDidMount() {
    // enable these in production
    // this.auth();
    this.populateStore();
  }

  populateStore() {
    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        Swal.stopTimer();
      },
    });

    Toast.fire({
      icon: "success",
      title: "syncing",
    });

    const API =
      "https://hashkings.xyz/utest/" + localStorage.getItem("username");
    axios
      .get(API)
      .then((res) => {
        this.props.updateStoreFromAPI(res.data);

        console.log(res.data);
        this.setState({
          ...this.state,
          loading: false,
        });
      })
      .catch((err) => {
        console.log("se produjo un error aqui", err);
        Swal.resumeTimer();
        //window.location.href ="/login";
      });

    axios
      .get("https://hashkings.xyz/raids")
      .then((res) => {
        console.log(res);

        this.setState({
          ...this.state,
          raids: res.data.raids,
        });

        Swal.resumeTimer();
      })
      .catch((err) => {
        console.log("se produjo un error aqui", err);
        Swal.resumeTimer();
        //window.location.href ="/login";
      });
  }

  setAvatarOnRaid(raid) {
    if (!this.state.avatar) {
      alert("please select one avatar");
      return false;
    }

    let body = {
      raid: raid,
      avatar: this.state.avatar,
    };

    window.hive_keychain.requestCustomJson(
      localStorage.getItem("username"),
      "qwoyn_avatar_onraid",
      "Posting",
      `${JSON.stringify(body)}`,
      "Set avatar on raid",
      (res) => {
        console.log("posted");
      },
      null
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const API_bucket = state.API_bucket;
  return {
    state,
    API_bucket: API_bucket,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateStoreFromAPI: (API_bucket) =>
      dispatch({ type: "API UPDATE", payload: API_bucket }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Raids);
