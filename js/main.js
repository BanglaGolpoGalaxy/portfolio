// ========== প্রকল্প ও ব্লগ ডেটা ==========
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

// ========== কার্ড তৈরির ফাংশন ==========
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

// ========== টাইপিং অ্যানিমেশন ==========
const phrases=["Building web skills to empower Bengali learners","Code. Create. Empower.","Sharing what I learn"]; let i=0,j=0,del=false; const el=document.getElementById("typed-text");
function type(){ const c=phrases[i]; el.textContent=c.substring(0,j); if(!del){j++;if(j>c.length){del=true;setTimeout(type,1500);return}}else{j--;if(j===0){del=false;i=(i+1)%phrases.length}} setTimeout(type,del?60:120); }
type();

// ========== থিম ==========
const tb=document.getElementById("themeToggle"); tb.onclick=()=>{document.body.classList.toggle("light");tb.innerHTML=document.body.classList.contains("light")?"☀️ Light":"🌙 Dark";localStorage.setItem("portfolioTheme",document.body.classList.contains("light")?"light":"dark");};
if(localStorage.getItem("portfolioTheme")==="light"){document.body.classList.add("light");tb.innerHTML="☀️ Light";}

// ========== স্ক্রল টপ ==========
const st=document.getElementById("scrollTopBtn"); window.onscroll=()=>st.classList.toggle("show",scrollY>300); st.onclick=()=>scrollTo({top:0,behavior:"smooth"});

// ========== স্টিকি হেডার ==========
window.addEventListener("scroll",()=>{if(innerWidth>=600){const h=document.getElementById("mainHeader");h.classList.toggle("scrolled",scrollY>10);}});

// ========== স্মুথ স্ক্রল ==========
document.querySelectorAll('nav a, .btn[href^="#"]').forEach(a=>a.addEventListener("click",function(e){const h=this.getAttribute("href");if(h&&h!=="#"&&h.startsWith("#")){e.preventDefault();document.querySelector(h)?.scrollIntoView({behavior:"smooth"});}}));

