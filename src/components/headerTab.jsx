import React from 'react';

import { connect } from 'react-redux';
import Button from 'react-bootstrap/Button';

import H2OPNG from '../assets/img/ui/H2O.png';
import BudsPNG from '../assets/img/ui/BUDS.png';
import MotaPNG from '../assets/img/ui/Moneda2.png';
import XpPNG from '../assets/img/ui/Icono XP.png';
import FarmerPNG from '../assets/img/profile_pictures/Farmer.png';

function HeaderTab(props) {
    // console.log(" User Dets :>> ", props.userDets)
    const getXPWidth = xp => `${xp}px`;

    const getStat = stat => {
        return props.userDets !== undefined ? props.userDets[stat] : <i className="fa fa-circle-o-notch fa-spin text-danger"></i>;
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
                    <div className="tag">{ getStat('hkwater') }</div>
                </div>
            </div>

            <div>
                <div className="icon-group">
                    <img src={ MotaPNG } alt="MOTA" title="MOTA" />
                    <div className="tag">{ parseInt(user().tokens.mota.stake) + parseInt(user().tokens.mota.balance) }</div>
{/* >>>>>>> 59ba91075a0e2901d530b52a93e79a78d5e68622 */}
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
                        <div className="xp-slide" style={{ width: parseInt(user().xp) + 'px' }}>&nbsp;</div>
                        <em>{ parseInt(user().xp) }</em>
                    </div>
                </div>
            </div>
        </section>
    ) 
}

const mapStateToProps = (state, ownProps) => {
    return {
        user: state.user,
        bucket: state.API_bucket,
        userDets: state.API_bucket.users[state.user]
    }
}

// next: mapDispatch to update state with areas so that sidebar can pull and fix onclick

export default connect(mapStateToProps)(HeaderTab);