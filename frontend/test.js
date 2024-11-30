const { Builder, By, until } = require('selenium-webdriver');

let sleepTimer = 10;




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

// This is the 2 Winner Game Scenario
async function runTest2() {
    let driver = await new Builder().forBrowser('chrome').build();
    let currentMessage = "";

    try {
        await driver.get("http://192.168.56.1:8081");
        // Start the game
        let startButton = await driver.findElement(By.id("test2"));
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

        
        await keepClicking(driver);
        
        // Player 1 sponsors
        await submitText(textField, submitButton, driver, "1");
        await keepClicking(driver);
        
        // Building
        let inputArray = ["1", "quit", "1", "5", "quit", "1", "4", "quit", "1", "4", "quit"]
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
        console.log("Stage 1 Attack");
        
        // Player 2 Attack
        inputArray = ["6", "quit"];
        await submitTextBulk(textField, submitButton, driver, enterButton, inputArray);
        await keepClicking(driver);

        // Player 3 Attack
        inputArray = ["quit"];
        await submitTextBulk(textField, submitButton, driver, enterButton, inputArray);
        await keepClicking(driver);
        
        // Player 4 Attack
        inputArray = ["6", "quit"];
        await submitTextBulk(textField, submitButton, driver, enterButton, inputArray);
        await keepClicking(driver);

        // Accept the next stage
        await submitText(textField, submitButton, driver, "1");
        await keepClicking(driver);
        await submitText(textField, submitButton, driver, "1");
        await keepClicking(driver);;
        console.log("Players have accepted the attack (Stage 2)");
        
        // Stage 2
        console.log("Stage 2 Attack");
        
        // Player 2 Attack
        inputArray = ["4", "quit"];
        await submitTextBulk(textField, submitButton, driver, enterButton, inputArray);
        await keepClicking(driver);

        // Player 4 Attack
        inputArray = ["4", "quit"];
        await submitTextBulk(textField, submitButton, driver, enterButton, inputArray);
        await keepClicking(driver);
    

        // Accept the next stage
        await submitText(textField, submitButton, driver, "1");
        await keepClicking(driver);
        await submitText(textField, submitButton, driver, "1");
        await keepClicking(driver);
        console.log("Players have accepted the attack (Stage 3)");


        // Stage 3
        console.log("Stage 3 Attack");
        
        // Player 2 Attack
        inputArray = ["7", "5", "quit"];
        await submitTextBulk(textField, submitButton, driver, enterButton, inputArray);
        await keepClicking(driver);

        // Player 4 Attack
        inputArray = ["7", "5", "quit"];
        await submitTextBulk(textField, submitButton, driver, enterButton, inputArray);
        await keepClicking(driver);

        // Accept the next stage
        await submitText(textField, submitButton, driver, "1");
        await keepClicking(driver);
        await submitText(textField, submitButton, driver, "1");
        await keepClicking(driver);
        console.log("Players have accepted the attack (Stage 4)");


        // Stage 4
        console.log("Stage 4 Attack");
        
        // Player 2 Attack
        inputArray = ["6", "6", "quit"];
        await submitTextBulk(textField, submitButton, driver, enterButton, inputArray);
        await keepClicking(driver);

        // Player 4 Attack
        inputArray = ["6", "6", "quit"];
        await submitTextBulk(textField, submitButton, driver, enterButton, inputArray);
        await keepClicking(driver);

        // Trim Player 1
        inputArray = ["1", "1", "1", "1"];
        await submitTextBulk(textField, submitButton, driver, enterButton, inputArray);
        await keepClicking(driver);
        
        // ~~~~~~~~~~~~ QUEST B BEGINS HERE ~~~~~~~~~~~~~~~~~

        // Player 2 passes, Player 3 sponsors
        await submitText(textField, submitButton, driver, "0");
        await keepClicking(driver);
        await submitText(textField, submitButton, driver, "1");
        await keepClicking(driver);

        // Building
        inputArray = ["1", "quit", "1", "3", "quit", "1", "4", "quit"]
        await submitTextBulk(textField, submitButton, driver, enterButton, inputArray)
        await keepClicking(driver);
        console.log("Player 3 builds the quest");

        // Accept the attack
        await submitText(textField, submitButton, driver, "0");
        await keepClicking(driver);
        await submitText(textField, submitButton, driver, "1");
        await keepClicking(driver);
        await submitText(textField, submitButton, driver, "1");
        await keepClicking(driver);
        console.log("Players have accepted the attack (Stage 1, Second Quest)");

        // Stage 1
        console.log("Stage 1 Attack");
        
        // Player 2 Attack
        inputArray = ["6", "quit"];
        await submitTextBulk(textField, submitButton, driver, enterButton, inputArray);
        await keepClicking(driver);
         
        // Player 4 Attack
        inputArray = ["6", "quit"];
        await submitTextBulk(textField, submitButton, driver, enterButton, inputArray);
        await keepClicking(driver);

        // Accept the next stage
        await submitText(textField, submitButton, driver, "1");
        await keepClicking(driver);
        await submitText(textField, submitButton, driver, "1");
        await keepClicking(driver);
        console.log("Players have accepted the attack (Stage 2, Second Quest)");

        // Stage 2
        console.log("Stage 2 Attack");
        
        // Player 2 Attack
        inputArray = ["7", "quit"];
        await submitTextBulk(textField, submitButton, driver, enterButton, inputArray);
        await keepClicking(driver);
        
        // Player 4 Attack
        inputArray = ["7", "quit"];
        await submitTextBulk(textField, submitButton, driver, enterButton, inputArray);
        await keepClicking(driver);

        // Accept the next stage
        await submitText(textField, submitButton, driver, "1");
        await keepClicking(driver);
        await submitText(textField, submitButton, driver, "1");
        await keepClicking(driver);
        console.log("Players have accepted the attack (Stage 3, Second Quest)");


        // Stage 3
        console.log("Stage 3 Attack");
        
        // Player 2 Attack
        inputArray = ["10", "quit"];
        await submitTextBulk(textField, submitButton, driver, enterButton, inputArray);
        await keepClicking(driver);
        
        // Player 4 Attack
        inputArray = ["10", "quit"];
        await submitTextBulk(textField, submitButton, driver, enterButton, inputArray);
        await keepClicking(driver);

        // Trim Player 3
        inputArray = ["1", "2", "2"];
        await submitTextBulk(textField, submitButton, driver, enterButton, inputArray);
        await keepClicking(driver);

    
        await showHand.click();
        await driver.sleep(sleepTimer);
        await verifyMessage(messageBoard, "Player 2 is a winner", "Player 2 won the game as they should!");
        await verifyMessage(messageBoard, "Player 4 is a winner", "Player 4 won the game as they should!");
        
        await verifyMessage(messageBoard, "(1)F15, (2)F15, (3)F20, (4)F20, (5)F20, (6)F20, (7)F25, (8)F25, (9)F30, (10)Horse, (11)Battle-Axe, (12)Lance", "Player 1 had the correct hand");
        await verifyMessage(messageBoard, "(1)F10, (2)F15, (3)F15, (4)F25, (5)F30, (6)F40, (7)F50, (8)Lance, (9)Lance", "Player 2 had the correct hand");
        await verifyMessage(messageBoard, "(1)F20, (2)F40, (3)Dagger, (4)Dagger, (5)Sword, (6)Horse, (7)Horse, (8)Horse, (9)Horse, (10)Battle-Axe, (11)Battle-Axe, (12)Lance", "Player 3 had the correct hand");
        await verifyMessage(messageBoard, "(1)F15, (2)F15, (3)F20, (4)F25, (5)F30, (6)F50, (7)F70, (8)Lance, (9)Lance", "Player 4 had the correct hand");
        

    } catch (error) {
        console.error("Test encountered an error:", error);
    } finally {
        //await driver.quit();
        await driver.sleep(6000000);
    }
}

