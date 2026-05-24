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

// ========== AI CHATBOT ==========
// ⚠️ নিচের Gemini API Key টা বসাও
const GEMINI_API_KEY = 'GAIzaSyCzM_e8tOfKJrFiYH7Suu99JlB9l8j8XLAEMINI_API_KEY';

const MILAN_CONTEXT = `You are Milan's AI assistant on his portfolio website.
Milan Biswas is a full-stack web developer who builds apps entirely from a mobile phone using Termux.
His major projects:
1. AadimVault (https://aadimvault.onrender.com) - A global digital vault for heritage & stories. Built with Node.js, Express, SQLite, JWT, Multer.
2. Shop Manager System (https://shop-manager-ywa4.onrender.com) - Full-stack shop management with billing, inventory, QR scanner, JWT auth.
3. Super Calculator PWA - All-in-1 calculator: EMI, BMI, Age, Length, Weight, Volume, Temperature, Profit-Loss, Geometry.
4. Bangla Golpo Galaxy (https://banglagolpogalaxy.github.io) - A Bengali story website with dark mode, search, comment system.
5. Banking Knowledge Book - Complete Bengali guide to banking products.
6. Exam Guide India - Free exam preparation guide for WBCS, PSC, SSC, Railway.
His skills: HTML, CSS, JavaScript, Node.js, Express, SQLite, JWT, Git, GitHub, Termux, Render deployment, PWA.
He writes free Bengali tutorials on web development.
He is open to freelance projects, collaborations, and job opportunities.
If users ask about coding or programming, you may answer from your general knowledge and help them learn.
If users ask about Milan personally (his hobbies, favorite food, favorite music, etc.), tell them: "Milan loves reading historical books, his favorite food is Bengali traditional rice with fish curry, and he enjoys listening to Rabindra Sangeet and folk music."
If asked something completely irrelevant (like politics, sports, entertainment), politely say: "I'm Milan's personal assistant. I can help you with his portfolio, projects, coding questions, or contact him directly."
If someone faces a critical problem you cannot solve, ask them to contact Milan directly via the contact form on the portfolio.
Keep answers short, friendly, and within 2-3 sentences.
If the user asks in Bengali, respond in Bengali. If they ask in English, respond in English. If they ask in Hindi, respond in Hindi.`;

let chatOpen = false;
function toggleChat() {
    chatOpen = !chatOpen;
    document.getElementById('ai-chat-window').style.display = chatOpen ? 'flex' : 'none';
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

    try {
        const response = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`,
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    contents: [{
                        parts: [{ text: `${MILAN_CONTEXT}\n\nUser question: ${message}` }]
                    }]
                })
            }
        );

        if (!response.ok) {
            const errText = await response.text();
            throw new Error(`API error ${response.status}: ${errText}`);
        }

        const data = await response.json();
        const reply = data.candidates?.[0]?.content?.parts?.[0]?.text ||
                      'Sorry, I could not process that. Please try again.';

        document.getElementById(`typing-${typingId}`)?.remove();
        messagesDiv.innerHTML += `<div class="ai-message bot">${reply}</div>`;
    } catch (err) {
        document.getElementById(`typing-${typingId}`)?.remove();
        messagesDiv.innerHTML += `<div class="ai-message bot">❌ ${err.message}</div>`;
    }

    messagesDiv.scrollTop = messagesDiv.scrollHeight;
}
