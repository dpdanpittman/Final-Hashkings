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

import btnmarron1 from "../assets/img/BOTON-01.png";
import btnverde1 from "../assets/img/BOTON-05.png";

import btnmarron2 from "../assets/img/BOTON-04.png";
import btnverde2 from "../assets/img/BOTON-08.png";

import btnmarron3 from "../assets/img/BOTON-02.png";
import btnverde3 from "../assets/img/BOTON-06.png";

import terms from "../assets/img/ChooseTerms.png";
import termsTower from "../assets/img/ChooseTerms.png";
import farmRental from "../assets/img/FarmRentals.png";

const URL = "https://rpc.hashkings.xyz/contracts";
const CONTRACT = "nft"; // Should be nft
const TABLE_POSTFIX = "instances"; // ShoAuld be the same
const NFT_SYMBOL = "HKFARM"; // Your NFT Symbol

async function axiosRequest(axios, { contract, table, query, offset }, method) {
  // Headers
  let config = {
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-cache",
    },
  };
  // Request POST body data
  let body = JSON.stringify([
    {
      method: method,
      jsonrpc: "2.0",
      params: {
        contract: contract,
        table: table,
        query: query,
        limit: 499,
        offset: offset,
        indexes: [],
      },
      id: 1,
    },
  ]);
  // Make request.
  return await axios.post(URL, body, config);
}

function isNullOrEmpty(variable) {
  return variable === null || variable === undefined;
}

async function queryContract(
  axios,
  { contract, table, query = {} },
  offset = 0,
  method = "find"
) {
  // Request data
  let response = await axiosRequest(
    axios,
    { contract, table, query, offset },
    method
  )
    .then((r) => {
      return r;
    })
    .catch((e) => {
      console.log("error  on axios request", e);
    });

  // Return result
  if (
    response &&
    response.data !== undefined &&
    response.data !== null &&
    !isNullOrEmpty(response.data[0].result)
  )
    return response.data[0].result;

  // Else return false
  return false;
}

async function getRentaDisponible(axios) {
  return new Promise(async (resolve) => {
    (async () => {
      let complete = false;
      let nfts = [];
      let offset = 0;

      while (!complete) {
        let get_nfts = await queryContract(
          axios,
          {
            contract: CONTRACT,
            table: NFT_SYMBOL + TABLE_POSTFIX,
            query: { "properties.RENTEDINFO": "available" },
          },
          offset
        );
        if (get_nfts !== false) {
          nfts = nfts.concat(get_nfts);
          offset += 1000;

          if (get_nfts.length !== 1000) {
            complete = true;
          }
        } else {
          complete = true;
        }
      }
      resolve(nfts);
    })();
  });
}

