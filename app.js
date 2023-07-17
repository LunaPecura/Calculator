
class Calculator {

	accumulator; 
	operand1;
	operand2;
	operator;

	// BUTTONS & SCREEN
	plusButton = document.querySelector("#plus");
	minusButton = document.querySelector("#minus");
	timesButton = document.querySelector("#times");
	dividedButton = document.querySelector("#divided");
	equalsButton = document.querySelector("#equals");
	clearButton = document.querySelector("#clear");
	opButtons = [...document.querySelectorAll(".operation")];
	display = document.querySelector(".display");

	constructor() { 
		// used to build up the number currently being entered
		this.accumulator = 0;

		// all non-number buttons disabled
		this.opButtons.forEach(b => b.setAttribute("disabled", true));
		this.equalsButton.setAttribute("disabled", true);
	}

	// HELPER FUNCTIONS
	clearDisplay() {this.display.innerHTML = "";}
	addToDisplay(content) {this.display.innerHTML += content;}
	setToActive(opButton) {opButton.classList.add("active");}
	setToInactive(opButton) {opButton.classList.remove("active");}
	isActive(opButton) {return opButton.classList.contains("active");}
	setToEnabled(button) {button.removeAttribute("disabled");}
	setToDisabled(button) {button.setAttribute("disabled", true);}
	isEnabled(button) {!button.getAttribute("disabled");}
	allOpButtonsInactive() {return this.opButtons.filter(b => this.isActive(b)).length === 0}




	// CONNECTED TO 'CLR' BUTTON
	clearAll() {

		// abort number buildup
		this.accumulator = 0;

		// reset screen & button colors
		this.clearDisplay();
		this.opButtons.forEach(b => {this.setToInactive(b); this.setToDisabled(b)});
		this.setToInactive(this.equalsButton);
		this.setToDisabled(this.equalsButton);
	}


	// CONNECTED TO NUMBER BUTTONS 0-9
	readDigit(digit) {

		// prep work
		if(this.allOpButtonsInactive()) {						// currently entering operand1
			if(this.accumulator === 0) {							// ... first digit
				this.opButtons.forEach(b => this.setToEnabled(b));
				if(this.isActive(this.equalsButton)) {
					this.clearDisplay(); // remove last result from screen
					this.setToInactive(this.equalsButton);
				}
			}
		} else { 												// currently entering operand2
			if(this.accumulator === 0) { 							// ... first digit
				this.clearDisplay(); // remove operand1 from screen
				this.setToEnabled(this.equalsButton);
			}
		}

		// actual work
		this.addToDisplay(digit);
		this.accumulator = this.accumulator*10 + digit;
	}


	// CONNECTED TO OPERATOR BUTTONS + - * /
	readOp(operator) { 

		this.operator = operator;
		this.setToActive(eval("this."+operator+"Button"));
		this.opButtons.forEach(b => this.setToDisabled(b));

		if(!this.isActive(this.equalsButton)) { 		// just finished entering operand1
			this.operand1 = this.accumulator;
			this.accumulator = 0;
		} else { 										// last result being used as operand1
			this.setToInactive(this.equalsButton);
		}
	}


	// CONNECTED TO EQUALS BUTTON
	evaluate() { 
		
		this.operand2 = this.accumulator;				// just finished entering operand2
		this.accumulator = 0;
		
		this.setToActive(this.equalsButton);
		this.setToDisabled(this.equalsButton);
		this.opButtons.forEach(b => {this.setToInactive(b); this.setToEnabled(b);});

		let result;
		switch(this.operator) {
			case 'plus': result = this.operand1 + this.operand2; break;
			case 'minus': result = this.operand1 - this.operand2; break;
			case 'times': result = this.operand1 * this.operand2; break;
			case 'divided': result = this.operand1 / this.operand2; break;
		}

		this.clearDisplay(); // remove operand2 from display
		this.addToDisplay(Math.round(10000000000*result)/10000000000);
		this.operand1 = result; // store result so calculation can continue if needed
	}
}


let myCalculator = new Calculator();