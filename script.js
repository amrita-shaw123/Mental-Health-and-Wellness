const moods = document.querySelectorAll(".mood");
const quoteEl = document.getElementById("quote");
const tipEl = document.getElementById("tip");
const responseEl = document.getElementById("response");
const motivationCard = document.getElementById("motivationCard");
const tipCard = document.getElementById("tipCard");

const canvas = document.getElementById("chart");
const ctx = canvas.getContext("2d");

const quotes = {
    Happy: [
        "Keep shining! Your happiness matters 🌟",
        "Your positive energy is powerful 😊"
    ],
    Sad: [
        "It’s okay to feel sad. This too shall pass 💙",
        "You are not alone. Better days are coming 🌈"
    ],
    Stressed: [
        "Take a deep breath. You’ve got this 🌿",
        "One step at a time. You are doing your best 💪"
    ]
};

const tips = {
    Happy: "Celebrate your joy and spread positivity 😊",
    Sad: "Talk to someone you trust or write your feelings ✍️",
    Stressed: "Try deep breathing or a short walk 🚶‍♀️"
};

// Load mood data
let moodData = JSON.parse(localStorage.getItem("moodData")) || {
    Happy: 0,
    Sad: 0,
    Stressed: 0
};

moods.forEach(button => {
    button.addEventListener("click", () => {

        const mood = button.classList.contains("happy") ? "Happy" :
                     button.classList.contains("sad") ? "Sad" : "Stressed";

        moodData[mood]++;
        localStorage.setItem("moodData", JSON.stringify(moodData));

        responseEl.textContent = `Thank you for sharing. You are feeling ${mood} today ❤️`;

        showMotivation(mood);
        showTip(mood);
        drawChart();
    });
});

function showMotivation(mood) {
    const moodQuotes = quotes[mood];
    const random = Math.floor(Math.random() * moodQuotes.length);
    quoteEl.textContent = moodQuotes[random];
    motivationCard.classList.remove("hidden");
}

function showTip(mood) {
    tipEl.textContent = tips[mood];
    tipCard.classList.remove("hidden");
}

// Draw chart
function drawChart() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const labels = Object.keys(moodData);
    const values = Object.values(moodData);

    const barWidth = 50;
    const gap = 30;

    values.forEach((value, i) => {
        const x = 40 + i * (barWidth + gap);
        const height = value * 15;
        const y = canvas.height - height - 20;

        ctx.fillStyle = "#40916c";
        ctx.fillRect(x, y, barWidth, height);

        ctx.fillStyle = "#000";
        ctx.fillText(labels[i], x, canvas.height - 5);
    });
}

drawChart();
