
class Sidenav {
    constructor(element) {
        this.element = element;
        this.openButton = element.querySelector('#openButton');
        this.closed = true;
        this.loadLinks();

        this.openButton.addEventListener('click', (event) => {this.click(event)});
        document.addEventListener('load', () => {
            this.element.style.setProperty('transition', 'transform 0.5s ease-in-out');
            document.getElementsByTagName('main').style.setProperty('transition', 'margin 0.5s ease-in-out');
        });
    }

    loadLinks() {
        this.element.querySelectorAll('.content a.command').forEach((element) => {
            // get data from link
            var url = new URL(element.href);
            var hash = url.hash;
            var name = url.hash.substring(1);
            var target_element = document.querySelector(`[name=${name}]`);
            element.addEventListener('click', (event) => {
                event.preventDefault();

                // get the content element of this node
                var accordion_content = element.parentNode.parentNode;
                // close the accordion that this content element belongs to
                accordions[accordion_content.parentNode.getAttribute('group')][accordion_content.getAttribute('index')].close();
                // close the sidenav
                if (window.innerWidth < 1000) {
                    this.close();
                }

                // get the anchor from this link and scroll to the target element
                var rect = target_element.getBoundingClientRect();

                window.scrollBy(0, rect.top - window.innerHeight / 2);
            });
            // when a section is selected with keyboard, shift focus to selection and expand that accordion
            element.addEventListener('keydown', (event) => {
                if (event.code === 'Space' || event.code === 'Enter') {
                    target_element.focus();
                    target_element.click();
                    console.log(target_element)
                }
            });
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
        if (window.innerWidth >= 1000) {
            document.getElementsByTagName('main')[0].style.setProperty('margin-left', '270px');
        }

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
    } else {
        sidenav.close();
    }

    if (sidenav.closed) {
        document.getElementsByTagName('main')[0].style.removeProperty('margin-left');
    } else {
        document.getElementsByTagName('main')[0].style.setProperty('margin-left', '270px');
    }
});