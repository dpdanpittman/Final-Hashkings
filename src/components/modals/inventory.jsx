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

import mota from "../../assets/img/ui/Moneda2.png";
import hive from "../../assets/img/socialmedia/Hive.png";

class InventoryModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedForUpgrade: {
        name: "",
        image: "",
        actions: [],
        upgradeFunction: () => {
          return 0;
        },
      },
      showUpgradeModal: "none",
      showSelectCoin: false,
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
            <span className="title-tag-top">
              nftid {item.upgradeFunction().id}
            </span>
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
                onClick={(e) => {
                  /*  this.props.upgradeWaterTower({
                    username: this.props.username,
                    waterTower: this.state.selectedForUpgrade,
                    lvl: this.props.user.lvl,
                  }); */

                  this.setState({ ...this.state, showSelectCoin: true });
                }}
                className="action-btn highlight-on-hover"
                src={UpgradeButton}
              />
            </div>
          </div>
          <div data-key="3" className="popup p-2">
            <h5 className="text-center">Requirements</h5>
            <div className="tag text-center">(soon)</div>

            <div className="text-center">
              <img
                onClick={(e) => {
                  let payload = {
                    username: this.props.username,
                    obj: this.state.selectedForUpgrade.item,
                  };
                  //this.props.subdivide(payload);
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

                      let payload = {
                        username: this.props.username,
                        join: this.state.selectedForUpgrade.item,
                        lvl: this.props.user.lvl,
                      };
                      this.props.smoke(payload);
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
          style={{ zIndex: "99999" }}
        >
          <div id="inventory-modal" className="base-modal">
            {this.upgradeModal()}
            <img
              onClick={() => this.props.hideModal("inventory")}
              className="close-btn highlight-on-hover"
              src={ClosePNG}
            />
            <h1 className="text-center font-weight-bold mb-2">Inventory</h1>
            <div className="mb-0">
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

            <div className="mb-0">
              <h3 className="text-center">
                available Seeds
                <div className="text-center inventory_item-total-count">
                  Total farmer seeds: {this.getSeedsDisponibles()}{" "}
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

        <Modal
          size="lg"
          show={this.state.showSelectCoin}
          onHide={() => this.setState({ ...this.state, showSelectCoin: false })}
          centered
          backdrop="static"
          style={{ zIndex: "999999" }}
        >
          <div
            id="inventory-modal"
            className="modal-transparent-overlay"
            className="base-modal"
          >
            <img
              onClick={() =>
                this.setState({ ...this.state, showSelectCoin: false })
              }
              className="close-btn highlight-on-hover"
              src={ClosePNG}
            />
            <Modal.Body>
              <h3 className="text-center font-weight-bold mb-2">Select coin</h3>
              <div className="mb-0" style={{ textAlign: "center" }}>
                <img
                  style={{ cursor: "pointer", width: "200px", margin: "5%" }}
                  src={mota}
                  onClick={() => {
                    this.props.upgradeWaterTower({
                      username: this.props.username,
                      waterTower: this.state.selectedForUpgrade,
                      lvl: this.props.user.lvl,
                      token: "mota",
                    });
                  }}
                />
                <img
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    this.props.upgradeWaterTower({
                      username: this.props.username,
                      waterTower: this.state.selectedForUpgrade,
                      lvl: this.props.user.lvl,
                      token: "hive",
                    });
                  }}
                  src={hive}
                />
              </div>
            </Modal.Body>
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
   if(!assetName) {
     return null;
   }
    const cleanedUpAssetName = assetName
      .toLowerCase()
      .replace(" ", "")
      .replace("’", "")
      .replace(" ", "");

    return images[
      Object.keys(images).filter((image) => image == cleanedUpAssetName)[0]
    ];
  }

  getImageForAssetJoints(assetName, images) {
    const cleanedUpAssetName = assetName.toLowerCase();
    return images[
      Object.keys(images).filter((image) => {
        let imgName = images[image].name.toLowerCase();
        if (imgName == "cross") {
          imgName = "cross joint";
        }

        if (imgName == "hemp wrapped") {
          imgName = "hemp wrapped joint";
        }

        if (imgName == "twax") {
          imgName = "twax joint";
        }

        return imgName == cleanedUpAssetName;
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
                upgradeFunction: (e) => {
                  return plot;
                },
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

  getSeedsDisponibles() {
    const seeds = this.user().seeds;
    let seedsDisponibles = seeds.filter((e) => {
      if (!e.properties.PLANTED) return e;
    }).length;

    return seedsDisponibles;
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
                actions: ["transfer", "plant"],
                upgradeFunction: (e) => {
                  return seed;
                },
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
    let towers = this.user().waterTowers;


    let r = this.user()
      .rents.filter((rented) => {
        return rented.properties.TYPE == "water";
      })
      .map((tower) => {
        return (
          <div key={tower.id} className="inventory_asset">
            <span className="title-tag-top">RENTED</span>
            <img
              style={{ width: "80%", height: "100%" }}
              src={this.getImageForAsset(
                "lvl" + tower.properties.LVL,
                waterTowersImgs
              )}
              title={`Click to see options`}
            />
            <span style={{ left: "4em" }} className="title-tag">
              {this.hydrateTowerName("lvl" + tower.properties.LVL)}
            </span>
          </div>
        );
      });

    let objects = Object.keys(towers).map((tower) => (
      <div
        key={tower.id}
        className="inventory_asset"
        onClick={(e) =>
          this.setState({
            selectedForUpgrade: {
              item: "lvl" + towers[tower][0].properties.LVL,
              name: "lvl" + towers[tower][0].properties.LVL,
              image: this.getImageForAsset(
                "lvl" + towers[tower][0].properties.LVL,
                waterTowersImgs
              ),
              id: towers[tower][0].id,
              actions: ["upgrade"],
              upgradeFunction: (e) => {
                return towers[tower][0];
              },
            },
            showUpgradeModal: "block",
          })
        }
      >
        <span className="title-tag-top">Total {towers[tower].length}</span>

        <img
          style={{ width: "80%", height: "100%" }}
          onClick={(e) => {
            document.querySelector("body").scrollTo(0, 0);
          }}
          src={this.getImageForAsset(
            "lvl" + towers[tower][0].properties.LVL,
            waterTowersImgs
          )}
          title={`Click to see options`}
        />
        <span style={{ left: "4em" }} className="title-tag">
          {this.hydrateTowerName("lvl" + towers[tower][0].properties.LVL)}
        </span>
      </div>
    ));

    objects = objects.concat(r);

    return objects;
  }

  renderTimeBoosters() {
    const boosters = this.user().timeBoosters || {};

    return Object.keys(boosters)
      .filter((booster) => boosters[booster] > 0)
      .map((booster) => (
        <div
          key={booster}
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
              upgradeFunction: (e) => {
                return joint;
              },
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
    smoke: (payload) => dispatch({ type: "SMOKE/JOIN", payload }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(InventoryModal);
