import React, { Component } from 'react';

import Modal from 'react-bootstrap/Modal';
import { connect } from 'react-redux';
import { regionsImgs } from '../../assets/img/regions';
import HojaPNG from '../../assets/img/ui/Hoja.png';
import PopupBackgroundPNG from '../../assets/img/ui/Madera para info.png';
import TimeboosterPNG from '../../assets/img/ui/button timebooster.png';
import { regionsToMiniatures, farmingOperationsImgs, Farm } from '../configs/farming';
import { timeBoostersImgs } from '../../assets/img/time_boosters';
import ClosePNG from '../../assets/img/ui/x close.png';


class FarmsInRegion extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeFarm: {
                name: '',
                image: ''
            }
        }
    }

    render() {
        return (
            <>
                <div className="farms-in-region">
                    <Modal dialogClassName="border-0" show={ this.props.show } onHide={ () => this.props.hideModal('farms') } size={ this.props.size || null }>
                        <div className="farms-in-region-wrapper">
                            <div id="farms-in-region">
                                <div className="items">
                                    { this.extractUsedPlots(this.props.activeFarm) }
                                </div>
                            </div>
                            <div className="popup">
                                <img className="background" src={ PopupBackgroundPNG } />
                                <div className="content">
                                    <img className="active-farm-image highlight-on-hover" src={ this.state.activeFarm.image } alt={ this.state.activeFarm.name } />
                                    <div className="controls">
                                        <div className="farm-operations">
                                            { this.renderFarmingOperationsButtons() }
                                        </div>
                                        <div className="slider-wrapper">
                                            <div>
                                                Time left: A
                                            </div>
                                        </div>
                                        <div className="booster-wrapper">
                                            <img onClick={ e => this.activateTimeboosterPopup() } className="highlight-on-hover" src={ TimeboosterPNG } />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            { this.renderTimeBoostersPopup() }
                        </div>
                    </Modal>
                </div>
            </>
        );
    };

    activateTimeboosterPopup() {
        document.querySelector(`.timeboosters-popup`).classList.add('active');
    }

    getImageForAsset(assetName, images) {
        const cleanedUpAssetName = assetName.toLowerCase().replace(" ", '');
        return images[Object.keys(images).filter(image => image == cleanedUpAssetName)[0]];
    };

    renderTimeBoostersPopup() {
        let boosters = this.props.user.timeBoosters;

        boosters = Object.keys(boosters).filter(booster => boosters[booster] > 0).map(booster => (
            <div className="inventory_asset">
                <div className="d-flex flex-row justify-content-around align-items-center" style={{ height: "50px" }}>
                    <span>{ booster }</span>
                    <img onClick={ e => e.currentTarget.parentElement.classList.remove("active") } src={this.getImageForAsset(booster, timeBoostersImgs)} title={`Click to see options`} />
                </div>
                <div>
                    <button onClick={ e => Farm.useTimebooster(this.props.username, booster) } className="btn btn-primary btn-block small p-0">Boost!</button>
                </div>
            </div>
        ));

        return (
            <div className="timeboosters-popup">
                <img onClick={ e => document.querySelector(`.timeboosters-popup`).classList.remove("active") } className="highlight-on-hover close-btn" src={ ClosePNG } />
                <h6 className="text-center">Available Time Boosters</h6>
                { boosters }
            </div>
        );
    }

    renderFarmingOperationsButtons() {
        const buttons = farmingOperationsImgs;
        return Object.keys(buttons).map(button => <><img title={ `${button} this farm!` } onClick={ () => Farm[button](this.props.username, this.state.activeFarm) } className={ button + " highlight-on-hover farm-operation-button" } src={ buttons[button] } alt={ `${button}ing button` } /><i className="mx-2">&nbsp;</i></>);
    }

    selectActiveFarm(farm) {
        const image = regionsToMiniatures[Object.keys(regionsToMiniatures).filter(img => img == farm)[0]];

        farm = {
            name: farm,
            image
        };
        this.setState({ activeFarm: farm });
        document.querySelector(".farms-in-region-wrapper .popup").classList.add("active");
    }

    extractUsedPlots(farm) {
        console.log(farm);

        const allPlots = this.props.user !== undefined ? this.props.user.plots : [];

        if (allPlots == []) return (
            <div className="no-farms-notice">
                <h3 className="alert">
                    You have no farms in this region.
                </h3>
            </div>
        );

        let plots = allPlots.filter(plot => plot.properties.NAME.toLowerCase().replace(" ", "") == farm.toLowerCase().replace(" ", ""));
        if (plots.length === 0) return (
            <div className="no-farms-notice">
                <h3 className="alert">
                    You have no farms in this region.
                </h3>
            </div>
        )
        else
            return this.renderJSXForItems(plots);
    }

    renderJSXForItems(plots) {

        return plots.map(plot => {
            const plotName = plot.properties.NAME;
            const image = Object.keys(regionsToMiniatures).filter(img => plotName.toLowerCase() === img)[0];

            return (
                <div onClick={ e => this.selectActiveFarm(plotName.toLowerCase()) } className="item highlight-on-hover">
                    <div className="image">
                        <img src={regionsToMiniatures[image]} alt={ plotName } />
                    </div>
                </div>
            );
        });
    }
}

const mapStateToProps = state => {
    const bucket = state.API_bucket;
    const user = state.API_bucket.users[state.user];
    const username = state.user;
    return {
        user,
        bucket,
        username
    };
}

export default connect(mapStateToProps)(FarmsInRegion);