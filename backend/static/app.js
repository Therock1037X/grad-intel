const chatBox = document.getElementById("chat-box");
const chatForm = document.getElementById("chat-form");
const messageInput = document.getElementById("message-input");

function addMessage(role, text) {
  const row = document.createElement("div");
  row.className = `message ${role}`;

  const bubble = document.createElement("div");
  bubble.className = "bubble";
  bubble.textContent = text;

  row.appendChild(bubble);
  chatBox.appendChild(row);
  chatBox.scrollTop = chatBox.scrollHeight;
}

addMessage(
  "bot",
  "Hi! I am your virtual overseas education counselor. Tell me your CGPA, budget, target course, and preferred countries to get personalized guidance."
);

chatForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const message = messageInput.value.trim();
  if (!message) return;

  addMessage("user", message);
  messageInput.value = "";

  try {
    const response = await fetch("/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message }),
    });

    if (!response.ok) {
      throw new Error("Failed to get response from server.");
    }

    const data = await response.json();
    addMessage("bot", data.reply || "I could not generate a response.");
  } catch (error) {
    addMessage(
      "bot",
      "Sorry, I am unable to connect right now. Please check if the backend server is running."
    );
  }
});
