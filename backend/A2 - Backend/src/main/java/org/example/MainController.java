package org.example;

import java.io.PrintWriter;
import java.io.StringWriter;
//import java.io.PrintWriter;
import java.util.*;

import org.example.Main.Player;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "http://192.168.56.1:8081") 
public class MainController {

    Main game = new Main();
    private String latestMessage = "";
    

    public MainController() {
        resetGame();
    }

    @GetMapping("/start")
    public String startGame() {
        resetGame();
        game.usingJS = true; // Indicate that the game is running in a browser environment
        System.out.println("Start button hit");

        // Run the game logic on a separate thread
        new Thread(() -> {
            game.InitializeDeck();
            game.StartGame();

            Scanner input = new Scanner(System.in);
            PrintWriter output = new PrintWriter(System.out, true);
            while (!game.finished) {
                game.areYouReady(input, output, game.getCurrentPlayer());
                game.ShowHand(input, output, game.getCurrentPlayer().getName(), true);
                game.DrawPlayEvents(input, output, null);
                game.checkForWinners(input, output);
                if(game.finished){
                    break;
                }
            }
        }).start();

        // // Wait for initialization
        // synchronized (game) {
        //     while (game.players == null || game.players.isEmpty()) {
        //         try {
        //             Thread.sleep(100); // Small delay to allow players to initialize
        //         } catch (InterruptedException e) {
        //             Thread.currentThread().interrupt();
        //         }
        //     }
        // }

        // Immediately return a response to the frontend
        latestMessage = "";
        return latestMessage;
    }

    @GetMapping("/message")
    public String getLatestMessage() {
        return latestMessage;
    }

    @PostMapping("/input")
    public String handleInput(@RequestParam String input) {
        System.out.println("Input received from frontend: " + input);
        game.sendInput(input);
        latestMessage = game.getOutput();
        return latestMessage;
    }

    @GetMapping("/players")
    public List<Map<String, Object>> getPlayers() {
        List<Map<String, Object>> players = new ArrayList<>();
        for (Player player : game.players.values()) {
            Map<String, Object> playerData = new HashMap<>();
            playerData.put("name", player.getName());
            playerData.put("shields", player.getShields());
            playerData.put("cards", player.getDeck().size());
            players.add(playerData);
        }
        return players;
    }

    // @PostMapping("/signal")
    // public void signalJsInput() {
    //     //game.signalJsInputReceived();
    // }


    private void resetGame() {
        game = new Main();
    }

    

    @GetMapping("/console")
    public String getConsoleOutput() {
        return game.getConsoleOutput();
    }

    @PostMapping("/hands")
    public void getHands() {
        game.displayAllHands();
    }

    @PostMapping("/increment")
    public void incrementConsoleIndex() {
        game.incrementArrayIndex();
    }

    @PostMapping("/decrement")
    public void decrementConsoleIndex() {
        game.decrementArrayIndex();
    }

    // Everything here is for the tests
    // Remember that that tests 2-4 need to be redone

    @GetMapping("/start1")
    public String startGame1() {
        resetGame();
        game.ATEST = true;
        System.out.println("Start button hit");

        // Run the game logic on a separate thread
        new Thread(() -> {
            game.InitializeDeck();
            game.StartGame();

            StringWriter output = new StringWriter();
            String input = "\n";

            // Normal game loop, but no looping is needed for the test
            game.areYouReady(new Scanner(input), new PrintWriter(output), game.getCurrentPlayer());
            game.ShowHand(new Scanner(input), new PrintWriter(output), game.getCurrentPlayer().getName(), true);
            game.DrawPlayEvents(new Scanner(input), new PrintWriter(output), "Q4"); //Needs to be a Q4 event
            game.checkForWinners(new Scanner(input), new PrintWriter(output));
        }).start();

        // Immediately return a response to the frontend
        latestMessage = "";
        return latestMessage;
    }
}
