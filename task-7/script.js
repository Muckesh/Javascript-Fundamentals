const userInput = document.getElementById('user-input');
const chatWindow = document.getElementById('chat-window');
const sendBtn = document.getElementById('send-btn');
const clearBtn = document.getElementById('clear-btn');

const botResponses = [
    "Hi, How are you?",
    "That's interesting.",
    "What do you like about coding?",
    "It's nice talking to you.",
    "Keep Rocking!"
];


function addMessage(text,sender,timestamp=getCurrentTime()){
    const messageDiv = document.createElement("div");
    messageDiv.classList.add("message",sender==="user"?"user-msg":"bot-msg");
    messageDiv.innerHTML=`${text}<div class="timestamp">${timestamp}</div>`;
    chatWindow.appendChild(messageDiv);
    chatWindow.scrollTop = chatWindow.scrollHeight;

    saveChatHistory();
}

function getCurrentTime(){
    const now = new Date();

    return now.toLocaleTimeString([],{hour:"2-digit",minute:"2-digit",hour12:true});
}

function sendMessage(){
    const text = userInput.value.trim();

    if (text==="") {
        return;
    }

    const timestamp = getCurrentTime();
    addMessage(text,"user",timestamp);

    setTimeout(()=>{
        const botReply = botResponses[Math.floor(Math.random()*botResponses.length)];
        addMessage(botReply,"bot",getCurrentTime())
    },1500);

    userInput.value="";
}

function clearChat(){
    chatWindow.innerHTML="";
    localStorage.removeItem("chatHistory");
}

function saveChatHistory(){
    const messages = [...document.querySelectorAll(".message")].map(msg => ({
        text: msg.innerText.replace(/\n.*/,""),
        sender: msg.classList.contains('user-msg')?"user":"bot",
        timestamp: msg.querySelector('.timestamp').innerText
    }));

    localStorage.setItem("chatHistory",JSON.stringify(messages));
}

function loadChatHistory(){
    const savedMessages = JSON.parse(localStorage.getItem("chatHistory")) || [];
    savedMessages.forEach(msg  => {
        addMessage(msg.text,msg.sender,msg.timestamp);
    });
}

window.onload = loadChatHistory;

sendBtn.addEventListener("click",sendMessage);
clearBtn.addEventListener("click",clearChat);
userInput.addEventListener("keypress",(event)=>{
    if(event.key==="Enter"){
        sendMessage();
    }
});