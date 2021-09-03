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

import zeus from "../assets/img/NFTs/Zeus/Legendaria.gif";

import ana from "../assets/img/NFTs/Anna Kournikova/Legendaria.gif";
import * as qs from "query-string";

const Info = {
  zeus: {
    description: "bla bla bla bla bla",
    image: zeus,
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
                  src={zeus}
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
