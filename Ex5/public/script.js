let currentExpression = "";

function appendToDisplay(value) {
    currentExpression += value;
    document.getElementById('display').innerText = currentExpression;
}

function clearDisplay() {
    currentExpression = "";
    document.getElementById('display').innerText = "0";
}

function backspace() {
    currentExpression = currentExpression.slice(0, -1);
    document.getElementById('display').innerText = currentExpression || "0";
}

async function sendToNode() {
    const display = document.getElementById('display');
    
    try {
        const response = await fetch('/calculate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ expression: currentExpression })
        });

        const data = await response.json();
        currentExpression = data.result.toString(); // Update current with result
        display.innerText = currentExpression;
    } catch (error) {
        display.innerText = "Error";
        currentExpression = "";
    }
}