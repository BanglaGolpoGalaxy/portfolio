// ============================================================
// CHATBOT.JS – Milan's Offline AI Assistant
// ============================================================

// ============================================================
// OFFLINE AI RESPONSES
// ============================================================

const offlineResponses = [
  // GREETINGS
  {
    keywords: ["hello", "hi", "hey", "হ্যালো", "হাই"],
    reply: "👋 Hello! I'm Milan's AI Assistant. Ask me about his projects, skills, tutorials, or how to contact him."
  },
  {
    keywords: ["thanks", "thank", "thank you", "ধন্যবাদ"],
    reply: "😊 You're welcome! Feel free to ask anything else."
  },
  {
    keywords: ["bye", "tata", "goodbye", "বিদায়"],
    reply: "👋 Goodbye! Come back anytime."
  },

  // BOT IDENTITY
  {
    keywords: ["your name", "who are you", "তোমার নাম", "তুমি কে"],
    reply: "I'm Milan's AI Assistant. I help visitors learn about Milan's work and skills."
  },
  {
    keywords: ["who made you", "who created you", "your owner", "কে তোমাকে বানিয়েছে"],
    reply: "I was created by Milan Biswas — a creator who builds full-stack apps entirely from a mobile phone! 😊"
  },
  {
    keywords: ["are you human", "are you ai", "are you robot", "তুমি কি মানুষ", "তুমি কি ai"],
    reply: "I'm an AI assistant, but I'm powered by Milan's love for teaching and building!"
  },
  {
    keywords: ["your age", "how old are you"],
    reply: "I was born in 2026, so I'm still a baby AI, but learning fast! 👶📚"
  },
  {
    keywords: ["what can you do", "your purpose", "help me", "তুমি কি করতে পারো"],
    reply: "I can tell you about Milan's projects, skills, tutorials, and how to contact him. Just ask!"
  },

  // MILAN
  {
    keywords: ["who is milan", "milan biswas", "about milan", "মিলান কে"],
    reply: "👤 Milan Biswas — B.Sc graduate (2021), ITI COPA trainee. He builds full-stack web apps entirely from a mobile phone and writes free Bengali tutorials."
  },
  {
    keywords: ["hobby", "favorite food", "favorite music", "শখ"],
    reply: "Milan loves reading stories of inventions and discoveries, his favorite food is rice with fish curry, and he enjoys Rabindra Sangeet and folk music."
  },
  {
    keywords: ["location", "where is milan from", "where does he live", "মিলান কোথায় থাকে"],
    reply: "Milan lives in West Bengal, India."
  },
  {
    keywords: ["freelance", "available", "hire", "কাজ"],
    reply: "Yes! Milan is open to freelance projects and collaborations. Use the contact form below."
  },

  // PROJECTS
  {
    keywords: ["project", "projects", "what has he built", "প্রজেক্ট"],
    reply: "🚀 Milan's major projects:\n\n1. <b>AadimVault</b> — Global digital vault for heritage & stories<br>2. <b>Shop Manager</b> — Full-stack billing & inventory system<br>3. <b>Super Calculator</b> — 14-in-1 PWA tool<br>4. <b>Bangla Golpo Galaxy</b> — Bengali story website<br>5. <b>Banking Knowledge Book</b> — Complete banking guide<br>6. <b>Exam Guide India</b> — Free exam preparation platform<br><br>Which one would you like to know more about?"
  },
  {
    keywords: ["aadimvault", "aadim vault", "আদিম ভল্ট"],
    reply: "🏛️ AadimVault is a global digital vault where people can preserve old objects, stories, and heritage. It has auctions, exchanges, and display-only options.\n\n<a href='https://aadimvault.onrender.com' target='_blank' rel='noopener noreferrer' style='color:var(--accent-primary);'>Visit AadimVault →</a>"
  },
  {
    keywords: ["shop manager", "shop system", "দোকান"],
    reply: "🏪 Shop Manager is a full-stack billing and inventory system with QR scanner, JWT auth, and SQLite database.\n\n<a href='https://shop-manager-ywa4.onrender.com' target='_blank' rel='noopener noreferrer' style='color:var(--accent-primary);'>Try it live →</a>"
  },
  {
    keywords: ["calculator", "super calculator", "ক্যালকুলেটর"],
    reply: "🧮 Super Calculator is a 14-in-1 PWA tool with EMI, BMI, Age, Length, Weight, Volume, Temperature, and Profit-Loss calculators.\n\n<a href='super_calculator/super_calculator.html' target='_blank' rel='noopener noreferrer' style='color:var(--accent-primary);'>Use it now →</a>"
  },

  // SKILLS
  {
    keywords: ["skill", "skills", "tech stack", "technologies", "দক্ষতা", "টেকনোলজি"],
    reply: "🛠️ Milan's skills: HTML5, CSS3, JavaScript (ES6), Node.js, Express.js, REST API, SQLite, JWT, Git/GitHub, Termux, Render Deployment, PWA, QR Code, Excel, Team Management."
  },
  {
    keywords: ["python", "পাইথন"],
    reply: "Milan primarily uses JavaScript (Node.js/Express). He uses Python for basic scripts like sitemap generation."
  },

  // CONTACT
  {
    keywords: ["contact", "email", "how to reach", "যোগাযোগ", "ইমেইল"],
    reply: "📧 You can contact Milan via the contact form on this portfolio (scroll down to Contact section) or email: milanbiswasmilan19@gmail.com"
  },
  {
    keywords: ["job", "offer", "collaborate", "চাকরি"],
    reply: "Milan is open to job offers and collaborations. Please use the contact form to send your proposal."
  },

  // TUTORIALS
  {
    keywords: ["tutorial", "tutorials", "learn", "guide", "course", "টিউটোরিয়াল", "শিখতে"],
    reply: "📝 Milan's free tutorials:\n\n1. <b>Termux Backend Series</b> — Learn backend on mobile<br>2. <b>Dark Mode Toggle</b> — CSS variables trick<br>3. <b>Bilingual Toggle</b> — Multi-language support<br>4. <b>Multi Calculator Build</b> — 7 calculators in one page<br><br>All available in the Blog section above!"
  },
  {
    keywords: ["termux", "terminal", "mobile dev", "টার্মাক্স"],
    reply: "📱 To install packages in Termux:\n\n<code>pkg update -y && pkg upgrade -y</code><br><br><code>pkg install nodejs -y</code><br><br>Read the full Termux series:<br><a href='blog/termux_index.html' target='_blank' rel='noopener noreferrer' style='color:var(--accent-primary);'>Termux Series →</a>"
  },
  {
    keywords: ["git", "github", "push", "commit"],
    reply: "🔧 Basic Git commands:\n\n<code>git add -A</code><br><code>git commit -m \"message\"</code><br><code>git push origin main</code><br><code>git pull origin main</code><br><br>See the full cheat sheet:<br><a href='blog/termux_all_command.html' target='_blank' rel='noopener noreferrer' style='color:var(--accent-primary);'>Command Cheat Sheet →</a>"
  },
  {
    keywords: ["blog", "blog post", "ব্লগ"],
    reply: "📝 Milan's blog posts are available in the Blog section above. Topics include Termux, Web Dev, Dark Mode, and more."
  },

  // CAPABILITIES
  {
    keywords: ["what can you tell", "your capabilities"],
    reply: "I can tell you about Milan's projects, skills, tutorials, and contact info. I can also help with basic Termux and Git commands. What would you like to know?"
  },

  // FUN
  {
    keywords: ["joke", "funny", "humor", "জোক"],
    reply: "😂 Why do programmers prefer dark mode? Because light attracts bugs! 🐛"
  },
  {
    keywords: ["love you", "i love you"],
    reply: "❤️ Aww, thank you! But Milan is the one who really made me with love!"
  },
  {
    keywords: ["sad", "hurt", "দুঃখ"],
    reply: "I don't have feelings, but I'm always here to help! 😊"
  },

  // INTERVIEW
  {
    keywords: ["interview", "background", "tell me about yourself", "yourself"],
    reply: "👤 About Me:\n\nI'm Milan Biswas, a B.Sc graduate (2021) and ITI COPA trainee. I build full-stack web applications entirely from my mobile phone using Termux. I'm passionate about creating free Bengali resources to help beginners learn coding without expensive courses or laptops."
  },
  {
    keywords: ["why should we hire you", "why you", "strength", "strengths"],
    reply: "💪 My Strengths:\n\n1. <b>Self-taught & Resourceful:</b> I learned full-stack development on my own, using just a mobile phone.<br><br>2. <b>Problem Solver:</b> I built AadimVault and a complete Shop Manager System from scratch.<br><br>3. <b>Teacher & Communicator:</b> I write free Bengali tutorials, explaining complex topics in simple words.<br><br>4. <b>Real Projects:</b> I don't just know theory — I have multiple live projects deployed on Render and GitHub Pages."
  },
  {
    keywords: ["project you built", "most challenging", "difficult", "complex"],
    reply: "🏛️ My most challenging project is AadimVault — a global digital vault where people can preserve heritage items, stories, and even auction them. I built it alone from a phone using Node.js, Express, SQLite, JWT, and Multer for file uploads."
  },
  {
    keywords: ["how did you learn", "learning", "education", "study"],
    reply: "📱 I learned entirely through self-study. I didn't have a laptop, so I used Termux on my Android phone. I started with HTML/CSS/JS, then moved to Node.js, Express, and SQLite. I built real projects alongside learning — that's how I understood concepts deeply."
  },
  {
    keywords: ["where do you see yourself", "future", "goal", "ambition"],
    reply: "🚀 In the next 2-3 years, I see myself as a full-stack developer building impactful products. I want to turn Exam Guide India into a widely-used platform and scale AadimVault into a global heritage marketplace."
  },
  {
    keywords: ["teamwork", "team player", "collaborate"],
    reply: "🤝 Although I built most projects solo, I understand the value of teamwork. While managing a flower company (2022-2025), I supervised 4-5 workers daily. I'm comfortable with Git/GitHub for collaboration, and I'm eager to work in a team where I can learn from others and contribute my skills."
  },
  {
    keywords: ["weakness", "weaknesses", "area of improvement"],
    reply: "🎯 I sometimes focus too deeply on perfecting one feature, which can delay other tasks. I'm learning to balance 'perfection' with 'progress'. Also, since I'm self-taught, I'm actively working on understanding advanced DSA concepts and system design."
  },
  {
    keywords: ["why coding", "passion", "interest", "chose development"],
    reply: "💻 I discovered coding accidentally at my ITI class, when I saw students writing HTML in Notepad. I was fascinated that a simple text file could create a webpage! Since I didn't have a computer, I searched 'how to code on mobile' and found Termux. The day I ran my first Node.js server on my phone, I knew — this is what I want to do."
  },
  {
    keywords: ["salary", "expected", "compensation"],
    reply: "💰 As a fresher with real-world projects, I'm looking for a competitive salary that values my skills. However, I'm more focused on learning opportunities and the chance to work on meaningful projects. I'm open to discussion based on the role and company."
  }
];

