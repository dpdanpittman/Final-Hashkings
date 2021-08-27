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

import shaggi from "../assets/img/Boss info/Shaggi.png";
import info from "../assets/img/Boss info/Info.png";
import ranking from "../assets/img/Boss info/Ranking.png";

import zeus from "../assets/img/jefes/Zeus.png";

import ana from "../assets/img/NFTs/Anna Kournikova/Legendaria.gif";

class Raids extends Component {
  constructor(props) {
    super(props);
    this.state = {};
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
      return (
        <div className="authentication">
          <div
            className="overlay"
            style={{ display: this.state.showModalFarm ? "unset" : "none" }}
          ></div>
          <div className="raidsBackground" style={{ overflow: "auto" }}>
            <div className="container">
              <img
                src={ana}
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
                <label className="rentalLabel">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</label>
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
    }
  }

  componentDidMount() {
    // enable these in production
    // this.auth();
    console.log("okeeo");
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
          myrentData: res.data.rented,
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
