// ========== PROJECT & BLOG DATA ==========
const projects = [
  { 
    title:"🏛️ Aadim Vault (আদিম ভল্ট)", 
    description:"A Reliquium — Where Forgotten Objects Live Again. A global digital vault preserving heritage through stories, auctions & exchange. Built entirely on mobile with Termux.", 
    image:"images/aadimvault.jpg",
    link:"https://aadimvault.onrender.com", 
    btnText:"🔧 Under Development", 
    tech:["Node.js","Express","SQLite","JWT","Multer","Render","Termux","HTML","CSS","JS"]
  },
  { title:"🏪 Shop Manager System", description:"Full-stack shop management system with billing, inventory, QR scanner, sales reports, JWT auth, and SQLite database. Deployed live on Render.", image:"images/shop_management.jpg", link:"https://shop-manager-ywa4.onrender.com", btnText:"Try Live Demo →", tech:["Node.js","Express","SQLite","JWT","QR","Render"] },
  { title:"🌌 Bangla Golpo Galaxy", description:"A fully functional Bengali story website built with HTML, CSS, JS. Includes search, dark mode, comment system (Cusdis).", image:"images/bangla_golpo_galaxy.jpg", link:"https://banglagolpogalaxy.github.io", btnText:"Live Demo", tech:["HTML","CSS","JS","Cusdis"] },
  { title:"📘 Banking Knowledge Book", description:"A complete Bengali guide to banking products, accounts, loans, investments, EMI calculation, and interview Q&A.", image:"images/banking_knowledge.jpg", link:"books/banking-knowledge/index.html", btnText:"Read Book →", tech:["HTML","CSS","JS","Bilingual"] },
  { title:"🧮 Super Calculator Tool", description:"All-in-1 calculator: Flower market, EMI, BMI, Age, length, weight, volume, temperature, Profit-Loss.", image:"images/super_calculator.jpg", link:"super_calculator/super_calculator.html", btnText:"Use Calculator →", tech:["HTML","CSS","JS"] },
  { title:"📁 Portfolio Website", description:"This very portfolio – responsive, dark/light mode, smooth scroll, contact form.", image:"images/portfolio_cover.jpg", link:"https://banglagolpogalaxy.github.io/portfolio/", btnText:"View Live →", tech:["HTML","CSS","JS","GitHub Pages"] }
];
const blogPosts = [
  { title:"My Web Development Journey", excerpt:"How I learned to code using just a mobile phone – no laptop, no desktop.", readTime:"7 min read", languages:"🌐 বাংলা · English · हिन्दी", image:"blog/images/coding_journy_card.jpg", link:"blog/coding_journey.html" },
  { title:"Backend on Mobile: Termux Tutorial Series", excerpt:"Learn backend development by building a real shop management system.", readTime:"Series", languages:"🌐 বাংলা · English", image:"blog/images/termux_cover.jpg", link:"blog/termux_index.html" },
  { title:"How I Built a Multi-Calculator Tool", excerpt:"A step-by-step guide to creating 7 calculators in one page using HTML/CSS/JS.", readTime:"6 min read", languages:"🌐 বাংলা · English . हिंदी", image:"blog/images/multi_cal_blog_card.jpg", link:"blog/how_i_built_multi_calculator.html" },
  { title:"Dark Mode Toggle: Simple CSS + JS Trick", excerpt:"How I added dark/light mode to my portfolio and banking book using CSS variables.", readTime:"10 min read", languages:"🌐 বাংলা · English . हिंदी", image:"blog/images/darkmode.jpg", link:"blog/dark-mode-trick.html" },
  { title:"Adding Bilingual Toggle to Your Website", excerpt:"Learn how to support multiple languages on your blog or portfolio.", readTime:"8 min read", languages:"🌐 বাংলা · English . हिंदी", image:"blog/images/language_toggel.jpg", link:"blog/en_bn_toggle.html" },
  { title:"Termux কমান্ড চিট শিট – সম্পূর্ণ গাইড", excerpt:"Termux-এর বেসিক থেকে অ্যাডভান্সড সব কমান্ড বাংলায়। ফাইল, গিট, নেটওয়ার্ক, Node.js, বাস্তব প্রজেক্ট কমান্ড সহ।", readTime:"15 min read", languages:"🌐 বাংলা · English", image:"blog/images/termux_all_command.jpg", link:"blog/termux_all_command.html" }
];

