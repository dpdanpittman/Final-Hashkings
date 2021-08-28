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

import forge from "../assets/img/Forge/Fondo.png";

import LogoForge from "../assets/img/Forge/Logo.png";

class Forge extends Component {
  constructor(props) {
    super(props);
    this.state = {
      info: {},
      loading: true,
      avone: 0,
      avtwo: 0,
    };
    this.onSelectavone = this.onSelectavone.bind(this);
    this.onSelectavtwo = this.onSelectavtwo.bind(this);
    this.forjar = this.forjar.bind(this);
  }

  onSelectavone(e) {
    this.setState({ ...this.state, avone: e.target.value });
  }
  onSelectavtwo(e) {
    this.setState({ ...this.state, avtwo: e.target.value });
  }

  forjar() {
    if (
      this.state.avone != 0 &&
      this.state.avtwo != 0 &&
      this.state.avone != this.state.avtwo
    ) {
      let body = [
        {
          contractName: "nft",
          contractAction: "transfer",
          contractPayload: {
            nfts: [
              {
                symbol: "HKFARM",
                ids: [this.state.avone, this.state.avtwo],
              },
            ],
            to: "hashkings",
            memo: "forge",
          },
        },
      ];

      window.hive_keychain.requestCustomJson(
        localStorage.getItem("username"),
        "ssc-mainnet-hive",
        "Active",
        `${JSON.stringify(body)}`,
        "Forge",
        (res) => {
          console.log("posted");
        },
        null
      );
    } else {
      alert("please select two avatars");
    }
  }

  render() {
    let { loading, rentalLoading } = this.state;

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
              {avatar.properties.NAME} - {avatar.id}
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
          <div className="ForgeBackground" style={{ overflow: "auto" }}>
            <div className="container">
              <img
                src={forge}
                style={{
                  width: "48%",
                  position: "fixed",
                  inset: "2% 27% auto auto",
                }}
              />

              <img
                src={LogoForge}
                style={{
                  width: "11%",
                  position: "fixed",
                  inset: "54% 39% auto auto",
                  cursor: "pointer",
                }}
                onClick={() => {
                  this.forjar();
                }}
              />

              <label
                style={{
                  width: "27%",
                  position: "fixed",
                  inset: "10% 37% auto auto",
                }}
              >
                Select your avatars for forge
              </label>

              <select
                className="form-select"
                aria-label="Default select example"
                style={{
                  width: "18%",
                  position: "fixed",
                  inset: "26% 53% auto auto",
                }}
                onChange={this.onSelectavone}
              >
                <option disabled defaultValue>
                  Choose Avatar
                </option>
                {avatarsOptions}
              </select>

              <select
                className="form-select"
                aria-label="Default select example"
                style={{
                  width: "18%",
                  position: "fixed",
                  inset: "26% 31% auto auto",
                }}
                onChange={this.onSelectavtwo}
              >
                <option disabled defaultValue>
                  Choose Avatar
                </option>
                {avatarsOptions}
              </select>
            </div>
          </div>
        </div>
      );
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

export default connect(mapStateToProps, mapDispatchToProps)(Forge);
