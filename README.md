# Card Game Automation Platform

A full-stack Spring Boot and JavaScript application simulating a turn-based card game, complete with a browser interface and Selenium-based test automation. Built to show multithreading, frontend-backend integration, and test automation skills.

---

## 📌 Features

### 🎮 Game Functionality
- Simulates a multiplayer, turn-based card game with dynamic game logic.
- Supports interactive gameplay through a web UI.
- Players can draw, play, and manage hands in real time.

### 🧪 Automated Testing (Selenium)
- Custom Selenium test suite simulates user interactions with the browser.
- Tests cover multiple game states including:
  - Game initialization
  - Player decision points
  - Card draws and event handling
  - Win conditions

### 🌐 Backend
- Built with **Spring Boot** using RESTful APIs.
- Game logic runs on a background thread for real-time interaction.
- Endpoints include:
  - `GET /start`, `/start1`, `/start2`, etc. for test variants
  - `POST /input` for sending player input
  - `GET /players`, `/console` for polling game state
  - `POST /increment`, `/decrement`, `/hands` for advanced navigation

### 💻 Frontend
- Built with vanilla **JavaScript**, **HTML**, and **CSS**.
- Uses `fetch` API for real-time communication with the backend.
- Updates UI elements based on player stats and console output.

---

## 🛠️ Technologies Used

| Category         | Tech Stack                          |
|------------------|--------------------------------------|
| Language         | Java 17, JavaScript                  |
| Backend          | Spring Boot, REST APIs               |
| Frontend         | HTML, CSS, JavaScript (vanilla)      |
| Automation       | Selenium WebDriver                   |
| Build Tool       | Maven                                |
| Testing          | JUnit (for unit tests), Selenium, Cucumber     |
| Server Hosting   | `http-server` via Node.js for static assets |
| Networking       | CORS configured for cross-origin testing |

---

## 🚀 How to Run

### 🔧 Prerequisites
- Java 17
- Node.js + npm
- Chrome + Chromedriver (for Selenium)

### 📦 Backend (Spring Boot)
```bash
cd backend/A2\ -\ Backend
mvn spring-boot:run
```

### 📦 Frontend (HTTP Server)
```bash
cd ..\..\frontend
npx http-server
```
You will see available IPs, choose any of them.
Go into test.js and change the "link" variable to a chosen IP

### 📦 Frontend (Selenium)
```bash
node test.js
```
