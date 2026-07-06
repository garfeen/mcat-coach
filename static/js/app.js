// MCAT Preparatory Coach App - Main Application Logic

// Initial State
let state = {
    studyHours: 0,
    streak: 1,
    completedTasks: [],
    answeredQuestions: {}, // questionId -> true (correct) / false (incorrect)
    subjectPerformance: {
        physics: { total: 0, correct: 0 },
        biochemistry: { total: 0, correct: 0 },
        chemistry: { total: 0, correct: 0 },
        organic_chemistry: { total: 0, correct: 0 },
        biology: { total: 0, correct: 0 },
        psychiatry: { total: 0, correct: 0 }
    },
    targetExamDate: '',
    dailyCapacity: 4,
    weakSubject: 'physics',
    startingScore: 500,
    scheduleGenerated: false,
    scheduleTasks: [] // Array of tasks generated
};

// Quiz variables
let quizState = {
    activeSubject: null,
    currentQuestionIndex: 0,
    selectedOptionIndex: null,
    score: 0,
    questions: []
};

// Chat Assistant variables
let chatHistory = [];
let chatInitialized = false;

// DOM Elements
const sections = document.querySelectorAll('.app-section');
const navItems = document.querySelectorAll('.nav-item');
const backToSubjectsBtn = document.getElementById('back-to-subjects');
const quizArea = document.getElementById('quiz-area');
const subjectGrid = document.getElementById('subject-grid');
const quizQuestionTag = document.getElementById('quiz-question-tag');
const quizQuestionText = document.getElementById('quiz-question-text');
const quizOptionsList = document.getElementById('quiz-options-list');
const explanationPanel = document.getElementById('explanation-panel');
const explanationBody = document.getElementById('explanation-body');
const nextQuestionBtn = document.getElementById('next-question-btn');
const resultsCard = document.getElementById('results-card');

// Load Data from Local Storage on Startup
function loadState() {
    const saved = localStorage.getItem('mcat_coach_state');
    if (saved) {
        try {
            state = { ...state, ...JSON.parse(saved) };
        } catch (e) {
            console.error("Error parsing saved state:", e);
        }
    }
}

// Save Data to Local Storage
function saveState() {
    localStorage.setItem('mcat_coach_state', JSON.stringify(state));
}

// Navigation Handling
function initNavigation() {
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            const targetSection = item.getAttribute('data-section');
            switchSection(targetSection);
            
            navItems.forEach(nav => nav.classList.remove('active'));
            item.classList.add('active');
        });
    });
}

function switchSection(sectionId) {
    sections.forEach(sec => {
        sec.classList.remove('active');
        if (sec.id === sectionId) {
            sec.classList.add('active');
        }
    });

    if (sectionId === 'dashboard') {
        renderDashboard();
    } else if (sectionId === 'exercises') {
        resetQuizView();
    } else if (sectionId === 'scheduler') {
        renderScheduler();
    } else if (sectionId === 'resources') {
        initResourceHub();
    } else if (sectionId === 'chat-assistant') {
        initChatAssistant();
    }
}

// --- DASHBOARD FUNCTIONS ---
function renderDashboard() {
    // 1. Update Core Stats
    document.getElementById('dash-streak').textContent = `${state.streak} Days`;
    document.getElementById('dash-hours').textContent = `${state.studyHours}h`;
    
    // Calculate total questions answered
    let totalQuestions = 0;
    let correctQuestions = 0;
    Object.keys(state.subjectPerformance).forEach(sub => {
        totalQuestions += state.subjectPerformance[sub].total;
        correctQuestions += state.subjectPerformance[sub].correct;
    });
    
    document.getElementById('dash-questions').textContent = `${correctQuestions}/${totalQuestions}`;

    // 2. Estimate Score
    const estimatedScore = calculateEstimatedScore();
    document.getElementById('dash-score-num').textContent = estimatedScore;
    
    // Update Badge text in sidebar
    document.querySelector('.badge-score').textContent = estimatedScore;
    const badgeCaption = document.querySelector('.badge-caption');
    if (estimatedScore >= 515) {
        badgeCaption.textContent = "Test Ready (515+ Target)";
        badgeCaption.style.color = "var(--accent-emerald)";
    } else if (estimatedScore >= 508) {
        badgeCaption.textContent = "Competitive (508-514)";
        badgeCaption.style.color = "var(--accent-cyan)";
    } else {
        badgeCaption.textContent = "Study Mode (<508)";
        badgeCaption.style.color = "var(--accent-violet)";
    }

    // 3. Update Gauge Stroke
    updateScoreGauge(estimatedScore);

    // 4. Update Section Progress Bars
    renderSectionProgressBars();
}

