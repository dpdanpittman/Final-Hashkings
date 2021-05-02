import React, { Component } from "react";

import { connect } from "react-redux";
import Modal from "react-bootstrap/Modal";

import { seedsImgs } from "../../assets/img/seeds/index";
import { regionsImgs } from "../../assets/img/regions/index";
import { waterTowersImgs } from "../../assets/img/watertowers/index";
import { timeBoostersImgs } from "../../assets/img/time_boosters";
import xpBoostersImgs from "../../assets/img/xp_boosters";
import ClosePNG from "../../assets/img/ui/x close.png";
import TransferButton from "../../assets/img/ui/transfer.png";
import UpgradeButton from "../../assets/img/ui/upgrade.png";

import DisplayLoader from "./displayLoader";

import { Farm } from "../configs/farming";

class InventoryModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedForUpgrade: {
        name: "",
        image: "",
        actions: [],
      },
      showUpgradeModal: "none",
    };
  }

  upgradeModal() {
    const item = this.state.selectedForUpgrade;
    const { actions } = item;

    const popups = document.querySelectorAll(`.upgrade-modal .popup`);
    popups.forEach((popup) => popup.classList.remove("active"));

    return (
      <div
        className="upgrade-modal"
        style={{ display: this.state.showUpgradeModal }}
      >
        <img
          onClick={(e) => this.setState({ showUpgradeModal: "none" })}
          className="close-btn highlight-on-hover"
          src={ClosePNG}
        />
        <div className="details">
          <div
            className="image-wrapper"
            style={{ textAlign: "center !important" }}
          >
            <img src={item.image} />
          </div>
          <div className="title">{item.name}</div>

          <div
            key={this.state.selectedForUpgrade.name}
            data-key="1"
            className="popup p-2"
          >
            <label className="small d-block">Recipient's username:</label>
            <input className="form-control" name="recipient" type="text" />
            <label className="small d-block">Quantity:</label>
            <input className="form-control" name="cantidad" type="number" />
            <div className="text-center">
              <img
                onClick={(e) =>
                  Farm.transfer(
                    this.props.username,
                    this.state.selectedForUpgrade.item,
                    item.name
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
              {/* upgrade tower plant */}
              <img
                onClick={(e) =>
                  this.props.upgradeWaterTower({
                    username: this.props.username,
                    waterTower: this.state.selectedForUpgrade,
                  })
                }
                className="action-btn highlight-on-hover"
                src={UpgradeButton}
              />
            </div>
          </div>
          <div data-key="3" className="popup p-2">
            <h5 className="text-center">Requirements</h5>
            <div className="tag text-center">free</div>

            <div className="text-center">
              <img
                onClick={(e) => {
                  let payload = {
                    username: this.props.username,
                    obj: this.state.selectedForUpgrade.item,
                  };
                  this.props.subdivide(payload);
                }}
                className="action-btn highlight-on-hover"
                src={UpgradeButton}
              />
            </div>
          </div>
        </div>
        <div className="actions">
          {(() => {
            if (actions.includes("smoke")) {
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

                      Farm.smoke(
                        this.props.username,
                        this.state.selectedForUpgrade.item
                      );
                    }}
                  >
                    SMOKE
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
            } else if (actions.includes("subdivide")) {
              return (
                <>
                  {this.state.selectedForUpgrade.item.properties.SUBDIVIDED ? (
                    <div>RENT (soon)</div>
                  ) : (
                    <div
                      onClick={(e) => {
                        const popups = document.querySelectorAll(
                          `.upgrade-modal .popup`
                        );
                        popups.forEach((popup) =>
                          popup.classList.remove("active")
                        );

                        const popup = document.querySelector(
                          `.upgrade-modal .popup[data-key="3"]`
                        );
                        popup.classList.add("active");
                      }}
                    >
                      SUBDIVIDE
                    </div>
                  )}
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
            } else if (actions.includes("plant")) {
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
                        `.upgrade-modal .popup[data-key="1"]`
                      );
                      popup.classList.add("active");
                    }}
                  >
                    TRANSFER
                  </div>
                </>
              );
            } else if (actions.includes("upgrade")) {
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
                </>
              );
            } else {
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
                        `.upgrade-modal .popup[data-key="1"]`
                      );
                      popup.classList.add("active");
                    }}
                  >
                    TRANSFER
                  </div>
                </>
              );
            }
          })()}
        </div>
      </div>
    );
  }

  render() {
    return (
      <>
        {this.props.displayUpgradeWaterPlantModal ? (
          <DisplayLoader></DisplayLoader>
        ) : (
          <></>
        )}
        <Modal
          show={this.props.show}
          onHide={() => this.props.hideModal("inventory")}
          size={this.props.size || null}
          centered
        >
          <div id="inventory-modal" className="base-modal">
            {this.upgradeModal()}
            <img
              onClick={() => this.props.hideModal("inventory")}
              className="close-btn highlight-on-hover"
              src={ClosePNG}
            />
            <h1 className="text-center font-weight-bold mb-2">Inventory</h1>
            <div class="mb-0">
              <h3 className="text-center">
                AVAILABLE Plots
                <div className="text-center inventory_item-total-count">
                  Total farmer plots: {this.user().plots.length}{" "}
                </div>
              </h3>
              <div className="assets-scroll scrollable">
                {this.renderPlots()}
              </div>
            </div>

            <div class="mb-0">
              <h3 className="text-center">
                available Seeds
                <div className="text-center inventory_item-total-count">
                  Total farmer seeds: {this.user().seeds.length}{" "}
                </div>
              </h3>
              <div className="assets-scroll scrollable">
                {this.renderSeeds()}
              </div>
            </div>

            <div>
              <div className="text-center">
                <h3 className="text-center">
                  available Water Towers
                  <div className="text-center inventory_item-total-count">
                    Total farmer WT: {this.getWaterTowers()}{" "}
                  </div>
                </h3>
              </div>

              <div className="assets-scroll scrollable">
                {this.renderWaterTowers()}
              </div>
            </div>

            <div>
              <div className="text-center">
                <h3 className="text-center">
                  available Boosters
                  <div className="inventory_item-total-count">
                    Total farmer boosters:{" "}
                    {Object.keys(this.user().boosters).length}{" "}
                  </div>
                </h3>
              </div>
              <div className="assets-scroll scrollable">
                {this.renderTimeBoosters()}
              </div>
            </div>

            <div>
              <div className="text-center">
                <h3 className="text-center">
                  available Joints
                  <div className="inventory_item-total-count">
                    Total farmer joints: {this.user().joints.length}{" "}
                  </div>
                </h3>
              </div>
              <div className="assets-scroll scrollable">
                {this.renderJoints()}
              </div>
            </div>
          </div>
        </Modal>
      </>
    );
  }

  user() {
    return this.props.user !== undefined ? this.props.user : {};
  }

  getWaterTowers() {
    let plants = this.user().waterPlants;
    let total = 0;
    for (let plant in plants) {
      total += plants[plant];
    }
    return total;
  }

  waterTowersCount() {
    let towers = this.user().waterPlants;

    towers = Object.keys(towers).filter((tower) => towers[tower] > 0);

    return towers.length;
  }

  getImageForAsset(assetName, images) {
    const cleanedUpAssetName = assetName
      .toLowerCase()
      .replace(" ", "")
      .replace("’", "")
      .replace(" ", "");
    console.log(
      "imagen",
      images[
        Object.keys(images).filter((image) => {
          //console.log(image,cleanedUpAssetName);
          return image == cleanedUpAssetName;
        })[0]
      ]
    );
    return images[
      Object.keys(images).filter((image) => image == cleanedUpAssetName)[0]
    ];
  }

  getImageForAssetJoints(assetName, images) {
    const cleanedUpAssetName = assetName.toLowerCase();
    return images[
      Object.keys(images).filter((image) => {
        console.log(
          images[image].name.toLowerCase(),
          "COMPARADO CON",
          cleanedUpAssetName
        );
        return images[image].name.toLowerCase() == cleanedUpAssetName;
      })[0]
    ].image;
  }

  renderPlots() {
    const plots = this.user().plots;

    return plots.map((plot) => {
      if (plot.properties.hasOwnProperty("OCCUPIED")) {
        if (plot.properties.OCCUPIED) {
          return <></>;
        }
      }
      return (
        <div
          key={plot.id}
          className="inventory_asset"
          onClick={(e) =>
            this.setState({
              selectedForUpgrade: {
                item: plot,
                name: plot.properties.NAME,
                image: this.getImageForAsset(plot.properties.NAME, regionsImgs),
                id: plot.properties.id,
                actions: ["subdivide", "transfer"],
                upgradeFunction: (e) => alert(`Upgrade: ${plot.properties.id}`),
              },
              showUpgradeModal: "block",
            })
          }
        >
          <img
            src={this.getImageForAsset(plot.properties.NAME, regionsImgs)}
            title={`Click to see options`}
          />
        </div>
      );
    });
  }

  renderSeeds() {
    const seeds = this.user().seeds;

    return seeds.map((seed) => {
      if (seed?.properties?.PLANTED) {
        return <></>;
      }
      return (
        <div
          key={seed.id}
          className="inventory_asset"
          onClick={(e) =>
            this.setState({
              selectedForUpgrade: {
                item: seed,
                id: seed.id,
                name: seed.properties.NAME,
                image: this.getImageForAsset(seed.properties.NAME, seedsImgs),
                id: seed.properties.id,
                actions: ["transfer", "plant"],
                upgradeFunction: (e) => alert(`Upgrade: ${seed.properties.id}`),
              },
              showUpgradeModal: "block",
            })
          }
        >
          <img
            src={this.getImageForAsset(seed.properties.NAME, seedsImgs)}
            title={`Click to see options`}
          />
        </div>
      );
    });
  }

  renderWaterTowers() {
    const towers = this.user().waterPlants;

    console.log("water towers", towers);
    return Object.keys(towers)
      .filter((tower) => towers[tower] > 0)
      .map((tower) => (
        <div
          className="inventory_asset"
          onClick={(e) =>
            this.setState({
              selectedForUpgrade: {
                item: tower,
                name: tower,
                image: this.getImageForAsset(tower, waterTowersImgs),
                id: tower,
                actions: ["upgrade"],
                upgradeFunction: (e) => alert(`Upgrade: ${tower}`),
              },
              showUpgradeModal: "none",
            })
          }
        >
          <img
            style={{ width: "80%", height: "100%" }}
            src={this.getImageForAsset(tower, waterTowersImgs)}
            title={`Click to see options`}
          />
          <span style={{ left: "4em" }} className="title-tag">
            {this.hydrateTowerName(tower)}
          </span>
        </div>
      ));
  }

  renderTimeBoosters() {
    const boosters = this.user().timeBoosters || {};

    return Object.keys(boosters)
      .filter((booster) => boosters[booster] > 0)
      .map((booster) => (
        <div
          className="inventory_asset"
          onClick={(e) =>
            this.setState({
              selectedForUpgrade: {
                item: booster,
                name: booster,
                image: this.getImageForAsset(booster, timeBoostersImgs),
                id: booster,
                actions: ["transfer"],
                upgradeFunction: (e) => alert(`Upgrade: ${booster}`),
              },
              showUpgradeModal: "block",
            })
          }
        >
          <img
            src={this.getImageForAsset(booster, timeBoostersImgs)}
            title={`Click to see options`}
          />
        </div>
      ));
  }

  renderJoints() {
    const joints = this.user().joints || {};

    console.log("JOints", joints);

    //.filter(joint => joints[joint] > 0)
    return joints.map((joint) => (
      <div
        key={"joint" + joint.id}
        className="inventory_asset inventory_asset_joint"
        onClick={(e) =>
          this.setState({
            selectedForUpgrade: {
              item: joint,
              name: joint.name,
              image: this.getImageForAssetJoints(
                joint.properties.NAME,
                xpBoostersImgs
              ),
              id: joint,
              actions: ["smoke", "transfer"],
              upgradeFunction: (e) => alert(`Upgrade: ${joint}`),
            },
            showUpgradeModal: "block",
          })
        }
      >
        <img
          style={{ width: "60% !important" }}
          src={this.getImageForAssetJoints(
            joint.properties.NAME,
            xpBoostersImgs
          )}
          title={`Click to see options`}
        />
      </div>
    ));
  }

  hydrateTowerName(tower) {
    switch (tower) {
      case "lvl1":
        return "level 1";
      case "lvl2":
        return "level 2";
      case "lvl3":
        return "level 3";
      case "lvl4":
        return "level 4";
      case "lvl5":
        return "level 5";
      case "lvl6":
        return "level 6";
      case "lvl7":
        return "level 7";
      case "lvl8":
        return "level 8";
      case "lvl9":
        return "level 9";
      case "lvl10":
        return "level 10";
    }
  }
}

const mapStateToProps = (state) => {
  let user = state.API_bucket;
  user = user ? user : state.API_bucket;
  let displayUpgradeWaterPlantModal = state.displayUpgradeWaterPlantModal;
  return {
    user,
    username: localStorage.getItem("username"),
    displayUpgradeWaterPlantModal,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    upgradeWaterTower: (payload) =>
      dispatch({ type: "UPGRADE/WATERPLANT", payload }),
      subdivide: (payload) => dispatch({ type: "UPGRADE/SUBDIVIDE", payload }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(InventoryModal);
