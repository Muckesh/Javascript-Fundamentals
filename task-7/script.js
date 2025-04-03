const chatWindow = document.getElementById("chat-window");
const userInput = document.getElementById("user-input");
const sendBtn = document.getElementById("send-btn");
const clearBtn = document.getElementById("clear-btn");

const botResponses = [
    "Hello! How can I help?",
    "That's interesting! Tell me more.",
    "I'm just a simple bot.",
    "What do you like about coding? ",
    "Keep going, you're doing great!",
    "That sounds amazing!",
    "Wow, I never thought about it that way!"
];

function addMessage(text, sender, timestamp = getCurrentTime()) {
    const messageDiv = document.createElement("div");
    messageDiv.classList.add("message", sender === "user" ? "user-message" : "bot-message");

    messageDiv.innerHTML = `${text} <div class="timestamp">${timestamp}</div>`;
    chatWindow.appendChild(messageDiv);
    chatWindow.scrollTop = chatWindow.scrollHeight;

    saveChatHistory();
}

function getCurrentTime() {
    const now = new Date();
    return now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: true });
}

function sendMessage() {
    const text = userInput.value.trim();
    if (text === "") return;

    const timestamp = getCurrentTime();
    addMessage(text, "user", timestamp);
    userInput.value = "";

    const typingIndicator = showTypingIndicator();

    setTimeout(() => {
        chatWindow.removeChild(typingIndicator);
        const botReply = botResponses[Math.floor(Math.random() * botResponses.length)];
        addMessage(botReply, "bot", getCurrentTime());
    }, 1500);
}

function showTypingIndicator() {
    const typingDiv = document.createElement("div");
    typingDiv.classList.add("message", "bot-message");
    typingDiv.innerHTML = "Typing...";
    chatWindow.appendChild(typingDiv);
    chatWindow.scrollTop = chatWindow.scrollHeight;
    return typingDiv;
}

function saveChatHistory() {
    const messages = [...document.querySelectorAll(".message")].map(msg => ({
        text: msg.innerText.replace(/\n.*/, ""),
        sender: msg.classList.contains("user-message") ? "user" : "bot",
        timestamp: msg.querySelector(".timestamp").innerText
    }));
    localStorage.setItem("chatHistory", JSON.stringify(messages));
}

function loadChatHistory() {
    const savedMessages = JSON.parse(localStorage.getItem("chatHistory")) || [];
    savedMessages.forEach(msg => addMessage(msg.text, msg.sender, msg.timestamp));
}

function clearChat() {
    chatWindow.innerHTML = "";
    localStorage.removeItem("chatHistory");
}

window.onload = loadChatHistory;

sendBtn.addEventListener("click", sendMessage);
clearBtn.addEventListener("click", clearChat);
userInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") sendMessage();
});
