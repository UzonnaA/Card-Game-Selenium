const apiBaseUrl = "http://localhost:8080"; // Update if the backend address changes


// Start the game
document.getElementById("start-game-btn").addEventListener("click", async () => {
    try {
        const response = await fetch(`${apiBaseUrl}/start`);
        const message = await response.text();
        document.getElementById("game-message").innerText = message;

        // Hide the start button and show the game console
        document.getElementById("start-game-btn").style.display = "none";
        document.getElementById("test1").style.display = "none";
        document.getElementById("test2").style.display = "none";
        document.getElementById("test3").style.display = "none";
        document.getElementById("test4").style.display = "none";
        document.getElementById("game-console").style.display = "block";
        console.log("Start button hit")
        gameStarted = true;
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
            // console.log("Player stats loaded")
        });
    } catch (error) {
        console.error("Error fetching player stats:", error);
    }
}

// Start polling for console output every second
setInterval(fetchAndUpdatePlayerStats, 1000);





document.getElementById("submit-btn").addEventListener("click", async () => {
    const userInput = document.getElementById("user-input").value;
    if (!userInput.trim()) return;

    try {
        const response = await fetch(`${apiBaseUrl}/input?input=${encodeURIComponent(userInput)}`, {
            method: "POST",
        });
        const message = await response.text();
        document.getElementById("game-message").innerText = message;
        document.getElementById("user-input").value = ""; // Clear input field
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
            // Update the game message area with new output, clearing the previous content
            const gameMessage = document.getElementById("game-message");
            gameMessage.innerText = consoleOutput; // Replace existing content

            // Scroll to the bottom of the output
            gameMessage.scrollTop = gameMessage.scrollHeight;
        }
    } catch (error) {
        console.error("Error fetching console output:", error);
    }
}

// Start polling for console output every second
setInterval(fetchConsoleOutput, 1000);


async function incrementConsoleIndex() {
    try {
        await fetch(`${apiBaseUrl}/increment`, { method: "POST" });
        await fetchConsoleOutput(); // Fetch and display the new output
    } catch (error) {
        console.error("Error incrementing console index:", error);
    }
}

async function decrementConsoleIndex() {
    try {
        await fetch(`${apiBaseUrl}/decrement`, { method: "POST" });
        await fetchConsoleOutput(); // Fetch and display the new output
    } catch (error) {
        console.error("Error incrementing console index:", error);
    }
}

async function showhands() {
    try {
        await fetch(`${apiBaseUrl}/hands`, { method: "POST" });
        await fetchConsoleOutput(); // Fetch and display the new output
    } catch (error) {
        console.error("Error incrementing console index:", error);
    }
}

document.getElementById("next-btn").addEventListener("click", incrementConsoleIndex);
document.getElementById("back-btn").addEventListener("click", decrementConsoleIndex);
document.getElementById("hands-btn").addEventListener("click", showhands);

// Everything below is for the tests

// Repeat this for tests 2-4 later
document.getElementById("test1").addEventListener("click", async () => {
    try {
        const response = await fetch(`${apiBaseUrl}/start1`);
        const message = await response.text();
        document.getElementById("game-message").innerText = message;

        // Hide the start button and show the game console
        document.getElementById("start-game-btn").style.display = "none";
        document.getElementById("test1").style.display = "none";
        document.getElementById("test2").style.display = "none";
        document.getElementById("test3").style.display = "none";
        document.getElementById("test4").style.display = "none";
        
        document.getElementById("game-console").style.display = "block";
        console.log("Test 1 button hit")

        await fetchAndUpdatePlayerStats();
    } catch (error) {
        console.error("Error starting game:", error);
    }
});