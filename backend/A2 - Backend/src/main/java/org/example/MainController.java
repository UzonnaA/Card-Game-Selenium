package org.example;

import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
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
        game.usingJS = true;
        game.InitializeDeck();
        game.StartGame();
        
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

    @PostMapping("/signal")
    public void signalJsInput() {
        //game.signalJsInputReceived();
    }


    private void resetGame() {
        game = new Main();
    }

    

    @GetMapping("/console")
    public String getConsoleOutput() {
        return game.getConsoleOutput();
    }

    @PostMapping("/increment")
    public void incrementConsoleIndex() {
        game.incrementArrayIndex();
    }
}