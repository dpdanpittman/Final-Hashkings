import React, { Component } from "react";
import { connect } from "react-redux";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const MySwal = withReactContent(Swal);

class DisplayLoader extends Component {
  constructor(props) {
    super(props);
  }

  componentDidUpdate() {
    if (this.props.displayModalPlanting) {
      this.renderAlert("Planting");
    }
    if (this.props.displayUpgradeWaterPlantModal) {
      this.renderAlert("Upgrading");
    }
    if (this.props.displayWaterModal) {
      this.renderAlert("Watering");
    }

    if (this.props.displayHarvestModal) {
      this.renderAlert("Harvesting");
    }

    if (this.props.displayBuyJoint) {
      this.renderAlert("Buying Join");
    }

    if (this.props.displayPoolBuds) {
      this.renderAlert("Deposit Buds");
    }
  }

  renderAlert(tipe) {
    console.log("RENDERIZANDO", tipe);
    let mensaje = tipe + "...";
    if (!this.props.plantstatus.errorPlant) {
      mensaje = this.props.plantstatus.mensajePlant;
    } else {
      mensaje = this.props.plantstatus.mensajePlant;
    }

    if (this.props.plantstatus.completePlant) {
      const ipAPI =
        "https://hashkings.xyz/u/" + localStorage.getItem("username");
      if (!this.props.plantstatus.errorPlant) {
        Swal.close();
        Swal.fire({
          title: "Conecting with Backend Wait please...",
          allowOutsideClick: false,
          footer:
            "remember sometimes transactions take up to 5 minutes to confirm",
          didOpen: () => {
            Swal.showLoading();
            setTimeout(() => {
              fetch(ipAPI)
                .then((response) => response.json())
                .then((data) => {
                  console.log("actualizando db", data);
                  this.props.displayAllModals(false);
                  this.props.updateStoreFromAPI(data);
                  document
                    .querySelector(`.seeds-popup`)
                    .classList.remove("active"); //add all close pops
                  Swal.close();
                })
                .catch(() => {
                  window.location.reload();
                });
            }, 25000);
          },
        });
      } else {
        Swal.close();

        Swal.fire({
          title: mensaje,
          allowOutsideClick: false,
          didOpen: () => {
            this.props.displayAllModals(false);
            this.props.restoreLoaders();
          },
        });
      }
    } else {
      mensaje = tipe + "...";
      Swal.fire({
        title: mensaje,
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });
    }
  }

  render() {
    return <> </>;
  }
}

const mapStateToProps = (state) => {
  const bucket = state.API_bucket;
  let user = state.API_bucket;
  user = user ? user : state.API_bucket;
  const username = localStorage.getItem("username");
  let plantstatus = state.plantstatus;

  let displayModalPlanting = state.displayPlantModal;

  let displayUpgradeWaterPlantModal = state.displayUpgradeWaterPlantModal;

  let displayWaterModal = state.displayWaterModal;

  let displayHarvestModal = state.displayHarvestModal;

  let displayBuyJoint = state.displayBuyJoint;

  let displayPoolBuds = state.displayPoolBuds;

  return {
    user,
    bucket,
    username,
    plantstatus,
    displayModalPlanting,
    displayUpgradeWaterPlantModal,
    displayWaterModal,
    displayHarvestModal,
    displayBuyJoint,
    displayPoolBuds
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    plantSeed: (payload) => dispatch({ type: "FARM/PLANT", payload }),
    displayAllModals: (payload) =>
      dispatch({ type: "FARM/DISPLAYPLANTMODAL", payload }),
    updateStoreFromAPI: (API_bucket) =>
      dispatch({ type: "API UPDATE", payload: API_bucket }),
    restoreLoaders: () => dispatch({ type: "RESTORELOADER", payload: false }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DisplayLoader);
