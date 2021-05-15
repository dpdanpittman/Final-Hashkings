import React from "react";
import { connect } from "react-redux";
import Modal from "react-bootstrap/Modal";
import changeProfilePictureTransaction from "../configs/profilePictures";
import Profiles from "../../assets/img/profile_pictures";

const ProfilePictureModal = (props) => {
  const [activeProfile, setActiveProfile] = React.useState({
    ...Profiles.Tifica,
  });
  const [activeGender, setActiveGender] = React.useState(null);

  const genders = ["male", "female"];

  const extractByGender = (gender) => {
    let Objects = [];
    let avatars = props.avatars.avatars ? props.avatars.avatars : [];

    let avatarsMale = [];
    let avatarsFemale = [];

    for (let index = 0; index < avatars.length; index++) {
      const element = avatars[index];

      for (const key of Object.keys(Profiles)) {
        if (Profiles[key].name == element.properties.NAME) {
          if (Profiles[key].gender == "male") {
            avatarsMale.push({ ...element, image: Profiles[key].image });
          } else {
            avatarsFemale.push({ ...element, image: Profiles[key].image });
          }
        }
      }
    }

    if (gender == "male") {
      for (let index = 0; index < avatarsMale.length; index++) {
        Objects.push(
          <div
            key={avatarsMale[index].properties.NAME + index + Math.random(13)}
            onClick={(e) => handleClick(e, avatarsMale[index])}
            className="profile-image-thumbnail-wrapper"
          >
            <div className="image-wrapper">
              <img
                className="highlight-on-hover"
                src={avatarsMale[index].image}
              />
            </div>
            <div className="name">{avatarsMale[index].properties.NAME}</div>
          </div>
        );
      }
    } else {
      for (let index = 0; index < avatarsFemale.length; index++) {
        Objects.push(
          <div
            key={avatarsFemale[index].properties.NAME + index + Math.random(13)}
            onClick={(e) => handleClick(e, avatarsFemale[index])}
            className="profile-image-thumbnail-wrapper"
          >
            <div className="image-wrapper">
              <img
                className="highlight-on-hover"
                src={avatarsFemale[index].image}
              />
            </div>
            <div className="name">{avatarsFemale[index].properties.NAME}</div>
          </div>
        );
      }
    }

    return Objects;
  };

  const handleClick = (e, avatarExist) => {
    props.changeAvatar(avatarExist);
  };

  const getActiveImage = () => {
    for (const key of Object.keys(Profiles)) {
      if (Profiles[key].name == props.activeAvatar.properties.NAME) {
        return Profiles[key].image;
      }
    }

    return Profiles.Tifica.image;
  };

  return (
    <Modal show={props.show} onHide={() => props.onhide()}>
      <div id="profile-image-modal">
        <div className="presentation">
          <div className="image-wrapper">
            <img src={getActiveImage()} />
          </div>
          <div className="text">{props.activeAvatar.properties.NAME}</div>
        </div>
        <div className="logic">
          <div className="radio-buttons-group">
            <div className="small">Choose your gender</div>
            {genders.map((gender, i) => (
              <>
                <label key={gender + i} className="m-2">
                  <input
                    name="gender"
                    onChange={(e) => setActiveGender(e.currentTarget.value)}
                    value={gender}
                    type="radio"
                    label={gender.toUpperCase()}
                  />
                  {gender.toUpperCase()}
                </label>
              </>
            ))}
          </div>
          <div className="thumbnails-container">
            {extractByGender(activeGender)}
          </div>
        </div>
      </div>
    </Modal>
  );
};

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeAvatar: (payload) => dispatch({ type: "CHANGE/AVATAR", payload }),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfilePictureModal);
