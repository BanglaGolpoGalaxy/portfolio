// ============================================================
// CHATBOT.JS - Milan's Offline AI Assistant
// Contact Form Only — No Personal Email Exposed
// ============================================================

// ============================================================
// OFFLINE RESPONSES
// ============================================================
const offlineResponses = [

    // ==================== GREETINGS ====================
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

    // ==================== BOT IDENTITY ====================
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

    // ==================== MILAN'S IDENTITY ====================
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
        reply: "Yes! Milan is open to freelance projects and collaborations. Please use the Contact Form below to get in touch."
    },
    {
        keywords: ["education", "qualification", "academic", "শিক্ষা", "যোগ্যতা"],
        reply: "🎓 Milan completed his B.Sc in 2021 and is currently pursuing ITI COPA (Computer Operator and Programming Assistant). He is a self-taught web developer who never stopped learning."
    },
    {
        keywords: ["iti", "copa", "iti copa", "computer operator"],
        reply: "💻 Milan is currently enrolled in ITI COPA (Computer Operator and Programming Assistant). This course taught him the fundamentals of computers, programming, and office automation, which sparked his passion for web development."
    },
    {
        keywords: ["setup", "development setup", "mobile dev", "working environment"],
        reply: "📱 Milan's entire development setup runs on a mobile phone! He uses Termux (Linux environment for Android) with Node.js, Express, SQLite, and Git. He writes code in Vim and deploys on Render or GitHub Pages. No laptop needed!"
    },

    // ==================== PROJECTS ====================
    {
        keywords: ["project", "projects", "what has he built", "প্রজেক্ট"],
        reply: "🚀 Milan's major projects:<br><br>" +
            "1. <b>AadimVault</b> — Global digital vault for heritage & stories<br>" +
            "2. <b>Shop Manager</b> — Full-stack billing & inventory system<br>" +
            "3. <b>Super Calculator</b> — 14-in-1 PWA tool<br>" +
            "4. <b>Bangla Golpo Galaxy</b> — Bengali story website<br>" +
            "5. <b>Banking Knowledge Book</b> — Complete banking guide<br>" +
            "6. <b>Exam Guide India</b> — Free exam preparation platform<br><br>" +
            "Which one would you like to know more about?"
    },
    {
        keywords: ["aadimvault", "aadim vault", "আদিম ভল্ট"],
        reply: "🏛️ AadimVault is a global digital vault where people can preserve old objects, stories, and heritage. It has auctions, exchanges, and display-only options.<br><br>" +
            "<a href='https://aadimvault.onrender.com' target='_blank' rel='noopener noreferrer' style='color:var(--accent-cyan);'>Visit AadimVault →</a>"
    },
    {
        keywords: ["shop manager", "shop system", "দোকান"],
        reply: "🏪 Shop Manager is a full-stack billing and inventory system with QR scanner, JWT auth, and SQLite database.<br><br>" +
            "<a href='https://shop-manager-ywa4.onrender.com' target='_blank' rel='noopener noreferrer' style='color:var(--accent-cyan);'>Try it live →</a>"
    },
    {
        keywords: ["calculator", "super calculator", "ক্যালকুলেটর"],
        reply: "🧮 Super Calculator is a 14-in-1 PWA tool with EMI, BMI, Age, Length, Weight, Volume, Temperature, and Profit-Loss calculators.<br><br>" +
            "<a href='super_calculator/super_calculator.html' target='_blank' rel='noopener noreferrer' style='color:var(--accent-cyan);'>Use it now →</a>"
    },
    {
        keywords: ["exam guide", "exam guide india", "education platform"],
        reply: "🎯 Exam Guide India is a free exam preparation platform for Indian students and job aspirants. It provides study materials, exam resources, important questions, and useful preparation content. Milan is actively working on expanding this project."
    },
    {
        keywords: ["banking book", "banking knowledge", "financial guide"],
        reply: "📘 Banking Knowledge Book is a complete Bengali guide covering banking products, accounts, loans, investments, EMI calculation, and interview Q&A. It's a great resource for anyone preparing for banking exams."
    },
    {
        keywords: ["bangla golpo", "golpo galaxy", "story website"],
        reply: "🌌 Bangla Golpo Galaxy is a Bengali story platform where users can read and enjoy stories. It has search functionality, dark mode, and a comment system powered by Cusdis."
    },

    // ==================== SKILLS ====================
    {
        keywords: ["skill", "skills", "tech stack", "technologies", "দক্ষতা", "টেকনোলজি"],
        reply: "🛠️ Milan's skills: HTML5, CSS3, JavaScript (ES6), Node.js, Express.js, REST API, SQLite, JWT, Git/GitHub, Termux, Render Deployment, PWA, QR Code, Excel, Team Management."
    },
    {
        keywords: ["python", "পাইথন"],
        reply: "Milan primarily uses JavaScript (Node.js/Express). He uses Python for basic scripts like sitemap generation."
    },
    {
        keywords: ["react", "frontend", "ui", "ux"],
        reply: "⚛️ Milan has experience with React and modern frontend development. He builds responsive, accessible, and performant user interfaces using React, Tailwind CSS, and Next.js."
    },
    {
        keywords: ["backend", "api", "server", "database"],
        reply: "🔧 For backend development, Milan uses Node.js with Express.js. He works with SQLite, MongoDB, and REST APIs. He also implements JWT authentication and deploys on Render."
    },

    // ==================== CONTACT ====================
    {
        keywords: ["contact", "email", "how to reach", "যোগাযোগ", "ইমেইল"],
        reply: "📧 You can contact Milan through the Contact Form on this portfolio. Please scroll down to the Contact section and send your message there. Milan will get back to you as soon as possible. 😊<br><br>" +
            "<a href='#contact' class='chat-contact-link' style='color:var(--accent-cyan); font-weight:600;'>📩 Go to Contact Form →</a>"
    },
    {
        keywords: ["job", "offer", "collaborate", "চাকরি"],
        reply: "Milan is open to job offers and collaborations. Please use the Contact Form to send your proposal."
    },

    // ==================== TUTORIALS ====================
    {
        keywords: ["tutorial", "tutorials", "learn", "guide", "course", "টিউটোরিয়াল", "শিখতে"],
        reply: "📝 Milan's free tutorials:<br><br>" +
            "1. <b>Termux Backend Series</b> — Learn backend on mobile<br>" +
            "2. <b>Dark Mode Toggle</b> — CSS variables trick<br>" +
            "3. <b>Bilingual Toggle</b> — Multi-language support<br>" +
            "4. <b>Multi Calculator Build</b> — 7 calculators in one page<br><br>" +
            "All available in the Blog section above!"
    },
    {
        keywords: ["termux", "terminal", "mobile dev", "টার্মাক্স"],
        reply: "📱 To install packages in Termux:<br><br>" +
            "<code>pkg update -y && pkg upgrade -y</code><br><br>" +
            "<code>pkg install nodejs -y</code><br><br>" +
            "Read the full Termux series:<br>" +
            "<a href='blog/termux_index.html' target='_blank' rel='noopener noreferrer' style='color:var(--accent-cyan);'>Termux Series →</a>"
    },
    {
        keywords: ["git", "github", "push", "commit"],
        reply: "🔧 Basic Git commands:<br><br>" +
            "<code>git add -A</code><br>" +
            "<code>git commit -m \"message\"</code><br>" +
            "<code>git push origin main</code><br>" +
            "<code>git pull origin main</code><br><br>" +
            "See the full cheat sheet:<br>" +
            "<a href='blog/termux_all_command.html' target='_blank' rel='noopener noreferrer' style='color:var(--accent-cyan);'>Command Cheat Sheet →</a>"
    },
    {
        keywords: ["blog", "blog post", "ব্লগ"],
        reply: "📝 Milan's blog posts are available in the Blog section above. Topics include Termux, Web Dev, Dark Mode, and more."
    },

    // ==================== CAPABILITIES ====================
    {
        keywords: ["what can you tell", "your capabilities"],
        reply: "I can tell you about Milan's projects, skills, tutorials, and contact info. I can also help with basic Termux and Git commands. What would you like to know?"
    },

    // ==================== FUN ====================
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

    // ==================== INTERVIEW QUESTIONS ====================
    {
        keywords: ["interview", "background", "tell me about yourself", "yourself"],
        reply: "👤 About Me:<br><br>" +
            "I'm Milan Biswas, a B.Sc graduate (2021) and ITI COPA trainee. " +
            "I build full-stack web applications entirely from my mobile phone using Termux. " +
            "I'm passionate about creating free Bengali resources to help beginners learn coding without expensive courses or laptops."
    },
    {
        keywords: ["why should we hire you", "why you", "strength", "strengths"],
        reply: "💪 My Strengths:<br><br>" +
            "1. <b>Self-taught & Resourceful:</b> I learned full-stack development on my own, using just a mobile phone.<br><br>" +
            "2. <b>Problem Solver:</b> I built AadimVault and a complete Shop Manager System from scratch.<br><br>" +
            "3. <b>Teacher & Communicator:</b> I write free Bengali tutorials, explaining complex topics in simple words.<br><br>" +
            "4. <b>Real Projects:</b> I don't just know theory — I have multiple live projects deployed on Render and GitHub Pages."
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
    },

    // ==================== NEW: CURRENT WORK & PLANS ====================
    {
        keywords: ["current work", "now", "currently doing", "বর্তমান কাজ"],
        reply: "🔥 Currently, Milan is focusing on expanding Exam Guide India and building the AadimVault Series blog. He is also learning advanced DSA and system design to become a better full-stack developer."
    },
    {
        keywords: ["open source", "contribute", "community"],
        reply: "🌍 Milan is passionate about open source and community learning. He shares free Bengali tutorials and resources to help others start their coding journey. He plans to contribute to more open-source projects in the future."
    },
    {
        keywords: ["aadim vault series", "series", "blog series"],
        reply: "📝 The AadimVault Series is a blog series where Milan shares his journey of building a global heritage platform from scratch. It covers everything from planning, development, deployment, and lessons learned — all in Bengali and English."
    }
];

