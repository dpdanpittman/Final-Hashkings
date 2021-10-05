import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import Swal from "sweetalert2";
import logo from "../assets/img/logo.png";
import shaggi from "../assets/img/Boss info/Shaggi.png";
import information from "../assets/img/Boss info/Info.png";
import ranking from "../assets/img/Boss info/Ranking.png";

import * as qs from "query-string";

import avataresCubo from "../assets/img/AvataresCubo.gif";
import fondoAvatares from "../assets/img/FondoAvatares.png";

import hive from "../assets/img/socialmedia/Hive.png";
import Modal from "react-bootstrap/Modal";
import ClosePNG from "../assets/img/ui/x close.png";
import DepositButton from "../assets/img/staking_modal/Deposit.png";
import { Button, OverlayTrigger, Tooltip } from "react-bootstrap";

import HivePay from "../utils/HivePay";

class OpenAvatars extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      avatarsell: false,
      avataropen: false,
      cantidad: 1,
    };

    this.onSelectavone = this.onSelectavone.bind(this);
    this.changeCantidad = this.changeCantidad.bind(this);
    this.buyPacks = this.buyPacks.bind(this);
    this.getUsd = this.getUsd.bind(this);
    this.buyPacksHive = this.buyPacksHive.bind(this);
  }

  getUsd() {
    return this.state.cantidad;
  }

  onSelectavone(e) {
    this.setState({ ...this.state, avatar: e.target.value });
  }

  changeCantidad(e) {
    this.setState({ ...this.state, cantidad: e.target.value });
  }

  render() {
    let { loading } = this.state;

    if (loading) {
      return (
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
              alt="logo"
            />
            <h6 style={{ color: "red !important" }}>Hashkings Alpha</h6>
            Now Loading ...
          </div>
        </div>
      );
    } else {
      return (
        <div className="authentication">
          <div className="buyAvatarsBackground" style={{ overflow: "auto" }}>
            <div className="container">
              <img
                src={fondoAvatares}
                style={{
                  width: "78%",
                  position: "fixed",
                  inset: "2% 11% auto auto",
                }}
              />

              <label
                style={{
                  width: "24%",
                  position: "fixed",
                  inset: "6% 22% auto auto",
                  fontSize: "100%",
                  cursor: "pointer",
                }}
                onClick={() => {
                  window.location = "/play";
                }}
              >
                Go play
              </label>

              <h1
                style={{
                  width: "19%",
                  position: "fixed",
                  inset: "19% 20% auto auto",
                  fontSize: "100%",
                  textAlign: "center",
                }}
                onClick={() => {
                  // this.setState({ ...this.state, info: null });
                }}
              >
                Open your avatar packs
              </h1>

              <img
                src={avataresCubo}
                style={{
                  width: "20%",
                  position: "fixed",
                  inset: "18% 58% auto auto",
                }}
              />

              <div
                className="mb-3"
                style={{
                  textAlign: "center",
                  position: "fixed",
                  inset: "51% 32% auto auto",
                }}
              >
                <button className="rent-now px-1">Open all</button>
              </div>

              <div
                className="mb-3"
                style={{
                  textAlign: "center",
                  position: "fixed",
                  inset: "51% 18% auto auto",
                }}
              >
                <button
                  className="rent-now px-1"
                  onClick={() => {
                    this.showModal();
                  }}
                >
                  Buy pack
                </button>
              </div>
            </div>
          </div>

          <Modal
            show={this.state.avataropen}
            onHide={() => this.hideModal("avataropen")}
            size={"lg"}
            centered
          >
            <div
              id="profile-modal"
              className="base-modal"
              style={{ textAlign: "center" }}
            >
              <img
                onClick={() => this.hideModal("avataropen")}
                className="close-btn highlight-on-hover"
                src={ClosePNG}
              />

              <h1 style={{ textAlign: "center" }}>
                You can buy a new set avatars here
              </h1>

              <div>
                <p>
                  {" "}
                  in order for your conversion to be success you must send a
                  minimum of <strong>1000 BUDS</strong>
                </p>

                <p>
                  {" "}
                  <strong>
                    IMPORTANT: Make sure you have added your fantom address to
                    Hashkings or we cannot process your request.{" "}
                  </strong>
                </p>

                <div className="span">
                  <div>
                    
                  </div>
                </div>

                <div className="value">
                  <input
                    onChange={(e) => {
                      this.onchange(e);
                    }}
                    type="number"
                    step="1"
                    min="1"
                  />
                  <img
                    onClick={(e) => {
                      this.depositfantom();
                    }}
                    style={{ width: "5%" }}
                    src={DepositButton}
                  />
                </div>

                <p>
                  Fees <strong>3.3%</strong>
                  <OverlayTrigger
                    placement="right"
                    delay={{ show: 250, hide: 400 }}
                    overlay={this.renderTooltip}
                  >
                    <Button variant="success" style={{ borderRadius: "50%" }}>
                      ?
                    </Button>
                  </OverlayTrigger>
                  ,
                </p>
              </div>
            </div>
          </Modal>

          <Modal
            size="lg"
            show={this.state.avatarsell}
            onHide={() => this.setState({ ...this.state, avatarsell: false })}
            centered
            backdrop="static"
            style={{ zIndex: "999999" }}
          >
            <div
              id="inventory-modal"
              className="modal-transparent-overlay"
              className="base-modal"
            >
              <img
                onClick={() =>
                  this.setState({ ...this.state, avatarsell: false })
                }
                className="close-btn highlight-on-hover"
                src={ClosePNG}
              />
              <Modal.Body>
                <h3 className="text-center font-weight-bold mb-2">
                  Select payment method
                </h3>

                <h4 className="text-center font-weight-bold mb-2">
                  {this.GetValueConDescuento(this.getUsd())}$ usd
                </h4>

                <h6 className="text-center font-weight-bold mb-2">
                  100 - 250 packs = 10% discount
                </h6>
                <h6 className="text-center font-weight-bold mb-2">
                  {" "}
                  251 - 500 = 15% discount{" "}
                </h6>
                <h6 className="text-center font-weight-bold mb-2">
                  {" "}
                  500 or more = 20% discount
                </h6>

                <input
                  type="number"
                  placeholder="Quantity"
                  className="form-control"
                  onChange={this.changeCantidad}
                />
                <br />

                <div className="mb-0" style={{ textAlign: "center" }}>
                  <img
                    style={{ cursor: "pointer", marginBottom: "14px" }}
                    id="buttonview"
                    onClick={() => this.buyPacksHive()}
                    src="https://hivepay.io/buttons/15.png"
                    alt="Pay Hive"
                  />
                  <br></br>
                  <form
                    action="https://www.coinpayments.net/index.php"
                    method="post"
                    target="_top"
                    onSubmit={this.buyPacks}
                    id="paymentForm"
                  >
                    <input
                      type="image"
                      src="https://www.coinpayments.net/images/pub/buynow-med.png"
                      alt="Comprar ahora con CoinPayments.net"
                    />
                  </form>
                </div>
              </Modal.Body>
            </div>
          </Modal>
        </div>
      );
    }
  }

  buyPacks(e) {
    e.preventDefault();
    if (this.state.cantidad < 1) {
      alert("error on quantity, please try again");
      return;
    }

    if (!localStorage.getItem("username")) {
      alert("You must be logged in to buy packs");
      return;
    }

    let value = this.GetValueConDescuento(this.state.cantidad);

    let desc = JSON.stringify({
      username: localStorage.getItem("username"),
      quantity: value,
    });

    var form = document.getElementById("paymentForm");

    let cmd = document.createElement("input"); //prepare a new input DOM element
    cmd.setAttribute("name", "cmd"); //set the param name
    cmd.setAttribute("value", "_pay_simple"); //set the value
    cmd.setAttribute("type", "hidden"); //set the type, like "hidden" or other
    form.appendChild(cmd);

    let merchant = document.createElement("input"); //prepare a new input DOM element
    merchant.setAttribute("name", "merchant"); //set the param name
    merchant.setAttribute("value", "33343af93aeb628f9993751a0e0a2b6d"); //set the value
    merchant.setAttribute("type", "hidden"); //set the type, like "hidden" or other
    form.appendChild(merchant);

    let reset = document.createElement("input"); //prepare a new input DOM element
    reset.setAttribute("name", "reset"); //set the param name
    reset.setAttribute("value", "1"); //set the value
    reset.setAttribute("type", "hidden"); //set the type, like "hidden" or other
    form.appendChild(reset);

    let currency = document.createElement("input"); //prepare a new input DOM element
    currency.setAttribute("name", "currency"); //set the param name
    currency.setAttribute("value", "USD"); //set the value
    currency.setAttribute("type", "hidden"); //set the type, like "hidden" or other
    form.appendChild(currency);

    let amountf = document.createElement("input"); //prepare a new input DOM element
    amountf.setAttribute("name", "amountf"); //set the param name
    amountf.setAttribute("value", value.toFixed(2)); //set the value
    amountf.setAttribute("type", "hidden"); //set the type, like "hidden" or other
    form.appendChild(amountf);

    let item_name = document.createElement("input"); //prepare a new input DOM element
    item_name.setAttribute("name", "item_name"); //set the param name
    item_name.setAttribute("value", "Avatar Packs"); //set the value
    item_name.setAttribute("type", "hidden"); //set the type, like "hidden" or other
    form.appendChild(item_name);

    let item_desc = document.createElement("input"); //prepare a new input DOM element
    item_desc.setAttribute("name", "item_desc"); //set the param name
    item_desc.setAttribute("value", desc); //set the value
    item_desc.setAttribute("type", "hidden"); //set the type, like "hidden" or other
    form.appendChild(item_desc);

    let success_url = document.createElement("input"); //prepare a new input DOM element
    success_url.setAttribute("name", "success_url"); //set the param name
    success_url.setAttribute("value", "https://farm.hashkings.app/avatars"); //set the value
    success_url.setAttribute("type", "hidden"); //set the type, like "hidden" or other
    form.appendChild(success_url);

    /*
    form.appendChild(this.setInput("want_shipping", "1"));
    form.appendChild(
      this.setInput("success_url", "http://www.yoursite.com/success")
    );
*/
    form.submit(); //send with added input
  }

  GetValueConDescuento(cantidad) {
    let valorReal = cantidad * 2;
    let descuento = 0;
    if (cantidad > 100 && cantidad <= 250) {
      descuento = valorReal * 0.1;
    }
    if (cantidad > 251 && cantidad <= 500) {
      descuento = valorReal * 0.15;
    }
    if (cantidad > 500) {
      descuento = valorReal * 0.2;
    }

    let valorConDescuento = valorReal - descuento;
    return valorConDescuento;
  }

  buyPacksHive() {
    if (this.state.cantidad < 1) {
      alert("error on quantity, please try again");
      return;
    }

    if (!localStorage.getItem("username")) {
      alert("You must be logged in to buy packs");
      return;
    }

    let value = this.GetValueConDescuento(this.state.cantidad);

    let desc = JSON.stringify({
      username: localStorage.getItem("username"),
      quantity: this.state.cantidad,
    });

    const HP = new HivePay("hashkings");
    HP.setItemName("Avatar Pack")
      .setItemDescription(desc)
      .setMerchant_email("blackmirague@gmail.com")
      .setNotifyUrl("https://guerrerosconsultoresas.com.co/hk/hive.php")
      .setReturnUrl("https://farm.hashkings.app/avatars")
      .setAmount(value.toFixed(2))
      .setBaseCurrency()
      .setPayCurrencies(["DEC", "SPS", "HIVE", "SWAP.HIVE", "BUDS", "SOULS"]);

    HP.submit();
  }

  hideModal(modal) {
    this.setState({ avatarsell: false });
  }

  showModal() {
    this.setState({ avatarsell: true });
  }

  getminlvl(lvl) {
    switch (lvl) {
      case 25:
        return 1;

      case 50:
        return 26;

      case 75:
        return 51;
      case 100:
        return 76;
      default:
        return 0;
    }
  }

  getLVL(xp) {
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
  }

  componentDidMount() {
    // enable these in production
    // this.auth();
    this.populateStore();
  }

  populateStore() {
    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        Swal.stopTimer();
      },
    });

    Toast.fire({
      icon: "success",
      title: "syncing",
    });

    const API =
      "https://hashkings.xyz/compraavatars/" + localStorage.getItem("username");
    axios
      .get(API)
      .then((res) => {
        this.setState({
          ...this.state,
          loading: false,
          comprados: res.data,
        });

        Swal.resumeTimer();
      })
      .catch((err) => {
        console.log("se produjo un error aqui", err);
        this.setState({
          ...this.state,
          loading: false,
          comprados: [],
        });
        Swal.resumeTimer();
        //window.location.href ="/login";
      });
  }
}

const mapStateToProps = (state, ownProps) => {
  const API_bucket = state.API_bucket;
  return {
    state,
    API_bucket: API_bucket,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateStoreFromAPI: (API_bucket) =>
      dispatch({ type: "API UPDATE", payload: API_bucket }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(OpenAvatars);
