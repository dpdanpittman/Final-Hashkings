/** @format */

import React from 'react';
import Card from '../cores/card';
import axios from 'axios';
import modalbg from '../../assets/img/ui/modal.PNG';
import { connect } from 'react-redux';

import { scrollMap } from '../../utils/ui';

require('dotenv').config();

let BUCKET = undefined;
let USER = undefined;

export const mapAreas = [
  {
    fullname: 'Africa',
    name: 'africa',
    shape: 'poly',
    coords: [
      563,
      326,
      553,
      337,
      550,
      357,
      547,
      374,
      547,
      384,
      563,
      418,
      577,
      419,
      593,
      413,
      612,
      413,
      624,
      418,
      625,
      432,
      632,
      445,
      639,
      459,
      637,
      484,
      641,
      511,
      648,
      532,
      653,
      552,
      667,
      561,
      685,
      555,
      697,
      537,
      704,
      521,
      708,
      508,
      713,
      498,
      723,
      489,
      724,
      462,
      725,
      441,
      754,
      406,
      754,
      397,
      759,
      380,
      739,
      383,
      733,
      375,
      720,
      363,
      711,
      338,
      705,
      322,
      695,
      311,
      668,
      305,
      659,
      313,
      643,
      302,
      617,
      296,
      601,
      290,
      592,
      296,
      583,
      293,
      574,
      304,
    ],
    href: '/map/africa',
    left: 60,
    top: 59,
  },
  {
    fullname: 'Afghanistan',
    name: 'afghanistan',
    shape: 'poly',
    coords: [
      781,
      278,
      772,
      284,
      768,
      292,
      767,
      303,
      776,
      309,
      788,
      312,
      797,
      314,
      808,
      312,
      812,
      298,
      810,
      288,
      817,
      288,
      829,
      285,
      840,
      285,
      843,
      278,
      846,
      269,
      837,
      272,
      829,
      275,
      821,
      270,
      811,
      268,
      795,
      269,
    ],
    href: '/map/afghanistan',
    left: 50,
    top: 30,
  },
  {
    fullname: 'Asia',
    name: 'asia',
    shape: 'poly',
    coords: [
      793,
      331,
      835,
      331,
      880,
      329,
      923,
      326,
      968,
      324,
      966,
      335,
      958,
      349,
      944,
      355,
      927,
      358,
      935,
      378,
      927,
      399,
      921,
      402,
      911,
      390,
      903,
      394,
      898,
      380,
      890,
      373,
      885,
      380,
      881,
      365,
      876,
      354,
      863,
      356,
      857,
      367,
      845,
      378,
      841,
      394,
      837,
      402,
      828,
      394,
      824,
      376,
      819,
      363,
      808,
      355,
      803,
      346,
      792,
      339,
    ],
    href: '/map/asia',
    left: 82,
    top: 20,
  },
  {
    fullname: 'Jamaica',
    name: 'jamaica',
    shape: 'circle',
    coords: [386, 357, 11],
    href: '/map/jamaica',
    left: 0,
    top: 50,
  },
  {
    fullname: 'Mexico',
    name: 'mexico',
    shape: 'poly',
    coords: [
      307,
      331,
      307,
      320,
      297,
      315,
      287,
      311,
      279,
      307,
      269,
      309,
      261,
      312,
      255,
      321,
      258,
      330,
      265,
      344,
      265,
      332,
      272,
      348,
      283,
      367,
      301,
      376,
      318,
      380,
      328,
      380,
      331,
      370,
      333,
      361,
      336,
      352,
      333,
      342,
      325,
      348,
      319,
      356,
      309,
      355,
      304,
      344,
    ],
    href: '/map/mexico',
    left: 0,
    top: 50,
  },
  {
    fullname: 'South America',
    name: 'southamerica',
    shape: 'poly',
    coords: [
      365,
      389,
      362,
      405,
      359,
      420,
      356,
      437,
      352,
      453,
      361,
      470,
      368,
      488,
      380,
      500,
      383,
      526,
      380,
      547,
      375,
      575,
      374,
      596,
      375,
      614,
      373,
      623,
      378,
      635,
      383,
      643,
      396,
      645,
      399,
      635,
      388,
      627,
      397,
      614,
      399,
      601,
      401,
      591,
      403,
      581,
      410,
      579,
      418,
      574,
      425,
      570,
      425,
      561,
      442,
      550,
      449,
      534,
      455,
      526,
      464,
      521,
      474,
      519,
      477,
      509,
      480,
      493,
      488,
      475,
      491,
      459,
      494,
      448,
      487,
      436,
      473,
      427,
      459,
      427,
      444,
      428,
      445,
      418,
      436,
      405,
      418,
      392,
      408,
      382,
      397,
      379,
      393,
      388,
      384,
      380,
    ],
    href: '/map/southamerica',
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
  const elm = '#mapa-termindo';
  scrollMap(elm, area.left, area.top);
}

class MapModal extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Card
        class='lx-modal modal-vs main-area-modal'
        style={{ display: this.props.shouldModalShow() }}>
        <img className='bg' src={modalbg} />
        <ul class='text-content'>
          <li class='d-flex flex-row justify-content-start'>
            <span class='tag'>Region Name:</span>
            <span class='value'>{this.props.area.name}</span>
          </li>
          <li class='d-flex flex-row justify-content-start'>
            <span class='tag'>Plots In Region:</span>
            <span class='value'>
              {' '}
              {this.getPlotCount(this.props.area.name)}{' '}
            </span>
          </li>
          <li class='d-flex flex-row justify-content-start'>
            <span class='tag'>Active Farms:</span>
            <span class='value'>{this.props.area.name}</span>
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
  user = user ? user : state.API_bucket
  return {
    user,
  };
};

export default connect(mapStateToProps)(MapModal);
