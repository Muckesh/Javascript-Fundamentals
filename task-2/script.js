let display = document.getElementById("display");

// Append value to display
function appendValue(value) {
    display.value += value;
}

// Clear the display
function clearDisplay() {
    display.value = "";
}

// Calculate the result
function calculateResult() {
    try {
        display.value = eval(display.value); // Evaluates the expression
    } catch (error) {
        display.value = "Error"; // Handles invalid inputs
    }
}
