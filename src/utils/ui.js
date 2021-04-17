export function scrollMap(element="#mapa-termindo", x_left, x_top=10) {
    const elm = document.querySelector(element);
    const width=900;
    const height=600;
    elm.scrollLeft=((x_left/100)*width);
    elm.scrollTop=((x_top/100)*height);
}

export function isLandscape() {
    if (window.matchMedia("(orientation: portrait)").matches) {
        return false;
    } else if (window.matchMedia("(orientation: landscape)").matches) {
        return true;
    }
}

export function isMobile() {
    return (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent));
}