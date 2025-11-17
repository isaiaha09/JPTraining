const bubble = document.getElementById("jp-chat-bubble");
const chatWindow = document.querySelector(".jp-chat-window");
const messages = document.querySelector(".jp-chat-messages");
const options = document.querySelector(".jp-chat-options");
const chatClose = document.querySelector(".jp-chat-close");

let historyStack = [];     // stores previous options arrays
let messageHistory = [];   // stores previous bot messages

if (chatClose) {
    chatClose.addEventListener("click", () => {
        chatWindow.classList.remove("open");
    });
}

// UI helpers
function addBotMessage(text) {
  const el = document.createElement("div");
  el.className = "jp-message jp-bot";
  el.innerText = text;
  messages.appendChild(el);
  messages.scrollTop = messages.scrollHeight;
}

function addUserMessage(text) {
  const el = document.createElement("div");
  el.className = "jp-message jp-user";
  el.innerText = text;
  messages.appendChild(el);
  messages.scrollTop = messages.scrollHeight;
}

function restartChat() {
  messages.innerHTML = "";  
  historyStack = [];         
  messageHistory = [];
  startChat();               
}

// Toggle chat window
bubble.addEventListener("click", () => chatWindow.classList.toggle("open"));

// Show options and manage buttons
function showOptions(items, recordMessage = false) {
  options.innerHTML = "";

  // Record message for back button
  if (recordMessage) {
    messageHistory.push(messages.lastChild.innerText);
  }

  // Push current options to history
  historyStack.push(items);

  // Show option buttons
  items.forEach(item => {
    const btn = document.createElement("button");
    btn.innerText = item.text;
    btn.addEventListener("click", () => handleOption(item.value, item.text));
    options.appendChild(btn);
  });

  // Show back button only if mid-segment (not first step, not end)
  if (historyStack.length > 1 && items.length > 0) {
    const backBtn = document.createElement("button");
    backBtn.innerText = "⬅ Back";
    backBtn.addEventListener("click", () => {
      historyStack.pop(); // remove current options
      messageHistory.pop(); // remove current message
      const prevOptions = historyStack.pop();
      const prevMessage = messageHistory.pop();
      messages.innerHTML = ""; // clear all messages
      addBotMessage(prevMessage); // restore previous bot message
      showOptions(prevOptions, true); // restore previous options
    });
    options.appendChild(backBtn);
  }

  // Show restart button only at the end (no options)
  if (items.length === 0) {
    const restartBtn = document.createElement("button");
    restartBtn.innerText = "🔄 Restart";
    restartBtn.addEventListener("click", restartChat);
    options.appendChild(restartBtn);
  }
}

// Start conversation
function startChat() {
  addBotMessage("Hi! What are you here for today?");
  const firstOptions = [
    { text: "Training programs", value: "programs" },
    { text: "Recovery tips", value: "recovery" },
    { text: "Pricing & availability", value: "pricing" }
  ];
  showOptions(firstOptions);
}

// Handle option selection
function handleOption(value, label) {
  addUserMessage(label);
  options.innerHTML = "";

  switch(value) {
    case "programs":
      addBotMessage("We have beginner, intermediate, and advanced plans. Which level are you?");
      showOptions([
        { text: "Beginner", value: "beginner" },
        { text: "Intermediate", value: "intermediate" },
        { text: "Advanced", value: "advanced" }
      ], true);
      break;

    case "beginner":
      addBotMessage("Beginner plan: 3 full-body workouts/week. Focus on form and consistency.");
      showOptions([], true);
      break;

    case "intermediate":
      addBotMessage("Intermediate plan: 4-5 workouts/week. Add intensity and progressive overload.");
      showOptions([], true);
      break;

    case "advanced":
      addBotMessage("Advanced plan: 5-6 workouts/week. Periodization and sport-specific work.");
      showOptions([], true);
      break;

    case "recovery":
      addBotMessage("Recovery is key! Focus on sleep, nutrition, and progressive rehab exercises.");
      showOptions([], true);
      break;

    case "pricing":
      addBotMessage("Pricing depends on plan and duration. How would you like to get the details?");
      showOptions([
        { text: "Contact me page", value: "pricing_contact" },
        { text: "Instagram", value: "pricing_instagram" }
      ], true);
      break;

    case "pricing_contact":
      addBotMessage("You can reach out via our contact page here: [Insert Contact Page Link]");
      showOptions([], true);
      break;

    case "pricing_instagram":
      addBotMessage("You can DM us on Instagram for pricing details: [Insert Instagram Link]");
      showOptions([], true);
      break;

    default:
      addBotMessage("Sorry, I didn't understand that choice.");
      showOptions([], true);
  }
}

// Kick off chat
startChat();
