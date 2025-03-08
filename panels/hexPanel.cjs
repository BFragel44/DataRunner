// Get the reference to the hex panel container
const centerColumn = document.querySelector('.hex-panel');
if (!centerColumn) return; // Exit if the panel is missing

// Configuration for the hex display
const charsPerColumn = 16; // Each column contains 16 characters per row
const columnSpacing = "  "; // Space between columns
const updateRate = 100; // Update interval in milliseconds

/**
 * Generates a random hexadecimal string of a given length
 * @param {number} length - Number of characters to generate
 * @returns {string} - Random hex string
 */
function getRandomHexString(length) {
    const chars = "0123456789ABCDEF";
    let result = "";
    for (let i = 0; i < length; i++) {
        result += chars[Math.floor(Math.random() * chars.length)];
    }
    return result;
}

/**
 * Calculates the number of hex columns that can fit inside the panel
 * @returns {number} - Number of columns that fit in the panel width
 */
function getColumnCount() {
    const panelWidth = centerColumn.clientWidth;
    const charWidth = 10;
    const columnWidth = charsPerColumn * charWidth + columnSpacing.length * charWidth;
    const result = Math.floor(panelWidth / columnWidth);
    return result;
}

/**
 * Calculates the number of rows that can fit inside the panel
 * @returns {number} - Number of rows that fit in the panel height
 */
function getRowCount() {
    const panelHeight = centerColumn.clientHeight;
    const charHeight = 20; // Approximate height of a character in pixels (adjust as needed)
    return Math.floor(panelHeight / charHeight); // Rows based on available space
}

/**
 * Generates an initial hex matrix where each row contains multiple columns
 * @returns {string[]} - Array of rows with formatted hex data
 */
function generateHexGrid() {
    const numCols = getColumnCount(); // Calculate columns dynamically
    const numRows = getRowCount(); // Calculate rows dynamically
    
    return Array.from({ length: numRows-3 }, () => {
        let row = Array.from({ length: numCols }, () =>
            getRandomHexString(charsPerColumn) // Generate a 16-character hex column
        ).join(columnSpacing); // Add spacing between columns
        return row;
    });
}

// Initialize hexRows with the generated hex grid
let hexRows = generateHexGrid();

/**
 * Updates the hex panel by randomly changing characters within the rows
 */
function updatePanel() {
    hexRows = hexRows.map(row => {
        let rowArray = row.split(""); // Convert row into an array of characters
        let indexToChange;
        do {
            indexToChange = Math.floor(Math.random() * rowArray.length);
        } while (rowArray[indexToChange] === " "); // Don't replace spaces or zeroes
        rowArray[indexToChange] = getRandomHexString(1); // Replace with a random hex character
        return rowArray.join(""); // Convert back to string
    });

    // Render the updated hex data into the panel
    centerColumn.innerHTML = hexRows.map((row, index) => 
        `<div class="hex-row" data-row="${index}">${row}</div>`).join("");

    // fade opacity of the rows in and out in waves
    const rows = document.querySelectorAll('.hex-row');
    const currentTime = Date.now();
    rows.forEach((row, index) => {
        let opacity = Math.abs(Math.cos(currentTime / 1000 + index)); // cos wave for smooth transition
        opacity = Math.max(opacity, 0.5); // Ensure opacity does not go below 0.2
        row.style.opacity = opacity;
        row.style.transition = `opacity 1000ms ease-in-out`;
        row.style.textShadow = `0 0 10px rgba(255, 255, 255, ${opacity})`; // Adds a glow effect
    });
}

/**
 * Listen for window resize events and regenerate the grid accordingly
 */
window.addEventListener('resize', () => {
    hexRows = generateHexGrid(); // Recalculate grid when resized
});

// Export the functions
module.exports = {
    getRandomHexString,
    getColumnCount,
    getRowCount,
    generateHexGrid,
    updatePanel
};