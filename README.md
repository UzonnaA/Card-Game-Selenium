# Card Game with Selenium Automated Testing

This project is a full-stack card game simulator built with **Spring Boot** and **vanilla JavaScript**. It’s designed to show backend/frontend integration, multithreading, and browser automation with **Selenium**.

You can play the game locally in the browser, or run automated tests that simulate real user interactions from start to finish.

---

## 📌 What It Does

### 🎮 Game Logic & Interface
- Simulates a turn-based multiplayer card game, complete with drawing, playing, and managing cards.
- The game runs interactively in the browser, letting players take turns and update stats in real time.
- The backend handles all the logic and game flow 
- The frontend presents it cleanly using just HTML/CSS/JavaScript.

### 🧪 Automated Testing with Selenium
- The app includes a custom **Selenium test suite** that mimics how a real user would play.
- Tests cover the full game cycle—from initialization and card events to player decisions and win conditions.
- Great for showing end-to-end automation and UI validation.

### 🌐 Backend (Spring Boot)
- Built with **Java 17** and **Spring Boot**, exposing REST endpoints for each game action.
- The game runs on a separate thread in the background to support live updates.
- Endpoints include:
  - `GET /start`, `/start1`, etc. — start different game/test modes
  - `POST /input` — send player commands
  - `GET /players`, `/console` — track game state
  - `POST /increment`, `/decrement`, `/hands` — navigate output/history

### 💻 Frontend (JS/HTML/CSS)
- Uses **vanilla JS** and the **fetch** API to stay in sync with the backend.
- Dynamically updates the UI to show player stats and game messages as the game progresses.

---

## 🛠️ Tech Stack

| Area            | Tools & Technologies                        |
|-----------------|---------------------------------------------|
| Language         | Java 17, JavaScript                         |
| Backend          | Spring Boot, REST APIs                      |
| Frontend         | HTML, CSS, Vanilla JavaScript               |
| Testing & QA     | Selenium WebDriver, JUnit, Cucumber         |
| Build Tool       | Maven                                       |
| Static Hosting   | `http-server` (via Node.js) for frontend    |
| Network Config   | CORS support for frontend-backend separation |

---

## 🚀 Getting Started

### 🔧 Requirements
- Java 17
- Node.js + npm
- Google Chrome + Chromedriver (for running Selenium tests)


### 📦 Start Backend (Spring Boot)
```bash
cd backend/A2\ -\ Backend
mvn spring-boot:run
```

### 📦 Start Frontend (Static HTTP Server)
```bash
cd ..\..\frontend
npx http-server
```
You will see a list of available IPs (e.g., http://127.0.0.1:8081, http://192.168.1.x:8081, etc.)
⚠️ Make note of the IP that you will use for testing.
Update the link variable in test.js to match the selected IP from the previous step.

### 📦 Selenium Test Runner
```bash
node test.js
```
