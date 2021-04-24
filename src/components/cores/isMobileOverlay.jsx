import React from 'react';

import Modal from 'react-bootstrap/Modal';

const IsMobileOverlay = props => (
    <div className={ "is-mobile-modal " + props.class }>
        <h1 className="message">
            <em>😞</em>
            <div>
                <p>Unfortunately, we don't support mobile browsers at this time. Our team is working to bring <b>Hashkings</b> to mobile devices.</p>
                <p>Switch to a desktop browser to continue playing instead.</p>
            </div>
        </h1>
    </div>
);

export default IsMobileOverlay;