class Rentals extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModalWater: false,
      showModalFarm: false,
      loading: true,
      rentData: [],
      myrentData: [],
      rentalLoading: true,
      term: 0,
      plot: 0,
      price: 0,
      changeMyRent: false,
      displayMyRented: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.setrentar = this.setrentar.bind(this);
    this.onSelectPlot = this.onSelectPlot.bind(this);
    this.onChangePrice = this.onChangePrice.bind(this);
    this.changeDisplay = this.changeDisplay.bind(this);
  }

  changeDisplay(e) {
    if (this.state.changeMyRent) {
      this.setState({ ...this.state, changeMyRent: false });
    } else {
      this.setState({ ...this.state, changeMyRent: true });
    }
  }

  handleChange(e) {
    this.setState({ ...this.state, term: e.target.value });
  }

  onSelectPlot(e) {
    this.setState({ ...this.state, plot: e.target.value });
  }

  onChangePrice(e) {
    this.setState({ ...this.state, price: e.target.value });
  }

  displayModal(modal) {
    if (modal == "farm") {
      this.setState({ showModalFarm: true });
      console.log("mostrando", this.state.showModalFarm);
    }

    if (modal == "water") {
      this.setState({ showModalWater: true });
      console.log("mostrando", this.state.showModalWater);
    }
  }

  getWaterTowerList(waterObject) {
    console.log("mostrandio", waterObject, this.props.API_bucket);
    if (!waterObject.hasOwnProperty("waterlvl10")) {
      waterObject.waterlvl10 = [];
    }

    if (!waterObject.hasOwnProperty("waterlvl9")) {
      waterObject.waterlvl9 = [];
    }

    if (!waterObject.hasOwnProperty("waterlvl8")) {
      waterObject.waterlvl8 = [];
    }

    if (!waterObject.hasOwnProperty("waterlvl7")) {
      waterObject.waterlvl7 = [];
    }

    if (!waterObject.hasOwnProperty("waterlvl6")) {
      waterObject.waterlvl6 = [];
    }

    if (!waterObject.hasOwnProperty("waterlvl5")) {
      waterObject.waterlvl5 = [];
    }

    if (!waterObject.hasOwnProperty("waterlvl4")) {
      waterObject.waterlvl4 = [];
    }

    if (!waterObject.hasOwnProperty("waterlvl3")) {
      waterObject.waterlvl3 = [];
    }

    if (!waterObject.hasOwnProperty("waterlvl2")) {
      waterObject.waterlvl2 = [];
    }

    if (!waterObject.hasOwnProperty("waterlvl1")) {
      waterObject.waterlvl1 = [];
    }

    return waterObject.waterlvl10
      .concat(waterObject.waterlvl9)
      .concat(waterObject.waterlvl8)
      .concat(waterObject.waterlvl7)
      .concat(waterObject.waterlvl6)
      .concat(waterObject.waterlvl5)
      .concat(waterObject.waterlvl4)
      .concat(waterObject.waterlvl3)
      .concat(waterObject.waterlvl2)
      .concat(waterObject.waterlvl1);
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
      let plots = this.props.API_bucket.plots;
      let plotOptions = plots.map((plot, index) => {
        if (!plot.properties.RENTED) {
          if (!plot.properties.OCCUPIED) {
            if (!plot.properties.SEEDID) {
              if (plot.properties.RENTEDINFO != "available") {
                return (
                  <option
                    index={index}
                    key={index}
                    value={plot.id}
                    className="opBlack"
                  >
                    {plot.properties.NAME} - {plot.id}
                  </option>
                );
              }
            }
          }
        }
      });

      let water = this.getWaterTowerList(this.props.API_bucket.waterTowers);
      let waterOptions = water.map((water, index) => {
        if (!water.properties.RENTED) {
          if (water.properties.RENTEDINFO != "available") {
            return (
              <option
                index={index}
                key={index}
                value={water.id}
                className="opBlack"
              >
                {water.properties.NAME} {water.properties.LVL} - {water.id}
              </option>
            );
          }
        }
      });

      return (
        <div className="authentication">
          <div
            className="overlay"
            style={{ display: this.state.showModalFarm ? "unset" : "none" }}
          ></div>
          <div className="rentsBackground">
            <div className="container">
              <img
                style={{ cursor: "pointer", maxWidth: "354px" }}
                onClick={(e) => this.displayModal("farm")}
                src={rentFarm}
              />
              <img
                style={{ cursor: "pointer" }}
                onClick={(e) => this.displayModal("water")}
                src={rentWaterTower}
              />

              <img
                style={{ cursor: "pointer", filter: "grayscale(100%)" }}
                onClick={(e) => {}}
                src={rentBundle}
              />

              <input
                type="checkbox"
                id="checkbox"
                onChange={this.changeDisplay}
              />
              <label htmlFor="checkbox"> My Rents </label>

              <input
                type="checkbox"
                id="rented"
                onChange={this.changeDisplay}
              />
              <label htmlFor="rented"> Rented </label>

              {!this.state.displayMyRented && (
                <Table
                  style={{ overflow: "auto" }}
                  striped
                  bordered
                  hover
                  responsive
                >
                  <thead>
                    <tr style={{ textAlign: "center" }}>
                      <th>Id</th>
                      <th>region</th>
                      <th>terms</th>
                      <th>tower lvl</th>
                      <th>price</th>
                      <th>op</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.rentData.map((plot, index) => {
                      let rentedData = JSON.parse(plot.properties.RENTEDSTATUS);

                      if (this.state.changeMyRent) {
                        if (plot.account == localStorage.getItem("username")) {
                          return (
                            <tr key={index} style={{ textAlign: "center" }}>
                              <td>
                                <strong>{plot._id}</strong>
                              </td>
                              <td>{plot.properties.NAME}</td>
                              <td>
                                <strong>{rentedData.term}</strong> MTH
                              </td>
                              <td>
                                <strong>{plot.properties.LVL}</strong>
                              </td>
                              <td>
                                <strong>{rentedData.price}</strong>
                              </td>
                              <td>
                                {plot.account ==
                                  localStorage.getItem("username") &&
                                !plot.properties.RENTED ? (
                                  <Button
                                    variant="danger"
                                    onClick={(e) => {
                                      this.cancelRental(plot._id);
                                    }}
                                  >
                                    Cancel
                                  </Button>
                                ) : (
                                  <Button
                                    variant="success"
                                    onClick={(e) => {
                                      this.rent(plot._id, rentedData.price);
                                    }}
                                  >
                                    Choose
                                  </Button>
                                )}
                              </td>
                            </tr>
                          );
                        }
                      } else {
                        return (
                          <tr key={index} style={{ textAlign: "center" }}>
                            <td>
                              <strong>{plot._id}</strong>
                            </td>
                            <td>{plot.properties.NAME}</td>
                            <td>
                              <strong>{rentedData.term}</strong> MTH
                            </td>
                            <td>
                              <strong>{plot.properties.LVL}</strong>
                            </td>
                            <td>
                              <strong>{rentedData.price}</strong>
                            </td>
                            <td>
                              {plot.account ==
                                localStorage.getItem("username") &&
                              !plot.properties.RENTED ? (
                                <Button
                                  variant="danger"
                                  onClick={(e) => {
                                    this.cancelRental(plot._id);
                                  }}
                                >
                                  Cancel
                                </Button>
                              ) : (
                                <Button
                                  variant="success"
                                  onClick={(e) => {
                                    this.rent(plot._id, rentedData.price);
                                  }}
                                >
                                  Choose
                                </Button>
                              )}
                            </td>
                          </tr>
                        );
                      }
                    })}
                  </tbody>
                </Table>
              )}

              {this.state.displayMyRented && (
                <Table
                  style={{ overflow: "auto" }}
                  striped
                  bordered
                  hover
                  responsive
                >
                  <thead>
                    <tr style={{ textAlign: "center" }}>
                      <th>Id</th>
                      <th>region</th>
                      <th>terms</th>
                      <th>tower lvl</th>
                      <th>price</th>
                      <th>Time</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.myrentData.map((plot, index) => {
                      let rentedData = JSON.parse(plot.properties.RENTEDSTATUS);

                      if (this.state.changeMyRent) {
                        if (plot.account == localStorage.getItem("username")) {
                          return (
                            <tr key={index} style={{ textAlign: "center" }}>
                              <td>
                                <strong>{plot._id}</strong>
                              </td>
                              <td>{plot.properties.NAME}</td>
                              <td>
                                <strong>{rentedData.term}</strong> MTH
                              </td>
                              <td>
                                <strong>{plot.properties.LVL}</strong>
                              </td>
                              <td>
                                <strong>{rentedData.price}</strong>
                              </td>
                              <td>
                                <strong>
                                  {new Date(
                                    rentedData.time
                                  ).toLocaleDateString()}
                                </strong>
                              </td>
                            </tr>
                          );
                        }
                      } else {
                        return (
                          <tr key={index} style={{ textAlign: "center" }}>
                            <td>
                              <strong>{plot._id}</strong>
                            </td>
                            <td>{plot.properties.NAME}</td>
                            <td>
                              <strong>{rentedData.term}</strong> MTH
                            </td>
                            <td>
                              <strong>{plot.properties.LVL}</strong>
                            </td>
                            <td>
                              <strong>{rentedData.price}</strong>
                            </td>
                            <td>
                              {plot.account ==
                                localStorage.getItem("username") &&
                              !plot.properties.RENTED ? (
                                <Button
                                  variant="danger"
                                  onClick={(e) => {
                                    this.cancelRental(plot._id);
                                  }}
                                >
                                  Cancel
                                </Button>
                              ) : (
                                <Button
                                  variant="success"
                                  onClick={(e) => {
                                    this.rent(plot._id, rentedData.price);
                                  }}
                                >
                                  Choose
                                </Button>
                              )}
                            </td>
                          </tr>
                        );
                      }
                    })}
                  </tbody>
                </Table>
              )}
            </div>

            <Modal
              size="lg"
              show={this.state.showModalFarm}
              onHide={() =>
                this.setState({ ...this.state, showModalFarm: false })
              }
              centered
              style={{ zIndex: "99999" }}
            >
              <div
                id="profile-modal-rent"
                className="modal-transparent-overlay"
                className="base-modal"
              >
                <img
                  onClick={() =>
                    this.setState({ ...this.state, showModalFarm: false })
                  }
                  className="close-btn highlight-on-hover"
                  src={ClosePNG}
                />
                <Modal.Body>
                  <br />
                  <br />
                  <div className="mb-3" style={{ textAlign: "center" }}>
                    <img
                      src={farmRental}
                      style={{
                        maxWidth: "300px",
                        position: "absolute",
                        top: "-6%",
                        right: "31%",
                      }}
                    />
                  </div>
                  <div className="mb-3" style={{ textAlign: "center" }}>
                    <select
                      className="form-select"
                      aria-label="Default select example"
                      onChange={this.onSelectPlot}
                    >
                      <option disabled defaultValue>
                        Choose plot
                      </option>
                      {plotOptions}
                    </select>
                  </div>
                  <div className="mb-3" style={{ textAlign: "center" }}>
                    <img src={terms} style={{ width: "inherit" }} />
                  </div>
                  <div className="mb-3" style={{ textAlign: "center" }}>
                    <label htmlFor="moth1" style={{ width: "100px" }}>
                      {this.state.term != 0 && this.state.term == 1 ? (
                        <img src={btnverde1} style={{ width: "inherit" }} />
                      ) : (
                        <img src={btnmarron1} style={{ width: "inherit" }} />
                      )}
                    </label>
                    <input
                      style={{ visibility: "hidden", position: "absolute" }}
                      onChange={this.handleChange}
                      type="radio"
                      value={1}
                      name="group1"
                      id="moth1"
                    />

                    <label htmlFor="moth2" style={{ width: "100px" }}>
                      {this.state.term != 0 && this.state.term == 3 ? (
                        <img src={btnverde2} style={{ width: "inherit" }} />
                      ) : (
                        <img src={btnmarron2} style={{ width: "inherit" }} />
                      )}
                    </label>
                    <input
                      style={{ visibility: "hidden", position: "absolute" }}
                      onChange={this.handleChange}
                      type="radio"
                      value={3}
                      name="group1"
                      id="moth2"
                    />
                    <label htmlFor="moth3" style={{ width: "100px" }}>
                      {this.state.term != 0 && this.state.term == 6 ? (
                        <img src={btnverde3} style={{ width: "inherit" }} />
                      ) : (
                        <img src={btnmarron3} style={{ width: "inherit" }} />
                      )}
                    </label>
                    <input
                      style={{ visibility: "hidden", position: "absolute" }}
                      onChange={this.handleChange}
                      type="radio"
                      value={6}
                      name="group1"
                      id="moth3"
                    />
                  </div>

                  <div className="mb-3 inputC" style={{ textAlign: "center" }}>
                    <input
                      onChange={this.onChangePrice}
                      type="number"
                      style={{
                        marginTop: "7%",
                        marginLeft: "-11%",
                        padding: "2%",
                        background: "transparent",
                        border: "0",
                      }}
                    />
                  </div>

                  <div className="mb-3" style={{ textAlign: "center" }}>
                    <button className="rent-now px-1" onClick={this.setrentar}>
                      Set Rent
                    </button>
                  </div>
                </Modal.Body>
              </div>
            </Modal>

            <Modal
              size="lg"
              show={this.state.showModalWater}
              onHide={() =>
                this.setState({ ...this.state, showModalWater: false })
              }
              centered
              style={{ zIndex: "99999" }}
            >
              <div
                id="profile-modal-rent"
                className="modal-transparent-overlay"
                className="base-modal"
              >
                <img
                  onClick={() =>
                    this.setState({ ...this.state, showModalWater: false })
                  }
                  className="close-btn highlight-on-hover"
                  src={ClosePNG}
                />
                <Modal.Body>
                  <br />
                  <br />
                  <div className="mb-3" style={{ textAlign: "center" }}>
                    <img
                      src={farmRental}
                      style={{
                        maxWidth: "300px",
                        position: "absolute",
                        top: "-6%",
                        right: "31%",
                      }}
                    />
                  </div>
                  <div className="mb-3" style={{ textAlign: "center" }}>
                    <select onChange={this.onSelectPlot}>
                      <option disabled defaultValue>
                        Choose WaterTower
                      </option>
                      {waterOptions}
                    </select>
                  </div>
                  <div className="mb-3" style={{ textAlign: "center" }}>
                    <img src={terms} style={{ width: "inherit" }} />
                  </div>
                  <div className="mb-3" style={{ textAlign: "center" }}>
                    <label htmlFor="moth1" style={{ width: "100px" }}>
                      {this.state.term != 0 && this.state.term == 1 ? (
                        <img src={btnverde1} style={{ width: "inherit" }} />
                      ) : (
                        <img src={btnmarron1} style={{ width: "inherit" }} />
                      )}
                    </label>
                    <input
                      style={{ visibility: "hidden", position: "absolute" }}
                      onChange={this.handleChange}
                      type="radio"
                      value={1}
                      name="group1"
                      id="moth1"
                    />

                    <label htmlFor="moth2" style={{ width: "100px" }}>
                      {this.state.term != 0 && this.state.term == 3 ? (
                        <img src={btnverde2} style={{ width: "inherit" }} />
                      ) : (
                        <img src={btnmarron2} style={{ width: "inherit" }} />
                      )}
                    </label>
                    <input
                      style={{ visibility: "hidden", position: "absolute" }}
                      onChange={this.handleChange}
                      type="radio"
                      value={3}
                      name="group1"
                      id="moth2"
                    />
                    <label htmlFor="moth3" style={{ width: "100px" }}>
                      {this.state.term != 0 && this.state.term == 6 ? (
                        <img src={btnverde3} style={{ width: "inherit" }} />
                      ) : (
                        <img src={btnmarron3} style={{ width: "inherit" }} />
                      )}
                    </label>
                    <input
                      style={{ visibility: "hidden", position: "absolute" }}
                      onChange={this.handleChange}
                      type="radio"
                      value={6}
                      name="group1"
                      id="moth3"
                    />
                  </div>

                  <div className="mb-3 inputC" style={{ textAlign: "center" }}>
                    <input
                      onChange={this.onChangePrice}
                      type="number"
                      style={{
                        marginTop: "7%",
                        marginLeft: "-11%",
                        padding: "2%",
                        background: "transparent",
                        border: "0",
                      }}
                    />
                  </div>

                  <div className="mb-3" style={{ textAlign: "center" }}>
                    <button className="rent-now px-1" onClick={this.setrentar}>
                      Set Rent
                    </button>
                  </div>
                </Modal.Body>
              </div>
            </Modal>
          </div>
        </div>
      );
    }
  }

  rent(idplot, price) {
    window.hive_keychain.requestTransfer(
      localStorage.getItem("username"),
      "hashkings",
      price.toFixed(3),
      "rent " + idplot,
      "HIVE",
      (response) => {
        console.log(response);
      },
      true
    );
  }

  setrentar() {
    if (this.state.term && this.state.price && this.state.plot) {
      let body = {
        term: this.state.term,
        price: this.state.price,
        plot: this.state.plot,
      };

      window.hive_keychain.requestCustomJson(
        localStorage.getItem("username"),
        "qwoyn_set_rent",
        "Posting",
        `${JSON.stringify(body)}`,
        "Renting Plot",
        (res) => {
          console.log("posted");
        },
        null
      );
    }
  }

  cancelRental(id) {
    let body = {
      id: id,
    };

    window.hive_keychain.requestCustomJson(
      localStorage.getItem("username"),
      "qwoyn_cancel_rent",
      "Posting",
      `${JSON.stringify(body)}`,
      "Cancel Renting Plot",
      (res) => {
        console.log("posted");
      },
      null
    );
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

    getRentaDisponible(axios)
      .then((res) => {
        console.log(res);
        this.setState({
          ...this.state,
          rentData: res,
          rentalLoading: false,
        });
      })
      .catch((err) => {
        console.log(err);
        this.setState({
          ...this.state,
          rentalLoading: false,
        });
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

export default connect(mapStateToProps, mapDispatchToProps)(Rentals);
