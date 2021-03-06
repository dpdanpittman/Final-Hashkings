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
      this.renderAlert("Loading");
    }
    if (this.props.displayUpgradeWaterPlantModal) {
      this.renderAlert("Loading");
    }
    if (this.props.displayWaterModal) {
      this.renderAlert("Loading");
    }

    if (this.props.displayHarvestModal) {
      this.renderAlert("Loading");
    }

    if (this.props.displayBuyJoint) {
      this.renderAlert("Loading");
    }

    if (this.props.displayPoolBuds) {
      this.renderAlert("Loading");
    }

    if (this.props.displaySmokeJoint) {
      this.renderAlert("Loading");
    }

    if (this.props.displayChangeAvatar) {
      this.renderAlert("Loading");
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
        "https://hashkings.xyz/utest/" + localStorage.getItem("username");
      if (!this.props.plantstatus.errorPlant) {
        Swal.close();
        Swal.fire({
          title: "Shaggi is in the fields...",
          allowOutsideClick: false,
          showCloseButton: true,
          footer:
            "remember sometimes transactions take up to 5 minutes to confirm. do not send transaction again!!",
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
            }, 3000);
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
          if (!this.props.plantstatus.errorPlant) {
            Swal.showLoading();
          } else {
            this.props.restoreLoaders();
            this.props.displayAllModals(false);
          }
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

  let displaySmokeJoint = state.displaySmokeJoint;

  let displayPoolBuds = state.displayPoolBuds;

  let displayChangeAvatar = state.displayChangeAvatar;

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
    displayPoolBuds,
    displaySmokeJoint,
    displayChangeAvatar,
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
