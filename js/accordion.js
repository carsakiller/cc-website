"use strict";
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

		this.element.setAttribute('data-group', groupIndex);
		this.content.setAttribute('data-index', index);

		// add event listener to the accordion
		this.summary.addEventListener('click', (event) => this.click(event));

		// add keyboard listeners for keyboard accessibility
		this.summary.addEventListener('keydown', (event) => {
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
				this.open(true);
			}
		});

		window.addEventListener('hashchange', (event) => {
			const target = window.location.hash;

			if (!target) return;

			if (target.substring(1) === this.element.id) {
				window.scroll(0, window.scrollY); // cancel default scroll
				this.open();
				setTimeout(() => this.element.scrollIntoView(true), ANIMATION_DURATION);
			}
		});

		window.addEventListener('load', (event) => {
			const target = window.location.hash;

			if (!target) return;

			if (target.substring(1) === this.element.id) {
				window.scroll(0, window.scrollY); // cancel default scroll
				this.open(true);
				setTimeout(() => this.element.scrollIntoView(true), 100);
			}
		})
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
	open(instant) {
		this.element.setAttribute('open', '');
		this.element.removeAttribute('closed');
		this.content.style.setProperty('height', `${this.content.scrollHeight}px`);

		// skip transition of opening
		if (instant) {
			this.content.classList.add('skipTransition');
			setTimeout(() => this.content.classList.remove('skipTransition'), 200);
		}

		// set state of accordion when animation is complete
		setTimeout(() => {
			this.closed = false;
		}, ANIMATION_DURATION);

		// close all other accordions that are open in this accordions group
		accordions[this.groupIndex].forEach((instance) => {
			if (instance !== this && !instance.closed) {
				instance.close(instant ? true : false);
			}
		});
	}

	/**
	 * Closes the accordion, hiding it's contents
	 */
	close(instant) {
		this.element.removeAttribute('open');
		this.content.style.removeProperty('height');
		this.element.setAttribute('closing', '')

		if (instant) {
			this.content.classList.add('skipTransition');
			setTimeout(() => this.content.classList.remove('skipTransition'), 200);
			this.element.removeAttribute('closing');
			this.closed = true;
			return
		}

		// set state of accordion when animation is complete
		setTimeout(() => {
			this.element.removeAttribute('closing');
			this.closed = true;
		}, ANIMATION_DURATION);
	}
}


function findAccordions() {
	// create a new accordion for each accordion element in the document
	for (const group of document.getElementsByClassName('accordions')) {
		let groupIndex = accordions.push([]) - 1;

		const children = Array.from(group.getElementsByClassName('accordion'));
		children.forEach((v, k) => {
			accordions[groupIndex].push(new Accordion(v, groupIndex, k));
		})
	}
}


document.addEventListener('relocateAccordions', findAccordions);
findAccordions();