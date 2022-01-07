"use strict";
class Sidenav {
    constructor(element) {
        this.element = element;
        this.openButton = element.querySelector('#openButton');
        this.closed = true;

        this.openButton.addEventListener('click', (event) => {this.click(event)});
        document.addEventListener('load', () => {
            this.element.style.setProperty('transition', 'transform 0.5s ease-in-out');
            document.getElementsByTagName('main').style.setProperty('transition', 'margin 0.5s ease-in-out');
        });
    }

    click(event) {
        if (this.closed) {
            this.open();
        } else {
            this.close();
        }
    }

    open() {
        this.element.setAttribute('open', '');
        this.closed = false;
    }

    close() {
        this.element.removeAttribute('open');
        document.getElementsByTagName('main')[0].style.removeProperty('margin-left');
        this.closed = true;
    }
}

var sidenav = new Sidenav(document.getElementById('sidenav'));

if (window.innerWidth >= 1000) {
    sidenav.open();
}

window.addEventListener('resize', () => {
    if (window.innerWidth >= 1000) {
        sidenav.open();
    }
});