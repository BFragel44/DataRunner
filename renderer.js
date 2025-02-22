const { time } = require('console');
const { ipcRenderer } = require('electron');
const fs = require('fs');
const path = require('path');
const Typed = require('typed.js');
// import Typed from 'typed.js';


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


// Event listener for text typing panel
document.addEventListener('DOMContentLoaded', () => {
    // Get the text area element from HTML
    const textArea = document.getElementById('typing-text');
    // Create array to hold the ASCII strings
    let asciiLines = [];
    
    // Load ASCII strings from JSON file
    function loadTexts() {
        const filePath = path.join(__dirname, 'typing_texts.json');
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
            new Typed(`#ascii-${i}`, {
                strings: [asciiLines[i].trimStart()],
                typeSpeed: 1,
                showCursor: false,
                loop: true,
                fadeOut: true,
                fadeOutClass: 'fade-out',
                fadeOutDelay: 1000,
            });
        }
    }
    // Load text file on startup
    loadTexts();

});



// Event listener for square/line art panel
document.addEventListener('DOMContentLoaded', () => {
    const artbox = document.getElementById('artbox');

    function createLine() {
        const line = document.createElement("div");
        line.classList.add("line");
        line.style.width = `${Math.random() * 25}vw`; // Random width
        line.style.opacity = Math.random()*0.5; // Random opacity

        // Set the position relative to the width of #artbox
        const rightPosition = Math.random() * artbox.clientWidth; // Random within artbox width
        const animationSpeed = 2; // 2s

        line.style.right = `${rightPosition}px`; // Position it only within artbox
        line.style.animationDuration = `${animationSpeed}s`;

        // Randomly assign line movement animation direction
        const animations = ['moveLineRight', 'moveLineLeft', 'moveLineUp', 'moveLineDown', 'flicker'];
        const animationName = animations[Math.floor(Math.random() * animations.length)];
        line.style.animationName = animationName;

        // Make line color red if animationName is 'flicker'
        if (animationName === 'flicker') {
            line.style.backgroundColor = 'red';
            line.style.width = line.style.width / 2; // Make it slimmer
        } else {
             // Make line color green if animationName is not 'flicker'
             line.style.backgroundColor = 'limegreen';
        }

        artbox.appendChild(line);

        // Remove the line after animation ends
        line.addEventListener('animationend', () => {
            line.remove();
        });
    }

    // Generate lines at a regular interval
    setInterval(createLine, 300); // Adjust interval to control line density
});
