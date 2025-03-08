const path = require('path');
const Typed = require('typed.js');

// Function to count leading spaces in a string
function countLeadingSpaces(str) {
    const match = str.match(/^\s+/); // Match all leading spaces (\s)
    return match ? match[0].length : 0;
}

// Function to generate ASCII text
function generateAscii(asciiLines, textArea) {
    if (asciiLines.length === 0) return "Awaiting data...";
    // count the number of lines in the text
    let lineCount = asciiLines.length;
    // generate a typing.js string for each line in lineCount
    for (let i = 0; i < lineCount; i++) {
        const newLine = document.createElement("div");
        newLine.id = `ascii-${i}`;
        newLine.style.whiteSpace = 'pre-wrap';
        textArea.appendChild(newLine);
        // Count leading spaces and set padding-left
        const leadingSpaces = countLeadingSpaces(asciiLines[i]);
        const paddingLeft = `${leadingSpaces}ch`; //'ch' unit for character width
        newLine.style.paddingLeft = paddingLeft;
        // Initialize Typed.js for each line
        new Typed(`#ascii-${i}`, {
            strings: [asciiLines[i].trimStart()],
            typeSpeed: 0,
            showCursor: false,
            loop: false,
            // 
            onComplete: (self) => {
                console.log(`Completed typing for line ${i}`);
                // make each line wave animate in and out like a sine wave
                const line = document.querySelectorAll(`#ascii-${i}`);
                const currentTime = Date.now();
                let opacity = Math.abs(Math.cos(currentTime / 1000 + index)); // cos wave for smooth transition
                opacity = Math.max(opacity, 0.5); // Ensure opacity does not go below 0.2
                line.line.style.opacity = opacity;
                line.style.transition = `opacity 1000ms ease-in-out`;
                line.style.textShadow = `0 0 10px rgba(255, 255, 255, ${opacity})`; // Adds a glow effect
                }
            // 
        });
    }
}

// Function to load texts from JSON file
function loadTexts() {
    const textArea = document.getElementById('typing-text');
    if (!textArea) return; // Exit if the panel is missing
    // Create array to hold the ASCII strings
    let asciiLines = [];
    // Load ASCII strings from JSON file
    const filePath = path.join(__dirname, '..', 'assets', 'typing_texts.json');
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error("Error loading text file:", err);
            return;
        }
        asciiLines = JSON.parse(data);
        generateAscii(asciiLines, textArea); // Generate ASCII text after loading
    });
}

// Export the functions for use in renderer.js
module.exports = { loadTexts };