async function runTest3() {
    let driver = await new Builder().forBrowser('chrome').build();
    let currentMessage = "";

    try {
        await driver.get("http://192.168.56.1:8081");
        // Start the game
        let startButton = await driver.findElement(By.id("test3"));
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

        
        await keepClicking(driver);
        
        // Player 1 sponsors
        await submitText(textField, submitButton, driver, "1");
        await keepClicking(driver);
        
        // Building
        let inputArray = ["1", "quit", "2", "quit", "3", "quit", "4", "quit"]
        await submitTextBulk(textField, submitButton, driver, enterButton, inputArray)
        await keepClicking(driver);
        console.log("Player 1 builds the quest");
        
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
        console.log("Stage 1 Attack");
        
        // Player 2 Attack
        inputArray = ["3", "quit"];
        await submitTextBulk(textField, submitButton, driver, enterButton, inputArray);
        await keepClicking(driver);

        // Player 3 Attack
        inputArray = ["3", "quit"];
        await submitTextBulk(textField, submitButton, driver, enterButton, inputArray);
        await keepClicking(driver);
        
        // Player 4 Attack
        inputArray = ["4", "quit"];
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
        console.log("Stage 2 Attack");
        
        // Player 2 Attack
        inputArray = ["6", "quit"];
        await submitTextBulk(textField, submitButton, driver, enterButton, inputArray);
        await keepClicking(driver);

        // Player 3 Attack
        inputArray = ["6", "quit"];
        await submitTextBulk(textField, submitButton, driver, enterButton, inputArray);
        await keepClicking(driver);

        // Player 4 Attack
        inputArray = ["7", "quit"];
        await submitTextBulk(textField, submitButton, driver, enterButton, inputArray);
        await keepClicking(driver);
    

        // Accept the next stage
        await submitText(textField, submitButton, driver, "1");
        await keepClicking(driver);
        await submitText(textField, submitButton, driver, "1");
        await keepClicking(driver);
        await submitText(textField, submitButton, driver, "1");
        await keepClicking(driver);
        console.log("Players have accepted the attack (Stage 3)");


        // Stage 3
        console.log("Stage 3 Attack");
        
        // Player 2 Attack
        inputArray = ["8", "quit"];
        await submitTextBulk(textField, submitButton, driver, enterButton, inputArray);
        await keepClicking(driver);

        // Player 3 Attack
        inputArray = ["8", "quit"];
        await submitTextBulk(textField, submitButton, driver, enterButton, inputArray);
        await keepClicking(driver);

        // Player 4 Attack
        inputArray = ["9", "quit"];
        await submitTextBulk(textField, submitButton, driver, enterButton, inputArray);
        await keepClicking(driver);

        // Accept the next stage
        await submitText(textField, submitButton, driver, "1");
        await keepClicking(driver);
        await submitText(textField, submitButton, driver, "1");
        await keepClicking(driver);
        await submitText(textField, submitButton, driver, "1");
        await keepClicking(driver);
        console.log("Players have accepted the attack (Stage 4)");


        // Stage 4
        console.log("Stage 4 Attack");
        
         // Player 2 Attack
         inputArray = ["10", "quit"];
         await submitTextBulk(textField, submitButton, driver, enterButton, inputArray);
         await keepClicking(driver);
 
         // Player 3 Attack
         inputArray = ["10", "quit"];
         await submitTextBulk(textField, submitButton, driver, enterButton, inputArray);
         await keepClicking(driver);
 
         // Player 4 Attack
         inputArray = ["11", "quit"];
         await submitTextBulk(textField, submitButton, driver, enterButton, inputArray);
         await keepClicking(driver);

         // Perfect up to here ...

        // Trim Player 1
        inputArray = ["1", "1", "2", "2"];
        await submitTextBulk(textField, submitButton, driver, enterButton, inputArray);
        await keepClicking(driver);

        // ~~~~~~~~~~~~ EVENTS BEGINS HERE ~~~~~~~~~~~~~~~~~

        // Prosperity Trim
        inputArray = ["1", "1", "1", "1", "1"];
        await submitTextBulk(textField, submitButton, driver, enterButton, inputArray);
        await keepClicking(driver);

        // Queen's Favor Trim (Player 4)
        inputArray = ["2", "4"];
        await submitTextBulk(textField, submitButton, driver, enterButton, inputArray);
        await keepClicking(driver);
        
        // ~~~~~~~~~~~~ QUEST B BEGINS HERE ~~~~~~~~~~~~~~~~~

        // Player 1 sponsors
        await submitText(textField, submitButton, driver, "1");
        await keepClicking(driver);
    
        // Building
        inputArray = ["1", "quit", "1", "7", "quit", "4", "6", "quit"]
        await submitTextBulk(textField, submitButton, driver, enterButton, inputArray)
        await keepClicking(driver);
        console.log("Player 1 builds the quest");

        // Accept the attack
        await submitText(textField, submitButton, driver, "1");
        await keepClicking(driver);
        await submitText(textField, submitButton, driver, "1");
        await keepClicking(driver);
        await submitText(textField, submitButton, driver, "1");
        await keepClicking(driver);
        console.log("Players have accepted the attack (Stage 1, Second Quest)");

        // Every player has one too many cards. Drop the first
        await submitText(textField, submitButton, driver, "1");
        await keepClicking(driver);
        await submitText(textField, submitButton, driver, "1");
        await keepClicking(driver);
        await submitText(textField, submitButton, driver, "1");
        await keepClicking(driver);
        console.log("Attackers have trimmed their hand");

        // Stage 1
        console.log("Stage 1 Attack");

        // Player 2 Attack
        inputArray = ["9", "quit"];
        await submitTextBulk(textField, submitButton, driver, enterButton, inputArray);
        await keepClicking(driver);
 
        // Player 3 Attack
        inputArray = ["9", "quit"];
        await submitTextBulk(textField, submitButton, driver, enterButton, inputArray);
        await keepClicking(driver);
         
        // Player 4 Attack
        inputArray = ["10", "quit"];
        await submitTextBulk(textField, submitButton, driver, enterButton, inputArray);
        await keepClicking(driver);
 
        // Accept the next stage
        await submitText(textField, submitButton, driver, "1");
        await keepClicking(driver);
        await submitText(textField, submitButton, driver, "1");
        await keepClicking(driver);
        console.log("Players have accepted the attack (Stage 2)");

        // Stage 2
        console.log("Stage 2 Attack");

        // Player 2 Attack
        inputArray = ["10", "8", "quit"];
        await submitTextBulk(textField, submitButton, driver, enterButton, inputArray);
        await keepClicking(driver);
  
        // Player 3 Attack
        inputArray = ["10", "7", "quit"];
        await submitTextBulk(textField, submitButton, driver, enterButton, inputArray);
        await keepClicking(driver);

        // Accept the next stage
        await submitText(textField, submitButton, driver, "1");
        await keepClicking(driver);
        await submitText(textField, submitButton, driver, "1");
        await keepClicking(driver);
        console.log("Players have accepted the attack (Stage 3)");

        // Stage 3
        console.log("Stage 3 Attack");

        // Player 2 Attack
        inputArray = ["10", "8", "quit"];
        await submitTextBulk(textField, submitButton, driver, enterButton, inputArray);
        await keepClicking(driver);
  
        // Player 3 Attack
        inputArray = ["11", "quit"];
        await submitTextBulk(textField, submitButton, driver, enterButton, inputArray);
        await keepClicking(driver);

        // Trim Player 1
        inputArray = ["1", "1", "1"];
        await submitTextBulk(textField, submitButton, driver, enterButton, inputArray);
        await keepClicking(driver);

    
        await showHand.click();
        await driver.sleep(sleepTimer);
        await verifyMessage(messageBoard, "Player 3 is a winner", "Player 3 won the game as they should!");

        await verifyMessage(messageBoard, "(1)F25, (2)F25, (3)F35, (4)Dagger, (5)Dagger, (6)Sword, (7)Sword, (8)Sword, (9)Sword, (10)Horse, (11)Horse, (12)Horse", "Player 1 had the correct hand");
        await verifyMessage(messageBoard, "(1)F15, (2)F25, (3)F30, (4)F40, (5)Sword, (6)Sword, (7)Sword, (8)Horse, (9)Excalibur", "Player 2 had the correct hand");
        await verifyMessage(messageBoard, "(1)F10, (2)F25, (3)F30, (4)F40, (5)F50, (6)Sword, (7)Sword, (8)Horse, (9)Horse, (10)Lance", "Player 3 had the correct hand");
        await verifyMessage(messageBoard, "(1)F25, (2)F25, (3)F30, (4)F50, (5)F70, (6)Dagger, (7)Dagger, (8)Sword, (9)Sword, (10)Battle-Axe, (11)Lance", "Player 4 had the correct hand");
        

    } catch (error) {
        console.error("Test encountered an error:", error);
    } finally {
        //await driver.quit();
        await driver.sleep(6000000);
    }
}

