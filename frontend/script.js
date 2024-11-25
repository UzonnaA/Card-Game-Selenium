const apiBaseUrl = "http://localhost:8080"; // Update if the backend address changes

// Start the game
document.getElementById("start-game-btn").addEventListener("click", async () => {
    try {
        // Call the backend to start the game
        const response = await fetch(`${apiBaseUrl}/start`);
        const message = await response.text();
        
        // Update game message
        document.getElementById("game-message").innerText = message;

        // Hide the start button and show the game console
        document.getElementById("start-game-btn").style.display = "none"; // Hide the start button
        document.getElementById("game-console").style.display = "block"; // Show the game console

        // Fetch and display player stats
        await fetchAndUpdatePlayerStats();
    } catch (error) {
        console.error("Error starting game:", error);
    }
});

// Fetch and display player stats
async function fetchAndUpdatePlayerStats() {
    try {
        // Call the backend to get player stats
        const response = await fetch(`${apiBaseUrl}/players`);
        const players = await response.json();

        // Update the stats container with player data
        const statsContainer = document.getElementById("player-stats");
        statsContainer.innerHTML = ""; // Clear previous stats
        players.forEach(player => {
            const playerDiv = document.createElement("div");
            playerDiv.className = "player";
            playerDiv.innerHTML = `
                <h4>${player.name}</h4>
                <p>Shields: ${player.shields}</p>
                <p>Cards: ${player.cards}</p>
            `;
            statsContainer.appendChild(playerDiv);
        });
    } catch (error) {
        console.error("Error fetching player stats:", error);
    }
}



document.getElementById("submit-btn").addEventListener("click", async () => {
    const userInput = document.getElementById("user-input").value;
    if (!userInput.trim()) return;

    try {
        // Send input to backend for processing
        const response = await fetch(`${apiBaseUrl}/input?input=${encodeURIComponent(userInput)}`, {
            method: "POST",
        });
        const message = await response.text();
        document.getElementById("game-message").innerText = message;

        // Clear input field
        document.getElementById("user-input").value = "";

        // Signal backend that input is ready
        await fetch(`${apiBaseUrl}/signal`, { method: "POST" });

    } catch (error) {
        console.error("Error submitting input:", error);
    }
});

// Poll for console output
async function fetchConsoleOutput() {
    try {
        const response = await fetch(`${apiBaseUrl}/console`);
        const consoleOutput = await response.text();

        if (consoleOutput.trim()) {
            // Update the game message area with new output
            const gameMessage = document.getElementById("game-message");
            gameMessage.innerText += consoleOutput;

            // Scroll to the bottom of the output
            gameMessage.scrollTop = gameMessage.scrollHeight;
        }
    } catch (error) {
        console.error("Error fetching console output:", error);
    }
}

// Start polling for console output every second
setInterval(fetchConsoleOutput, 3000);