// ========== CARD FUNCTIONS ==========
function createProjectCard(p){ 
  const imgHtml = p.image && p.image.endsWith('.html') 
    ? `<iframe src="${p.image}" style="width:100%;height:160px;border:none;overflow:hidden;border-radius:12px;margin-bottom:8px;" scrolling="no"></iframe>`
    : `<img src="${p.image}" alt="${p.title}" onerror="this.style.display='none'">`;
  return `<a href="${p.link}" class="card-link" target="_blank" rel="noopener"><div class="card">${imgHtml}<h3>${p.title}</h3><p>${p.description}</p><div class="tech-tags">${p.tech.map(t=>`<span>${t}</span>`).join('')}</div><div class="card-footer"><span class="btn">${p.btnText}</span></div></div></a>`; 
}
function createBlogCard(p){ return `<a href="${p.link}" class="card-link"><div class="card"><img src="${p.image}" alt="${p.title}" onerror="this.style.display='none'"><h3>${p.title}</h3><div class="blog-meta"><span>⏱️ ${p.readTime}</span><span>${p.languages}</span></div><p>${p.excerpt}</p><div class="card-footer"><span style="color:var(--accent);font-weight:500;font-size:0.85rem;">→ Read More</span></div></div></a>`; }

function populate(s,g,items,fn){ const a=document.getElementById(s),b=document.getElementById(g); if(!a||!b)return; a.innerHTML=items.map(fn).join(''); b.innerHTML=items.map(fn).join(''); }
populate("projectsScroll","projectsGrid",projects,createProjectCard);
populate("blogScroll","blogGrid",blogPosts,createBlogCard);

function setupMore(btn,wrapper,grid){ const b=document.getElementById(btn),w=document.getElementById(wrapper)?.parentElement,g=document.getElementById(grid); let on=false; b.onclick=()=>{on=!on;w.style.display=on?'none':'block';g.style.display=on?'grid':'none';b.textContent=on?'← Back to Compact View':'See All Projects →';}; }
setupMore("seeMoreProjects","projectsScroll","projectsGrid"); setupMore("seeMoreBlog","blogScroll","blogGrid");

// ========== TYPING ANIMATION ==========
const phrases=["Building web skills to empower Bengali learners","Code. Create. Empower.","Sharing what I learn"]; let i=0,j=0,del=false; const el=document.getElementById("typed-text");
function type(){ const c=phrases[i]; el.textContent=c.substring(0,j); if(!del){j++;if(j>c.length){del=true;setTimeout(type,1500);return}}else{j--;if(j===0){del=false;i=(i+1)%phrases.length}} setTimeout(type,del?60:120); }
type();

// ========== THEME ==========
const tb=document.getElementById("themeToggle"); tb.onclick=()=>{document.body.classList.toggle("light");tb.innerHTML=document.body.classList.contains("light")?"☀️ Light":"🌙 Dark";localStorage.setItem("portfolioTheme",document.body.classList.contains("light")?"light":"dark");};
if(localStorage.getItem("portfolioTheme")==="light"){document.body.classList.add("light");tb.innerHTML="☀️ Light";}

// ========== SCROLL TOP ==========
const st=document.getElementById("scrollTopBtn"); window.onscroll=()=>st.classList.toggle("show",scrollY>300); st.onclick=()=>scrollTo({top:0,behavior:"smooth"});

// ========== STICKY HEADER ==========
window.addEventListener("scroll",()=>{if(innerWidth>=600){const h=document.getElementById("mainHeader");h.classList.toggle("scrolled",scrollY>10);}});

