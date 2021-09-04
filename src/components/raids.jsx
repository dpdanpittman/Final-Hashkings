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
import withReactContent from "sweetalert2-react-content";
import logo from "../assets/img/logo.png";
import triangle from "../assets/img/triangleselection.png";
import shaggi from "../assets/img/Boss info/Shaggi.png";
import info from "../assets/img/Boss info/Info.png";
import ranking from "../assets/img/Boss info/Ranking.png";

/* --------------ZEUS-------------- */
import zeusLegendaria from "../assets/img/NFTs/Zeus/Legendaria.gif";
import zeusMitica from "../assets/img/NFTs/Zeus/Mitica.gif";
import zeusRara from "../assets/img/NFTs/Zeus/Rara.png";
import zeusEpica from "../assets/img/NFTs/Zeus/Epica.png";
import zeusComun from "../assets/img/NFTs/Zeus/Comun.png";

/* --------------ANNA-------------- */

import annaLegendaria from "../assets/img/NFTs/Anna Kournikova/Legendaria.gif";
import annaMitica from "../assets/img/NFTs/Anna Kournikova/Mitica.gif";
import annaRara from "../assets/img/NFTs/Anna Kournikova/Rara.png";
import annaEpica from "../assets/img/NFTs/Anna Kournikova/Epica.png";
import annaComun from "../assets/img/NFTs/Anna Kournikova/Comun.png";

/* --------------Chameleon-------------- */

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


/* --------------Melissa-------------- */

import MichelangeloLegendaria from "../assets/img/NFTs/Michelangelo/Legendaria.gif";
import MichelangeloMitica from "../assets/img/NFTs/Michelangelo/Mitica.gif";
import MichelangeloRara from "../assets/img/NFTs/Michelangelo/Rara.png";
import MichelangeloEpica from "../assets/img/NFTs/Michelangelo/Epica.png";
import MichelangeloComun from "../assets/img/NFTs/Michelangelo/Comun.png";


/* --------------Mydoom-------------- */

import MydoomLegendaria from "../assets/img/NFTs/Mydoom/Legendaria.gif";
import MydoomMitica from "../assets/img/NFTs/Mydoom/Mitica.gif";
import MydoomRara from "../assets/img/NFTs/Mydoom/Rara.png";
import MydoomEpica from "../assets/img/NFTs/Mydoom/Epica.png";
import MydoomComun from "../assets/img/NFTs/Mydoom/Comun.png";


/* --------------Sobig-------------- */

import SobigLegendaria from "../assets/img/NFTs/Sobig/Legendaria.gif";
import SobigMitica from "../assets/img/NFTs/Sobig/Mitica.gif";
import SobigRara from "../assets/img/NFTs/Sobig/Rara.png";
import SobigEpica from "../assets/img/NFTs/Sobig/Epica.png";
import SobigComun from "../assets/img/NFTs/Sobig/Comun.png";

import * as qs from "query-string";

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
  sobig: {
    title: "sobig",
    description: "bla bla bla bla bla",
    comun: SobigComun,
    rara: SobigRara,
    epica: SobigEpica,
    mitica: SobigMitica,
    legendaria: SobigLegendaria,
  },
  mydoom: {
    title: "mydoom",
    description: "bla bla bla bla bla",
    comun: MydoomComun,
    rara: MydoomRara,
    epica: MydoomEpica,
    mitica: MydoomMitica,
    legendaria: MydoomLegendaria,
  },
};


class Raids extends Component {
  constructor(props) {
    super(props);
    this.state = {
      info: {},
      loading: true,
      avatar: 0,
    };
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
                {avatar.properties.NAME} - {avatar.POWER}
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
                  Boss: Lord comander zeus
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
                />

                <img
                  src={zeusMitica}
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
                    inset: "66% 38% auto auto",
                    fontSize: "77%",
                  }}
                >
                  Raid lvl:
                </label>

                <select
                  style={{
                    width: "15%",
                    position: "fixed",
                    inset: "66% 33% auto auto",
                  }}
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

        Swal.resumeTimer();
      })
      .catch((err) => {
        console.log("se produjo un error aqui", err);
        Swal.resumeTimer();
        //window.location.href ="/login";
      });
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
