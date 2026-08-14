// BrightSmile Dental Studio — Interactive Application Logic

const SERVICES_DATA = [
  { key: "cleaning", name: "Cleaning / Scaling", duration: "30 min", price: "Rs. 5,000", desc: "Professional dental scaling and plaque removal." },
  { key: "checkup", name: "Checkup / Consultation", duration: "20 min", price: "Rs. 2,000", desc: "Comprehensive oral examination and diagnostic." },
  { key: "filling", name: "Composite Filling", duration: "45 min", price: "Rs. 8,000", desc: "Tooth-colored aesthetic cavity restoration." },
  { key: "extraction", name: "Tooth Extraction", duration: "45 min", price: "Rs. 10,000", desc: "Safe, painless surgical or simple extraction." },
  { key: "root_canal", name: "Root Canal Treatment", duration: "90 min", price: "Rs. 25,000", desc: "Endodontic therapy to save damaged teeth." },
  { key: "whitening", name: "Laser Teeth Whitening", duration: "60 min", price: "Rs. 15,000", desc: "Professional teeth bleaching & shade whitening." }
];

const SIMULATED_PHONE = "+923009998877";

document.addEventListener("DOMContentLoaded", () => {
  initTabs();
  renderServices();
  setupChatHandlers();
  loadAppointments();

  document.getElementById("btn-refresh-appts").addEventListener("click", loadAppointments);
  document.getElementById("btn-reset-chat").addEventListener("click", resetChat);
});

// Tab Navigation
function initTabs() {
  const tabBtns = document.querySelectorAll(".tab-btn");
  tabBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      tabBtns.forEach(b => b.classList.remove("active"));
      document.querySelectorAll(".tab-content").forEach(c => c.classList.remove("active"));

      btn.classList.add("active");
      const targetId = btn.getAttribute("data-tab");
      document.getElementById(targetId).classList.add("active");
    });
  });
}

// Render Services Catalog Grid
function renderServices() {
  const container = document.getElementById("services-container");
  if (!container) return;

  container.innerHTML = SERVICES_DATA.map(s => `
    <div class="service-card">
      <div class="service-header">
        <h4 class="service-name">${s.name}</h4>
        <span class="service-price">${s.price}</span>
      </div>
      <p style="font-size: 0.82rem; color: var(--text-muted);">${s.desc}</p>
      <div class="service-meta">
        <span>⏱️ ${s.duration}</span>
        <span>Slug: <code>${s.key}</code></span>
      </div>
      <button class="btn btn-sm btn-secondary" onclick="sendQuickPrompt('I want to book a ${s.name.toLowerCase()}')">
        Book ${s.name.split('/')[0]}
      </button>
    </div>
  `).join("");
}

// Chat Handlers
function setupChatHandlers() {
  const input = document.getElementById("chat-input");
  const sendBtn = document.getElementById("chat-send-btn");

  sendBtn.addEventListener("click", () => handleSendMessage());
  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") handleSendMessage();
  });

  // Quick Chips
  document.querySelectorAll(".chip").forEach(chip => {
    chip.addEventListener("click", () => {
      const text = chip.getAttribute("data-prompt");
      sendQuickPrompt(text);
    });
  });
}

function sendQuickPrompt(text) {
  const input = document.getElementById("chat-input");
  input.value = text;
  handleSendMessage();
}

async function handleSendMessage() {
  const input = document.getElementById("chat-input");
  const messageText = input.value.trim();
  if (!messageText) return;

  input.value = "";
  appendChatMessage(messageText, "sent");

  // Show typing indicator or send request
  const typingBubble = appendTypingIndicator();

  try {
    // Send request to API endpoint (or simulated mock API)
    const response = await fetch("/webhook/whatsapp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        object: "whatsapp_business_account",
        entry: [{
          changes: [{
            value: {
              messages: [{
                from: SIMULATED_PHONE,
                id: "wamid." + Date.now(),
                text: { body: messageText }
              }]
            }
          }]
        }]
      })
    });

    typingBubble.remove();

    if (response.ok) {
      const data = await response.json();
      const botReply = data.reply || "Message processed successfully.";
      appendChatMessage(botReply, "received");
      loadAppointments(); // Refresh DB list after message
      updateAIStateVisualizer(messageText, data.extraction || null, data.current_step || "idle");
    } else {
      // Fallback simulating direct booking engine reply
      const mockReply = getMockReply(messageText);
      appendChatMessage(mockReply.reply, "received");
      updateAIStateVisualizer(messageText, mockReply.extraction, mockReply.step);
    }
  } catch (err) {
    typingBubble.remove();
    const mockReply = getMockReply(messageText);
    appendChatMessage(mockReply.reply, "received");
    updateAIStateVisualizer(messageText, mockReply.extraction, mockReply.step);
  }
}

function appendChatMessage(text, type) {
  const container = document.getElementById("chat-messages");
  const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const msgDiv = document.createElement("div");
  msgDiv.className = `message msg-${type}`;
  msgDiv.innerHTML = `
    <div class="msg-bubble">
      ${text.replace(/\n/g, "<br>")}
      <span class="msg-time">${time}</span>
    </div>
  `;
  container.appendChild(msgDiv);
  container.scrollTop = container.scrollHeight;
}

