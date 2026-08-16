// ============================================================
// THEME TOGGLE
// ============================================================
const themeToggle = document.getElementById("themeToggle");
const body = document.body;

const savedTheme = localStorage.getItem("theme");
if (savedTheme === "light") {
  body.classList.add("light");
  themeToggle.textContent = "🌙";
}

themeToggle.addEventListener("click", () => {
  body.classList.toggle("light");
  const isLight = body.classList.contains("light");
  themeToggle.textContent = isLight ? "🌙" : "☀️";
  localStorage.setItem("theme", isLight ? "light" : "dark");
});

// ============================================================
// MOBILE MENU
// ============================================================
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", () => {
  navLinks.classList.toggle("open");
});

document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
  });
});

// ============================================================
// TYPING CODE
// ============================================================
const codeElement = document.getElementById("codeTyping");
const codeLines = [
  { text: 'const developer = {', type: 'keyword' },
  { text: '  name: "Milan Biswas",', type: 'string' },
  { text: '  role: "Web Developer",', type: 'role' },
  { text: '  passion: "Building for the Web",', type: 'string' },
  { text: '  available: true', type: 'keyword' },
  { text: '};', type: 'variable' }
];

let currentLine = 0,
  currentChar = 0,
  isDeleting = false,
  typingTimer;

function getHighlightedLine(lineObj) {
  let text = lineObj.text;
  if (lineObj.type === 'keyword') return `<span class="code-keyword">${text}</span>`;
  if (lineObj.type === 'string') return `<span class="code-string">${text}</span>`;
  if (lineObj.type === 'variable') return `<span class="code-variable">${text}</span>`;
  if (lineObj.type === 'role') return `<span class="code-role">${text}</span>`;
  return text;
}

function typeCode() {
  let fullText = '';
  for (let i = 0; i <= currentLine; i++) {
    const line = codeLines[i];
    if (i === currentLine) {
      const partial = line.text.substring(0, currentChar);
      fullText += getHighlightedLine({ ...line, text: partial });
    } else {
      fullText += getHighlightedLine(line);
    }
    if (i < codeLines.length - 1) fullText += '\n';
  }
  codeElement.innerHTML = fullText + '<span class="typing-cursor"></span>';

  if (!isDeleting && currentChar < codeLines[currentLine].text.length) {
    currentChar++;
    typingTimer = setTimeout(typeCode, 55);
    return;
  }
  if (!isDeleting && currentLine < codeLines.length - 1) {
    currentLine++;
    currentChar = 0;
    typingTimer = setTimeout(typeCode, 250);
    return;
  }
  if (!isDeleting) {
    typingTimer = setTimeout(() => { isDeleting = true; typeCode(); }, 2500);
    return;
  }
  if (isDeleting && currentChar > 0) {
    currentChar--;
    typingTimer = setTimeout(typeCode, 30);
    return;
  }
  if (isDeleting && currentLine > 0) {
    currentLine--;
    currentChar = codeLines[currentLine].text.length;
    typingTimer = setTimeout(typeCode, 100);
    return;
  }
  isDeleting = false;
  currentLine = 0;
  currentChar = 0;
  typingTimer = setTimeout(typeCode, 700);
}
typeCode();

// ============================================================
// COUNTERS
// ============================================================
const counters = document.querySelectorAll(".counter");
let countersStarted = false;

function animateCounter(el) {
  const target = Number(el.dataset.target);
  const suffix = el.dataset.suffix || "";
  const duration = 1600;
  const start = performance.now();

  function update(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const value = Math.floor(eased * target);
    el.textContent = value + suffix;
    if (progress < 1) requestAnimationFrame(update);
    else el.textContent = target + suffix;
  }
  requestAnimationFrame(update);
}

const statsSection = document.getElementById("statsSection");
const obs = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !countersStarted) {
        countersStarted = true;
        counters.forEach((c) => animateCounter(c));
        obs.unobserve(statsSection);
      }
    });
  },
  { threshold: 0.35 }
);
obs.observe(statsSection);

// ============================================================
// THREE.JS – 3D
// ============================================================
const container = document.getElementById("three-container");
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  50,
  container.clientWidth / container.clientHeight,
  0.1,
  1000
);
camera.position.z = 6.5;

const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setSize(container.clientWidth, container.clientHeight);
container.appendChild(renderer.domElement);

