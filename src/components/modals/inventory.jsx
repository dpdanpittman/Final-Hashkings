import React, { Component } from 'react';

import { connect } from 'react-redux';
import Modal from 'react-bootstrap/Modal';

import { seedsImgs } from '../../assets/img/seeds/index';
import { regionsImgs } from '../../assets/img/regions/index';
import { waterTowersImgs } from '../../assets/img/watertowers/index';
import { timeBoostersImgs } from '../../assets/img/time_boosters';
import xpBoostersImgs from '../../assets/img/xp_boosters';
import ClosePNG from '../../assets/img/ui/x close.png';
import TransferButton from '../../assets/img/ui/transfer.png';
import UpgradeButton from '../../assets/img/ui/upgrade.png';

import { Farm } from '../configs/farming';

class InventoryModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedForUpgrade: {
                name: '',
                image: '',
                actions: []
            },
            showUpgradeModal: 'none'
        };
    }

    upgradeModal() {
        const item = this.state.selectedForUpgrade;
        const {actions} = item;

        const popups = document.querySelectorAll(`.upgrade-modal .popup`);
        popups.forEach(popup => popup.classList.remove("active"));

        return (
            <div className="upgrade-modal" style={{ display: this.state.showUpgradeModal }}>
                <img onClick={e => this.setState({ showUpgradeModal: 'none' }) } className="close-btn highlight-on-hover" src={ClosePNG} />
                <div className="details">
                    <div className="image-wrapper">
                        <img src={ item.image } />
                    </div>
                    <div className="title">
                        { item.name }
                    </div>
                    <div data-key="1" className="popup p-2">
                        <label className="small d-block">Recipient's username:</label>
                        <input className="form-control" type="text" />
                        <div className="text-center">
                            <img onClick={ e => Farm.transfer(this.props.username, this.state.selectedForUpgrade.item) } className="action-btn highlight-on-hover" src={TransferButton} />
                        </div>
                    </div>
                    <div data-key="2" className="popup p-2">
                        <h5 className="text-center">Requirements</h5>
                        <div className="tag text-center">$1</div>
                        <div className="text-center">
                            <img onClick={ e => Farm.upgrade(this.props.username, this.state.selectedForUpgrade.item) } className="action-btn highlight-on-hover" src={UpgradeButton} />
                        </div>
                    </div>
                    <div data-key="3" className="popup p-2">
                        <h5 className="text-center">Requirements</h5>
                        <div className="tag text-center">$1</div>
                        <div className="text-center">
                            <img onClick={ e => Farm.subdivide(this.props.username, this.state.selectedForUpgrade.item) } className="action-btn highlight-on-hover" src={UpgradeButton} />
                        </div>
                    </div>
                </div>
                <div className="actions">
                    {
                        (() => {
                            if (actions.includes('smoke')) {
                                return (
                                    <>
                                        <div onClick={
                                            e => {
                                                const popups = document.querySelectorAll(`.upgrade-modal .popup`);
                                                popups.forEach(popup => popup.classList.remove("active"));

                                                Farm.smoke(this.props.username, this.state.selectedForUpgrade.item);
                                            }
                                        }>SMOKE</div>
                                        <div onClick={
                                            e => {
                                                const popups = document.querySelectorAll(`.upgrade-modal .popup`);
                                                popups.forEach(popup => popup.classList.remove("active"));

                                                const popup = document.querySelector(`.upgrade-modal .popup[data-key="1"]`);
                                                popup.classList.add("active");
                                            }
                                        }>TRANSFER</div>
                                    </>   
                                )
                            } else if (actions.includes('subdivide')) {
                                return (
                                    <>
                                        <div onClick={
                                            e => {
                                                const popups = document.querySelectorAll(`.upgrade-modal .popup`);
                                                popups.forEach(popup => popup.classList.remove("active"));

                                                const popup = document.querySelector(`.upgrade-modal .popup[data-key="3"]`);
                                                popup.classList.add("active");
                                            }
                                        }>SUBDIVIDE</div>
                                        <div onClick={
                                            e => {
                                                const popups = document.querySelectorAll(`.upgrade-modal .popup`);
                                                popups.forEach(popup => popup.classList.remove("active"));

                                                const popup = document.querySelector(`.upgrade-modal .popup[data-key="1"]`);
                                                popup.classList.add("active");
                                            }
                                        }>TRANSFER</div>
                                    </>
                                )
                            } else if (actions.includes('plant')) {
                                return (
                                    <>
                                        <div onClick={
                                            e => {
                                                if (window.confirm("Are you sure you want to plant this seed?")) Farm.plant(this.props.username, item.id);
                                            }
                                        }>PLANT</div>
                                        <div onClick={
                                            e => {
                                                const popups = document.querySelectorAll(`.upgrade-modal .popup`);
                                                popups.forEach(popup => popup.classList.remove("active"));

                                                const popup = document.querySelector(`.upgrade-modal .popup[data-key="1"]`);
                                                popup.classList.add("active");
                                            }
                                        }>TRANSFER</div>
                                    </>
                                )
                            } else if (actions.includes('upgrade')) {
                                return (
                                    <>
                                        <div onClick={
                                            e => {
                                                const popups = document.querySelectorAll(`.upgrade-modal .popup`);
                                                popups.forEach(popup => popup.classList.remove("active"));

                                                const popup = document.querySelector(`.upgrade-modal .popup[data-key="2"]`);
                                                popup.classList.add("active");
                                            }
                                        }>UPGRADE</div>
                                        <div onClick={
                                            e => {
                                                const popups = document.querySelectorAll(`.upgrade-modal .popup`);
                                                popups.forEach(popup => popup.classList.remove("active"));

                                                const popup = document.querySelector(`.upgrade-modal .popup[data-key="1"]`);
                                                popup.classList.add("active");
                                            }
                                        }>TRANSFER</div>
                                    </>
                                );
                            } else {
                                return (
                                <>
                                    <div onClick={
                                            e => {
                                                const popups = document.querySelectorAll(`.upgrade-modal .popup`);
                                                popups.forEach(popup => popup.classList.remove("active"));

                                                const popup = document.querySelector(`.upgrade-modal .popup[data-key="1"]`);
                                                popup.classList.add("active");
                                            }
                                    }>TRANSFER</div>
                                </>
                                )
                            }
                        })()
                    }
                </div>
            </div>
        );
    };

    render() {
        return (
            <Modal show={ this.props.show } onHide={ () => this.props.hideModal('inventory') } size={ this.props.size || null } centered>
                <div id="inventory-modal" className="base-modal">
                { this.upgradeModal() }
                    <img onClick={ () => this.props.hideModal('inventory') } className="close-btn highlight-on-hover" src={ ClosePNG } />
                    <h1 className="text-center font-weight-bold mb-2">
                        Inventory
                    </h1>
                    <div class="mb-0">
                        <h3 className="text-center">
                            Plots 
                            <div className="text-center inventory_item-total-count">Total: { this.user().plots.length } </div>
                        </h3>
                        <div className="assets-scroll scrollable">
                            { this.renderPlots() }
                        </div>
                    </div>

                    <div class="mb-0">
                        <h3 className="text-center">Seeds 
                            <div className="text-center inventory_item-total-count">Total: { this.user().seeds.length } </div>
                        </h3>
                        <div className="assets-scroll scrollable">
                            { this.renderSeeds() }
                        </div>
                    </div>
                    
                    <div>
                        <div className="text-center">
                            <h3 className="text-center">Water Towers
                                <div className="text-center inventory_item-total-count">Total: { Object.keys(this.user().waterPlants).length } </div>
                            </h3>
                        </div>
                        <div className="assets-scroll scrollable">
                            { this.renderWaterTowers() }
                        </div>
                    </div>

                    <div>
                        <div className="text-center">
                            <h3 className="text-center">Boosters
                                <div className="inventory_item-total-count">Total: {Object.keys(this.user().boosters).length} </div>
                            </h3>
                        </div>
                        <div className="assets-scroll scrollable">
                            { this.renderTimeBoosters() }
                        </div>
                    </div>

                    <div>
                        <div className="text-center">
                            <h3 className="text-center">Joints
                                <div className="inventory_item-total-count">Total: {Object.keys(this.user().boosters).length} </div>
                            </h3>
                        </div>
                        <div className="assets-scroll scrollable">
                            { this.renderJoints() }
                        </div>
                    </div>
                </div>
            </Modal>

        );
    }

    user() {
        return this.props.user !== undefined ? this.props.user : {};
    }
    
    waterTowersCount() {
        let towers = this.user().waterPlants;

        towers = Object.keys(towers).filter(tower => towers[tower] > 0);

        return towers.length;
    }

    getImageForAsset(assetName, images) {
        const cleanedUpAssetName = assetName.toLowerCase().replace(" ", '');
        return images[Object.keys(images).filter(image => image == cleanedUpAssetName)[0]];
    };

    renderPlots() {
        const plots = this.user().plots;
        
        return plots.map(plot => (
            <div className="inventory_asset" onClick={ e => this.setState({ selectedForUpgrade: { item: plot, name: plot.properties.NAME, image: this.getImageForAsset(plot.properties.NAME, regionsImgs), id: plot.properties.id, actions: ['subdivide', 'transfer'], upgradeFunction: e => alert(`Upgrade: ${plot.properties.id}`) }, showUpgradeModal: 'block' }) }>
                <img src={this.getImageForAsset(plot.properties.NAME, regionsImgs)} title={`Click to see options`} />
            </div>
        ));
    };

    renderSeeds() {
        const seeds = this.user().seeds;
        
        return seeds.map(seed => (
            <div className="inventory_asset" onClick={ e => this.setState({ selectedForUpgrade: { item: seed, id: seed.id, name: seed.properties.NAME, image: this.getImageForAsset(seed.properties.NAME, seedsImgs), id: seed.properties.id, actions: ['transfer', 'plant'], upgradeFunction: e => alert(`Upgrade: ${seed.properties.id}`) }, showUpgradeModal: 'block' }) }>
                <img src={this.getImageForAsset(seed.properties.NAME, seedsImgs)} title={`Click to see options`} />
            </div>
        ));
    };

    renderWaterTowers() {
        const towers = this.user().waterPlants;
        return Object.keys(towers).filter(tower => towers[tower] > 0).map(tower => (
            <div className="inventory_asset" onClick={ e => this.setState({ selectedForUpgrade: { item: tower, name: tower, image: this.getImageForAsset(tower, waterTowersImgs), id: tower, actions: ['upgrade', 'transfer'], upgradeFunction: e => alert(`Upgrade: ${tower}`) }, showUpgradeModal: 'block' }) }>
                <img src={this.getImageForAsset(tower, waterTowersImgs)} title={`Click to see options`} />
                <span className="title-tag">
                    { this.hydrateTowerName(tower) }
                </span>
            </div>
        ));
    };

    renderTimeBoosters() {
        const boosters = this.user().timeBoosters || {};

        return Object.keys(boosters).filter(booster => boosters[booster] > 0).map(booster => (
            <div className="inventory_asset" onClick={ e => this.setState({ selectedForUpgrade: { item: booster, name: booster, image: this.getImageForAsset(booster, timeBoostersImgs), id: booster, actions: ['transfer'], upgradeFunction: e => alert(`Upgrade: ${booster}`) }, showUpgradeModal: 'block' }) }>
                <img src={this.getImageForAsset(booster, timeBoostersImgs)} title={`Click to see options`} />
            </div>
        ));
    };

    renderJoints() {
        const joints = this.user().joints || {};

        return Object.keys(joints).filter(joint => joints[joint] > 0).map(joint => (
            <div className="inventory_asset" onClick={ e => this.setState({ selectedForUpgrade: { item: joint, name: joint, image: this.getImageForAsset(joint, xpBoostersImgs), id: joint, actions: ['smoke', 'transfer'], upgradeFunction: e => alert(`Upgrade: ${joint}`) }, showUpgradeModal: 'block' }) }>
                <img src={this.getImageForAsset(joint, xpBoostersImgs)} title={`Click to see options`} />
            </div>
        ));
    };

    hydrateTowerName(tower) {
        switch(tower) {
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
        };
    };
}

const mapStateToProps = state => {
    const user = state.API_bucket.users[state.user];
    return {
        user,
        username: state.user
    }
}

export default connect(mapStateToProps)(InventoryModal);