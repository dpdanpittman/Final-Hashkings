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
             <div className="name" style={{backgroundColor:"white"}}>{avatarsMale[index].properties.XP } | {getLVL(avatarsMale[index].properties.XP)}</div>
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
              <div className="name" style={{backgroundColor:"white"}}>{avatarsFemale[index].properties.XP } | {getLVL(avatarsFemale[index].properties.XP)}</div>
          
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

  const getLVL= (xp) =>{
   
    if (xp >= 45 && xp <= 93) {
      return 1;
    } else if (xp >= 94 && xp <= 146) {
      return 2;
    } else if (xp >= 147 && xp <= 202) {
      return 3;
    } else if (xp >= 203 && xp <= 263) {
      return 4;
    } else if (xp >= 264 && xp <= 401) {
      return 5;
    } else if (xp >= 402 && xp <= 478) {
      return 6;
    } else if (xp >= 479 && xp <= 561) {
      return 7;
    } else if (xp >= 562 && xp <= 651) {
      return 8;
    } else if (xp >= 652 && xp <= 749) {
      return 9;
    } else if (xp >= 750 && xp <= 853) {
      return 10;
    } else if (xp >= 854 && xp <= 967) {
      return 11;
    } else if (xp >= 968 && xp <= 1089) {
      return 12;
    } else if (xp >= 1090 && xp <= 1221) {
      return 13;
    } else if (xp >= 1222 && xp <= 1364) {
      return 14;
    } else if (xp >= 1365 && xp <= 1518) {
      return 15;
    } else if (xp >= 1519 && xp <= 1658) {
      return 16;
    } else if (xp >= 1659 && xp <= 1865) {
      return 17;
    } else if (xp >= 1866 && xp <= 2059) {
      return 18;
    } else if (xp >= 2060 && xp <= 2269) {
      return 19;
    } else if (xp >= 2270 && xp <= 2495) {
      return 20;
    } else if (xp >= 2496 && xp <= 2740) {
      return 21;
    } else if (xp >= 2741 && xp <= 3004) {
      return 22;
    } else if (xp >= 3005 && xp <= 3289) {
      return 23;
    } else if (xp >= 3290 && xp <= 3597) {
      return 24;
    } else if (xp >= 3598 && xp <= 3930) {
      return 25;
    } else if (xp >= 3931 && xp <= 4290) {
      return 26;
    } else if (xp >= 4291 && xp <= 4678) {
      return 27;
    } else if (xp >= 4679 && xp <= 5097) {
      return 28;
    } else if (xp >= 5098 && xp <= 5550) {
      return 29;
    } else if (xp >= 5551 && xp <= 6039) {
      return 30;
    } else if (xp >= 6040 && xp <= 6567) {
      return 31;
    } else if (xp >= 6568 && xp <= 7138) {
      return 32;
    } else if (xp >= 7139 && xp <= 7754) {
      return 33;
    } else if (xp >= 7755 && xp <= 8419) {
      return 34;
    } else if (xp >= 8420 && xp <= 9138) {
      return 35;
    } else if (xp >= 9139 && xp <= 9914) {
      return 36;
    } else if (xp >= 9915 && xp <= 10752) {
      return 37;
    } else if (xp >= 10753 && xp <= 11657) {
      return 38;
    } else if (xp >= 11658 && xp <= 12635) {
      return 39;
    } else if (xp >= 12636 && xp <= 13690) {
      return 40;
    } else if (xp >= 13691 && xp <= 14831) {
      return 41;
    } else if (xp >= 14832 && xp <= 16062) {
      return 42;
    } else if (xp >= 16063 && xp <= 17392) {
      return 43;
    } else if (xp >= 17393 && xp <= 18829) {
      return 44;
    } else if (xp >= 18830 && xp <= 20380) {
      return 45;
    } else if (xp >= 20381 && xp <= 22055) {
      return 46;
    } else if (xp >= 22056 && xp <= 23865) {
      return 47;
    } else if (xp >= 23866 && xp <= 25819) {
      return 48;
    } else if (xp >= 25820 && xp <= 27930) {
      return 49;
    } else if (xp >= 27931 && xp <= 30209) {
      return 50;
    } else if (xp >= 30210 && xp <= 32671) {
      return 51;
    } else if (xp >= 32672 && xp <= 35330) {
      return 52;
    } else if (xp >= 35331 && xp <= 38201) {
      return 53;
    } else if (xp >= 38202 && xp <= 41302) {
      return 54;
    } else if (xp >= 41303 && xp <= 44651) {
      return 55;
    } else if (xp >= 44652 && xp <= 48269) {
      return 56;
    } else if (xp >= 48270 && xp <= 52175) {
      return 57;
    } else if (xp >= 52176 && xp <= 56394) {
      return 58;
    } else if (xp >= 56395 && xp <= 60951) {
      return 59;
    } else if (xp >= 60952 && xp <= 65872) {
      return 60;
    } else if (xp >= 65873 && xp <= 71187) {
      return 61;
    } else if (xp >= 71188 && xp <= 76927) {
      return 62;
    } else if (xp >= 76928 && xp <= 83126) {
      return 63;
    } else if (xp >= 83127 && xp <= 89821) {
      return 64;
    } else if (xp >= 89822 && xp <= 97051) {
      return 65;
    } else if (xp >= 97052 && xp <= 104861) {
      return 66;
    } else if (xp >= 104862 && xp <= 113295) {
      return 67;
    } else if (xp >= 113296 && xp <= 122403) {
      return 68;
    } else if (xp >= 122404 && xp <= 132240) {
      return 69;
    } else if (xp >= 132241 && xp <= 142865) {
      return 70;
    } else if (xp >= 142866 && xp <= 154339) {
      return 71;
    } else if (xp >= 154340 && xp <= 166731) {
      return 72;
    } else if (xp >= 166732 && xp <= 180115) {
      return 73;
    } else if (xp >= 180116 && xp <= 194569) {
      return 74;
    } else if (xp >= 194570 && xp <= 210179) {
      return 75;
    } else if (xp >= 210180 && xp <= 227039) {
      return 76;
    } else if (xp >= 227040 && xp <= 264912) {
      return 77;
    } else if (xp >= 264913 && xp <= 286150) {
      return 78;
    } else if (xp >= 286151 && xp <= 309087) {
      return 79;
    } else if (xp >= 309088 && xp <= 333859) {
      return 80;
    } else if (xp >= 333860 && xp <= 360612) {
      return 81;
    } else if (xp >= 360613 && xp <= 389506) {
      return 82;
    } else if (xp >= 389507 && xp <= 420712) {
      return 83;
    } else if (xp >= 420713 && xp <= 454414) {
      return 84;
    } else if (xp >= 454415 && xp <= 490812) {
      return 85;
    } else if (xp >= 490813 && xp <= 530122) {
      return 86;
    } else if (xp >= 530123 && xp <= 572577) {
      return 87;
    } else if (xp >= 572578 && xp <= 618428) {
      return 88;
    } else if (xp >= 618429 && xp <= 667947) {
      return 89;
    } else if (xp >= 667948 && xp <= 721428) {
      return 90;
    } else if (xp >= 721429 && xp <= 779187) {
      return 91;
    }

    return "91+"
  }
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