function appendTypingIndicator() {
  const container = document.getElementById("chat-messages");
  const typingDiv = document.createElement("div");
  typingDiv.className = "message msg-received";
  typingDiv.innerHTML = `
    <div class="msg-bubble" style="color: var(--text-muted); font-style: italic;">
      Assistant is typing...
    </div>
  `;
  container.appendChild(typingDiv);
  container.scrollTop = container.scrollHeight;
  return typingDiv;
}

function resetChat() {
  const container = document.getElementById("chat-messages");
  container.innerHTML = `
    <div class="chat-date-divider">Today</div>
    <div class="message msg-received">
      <div class="msg-bubble">
        Hi! I'm the BrightSmile Dental Clinic assistant 🦷<br><br>
        I can help you:<br>
        • <strong>Book</strong> an appointment<br>
        • <strong>Reschedule</strong> or <strong>cancel</strong> one<br>
        • Answer questions about <strong>hours</strong>, <strong>services</strong>, <strong>prices</strong>, or <strong>location</strong><br><br>
        What would you like to do?
        <span class="msg-time">${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
      </div>
    </div>
  `;
}

// Simulated Fallback Engine when server API is offline or testing
function getMockReply(text) {
  const t = text.toLowerCase();
  if (t.includes("hour") || t.includes("time") || t.includes("open")) {
    return {
      reply: "Our hours:\n• Mon–Thu: 09:00 – 17:00\n• Fri: 09:00 – 13:00\n• Sat: 10:00 – 14:00\n• Sun: Closed",
      extraction: { intent: "ask_hours", confidence: "high" },
      step: "idle"
    };
  }
  if (t.includes("cost") || t.includes("price") || t.includes("fee")) {
    return {
      reply: "Our prices:\n• Checkup: Rs. 2,000\n• Cleaning: Rs. 5,000\n• Filling: Rs. 8,000\n• Extraction: Rs. 10,000\n• Root Canal: Rs. 25,000\n• Whitening: Rs. 15,000",
      extraction: { intent: "ask_price", confidence: "high" },
      step: "idle"
    };
  }
  if (t.includes("address") || t.includes("where") || t.includes("located")) {
    return {
      reply: "📍 BrightSmile Dental Clinic\n12 Jinnah Avenue, Blue Area, Islamabad\n📞 Phone: +92 51 111 2222",
      extraction: { intent: "ask_address", confidence: "high" },
      step: "idle"
    };
  }
  if (t.includes("book") || t.includes("cleaning")) {
    return {
      reply: "What service would you like to book?\n(cleaning, checkup, filling, extraction, root_canal, whitening)",
      extraction: { intent: "book_appointment", service_type: "cleaning", confidence: "high" },
      step: "awaiting_service"
    };
  }
  return {
    reply: "I can help you book, reschedule, or cancel an appointment — or answer questions about hours, services, and prices!",
    extraction: { intent: "other", confidence: "low" },
    step: "idle"
  };
}

// Fetch Appointments from DB Endpoint
async function loadAppointments() {
  const tbody = document.getElementById("appts-tbody");
  if (!tbody) return;

  try {
    const res = await fetch("/admin/appointments");
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) {
        tbody.innerHTML = data.map(a => `
          <tr>
            <td><strong>${a.patient_name || "Patient"}</strong></td>
            <td><code>${a.patient_phone || SIMULATED_PHONE}</code></td>
            <td>${a.service_name || a.service_type}</td>
            <td>${a.start_time ? new Date(a.start_time).toLocaleString() : "TBD"}</td>
            <td><span class="badge badge-${a.status}">${a.status}</span></td>
            <td>
              <button class="btn-danger-sm" onclick="cancelAppointment('${a.id}')">Cancel</button>
            </td>
          </tr>
        `).join("");
        return;
      }
    }
  } catch (err) {
    console.log("Error loading appointments:", err);
  }

  // Sample placeholder row if database is currently empty
  tbody.innerHTML = `
    <tr>
      <td><strong>Ali Khan</strong></td>
      <td><code>+923009998877</code></td>
      <td>Cleaning / Scaling</td>
      <td>Tomorrow at 11:00 AM</td>
      <td><span class="badge badge-confirmed">Confirmed</span></td>
      <td><button class="btn-danger-sm" onclick="alert('Cancelled')">Cancel</button></td>
    </tr>
  `;
}

// AI Extraction Visualizer
function updateAIStateVisualizer(userInput, extraction, currentStep) {
  const jsonElem = document.getElementById("json-extraction");
  if (jsonElem) {
    jsonElem.textContent = JSON.stringify(extraction || {
      user_input: userInput,
      intent: "book_appointment",
      service_type: "cleaning",
      date: "2026-08-14",
      time: "11:00",
      confidence: "high"
    }, null, 2);
  }

  // Update Stepper
  document.querySelectorAll(".step-item").forEach(step => step.classList.remove("active"));
  const stepElem = document.getElementById(`step-${currentStep || "idle"}`);
  if (stepElem) stepElem.classList.add("active");
}