function calculateEstimatedScore() {
    let total = 0;
    let correct = 0;
    Object.keys(state.subjectPerformance).forEach(sub => {
        total += state.subjectPerformance[sub].total;
        correct += state.subjectPerformance[sub].correct;
    });

    const starting = parseInt(state.startingScore) || 500;
    if (total === 0) return starting;

    const ratio = correct / total;
    // Map accuracy ratio (0 to 1) to a delta of -15 to +28 relative to starting score
    // Max MCAT score is 528, Min is 472
    let delta = 0;
    if (ratio >= 0.9) {
        delta = Math.round(15 + (ratio - 0.9) * 130); // huge boost for near perfect
    } else if (ratio >= 0.5) {
        delta = Math.round((ratio - 0.5) * 37.5); // accuracy above 50% increases score
    } else {
        delta = Math.round((ratio - 0.5) * 56); // accuracy below 50% decreases score
    }
    
    let score = starting + delta;
    return Math.max(472, Math.min(528, score));
}

function updateScoreGauge(score) {
    const gaugeFill = document.getElementById('dash-gauge-fill');
    // Scale is 472 to 528 (range of 56 points)
    const minScore = 472;
    const maxScore = 528;
    const percentage = Math.max(0, Math.min(100, ((score - minScore) / (maxScore - minScore)) * 100));
    
    // Circle circumference is 2 * PI * r (r=70) ≈ 439.82
    const circumference = 439.82;
    const offset = circumference - (percentage / 100) * circumference;
    
    gaugeFill.style.strokeDashoffset = offset;
}

function renderSectionProgressBars() {
    const calculateSubAvg = (subs) => {
        let total = 0;
        let correct = 0;
        subs.forEach(s => {
            total += state.subjectPerformance[s].total;
            correct += state.subjectPerformance[s].correct;
        });
        return total === 0 ? 0 : Math.round((correct / total) * 100);
    };

    const cpVal = calculateSubAvg(['chemistry', 'physics']);
    const bbVal = calculateSubAvg(['biology', 'biochemistry', 'organic_chemistry']);
    const psVal = calculateSubAvg(['psychiatry']);
    
    // Mock CARS based on completed tasks & overall average
    let carsVal = 0;
    const completedTasksCount = state.completedTasks.length;
    if (completedTasksCount > 0) {
        carsVal = Math.min(100, Math.round(50 + (completedTasksCount / 20) * 50));
    } else {
        carsVal = 50;
    }

    // Set text and width
    document.getElementById('cp-score').textContent = `${118 + Math.round(cpVal * 0.14)} / 132 (${cpVal}%)`;
    document.getElementById('cp-fill').style.width = `${cpVal}%`;

    document.getElementById('cars-score').textContent = `${118 + Math.round(carsVal * 0.14)} / 132 (${carsVal}%)`;
    document.getElementById('cars-fill').style.width = `${carsVal}%`;

    document.getElementById('bb-score').textContent = `${118 + Math.round(bbVal * 0.14)} / 132 (${bbVal}%)`;
    document.getElementById('bb-fill').style.width = `${bbVal}%`;

    document.getElementById('ps-score').textContent = `${118 + Math.round(psVal * 0.14)} / 132 (${psVal}%)`;
    document.getElementById('ps-fill').style.width = `${psVal}%`;
}