// ============================================================
// FALLBACK RESPONSE
// ============================================================
const fallbackReply =
    "🤖 I'm sorry, I don't have an answer for that yet. Please contact Milan through the Contact Form below, and he'll get back to you!";

// ============================================================
// FIND REPLY
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

// ============================================================
// TOGGLE CHAT (Fixed: Adds open class and body class)
// ============================================================
let chatOpen = false;

function toggleChat() {
    const chatWindow = document.getElementById("ai-chat-window");
    const body = document.body;
    if (!chatWindow) return;

    chatOpen = !chatOpen;
    chatWindow.classList.toggle("open", chatOpen);
    body.classList.toggle("chat-open", chatOpen);
}

// ============================================================
// SUGGESTED QUESTION
// ============================================================
function askSuggested(question) {
    const input = document.getElementById("ai-chat-input");
    if (!input) return;
    input.value = question;
    sendMessage();
}

// ============================================================
// SEND MESSAGE
// ============================================================
async function sendMessage() {
    const input = document.getElementById("ai-chat-input");
    const messagesDiv = document.getElementById("ai-chat-messages");
    if (!input || !messagesDiv) return;

    const message = input.value.trim();
    if (!message) return;

    // User message
    const userMessage = document.createElement("div");
    userMessage.className = "ai-message user";
    userMessage.textContent = message;
    messagesDiv.appendChild(userMessage);
    input.value = "";
    messagesDiv.scrollTop = messagesDiv.scrollHeight;

    // Typing indicator
    const typingId = "typing-" + Date.now();
    const typingMessage = document.createElement("div");
    typingMessage.className = "ai-message bot";
    typingMessage.id = typingId;
    typingMessage.textContent = "⏳ Typing...";
    messagesDiv.appendChild(typingMessage);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;

    await new Promise(resolve => setTimeout(resolve, 1000));

    const reply = findReply(message) || fallbackReply;
    const typingElement = document.getElementById(typingId);
    if (typingElement) typingElement.remove();

    const botMessage = document.createElement("div");
    botMessage.className = "ai-message bot";
    botMessage.innerHTML = reply;
    messagesDiv.appendChild(botMessage);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

// ============================================================
// ENTER KEY SUPPORT
// ============================================================
document.addEventListener("DOMContentLoaded", function() {
    const input = document.getElementById("ai-chat-input");
    if (input) {
        input.addEventListener("keydown", function(event) {
            if (event.key === "Enter" && !event.shiftKey) {
                event.preventDefault();
                sendMessage();
            }
        });
    }
});

// ============================================================
// DRAGGABLE CHAT BUTTON (Touch + Mouse)
// ============================================================
(function() {
    const button = document.getElementById("ai-chat-btn");
    if (!button) return;

    let isDragging = false;
    let startX, startY, startLeft, startTop;

    // Mouse events
    const onMouseDown = (e) => {
        startX = e.clientX;
        startY = e.clientY;
        const rect = button.getBoundingClientRect();
        startLeft = rect.left;
        startTop = rect.top;
        isDragging = false;

        document.addEventListener("mousemove", onMouseMove);
        document.addEventListener("mouseup", onMouseUp);
        e.preventDefault();
    };

    const onMouseMove = (e) => {
        const deltaX = e.clientX - startX;
        const deltaY = e.clientY - startY;
        if (Math.abs(deltaX) > 5 || Math.abs(deltaY) > 5) {
            isDragging = true;
            button.style.transition = "none";
            button.style.top = (startTop + deltaY) + "px";
            button.style.left = (startLeft + deltaX) + "px";
            button.style.right = "auto";
        }
    };

    const onMouseUp = () => {
        document.removeEventListener("mousemove", onMouseMove);
        document.removeEventListener("mouseup", onMouseUp);
        if (!isDragging) toggleChat();
        button.style.transition = "transform 0.2s";
    };

    // Touch events
    const onTouchStart = (e) => {
        const touch = e.touches[0];
        startX = touch.clientX;
        startY = touch.clientY;
        const rect = button.getBoundingClientRect();
        startLeft = rect.left;
        startTop = rect.top;
        isDragging = false;
    };

    const onTouchMove = (e) => {
        if (startX === undefined) return;
        const touch = e.touches[0];
        const deltaX = touch.clientX - startX;
        const deltaY = touch.clientY - startY;
        if (Math.abs(deltaX) > 5 || Math.abs(deltaY) > 5) {
            isDragging = true;
            e.preventDefault();
            button.style.transition = "none";
            button.style.top = (startTop + deltaY) + "px";
            button.style.left = (startLeft + deltaX) + "px";
            button.style.right = "auto";
        }
    };

    const onTouchEnd = () => {
        if (!isDragging) toggleChat();
        startX = undefined;
        startY = undefined;
        isDragging = false;
        button.style.transition = "transform 0.2s";
    };

    button.addEventListener("mousedown", onMouseDown);
    button.addEventListener("touchstart", onTouchStart, { passive: false });
    button.addEventListener("touchmove", onTouchMove, { passive: false });
    button.addEventListener("touchend", onTouchEnd);
})();
