# Card Game with Selenium Automated Testing

A small project I built to practice backend-frontend integration, multithreading, and browser automation. It’s a turn-based multiplayer card game that you can play in the browser or test using a Selenium suite that mimics real user behavior.

The goal was to go end-to-end with a game that runs entirely locally, with a Java Spring Boot backend, a basic JavaScript UI, and full test coverage that simulates interaction from startup to win conditions.

---

## What It Does

### Game Logic and UI

- Runs a simple multiplayer card game where players take turns drawing, playing, and managing cards.
- Frontend is kept minimal, just enough to display player stats and messages clearly.
- Backend handles all the core logic, using threads to manage game flow independently from requests.

### Automated Testing with Selenium

- Includes a Selenium test suite that plays through the game by simulating actual user inputs.
- Covers everything from game startup to checking for win conditions and verifying state updates.
- Helps show how automation can be used for UI flow validation, not just backend testing.

### Backend (Spring Boot)

- Built with Java 17 using Spring Boot to expose REST endpoints.
- Game logic runs in a separate thread so the API can remain responsive while the game plays out.
- Key endpoints include:
  - `/start`, `/start1` to launch different game scenarios
  - `/input` to send player moves
  - `/players`, `/console` to check game state
  - `/increment`, `/decrement`, `/hands` to review and modify output

### Frontend (JavaScript)

- Uses fetch calls to interact with the backend and pull updates.
- Keeps the UI in sync with the backend state during play.
- Written in plain JavaScript to focus on understanding the logic, not the framework.

---

## Tech Stack

| Area            | Stack                                     |
|-----------------|--------------------------------------------|
| Language         | Java 17, JavaScript                        |
| Backend          | Spring Boot, REST APIs                     |
| Frontend         | HTML, CSS, JavaScript                      |
| Testing          | Selenium WebDriver, JUnit, Cucumber        |
| Build Tool       | Maven                                      |
| Static Hosting   | `http-server` for frontend (Node.js)       |
| Other            | CORS config to allow frontend-backend flow |

---

## Why I Built This

I wanted a fun way to practice full-stack development and show how Selenium can go beyond login forms or button clicks. Building a card game meant I had to deal with real-time state, multi-user interaction, and clear feedback for the UI. Writing the automation afterward gave me a chance to think like a tester and see how I’d validate the game’s behavior end to end.

---

## Things I’d Improve

- The frontend could be rewritten in a framework like React for better scalability.
- The test suite could be expanded to include edge cases like invalid inputs or concurrency issues.
- Eventually I’d like to deploy the whole thing and allow live matches between two users.

## Getting Started

### 🔧 Requirements
- Java 17
- Node.js + npm
- Google Chrome + Chromedriver (for running Selenium tests)


### Start Backend (Spring Boot)
```bash
cd backend/A2\ -\ Backend
mvn spring-boot:run
```

### Start Frontend (Static HTTP Server)
```bash
cd ..\..\frontend
npx http-server
```
You will see a list of available IPs (like http://127.0.0.1:8081, http://192.168.1.x:8081)  
⚠️ Make note of the IP that you will use for testing.  
Update the link variable in test.js to match the selected IP from the previous step.

### Selenium Test Runner
```bash
node test.js
```
