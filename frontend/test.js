const { Builder, By, until } = require('selenium-webdriver');

let sleepTimer = 500;




// This is the A-Test Scenerio from A1
async function runTest1() {
    let driver = await new Builder().forBrowser('chrome').build();
    let currentMessage = "";

    try {
        await driver.get("http://192.168.56.1:8081");
        // Start the game
        let startButton = await driver.findElement(By.id("test1"));
        await startButton.click();
        await driver.sleep(sleepTimer);
        
        // Define all other buttons
        let textField = await driver.findElement(By.id("user-input"));
        let enterButton = await driver.findElement(By.id("next-btn"));
        let submitButton = await driver.findElement(By.id("submit-btn"));
        let messageBoard = await driver.findElement(By.id("game-message"));
        let playerBoard = await driver.findElement(By.id("player-stats"));
        let showHand = await driver.findElement(By.id("hands-btn"));
        let backButton = await driver.findElement(By.id("back-btn"));

        await verifyMessage(messageBoard, "Press Enter to continue", "Game started succesfully");
        await keepClicking(driver);
        await verifyMessage(messageBoard, "Would you like to sponsor the quest", "Player 1 was asked to sponsor");
        await submitText(textField, submitButton, driver, "0");
        await verifyMessage(messageBoard, "has declined to sponsor", "Player 1 didn't sponsor");
        await keepClicking(driver);
        await submitText(textField, submitButton, driver, "1");
        await verifyMessage(messageBoard, "Player 2 has agreed to sponsor the quest", "Player 2 sponsors");
        await keepClicking(driver);
        // Building
        let inputArray = ["1", "7", "quit", "2", "5", "quit", "2", "3", "4", "quit", "2", "3", "quit"]
        await submitTextBulk(textField, submitButton, driver, enterButton, inputArray)
        await keepClicking(driver);
        console.log("Player 2 builds the quest");
        
        // Accept the attack
        await submitText(textField, submitButton, driver, "1");
        await keepClicking(driver);
        await submitText(textField, submitButton, driver, "1");
        await keepClicking(driver);
        await submitText(textField, submitButton, driver, "1");
        await keepClicking(driver);
        console.log("Players have accepted the attack (Stage 1)");

        // Every player has one too many cards. Drop the first
        await submitText(textField, submitButton, driver, "1");
        await keepClicking(driver);
        await submitText(textField, submitButton, driver, "1");
        await keepClicking(driver);
        await submitText(textField, submitButton, driver, "1");
        await keepClicking(driver);
        console.log("Attackers have trimmed their hand");

        // Stage 1
        // Player 1 Attack
        console.log("Stage 1 Attack");
        driver.sleep(sleepTimer);
        inputArray = ["5", "5", "quit"];
        
        await submitTextBulk(textField, submitButton, driver, enterButton, inputArray);
        await keepClicking(driver);
        // Player 3 Attack
        inputArray = ["5", "4", "quit"];
        await submitTextBulk(textField, submitButton, driver, enterButton, inputArray);
        await keepClicking(driver);
        // Player 4 Attack
        inputArray = ["4", "6", "quit"];
        await submitTextBulk(textField, submitButton, driver, enterButton, inputArray);
        await keepClicking(driver);

        // Accept the next stage
        await submitText(textField, submitButton, driver, "1");
        await keepClicking(driver);
        await submitText(textField, submitButton, driver, "1");
        await keepClicking(driver);
        await submitText(textField, submitButton, driver, "1");
        await keepClicking(driver);
        console.log("Players have accepted the attack (Stage 2)");
        
        // Stage 2
        // Player 1 Attack
        inputArray = ["7", "6", "quit"];
        await submitTextBulk(textField, submitButton, driver, enterButton, inputArray);
        await keepClicking(driver);
        // Player 3 Attack
        inputArray = ["9", "4", "quit"];
        await submitTextBulk(textField, submitButton, driver, enterButton, inputArray);
        await keepClicking(driver);
        // Player 4 Attack
        inputArray = ["6", "6", "quit"];
        await submitTextBulk(textField, submitButton, driver, enterButton, inputArray);
        await keepClicking(driver);

        // Accept the next stage
        await submitText(textField, submitButton, driver, "1");
        await keepClicking(driver);
        await submitText(textField, submitButton, driver, "1");
        await keepClicking(driver);
        console.log("Players have accepted the attack (Stage 3)");


        // Stage 3
        // Player 3 Attack
        inputArray = ["9", "6", "4", "quit"];
        await submitTextBulk(textField, submitButton, driver, enterButton, inputArray);
        await keepClicking(driver);
        // Player 4 Attack
        inputArray = ["7", "5", "6", "quit"];
        await submitTextBulk(textField, submitButton, driver, enterButton, inputArray);
        await keepClicking(driver);

        // Accept the next stage
        await submitText(textField, submitButton, driver, "1");
        await keepClicking(driver);
        await submitText(textField, submitButton, driver, "1");
        await keepClicking(driver);
        console.log("Players have accepted the attack (Stage 4)");


        // Stage 4
        // Player 3 Attack
        inputArray = ["7", "6", "6", "quit"];
        await submitTextBulk(textField, submitButton, driver, enterButton, inputArray);
        await keepClicking(driver);
        // Player 4 Attack
        inputArray = ["4", "4", "4", "5", "quit"];
        await submitTextBulk(textField, submitButton, driver, enterButton, inputArray);
        await keepClicking(driver);
        

        // Trim Player 2
        inputArray = ["1", "1", "1", "1"];
        await submitTextBulk(textField, submitButton, driver, enterButton, inputArray);
        await keepClicking(driver);
        
        await showHand.click();
        await driver.sleep(sleepTimer);
        
        await verifyMessage(messageBoard, "There are no winners", "The quest ended without winners");
        await verifyMessage(messageBoard, "(1)F5, (2)F10, (3)F15, (4)F15, (5)F30, (6)Horse, (7)Battle-Axe, (8)Battle-Axe, (9)Lance", "Player 1 had the correct hand");
        await verifyMessage(messageBoard, "(1)F5, (2)F5, (3)F15, (4)F30, (5)Sword", "Player 3 had the correct hand");
        await verifyMessage(messageBoard, "(1)F15, (2)F15, (3)F40, (4)Lance", "Player 4 had the correct hand");
        // Player 2 doesn't need their hand asserted

    } catch (error) {
        console.error("Test encountered an error:", error);
    } finally {
        //await driver.quit();
        await driver.sleep(6000000);
    }
}

