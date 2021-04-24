import React, { Component } from 'react';

import { connect } from 'react-redux';

import Card from './cores/card';

import Map from '../assets/img/Map.png';
import ImageMapper from 'react-image-mapper';
import MapModal, { mapAreas, showModal, hover, clicked } from './configs/map';
import SidebarLinks from './configs/sidebarLinks';

class MainArea extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showModal: false,
            area: { name: '' }
        }

        let map_x = {
            name: "MAP",
            areas: mapAreas
        }
        this.map_x = map_x;
        this.showModal = showModal;
        this.hover = hover;
        this.clicked = this.areasLinksOnClick;
    }

    render() {
        return (
            <Card id="main-area" class={ this.props.class }>
                <MapModal username={ this.props.username } area={ this.state.area } shouldModalShow={ () => this.shouldModalShow() } />
                <div id="mapa-termindo" class="scrollable">
                    <ImageMapper
                        src={ Map }
                        map={ this.map_x }
                        onClick={(area, index, e) => this.clicked(area.fullname, index, e)}
                        onMouseEnter={ (area, index, e) => this.hover(area, index, e) }
                        fillColor="rgba(255, 255, 0, 0.521)"
                    />
                </div>
            </Card>
        );
    }

    areasLinksOnClick(linkKey) {
        const areaName = SidebarLinks.regions[0][linkKey];
        this.props.showModals("farms", areaName);
    }

    // utils
    user() {
        return this.props.user !== undefined ? this.props.user : {};
    }

    shouldModalShow() {
        return this.state.showModal == true ? 'block' : 'none';
    }
}

const mapStateToProps = (state, ownProps) => {
    let user = state.API_bucket;
    user = user ? user : state.API_bucket
    return {
        user,
        username: localStorage.getItem("username"),
        map_area: state.map_area
    }
}

const mapDispatchToProps = dispatch => {
    return {
        pushAreasToStore: areas => dispatch({ type: "PUSH AREAS TO STORE", areas: areas }),
        setMapArea: area => dispatch({ type: "SET MAP AREA", area })
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(MainArea);
