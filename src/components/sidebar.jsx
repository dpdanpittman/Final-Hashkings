import React, { Component, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { showModal } from "./configs/map";
import { hover } from "./configs/map";

import contact from "./configs/contact";

import Card from "./cores/card";
import SidebarLinks from "./configs/sidebarLinks";

import Button from "react-bootstrap/Button";

import HivePNG from "../assets/img/socialmedia/Hive.png";
import DiscordPNG from "../assets/img/socialmedia/Discord.png";
import NFTmArtPNG from "../assets/img/socialmedia/NFTmart.png";
import TwitterPNG from "../assets/img/socialmedia/Twitter.png";
import CraftButtonPNG from "../assets/img/ui/Boton_craft.png";
import LogoPNG from "../assets/img/logo.png";
import InventoryPNG from "../assets/img/ui/boton inventario.png";
import HojaPNG from "../assets/img/ui/Hoja.png";
import StakeButtonPNG from "../assets/img/ui/boton stake.png";
import MotaLabPNG from "../assets/img/ui/mota lab.png";
import StorePNG from "../assets/img/ui/store.png";
import AfghanistanPNG from "../assets/img/continents/Afganistan.png";
import AfricaPNG from "../assets/img/continents/Africa.png";
import AsiaPNG from "../assets/img/continents/Asia.png";
import JamaicaPNG from "../assets/img/continents/Jamaica.png";
import MexicoPNG from "../assets/img/continents/Mexico.png";
import SouthAmericaPNG from "../assets/img/continents/Sudamerica.png";
import fantomPNG from "../assets/img/Fantom_round.png";

import DepositButton from "../assets/img/staking_modal/Deposit.png";
import ClosePNG from "../assets/img/ui/x close.png";

import Avatar1PNG from "../assets/img/profile_pictures/Farmer.png";
import Avatar2PNG from "../assets/img/profile_pictures/Terrateniente.png";
import Avatar3PNG from "../assets/img/profile_pictures/Farmer lady.png";
import Avatar4PNG from "../assets/img/profile_pictures/Lady of 20s.png";

import rentalsPNG from "../assets/img/ui/Boton cash.png"

const TimeServer = () => {
  let [time, setTime] = useState(
    new Date().toISOString().split("T")[1].split("Z")[0].split(".")[0]
  );
  setInterval(() => {
    setTime(new Date().toISOString().split("T")[1].split("Z")[0].split(".")[0]);
  }, 1000);

  return <>{time}</>;
};

class SideBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showModal: false,
      showModalStore: false,
      area: {},
    };
  }

  componentDidUpdate() {}

  render() {
    return (
      <Card id="sidebar" class={this.props.class} style={this.props.style}>
        <div>
          <img className="background" src={HojaPNG} />
          <div className="logo-wrapper">
            <img src={LogoPNG} alt="Hashkings logo" id="haskings_logo" />
          </div>
          <div className="links-wrapper">
            <div className="d-flex flex-row justify-content-around regions-row">
              <div>
                <img
                  className="inventory-button"
                  onClick={(e) => this.props.showModals("inventory")}
                  src={InventoryPNG}
                  alt="Your inventory | Hashkings"
                />
                <div className="inventory-label small text-center">
                  Inventory
                </div>
              </div>

              <div>
                <img
                  className="inventory-button"
                  onClick={(e) => window.location.href = "https://farm.hashkings.app/rentals"}
                  src={rentalsPNG}
                  alt="Rentals | Hashkings"
                  style={{
                    maxWidth: "54px",
                    top: "-12px"
                }}
                />
                <div className="inventory-button" style={{
                    maxWidth: "54px",
                    top: "-4px"
                }}>
                  Rents
                </div>
              </div>

              <div>
                <img
                  onClick={(e) =>
                    this.setState({ ...this.state, showModalStore: true })
                  }
                  className="inventory-button"
                  src={StorePNG}
                  alt="Store"
                  title="Store"
                />
                <div className="inventory-label small text-center">Store</div>
              </div>
            </div>

            <div className="sidebar_regions-links my-2">
              <div className="d-flex flex-row justify-content-around regions-row">
                <div>
                  <img
                    onClick={(e) =>
                      this.areasLinksOnClick("Asia", SidebarLinks.regions[0])
                    }
                    src={AsiaPNG}
                    alt="Continent Asia on Hashkings"
                  />
                  <div className="tag reg-name">Asia</div>
                </div>
                <div>
                  <img
                    onClick={(e) =>
                      this.areasLinksOnClick("Africa", SidebarLinks.regions[0])
                    }
                    src={AfricaPNG}
                    alt="Continent Africa on Hashkings"
                  />
                  <div className="tag reg-name">Africa</div>
                </div>
                <div>
                  <img
                    onClick={(e) =>
                      this.areasLinksOnClick(
                        "Afghanistan",
                        SidebarLinks.regions[0]
                      )
                    }
                    src={AfghanistanPNG}
                    alt="Country Afghanistan on Hashkings"
                  />
                  <div className="tag reg-name">Afghanistan</div>
                </div>
              </div>
              <div className="d-flex flex-row justify-content-around regions-row">
                <div>
                  <img
                    onClick={(e) =>
                      this.areasLinksOnClick("Jamaica", SidebarLinks.regions[0])
                    }
                    src={JamaicaPNG}
                    alt="Country Jamaica on Hashkings"
                  />
                  <div className="tag reg-name">Jamaica</div>
                </div>
                <div>
                  <img
                    onClick={(e) =>
                      this.areasLinksOnClick("Mexico", SidebarLinks.regions[0])
                    }
                    src={MexicoPNG}
                    alt="Country Mexico on Hashkings"
                  />
                  <div className="tag reg-name">Mexico</div>
                </div>
                <div>
                  <img
                    onClick={(e) =>
                      this.areasLinksOnClick(
                        "South America",
                        SidebarLinks.regions[0]
                      )
                    }
                    src={SouthAmericaPNG}
                    alt="Continent South America on Hashkings"
                  />
                  <div className="tag reg-name">South America</div>
                </div>
              </div>
            </div>

            <div className="sidebar_crafting-links craft-button-row">
              <div>
                <img
                  onClick={(e) => this.props.showModals("crafting")}
                  className="highlight-on-hover craft-button"
                  src={CraftButtonPNG}
                  alt="Craft Items"
                  title="Craft Items"
                />
                <div className="text-center small">Crafting</div>
              </div>

              <div style={{}}>
                <img
                  onClick={(e) => this.props.showModals("fantom")}
                  className="highlight-on-hover stake-button"
                  src={fantomPNG}
                  alt="fantom send"
                  title="fantom send"
                  style={{marginLeft: "0em"}}
                />
                <div className="text-center small">Fantom</div>
              </div>

              <div>
                <img
                  onClick={(e) => this.props.showModals("staking")}
                  className="highlight-on-hover stake-button"
                  src={MotaLabPNG}
                  alt="Stake Items"
                  title="Stake Items"
                />
                <div className="text-center small"> Lab</div>
              </div>
            </div>

            <div className="sidebar_crafting-links my-3">
              <div className="d-flex flex-row justify-content-around">
                <a
                  target="_blank"
                  href={contact.nft.link}
                  className="highlight-on-hover"
                  title="NFTmArt"
                >
                  <img
                    className="social-link-image"
                    src={contact.nft.image}
                    alt="Hashkings NTFmArt: "
                    alt=""
                  />
                </a>
                <a
                  target="_blank"
                  href={contact.blog.link}
                  className="highlight-on-hover"
                  title="Hashking Blog"
                >
                  <img
                    className="social-link-image"
                    src={contact.blog.image}
                    alt="Hashking Blog: "
                  />
                </a>
                <a
                  target="_blank"
                  href={contact.twitter.link}
                  className="highlight-on-hover"
                  title="Twitter"
                >
                  <img
                    className="social-link-image"
                    src={contact.twitter.image}
                    alt="Twitter"
                  />
                </a>
                <a
                  target="_blank"
                  href={contact.discord.link}
                  className="highlight-on-hover"
                  title="Discord"
                >
                  <img
                    className="social-link-image"
                    src={contact.discord.image}
                    alt="Hashkings Discord: https://discord.gg/aCMpRgYPkY"
                  />
                </a>
              </div>
              <div style={{ textAlign: "center", marginTop: "10px" }}>
                Hashkings Time:<TimeServer></TimeServer>
              </div>
            </div>
          </div>
        </div>

        <Modal
          size="lg"
          show={this.state.showModalStore}
          onHide={() => this.setState({ ...this.state, showModalStore: false })}
          centered
          style={{ zIndex: "99999" }}
        >
          <div
            id="profile-modal-rent"
            className="modal-transparent-overlay"
            className="base-modal"
          >
            <img
              onClick={() =>
                this.setState({ ...this.state, showModalStore: false })
              }
              className="close-btn highlight-on-hover"
              src={ClosePNG}
            />
            <Modal.Body>
              <h1 style={{ textAlign: "center" }}>Buy your avatar</h1>
              <div className="row">
                <div className="col">
                  <label>Farmer Shaggi</label>
                  <img
                    onClick={(e) => this.comprarAvatar("avatar3")}
                    style={{ width: "200px", cursor: "pointer" }}
                    src={Avatar1PNG}
                    alt="Avatar 1"
                  />
                </div>
                <div className="col">
                  <label>Lucky Shaggi</label>
                  <img
                    onClick={(e) => this.comprarAvatar("avatar5")}
                    style={{ width: "200px", cursor: "pointer" }}
                    src={Avatar2PNG}
                    alt="Avatar 2"
                  />
                </div>
              </div>

              <div className="row">
                <div className="col">
                  <label>Farmer Maggi</label>
                  <img
                    onClick={(e) => this.comprarAvatar("avatar4")}
                    style={{ width: "200px", cursor: "pointer" }}
                    src={Avatar3PNG}
                    alt="Avatar 3"
                  />
                </div>
                <div className="col">
                  <label>Lucky Maggi</label>
                  <img
                    onClick={(e) => this.comprarAvatar("avatar6")}
                    style={{ width: "200px", cursor: "pointer" }}
                    src={Avatar4PNG}
                    alt="Avatar 4"
                  />
                </div>
              </div>
            </Modal.Body>
          </div>
        </Modal>
      </Card>
    );
  }

  comprarAvatar(avatar) {
    fetch(
      "https://api.coingecko.com/api/v3/simple/price?ids=hive&vs_currencies=usd&include_24hr_change=true",
      {
        headers: {
          accept: "application/json, text/plain, ",
        },
      }
    )
      .then((response) => response.json())
      .then((res) => {
        const hiveValue = (0.5)/res.hive.usd ;

        window.hive_keychain.requestSendToken(
          localStorage.getItem("username"),
          "hashkings",
          hiveValue.toFixed(3),
          avatar,
          "HIVE",
          (response) => {
            if (response.success) {
              console.log("COMPRANOS CORRECTAMENTE REDIGIR");
              alert("buy success");
            } else {
              alert(response.message);
            }
          }
        );
      })
      .catch((e) => {
        alert("error on fetch hive usd value, try again");
      });
  }

  areasLinksOnClick(linkKey, linksObj) {
    const areaName = linksObj[linkKey];
    this.props.showModals("farms", areaName);

    // const areas = mapAreas;
    // const areaName = linksObj[linkKey];

    // const area = areas.filter(area => area.name == areaName)[0];

    // scrollMap("#mapa-termindo", area.left, area.top);
    // this.hover(area);
  }

  extractLinks(links, onclick, variant = "light") {
    let renders = [];
    links.forEach((linkObj) => {
      Object.keys(linkObj).map((link) =>
        renders.push(
          <div className="my-1">
            <Button
              variant={variant}
              block
              onClick={() => onclick(link, linkObj)}
            >
              <span className="small">{link}</span>
            </Button>
          </div>
        )
      );
    });

    return renders;
  }
}

export default SideBar;