const fallbackReply = "🤖 I'm sorry, I don't have an answer for that yet. Please contact Milan directly using the contact form below, and he'll get back to you!";

// ============================================================
// CHAT FUNCTIONS
// ============================================================

function findReply(message) {
  const msg = message.toLowerCase().trim();
  for (const item of offlineResponses) {
    for (const keyword of item.keywords) {
      if (msg.includes(keyword.toLowerCase())) {
        return item.reply;
      }
    }
  }
  return null;
}

let chatOpen = false;

function toggleChat() {
  const chatWindow = document.getElementById("ai-chat-window");
  const body = document.body;
  if (!chatWindow) return;

  chatOpen = !chatOpen;
  chatWindow.classList.toggle("open", chatOpen);
  body.classList.toggle("chat-open", chatOpen);
}

function askSuggested(question) {
  const input = document.getElementById("ai-chat-input");
  if (!input) return;
  input.value = question;
  sendMessage();
}

async function sendMessage() {
  const input = document.getElementById("ai-chat-input");
  const messages = document.getElementById("ai-chat-messages");
  if (!input || !messages) return;

  const msg = input.value.trim();
  if (!msg) return;

  // User message
  const userDiv = document.createElement("div");
  userDiv.className = "ai-message user";
  userDiv.textContent = msg;
  messages.appendChild(userDiv);
  input.value = "";
  messages.scrollTop = messages.scrollHeight;

  // Typing
  const typingId = "typing-" + Date.now();
  const typingDiv = document.createElement("div");
  typingDiv.className = "ai-message bot";
  typingDiv.id = typingId;
  typingDiv.textContent = "⏳ Typing...";
  messages.appendChild(typingDiv);
  messages.scrollTop = messages.scrollHeight;

  await new Promise(resolve => setTimeout(resolve, 800));

  const reply = findReply(msg) || fallbackReply;
  const typingEl = document.getElementById(typingId);
  if (typingEl) typingEl.remove();

  const botDiv = document.createElement("div");
  botDiv.className = "ai-message bot";
  botDiv.innerHTML = reply;
  messages.appendChild(botDiv);
  messages.scrollTop = messages.scrollHeight;
}

