var accordions = [];

/** Class for folding down accordion. Similar to HTML details but with animations */
class Accordion {
	constructor(element, groupIndex) {
		this.element = element;
		this.groupIndex = groupIndex;
		this.summary = element.getElementsByClassName('summary')[0];
		this.content = element.getElementsByClassName('content')[0];
		this.closed = true;
		this.animating = false;

		this.element.addEventListener('click', (event) => this.click(event));
	}

	click(event) {
		event.stopPropagation();
		
		if (!this.animating) {
			if (this.closed) {
				this.open();
			} else {
				this.close();
			}
		}
	}

	open() {
		this.animating = true;
		this.element.setAttribute('open', '');
		this.element.removeAttribute('closed');
		this.content.style.height = this.content.scrollHeight;

		setTimeout(() => {
			this.animating = false;
			this.closed = false;
		}, 250);

		accordions[this.groupIndex].forEach((instance) => {
			if (instance !== this) {
				instance.close();
			}
		});
	}

	close() {
		this.animating = true;
		this.element.removeAttribute('open');
		this.content.style.removeProperty('height');


		setTimeout(() => {
			this.element.setAttribute('closed', '');
			this.animating = false;
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

console.log(accordions);