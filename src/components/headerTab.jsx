import React from 'react';

import { connect } from 'react-redux';
import Button from 'react-bootstrap/Button';

import H2OPNG from '../assets/img/ui/H2O.png';
import BudsPNG from '../assets/img/ui/BUDS.png';
import MotaPNG from '../assets/img/ui/Moneda2.png';
import XpPNG from '../assets/img/ui/Icono XP.png';
import LvPNG from '../assets/img/ui/Level.png';
import FarmerPNG from '../assets/img/profile_pictures/Farmer.png';

function HeaderTab(props) {
    // console.log(" User Dets :>> ", props.userDets)
    const getXPWidth = xp => `${xp}px`;

    const getStat = stat => {
        console.log("",props.userDets)
        return props.userDets !== undefined ? props.userDets.tokens.hkwater[stat] : <i className="fa fa-circle-o-notch fa-spin text-danger"></i>;
    }

    const user = () => props.userDets !== undefined ? props.userDets : {};

    return (
        <section id="header-tab" className="bg-bg-transparent col-12 col-md-7 d-flex flex-row justify-content-around">
            <Button variant="link" onClick={ () => props.showProfile() } style={{ padding: '0px' }}>
                <div className="icon-group">
                    <img src={ FarmerPNG } alt="My Profile" title="My Profile" />
                    <div className="tag">{ props.user }</div>
                </div>
            </Button>
            <div>
                <div className="icon-group">
                    <img src={ H2OPNG } alt="WATER" title="WATER" />
                    <div className="tag">{ getStat('balance') }</div>
                </div>
            </div>

            <div>
                <div className="icon-group">
                    <img src={ MotaPNG } alt="MOTA" title="MOTA" />
                    <div className="tag">{ parseInt(user().tokens.mota.stake) + parseInt(user().tokens.mota.balance) }</div>
                </div>
            </div>
            <div>
                <div className="icon-group">
                    <img src={ BudsPNG } alt="BUDS" title="BUDS" />
                    <div className="tag">{ parseInt(user().tokens.buds.stake) + parseInt(user().tokens.buds.balance) }</div>
                </div>
            </div>
            <div>
                <div className="icon-group">
                    <img style={{ transform: 'scale(1.2)' }} src={ XpPNG } alt="XP" title="XP" />
                    <div className="xp-tag">
                        <em>{ parseInt(user().xp) }</em>
                    </div>
                </div>
            </div>
            <div>
                <div className="icon-group">
                    <img style={{ transform: 'scale(1.2)' }} src={ LvPNG } alt="LV" title="LV" />
                    <div className="lv-tag">
                        <em>{ parseInt(user().lvl) }</em>
                    </div>
                </div>
            </div>
        </section>
    ) 
}

const mapStateToProps = (state, ownProps) => {
    
    let user = state.API_bucket
    console.log("header", user)

    return {
        user: localStorage.getItem("username"),
        bucket: state.API_bucket,
        userDets: user
    }
}

// next: mapDispatch to update state with areas so that sidebar can pull and fix onclick

export default connect(mapStateToProps)(HeaderTab);