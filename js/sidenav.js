
class Sidenav {
    constructor(element) {
        this.element = element;
        this.openButton = element.querySelector('#openButton');
        this.closed = true;

        this.openButton.addEventListener('click', (event) => {this.click(event)});
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

        this.closed = true;
    }
}

new Sidenav(document.getElementById('sidenav'));