// Lighting
scene.add(new THREE.AmbientLight(0xffffff, 0.9));
const light1 = new THREE.PointLight(0x7c5cff, 2.5, 15);
light1.position.set(3, 3, 5);
scene.add(light1);
const light2 = new THREE.PointLight(0x3b82f6, 2, 15);
light2.position.set(-3, -2, 5);
scene.add(light2);

// Logos data
const techList = [
  { name: "React", color: "#61DAFB", pos: [-1.8, 1.6, 0] },
  { name: "Node.js", color: "#5FA04E", pos: [0, 2.2, 0] },
  { name: "Next.js", color: "#FFFFFF", pos: [1.8, 1.6, 0] },
  { name: "Express", color: "#FFFFFF", pos: [-2.0, 0, 0] },
  { name: "MongoDB", color: "#47A248", pos: [2.0, 0, 0] },
  { name: "Tailwind", color: "#06B6D4", pos: [-1.4, -1.6, 0] },
  { name: "JavaScript", color: "#F7DF1E", pos: [1.4, -1.6, 0] }
];

// Canvas Texture for logos
function createLogoTexture(tech) {
  const canvas = document.createElement("canvas");
  canvas.width = 128;
  canvas.height = 128;
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, 128, 128);
  ctx.fillStyle = tech.color;
  ctx.font = "bold 60px Arial";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(tech.name.charAt(0), 64, 64);
  ctx.font = "bold 14px Arial";
  ctx.fillStyle = "#ffffff";
  ctx.fillText(tech.name, 64, 110);
  return new THREE.CanvasTexture(canvas);
}

const techObjects = [];
techList.forEach((tech, idx) => {
  const group = new THREE.Group();
  group.position.set(tech.pos[0], tech.pos[1], tech.pos[2]);

  const geo = new THREE.IcosahedronGeometry(0.45, 1);
  const mat = new THREE.MeshStandardMaterial({
    color: 0x7c5cff,
    emissive: 0x4a2fc4,
    emissiveIntensity: 0.3,
    metalness: 0.6,
    roughness: 0.2
  });
  const mesh = new THREE.Mesh(geo, mat);
  group.add(mesh);

  const logoTexture = createLogoTexture(tech);
  const spriteMat = new THREE.SpriteMaterial({
    map: logoTexture,
    transparent: true,
    depthTest: false,
    opacity: 0.9
  });
  const sprite = new THREE.Sprite(spriteMat);
  sprite.scale.set(0.8, 0.8, 1);
  sprite.position.z = 0.55;
  group.add(sprite);

  scene.add(group);
  techObjects.push({ group, mesh, idx, baseX: tech.pos[0], baseY: tech.pos[1] });
});

// Mouse
const mouse = new THREE.Vector2(0, 0);
const targetMouse = new THREE.Vector2(0, 0);
window.addEventListener("mousemove", (e) => {
  targetMouse.x = (e.clientX / window.innerWidth) * 2 - 1;
  targetMouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
});

// Animation
const clock = new THREE.Clock();

function animate() {
  requestAnimationFrame(animate);
  const t = clock.getElapsedTime();

  mouse.x += (targetMouse.x - mouse.x) * 0.05;
  mouse.y += (targetMouse.y - mouse.y) * 0.05;

  techObjects.forEach((item) => {
    item.group.position.y = item.baseY + Math.sin(t * 1.2 + item.idx) * 0.1;
    item.mesh.rotation.x += 0.005;
    item.mesh.rotation.y += 0.008;
    item.group.position.x = item.baseX + mouse.x * 0.1;
    item.group.rotation.y = mouse.x * 0.06;
    item.group.rotation.x = mouse.y * 0.04;
  });

  scene.rotation.y += (mouse.x * 0.03 - scene.rotation.y) * 0.02;
  scene.rotation.x += (mouse.y * 0.02 - scene.rotation.x) * 0.02;

  renderer.render(scene, camera);
}
animate();

window.addEventListener("resize", () => {
  const w = container.clientWidth,
    h = container.clientHeight;
  camera.aspect = w / h;
  camera.updateProjectionMatrix();
  renderer.setSize(w, h);
});

