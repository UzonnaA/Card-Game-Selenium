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

// Submit user input
document.getElementById("submit-btn").addEventListener("click", async () => {
    const userInput = document.getElementById("user-input").value;
    if (userInput.trim() === "") return;

    try {
        // Send input to the backend and get the response
        const response = await fetch(`${apiBaseUrl}/input?input=${userInput}`, { method: "POST" });
        const message = await response.text();

        // Update the game message
        document.getElementById("game-message").innerText = message;

        // Clear the input field
        document.getElementById("user-input").value = "";

        // Fetch and update player stats
        await fetchAndUpdatePlayerStats();
    } catch (error) {
        console.error("Error submitting input:", error);
    }
});

