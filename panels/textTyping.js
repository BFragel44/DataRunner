const fs = require('fs');
const path = require('path');
const Typed = require('typed.js');

// Event listener for text typing panel
document.addEventListener('DOMContentLoaded', () => {
    // Get the text area element from HTML
    const textArea = document.getElementById('typing-text');
    if (!textArea) return; // Exit if the panel is missing
    // Create array to hold the ASCII strings
    let asciiLines = [];
    
    // Load ASCII strings from JSON file
    function loadTexts() {
        const filePath = path.join(__dirname, 'assets\\typing_texts.json');
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                console.error("Error loading text file:", err);
                return;
            }
            asciiLines = JSON.parse(data);
            generateAscii(); // Generate ASCII text after loading
        });
    }

    // Function to count leading spaces in a string
    function countLeadingSpaces(str) {
        const match = str.match(/^\s+/); // Match all leading spaces (\s)
        return match ? match[0].length : 0;
    }

    // Function to generate ASCII text
    function generateAscii() {
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
                loop: true,
                fadeOut: true,
                fadeTimeout: 1000
            });
        }
    }
    // Load text file on startup
    loadTexts();
});