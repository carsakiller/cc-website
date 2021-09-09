const ANIMATION_DURATION = 250;
var accordions = [];

/** Class for folding down accordion. Similar to HTML details but with animations */
class Accordion {
	/**
	 * Creates an accordion
	 * @param {object} element - The accordion element from the HTML document
	 * @param {number} groupIndex - The index of the accordion group that this accordion falls under
	 * @param {number} index - The index of this accordion within it's accordion group
	*/
	constructor(element, groupIndex, index) {
		// the accordion element
		this.element = element;
		// the index of the group this accoridon belongs to
		this.groupIndex = groupIndex;
		// the summary element of the contents of the accordion
		this.summary = element.getElementsByClassName('summary')[0];
		// the content element of the accordion
		this.content = element.getElementsByClassName('content')[0];
		// if the accordion is closed or not
		this.closed = true;

		this.element.setAttribute('group', groupIndex);
		this.content.setAttribute('index', index);

		// add event listener to the accordion
		this.element.addEventListener('click', (event) => this.click(event));

		// add keyboard listeners for keyboard accessibility
		this.element.addEventListener('keydown', (event) => {
			if (event.code === 'Space' || event.code === 'Enter') {
			  this.click(event);
			}
		  });
		// expand accordion when content is given focus
		this.content.addEventListener('focusin', event => {
			if (this.closed) {
				this.click(event);
			}
		})
		// resize accordion on window resize
		window.addEventListener('resize', (event) => {
			if (!this.closed) {
				this.content.style.setProperty('height', `${this.content.scrollHeight}px`);
			}
		});
	}

	/**
	 * Called when a click event is triggered on an accordion
	 * @param {object} event - The pointer event passed from the event listener
	 */
	click(event) {
		if (event) event.stopPropagation();

		// toggle the state of the accordion
		if (this.closed) {
			this.open();
		} else {
			this.close();
		}
	}

	/**
	 * Opens the accordion, displaying it's contents
	 */
	open() {
		this.element.setAttribute('open', '');
		this.element.removeAttribute('closed');
		this.content.style.setProperty('height', `${this.content.scrollHeight}px`);

		// set state of accordion when animation is complete
		setTimeout(() => {
			this.closed = false;
		}, ANIMATION_DURATION);

		// close all other accorions that are open in this accordions group
		accordions[this.groupIndex].forEach((instance) => {
			if (instance !== this && !instance.closed) {
				instance.close();
			}
		});
	}

	/**
	 * Closes the accordion, hiding it's contents
	 */
	close() {
		this.element.removeAttribute('open');
		this.content.style.removeProperty('height');
		this.element.setAttribute('closing', '')

		// set state of accordion when animation is complete
		setTimeout(() => {
			this.element.removeAttribute('closing');
			this.closed = true;
		}, ANIMATION_DURATION);
	}
}



// create a new accordion for each accordion element in the document
document.querySelectorAll('.accordions').forEach((group) => {
	let groupIndex = accordions.push([]) - 1;
	group.querySelectorAll('.accordion').forEach((accordion, n) => {
		accordions[groupIndex].push(new Accordion(accordion, groupIndex, n));
	});
});