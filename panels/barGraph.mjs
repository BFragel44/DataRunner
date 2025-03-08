
async function createBarGraph() {
    console.log("✅ Bar graph initialized!");

    // Ensure the container exists
    const container = document.getElementById("barGraphContainer");
    if (!container) {
        console.error("❌ barGraphContainer not found in DOM!");
        return;
    }

    // Set up the SVG canvas
    const width = 600;
    const height = 300;
    const barWidth = 40;
    const numBars = 10;
    const updateInterval = 1000;

    container.innerHTML = ''; // Clear previous content
    const svg = window.d3.select("#barGraphContainer")
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        .style("background", "black"); // Cyberpunk theme

    // Get initial data from the main process
    let data = await window.electronAPI.getData();
    console.log("📊 Initial Data:", data);

    // Create scales
    const xScale = window.d3.scaleBand().domain(window.d3.range(numBars)).range([0, width]).padding(0.2);
    const yScale = window.d3.scaleLinear().domain([0, 100]).range([height, 0]); // Adjusted to a fixed range

    // Create bars
    const bars = svg.selectAll("rect")
        .data(data)
        .enter()
        .append("rect")
        .attr("x", (d, i) => xScale(i))
        .attr("y", d => yScale(d))
        .attr("width", barWidth)
        .attr("height", d => height - yScale(d))
        .attr("fill", "cyan")
        .attr("stroke", "#0ff")
        .attr("stroke-width", 1)
        .attr("opacity", 0.8);

    // Line generator
    const line = window.d3.line()
        .x((d, i) => xScale(i) + barWidth / 2)
        .y(d => yScale(d))
        .curve(window.d3.curveMonotoneX);

    // Create line path
    const linePath = svg.append("path")
        .datum(data)
        .attr("fill", "none")
        .attr("stroke", "lime")
        .attr("stroke-width", 2)
        .attr("d", line);

    console.log("✅ Bars and Line Graph Initialized");

    // Function to update data securely from the main process
    async function updateData() {
        data = await window.electronAPI.getData();
        console.log("📊 Updated Data:", data);

        bars.data(data)
            .transition().duration(800)
            .attr("y", d => yScale(d))
            .attr("height", d => height - yScale(d));

        linePath.datum(data)
            .transition().duration(800)
            .attr("d", line);
    }

    // Update loop
    setInterval(updateData, updateInterval);
}

// Expose the function to the renderer
module.exports = { createBarGraph };