// ============================================================
// EXPERIENCE DATA
// ============================================================
const experiences = [
  { title: "📚 Teaching Assistant", date: "2018 – 2019", details: ["Typed notes & prepared papers", "Conducted exams & evaluated", "Took substitute classes"] },
  { title: "🤝 Manager (Apyon Society)", date: "2018 – 2019", details: ["Collected money from collectors", "Verified loans & Excel entry", "Managed daily accounts"] },
  { title: "🏍️ Supervisor (Hero Showroom)", date: "2020", details: ["Organized customer data", "Arranged promotional events", "Trained & supervised team"] },
  { title: "📱 Promoter (Airtel)", date: "2021", details: ["Door-to-door SIM sales", "Opened Payments Bank accounts", "End-to-end customer support"] },
  { title: "🌻 Manager (Mallick Enterprise)", date: "2022 – 2025", details: ["Supervised 4-5 workers", "Created invoices & accounts", "Tracked expenses"] },
  { title: "📖 Private Tutor", date: "2025 – present", details: ["Teaching local students", "Learning web dev simultaneously", "Writing free tutorials"] }
];

const expGrid = document.getElementById("experienceGrid");
experiences.forEach((exp, index) => {
  const card = document.createElement("div");
  card.className = `exp-card exp-${index + 1}`;
  card.innerHTML = `
    <h3>${exp.title}</h3>
    <div class="job-date">${exp.date}</div>
    <ul>${exp.details.map(d => `<li>${d}</li>`).join("")}</ul>
  `;
  expGrid.appendChild(card);
});

// ============================================================
// SKILLS
// ============================================================
const skills = [
  { name: "HTML5", icon: "https://cdn.simpleicons.org/html5/E34F26", label: "HTML" },
  { name: "CSS3", icon: "https://cdn.simpleicons.org/css/1572B6", label: "Styling" },
  { name: "JavaScript", icon: "https://cdn.simpleicons.org/javascript/F7DF1E", label: "Programming" },
  { name: "React", icon: "https://cdn.simpleicons.org/react/61DAFB", label: "Frontend" },
  { name: "Next.js", icon: "https://cdn.simpleicons.org/nextdotjs/FFFFFF", label: "Framework" },
  { name: "Node.js", icon: "https://cdn.simpleicons.org/nodedotjs/5FA04E", label: "Backend" },
  { name: "Express", icon: "https://cdn.simpleicons.org/express/FFFFFF", label: "Backend" },
  { name: "MongoDB", icon: "https://cdn.simpleicons.org/mongodb/47A248", label: "Database" },
  { name: "Tailwind", icon: "https://cdn.simpleicons.org/tailwindcss/06B6D4", label: "CSS" },
  { name: "Git", icon: "https://cdn.simpleicons.org/git/F05032", label: "Version" },
  { name: "SQLite", icon: "https://cdn.simpleicons.org/sqlite/003B57", label: "Database" },
  { name: "Termux", icon: "https://cdn.simpleicons.org/termux/FFFFFF", label: "Mobile Dev" },
  { name: "Render", icon: "https://cdn.simpleicons.org/render/46E3B7", label: "Deployment" }
];

const skillGrid = document.getElementById("skillsGrid");
skills.forEach(s => {
  const card = document.createElement("div");
  card.className = "skill-card";
  card.innerHTML = `
    <img src="${s.icon}" alt="${s.name}">
    <strong>${s.name}</strong>
    <span>${s.label}</span>
  `;
  skillGrid.appendChild(card);
});

// ============================================================
// PROJECT & BLOG DATA
// ============================================================

