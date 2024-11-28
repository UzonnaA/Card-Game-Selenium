const { Builder, By, until } = require('selenium-webdriver');




// This is the A-Test Scenerio from A1
async function runTest1() {
    let driver = await new Builder().forBrowser('chrome').build();
    let currentMessage = "";

    try {
        await driver.get("http://192.168.56.1:8081");
        // Start the game
        let startButton = await driver.findElement(By.id("test1"));
        await startButton.click();
        await driver.sleep(1000);
        
        // Define all other buttons
        let textField = await driver.findElement(By.id("user-input"));
        let enterButton = await driver.findElement(By.id("next-btn"));
        let submitButton = await driver.findElement(By.id("submit-btn"));
        let messageBoard = await driver.findElement(By.id("game-message"));

        await verifyMessage(messageBoard, "Press Enter to continue", "Game started succesfully");
        await keepClicking(driver);
        await verifyMessage(messageBoard, "Would you like to sponsor the quest", "keepClicking worked");
        await submitText(textField, submitButton, driver, "0");
        await verifyMessage(messageBoard, "has declined to sponsor", "sendKeys worked");

        // Make a submitTextBulk function that can take an array an input all the values
        
    } catch (error) {
        console.error("Test encountered an error:", error);
    } finally {
        await driver.quit();
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
        await driver.sleep(1000);

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
    }
}

async function submitText(textField, submitButton, driver, message) {
    await textField.clear();
    await textField.sendKeys(message);
    await submitButton.click();
    await driver.sleep(1000);
}

async function submitTextBulk(textField, submitButton, driver, enterButton, inputArray) {
    for(let i = 0; i < inputArray.length; i++){
        await textField.clear();
        await textField.sendKeys(inputArray[i]);
        await submitButton.click();
        await driver.sleep(1000);
        await keepClicking(driver);
    }
}

runTest1();