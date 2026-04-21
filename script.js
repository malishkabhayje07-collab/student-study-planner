/* ===================== QUOTES ===================== */
const quotes = [
    "Discipline is the bridge to success.",
    "Small steps lead to big results.",
    "Stay focused and keep going.",
    "Your future depends on today.",
    "Study now, shine later."
];

function showQuote() {
    let randomIndex = Math.floor(Math.random() * quotes.length);
    document.getElementById("quote").textContent = quotes[randomIndex];
}

/* ===================== TASKS ===================== */
function addTask() {
    let input = document.getElementById("taskInput");
    let task = input.value;

    if (task === "") return;

    let li = document.createElement("li");

    let checkbox = document.createElement("input");
    checkbox.type = "checkbox";

    let span = document.createElement("span");
    span.textContent = " " + task;

    checkbox.onchange = function () {
        if (checkbox.checked) {
            span.style.textDecoration = "line-through";

            // 🎉 task confetti
            confetti({
                particleCount: 80,
                spread: 70,
                origin: { y: 0.6 }
            });
        } else {
            span.style.textDecoration = "none";
        }
    };

    li.appendChild(checkbox);
    li.appendChild(span);

    document.getElementById("taskList").appendChild(li);

    input.value = "";
}

/* ===================== GOALS + PROGRESS + BADGE ===================== */
function setupGoals() {
    const goalBoxes = document.querySelectorAll(".goal");
    const badge = document.getElementById("badgePopup");

    goalBoxes.forEach(box => {
        box.addEventListener("change", updateGoalProgress);
    });

    function updateGoalProgress() {
        let total = goalBoxes.length;
        let checked = 0;

        goalBoxes.forEach(box => {
            if (box.checked) checked++;
        });

        let percent = Math.round((checked / total) * 100);

        // update bar
        document.getElementById("goalProgressBar").style.width = percent + "%";
        document.getElementById("goalText").textContent = percent + "% Completed";

        // 🎉 full completion
        if (percent === 100) {
            confetti({
                particleCount: 150,
                spread: 100,
                origin: { y: 0.6 }
            });

            badge.style.opacity = "1";
            badge.style.transform = "translateX(-50%) scale(1)";
        } else {
            badge.style.opacity = "0";
            badge.style.transform = "translateX(-50%) scale(0)";
        }
    }
}

/* ===================== TIMER ===================== */
let time = 1500;
let interval;
let running = false;

function startTimer() {
    if (running) return;
    running = true;

    interval = setInterval(() => {
        if (time <= 0) {
            clearInterval(interval);
            alert("Time's up!");
            running = false;
            return;
        }

        time--;

        let m = Math.floor(time / 60);
        let s = time % 60;

        document.getElementById("timer").textContent =
            m + ":" + (s < 10 ? "0" : "") + s;

    }, 1000);
}

function resetTimer() {
    clearInterval(interval);
    time = 1500;
    running = false;
    document.getElementById("timer").textContent = "25:00";
}

/* ===================== ON LOAD ===================== */
window.onload = function () {
    showQuote();
    setupGoals();
};