async function keepClicking(driver) {
    let gameMessageElement = await driver.findElement(By.id("game-message"));
    let nextButton = await driver.findElement(By.id("next-btn"));

    let previousMessage = await gameMessageElement.getText();
    let currentMessage = previousMessage;

    while (true) {
        // Click the next button
        nextButton.click();

        // 1s wait timer
        await driver.sleep(sleepTimer);

        // Get the current game message
        currentMessage = await gameMessageElement.getText();

        // Check if the message has stopped changing
        if (currentMessage === previousMessage) {
            // console.log("The game message has stopped changing.");
            break;
        }
        // Update the previous message for the next iteration
        previousMessage = currentMessage;
    }
}

async function verifyMessage(messageBoard, includesText, successMessage) {
    let currentText = await messageBoard.getText();

    if (currentText.includes(includesText)) {
        console.log(successMessage);
    } else {
        console.log("FAILURE: Expected text not found.");
        console.log("Expected: " + includesText);
        console.log("Received: " + currentText);
    }
}

async function submitText(textField, submitButton, driver, message) {
    await textField.clear();
    await textField.sendKeys(message);
    await submitButton.click();
    await driver.sleep(sleepTimer);
    // console.log("Sent input: " + message);
}

async function submitTextBulk(textField, submitButton, driver, enterButton, inputArray) {
    for(let i = 0; i < inputArray.length; i++){
        await textField.clear();
        await textField.sendKeys(inputArray[i]);
        await submitButton.click();
        await driver.sleep(sleepTimer);
        await keepClicking(driver);
        console.log("Sent input: " + inputArray[i]);
    }
}

runTest1();