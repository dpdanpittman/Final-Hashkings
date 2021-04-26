import React, { Component } from "react";
import Modal from "react-bootstrap/Modal";
import { connect } from "react-redux";
import { regionsImgs } from "../../assets/img/regions";
import HojaPNG from "../../assets/img/ui/Hoja.png";
import PopupBackgroundPNG from "../../assets/img/ui/Madera para info.png";
import TimeboosterPNG from "../../assets/img/ui/button timebooster.png";
import {
  regions,
  regionsToMiniatures,
  farmingOperationsImgs,
  Farm,
} from "../configs/farming";
import { timeBoostersImgs } from "../../assets/img/time_boosters";
import { seedsImgs } from "../../assets/img/seeds";
import ClosePNG from "../../assets/img/ui/x close.png";
import jsonQL from "jsonpath";

import DisplayLoader from "./displayLoader";

const SEEDS = {
  asia: {
    aceh: "Aceh",
    thai: "Thai",
    thaichocolate: "Chocolate Thai",
  },
  jamaica: {
    lambsbread: "Lamb’s Bread",
    kingsbread: "King’s Bread",
  },
  africa: {
    swazigold: "Swazi Gold",
    kilimanjaro: "Kilimanjaro",
    durbanpoison: "Durban Poison",
    malawi: "Malawi",
  },
  afghanistan: {
    hindukush: "Hindu Kush",
    afghani: "Afghani",
    lashkargah: "Lashkar Gah",
    mazarisharif: "Mazar I Sharif",
  },
  mexico: {
    acapulcogold: "Acapulco Gold",
  },
  southamerica: {
    colombiangold: "Colombian Gold",
    panamared: "Panama Red",
  },
};