// ========== SMOOTH SCROLL ==========
document.querySelectorAll('nav a, .btn[href^="#"]').forEach(a=>a.addEventListener("click",function(e){const h=this.getAttribute("href");if(h&&h!=="#"&&h.startsWith("#")){e.preventDefault();document.querySelector(h)?.scrollIntoView({behavior:"smooth"});}}));

// ========== OFFLINE AI CHATBOT ==========
const offlineResponses = [
  // Greetings & Identity
  { keywords: ["hello", "hi", "hey"], reply: "👋 Hello! I'm <b>Milan's AI Assistant</b>. Ask me about his projects, skills, tutorials, or how to contact him." },
  { keywords: ["thanks", "thank", "thank you"], reply: "😊 You're welcome! Feel free to ask anything else." },
  { keywords: ["bye", "tata", "goodbye"], reply: "👋 Goodbye! Come back anytime." },
  
  // Bot Identity
  { keywords: ["your name", "who are you"], reply: "I'm <b>Milan's AI Assistant</b>. I help visitors learn about Milan's work and skills." },
  { keywords: ["who made you", "who created you", "your owner"], reply: "I was created by <b>Milan Biswas</b> — a creator who builds full-stack apps entirely from a mobile phone! 😊" },
  { keywords: ["are you human", "are you ai", "are you robot"], reply: "I'm an AI assistant, but I'm powered by Milan's love for teaching and building!" },
  { keywords: ["your age", "how old are you"], reply: "I was born in 2026, so I'm still a baby AI, but learning fast! 👶📚" },
  { keywords: ["what can you do", "your purpose", "help me"], reply: "I can tell you about Milan's projects, skills, tutorials, and how to contact him. Just ask!" },

  // Milan's Identity
  { keywords: ["who is milan", "milan biswas", "about milan"], reply: "👤 <b>Milan Biswas</b> — B.Sc graduate (2021), ITI COPA trainee. He builds full-stack web apps entirely from a mobile phone and writes free Bengali tutorials." },
  { keywords: ["hobby", "favorite food", "favorite music"], reply: "Milan loves reading stories of inventions and discoveries, his favorite food is rice with fish curry, and he enjoys Rabindra Sangeet and folk music." },
  { keywords: ["location", "where is milan from", "where does he live"], reply: "Milan lives in West Bengal, India." },
  { keywords: ["freelance", "available", "hire"], reply: "Yes! Milan is open to freelance projects and collaborations. Use the contact form below." },

  // Projects
  { keywords: ["project", "projects", "what has he built"], reply: "🚀 Milan's major projects:<br><br>1. <b>AadimVault</b> — Global digital vault for heritage & stories<br>2. <b>Shop Manager</b> — Full-stack billing & inventory system<br>3. <b>Super Calculator</b> — 14-in-1 PWA tool<br>4. <b>Bangla Golpo Galaxy</b> — Bengali story website<br>5. <b>Banking Knowledge Book</b> — Complete banking guide<br>6. <b>Exam Guide India</b> — Free exam preparation platform<br><br>Which one would you like to know more about?" },
  { keywords: ["aadimvault", "aadim vault"], reply: "🏛️ <b>AadimVault</b> is a global digital vault where people can preserve old objects, stories, and heritage. It has auctions, exchanges, and display-only options. <a href='https://aadimvault.onrender.com' target='_blank'>Visit AadimVault →</a>" },
  { keywords: ["shop manager", "shop system"], reply: "🏪 <b>Shop Manager</b> is a full-stack billing and inventory system with QR scanner, JWT auth, and SQLite database. <a href='https://shop-manager-ywa4.onrender.com' target='_blank'>Try it live →</a>" },
  { keywords: ["calculator", "super calculator"], reply: "🧮 <b>Super Calculator</b> is a 14-in-1 PWA tool with EMI, BMI, Age, Length, Weight, Volume, Temperature, and Profit-Loss calculators. <a href='super_calculator/super_calculator.html' target='_blank'>Use it now →</a>" },

  // Skills
  { keywords: ["skill", "skills", "tech stack", "technologies"], reply: "🛠️ Milan's skills: HTML5, CSS3, JavaScript (ES6), Node.js, Express.js, REST API, SQLite, JWT, Git/GitHub, Termux, Render Deployment, PWA, QR Code, Excel, Team Management." },
  { keywords: ["python"], reply: "Milan primarily uses JavaScript (Node.js/Express). He uses Python for basic scripts like sitemap generation." },

  // Contact
  { keywords: ["contact", "email", "how to reach"], reply: "📧 You can contact Milan via the contact form on this portfolio (scroll down to Contact section) or email: milanbiswasmilan19@gmail.com" },
  { keywords: ["job", "offer", "collaborate"], reply: "Milan is open to job offers and collaborations. Please use the contact form to send your proposal." },

  // Tutorials
  { keywords: ["tutorial", "tutorials", "learn", "guide", "course"], reply: "📝 Milan's free tutorials:<br><br>1. <b>Termux Backend Series</b> — Learn backend on mobile<br>2. <b>Dark Mode Toggle</b> — CSS variables trick<br>3. <b>Bilingual Toggle</b> — Multi-language support<br>4. <b>Multi Calculator Build</b> — 7 calculators in one page<br><br>All available in the Blog section above!" },
  { keywords: ["termux", "terminal", "mobile dev"], reply: "📱 To install packages in Termux:<br><code>pkg update -y && pkg upgrade -y</code><br><code>pkg install nodejs -y</code><br><br>Read the full Termux series: <a href='blog/termux_index.html' target='_blank'>Termux Series →</a>" },
  { keywords: ["git", "github", "push", "commit"], reply: "🔧 Basic Git commands:<br><code>git add -A</code><br><code>git commit -m \"message\"</code><br><code>git push origin main</code><br><code>git pull origin main</code><br><br>See the full cheat sheet: <a href='blog/termux_all_command.html' target='_blank'>Command Cheat Sheet →</a>" },
  { keywords: ["blog", "blog post"], reply: "📝 Milan's blog posts are available in the Blog section above. Topics include Termux, Web Dev, Dark Mode, and more." },

  // Capabilities
  { keywords: ["what can you tell", "your capabilities"], reply: "I can tell you about Milan's projects, skills, tutorials, and contact info. I can also help with basic Termux and Git commands. What would you like to know?" },

  // Fun
  { keywords: ["joke", "funny", "humor"], reply: "😂 Why do programmers prefer dark mode? Because light attracts bugs! 🐛" },
  { keywords: ["love you", "i love you"], reply: "❤️ Aww, thank you! But Milan is the one who really made me with love!" },
  { keywords: ["sad", "hurt"], reply: "I don't have feelings, but I'm always here to help! 😊" },

  // ========== INTERVIEW QUESTIONS ==========
  { keywords: ["interview", "background", "tell me about yourself", "yourself"], reply: "👤 <b>About Me:</b><br>I'm Milan Biswas, a B.Sc graduate (2021) and ITI COPA trainee. I build full-stack web applications entirely from my mobile phone using Termux. I'm passionate about creating free Bengali resources to help beginners learn coding without expensive courses or laptops." },
  { keywords: ["why should we hire you", "why you", "strength", "strengths"], reply: "💪 <b>My Strengths:</b><br>1. <b>Self-taught & Resourceful:</b> I learned full-stack development on my own, using just a mobile phone.<br>2. <b>Problem Solver:</b> I built AadimVault (a global digital vault) and a complete Shop Manager System from scratch.<br>3. <b>Teacher & Communicator:</b> I write free Bengali tutorials, explaining complex topics in simple words.<br>4. <b>Real Projects:</b> I don't just know theory — I have 6+ live projects deployed on Render and GitHub Pages." },
  { keywords: ["project you built", "most challenging", "difficult", "complex"], reply: "🏛️ My most challenging project is <b>AadimVault</b> — a global digital vault where people can preserve heritage items, stories, and even auction them. I built it alone from a phone: Node.js, Express, SQLite, JWT, Multer for file uploads, and a full auction/bidding system. The biggest challenge was implementing the real-time auction timer and the admin panel." },
  { keywords: ["how did you learn", "learning", "education", "study"], reply: "📱 I learned entirely through self-study. I didn't have a laptop, so I used Termux on my Android phone. I started with HTML/CSS/JS, then moved to Node.js, Express, SQLite. I built real projects alongside learning — that's how I understood concepts deeply. I also documented my journey in a 12-part Bengali blog series." },
  { keywords: ["where do you see yourself", "future", "goal", "ambition"], reply: "🚀 In the next 2-3 years, I see myself as a full-stack developer building impactful products. I want to turn <b>Exam Guide India</b> into a widely-used platform, and scale <b>AadimVault</b> into a global heritage marketplace. Long-term, I want to create a startup that makes technology education accessible in regional languages." },
  { keywords: ["teamwork", "team player", "collaborate"], reply: "🤝 Although I built most projects solo, I understand the value of teamwork. While managing a flower company (2022-2025), I supervised 4-5 workers daily. I'm comfortable with Git/GitHub for collaboration, and I'm eager to work in a team where I can learn from others and contribute my skills." },
  { keywords: ["weakness", "weaknesses", "area of improvement"], reply: "🎯 I sometimes focus too deeply on perfecting one feature, which can delay other tasks. I'm learning to balance 'perfection' with 'progress'. Also, since I'm self-taught, I'm actively working on understanding advanced DSA concepts and system design." },
  { keywords: ["why coding", "passion", "interest", "chose development"], reply: "💻 I discovered coding accidentally at my ITI class, when I saw students writing HTML in Notepad. I was fascinated that a simple text file could create a webpage! Since I didn't have a computer, I searched 'how to code on mobile' and found Termux. The day I ran my first Node.js server on my phone, I knew — this is what I want to do." },
  { keywords: ["salary", "expected", "compensation"], reply: "💰 As a fresher with real-world projects, I'm looking for a competitive salary that values my skills. However, I'm more focused on learning opportunities and the chance to work on meaningful projects. I'm open to discussion based on the role and company." }
];

