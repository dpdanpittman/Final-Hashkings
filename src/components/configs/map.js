/** @format */

import React from "react";
import Card from "../cores/card";
import axios from "axios";
import modalbg from "../../assets/img/ui/modal.PNG";
import { connect } from "react-redux";

import { scrollMap } from "../../utils/ui";

require("dotenv").config();

let BUCKET = undefined;
let USER = undefined;

export const mapAreas = [
  {
    fullname: "Africa",
    name: "africa",
    shape: "poly",
    coords: [
      874,441,868,451,856,458,850,482,828,505,831,539,816,559,854,610,919,595,942,610,944,644,965,694,951,721,978,784,987,822,1014,823,1037,812,1048,783,1064,765,1064,754,1065,737,1077,723,1089,712,1084,657,1142,571,1109,574,1100,563,1087,559,1085,552,1056,485,1038,468,1010,453
    ],
    href: "/map/africa",
    left: 60,
    top: 59,
  },
  {
    fullname: "Afghanistan",
    name: "afghanistan",
    shape: "poly",
    coords: [
      1139,430,1170,424,1176,432,1203,424,1213,417,1213,409,1220,395,1235,387,1219,386,1201,379,1181,386,1171,397,1161,394,1160,392,1145,396,1139,406,1135,423
    ],
    href: "/map/afghanistan",
    left: 50,
    top: 30,
  },
  {
    fullname: "Asia",
    name: "asia",
    shape: "poly",
    coords: [
      1167,493,1171,448,1454,456,1444,500,1426,524,1394,523,1391,540,1399,565,1394,576,1384,588,1370,573,1357,578,1348,556,1339,546,1329,549,1325,525,1324,513,1297,524,1287,534,1267,550,1260,591,1247,578,1243,555,1232,523,1229,511,1224,513,1222,507,1211,499,1190,494,1181,499
    ],
    href: "/map/asia",
    left: 82,
    top: 20,
  },
  {
    fullname: "Jamaica",
    name: "jamaica",
    shape: "circle",
    coords: [545,546,11],
    href: "/map/jamaica",
    left: 0,
    top: 50,
  },
  {
    fullname: "Mexico",
    name: "mexico",
    shape: "poly",
    coords: [
      403,489,418,505,450,489,460,487,457,506,461,525,468,537,480,538,500,518,501,516,505,528,500,536,496,543,477,556,469,562,449,555,439,551,431,546,421,535,417,515,405,509
    ],
    href: "/map/mexico",
    left: 0,
    top: 50,
  },
  {
    fullname: "South America",
    name: "southamerica",
    shape: "poly",
    coords: [
      532, 672, 575, 753, 562, 862, 572, 945, 600, 957, 596, 897, 601, 887, 606,
      860, 616, 848, 636, 840, 641, 822, 676, 795, 678, 774, 716, 757, 732, 708,
      738, 689, 742, 674, 732, 659, 724, 645, 696, 636, 664, 637, 673, 635, 669,
      622, 661, 616, 655, 603, 633, 594, 616, 573, 606, 574, 602, 567, 588, 574,
      575, 577, 578, 565, 552, 581,
    ],
    href: "/map/southamerica",
    left: 27,
    top: 60,
  },
];

export function showModal(area, props) {
  this.setState({ showModal: true, area: area });
  setTimeout(() => {
    this.setState({ showModal: false });
  }, 15000);
}

export function hover(area, username, e) {
  this.showModal(area, username);
  // e.currentTarget.style.background = "gold";
  console.dir(e);
}

// export function clicked(area, index, e) {
//     const elm = "#mapa-termindo";
//     scrollMap(elm, area.left, area.top);
// }
export function clicked(area, index, e) {
  const elm = "#mapa-termindo";
  scrollMap(elm, area.left, area.top);
}

class MapModal extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Card
        class="lx-modal modal-vs main-area-modal"
        style={{ display: this.props.shouldModalShow() }}
      >
        <img className="bg" src={modalbg} />
        <ul className="text-content">
          <li className="d-flex flex-row justify-content-start">
            <span className="tag">Region Name:</span>
            <span className="value">{this.props.area.name}</span>
          </li>
          <li className="d-flex flex-row justify-content-start">
            <span className="tag">Plots In Region:</span>
            <span className="value">
              {" "}
              {this.getPlotCount(this.props.area.name)}{" "}
            </span>
          </li>
          <li className="d-flex flex-row justify-content-start">
            <span className="tag">Active Farms:</span>
            <span className="value">{this.props.area.name}</span>
          </li>
        </ul>
      </Card>
    );
  }

  getPlotCount(region) {
    const { user } = this.props;
    const { plots } = user;
    region = region.toLowerCase();

    return plots[
      Object.keys(plots).filter((plot) => plot.toLowerCase() == region)[0]
    ];
  }
}

const mapStateToProps = (state) => {
  let user = state.API_bucket;
  user = user ? user : state.API_bucket;
  return {
    user,
  };
};

export default connect(mapStateToProps)(MapModal);
