import React, { useState } from "react";

import { connect } from "react-redux";
import Button from "react-bootstrap/Button";

import Modal from "react-bootstrap/Modal";
import H2OPNG from "../assets/img/ui/H2O.png";
import BudsPNG from "../assets/img/ui/BUDS.png";
import MotaPNG from "../assets/img/ui/Moneda2.png";
import XpPNG from "../assets/img/ui/Icono XP.png";
import LvPNG from "../assets/img/ui/Level.png";
import FarmerPNG from "../assets/img/profile_pictures/Farmer.png";
import Profiles from "../assets/img/profile_pictures";
import Spirit from "../assets/img/spiritswap_logo.png";
import tron from "../assets/img/tron.png";
import Send from "../assets/img/ui/transfer.png";

import ClosePNG from "../assets/img/ui/x close.png";

import Web3 from "web3";

function HeaderTab(props) {
  const [showModal, setshowModal] = useState(false);

  const [showFantomModal, setshowFantomModal] = useState(false);

  const [paddress, setpaddress] = useState("");

  // console.log(" User Dets :>> ", props.userDets)
  const getXPWidth = (xp) => `${xp}px`;

  const getStat = (stat) => {
    console.log("", props.userDets);
    return props.userDets !== undefined ? (
      props.userDets.tokens.hkwater[stat]
    ) : (
      <i className="fa fa-circle-o-notch fa-spin text-danger"></i>
    );
  };

  const user = () => (props.userDets !== undefined ? props.userDets : {});

  const getActiveImage = () => {
    let userx = user();

    for (const key of Object.keys(Profiles)) {
      let name = Profiles[key].name;
      if (userx.activeAvatar.hasOwnProperty("properties")) {
        if (name == userx.activeAvatar.properties.NAME) {
          return Profiles[key].image;
        }
      } else {
        return "";
      }
    }

    return FarmerPNG;
  };

  const getPhantomAddresses = () => {
    let userx = user();
    return userx.fantomadrs ? userx.fantomadrs : "none";
  };

  return (
    <section
      id="header-tab"
      className="bg-bg-transparent col-12 col-md-7 d-flex flex-row justify-content-around"
      style={{ height: "60px", padding: "0px" }}
    >
      <div
        className="overlayheader overlayheader d-flex flex-row"
        style={{
          flexWrap: "nowrap",
          alignContent: "center",
          justifyContent: " space-around",
        }}
      >
        <Button
          variant="link"
          onClick={() => props.showProfile()}
          style={{ padding: "0px" }}
        >
          <div className="icon-group">
            <img src={getActiveImage()} alt="My Profile" title="My Profile" />
            <div className="tag">{props.user}</div>
          </div>
        </Button>
        <Button
          variant="link"
          onClick={() => props.showWater()}
          style={{ padding: "0px" }}
        >
          <div className="icon-group">
            <img src={H2OPNG} alt="WATER" title="WATER" />
            <div className="tag">{getStat("balance")}</div>
          </div>
        </Button>
        <Button
          variant="link"
          onClick={() => props.showBuds()}
          style={{ padding: "0px" }}
        >
          <div className="icon-group">
            <img src={MotaPNG} alt="MOTA" title="MOTA" />
            <div className="tag">
              {parseInt(user().tokens.mota.stake) +
                parseInt(user().tokens.mota.balance)}
            </div>
          </div>
        </Button>
        <Button variant="link">
          <div className="icon-group">
            <img src={BudsPNG} alt="BUDS" title="BUDS" />
            <div className="tag">
              {parseInt(user().tokens.buds.stake) +
                parseInt(user().tokens.buds.balance)}
            </div>
          </div>
        </Button>
        <Button variant="link">
          <div className="icon-group">
            <img
              style={{ transform: "scale(1.2)" }}
              src={XpPNG}
              alt="XP"
              title="XP"
            />
            <div className="tag">
              <em>{parseInt(user().xp)}</em>
            </div>
          </div>
        </Button>
        <Button variant="link">
          <div className="icon-group">
            <img
              style={{ transform: "scale(1.2)" }}
              src={LvPNG}
              alt="LV"
              title="LV"
            />
            <div className="tag">
              <em>{parseInt(user().lvl)}</em>
            </div>
          </div>
        </Button>
        <Button
          style={{ display: "contents" }}
          variant="link"
          onClick={() => setshowModal(true)}
        >
          <div className="icon-group">
            <img
              style={{ transform: "scale(1.2)", maxWidth: "75px" }}
              src={Send}
              alt="LINK"
              title="LINK"
            />
          </div>
        </Button>
      </div>

      <Modal
        size="lg"
        show={showFantomModal}
        onHide={() => setshowFantomModal(false)}
        centered
        style={{ zIndex: "99999" }}
      >
        <div
          id="profile-modal-rent"
          className="modal-transparent-overlay"
          className="base-modal"
        >
          <img
            onClick={() => setshowFantomModal(false)}
            className="close-btn highlight-on-hover"
            src={ClosePNG}
          />
          <h1>Set your Fantom address</h1>
          <p>
            Your actual Fantom address is:{" "}
            <strong>{getPhantomAddresses()} </strong>
          </p>

          <input
            onChange={(e) => setpaddress(e.target.value)}
            type="text"
            style={{
              marginTop: "5%",
              marginLeft: "0%",
              padding: "2%",
              width: "-webkit-fill-available",
              border: "0",
            }}
          />
          <Button
            style={{ marginTop: "10px" }}
            onClick={() => setrentar(paddress)}
          >
            Set address
          </Button>
        </div>
      </Modal>

      <Modal
        size="lg"
        show={showModal}
        onHide={() => setshowModal(false)}
        centered
        style={{ zIndex: "99999" }}
      >
        <div
          id="profile-modal-rent"
          className="modal-transparent-overlay"
          className="base-modal"
        >
          <img
            onClick={() => setshowModal(false)}
            className="close-btn highlight-on-hover"
            src={ClosePNG}
          />
          <h1 style={{textAlign: "center",}}>Set your brige addresses</h1>

          <div className="row">
            <div className="col-12 col-md-6">
              <Button
                style={{ display: "contents" }}
                variant="link"
                onClick={() => setshowFantomModal(true)}
              >
                <div className="icon-group">
                  <img
                    style={{ transform: "scale(1.2)", maxWidth: "75px" }}
                    src={Spirit}
                    alt="LINK"
                    title="LINK"
                  />
                </div>
              </Button>
            </div>
            <div className="col-12 col-md-6">
              <Button
                style={{ display: "contents", filter:"grayscale(1)" }}
                variant="link"
                onClick={() => { /*setshowFantomModal(true)*/}}
              >
                <div className="icon-group">
                  <img
                    style={{ transform: "scale(1.2)", maxWidth: "75px", filter:"grayscale(1)" }}
                    src={tron}
                    alt="LINK"
                    title="LINK"
                  />
                </div>
              </Button>
            </div>
          </div>
        </div>
      </Modal>
    </section>
  );
}

const setrentar = (paddress) => {
  if (!paddress) {
    return;
  }
  let body = {
    adrs: paddress,
  };

  let web3 = new Web3("https://rpc.testnet.fantom.network/");

  if (web3.utils.isAddress(paddress)) {
    window.hive_keychain.requestCustomJson(
      localStorage.getItem("username"),
      "qwoyn_set_adrs",
      "Posting",
      `${JSON.stringify(body)}`,
      "Setting address",
      (res) => {
        console.log("posted");
      },
      null
    );
  } else {
    alert("Invalid address");
  }
  /*

*/
};

const mapStateToProps = (state, ownProps) => {
  let user = state.API_bucket;
  console.log("header", user);

  return {
    user: localStorage.getItem("username"),
    bucket: state.API_bucket,
    userDets: user,
  };
};

// next: mapDispatch to update state with areas so that sidebar can pull and fix onclick

export default connect(mapStateToProps)(HeaderTab);
