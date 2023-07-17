class Calculator {

	accumulator = 0; 
	operand1;
	operand2;
	operator = "";

	// BUTTONS
	plusButton = document.querySelector("#plus");
	minusButton = document.querySelector("#minus");
	timesButton = document.querySelector("#times");
	dividedButton = document.querySelector("#divided");
	equalsButton = document.querySelector("#equals");
	clearButton = document.querySelector("#clear");
	opButtons = [...document.querySelectorAll(".operation")];

	constructor() {
		this.opButtons.forEach(b => b.setAttribute("disabled", true));
		this.equalsButton.setAttribute("disabled", true);
		this.clearButton.setAttribute("disabled", true);
	}
	

	readDigit(digit) {
		this.clearButton.removeAttribute("disabled");
		if(this.opButtons.filter(b => b.classList.contains("active")).length !== 0
					&& this.accumulator === 0) {
			this.clear();
		}
		if(this.equalsButton.classList.contains("active")) {
			this.clear();
			this.accumulator = 0;
			this.equalsButton.classList.remove("active");
		}
		document.querySelector(".display").innerHTML += digit;
		this.accumulator = this.accumulator*10 + digit;
		if(this.opButtons.filter(b => b.classList.contains("active")).length === 0) {
			this.opButtons.forEach(b => b.removeAttribute("disabled"));
		} else { this.equalsButton.removeAttribute("disabled"); }
	}

	readOp(operator) {
		this.operator = operator;
		this.opButtons.forEach(b => b.setAttribute("disabled", true));
		document.querySelector("#"+operator).classList.add("active");
		if(!this.equalsButton.classList.contains("active")) {
			this.operand1 = this.accumulator;
		} else { this.equalsButton.classList.remove("active"); }
		this.accumulator = 0;
		console.log(this.operand1);
		console.log(this.operator);
	}

	clear() {
		document.querySelector(".display").innerHTML = "";
		this.accumulator = 0;
		this.equalsButton.classList.remove("active");
	}

	evaluate() {
		let result;
		this.operand2 = this.accumulator;
		switch(this.operator) {
			case 'plus': result = this.operand1 + this.operand2; break;
			case 'minus': result = this.operand1 - this.operand2; break;
			case 'times': result = this.operand1 * this.operand2; break;
			case 'divided': result = this.operand1 / this.operand2; break;
		}
		this.operand1 = result;
		this.accumulator = 0;
		document.querySelector(".display").innerHTML = result;
		console.log(this.operand2);
		this.equalsButton.classList.add("active");
		this.equalsButton.setAttribute("disabled", true);
		this.opButtons.forEach(b => { b.classList.remove("active"); b.removeAttribute("disabled") });
	}
}


let myCalculator = new Calculator();