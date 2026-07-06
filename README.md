# MCAT Elite 515+ Preparatory Coach

An ultra-modern, interactive Single Page Web Application (SPA) designed to guide prospective medical students to achieve a score of **515+** on the Medical College Admission Test (MCAT). 

The app includes an adaptive weekly study planner, a subject-specific practice quiz client, a high-yield formula reference sheet, and a real-time **Gemini AI Study Coach** for conceptual tutoring.

---

## 🚀 Getting Started

### Prerequisites
* **Python 3.12+**
* **Flask** & **Requests** libraries (installed in the `.venv` virtual environment)

### Running the App Locally
1. Navigate to the project directory:
   ```powershell
   cd C:\Users\garfe\agy-cli-projects\mcat-coach
   ```
2. Start the Flask server using the virtual environment:
   ```powershell
   ..\.venv\Scripts\python.exe app.py
   ```
3. Open your browser and go to:
   👉 **[http://127.0.0.1:5050](http://127.0.0.1:5050)**

---

## 📂 File Architecture

The project is structured as follows:

```text
mcat-coach/
├── app.py                     # Flask server entry point & Gemini API proxy
├── templates/
│   └── index.html             # HTML layout framework (Dashboard, Quiz, Planner, Chat)
├── static/
│   ├── css/
│   │   └── style.css          # Theme tokens, custom glassmorphism styling, & animations
│   └── js/
│       ├── app.js             # Client controller, state tracker, and markdown parser
│       └── questions.js       # Local high-yield practice questions database
└── .gitignore                 # Excludes local environments, logs, and cache folders
```

---

## 🛠️ Feature Breakdown

### 1. Active Recall Dashboard & Score Estimator
* **Real-time Metrics**: Tracks daily study streak days, total hours logged, and completed practice questions.
* **Scaled Score Estimator**: An algorithm that maps the student's starting diagnostic score and practice question accuracy ratio to a scaled MCAT composite score (472–528 range).
* **SVG Progress Gauge**: Displays a circular progress indicator detailing distance from the 515+ threshold.
* **Category Progress**: Scaled breakdown of the 4 core MCAT sections:
  * Chemical and Physical Foundations of Biological Systems (C/P)
  * Critical Analysis and Reasoning Skills (CARS)
  * Biological and Biochemical Foundations of Living Systems (B/B)
  * Psychological, Social, and Biological Foundations of Behavior (P/S)

### 2. Interactive Practice Exercises
* **Six High-Yield Categories**: Physics, Biochemistry, General Chemistry, Organic Chemistry, Biology, and Psychiatry (Behavioral Sciences).
* **Detailed Explanations**: Immediate feedback upon answer selection, including why the correct option is right and breakdowns of common logical traps for incorrect options.
* **Incremental Scoring**: Saves performance metrics locally to influence the scaled dashboard score.

### 3. Adaptive Study Planner
* **Input Parameters**: Tailors schedule length, weekly workload, and early syllabus topics based on the student's exam date, daily hour capacity, starting score, and weakest subject.
* **Checkable Syllabus**: Week-by-week checkbox syllabus.
* **Hour Tracker Integration**: Checking off study tasks automatically increases total study hours on the main dashboard.

### 4. Gemini AI Study Coach
* **Real-time Tutoring**: Direct integration with the `gemini-2.5-flash` model via Google AI Studio's beta REST API.
* **Custom Persona**: Guided by a system instruction to behave as an encouraging, expert MCAT tutor (structuring responses with clear markdown, step-by-step math, and mnemonics).
* **Bounded Conversation Memory**: Passes previous messages to the backend to maintain dialog context.

### 5. High-Yield Resource Hub
* **Formula Cheat Sheets**: Quick references for Michaelis-Menten, Henderson-Hasselbalch, thin lens, Bernoulli, and Ohm's law equations.
* **Timing & Strategy Tips**: Essential guidelines for CARS timing and avoiding absolute-qualifier traps.

---

## 💾 State & Persistence

All client-side progress is saved using `localStorage`. This includes:
* Study hours and day streak
* Answered question status (preventing double scoring)
* Section correct/incorrect metrics
* Complete week-by-week scheduler task states

Progress is retained across browser refreshes and browser sessions.

---

## 🔒 Security & API Integration

The application communicates with Gemini using an API Key. For this local deployment:
* The Flask backend in `app.py` acts as a secure reverse-proxy. It intercepts message requests from `app.js`, appends system instructions, inserts the credentials header, and makes requests to `generativelanguage.googleapis.com`.
* This keeps credentials stored on the server side rather than exposing them directly to the client browser source code.