class FarmsInRegion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeFarm: {
        name: "",
        image: "",
        farmid: "",
        seedToPlant: "",
      },
      planted: false,
    };
  }

  updateStorage() { }

  render() {
    return (
      <>
        {this.props.displayModalPlanting ? (
          <DisplayLoader></DisplayLoader>
        ) : (
          <></>
        )}

        {this.props.displayWaterModal ? <DisplayLoader></DisplayLoader> : <></>}

        {this.props.displayHarvestModal ? (
          <DisplayLoader></DisplayLoader>
        ) : (
          <></>
        )}

        <div className="farms-in-region">
          <Modal
            dialogClassName="border-0"
            show={this.props.show}
            onHide={() => this.props.hideModal("farms")}
            size={this.props.size || null}
          >
            <div className="farms-in-region-wrapper">
              <div id="farms-in-region">
                <div className="items">
                  {this.extractUsedPlots(this.props.activeFarm)}
                </div>
              </div>
              <div className="popup">
                <img className="background" src={PopupBackgroundPNG} />
                <div className="content">
                  <h5>
                    {this.state.activeFarm.name +
                      " " +
                      this.state.activeFarm.farmid.id}
                  </h5>
                  <img
                    className="active-farm-image highlight-on-hover"
                    src={this.state.activeFarm.image}
                    alt={this.state.activeFarm.name}
                  />
                  <div className="controls">
                    <div className="farm-operations">
                      {this.renderFarmingOperationsButtons()}
                    </div>
                    <div className="slider-wrapper">
                      <br />
                      <div>Time left: {this.getTime()}</div>
                    </div>
                    <div className="booster-wrapper">
                      <img
                        onClick={(e) => this.activateTimeboosterPopup()}
                        className="highlight-on-hover"
                        src={TimeboosterPNG}
                      />
                    </div>
                  </div>
                </div>
              </div>
              {this.renderTimeBoostersPopup()}
              {this.renderSeedsPopup()}
            </div>
          </Modal>
        </div>
      </>
    );
  }

  getTime() {
    let farm = this.state.activeFarm.farmid.properties;
    if (farm) {
      if (farm.OCCUPIED) {
        if (farm.SEEDID) {
          let seed = jsonQL.query(
            this.props.user.seeds,
            `$[?(@.id==${farm.SEEDID})]`
          )[0];

          if (seed) {
            console.log("semilla plantada", seed);
            if (seed.properties.SPT > 0) {
              return seed.properties.SPT + " Days";
            } else {
              if (seed.properties.WATER > 0) {
                return "Water Time!";
              } else {
                return "Harvest Time!";
              }
            }
          }
        }
      } else {
        return "Free to plant";
      }
    }
  }

  activateTimeboosterPopup() {
    document.querySelector(`.timeboosters-popup`).classList.add("active");
  }

  activateSeedPopup() {
    document.querySelector(`.seeds-popup`).classList.add("active");
  }

  getImageForAsset(assetName, images) {
    const cleanedUpAssetName = assetName.toLowerCase().replace(" ", "").replace("’", "").replace(" ", "");
    return images[
      Object.keys(images).filter((image) => image == cleanedUpAssetName)[0]
    ];
  }

  renderTimeBoostersPopup() {
    let boosters = this.props.user.timeBoosters;

    boosters = Object.keys(boosters)
      .filter((booster) => boosters[booster] > 0)
      .map((booster) => (
        <div key={booster} className="inventory_asset">
          <div
            className="d-flex flex-row justify-content-around align-items-center"
            style={{ height: "50px" }}
          >
            <span>{booster}</span>
            <img
              onClick={(e) =>
                e.currentTarget.parentElement.classList.remove("active")
              }
              src={this.getImageForAsset(booster, timeBoostersImgs)}
              title={`Click to see options`}
            />
          </div>
          <div>
            <button
              onClick={(e) => Farm.useTimebooster(this.props.username, booster)}
              className="btn btn-primary btn-block small p-0"
            >
              Boost!
            </button>
          </div>
        </div>
      ));

    return (
      <div className="timeboosters-popup">
        <img
          onClick={(e) =>
            document
              .querySelector(`.timeboosters-popup`)
              .classList.remove("active")
          }
          className="highlight-on-hover close-btn"
          src={ClosePNG}
        />
        <h6 className="text-center">(coming soon)</h6>
        {boosters}
      </div>
    );
  }

  renderSeedsPopup() {

    let boosters = this.props.user.seeds;

    try {
      let seed = SEEDS[this.props.activeFarm];
      boosters = boosters.filter((e) => {

        let seedNameFormated = e.properties.NAME.replace(" ", "").replace(" ", "").replace("’", "").toLowerCase();

        try {
          console.log("seedNaMed", seedNameFormated, seed);
          if (seed[seedNameFormated]) {
            //console.log("TESTEANDO SEMILLA PARA VER SI ESTA PLANTADA", e);
            if (!e.properties.hasOwnProperty("PLANTED")) {
              return e;
            } else {
              if (e?.properties?.PLANTED) {
              } else {
                return e;
              }
            }
          }
        } catch (err) {
          /*console.log(
            "buscando -->" + seedNameFormated,
            "en",
            boosters,
            "i semillas activas en la marm",
            seed
          );*/
        }
      });

    } catch (e) {
      console.error("ERROR AL RENDERIZAR", e);
      boosters = [];
    }

    boosters = boosters.map((booster) => (
      <div key={booster.id} className="inventory_asset">
        <div
          className="d-flex flex-row justify-content-around align-items-center"
          style={{ height: "50px" }}
        >
          <span>{booster.properties.NAME}</span>
          <img
            onClick={(e) => {
              e.preventDefault();
              this.state.activeFarm.seedToPlant = booster;
              let data = {
                username: this.props.username,
                seed: this.state.activeFarm,
              };
              console.log("plantando");

              this.props.displayPlanting(true);
              this.props.plantSeed(data);
            }}
            src={this.getImageForAsset(booster.properties.NAME, seedsImgs)}
            title={`Click to see options`}
          />
        </div>
      </div>
    ));

    return (
      <div
        className="seeds-popup"
        style={{
          overflowY: "scroll",
          overflowX: "hidden",
        }}
      >
        <img
          onClick={(e) =>
            document.querySelector(`.seeds-popup`).classList.remove("active")
          }
          className="highlight-on-hover close-btn"
          src={ClosePNG}
        />
        <h6 className="text-center">Available Seeds</h6>
        {boosters}
      </div>
    );
  }

  renderFarmingOperationsButtons() {
    const buttons = farmingOperationsImgs;
    let farm = this.state.activeFarm.farmid.properties;
    let Plant = { e: true, c: false };
    let Water = { e: false, c: false };
    let Harvest = { e: false, c: false };

    if (farm) {
      if (farm.OCCUPIED) {
        if (farm.SEEDID) {
          let seed = jsonQL.query(
            this.props.user.seeds,
            `$[?(@.id==${farm.SEEDID})]`
          )[0];

          console.log("seed properties", seed);
          if (seed) {
            if (seed.properties.SPT > 0) {
              Plant.c = false;

              if (seed.properties.WATER <= 0) {
                Water.e = true;
                Water.c = false;
              } else {
                Water.e = true;
                Water.c = true;
              }
              Harvest.e = false;
              Harvest.c = false;
            } else {
              if (seed.properties.WATER > 0) {
                Plant.c = false;
                Water.e = true;
                Water.c = true;
                Harvest.e = false;
                Harvest.c = false;
              } else {
                Plant.c = false;
                Water.e = true;
                Water.c = false;
                Harvest.e = true;
                Harvest.c = true;
              }
            }
          }
        }
      } else {
        Plant.c = true;
      }
    }

    return Object.keys(buttons).map((button) => {
      switch (button) {
        case "plant":
          return this.renderButtonc(button, Plant.e, Plant.c);
        case "water":
          return this.renderButtonc(button, Water.e, Water.c);
        case "harvest":
          return this.renderButtonc(button, Harvest.e, Harvest.c);
      }
    });
  }

  renderButtonc(button, visible, clicable) {
    const buttons = farmingOperationsImgs;
    return (
      <>
        <img
          style={{
            visibility: visible ? "visible" : "hidden",
            pointerEvents: clicable ? "all" : "none",
          }}
          key={button}
          title={`${button} this farm!`}
          onClick={() => {
            if (button != "plant") {
              if (button != "water") {
                if (button != "harvest") {
                } else {
                  this.props.harvest({
                    username: this.props.username,
                    farm: this.state.activeFarm,
                  });
                }
              } else {
                let seed = jsonQL.query(
                  this.props.user.seeds,
                  `$[?(@.id==${this.state.activeFarm.farmid.properties.SEEDID})]`
                )[0];

                if (seed) {

                  console.log("regando", seed);
                 let farm = {
                    name: this.state.activeFarm.name,
                    image: this.state.activeFarm.image,
                    farmid: this.state.activeFarm.farmid,
                    seedToPlant: seed,
                  };


                  this.props.regar({
                    username: this.props.username,
                    farm: farm,
                  });

                }
              }
            } else {
              this.activateSeedPopup();
            }
          }}
          className={button + " highlight-on-hover farm-operation-button"}
          src={buttons[button]}
          alt={`${button}ing button`}
        />
        <i className="mx-2">&nbsp;</i>
      </>
    );
  }

  selectActiveFarm(farm, plot, seedSelected) {
    document
      .querySelector(".farms-in-region-wrapper .popup")
      .classList.remove("active");

    setTimeout(function () {
      document
        .querySelector(".farms-in-region-wrapper .popup")
        .classList.add("active");
    }, 200);
    const image =
      regionsToMiniatures[
      Object.keys(regionsToMiniatures).filter((img) => img == farm)[0]
      ];

    farm = {
      name: farm,
      image,
      farmid: plot,
      seedToPlant: seedSelected,
    };

    console.log("ACTIVANDO ESTA FARM", farm);

    this.setState({ activeFarm: farm });
  }

  extractUsedPlots(farm) {
    const allPlots = this.props.user !== undefined ? this.props.user.plots : [];

    const allSeeds = this.props.user !== undefined ? this.props.user.seeds : [];

    // console.log("seeds", allSeeds);

    if (allPlots == [])
      return (
        <div className="no-farms-notice">
          <h3 className="alert">You have no farms in this region.</h3>
        </div>
      );
    let plots = allPlots.filter(
      (plot) =>
        plot.properties.NAME.toLowerCase().replace(" ", "") ==
        farm.toLowerCase().replace(" ", "")
    );
    if (plots.length === 0)
      return (
        <div className="no-farms-notice">
          <h3 className="alert">You have no farms in this region.</h3>
        </div>
      );
    else return this.renderJSXForItems(plots, allSeeds);
  }

  selectedSeed(plot, allSeeds) {
    let s = allSeeds.map((seed) => {
      if (seed.properties.hasOwnProperty("PLANTED")) {
        if (seed.properties.PLANTED) {
          return seed;
        }
      } else {
        return seed;
      }
    });

    let r = "";

    switch (plot) {
      case "afghanistan":
        r = s.map((seed) => {
          return (
            seed.properties.NAME === "Panama Red" ||
            seed.properties.NAME === "Colombian Gold"
          );
        });
        return r[0];
      case "africa":
        r = s.map((seed) => {
          return (
            seed.properties.NAME === "Panama Red" ||
            seed.properties.NAME === "Colombian Gold"
          );
        });
        return r[0];
      case "asia":
        r = s.map((seed) => {
          return (
            seed.properties.NAME === "Panama Red" ||
            seed.properties.NAME === "Colombian Gold"
          );
        });
        return r[0];
      case "jamaica":
        r = s.map((seed) => {
          return (
            seed.properties.NAME === "Panama Red" ||
            seed.properties.NAME === "Colombian Gold"
          );
        });
        return r[0];
      case "mexico":
        r = s.map((seed) => {
          return seed.properties.NAME === "Acapulco Gold";
        });
        return r[0];
      case "southamerica":
        r = s.map((seed) => {
          if (
            seed.properties.NAME === "Panama Red" ||
            seed.properties.NAME === "Colombian Gold"
          ) {
            return seed;
          }
        });
        console.log("seed south america", r);
        return r[0];
    }
  }

  renderJSXForItems(plots, allSeeds) {
    return plots.map((plot) => {
      // aqui ta
      const plotName = plot.properties.NAME;
      const cleanedUpAssetName = plotName.toLowerCase().replace(" ", "");

      let seedSelected = this.selectedSeed(cleanedUpAssetName, allSeeds);

      const image = Object.keys(regionsToMiniatures).filter(
        (img) => cleanedUpAssetName.toLowerCase() === img
      )[0];

      if (plot.properties.hasOwnProperty("OCCUPIED")) {
        if (plot.properties.OCCUPIED) {
          return (
            <div
              key={plot.id}
              onClick={(e) =>
                this.selectActiveFarm(cleanedUpAssetName, plot, seedSelected)
              }
              className="item highlight-on-hover"
            >
              <div className="image">
                <h6 style={{ marginBottom: "2px", marginTop: "7px" }}>
                  ocuppied
                </h6>
                <img src={regionsToMiniatures[image]} alt={plotName} />
              </div>
            </div>
          );
        }
      }

      return (
        <div
          key={plot.id}
          onClick={(e) =>
            this.selectActiveFarm(cleanedUpAssetName, plot, seedSelected)
          }
          className="item highlight-on-hover"
        >
          <div className="image">
            <h6 style={{ marginBottom: "2px", marginTop: "7px" }}>Available</h6>
            <img src={regionsToMiniatures[image]} alt={plotName} />
          </div>
        </div>
      );
    });
  }
}

const mapStateToProps = (state) => {
  const bucket = state.API_bucket;
  let user = state.API_bucket;
  user = user ? user : state.API_bucket;
  const username = localStorage.getItem("username");
  let plantstatus = state.plantstatus;

  let displayModalPlanting = state.displayPlantModal;

  let displayWaterModal = state.displayWaterModal;

  let displayHarvestModal = state.displayHarvestModal;

  console.info("%c " + displayWaterModal, "background: #222; color: #bada55");

  return {
    user,
    bucket,
    username,
    plantstatus,
    displayModalPlanting,
    displayWaterModal,
    displayHarvestModal,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    plantSeed: (payload) => dispatch({ type: "FARM/PLANT", payload }),
    displayPlanting: (payload) =>
      dispatch({ type: "FARM/DISPLAYPLANTMODAL", payload }),
    updateStoreFromAPI: (API_bucket) =>
      dispatch({ type: "API UPDATE", payload: API_bucket }),
    regar: (payload) => dispatch({ type: "FARM/REGAR", payload }),
    harvest: (payload) => dispatch({ type: "FARM/HARVEST", payload }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FarmsInRegion);