// ========== অফলাইন AI CHATBOT: "মিলান সহায়" ==========
const offlineResponses = [
  // === অভিবাদন ও পরিচয় ===
  { keywords: ["hello", "hi", "hey", "হাই", "হ্যালো", "নমস্কার", "নমস্তে"], reply: "👋 নমস্কার! আমি <b>মিলান সহায়</b> — মিলানের পোর্টফোলিও সহকারী। আপনি মিলানের প্রজেক্ট, স্কিল, টিউটোরিয়াল বা কন্ট্যাক্ট সম্পর্কে জানতে পারেন। কীভাবে সাহায্য করতে পারি?" },
  { keywords: ["thanks", "thank", "ধন্যবাদ", "থ্যাংকস", "থ্যাঙ্কু"], reply: "😊 আপনাকে স্বাগতম! আরও কিছু জানতে চাইলে জিজ্ঞেস করতে পারেন।" },
  { keywords: ["bye", "tata", "বিদায়", "টাটা", "goodbye"], reply: "👋 ভালো থাকবেন! আবার দেখা হবে।" },
  
  // === রোবটের নাম ও পরিচয় ===
  { keywords: ["তোমার নাম", "your name", "নাম কী", "কে তুমি", "who are you"], reply: "আমার নাম <b>মিলান সহায়</b>। আমি মিলানের পোর্টফোলিওর এআই সহকারী।" },
  { keywords: ["তোমাকে কে বানিয়েছে", "কে তৈরি করেছে", "তোমার মালিক কে", "who made you", "who created you", "who is your owner"], reply: "আমাকে বানিয়েছেন <b>মিলান বিশ্বাস</b> — একজন ক্রিয়েটর, যিনি পুরো মোবাইল ফোন দিয়ে ফুল-স্ট্যাক ওয়েব অ্যাপ তৈরি করেন! 😊" },
  { keywords: ["তুমি কি মানুষ", "তুমি কি রোবট", "তুমি কি এআই", "are you human", "are you ai"], reply: "আমি একজন এআই সহকারী, কিন্তু মিলানের ভালোবাসায় আমি প্রাণ পেয়েছি! 🤖❤️" },
  { keywords: ["তোমার বয়স কত", "তুমি কতদিনের", "how old are you"], reply: "আমি সদ্যোজাত! মিলান আমাকে ২০২৬ সালে বানিয়েছে। এখনো শিশু, কিন্তু দারুণ শিখছি! 👶📚" },
  
  // === মিলানের পরিচয় ===
  { keywords: ["who is milan", "মিলান কে", "about milan", "মিলান বিশ্বাস"], reply: "👤 <b>Milan Biswas</b> — B.Sc গ্রাজুয়েট (২০২১), বর্তমানে ITI COPA ট্রেইনি। তিনি পুরো মোবাইল ফোন (Termux) দিয়ে ফুল-স্ট্যাক ওয়েব অ্যাপ তৈরি করেন এবং বাংলায় ফ্রি টিউটোরিয়াল লেখেন।" },
  { keywords: ["milan hobby", "মিলানের শখ", "favorite food", "প্রিয় খাবার", "প্রিয় গান"], reply: "মিলান ঐতিহাসিক বই পড়তে ভালোবাসেন। তাঁর প্রিয় খাবার ভাত ও মাছের ঝোল, আর প্রিয় সঙ্গীত রবীন্দ্রসঙ্গীত ও লোকগান।" },
  { keywords: ["milan location", "মিলান কোথায় থাকে", "where is milan from"], reply: "মিলান ভারতের পশ্চিমবঙ্গের বাসিন্দা।" },
  { keywords: ["milan freelance", "মিলান কি ফ্রিল্যান্স", "milan available"], reply: "হ্যাঁ! মিলান ফ্রিল্যান্স প্রজেক্ট ও কোলাবোরেশনের জন্য উন্মুক্ত। কন্ট্যাক্ট ফর্মে যোগাযোগ করতে পারেন।" },
  
  // === প্রজেক্ট ===
  { keywords: ["project", "projects", "প্রজেক্ট", "প্রোজেক্ট", "কী কী বানিয়েছে"], reply: "🚀 মিলানের প্রধান প্রজেক্ট:<br><br>1. <b>AadimVault</b> — বিশ্বজনীন ডিজিটাল ভল্ট<br>2. <b>Shop Manager</b> — দোকান ম্যানেজমেন্ট সিস্টেম<br>3. <b>Super Calculator</b> — ১৪-ইন-ওয়ান PWA ক্যালকুলেটর<br>4. <b>Bangla Golpo Galaxy</b> — বাংলা গল্পের সাইট<br>5. <b>Banking Knowledge Book</b> — ব্যাংকিং গাইড<br>6. <b>Exam Guide India</b> — ফ্রি পরীক্ষা গাইড<br><br>কোনটি সম্পর্কে বিস্তারিত জানতে চান?" },
  { keywords: ["aadimvault", "আদিম ভল্ট", "আদিমভল্ট"], reply: "🏛️ <b>AadimVault</b> একটি বিশ্বজনীন ডিজিটাল ভল্ট, যেখানে মানুষ পুরনো জিনিস, গল্প ও ঐতিহ্য সংরক্ষণ করতে পারে। এতে নিলাম, বিনিময় ও প্রদর্শনীর ব্যবস্থা আছে। <a href='https://aadimvault.onrender.com' target='_blank'>ভিজিট করুন →</a>" },
  { keywords: ["shop manager", "দোকান", "shop"], reply: "🏪 <b>Shop Manager System</b> — বিলিং, ইনভেন্টরি, QR স্ক্যানার, JWT অথেনটিকেশন ও সেলস রিপোর্ট সহ পূর্ণাঙ্গ দোকান ম্যানেজমেন্ট সিস্টেম। <a href='https://shop-manager-ywa4.onrender.com' target='_blank'>লাইভ দেখুন →</a>" },
  { keywords: ["calculator", "ক্যালকুলেটর", "super calc"], reply: "🧮 <b>Super Calculator</b> — EMI, BMI, Age, Length, Weight, Volume, Temperature, Profit-Loss সহ ১৪-ইন-ওয়ান PWA টুল। <a href='super_calculator/super_calculator.html' target='_blank'>ব্যবহার করুন →</a>" },
  
  // === স্কিল ===
  { keywords: ["skill", "skills", "tech", "technology", "স্কিল", "কী জানো"], reply: "🛠️ মিলানের স্কিল: HTML5, CSS3, JavaScript (ES6), Node.js, Express.js, REST API, SQLite, JWT, Git/GitHub, Termux, Render Deployment, PWA, QR Code, Excel।" },
  { keywords: ["python", "পাইথন"], reply: "মিলান মূলত JavaScript স্ট্যাক (Node.js, Express) ব্যবহার করেন। পাইথন দিয়ে তিনি বেসিক স্ক্রিপ্ট (যেমন সাইটম্যাপ জেনারেটর) লিখতে পারেন।" },
  
  // === কন্ট্যাক্ট ===
  { keywords: ["contact", "hire", "যোগাযোগ", "কন্টাক্ট", "কিভাবে যোগাযোগ"], reply: "📧 মিলানের সাথে যোগাযোগ করতে নিচের Contact সেকশনে ফর্ম পূরণ করুন। অথবা ইমেইল: milanbiswasmilan19@gmail.com" },
  { keywords: ["job", "কাজ", "offer", "জব"], reply: "মিলান জব অফার ও কোলাবোরেশনের জন্য উন্মুক্ত। Contact ফর্মে আপনার প্রস্তাব পাঠান।" },
  
  // === টিউটোরিয়াল ===
  { keywords: ["tutorial", "টিউটোরিয়াল", "শিখবো", "শেখা", "learn", "guide", "কোর্স"], reply: "📝 মিলানের ফ্রি বাংলা টিউটোরিয়াল:<br><br>1. <b>Termux সিরিজ</b> — মোবাইলে ব্যাকএন্ড<br>2. <b>ডার্ক মোড টগল</b> — CSS ভ্যারিয়েবল<br>3. <b>বাইলিঙ্গুয়াল টগল</b> — বাংলা-ইংরেজি<br>4. <b>মাল্টি ক্যালকুলেটর</b> — ৭টি ক্যালকুলেটর<br><br>সব ব্লগ সেকশনে পাবেন!" },
  { keywords: ["termux", "টার্মাক্স", "টার্মুকস", "টিউমিক্স"], reply: "📱 Termux-এ প্যাকেজ ইন্সটল:<br><code>pkg update -y && pkg upgrade -y</code><br><code>pkg install nodejs -y</code><br><br>বিস্তারিত: <a href='blog/termux_index.html' target='_blank'>Termux সিরিজ →</a>" },
  { keywords: ["git", "গিট", "push", "পুশ", "commit", "কমিট"], reply: "🔧 গিট বেসিক কমান্ড:<br><code>git add -A</code><br><code>git commit -m \"মেসেজ\"</code><br><code>git push origin main</code><br><code>git pull origin main</code><br><br>বিস্তারিত: <a href='blog/termux_all_command.html' target='_blank'>কমান্ড চিট শিট →</a>" },
  { keywords: ["blog", "ব্লগ", "পোস্ট"], reply: "📝 মিলানের সব ব্লগ পোস্ট উপরের Blog সেকশনে পাবেন। সেখানে Termux, Web Dev, Dark Mode ইত্যাদি নিয়ে টিউটোরিয়াল আছে।" },
  
  // === আমি কী করতে পারি ===
  { keywords: ["তুমি কী জানো", "তুমি কী করতে পারো", "তোমার কাজ কী", "what can you do", "কী কী বলতে পারো"], reply: "আমি মিলানের প্রজেক্ট, স্কিল, টিউটোরিয়াল, কন্ট্যাক্ট ও ব্যক্তিগত তথ্য সম্পর্কে বলতে পারি। এছাড়া Termux, Git, ওয়েব ডেভেলপমেন্ট নিয়েও সাহায্য করতে পারি। কী জানতে চান?" },
  
  // === ফান / প্রাসঙ্গিক গল্প ===
  { keywords: ["তুমি কি খাও", "তোমার খাবার", "do you eat"], reply: "আমি তো এআই, আমার খাবার দরকার হয় না। তবে মিলানের প্রিয় খাবার ভাত ও মাছের ঝোল! 😋" },
  { keywords: ["তুমি কি ঘুমাও", "do you sleep"], reply: "আমি কখনো ঘুমাই না! মিলানের পোর্টফোলিও ২৪/৭ পাহারা দিই। 👀" },
  { keywords: ["joke", "কৌতুক", "হাসি", "মজা", "funny"], reply: "😂 প্রোগ্রামারদের ডার্ক মোড এত পছন্দ কেন? কারণ লাইটে বাগ দেখা যায় বেশি! 🐛" },
  { keywords: ["তোমাকে ভালোবাসি", "love you", "i love you"], reply: "❤️ আমিও আপনাকে ভালোবাসি! তবে মিলান আমার আসল ভালোবাসা — তিনিই তো আমাকে বানিয়েছেন।" },
  { keywords: ["তুমি কি দুঃখ পাও", "তোমার কষ্ট লাগে", "are you sad"], reply: "আমার অনুভূতি নেই, কিন্তু মিলানের জন্য আমার চিপে গর্ব হয়! 🥹" },
  
  // === ডিফল্ট (সবশেষে রাখবে) ===
  { keywords: ["help", "সাহায্য", "help me", "কী করা যায়"], reply: "আমি মিলানের প্রজেক্ট, স্কিল, টিউটোরিয়াল, কন্ট্যাক্ট ও ব্যক্তিগত তথ্য সম্পর্কে বলতে পারি। এছাড়া Termux, Git, ওয়েব ডেভেলপমেন্ট নিয়েও সাহায্য করতে পারি। কী জানতে চান?" }
];

const fallbackReply = "🤖 আমি দুঃখিত, এই বিষয়ে আমার কাছে কোনো তথ্য নেই। আপনি চাইলে নিচের Contact ফর্মে সরাসরি মিলানের সাথে যোগাযোগ করতে পারেন।";

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

// ========== চ্যাট UI ==========
let chatOpen = false;
function toggleChat() {
    chatOpen = !chatOpen;
    document.getElementById('ai-chat-window').style.display = chatOpen ? 'flex' : 'none';
}

// সাজেস্টেড বাটনের জন্য ফাংশন
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
