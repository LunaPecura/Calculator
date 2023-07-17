class Calculator {

	currentInput = [];

	readDigit(digit) {
		this.currentInput.push(digit);
		document.querySelector(".display").innerHTML += digit;
	}

	readOp(char) {
		switch(char) {
			case 'c': {this.currentInput = []; this.clearScreen();}
			case 'e':
			case 'p':
			case 'm':
			case 't':
			case 'd': break;
		}
	}

	clearScreen() {
		document.querySelector(".display").innerHTML = "";
	}
}


let myCalculator = new Calculator();