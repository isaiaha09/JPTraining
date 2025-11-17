const bubble = document.getElementById("jp-chat-bubble");
const chatWindow = document.querySelector(".jp-chat-window");
const messages = document.querySelector(".jp-chat-messages");
const options = document.querySelector(".jp-chat-options");
const chatClose = document.querySelector(".jp-chat-close");

// ---- Add header close button listener ----
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

// Toggle chat window
bubble.addEventListener("click", () => chatWindow.classList.toggle("open"));

// Start conversation
function startChat() {
  addBotMessage("Hi! What are you here for today?");
  showOptions([
    { text: "Training programs", value: "programs" },
    { text: "Recovery tips", value: "recovery" },
    { text: "Pricing & availability", value: "pricing" }
  ]);
}

// Show buttons for options
function showOptions(items) {
  options.innerHTML = "";
  items.forEach(item => {
    const btn = document.createElement("button");
    btn.innerText = item.text;
    btn.addEventListener("click", () => handleOption(item.value, item.text));
    options.appendChild(btn);
  });
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
      ]);
      break;
    case "recovery":
      addBotMessage("Recovery is key! Focus on sleep, nutrition, and progressive rehab exercises.");
      break;
    case "pricing":
      addBotMessage("Pricing depends on plan and duration. Contact us for full details.");
      break;
    case "beginner":
      addBotMessage("Beginner plan: 3 full-body workouts/week. Focus on form and consistency.");
      break;
    case "intermediate":
      addBotMessage("Intermediate plan: 4-5 workouts/week. Add intensity and progressive overload.");
      break;
    case "advanced":
      addBotMessage("Advanced plan: 5-6 workouts/week. Periodization and sport-specific work.");
      break;
    default:
      addBotMessage("Sorry, I didn't understand that choice.");
  }
}

// Kick off chat
startChat();