// --- EXERCISES & QUIZ FUNCTIONS ---
function resetQuizView() {
    quizArea.style.display = 'none';
    resultsCard.style.display = 'none';
    subjectGrid.style.display = 'grid';
    
    // Update subject card subtitles with stats
    Object.keys(state.subjectPerformance).forEach(sub => {
        const perf = state.subjectPerformance[sub];
        const cardText = document.getElementById(`card-desc-${sub}`);
        if (cardText) {
            if (perf.total > 0) {
                const pct = Math.round((perf.correct / perf.total) * 100);
                cardText.textContent = `Completed: ${perf.total} | Accuracy: ${pct}%`;
            } else {
                cardText.textContent = "No exercises completed yet.";
            }
        }
    });
}

function startQuiz(subjectKey) {
    const qList = MCAT_QUESTIONS[subjectKey];
    if (!qList || qList.length === 0) {
        alert("No questions available for this subject.");
        return;
    }
    
    quizState.activeSubject = subjectKey;
    quizState.currentQuestionIndex = 0;
    quizState.selectedOptionIndex = null;
    quizState.score = 0;
    quizState.questions = qList;

    subjectGrid.style.display = 'none';
    quizArea.style.display = 'block';
    resultsCard.style.display = 'none';

    renderQuizQuestion();
}

function renderQuizQuestion() {
    const q = quizState.questions[quizState.currentQuestionIndex];
    quizQuestionTag.textContent = `${quizState.activeSubject.replace('_', ' ')} — Question ${quizState.currentQuestionIndex + 1} of ${quizState.questions.length}`;
    quizQuestionText.textContent = q.question;
    
    quizOptionsList.innerHTML = '';
    explanationPanel.style.display = 'none';
    nextQuestionBtn.disabled = true;
    quizState.selectedOptionIndex = null;

    q.options.forEach((opt, idx) => {
        const letter = String.fromCharCode(65 + idx); // A, B, C, D
        const btn = document.createElement('button');
        btn.className = 'option-button';
        btn.innerHTML = `
            <span class="option-letter">${letter}</span>
            <span class="option-text">${opt}</span>
        `;
        btn.addEventListener('click', () => handleOptionClick(idx));
        quizOptionsList.appendChild(btn);
    });
    
    document.getElementById('quiz-progress-text').textContent = `Progress: ${quizState.currentQuestionIndex + 1}/${quizState.questions.length}`;
}

function handleOptionClick(optionIdx) {
    if (quizState.selectedOptionIndex !== null) return; // Prevent multiple clicks
    
    quizState.selectedOptionIndex = optionIdx;
    const q = quizState.questions[quizState.currentQuestionIndex];
    const isCorrect = optionIdx === q.correctIndex;
    
    // Disable all options and show colors
    const optionButtons = quizOptionsList.querySelectorAll('.option-button');
    optionButtons.forEach((btn, idx) => {
        btn.disabled = true;
        if (idx === q.correctIndex) {
            btn.classList.add('correct');
        } else if (idx === optionIdx) {
            btn.classList.add('incorrect');
        }
    });

    if (isCorrect) {
        quizState.score++;
    }

    // Update global state
    const questionKey = `${quizState.activeSubject}_${q.id}`;
    if (!(questionKey in state.answeredQuestions)) {
        state.answeredQuestions[questionKey] = isCorrect;
        state.subjectPerformance[quizState.activeSubject].total++;
        if (isCorrect) {
            state.subjectPerformance[quizState.activeSubject].correct++;
        }
        // Save to storage
        saveState();
    }

    // Render Explanation
    renderExplanation(q, isCorrect, optionIdx);
    
    nextQuestionBtn.disabled = false;
    if (quizState.currentQuestionIndex === quizState.questions.length - 1) {
        nextQuestionBtn.querySelector('span').textContent = 'Finish Quiz';
    } else {
        nextQuestionBtn.querySelector('span').textContent = 'Next Question';
    }
}