// ---------- PROJECTS ----------
const projects = [
  {
    title: "🏛️ Aadim Vault (আদিম ভল্ট)",
    description: "A Reliquium — Where Forgotten Objects Live Again. A global digital vault preserving heritage through stories, auctions & exchange. Built entirely on mobile with Termux.",
    image: "images/aadimvault.jpg",
    link: "https://aadimvault.onrender.com",
    btnText: "🔧 Under Development",
    tech: ["Node.js", "Express", "SQLite", "JWT", "Multer", "Render", "Termux", "HTML", "CSS", "JS"]
  },
  {
    title: "🏪 Shop Manager System",
    description: "Full-stack shop management system with billing, inventory, QR scanner, sales reports, JWT auth, and SQLite database. Deployed live on Render.",
    image: "images/shop_management.jpg",
    link: "https://shop-manager-ywa4.onrender.com",
    btnText: "Try Live Demo →",
    tech: ["Node.js", "Express", "SQLite", "JWT", "QR", "Render"]
  },
  {
    title: "🌌 Bangla Golpo Galaxy",
    description: "A fully functional Bengali story website built with HTML, CSS, JS. Includes search, dark mode, comment system (Cusdis).",
    image: "images/bangla_golpo_galaxy.jpg",
    link: "https://banglagolpogalaxy.github.io",
    btnText: "Live Demo",
    tech: ["HTML", "CSS", "JS", "Cusdis"]
  },
  {
    title: "📘 Banking Knowledge Book",
    description: "A complete Bengali guide to banking products, accounts, loans, investments, EMI calculation, and interview Q&A.",
    image: "images/banking_knowledge.jpg",
    link: "books/banking-knowledge/index.html",
    btnText: "Read Book →",
    tech: ["HTML", "CSS", "JS", "Bilingual"]
  },
  {
    title: "🧮 Super Calculator Tool",
    description: "All-in-1 calculator: Flower market, EMI, BMI, Age, length, weight, volume, temperature, Profit-Loss.",
    image: "images/super_calculator.jpg",
    link: "super_calculator/index.html",
    btnText: "Use Calculator →",
    tech: ["HTML", "CSS", "JS"]
  },
  {
    title: "🎯 Exam Guide India",
    description: "A free exam preparation platform designed to help Indian students and job aspirants with study materials, exam resources, important questions, and useful preparation content.",
    image: "images/exam_guide_india.jpg",
    link: "https://exam-guide-india.onrender.com",
    btnText: "Visit Project →",
    tech: ["HTML", "CSS", "JS", "Education"]
  },
  {
    title: "📁 Portfolio Website",
    description: "This very portfolio – responsive, dark/light mode, smooth scroll, contact form.",
    image: "images/portfolio_cover.jpg",
    link: "https://banglagolpogalaxy.github.io/portfolio/",
    btnText: "View Live →",
    tech: ["HTML", "CSS", "JS", "GitHub Pages"]
  }
];

// ---------- BLOG POSTS ----------
const blogPosts = [
  {
    title: "My Web Development Journey",
    excerpt: "How I learned to code using just a mobile phone – no laptop, no desktop.",
    readTime: "7 min read",
    languages: "🌐 বাংলা · English · हिन्दी",
    image: "blog/images/coding_journy_card.jpg",
    link: "blog/coding_journey.html"
  },
  {
    title: "Backend on Mobile: Termux Tutorial Series",
    excerpt: "Learn backend development by building a real shop management system.",
    readTime: "Series",
    languages: "🌐 বাংলা · English",
    image: "blog/images/termux_cover.jpg",
    link: "blog/termux_index.html"
  },
  {
    title: "How I Built a Multi-Calculator Tool",
    excerpt: "A step-by-step guide to creating 7 calculators in one page using HTML/CSS/JS.",
    readTime: "6 min read",
    languages: "🌐 বাংলা · English . हिंदी",
    image: "blog/images/multi_cal_blog_card.jpg",
    link: "blog/how_i_built_multi_calculator.html"
  },
  {
    title: "Dark Mode Toggle: Simple CSS + JS Trick",
    excerpt: "How I added dark/light mode to my portfolio and banking book using CSS variables.",
    readTime: "10 min read",
    languages: "🌐 বাংলা · English . हिंदी",
    image: "blog/images/darkmode.jpg",
    link: "blog/dark-mode-trick.html"
  },
  {
    title: "Adding Bilingual Toggle to Your Website",
    excerpt: "Learn how to support multiple languages on your blog or portfolio.",
    readTime: "8 min read",
    languages: "🌐 বাংলা · English . हिंदी",
    image: "blog/images/language_toggel.jpg",
    link: "blog/en_bn_toggle.html"
  },
  {
    title: "Termux কমান্ড চিট শিট – সম্পূর্ণ গাইড",
    excerpt: "Termux-এর বেসিক থেকে অ্যাডভান্সড সব কমান্ড বাংলায়। ফাইল, গিট, নেটওয়ার্ক, Node.js, বাস্তব প্রজেক্ট কমান্ড সহ।",
    readTime: "15 min read",
    languages: "🌐 বাংলা · English",
    image: "blog/images/termux_all_command.jpg",
    link: "blog/termux_all_command.html"
  },
  {
    title: "🏛️ আদিম ভল্ট সিরিজ (Aadim Vault Series)",
    excerpt: "কীভাবে আমি একটি বিশ্বজনীন হেরিটেজ প্ল্যাটফর্ম তৈরি করলাম – আদিম ভল্ট। সম্পূর্ণ সিরিজটি বাংলায়।",
    readTime: "Series",
    languages: "🌐 বাংলা · English",
    image: "blog/images/aadim_vault_series.jpg",
    link: "blog/aadim_vault_index.html"
  },
  {
  title: "MongoDB দিয়ে আপনার ওয়েবসাইটকে স্মার্ট করা",
  excerpt: "MongoDB অ্যাকাউন্ট তৈরি, ক্লাস্টার সেটআপ, ইউজার তৈরি, নেটওয়ার্ক অ্যাক্সেস এবং Node.js প্রোজেক্টে সংযোগ – সম্পূর্ণ ফ্রি টিউটোরিয়াল।",
  readTime: "20 min read",
  languages: "🌐 বাংলা · English",
  image: "blog/images/mongodb_tutorial_card.jpg",
  link: "blog/mongodb-tutorial.html"
}
];

