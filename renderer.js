const { ipcRenderer } = require('electron');
const fs = require('fs');
const path = require('path');
const { loadTexts } = require('./panels/textTyping.cjs');
const { getRandomHexString, getColumnCount, getRowCount, generateHexGrid, updatePanel } = require('./panels/hexPanel.cjs');
// const { createLine } = require('./panels/lineArt.cjs');


// Event listener for text typing panel
document.addEventListener('DOMContentLoaded', () => {
    loadTexts();
});


// Event listener for hex panel
document.addEventListener('DOMContentLoaded', () => {
    // Example usage of imported functions
    const randomHex = getRandomHexString(16);
    console.log(`Random Hex: ${randomHex}`);

    const columnCount = getColumnCount();
    console.log(`Column Count: ${columnCount}`);

    const rowCount = getRowCount();
    console.log(`Row Count: ${rowCount}`);

    // Initialize the hex grid with random values
    let hexRows = generateHexGrid();

    // Start periodically updating the hex panel
    setInterval(updatePanel, 100);
});


// // Event listener for square/line art panel
// document.addEventListener('DOMContentLoaded', () => {
//     const artbox = document.getElementById('artbox');

//     function createLine() {
//         const line = document.createElement("div");
//         line.classList.add("line");
//         line.style.width = `${Math.random() * 25}vw`; // Random width
//         line.style.opacity = Math.random()*0.5; // Random opacity

//         // Set the position relative to the width of #artbox
//         const rightPosition = Math.random() * artbox.clientWidth; // Random within artbox width
//         const animationSpeed = 2; // 2s

//         line.style.right = `${rightPosition}px`; // Position it only within artbox
//         line.style.animationDuration = `${animationSpeed}s`;

//         // Randomly assign line movement animation direction
//         const animations = ['moveLineRight', 'moveLineLeft', 'moveLineUp', 'moveLineDown', 'flicker'];
//         const animationName = animations[Math.floor(Math.random() * animations.length)];
//         line.style.animationName = animationName;

//         // Make line color red if animationName is 'flicker'
//         if (animationName === 'flicker') {
//             line.style.backgroundColor = 'red';
//             line.style.width = line.style.width / 2; // Make it slimmer
//         } else {
//              // Make line color green if animationName is not 'flicker'
//              line.style.backgroundColor = 'limegreen';
//         }

//         artbox.appendChild(line);

//         // Remove the line after animation ends
//         line.addEventListener('animationend', () => {
//             line.remove();
//         });
//     }

//     // Generate lines at a regular interval
//     setInterval(createLine, 300); // Adjust interval to control line density
// });