function renderExplanation(q, isCorrect, chosenIdx) {
    explanationPanel.style.display = 'block';
    
    const headerTitle = isCorrect ? 'Correct! High-Yield Breakdown' : 'Incorrect. Let\'s Review the Concepts';
    const headerColor = isCorrect ? 'var(--accent-emerald)' : 'var(--accent-rose)';
    const headerIcon = isCorrect ? 
        `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>` :
        `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>`;

    // Build incorrect options list
    let incorrectListHtml = '';
    q.explanation.incorrect.forEach((incEx, idx) => {
        let displayLetter = '';
        let optionCounter = 0;
        q.options.forEach((_, optIdx) => {
            if (optIdx !== q.correctIndex) {
                if (optionCounter === idx) {
                    displayLetter = String.fromCharCode(65 + optIdx);
                }
                optionCounter++;
            }
        });
        incorrectListHtml += `<li><strong>Option ${displayLetter}:</strong> ${incEx}</li>`;
    });

    explanationBody.innerHTML = `
        <div class="explanation-title" style="color: ${headerColor}">
            ${headerIcon}
            <span>${headerTitle}</span>
        </div>
        <p><strong>Key Takeaway:</strong> ${q.explanation.correct}</p>
        <h5>Why other choices are incorrect:</h5>
        <ul>
            ${incorrectListHtml}
        </ul>
    `;
}

nextQuestionBtn.addEventListener('click', () => {
    if (quizState.currentQuestionIndex < quizState.questions.length - 1) {
        quizState.currentQuestionIndex++;
        renderQuizQuestion();
    } else {
        showQuizResults();
    }
});

function showQuizResults() {
    quizArea.style.display = 'none';
    resultsCard.style.display = 'flex';
    
    const correctCount = quizState.score;
    const totalCount = quizState.questions.length;
    const pct = Math.round((correctCount / totalCount) * 100);
    
    document.getElementById('results-score-text').textContent = `${correctCount} / ${totalCount}`;
    document.getElementById('results-pct').textContent = `Accuracy: ${pct}%`;
    
    let feedback = '';
    if (pct === 100) {
        feedback = "Outstanding! Perfect score. You've mastered these high-yield topics!";
    } else if (pct >= 70) {
        feedback = "Great work! You have a solid grasp. Review the explanations for any missed questions to secure a 515+ score.";
    } else {
        feedback = "Good practice effort. MCAT questions are challenging. Focus on the core content guides in the Resource Hub, then try again!";
    }
    document.getElementById('results-feedback').textContent = feedback;
    
    state.studyHours += 1;
    saveState();
}

// Add event listeners for quiz subjects
document.getElementById('sub-phys').addEventListener('click', () => startQuiz('physics'));
document.getElementById('sub-biochem').addEventListener('click', () => startQuiz('biochemistry'));
document.getElementById('sub-chem').addEventListener('click', () => startQuiz('chemistry'));
document.getElementById('sub-orgchem').addEventListener('click', () => startQuiz('organic_chemistry'));
document.getElementById('sub-bio').addEventListener('click', () => startQuiz('biology'));
document.getElementById('sub-psych').addEventListener('click', () => startQuiz('psychiatry'));

backToSubjectsBtn.addEventListener('click', resetQuizView);
document.getElementById('results-close-btn').addEventListener('click', resetQuizView);


// --- STUDY SCHEDULER FUNCTIONS ---

function renderScheduler() {
    const emptyState = document.getElementById('scheduler-empty');
    const scheduleCard = document.getElementById('scheduler-output-card');
    
    if (!state.targetExamDate) {
        const threeMonthsOut = new Date();
        threeMonthsOut.setMonth(threeMonthsOut.getMonth() + 3);
        document.getElementById('target-date').value = threeMonthsOut.toISOString().split('T')[0];
    } else {
        document.getElementById('target-date').value = state.targetExamDate;
    }
    
    document.getElementById('daily-hours').value = state.dailyCapacity;
    document.getElementById('weak-subject').value = state.weakSubject;
    document.getElementById('starting-score').value = state.startingScore;

    if (state.scheduleGenerated && state.scheduleTasks.length > 0) {
        emptyState.style.display = 'none';
        scheduleCard.style.display = 'block';
        renderWeeklyCalendar();
    } else {
        emptyState.style.display = 'flex';
        scheduleCard.style.display = 'none';
    }
}

