import React from "react";

import { connect } from "react-redux";

import Modal from "react-bootstrap/Modal";
import PlotsPNG from "../../assets/img/miniatures/Miniatura1.png";
// import SeedsPNG from '../../assets/img/regions/africa.png';
import WaterPNG from "../../assets/img/H2O.png";
import BudsPNG from "../../assets/img/ui/BUDS.png";
import MotaPNG from "../../assets/img/ui/Moneda2.png";
import { extractStat } from "../headerTab";
import ProfilePictureModal from "./profilePicture";
import ClosePNG from "../../assets/img/ui/x close.png";
import SeedPNG from "../../assets/img/ui/Boto seeds.png";
import PlotPNG from "../../assets/img/ui/Logo plots.png";
import FrascoPNG from "../../assets/img/ui/Frasco.png";
import CashPNG from "../../assets/img/ui/Boton cash.png";
import ProfilePictures from "../../assets/img/profile_pictures";
import profile_pictures from "../../assets/img/profile_pictures";
import TransferButton from "../../assets/img/ui/transfer.png";
import UpgradeButton from "../../assets/img/ui/upgrade.png";
import { regionsImgs } from "../../assets/img/regions";

import activePlots, { getPlantedSeed } from "../configs/activePlots";
import { Farm } from "../configs/farming";

