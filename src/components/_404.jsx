import React from "react";
import logo from "../assets/img/logo.png";


const four_oh_four = (props) => (
  <div className="authentication">
    <div
      style={{
        display: "grid",
        placeItems: "center",
        width: "100%",
        height: "60%",
        fontSize: "28px",
      }}
    >
      <img
        style={{
          width: "900px",
        }}
        src={logo}
      />
      <center>
        <h1>Oops, looks like we can't find your page</h1>
        <br />
        <br />
        Please report this error in our{" "}
        <a href="https://discord.gg/FeeVASqh55" target="blank">
          {" "}
          Discord Server
        </a>
      </center>
    </div>
  </div>
);

export default four_oh_four;