// Enter key
document.addEventListener("DOMContentLoaded", function() {
  const input = document.getElementById("ai-chat-input");
  if (input) {
    input.addEventListener("keydown", function(e) {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        sendMessage();
      }
    });
  }
});

// Draggable chat button (touch support)
(function() {
  const btn = document.getElementById("ai-chat-btn");
  if (!btn) return;
  let isDragging = false,
    startX, startY, startLeft, startTop;

  btn.addEventListener("touchstart", function(e) {
    const t = e.touches[0];
    startX = t.clientX;
    startY = t.clientY;
    const rect = btn.getBoundingClientRect();
    startLeft = rect.left;
    startTop = rect.top;
    isDragging = false;
  }, { passive: false });

  btn.addEventListener("touchmove", function(e) {
    if (startX === undefined) return;
    const t = e.touches[0];
    const dx = t.clientX - startX;
    const dy = t.clientY - startY;
    if (Math.abs(dx) > 5 || Math.abs(dy) > 5) {
      isDragging = true;
      e.preventDefault();
      btn.style.transition = "none";
      btn.style.top = (startTop + dy) + "px";
      btn.style.left = (startLeft + dx) + "px";
      btn.style.right = "auto";
    }
  }, { passive: false });

  btn.addEventListener("touchend", function() {
    if (!isDragging) toggleChat();
    startX = undefined;
    startY = undefined;
    isDragging = false;
    btn.style.transition = "transform 0.2s";
  });
})();