// Generate Custom Schedule
document.getElementById('generate-schedule-btn').addEventListener('click', () => {
    const targetDateVal = document.getElementById('target-date').value;
    const dailyHoursVal = parseInt(document.getElementById('daily-hours').value) || 4;
    const weakSubjectVal = document.getElementById('weak-subject').value;
    const startingScoreVal = parseInt(document.getElementById('starting-score').value) || 500;

    if (!targetDateVal) {
        alert("Please select a target exam date.");
        return;
    }

    const today = new Date();
    const examDate = new Date(targetDateVal);
    const timeDiff = examDate - today;
    const daysDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
    let weeksCount = Math.max(4, Math.min(24, Math.round(daysDiff / 7)));

    if (daysDiff <= 0) {
        alert("Target date must be in the future.");
        return;
    }

    state.targetExamDate = targetDateVal;
    state.dailyCapacity = dailyHoursVal;
    state.weakSubject = weakSubjectVal;
    state.startingScore = startingScoreVal;
    state.scheduleGenerated = true;

    state.scheduleTasks = generateAdaptiveTasks(weeksCount, weakSubjectVal, dailyHoursVal);
    state.completedTasks = []; 
    
    saveState();
    renderScheduler();
});

function generateAdaptiveTasks(weeksCount, weakSub, dailyHours) {
    const tasks = [];
    
    const baseSyllabus = [
        {
            week: 1,
            focus: "Diagnostic & Foundation",
            items: [
                "Complete full-length diagnostic exam & review",
                "Review Amino Acids (structures, 3-letter, 1-letter codes, charges)",
                "Study Kinematics & Translational Motion (Physics)",
                "CARS: Practice 2 passages daily (active highlighting focus)"
            ]
        },
        {
            week: 2,
            focus: "Thermodynamics & Chemistry Basics",
            items: [
                "Study Chemical Kinetics, Rates, & Equilibrium (Chemistry)",
                "Review Thermodynamics (Enthalpy, Entropy, Gibbs Free Energy)",
                "Biochem: Enzyme Kinetics (Michaelis-Menten & Lineweaver-Burk graphs)",
                "CARS: Main Idea & Author's Voice identification practice"
            ]
        },
        {
            week: 3,
            focus: "Macromolecules & Organic Structures",
            items: [
                "Study Carbohydrates & Lipid structures and linkages",
                "Review SN1, SN2, E1, E2 substitution/elimination mechanisms",
                "Physics: Fluids, Hydrostatics, & Venturi/Bernoulli effects",
                "Psych: Piaget's Stages of Cognitive Development & Learning theories"
            ]
        },
        {
            week: 4,
            focus: "Metabolic Pathways (Part 1)",
            items: [
                "Master Glycolysis, Gluconeogenesis, & Regulation (PFK-1 details)",
                "Review Acid-Base Chemistry & Henderson-Hasselbalch buffer calculations",
                "Organic Chem: Stereochemistry (R/S configurations, chirality, Meso compounds)",
                "CARS: Focus on 'Reasoning Beyond the Text' question types"
            ]
        },
        {
            week: 5,
            focus: "Metabolic Pathways (Part 2)",
            items: [
                "Master Krebs Cycle, Oxidative Phosphorylation & ATP accounting",
                "Physics: Electrostatics & Circuits (Ohm's Law, Resistor/Capacitor combinations)",
                "Biology: Cell biology organelles, Mitosis & Meiosis checkpoints",
                "Psych: Memory encoding, Storage, and Retrieval systems"
            ]
        },
        {
            week: 6,
            focus: "Genetics & Biological Systems",
            items: [
                "Study Pedigree charts & Mendelian genetics (X-linked traits)",
                "Review Central Dogma: DNA Replication, Transcription, & Translation",
                "Physics: Waves, Sound (Doppler Effect), & Optics (Lenses/Mirrors)",
                "CARS: Time-management drill (10 minutes per passage)"
            ]
        },
        {
            week: 7,
            focus: "Organ Systems (Part 1)",
            items: [
                "Study Action Potentials & Nervous system divisions (ANS/SNS)",
                "Review Endocrine System: Peptide vs. Steroid hormones & feedback loops",
                "Organic Chem: Spectroscopy (IR functional group peaks & NMR shifts)",
                "Complete Half-Length mock exam & thoroughly review mistakes"
            ]
        },
        {
            week: 8,
            focus: "Organ Systems (Part 2)",
            items: [
                "Study Cardiovascular & Renal physiology (filtration, countercurrent multiplier)",
                "Review Musculoskeletal system & Digestive physiology",
                "Chemistry: Electrochemistry (Galvanic vs. Electrolytic cells)",
                "Psych: Social Psychology, Attribution Errors, & Sociological Theories"
            ]
        },
        {
            week: 9,
            focus: "Advanced Review & Weak Areas",
            items: [
                "Review Laboratory Techniques (Gel electrophoresis, SDS-PAGE, Chromatography, PCR)",
                "Physics: Atomic and Nuclear Phenomena (half-life, photoelectric effect)",
                "Biochem: DNA technology and cloning",
                "CARS: Complete full CARS section (9 passages, 90 minutes)"
            ]
        },
        {
            week: 10,
            focus: "Full-Length Practice 1",
            items: [
                "Complete AAMC Full-Length Exam 1 under timed conditions",
                "Spend 2 full days reviewing every question (correct and incorrect)",
                "Review high-yield biochemistry pathway maps from memory",
                "Psych: Practice high-yield sociology definitions"
            ]
        },
        {
            week: 11,
            focus: "Full-Length Practice 2",
            items: [
                "Complete AAMC Full-Length Exam 2 under timed conditions",
                "Spend 2 full days reviewing exam errors and creating flashcards",
                "Physics: Formula quick-sheet review (equations memorize)",
                "Biology: High-yield endocrine hormone cheat sheet review"
            ]
        },
        {
            week: 12,
            focus: "Final Taper & Exam Prep",
            items: [
                "Complete AAMC Full-Length Exam 3 & review key gaps",
                "Light review of flashcards (Spaced Repetition)",
                "Rest & organize test day logistics (NO heavy studying 48 hours prior)",
                "Confirm target test venue details & breakfast plan"
            ]
        }
    ];

    const weakSubTaskLabel = {
        physics: "Practice 15 high-yield Physics formula applications",
        biochemistry: "Redraw and annotate the key regulatory steps of Glycolysis and Krebs from memory",
        chemistry: "Practice 10 Acid-Base titration and pH buffer calculations",
        organic_chemistry: "Complete 15 stereocenter and nucleophilic substitution mechanisms practice problems",
        biology: "Sketch out action potentials and renal nephron filtration steps",
        psychiatry: "Complete 20 active-recall cards on social psychology and Piaget/Erikson stages"
    };

    const weakTask = weakSubTaskLabel[weakSub] || "Review weak subjects";

    for (let w = 1; w <= weeksCount; w++) {
        const syllabusIdx = Math.min(baseSyllabus.length - 1, Math.floor(((w - 1) / (weeksCount - 1)) * (baseSyllabus.length - 1)));
        const baseWeek = baseSyllabus[syllabusIdx];
        
        const weekTasks = [...baseWeek.items];
        
        if (w <= 4) {
            weekTasks.splice(2, 0, `Weak Area Focus: ${weakTask}`);
        }

        if (dailyHours >= 6) {
            weekTasks.push("High Intensity: Complete 30 additional practice questions in your weakest subjects");
        }

        weekTasks.forEach((taskText, tIdx) => {
            tasks.push({
                id: `w${w}_t${tIdx}`,
                weekNum: w,
                weekFocus: baseWeek.focus,
                text: taskText,
                completed: false,
                hoursValue: Math.round(dailyHours * 1.5)
            });
        });
    }

    return tasks;
}

