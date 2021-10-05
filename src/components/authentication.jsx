import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";

import contact from "./configs/contact";

import LogoPNG from "../assets/img/logo.png";
import HivesignerPNG from "../assets/img/hivesigner.png";

import hivesignerClient from "../services/hivesigner";

import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import {
  TwitterTimelineEmbed,
  TwitterShareButton,
  TwitterFollowButton,
  TwitterHashtagButton,
  TwitterMentionButton,
  TwitterTweetEmbed,
  TwitterMomentShare,
  TwitterDMButton,
  TwitterVideoEmbed,
  TwitterOnAirButton,
} from "react-twitter-embed";
class AuthenticationView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mode: "app",
      loginModalShow: false,
      signupModalShow: false,
      username: "",
    };
    this._handleInputChange = this._handleInputChange.bind(this);
  }

  _handleInputChange(event) {
    const { value, name } = event.target;

    console.log(value, name);

    this.setState({
      [name]: value,
    });
  }

  render() {
    const { username } = this.state;
    return (
      <>
        <div className="authentication">
          <div className="overlay"></div>
          <div className="auth-screen-tabstrip">
            <div className="social-links">
              <a target="_blank" href={contact.discord.link}>
                <img
                  src={contact.discord.image}
                  title="Join our Discord community"
                  alt="Join our Discord community"
                />
              </a>
              <a target="_blank" href={contact.twitter.link}>
                <img
                  src={contact.twitter.image}
                  title="Connect with us on Twitter"
                  alt="Connect with us on Twitter"
                />
              </a>
              <a target="_blank" href={contact.nft.link}>
                <img src={contact.nft.image} title="" alt="" />
              </a>
              <a target="_blank" href={contact.blog.link}>
                <img
                  src={contact.blog.image}
                  title="Checkout the Hashkings blog"
                  alt="Checkout the Hashkings blog"
                />
              </a>
            </div>
            <img className="logo-grande" src={LogoPNG} alt="Hashkings: Logo" />
            <div className="auth-screen-link-wrapper">
              <a href="/signup" className="auth-screen-link">
                Sign up
              </a>
              <a href="/login" className="auth-screen-link">
                Log in
              </a>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <button
                onClick={(e) => this.toggleHowToPlay(e)}
                className="how-to-play-btn px-1"
              >
                How to play
              </button>
              <br></br>
              <button
                onClick={() => (window.location.href = "/login")}
                className="play-now-btn px-1"
              >
                Play Now
              </button>
            </div>

            <div className="col" style={{ width: "400px", height: "400px", textAlign: "center"}}>
              <TwitterTimelineEmbed
                sourceType="profile"
                screenName="HashkingsGame"
                options={{ height: 400, width: 500 }}
              />
            </div>

            <Modal
              show={this.state.loginModalShow}
              onHide={() => this.setState({ loginModalShow: false })}
              centered
            >
              <div className="modal-transparent-overlay">
                <Modal.Header closeButton></Modal.Header>
                <Modal.Body>
                  <div className="mb-3">
                    <label
                      className="d-block text-center"
                      style={{ fontWeight: "500", fontSize: "120%" }}
                    >
                      Username
                    </label>
                    <input
                      value={username}
                      onChange={this._handleInputChange}
                      name="username"
                      type="text"
                      style={{ background: "white" }}
                      className="form-control bg-white w-100"
                    />
                  </div>
                  <div className="mb-4">
                    <h4 align="center">Login with</h4>
                  </div>
                  <div className="mt-2">
                    <Button
                      variant="light"
                      size="lg"
                      block
                      onClick={(e) => this.loginKeychain(username)}
                    >
                      <i
                        className="fa fa-lock mr-2"
                        style={{ fontSize: "1.5em" }}
                      ></i>{" "}
                      <span>Keychain</span>
                    </Button>
                  </div>
                  {/*
                                    <div className="mt-2">
                                        <Button onClick={e => this.handleLogin()} variant="light" size="lg" block>
                                            <img src={HivesignerPNG} alt="Hivesigner logo" width="25" height="25" /> <span>Hivesigner</span>
                                        </Button>
                                    </div>  */}
                  <div className="mt-5 mb-3">
                    <h5 align="center">Don't have a Hive account?</h5>
                    <div className="d-flex flex-row justify-content-center">
                      <Button
                        onClick={(e) => window.location.href = "https://signup.hive.io/"}
                      >
                        Sign up with Hive
                      </Button>
                    </div>
                  </div>
                </Modal.Body>
              </div>
            </Modal>
            <Modal
              show={this.state.signupModalShow}
              onHide={() => this.setState({ signupModalShow: false })}
              centered
            >
              <div className="modal-transparent-overlay">
                <Modal.Header closeButton></Modal.Header>
                <Modal.Body>
                  <div className="mt-4 mb-3">
                    <div className="d-flex flex-row justify-content-center">
                      <Button   onClick={(e) => window.location.href = "https://signup.hive.io/" } >Sign up with Hive</Button>
                    </div> 
                  </div>
                  <div className="mt-5 mb-3">
                    <h5 align="center">Already have a Hive account?</h5>
                    <div className="mt-2 d-flex flex-row justify-content-center">
                      <Button
                        variant="light"
                        onClick={(e) => this.props.history.push("/login")}
                      >
                        Login here
                      </Button>
                    </div>
                  </div>
                </Modal.Body>
              </div>
            </Modal>
            <article id="how-to-play">
              <h1 className="title">
                How To Play
                <span onClick={(e) => this.toggleHowToPlay(e)}>close</span>
              </h1>
              <hr />
              <section>
                Hashkings is a NFT(non-fungible token) powered Cannabis farming
                simulator on the Hive Blockchain. {" "}
                <hr></hr>
                Learn <a  className="resaltar"href="https://hashkings-2.gitbook.io/getting-started/">how to join</a> the hashkings ecosystem using our official gitbook{" "}
                <hr></hr>
                Aprende a <a className="resaltar"href="https://hashkings-2.gitbook.io/hashkings-es/">jugar</a> hashkings con nuestra gitbook oficial
              </section>
            </article>
          </div>
        </div>
      </>
    );
  }

  componentDidMount() {
    this.evaluateComponentMode();
  }

  toggleHowToPlay(e) {
    const elm = document.getElementById("how-to-play");
    const classes = [...elm.classList];
    if (classes.includes("active")) {
      elm.classList.remove("active");
    } else {
      elm.classList.add("active");
    }
  }

  handleLogin() {
    const login_link = hivesignerClient.getLoginURL();
    window.location.href = login_link;
  }

  loginKeychain(username) {
    if (!Object.prototype.hasOwnProperty.call(window, "hive_keychain")) {
      alert("please install hive keychain");

      return;
    }

    if (!username) {
      alert("please write a username");
      return;
    }

    window.hive_keychain.requestSignBuffer(
      username,
      "Login to hashkings",
      "Posting",
      async (response) => {
        if (response.success === true) {
          //
          await this.props.saveNameToState(response["data"]["username"]);
          localStorage.setItem("username", response["data"]["username"]);
          this.props.history.push("/play");
        } else {
          // window.location.reload();
        }
      }
    );
  }

  evaluateComponentMode() {
    this.state.mode = this.props.mode;
    switch (this.state.mode) {
      case "login":
        this.setState({ loginModalShow: true });
        break;
      case "signup":
        this.setState({ signupModalShow: true });
        break;
      case "callback":
        let access_token, expires_in, username;
        const params = new URLSearchParams(window.location.search);
        access_token = params.get("access_token");
        expires_in = params.get("expires_in");
        username = params.get("username");

        hivesignerClient.setAccessToken(access_token);
        this.props.saveNameToState(username);
        this.props.history.push("/play");

        break;
    }
  }
}

const mapStateToProps = (state, ownProps) => {
  //let user = state.API_bucket.users[state.user];
  //user = user ? user : state.API_bucket.users[localStorage.getItem("username")]
  return {
    map_area: state.map_area,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    saveNameToState: (username) =>
      dispatch({ type: "UPDATE USERNAME", username }),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(AuthenticationView));
