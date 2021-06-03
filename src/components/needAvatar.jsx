import React, { Component } from "react";
import Shaggi from "../assets/img/shaggi.png";
import logo from "../assets/img/logo.png";
class NeedAvatar extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div
        className="authentication"
        style={{
          display: "grid",
          placeItems: "center",
        }}
      >
        <img
          style={{
            width: "900px",
          }}
          src={logo}
        />
        <div
          className="row g-2 py-4 row-cols-2 row-cols-lg-3"
          style={{ alignItems: "center", justifyContent: "center" }}
        >
          <div className="col">
            <img style={{ maxWidth: "60%" }} src={Shaggi} />
          </div>
          <div className="col">
            <div
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.3)",
                padding: "17px",
              }}
            >
              <h1>Sorry u need a avatar to play the game</h1>
              <p>
                buy one now{" "}
                <a
                  ref={(el) => {
                    if (el) {
                      el.style.setProperty(
                        "color",
                        "red",
                        "important"
                      );
                    }
                  }}
                  href="https://www.hashkings.app/avatars"
                >
                  here
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default NeedAvatar;
