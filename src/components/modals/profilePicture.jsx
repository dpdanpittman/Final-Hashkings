import React from 'react';

import Modal from 'react-bootstrap/Modal';
import changeProfilePictureTransaction from '../configs/profilePictures';
import Profiles from '../../assets/img/profile_pictures';

const ProfilePictureModal = props => {
    const [activeProfile, setActiveProfile] = React.useState({
        ...Profiles.Tifica
    });
    const [activeGender, setActiveGender] = React.useState(null);

    const genders = [
        'male',
        'female'
    ];

    const extractByGender = gender => Object.keys(Profiles).filter(profile => Profiles[profile].gender == gender).map(profile => ( 
        <div key={Profiles[profile].name} onClick={ e => handleClick(e, profile) } className="profile-image-thumbnail-wrapper">
            <div className="image-wrapper">
                <img className="highlight-on-hover" src={ Profiles[profile].image } />
            </div>
            <div className="name">
                { Profiles[profile].name }
            </div>
        </div>
    ));

    const handleClick = (e, profile) => {
        setActiveProfile(Profiles[profile]);
        
        changeProfilePictureTransaction();
    };

    return (
        <Modal show={ props.show } onHide={ () => props.onhide() }>
            <div id="profile-image-modal">
                <div className="presentation">
                    <div className="image-wrapper"><img src={ activeProfile.image } /></div>
                    <div className="text">{ activeProfile.name }</div>
                </div>
                <div className="logic">
                    <div className="radio-buttons-group">
                        <div className="small">Choose your gender</div>
                        {
                            genders.map( (gender,i) => (
                                <>
                                    <label key={gender+i} className="m-2">
                                        <input name="gender" onChange={ e => setActiveGender(e.currentTarget.value) } value={gender} type="radio" label={ gender.toUpperCase() } />
                                        { gender.toUpperCase() }
                                    </label>
                                </>
                            ))
                        }
                    </div>
                    <div className="thumbnails-container">
                        { extractByGender(activeGender) }
                    </div>
                </div>
            </div>
        </Modal>
    );
}

export default ProfilePictureModal;