// ============================================================
// CARD FUNCTIONS (UPDATED)
// ============================================================

// 🔹 PROJECT CARD – পুরো কার্ড এখন ক্লিকযোগ্য, একই ট্যাবে খোলে
function createProjectCard(project) {
  const imageHTML = project.image && project.image.endsWith(".html")
    ? `<iframe src="${project.image}" style="width:100%; height:130px; border:none; overflow:hidden; border-radius:12px; margin-bottom:8px;" scrolling="no"></iframe>`
    : `<img src="${project.image}" alt="${project.title}" loading="lazy" onerror="this.style.display='none'">`;

  const techHTML = Array.isArray(project.tech)
    ? project.tech.map(t => `<span>${t}</span>`).join("")
    : "";

  return `
    <a href="${project.link}" target="_self" class="project-card" style="display:block; text-decoration:none; color:inherit; cursor:pointer;">
      ${imageHTML}
      <div class="project-content">
        <h3>${project.title}</h3>
        <p>${project.description}</p>
        <div class="project-tags">${techHTML}</div>
        <div class="project-links">
          <span class="demo-link" style="display:inline-block; padding:6px 14px; border-radius:8px; font-size:10px; font-weight:600; background:var(--primary); color:#fff; transition:.2s;">${project.btnText}</span>
        </div>
      </div>
    </a>
  `;
}

// 🔹 BLOG CARD – পুরো কার্ড ক্লিকযোগ্য, একই ট্যাবে খোলে (target="_self")
function createBlogCard(post) {
  return `
    <a href="${post.link}" target="_self" class="blog-card" style="display:block; text-decoration:none; color:inherit;">
      <img src="${post.image}" alt="${post.title}" loading="lazy" onerror="this.style.display='none'">
      <div class="blog-content">
        <h3>${post.title}</h3>
        <div class="blog-meta">⏱️ ${post.readTime} · ${post.languages}</div>
        <div class="blog-excerpt">${post.excerpt}</div>
        <span class="blog-readmore">Read Full →</span>
      </div>
    </a>
  `;
}

// ============================================================
// POPULATE CARDS
// ============================================================
function populateCards(scrollId, gridId, items, cardFunction) {
  const scrollContainer = document.getElementById(scrollId);
  const gridContainer = document.getElementById(gridId);
  if (!scrollContainer || !gridContainer) return;

  const cards = items.map(cardFunction).join("");
  scrollContainer.innerHTML = cards;
  gridContainer.innerHTML = cards;
}

populateCards("projectsScroll", "projectsGrid", projects, createProjectCard);
populateCards("blogScroll", "blogGrid", blogPosts, createBlogCard);

// ============================================================
// SEE MORE BUTTONS
// ============================================================
function setupMoreButton(buttonId, wrapperId, gridId, allText, backText) {
  const button = document.getElementById(buttonId);
  const wrapper = document.getElementById(wrapperId);
  const grid = document.getElementById(gridId);
  if (!button || !wrapper || !grid) return;

  const compactWrapper = wrapper.parentElement;
  let isExpanded = false;

  button.addEventListener("click", function () {
    isExpanded = !isExpanded;
    if (compactWrapper) compactWrapper.style.display = isExpanded ? "none" : "block";
    grid.style.display = isExpanded ? "grid" : "none";
    button.textContent = isExpanded ? backText : allText;
  });
}

setupMoreButton("seeMoreProjects", "projectsScroll", "projectsGrid", "See All Projects →", "← Back to Compact");
setupMoreButton("seeMoreBlog", "blogScroll", "blogGrid", "See All Posts →", "← Back to Compact");

// ============================================================
// SMOOTH SCROLL
// ============================================================
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener("click", function (e) {
    const targetId = this.getAttribute("href");
    if (targetId && targetId !== "#") {
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  });
});