function renderWeeklyCalendar() {
    const calendarWeeks = document.getElementById('calendar-weeks');
    calendarWeeks.innerHTML = '';

    const weeksMap = {};
    state.scheduleTasks.forEach(task => {
        if (!weeksMap[task.weekNum]) {
            weeksMap[task.weekNum] = {
                focus: task.weekFocus,
                tasks: []
            };
        }
        weeksMap[task.weekNum].tasks.push(task);
    });

    Object.keys(weeksMap).forEach(wNum => {
        const weekData = weeksMap[wNum];
        const weekCard = document.createElement('div');
        weekCard.className = 'week-card';
        
        const total = weekData.tasks.length;
        const completed = weekData.tasks.filter(t => t.completed).length;
        const progressPct = Math.round((completed / total) * 100);

        let weekHTML = `
            <div class="week-title">
                <span>Week ${wNum}: ${weekData.focus}</span>
                <span class="week-focus-badge">${progressPct}% Done</span>
            </div>
            <div class="task-list">
        `;

        weekData.tasks.forEach(task => {
            const isCompleted = state.completedTasks.includes(task.id);
            task.completed = isCompleted;

            weekHTML += `
                <div class="task-item ${isCompleted ? 'completed' : ''}" data-task-id="${task.id}">
                    <div class="task-checkbox">
                        ${isCompleted ? `<svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"></polyline></svg>` : ''}
                    </div>
                    <span class="task-text">${task.text}</span>
                </div>
            `;
        });

        weekHTML += `</div>`;
        weekCard.innerHTML = weekHTML;
        calendarWeeks.appendChild(weekCard);
    });

    calendarWeeks.querySelectorAll('.task-item').forEach(item => {
        item.addEventListener('click', () => {
            const taskId = item.getAttribute('data-task-id');
            toggleTaskCompletion(taskId);
        });
    });
}

function toggleTaskCompletion(taskId) {
    const taskIndex = state.scheduleTasks.findIndex(t => t.id === taskId);
    if (taskIndex === -1) return;

    const task = state.scheduleTasks[taskIndex];
    const isCompleted = state.completedTasks.includes(taskId);

    if (isCompleted) {
        state.completedTasks = state.completedTasks.filter(id => id !== taskId);
        state.studyHours = Math.max(0, state.studyHours - task.hoursValue);
        task.completed = false;
    } else {
        state.completedTasks.push(taskId);
        state.studyHours += task.hoursValue;
        task.completed = true;
        
        if (Math.random() > 0.8) {
            state.streak++;
        }
    }

    saveState();
    renderWeeklyCalendar();
}


// --- RESOURCE HUB & FORMULAS ---

function initResourceHub() {
    const tabs = document.querySelectorAll('.hub-tab');
    const panes = document.querySelectorAll('.hub-content-pane');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            panes.forEach(p => p.classList.remove('active'));

            tab.classList.add('active');
            const targetPane = document.getElementById(tab.getAttribute('data-tab'));
            if (targetPane) {
                targetPane.classList.add('active');
            }
        });
    });
}


// --- AI STUDY COACH (CHAT) FUNCTIONS ---

function initChatAssistant() {
    if (chatInitialized) return;
    chatInitialized = true;

    const chatInput = document.getElementById('chat-input');
    const chatSendBtn = document.getElementById('chat-send-btn');
    
    chatSendBtn.addEventListener('click', sendChatMessage);
    chatInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            sendChatMessage();
        }
    });
}

function sendChatMessage() {
    const chatInput = document.getElementById('chat-input');
    const chatMessages = document.getElementById('chat-messages');
    const chatSendBtn = document.getElementById('chat-send-btn');
    
    const text = chatInput.value.trim();
    if (!text) return;

    // 1. Add student message to chat
    appendChatBubble('student', '👤', text);
    chatInput.value = '';
    
    // Disable inputs
    chatInput.disabled = true;
    chatSendBtn.disabled = true;

    // 2. Add loading message
    const loadingId = 'coach-loading-' + Date.now();
    const loadingBubble = document.createElement('div');
    loadingBubble.className = 'chat-bubble coach loading-bubble';
    loadingBubble.id = loadingId;
    loadingBubble.innerHTML = `
        <div class="bubble-avatar">🤖</div>
        <div class="bubble-content">
            <p><em>Coach is reviewing the MCAT curriculum...</em></p>
        </div>
    `;
    chatMessages.appendChild(loadingBubble);
    chatMessages.scrollTop = chatMessages.scrollHeight;

    // 3. Make POST request to Flask
    fetch('/api/chat', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            message: text,
            history: chatHistory
        })
    })
    .then(res => res.json())
    .then(data => {
        // Remove loading bubble
        const lBubble = document.getElementById(loadingId);
        if (lBubble) lBubble.remove();

        chatInput.disabled = false;
        chatSendBtn.disabled = false;
        chatInput.focus();

        if (data.status === 'success') {
            const reply = data.response;
            // Append coach reply
            appendChatBubble('coach', '🤖', reply, true);
            
            // Record in history
            chatHistory.push({ role: 'user', text: text });
            chatHistory.push({ role: 'model', text: reply });
            if (chatHistory.length > 20) {
                chatHistory.shift(); // keep history bounded
                chatHistory.shift();
            }
            
            // Increment study hours slightly for consulting tutor
            state.studyHours += 0.25;
            state.studyHours = Math.round(state.studyHours * 100) / 100;
            saveState();
        } else {
            appendChatBubble('coach', '🤖', `Sorry, I encountered an issue: ${data.message || 'Unknown error'}`);
        }
    })
    .catch(err => {
        const lBubble = document.getElementById(loadingId);
        if (lBubble) lBubble.remove();
        
        chatInput.disabled = false;
        chatSendBtn.disabled = false;
        
        appendChatBubble('coach', '🤖', "Sorry, I had trouble reaching the tutor backend server. Please verify your connection and try again.");
        console.error("Chat error:", err);
    });
}

function appendChatBubble(role, avatar, text, formatMarkdown = false) {
    const chatMessages = document.getElementById('chat-messages');
    const bubble = document.createElement('div');
    bubble.className = `chat-bubble ${role}`;
    
    let contentHtml = '';
    if (formatMarkdown) {
        contentHtml = parseMarkdown(text);
    } else {
        contentHtml = `<p>${escapeHtml(text)}</p>`;
    }

    bubble.innerHTML = `
        <div class="bubble-avatar">${avatar}</div>
        <div class="bubble-content">
            ${contentHtml}
        </div>
    `;
    
    chatMessages.appendChild(bubble);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Simple Helper to Escape HTML
function escapeHtml(text) {
    return text
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

// Simple Custom Markdown Parser for formatted responses
function parseMarkdown(text) {
    // Escape HTML first
    let html = escapeHtml(text);
    
    // Bold: **text** -> <strong>text</strong>
    html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    
    // Bullet lists: split by newlines, process lines starting with '-' or '*'
    const lines = html.split('\n');
    let inList = false;
    let listType = null; // 'ul' or 'ol'
    let processedLines = [];

    for (let i = 0; i < lines.length; i++) {
        let line = lines[i].trim();
        
        // Unordered list checks
        if (line.startsWith('- ') || line.startsWith('* ')) {
            if (!inList) {
                processedLines.push('<ul>');
                inList = true;
                listType = 'ul';
            }
            processedLines.push(`<li>${line.substring(2)}</li>`);
        }
        // Ordered list checks: e.g. "1. "
        else if (/^\d+\.\s/.test(line)) {
            if (!inList) {
                processedLines.push('<ol>');
                inList = true;
                listType = 'ol';
            }
            const match = line.match(/^(\d+)\.\s(.*)/);
            processedLines.push(`<li>${match[2]}</li>`);
        }
        else {
            if (inList) {
                processedLines.push(`</${listType}>`);
                inList = false;
                listType = null;
            }
            if (line.length > 0) {
                processedLines.push(`<p>${line}</p>`);
            } else {
                processedLines.push('<br>');
            }
        }
    }
    
    if (inList) {
        processedLines.push(`</${listType}>`);
    }

    return processedLines.join('\n').replace(/<br>\n<br>/g, '<br>');
}


// Start application
function init() {
    loadState();
    initNavigation();
    renderDashboard();
}

window.addEventListener('DOMContentLoaded', init);
