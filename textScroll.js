
// const fs = require('fs');
// const path = require('path');

// Event listener for text scroll panel
document.addEventListener('DOMContentLoaded', () => {
    const scrollColumn = document.getElementById('scroll-text');
    let texts = [];

    // Load strings from JSON file
    function loadTexts() {
        const filePath = path.join(__dirname, 'terminal_texts.json');
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                console.error("Error loading text file:", err);
                return;
            }
            texts = JSON.parse(data);
        });
    }

    function generateText() {
        if (texts.length === 0) return "Awaiting data...";
        const randomIndex = Math.floor(Math.random() * texts.length);
        return texts[randomIndex];
    }

    function addText(column, speed) {
        // Create a new line element
        const newLine = document.createElement("p");
        // Set the text content to a random string from the array
        newLine.textContent = generateText();
        // Set the class animation styling
        newLine.style.animation = `scroll ${speed}s linear`;
        // Append the new line to the column
        column.appendChild(newLine);

        // Remove the element once the animation ends
        newLine.addEventListener('animationend', () => {
            column.removeChild(newLine);
        });
    }
    // Load text file on startup
    loadTexts();
    // Adjust the interval and speed as needed
    setInterval(() => addText(scrollColumn, 10), 200);
});