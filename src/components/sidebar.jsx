import React, { Component } from 'react';

import { showModal } from './configs/map';
import { hover } from './configs/map';

import contact from './configs/contact';

import Card from './cores/card';
import SidebarLinks from './configs/sidebarLinks';

import Button from 'react-bootstrap/Button';

import HivePNG from '../assets/img/socialmedia/Hive.png';
import DiscordPNG from '../assets/img/socialmedia/Discord.png';
import NFTmArtPNG from '../assets/img/socialmedia/NFTmart.png';
import TwitterPNG from '../assets/img/socialmedia/Twitter.png';
import CraftButtonPNG from '../assets/img/ui/Boton_craft.png';
import LogoPNG from '../assets/img/logo.png';
import InventoryPNG from '../assets/img/ui/boton inventario.png';
import HojaPNG from '../assets/img/ui/Hoja.png';
import StakeButtonPNG from '../assets/img/ui/boton stake.png';
import MotaLabPNG from '../assets/img/ui/mota lab.png';

import AfghanistanPNG from '../assets/img/continents/Afganistan.png';
import AfricaPNG from '../assets/img/continents/Africa.png';
import AsiaPNG from '../assets/img/continents/Asia.png';
import JamaicaPNG from '../assets/img/continents/Jamaica.png';
import MexicoPNG from '../assets/img/continents/Mexico.png';
import SouthAmericaPNG from '../assets/img/continents/Sudamerica.png';

class SideBar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showModal: false,
            area: {}
        }

        this.showModal = showModal;
        this.hover = hover;
    }


    render() {
        return (
            <Card id="sidebar" class={ this.props.class } style={ this.props.style }>
                <div>
                    <img className="background" src={ HojaPNG } />
                    <div className="logo-wrapper">
                        <img src={ LogoPNG } alt="Hashkings logo" idName="haskings_logo" />
                    </div>
                    <div className="links-wrapper">
                        <div className="inventory-link-row my-2">
                            <img className="inventory-button" onClick={ e => this.props.showModals("inventory") } src={ InventoryPNG } alt="Your inventory | Hashkings" />
                            <div className="inventory-label small text-center">Inventory</div>
                        </div>
                        <div className="sidebar_regions-links my-2">
                            <div className="d-flex flex-row justify-content-around regions-row">
                                <div>
                                    <img onClick={ e => this.areasLinksOnClick('Asia', SidebarLinks.regions[0]) } src={ AsiaPNG } alt="Continent Asia on Hashkings" />
                                    <div className="tag reg-name">Asia</div>
                                </div>
                                <div>
                                    <img onClick={ e => this.areasLinksOnClick('Africa', SidebarLinks.regions[0]) } src={ AfricaPNG } alt="Continent Africa on Hashkings" />
                                    <div className="tag reg-name">Africa</div>
                                </div>
                                <div>
                                    <img onClick={ e => this.areasLinksOnClick('Afghanistan', SidebarLinks.regions[0]) } src={ AfghanistanPNG } alt="Country Afghanistan on Hashkings" />
                                    <div className="tag reg-name">Afghanistan</div>
                                </div>
                            </div>
                            <div className="d-flex flex-row justify-content-around regions-row">
                                <div>
                                    <img onClick={ e => this.areasLinksOnClick('Jamaica', SidebarLinks.regions[0]) } src={ JamaicaPNG } alt="Country Jamaica on Hashkings" />
                                    <div className="tag" reg-name>Jamaica</div>
                                </div>
                                <div>
                                    <img onClick={ e => this.areasLinksOnClick('Mexico', SidebarLinks.regions[0]) } src={ MexicoPNG } alt="Country Mexico on Hashkings" />
                                    <div className="tag reg-name">Mexico</div>
                                </div>
                                <div>
                                    <img onClick={ e => this.areasLinksOnClick('South America', SidebarLinks.regions[0]) } src={ SouthAmericaPNG } alt="Continent South America on Hashkings" />
                                    <div className="tag reg-name">South America</div>
                                </div>
                            </div>
                            
                        </div>

                        <div className="sidebar_crafting-links craft-button-row">
                            <div>
                                <img onClick={ e => this.props.showModals('crafting') } className="highlight-on-hover craft-button" src={ CraftButtonPNG } alt="Craft Items" title="Craft Items" />
                                <div className="text-center small">Crafting</div>
                            </div>
                            <div>
                                <img onClick={ e => this.props.showModals('staking') } className="highlight-on-hover stake-button" src={ MotaLabPNG } alt="Stake Items" title="Stake Items" />
                                <div className="text-center small">MOTA Lab</div>
                            </div>
                        </div>

                        <div className="sidebar_crafting-links my-3">
                            <div className="d-flex flex-row justify-content-around">
                                <a target="_blank" href={ contact.nft.link } className="highlight-on-hover" title="NFTmArt">
                                    <img className="social-link-image" src={ contact.nft.image } alt="Hashkings NTFmArt: " alt="" />
                                </a>
                                <a target="_blank" href={ contact.blog.link } className="highlight-on-hover" title="Hashking Blog">
                                    <img className="social-link-image" src={ contact.blog.image } alt="Hashking Blog: " />
                                </a>
                                <a target="_blank" href={ contact.twitter.link } className="highlight-on-hover" title="Twitter">
                                    <img className="social-link-image" src={ contact.twitter.image } alt="Twitter" />
                                </a>
                                <a target="_blank" href={ contact.discord.link } className="highlight-on-hover" title="Discord">
                                    <img className="social-link-image" src={ contact.discord.image } alt="Hashkings Discord: https://discord.gg/aCMpRgYPkY" />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </Card>
        );
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

    extractLinks(links, onclick, variant="light") {
        let renders = [];
        links.forEach(linkObj => {
            Object.keys(linkObj).map(link => renders.push(
                <div className="my-1">
                    <Button variant={ variant } block onClick={ () => onclick(link, linkObj) }>
                        <span className="small">{ link }</span>
                    </Button>
                </div>
            ))
        });

        return renders;
    }

}

export default SideBar;