document.addEventListener('DOMContentLoaded', () => {
    // const hexPanel = document.getElementsByClassName('hex-panel')[0]; // Get the first element with class 'hex-panel'
    const hexPanel = document.querySelector('.hex-panel');
    if (!hexPanel) return; // Exit if the panel is missing

    // Set the number of rows and columns for the hex panel
    // set the number of rows so it fits the screen
    const { width, height } = window.screen;
    const rowHeight = 20; // Height of each row in pixels
    const numRows = Math.floor(height / rowHeight); // Number of rows in the panel
    // const numRows = 40;  // Number of rows in the panel
    const numCols = 16;  // Characters per row
    const updateRate = 400; // Update interval in ms

    // Function to generate a random hex string
    function getRandomHexString(length) {
        const chars = "0123456789ABCDEF";
        let result = "";
        for (let i = 0; i < length; i++) {
            result += chars[Math.floor(Math.random() * chars.length)];
        }
        return result;
    }

    // Initialize the panel with random hex rows
    let hexRows = Array.from({ length: numRows }, () => getRandomHexString(numCols));

    function updatePanel() {
        // Randomly change some characters in each row
        hexRows = hexRows.map(row => {
            let rowArray = row.split("");
            let indexToChange = Math.floor(Math.random() * rowArray.length);
            rowArray[indexToChange] = getRandomHexString(1);
            return rowArray.join("");
        });

        // Render the updated rows in the panel
        hexPanel.innerHTML = hexRows.join("<br>");
    }

    // Start updating the panel periodically
    setInterval(updatePanel, updateRate);
});