import React, { Component } from "react";

import HeaderTab from "./headerTab";
import Sidebar from "./sidebar";
import MainArea from "./mainArea";

import NeedAvatar from "./needAvatar";

import InventoryModal from "./modals/inventory";
import ProfileModal from "./modals/profile";
import CraftingModal from "./modals/crafting";
import FarmsModal from "./modals/farmsInRegion";
import StakingModal from "./modals/staking";

import { connect } from "react-redux";
import axios from "axios";
import Utils from "../utils/index";
import { isLandscape, isMobile } from "../utils/ui";
import IsMobileOverlay from "./cores/isMobileOverlay";
import logo from "../assets/img/logo.png";
import reload from "../assets/img/reload.gif";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const MySwal = withReactContent(Swal);

class GameBoard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isMobileOverlayClass: "d-none",
      showInventory: false,
      showProfile: false,
      showCrafting: false,
      showFarms: false,
      activeFarm: "",
      showStaking: false,
      loading: true,
      needAvatar: false,
    };
  }

  render() {
    let { loading, needAvatar } = this.state;

    if (loading && !needAvatar) {
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
    }

    if (needAvatar && !loading) {
      return <NeedAvatar />;
    } else {
      return (
        <div id="game-board" className="container-fluid px-5">
          <IsMobileOverlay class={this.state.isMobileOverlayClass} />
          <div className="col-12 d-flex flex-row justify-content-center">
            <HeaderTab showProfile={() => this.showModal("profile")} />
          </div>
          <div className="row mt-2 p-0">
            <Sidebar
              class="col-6 col-md-3"
              showModals={(modal, farm = undefined) =>
                this.showModal(modal, farm)
              }
            />
            <MainArea
              showModals={(modal, farm = undefined) =>
                this.showModal(modal, farm)
              }
              class="p-0"
            />
          </div>
          <div>
            <InventoryModal
              show={this.state.showInventory}
              hideModal={(modal) => this.hideModal(modal)}
              size="lg"
            />
            <ProfileModal
              show={this.state.showProfile}
              hideModal={(modal) => this.hideModal(modal)}
              size="lg"
            />
            <CraftingModal
              show={this.state.showCrafting}
              hideModal={(modal) => this.hideModal(modal)}
              size="lg"
            />
            <FarmsModal
              activeFarm={this.state.activeFarm}
              show={this.state.showFarms}
              hideModal={(modal) => this.hideModal(modal)}
              size="lg"
            />
            <StakingModal
              show={this.state.showStaking}
              hideModal={(modal) => this.hideModal(modal)}
              size="lg"
            />
          </div>
        </div>
      );
    }
  }

  showModal(modal, farm) {
    switch (modal.toLowerCase()) {
      case "inventory":
        this.setState({ showInventory: true });
        break;
      case "profile":
        this.setState({ showProfile: true });
        break;
      case "crafting":
        this.setState({ showCrafting: true });
        break;
      case "farms":
        this.setState({ showFarms: true, activeFarm: farm });
        break;
      case "staking":
        this.setState({ showStaking: true });
        break;
    }
  }

  hideModal(modal) {
    switch (modal.toLowerCase()) {
      case "inventory":
        this.setState({ showInventory: false });
        break;
      case "profile":
        this.setState({ showProfile: false });
        break;
      case "crafting":
        this.setState({ showCrafting: false });
        break;
      case "farms":
        this.setState({ showFarms: false });
        break;
      case "staking":
        this.setState({ showStaking: false });
        break;
    }
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

        this.checkLocalstorage(res.data);

        try {
          console.error(res.data);
          if (res.data.activeAvatar.hasOwnProperty("id")) {
            this.setState({
              ...this.state,
              needAvatar: false,
            });
          } else {
            this.setState({
              ...this.state,
              needAvatar: true,
            });
          }
        } catch (e) {
          this.setState({
            ...this.state,
            needAvatar: true,
          });
        }

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

  checkLocalstorage(data) {
    let WaterTowers = Object.keys(data.waterTowers);

    let waterFinal = [];
    console.log(WaterTowers);
    for (let index = 0; index < WaterTowers.length; index++) {
      const element = WaterTowers[index];
      waterFinal.concat(data.waterTowers[element]);
    }

    let pendings = localStorage.getItem("pendings");
    if (!pendings) {
      localStorage.setItem("pendings", JSON.stringify([]));
      return;
    }

    pendings = JSON.parse(pendings);

    for (let index = 0; index < pendings.length; index++) {
      const element = JSON.parse(pendings[index]);
      let seed = data.seeds.find((e) => e.id == element.id);

      let water = waterFinal.find((e) => e.id == element.id);

      if (water) {
        if (pendings[index] != JSON.stringify(water)) {
          this.removeStorage(pendings[index]);
        }
      } else {
        this.removeStorage(pendings[index]);
      }

      if (seed) {
        if (pendings[index] != JSON.stringify(seed)) {
          this.removeStorage(pendings[index]);
        }
      } else {
        this.removeStorage(pendings[index]);
      }
    }
  }

  removeStorage(data) {
    let datos = JSON.parse(localStorage.getItem("pendings"));
    localStorage.setItem(
      "pendings",
      JSON.stringify(datos.filter((e) => e != data))
    );
  }

  async auth() {
    const auth_status = await Utils._auth();
    if (auth_status == undefined || auth_status == null)
      this.props.history.push("/auth");
  }

  componentDidMount() {
    // enable these in production
    // this.auth();
    this.populateStore();
    setInterval(() => {
      this.populateStore();
    }, 120000);

    if (isMobile()) {
      this.setState({ isMobileOverlayClass: "d-block" });
    }
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

export default connect(mapStateToProps, mapDispatchToProps)(GameBoard);