async function runTest4() {
    let driver = await new Builder().forBrowser('chrome').build();
    let currentMessage = "";

    try {
        await driver.get("http://192.168.56.1:8081");
        // Start the game
        let startButton = await driver.findElement(By.id("test4"));
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

        
        await keepClicking(driver);
        
        // Player 1 sponsors
        await submitText(textField, submitButton, driver, "1");
        await keepClicking(driver);
        
        // Building
        let inputArray = ["1", "2", "3", "4", "5", "6", "quit", "1", "1", "1", "1", "1", "1", "quit"]
        await submitTextBulk(textField, submitButton, driver, enterButton, inputArray)
        await keepClicking(driver);
        console.log("Player 1 builds the quest");
        
        // Accept the attack
        await submitText(textField, submitButton, driver, "1");
        await keepClicking(driver);
        await submitText(textField, submitButton, driver, "1");
        await keepClicking(driver);
        await submitText(textField, submitButton, driver, "1");
        await keepClicking(driver);
        console.log("Players have accepted the attack (Stage 1)");

        // Every player has one too many cards.
        await submitText(textField, submitButton, driver, "1");
        await keepClicking(driver);
        await submitText(textField, submitButton, driver, "4");
        await keepClicking(driver);
        await submitText(textField, submitButton, driver, "3");
        await keepClicking(driver);
        console.log("Attackers have trimmed their hand");

        // Stage 1
        console.log("Stage 1 Attack");
        
        // Player 2 Attack
        inputArray = ["12", "quit"];
        await submitTextBulk(textField, submitButton, driver, enterButton, inputArray);
        await keepClicking(driver);

        // Player 3 Attack
        inputArray = ["quit"];
        await submitTextBulk(textField, submitButton, driver, enterButton, inputArray);
        await keepClicking(driver);
        
        // Player 4 Attack
        inputArray = ["quit"];
        await submitTextBulk(textField, submitButton, driver, enterButton, inputArray);
        await keepClicking(driver);

        // Trim Player 1
        inputArray = ["1", "1"];
        await submitTextBulk(textField, submitButton, driver, enterButton, inputArray);
        await keepClicking(driver);

        await showHand.click();
        await driver.sleep(sleepTimer);
        await verifyMessage(messageBoard, "There are no winners", "The quest ended without winners");

        await verifyMessage(messageBoard, "(1)F15, (2)Dagger, (3)Dagger, (4)Dagger, (5)Dagger, (6)Sword, (7)Sword, (8)Sword, (9)Horse, (10)Horse, (11)Horse, (12)Horse", "Player 1 had the correct hand");
        await verifyMessage(messageBoard, "(1)F5, (2)F5, (3)F10, (4)F15, (5)F15, (6)F20, (7)F20, (8)F25, (9)F30, (10)F30, (11)F40", "Player 2 had the correct hand");
        await verifyMessage(messageBoard, "(1)F5, (2)F5, (3)F10, (4)F15, (5)F15, (6)F20, (7)F20, (8)F25, (9)F25, (10)F30, (11)F40, (12)Lance", "Player 3 had the correct hand");
        await verifyMessage(messageBoard, "(1)F5, (2)F5, (3)F10, (4)F15, (5)F15, (6)F20, (7)F20, (8)F25, (9)F25, (10)F30, (11)F50, (12)Excalibur", "Player 4 had the correct hand");
        

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
    await driver.sleep(sleepTimer);
    await submitButton.click();
    await driver.sleep(sleepTimer);
}

async function submitTextBulk(textField, submitButton, driver, enterButton, inputArray) {
    for(let i = 0; i < inputArray.length; i++){
        await textField.clear();
        await textField.sendKeys(inputArray[i]);
        await driver.sleep(sleepTimer);
        await submitButton.click();
        await keepClicking(driver);
    }
}

//runTest1();
//runTest2();
//runTest3();
runTest4();