var accordions = [];

/** Class for folding down accordion. Similar to HTML details but with animations */
class Accordion {
	/**
	 * Creates an accordion
	 * @param {object} element - The accordion element from the HTML document
	 * @param {number} groupIndex - The index of the accordion group that this accordion falls under
	 */
	constructor(element, groupIndex) {
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

		// add event listener to the accordion
		this.element.addEventListener('click', (event) => this.click(event));
	}

	/**
	 * Called when a click event is triggered on an accordion
	 * @param {object} event - The pointer event passed from the event listener
	 */
	click(event) {
		event.stopPropagation();

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
		this.content.style.height = this.content.scrollHeight;

		// set state of accordion when animation is complete
		setTimeout(() => {
			this.closed = false;
		}, 250);

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

		// set state of accordion when animation is complete
		setTimeout(() => {
			this.element.setAttribute('closed', '');
			this.closed = true;
		}, 250);
	}
}



// create a new accordion for each accordion element in the document
document.querySelectorAll('.accordions').forEach((group) => {
	let groupIndex = accordions.push([]) - 1;
	group.querySelectorAll('.accordion').forEach((accordion) => {
		accordions[groupIndex].push(new Accordion(accordion, groupIndex));
	});
});