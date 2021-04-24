import React, { Component } from 'react';

import HeaderTab from './headerTab';
import Sidebar from './sidebar';
import MainArea from './mainArea';

import InventoryModal from './modals/inventory';
import ProfileModal from './modals/profile';
import CraftingModal from './modals/crafting';
import FarmsModal from './modals/farmsInRegion';
import StakingModal from './modals/staking';

import { connect } from 'react-redux';
import axios from 'axios';
import Utils from '../utils/index';
import { isLandscape, isMobile } from '../utils/ui';
import IsMobileOverlay from './cores/isMobileOverlay';
import logo from "../assets/img/logo.png";

class GameBoard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isMobileOverlayClass: "d-block",
            showInventory: false,
            showProfile: false,
            showCrafting: false,
            showFarms: false,
            activeFarm: '',
            showStaking: false,
            loading: true

        };


    }



    render() {

        let { loading } = this.state;

        if (loading) {
            return (<div style={{
                display: "grid",
                placeItems: "center",
                width: "100%",
                height: "400px",
                fontSize: "28px"
            }}>
                <img style={{
                    width: "900px"
                }} src={logo} />
            Now Loading ...

            </div >)
        } else {
            return (
                <div id="game-board" className="container-fluid px-5">
                    <IsMobileOverlay class={this.state.isMobileOverlayClass} />
                    <div className="col-12 d-flex flex-row justify-content-center">
                        <HeaderTab showProfile={() => this.showModal("profile")} />
                    </div>
                    <div className="row mt-2 p-0">
                        <Sidebar class="col-6 col-md-3" showModals={(modal, farm = undefined) => this.showModal(modal, farm)} />
                        <MainArea showModals={(modal, farm = undefined) => this.showModal(modal, farm)} class="p-0" />
                    </div>
                    <div>
                        <InventoryModal show={this.state.showInventory} hideModal={modal => this.hideModal(modal)} size="lg" />
                        <ProfileModal show={this.state.showProfile} hideModal={modal => this.hideModal(modal)} size="lg" />
                        <CraftingModal show={this.state.showCrafting} hideModal={modal => this.hideModal(modal)} size="lg" />
                        <FarmsModal activeFarm={this.state.activeFarm} show={this.state.showFarms} hideModal={modal => this.hideModal(modal)} size="lg" />
                        <StakingModal show={this.state.showStaking} hideModal={modal => this.hideModal(modal)} size="lg" />
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
        const API = "http://hashkings.xyz/u/"+localStorage.getItem("username");
        axios.get(API)
            .then(res => {

                this.props.updateStoreFromAPI(res.data)
                console.log(this.props.API_bucket);
                this.setState({
                    ...this.state,
                    loading: false
                })

            })

            .catch(err =>{
                console.log("se produjo un error aqui",err)
                //window.location.href ="/login";
            });
    }

    async auth() {
        const auth_status = await Utils._auth();
        if (auth_status == undefined || auth_status == null) this.props.history.push('/auth');
    }

    componentDidMount() {
        // enable these in production
        // this.auth();
        this.populateStore();

        if (!isMobile()) {
            this.setState({ isMobileOverlayClass: "d-none" });
        }
    }
}


const mapStateToProps = (state, ownProps) => {
    const API_bucket = state.API_bucket
    return {
        state,
        API_bucket: API_bucket
    }
}

const mapDispatchToProps = dispatch => {
    return {
        updateStoreFromAPI: API_bucket => dispatch({ type: "API UPDATE", payload: API_bucket })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(GameBoard);