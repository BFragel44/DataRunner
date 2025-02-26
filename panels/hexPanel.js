document.addEventListener('DOMContentLoaded', () => {
    // Get the reference to the hex panel container
    const centerColumn = document.querySelector('.hex-panel');
        if (!centerColumn) return; // Exit if the panel is missing

    // Configuration for the hex display
    const numRows = 40;  // Number of rows in the panel
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
        const charWidth = 10; // Approximate width of a character in pixels (adjust as needed)
        return Math.floor(panelWidth / (charsPerColumn * charWidth)); // Columns based on available space
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
        return Array.from({ length: numRows }, () => {
            let row = Array.from({ length: numCols }, () =>
                getRandomHexString(charsPerColumn) // Generate a 16-character hex column
            ).join(columnSpacing); // Add spacing between columns
            return row;
        });
    }

    // Initialize the hex grid with random values
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
            } while (rowArray[indexToChange] === " "); // Ensure we don't replace spaces

            rowArray[indexToChange] = getRandomHexString(1); // Replace with a random hex character
            return rowArray.join(""); // Convert back to string
        });

        // Render the updated hex data into the panel
        centerColumn.innerHTML = hexRows.join("<br>");
    }

    /**
     * Listen for window resize events and regenerate the grid accordingly
     */
    window.addEventListener('resize', () => {
        hexRows = generateHexGrid(); // Recalculate grid when resized
    });

    // Start periodically updating the hex panel
    setInterval(updatePanel, updateRate);
});