function ProfileModal(props) {
  const [showPPModal, setShowPPModal] = React.useState(false);

  const [selectedForUpgrade, setSelectedForUpgrade] = React.useState({
    name: "",
    image: "",
    actions: "",
  });

  const [selectedForWaterUpgrade, setSelectedForWaterUpgrade] = React.useState({
    name: "",
    image: "",
    actions: "",
  });

  const [showUpgradeModal, setShowUpgradeModal] = React.useState("none");

  const [showWaterUpgradeModal, setShowWaterUpgradeModal] = React.useState(
    "none"
  );

  const [UserToTransfer, setUserToTransfer] = React.useState("");
  const [CantidadToTransfer, setCantidadToTransfer] = React.useState("");

  const [UserToTransferBUD, setUserToTransferBUD] = React.useState("");
  const [CantidadToTransferBUD, setCantidadToTransferBUD] = React.useState("");

  const [UserToTransferONE, setUserToTransferONE] = React.useState("");
  const [CantidadToTransferONE, setCantidadToTransferONE] = React.useState("");

  const togglePPModal = () => setShowPPModal(!showPPModal);

  const user = () =>
    props.user !== undefined ? props.user : { seeds: [{ water: 0 }] };

  const getStat = (stat) => {
    return props.user !== undefined ? (
      props.user[stat]
    ) : (
      <i className="fa fa-circle-o-notch fa-spin text-danger"></i>
    );
  };

  const totalWater = (user) => {
    let totalWater = 0;

    user.seeds.forEach((seed) => {
      totalWater += seed.water;
    });

    return totalWater;
  };

  const totalPlotsByRegion = (user) => {
    let plotsObj = user.plots;
    plotsObj = plotsObj.map((e) => e.properties.NAME);

    let plots = plotsObj.reduce((output, current) => {
      if (output[current]) {
        output[current] += 1;
      } else {
        output[current] = 1;
      }
      // console.log(output);

      return output;
    }, {});
    // remove words like JamaicaUsed, AfricaUsed, etc
    // plots = plots.filter(plot => plot.toLowerCase().indexOf('used') == -1);
    //console.log("SACANDO TOTAL D EPLOT", plots, plotsObj);

    return Object.keys(plots).map((plot) => (
      <li key={plots[plot]}>
        {plot} <span>{plots[plot]}</span>
      </li>
    ));
  };

  const totalSeedsByType = (user) => {
    const seedsArray = user.seeds;
    let plotsObj = seedsArray.map((e) => e.properties.NAME);

    let plots = plotsObj.reduce((output, current) => {
      if (output[current]) {
        output[current] += 1;
      } else {
        output[current] = 1;
      }
     // console.log(output);

      return output;
    }, {});

    return Object.keys(plots).map((seed) => (
      <li key={seed}>
        {seed} <span>{plots[seed]}</span>
      </li>
    ));
  };

  const showStatPopup = (idx) => {
    const popup = document.querySelector(
      `#profile-modal .remnant-item > .popup[aria-label="${idx}"]`
    );
    const popups = document.querySelectorAll(
      `#profile-modal .remnant-item > .popup`
    );

    popups.forEach((popup) => {
      popup.classList.remove("active");
    });
    popup.classList.add("active");
  };

  const getTokenCount = (token) =>
    props.user !== undefined
      ? parseInt(props.user.tokens[token].balance) +
        parseInt(props.user.tokens[token].stake)
      : "";

  const upgradeModal = () => {
    const item = selectedForUpgrade;
    const { actions } = item;

    console.log("re render");
    // const popups = document.querySelectorAll(`.upgrade-modal .popup`);
    //  popups.forEach((popup) => popup.classList.remove("active"));

    return (
      <div
        key={"buds-" + item.item}
        className="upgrade-modal"
        style={{ display: showUpgradeModal }}
      >
        <img
          onClick={(e) => setShowUpgradeModal("none")}
          className="close-btn highlight-on-hover"
          src={ClosePNG}
        />
        <div className="details">
          <div className="image-wrapper">
            <img src={item.image} />
          </div>
          <div className="title">{item.name}</div>
          <div data-key="1" className="popup p-2">
            <label className="small d-block">Recipient's username:</label>
            <input
              onChange={(event) => setUserToTransferONE(event.target.value)}
              className="form-control"
              name={"recipentTree"}
              type="text"
            />
            <label className="small d-block">Quantity:</label>
            <input
              onChange={(event) => setCantidadToTransferONE(event.target.value)}
              className="form-control"
              name={"cantidadsend" + item.item}
              type="number"
            />
            <div className="text-center">
              <img
                onClick={(e) =>
                  Farm.transfer(
                    props.username,
                    UserToTransferONE,
                    selectedForUpgrade.item,
                    CantidadToTransferONE
                  )
                }
                className="action-btn highlight-on-hover"
                src={TransferButton}
              />
            </div>
          </div>
          <div data-key="2" className="popup p-2">
            <h5 className="text-center">Requirements</h5>
            <div className="tag text-center">$1</div>
            <div className="text-center">
              <img
                onClick={(e) =>
                  Farm.upgrade(props.username, selectedForUpgrade.item)
                }
                className="action-btn highlight-on-hover"
                src={UpgradeButton}
              />
            </div>
          </div>
        </div>
        <div className="actions">
          {(() => {
            if (actions.includes("upgrade"))
              return (
                <>
                  <div
                    onClick={(e) => {
                      const popups = document.querySelectorAll(
                        `.upgrade-modal .popup`
                      );
                      popups.forEach((popup) =>
                        popup.classList.remove("active")
                      );

                      const popup = document.querySelector(
                        `.upgrade-modal .popup[data-key="2"]`
                      );
                      popup.classList.add("active");
                    }}
                  >
                    UPGRADE
                  </div>
                  <div
                    onClick={(e) => {
                      const popups = document.querySelectorAll(
                        `.upgrade-modal .popup`
                      );
                      popups.forEach((popup) =>
                        popup.classList.remove("active")
                      );

                      const popup = document.querySelector(
                        `.upgrade-modal .popup[data-key="1"]`
                      );
                      popup.classList.add("active");
                    }}
                  >
                    TRANSFER
                  </div>
                </>
              );
            else
              return (
                <>
                  <div
                    onClick={(e) => {
                      const popups = document.querySelectorAll(
                        `.upgrade-modal .popup`
                      );
                      /* 
                       popups.forEach((popup) =>
                        popup.classList.remove("active")
                        );
 
                        */
                      const popup = document.querySelector(
                        `.upgrade-modal .popup[data-key="1"]`
                      );
                      popup.classList.add("active");
                    }}
                  >
                    TRANSFER
                  </div>
                </>
              );
          })()}
        </div>
      </div>
    );
  };

  const waterUpgradeModal = () => {
    const item = selectedForWaterUpgrade;
    const { actions } = item;

    //  const popups = document.querySelectorAll(`.upgrade-modal .popup`);
    //  popups.forEach((popup) => popup.classList.remove("active"));

    return (
      <div
        key={item.item}
        className="water-upgrade-modal"
        style={{ display: showWaterUpgradeModal }}
      >
        <img
          onClick={(e) => setShowWaterUpgradeModal("none")}
          className="close-btn highlight-on-hover"
          src={ClosePNG}
        />
        <div className="details">
          <div className="image-wrapper">
            <img src={item.image} />
          </div>
          <div className="title">{item.name}</div>
          <div data-key="1" className="popup p-2">
            <label className="small d-block">Recipient's username:</label>
            <input
              onChange={(eventx) => setUserToTransferONE(eventx.target.value)}
              className="form-control"
              name="recipientONE"
              type="text"
            />
            <label className="small d-block">Quantity:</label>
            <input
              onChange={(eventx) =>
                setCantidadToTransferONE(eventx.target.value)
              }
              className="form-control"
              name="cantidadONE"
              type="number"
            />

            <div className="text-center">
              <img
                onClick={(e) =>
                  Farm.transfer(
                    props.username,
                    UserToTransferONE,
                    item.item,
                    CantidadToTransferONE
                  )
                }
                className="action-btn highlight-on-hover"
                src={TransferButton}
              />
            </div>
          </div>
          <div
            data-key="2"
            className="popup p-2"
            style={{ maxHeight: "900px", overflowY: "scroll" }}
          >
            <h5 className="text-center">Active Plots</h5>
            {activePlots(user().plots).map((plot) => (
              <div
                key={plot.id}
                className="active-plot mb-2"
                style={{ minWidth: "200px" }}
              >
                <div className="d-flex flex-row justify-content-between">
                  <span>{plot.properties.NAME}</span>
                  <img
                    style={{
                      width: "40px",
                      height: "auto",
                      borderRadius: "50%",
                    }}
                    src={
                      regionsImgs[
                        plot.properties.NAME.toLowerCase().replace(" ", "")
                      ]
                    }
                    alt={plot.properties.NAME}
                  />
                </div>
                <div className="small">
                  <div>
                    Requirement:{" "}
                    {getPlantedSeed(plot, user().seeds).properties.WATER} water
                  </div>
                  <button
                    onClick={(e) =>
                      Farm.water(
                        props.username,
                        plot.id,
                        getPlantedSeed(plot, user().seeds).id
                      )
                    }
                    className="btn btn-primary small py-0 px-1 btn-block"
                  >
                    Water
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="actions">
          <div
            onClick={(e) => {
              const popups = document.querySelectorAll(
                `.water-upgrade-modal .popup`
              );
              popups.forEach((popup) => popup.classList.remove("active"));

              const popup = document.querySelector(
                `.water-upgrade-modal .popup[data-key="2"]`
              );
              popup.classList.add("active");
            }}
          >
            WATER PLOTS
          </div>
          <div
            onClick={(e) => {
              const popups = document.querySelectorAll(
                `.water-upgrade-modal .popup`
              );
              popups.forEach((popup) => popup.classList.remove("active"));

              const popup = document.querySelector(
                `.water-upgrade-modal .popup[data-key="1"]`
              );
              popup.classList.add("active");
            }}
          >
            TRANSFER
          </div>
        </div>
      </div>
    );
  };

  const getProfilePicture = () => {
    if (user().avatars && user().avatars.length > 0) {
      let pp = Object.keys(profile_pictures).find(
        (key) => profile_pictures[key].name == user().avatars[0].properties.NAME
      );

      return profile_pictures[pp].image;
    } else {
      return profile_pictures.Tifiko.image;
    }
  };

  return (
    <Modal
      show={props.show}
      onHide={() => props.hideModal("profile")}
      size={props.size || null}
      centered
    >
      <div id="profile-modal" className="base-modal">
        <img
          onClick={() => props.hideModal("profile")}
          className="close-btn highlight-on-hover"
          src={ClosePNG}
        />
        <div className="body">
          {upgradeModal()}
          {waterUpgradeModal()}
          <div className="d-flex flex-row justify-content-between">
            <div
              onClick={(e) => {} /*togglePPModal() */}
              className="profile-image-wrapper highlight-on-hover"
            >
              <img src={getProfilePicture()} alt={props.username} />
              <span className="user-username">{`${props.username.toUpperCase()}'S PROFILE`}</span>
            </div>
            <ProfilePictureModal
              show={showPPModal}
              onhide={() => togglePPModal()}
            />
            <div className="stats-wrapper d-flex flex-column justify-content-around">
              <div className="item">
                <h3>Total Plots</h3>
                <div className="content">
                  <img src={PlotPNG} />
                  <span>{user().plotCount}</span>
                </div>
              </div>
              <div className="item">
                <h3>Total Seeds</h3>
                <div className="content">
                  <img src={SeedPNG} />
                  <span>{user().seedCount}</span>
                </div>
              </div>
              <div className="item">
                <h3>Total HKWater</h3>
                <div className="content">
                  <img src={WaterPNG} alt="Total HkWater" />
                  <span>{user().hkwater}</span>
                </div>
              </div>
            </div>
            {/*-- --*/}
            <div className="left-over-wrapper">
              <div className="remnant-item">
                <h3>Total seeds by type</h3>
                <div className="image-wrapper">
                  <span onClick={(e) => showStatPopup("1")}>
                    <img className="highlight-on-hover" src={SeedPNG} />
                  </span>
                </div>
                <div className="popup" aria-label="1">
                  <ul>{totalSeedsByType(user())}</ul>
                </div>
              </div>
              <div className="remnant-item">
                <h3>Total plots by region</h3>
                <div className="image-wrapper">
                  <span onClick={(e) => showStatPopup("2")}>
                    <img className="highlight-on-hover" src={PlotPNG} />
                  </span>
                </div>
                <div className="popup" aria-label="2">
                  <ul>{totalPlotsByRegion(user())}</ul>
                </div>
              </div>
            </div>
          </div>
          <div className="lower-strip d-flex flex-row justify-content-between">
            <div className="item">
              <div className="jumbo d-flex flex-column justify-content-around">
                <img
                  key="kal-3"
                  onClick={(e) => {
                    setSelectedForUpgrade({
                      item: "mota",
                      name: "mota",
                      image: MotaPNG,
                      id: "mota",
                      actions: ["transfer"],
                      upgradeFunction: (e) => alert(`Upgrade: Mota`),
                    });

                    setShowUpgradeModal("block");
                  }}
                  className="highlight-on-hover"
                  title="Click to expand"
                  src={MotaPNG}
                />
                <span>total mota</span>
              </div>
              <div className="figure">{getTokenCount("mota")}</div>
            </div>
            <div className="item">
              <div className="jumbo d-flex flex-column justify-content-around">
                <img
                  key="kal-2"
                  onClick={(e) => {
                    setSelectedForUpgrade({
                      item: "buds",
                      name: "buds",
                      image: BudsPNG,
                      id: "buds",
                      actions: ["transfer"],
                      upgradeFunction: (e) => alert(`Upgrade: Buds`),
                    });
                    setShowUpgradeModal("block");
                  }}
                  className="highlight-on-hover"
                  title="Click to expand"
                  src={BudsPNG}
                />
                <span>total buds</span>
              </div>
              <div className="figure">{getTokenCount("buds")}</div>
            </div>
            <div className="item">
              <div className="jumbo d-flex flex-column justify-content-around align-center">
                <img
                  key="kal-1"
                  onClick={(e) => {
                    setShowUpgradeModal("none");
                    setSelectedForWaterUpgrade({
                      item: "water",
                      name: "water",
                      image: WaterPNG,
                      id: "water",
                      actions: ["transfer"],
                      upgradeFunction: (e) => alert(`Upgrade: Water`),
                    });
                    setShowWaterUpgradeModal("block");
                  }}
                  className="highlight-on-hover"
                  title="Click to expand"
                  src={WaterPNG}
                />

                <span>total hkwater</span>
              </div>
              <div className="figure">{getStat("hkwater")}</div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}

const mapStateToProps = (state, ownProps) => {
  let user = state.API_bucket;
  user = user ? user : state.API_bucket;
  return {
    ...ownProps,
    user,
    username: localStorage.getItem("username"),
  };
};

export default connect(mapStateToProps)(ProfileModal);
