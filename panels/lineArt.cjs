// Event listener for square/line art panel
document.addEventListener('DOMContentLoaded', () => {
    const artbox = document.getElementById('artbox');

    function createLine() {
        const line = document.createElement("div");
        line.classList.add("line");
        line.style.width = `${Math.random() * 25}vw`; // Random width
        line.style.opacity = Math.random() * 0.5; // Random opacity

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