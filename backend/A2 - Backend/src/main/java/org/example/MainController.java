package org.example;

import java.io.PrintWriter;
import java.io.StringWriter;
import java.util.*;

import org.example.Main.Player;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
// @CrossOrigin(origins = "http://192.168.56.1:8081")
@CrossOrigin(origins = "*")
public class MainController {

    Main game = new Main();
    private String latestMessage = "";

    public MainController() {
        resetGame();
    }

    @GetMapping("/start")
    public String startGame() {
        resetGame();
        game.usingJS = true; //
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
                if (game.finished) {
                    break;
                }
            }
        }).start();

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

        if (game == null) {
            System.err.println("Error: game is null");
            return players;
        }

        if (game.players == null || game.players.isEmpty()) {
            System.err.println("Error: game.players is null or empty");
            return players;
        }

        for (Player player : game.players.values()) {
            if (player == null)
                continue; // Just in case
            Map<String, Object> playerData = new HashMap<>();
            playerData.put("name", player.getName());
            playerData.put("shields", player.getShields());
            playerData.put("cards", player.getDeck() != null ? player.getDeck().size() : 0);
            players.add(playerData);
        }

        return players;
    }

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
        System.out.println("Test 1 now running");

        // Run the game logic on a separate thread
        new Thread(() -> {
            game.usingJS = true;
            game.Test1_JS = true;
            game.InitializeDeck();
            game.StartGame();

            Scanner input = new Scanner(System.in);
            PrintWriter output = new PrintWriter(System.out, true);

            game.areYouReady(input, output, game.getCurrentPlayer());
            game.ShowHand(input, output, game.getCurrentPlayer().getName(), true);
            game.DrawPlayEvents(input, output, "Q4");
            game.checkForWinners(input, output);

        }).start();

        latestMessage = "";
        return latestMessage;
    }

    @GetMapping("/start2")
    public String startGame2() {
        resetGame();
        System.out.println("Test 2 now running");

        // Run the game logic on a separate thread
        new Thread(() -> {
            game.usingJS = true;
            game.Test2_JS = true;
            game.InitializeDeck();
            game.StartGame();

            Scanner input = new Scanner(System.in);
            PrintWriter output = new PrintWriter(System.out, true);

            game.areYouReady(input, output, game.getCurrentPlayer());
            game.ShowHand(input, output, game.getCurrentPlayer().getName(), true);
            game.DrawPlayEvents(input, output, "Q4");
            game.checkForWinners(input, output);

            game.areYouReady(input, output, game.getCurrentPlayer());
            game.ShowHand(input, output, game.getCurrentPlayer().getName(), true);
            game.DrawPlayEvents(input, output, "Q4");
            game.checkForWinners(input, output);

        }).start();

        latestMessage = "";
        return latestMessage;
    }

    @GetMapping("/start3")
    public String startGame3() {
        resetGame();
        System.out.println("Test 3 now running");

        // Run the game logic on a separate thread
        new Thread(() -> {
            game.usingJS = true;
            game.Test3_JS = true;
            game.InitializeDeck();
            game.StartGame();

            Scanner input = new Scanner(System.in);
            PrintWriter output = new PrintWriter(System.out, true);

            for (int i = 0; i < 5; i++) {
                game.areYouReady(input, output, game.getCurrentPlayer());
                game.ShowHand(input, output, game.getCurrentPlayer().getName(), true);
                game.DrawPlayEvents(input, output, "Q4");
                game.checkForWinners(input, output);
            }
        }).start();

        latestMessage = "";
        return latestMessage;
    }

    @GetMapping("/start4")
    public String startGame4() {
        resetGame();
        System.out.println("Test 4 now running");

        // Run the game logic on a separate thread
        new Thread(() -> {
            game.usingJS = true;
            game.Test4_JS = true;
            game.InitializeDeck();
            game.StartGame();

            Scanner input = new Scanner(System.in);
            PrintWriter output = new PrintWriter(System.out, true);

            game.areYouReady(input, output, game.getCurrentPlayer());
            game.ShowHand(input, output, game.getCurrentPlayer().getName(), true);
            game.DrawPlayEvents(input, output, "Q2");
            game.checkForWinners(input, output);

        }).start();

        latestMessage = "";
        return latestMessage;
    }
}
