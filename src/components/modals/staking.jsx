import React from "react";

import Modal from "react-bootstrap/Modal";
import PoolMotaPNG from "../../assets/img/staking_modal/Pool mota.png";
import StakeMotaPNG from "../../assets/img/staking_modal/Stake mota.png";
import CogolloPNG from "../../assets/img/staking_modal/cogollo.png";
import ClosePNG from "../../assets/img/ui/x close.png";
import { connect } from "react-redux";
import StakeButton from "../../assets/img/ui/boton stake.png";
import UnstakeButton from "../../assets/img/ui/boton unstake.png";
import DepositButton from "../../assets/img/staking_modal/Deposit.png";

import { Farm } from "../configs/farming";

import DisplayLoader from "./displayLoader";

const StakingModal = (props) => {
  const [unstakeBalance, setunstakeBalance] = React.useState(0);

  const [stakeBalance, setstakeBalance] = React.useState(0);

  const [Cantidad, setstakePool] = React.useState(0);

  const getStat = (stat) => {
    return props.user !== undefined ? (
      props.user.tokens[stat]
    ) : (
      <i className="fa fa-circle-o-notch fa-spin text-danger"></i>
    );
  };

  const user = () => (props.user !== undefined ? props.user : {});

  const toggleSubModal = (modal, hide) => {
    const modals = document.querySelectorAll(".submodal");
    const submodal = document.querySelector(`.submodal.${modal}`);
    const wrapper = document.querySelector(`.sub-modal-wrapper`);

    if (hide) {
      wrapper.style.display = "none";
      return submodal.classList.remove("active");
    }

    wrapper.style.display = "block";
    modals.forEach((elm) => elm.classList.remove("active"));

    submodal.classList.add("active");
  };

  const MotaModal = () => {
    return (
      <div className="submodal mota-submodal">
        <img
          onClick={(e) => toggleSubModal("mota-submodal", true)}
          className="close-btn highlight-on-hover"
          src={ClosePNG}
        />
        <div className="body">
          <div>
            {/* <div className="dopist-buds span"> */}
            {/* <img className="icon" src={ CogolloPNG } /> */}
            {/* <span>BUDS BALANCE</span> */}
            <div className="span">buds balance</div>
            <div className="value">{getStat("buds").balance}</div>
            {/* </div> */}
          </div>
          <div>
            <div className="span">
              <div>
                <div>deposit buds</div>
              </div>
            </div>
            <div className="value">
              <input
                onChange={(e) => {
                  setstakePool(e.target.value);
                }}
                type="number"
                step="1"
                min="1"
              />
              <img
                onClick={(e) => {
                  let payload = {
                    username: props.username,
                    cantidad: Cantidad,
                  };
                  props.staking(payload);
                }}
                className="highlight-on-hover deposit-buds"
                src={DepositButton}
              />
            </div>
          </div>
          {/* <div className="dopist-buds plank">
                        <img className="icon" src={ CogolloPNG } />
                        
                    </div>
                </div> */}
          {/* <div className="body mt-3"> */}
          {/* <div className="dopist-buds plank">
                        <img className="icon" src={ CogolloPNG } />
                        <span>DEPOSIT BUDS</span>
                    </div>
                    <div className="dopist-buds plank pt-2">
                        <input style={{ maxWidth: "140px", background: "transparent" }} type="number" step="1" />
                    </div> */}
        </div>
        {/* <div className="header mt-4">
                    <div className="dopist-buds">
                        &nbsp;
                    </div>
                    <img onClick={ e => Farm.depositBuds(props.username, 'nothing has been set to state here yet')} className="highlight-on-hover" style={{ width: "70px", height: "70px", borderRadius: "50%" }} src={ DepositButton } />
                </div> */}
      </div>
    );
  };

  const StakeModal = () => {
    return (
      <div className="submodal stake-submodal">
        <img
          onClick={(e) => toggleSubModal("mota-submodal", true)}
          className="close-btn highlight-on-hover"
          src={ClosePNG}
        />
        <div className="body">
          <div>
            <div className="span">mota balance</div>
            <div className="value">{getStat("mota").balance}</div>
          </div>
          <div>
            <div className="span">
              <div>
                <div>stake mota</div>
              </div>
            </div>
            <div className="value">
              <input
                onChange={(e) => setstakeBalance(e.target.value)}
                type="number"
                step="1"
                min="1"
              />
              <img
                onClick={(e) => Farm.stakeMota(props.username, stakeBalance)}
                className="stake-btn highlight-on-hover"
                src={StakeButton}
              />
            </div>
          </div>
          <div>
            <div className="span">staked balance</div>
            <div className="value">{getStat("mota").stake}</div>
          </div>
          <div>
            <div className="span">
              <div>
                <div>unstake mota</div>
              </div>
            </div>
            <div className="value">
              <input
                type="number"
                onChange={(e) => setunstakeBalance(e.target.value)}
                step="1"
                max={user().tokens.mota.stake}
              />
              <img
                onClick={(e) =>
                  Farm.unstakeMota(props.username, unstakeBalance)
                }
                className="stake-btn highlight-on-hover"
                src={UnstakeButton}
              />
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderTabs = () => {
    const tabs = [
      {
        class: "tab highlight-on-hover",
        headline: "Mota Pool",
        image: PoolMotaPNG,
        link: "mota-submodal",
      },
      {
        class: "tab highlight-on-hover",
        headline: "Staking Pool",
        image: PoolMotaPNG,
        link: "stake-submodal",
      },
    ];
    return tabs.map((tab) => (
      <div
        key={tab.headline}
        onClick={(e) => toggleSubModal(`${tab.link}`)}
        className={tab.class}
      >
        <h4>{tab.headline}</h4>
        <div className="text-center content">
          <img src={tab.image} alt={tab.headline} />
        </div>
      </div>
    ));
  };

  return (
    <>
      <DisplayLoader></DisplayLoader>
      <Modal
        centered
        dialogClassName="staking_modal"
        show={props.show}
        onHide={() => props.hideModal("staking")}
        size={props.size || "lg"}
      >
        <div id="staking_modal">
          {/* <img onClick={e => toggleSubModal('staking_modal', true)} className="close-btn highlight-on-hover" src={ClosePNG} alt="closeHK" /> */}

          {renderTabs()}
        </div>
        <div className="sub-modal-wrapper">
          {MotaModal()}
          {StakeModal()}
        </div>
      </Modal>
    </>
  );
};

const mapStateToProps = (state) => {
  let user = state.API_bucket;
  user = user ? user : state.API_bucket;
  return {
    user,
    username: localStorage.getItem("username"),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    staking: (payload) => dispatch({ type: "POOL/BUDS", payload }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(StakingModal);