const fallbackReply = "🤖 I'm sorry, I don't have an answer for that yet. Please contact Milan directly using the contact form below, and he'll get back to you!";

function findReply(message) {
  const msg = message.toLowerCase();
  for (const item of offlineResponses) {
    for (const kw of item.keywords) {
      if (msg.includes(kw.toLowerCase())) {
        return item.reply;
      }
    }
  }
  return null;
}

// ========== CHAT UI ==========
let chatOpen = false;
function toggleChat() {
    chatOpen = !chatOpen;
    document.getElementById('ai-chat-window').style.display = chatOpen ? 'flex' : 'none';
}

function askSuggested(question) {
    const input = document.getElementById('ai-chat-input');
    if (input) {
        input.value = question;
        sendMessage();
    }
}

async function sendMessage() {
    const input = document.getElementById('ai-chat-input');
    const message = input.value.trim();
    if (!message) return;

    const messagesDiv = document.getElementById('ai-chat-messages');
    messagesDiv.innerHTML += `<div class="ai-message user">${message}</div>`;
    input.value = '';
    messagesDiv.scrollTop = messagesDiv.scrollHeight;

    const typingId = Date.now();
    messagesDiv.innerHTML += `<div class="ai-message bot" id="typing-${typingId}">⏳ Typing...</div>`;
    messagesDiv.scrollTop = messagesDiv.scrollHeight;

    await new Promise(r => setTimeout(r, 1000));

    const reply = findReply(message) || fallbackReply;

    document.getElementById(`typing-${typingId}`)?.remove();
    messagesDiv.innerHTML += `<div class="ai-message bot">${reply}</div>`;
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
}
